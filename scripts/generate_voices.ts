import { readdirSync, statSync, existsSync, readFileSync, writeFileSync } from 'fs';
import { join, basename, extname } from 'path';
import { createHash } from 'crypto';

const VOICES_DIR = join(process.cwd(), 'public', 'voices');
const OUTPUT_FILE = join(process.cwd(), 'assets', 'voices.json');
const AUDIO_EXTENSIONS = ['.mp3', '.wav', '.ogg', '.aac', '.m4a'];

interface VoiceEntry {
  name: string;
  path: string;
  description: { zh: string };
  updated_at: number;
}

interface Group {
  group_name: string;
  group_description: { zh: string };
  voice_list: VoiceEntry[];
}

interface ExistingVoiceData {
  groups: Group[];
}

// Stores existing entry info: { path -> { updated_at, mtime, group_name } }
interface ExistingEntryInfo {
  updated_at: number;
  mtime: number; // file mtime in seconds when last scanned
  group_name: string;
}

function md5(str: string): string {
  return createHash('md5').update(str).digest('hex');
}

function getGroupDescription(groupPath: string, groupName: string): { zh: string } {
  const descPath = join(groupPath, 'description.json');
  if (existsSync(descPath)) {
    try {
      const content = JSON.parse(readFileSync(descPath, 'utf-8'));
      if (content.zh) return { zh: content.zh };
    } catch (e) {
      console.warn(`Warning: Failed to parse ${descPath}, using folder name`);
    }
  }
  return { zh: groupName };
}

function getFilenameWithoutExt(filename: string): string {
  return basename(filename, extname(filename));
}

/**
 * Load existing voices.json and build a lookup map by path.
 * Returns a map of path -> ExistingEntryInfo
 */
function loadExistingVoices(): Map<string, ExistingEntryInfo> {
  const existingMap = new Map<string, ExistingEntryInfo>();

  if (!existsSync(OUTPUT_FILE)) {
    return existingMap;
  }

  try {
    const content = readFileSync(OUTPUT_FILE, 'utf-8');
    const data: ExistingVoiceData = JSON.parse(content);

    for (const group of data.groups) {
      for (const voice of group.voice_list) {
        existingMap.set(voice.path, {
          updated_at: voice.updated_at,
          mtime: voice.updated_at, // Use updated_at as the reference mtime
          group_name: group.group_name,
        });
      }
    }
  } catch (e) {
    console.warn('Warning: Failed to parse existing voices.json, starting fresh');
  }

  return existingMap;
}

function scanVoices(existingMap: Map<string, ExistingEntryInfo>): { groups: Group[] } {
  const groups: Group[] = [];
  const now = Math.floor(Date.now() / 1000);

  if (!existsSync(VOICES_DIR)) {
    console.error(`Voices directory not found: ${VOICES_DIR}`);
    return { groups };
  }

  const entries = readdirSync(VOICES_DIR, { withFileTypes: true });

  let newCount = 0;
  let updatedCount = 0;
  let movedCount = 0;
  let unchangedCount = 0;

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;

    const groupName = entry.name;
    const groupPath = join(VOICES_DIR, groupName);
    const groupDescription = getGroupDescription(groupPath, groupName);

    const voiceList: VoiceEntry[] = [];
    const files = readdirSync(groupPath, { withFileTypes: true });

    for (const file of files) {
      if (!file.isFile()) continue;

      const ext = extname(file.name).toLowerCase();
      if (!AUDIO_EXTENSIONS.includes(ext)) continue;

      const filePath = join(groupPath, file.name);
      const relativePath = `${groupName}/${file.name}`;
      const stats = statSync(filePath);
      const currentMtime = Math.floor(stats.mtimeMs / 1000);

      const existing = existingMap.get(relativePath);
      let updatedAt: number;

      if (!existing) {
        // New file
        updatedAt = now;
        newCount++;
        console.log(`  [NEW] ${relativePath}`);
      } else if (currentMtime > existing.mtime) {
        // File was modified (mtime changed)
        updatedAt = now;
        updatedCount++;
        console.log(`  [UPDATED] ${relativePath}`);
      } else if (existing.group_name !== groupName) {
        // File moved to different category - keep original timestamp
        updatedAt = existing.updated_at;
        movedCount++;
        console.log(`  [MOVED] ${relativePath} (from ${existing.group_name})`);
      } else {
        // Unchanged - keep original timestamp
        updatedAt = existing.updated_at;
        unchangedCount++;
      }

      voiceList.push({
        name: md5(relativePath),
        path: relativePath,
        description: { zh: getFilenameWithoutExt(file.name) },
        updated_at: updatedAt,
      });
    }

    if (voiceList.length > 0) {
      groups.push({
        group_name: groupName,
        group_description: groupDescription,
        voice_list: voiceList,
      });
    }
  }

  // Sort groups alphabetically
  groups.sort((a, b) => a.group_name.localeCompare(b.group_name));

  console.log(`\nSummary: ${newCount} new, ${updatedCount} updated, ${movedCount} moved, ${unchangedCount} unchanged`);

  return { groups };
}

function main() {
  console.log('Generating voices.json...\n');
  
  // Load existing data to preserve timestamps
  const existingMap = loadExistingVoices();
  console.log(`Loaded ${existingMap.size} existing entries\n`);

  const data = scanVoices(existingMap);
  writeFileSync(OUTPUT_FILE, JSON.stringify(data, null, 2), 'utf-8');
  
  const totalVoices = data.groups.reduce((sum, g) => sum + g.voice_list.length, 0);
  console.log(`\nGenerated ${OUTPUT_FILE} with ${data.groups.length} groups and ${totalVoices} voices`);
}

main();
