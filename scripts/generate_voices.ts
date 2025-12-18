import { readdirSync, statSync, existsSync, readFileSync, writeFileSync } from 'fs';
import { join, basename, extname, relative } from 'path';
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

function scanVoices(): { groups: Group[] } {
  const groups: Group[] = [];

  if (!existsSync(VOICES_DIR)) {
    console.error(`Voices directory not found: ${VOICES_DIR}`);
    return { groups };
  }

  const entries = readdirSync(VOICES_DIR, { withFileTypes: true });

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

      voiceList.push({
        name: md5(relativePath),
        path: relativePath,
        description: { zh: getFilenameWithoutExt(file.name) },
        updated_at: Math.floor(stats.mtimeMs / 1000),
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

  return { groups };
}

function main() {
  console.log('Generating voices.json...');
  const data = scanVoices();
  writeFileSync(OUTPUT_FILE, JSON.stringify(data, null, 2), 'utf-8');
  console.log(`Generated ${OUTPUT_FILE} with ${data.groups.length} groups`);
}

main();
