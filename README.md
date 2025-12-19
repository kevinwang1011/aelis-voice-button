# VTuber Voice Button Template

Using [Nuxt 3](https://nuxt.com/docs/getting-started/introduction) And [Vuetify](https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides) as UI library.

## Setup

Make sure to install the dependencies:

package manager: [bun](https://bun.sh/)

```bash
bun install
```

#### 開發模式

啟動開發伺服器於 `http://localhost:3333`：

```bash
bun run dev
```

#### 生產環境建置

```bash
bun run build
```

#### 預覽生產版本

```bash
bun run preview
```

#### 生成靜態網站

```bash
bun run generate
```

### 自訂設定

#### 修改網站資訊

編輯 `assets/locales/site.json`：

```json
{
  "title": "【你的按鈕網站名稱】",
  "description": "網站描述",
  "url": "https://your-domain.com",
  "theme_color": "#f18465"
}
```

#### 新增語音

編輯 `assets/voices.json`，並將音效檔案放入 `public/voices/` 對應的資料夾：

```json
{
  "groups": [
    {
      "name": "group_name",
      "description": { "zh": "分組名稱" },
      "sounds": [
        {
          "name": "sound_id",
          "path": "group_name/filename.mp3",
          "description": { "zh": "語音描述" },
          "updated_at": 1700000000
        }
      ]
    }
  ]
}
```

#### 修改主題顏色

編輯 `theme.json` 來自訂網站配色。

### 作者與歸屬

本專案由以下成員共同設計、開發並維護：

- [孤之界](https://konnokai.me)
- [紅柿](https://twitter.com/7Red4)
- [九条夏目](https://github.com/kujyonatsume)

相關歸屬資訊請參閱 [`NOTICE`](./NOTICE)。

### 授權說明

本專案採用 **Apache License 2.0** 授權。

你可以：

- 使用本專案（包含商業用途）
- 修改原始碼
- 再散布原始碼或修改後版本

但你**必須遵守以下事項**：

- **必須保留原作者署名**
- **必須保留 `LICENSE` 與 `NOTICE` 檔案**
- 若有修改，需清楚標示修改內容
- 不得暗示原作者為你的修改版本背書

詳細條款請參閱 [`LICENSE`](./LICENSE)。

### 第三方套件

本專案可能包含第三方開源套件，  
各套件均依其各自之授權條款使用。  
相關授權資訊請參閱相依套件之官方文件或原始碼中的授權聲明。

### 免責聲明

本專案為愛好者作品，與相關 VTuber 本人沒有直接關聯。  
本專案以「現狀」提供，不附帶任何明示或默示之保證。  
使用本專案所產生的任何風險，須由使用者自行承擔。

---

## English

### Quick Start

1. Click **Use this template** on GitHub or Fork this project
2. Modify the content and styles according to your needs
3. Deploy to your preferred platform (Vercel, Netlify, GitHub Pages, etc.)

### Introduction

This is a VTuber voice button website template built with **Nuxt 3** and **Vuetify**. Users can click buttons to play pre-recorded voice clips, with support for categorized browsing, searching, and sharing.

### Features

- **Audio Playback System**: Click to play sounds with progress display, pause, loop, and random play
- **Category Management**: Voice clips organized in collapsible panels by groups
- **Real-time Search**: Quickly search through voice content
- **New Sound Indicator**: Sounds added within 7 days are automatically marked as "New"
- **Share Function**: Generate shareable links for specific sounds
- **Responsive Design**: Works on desktop and mobile devices
- **Bottom Control Bar**: Shows currently playing sound with quick controls

### Tech Stack

| Category        | Technology                                                |
| --------------- | --------------------------------------------------------- |
| Framework       | [Nuxt 3](https://nuxt.com/) + [Vue 3](https://vuejs.org/) |
| UI Library      | [Vuetify 3](https://vuetifyjs.com/)                       |
| CSS Framework   | [Tailwind CSS](https://tailwindcss.com/)                  |
| Package Manager | [Bun](https://bun.sh/)                                    |
| Language        | TypeScript                                                |
| Others          | VueUse, Day.js, Twemoji                                   |

### Project Structure

```
├── assets/
│   ├── css/              # Stylesheets
│   ├── locales/          # Site configuration (site.json)
│   ├── links.ts          # External links configuration
│   └── voices.json       # Voice data configuration
├── pages/
│   ├── index.vue         # Home page (main button page)
│   └── about.vue         # About page
├── public/
│   └── voices/           # Audio files directory
├── app.vue               # Root component
├── nuxt.config.ts        # Nuxt configuration
├── theme.json            # Theme color configuration
└── vuetify.config.ts     # Vuetify configuration
```

### Credits

This project was designed, developed, and maintained by the following members:

- [孤之界 (Kon no Kai)](https://konnokai.me)
- [紅柿 (7Red4)](https://twitter.com/7Red4)
- [九条夏目 (Kujyo Natsume)](https://github.com/kujyonatsume)

For attribution information, please see [`NOTICE`](./NOTICE).

### License

This project is licensed under the **Apache License 2.0**.

You may:

- Use this project (including for commercial purposes)
- Modify the source code
- Redistribute the original or modified versions

However, you **must comply with the following**:

- **You must retain the original author attribution**
- **You must retain the `LICENSE` and `NOTICE` files**
- If modified, you must clearly indicate the changes
- You may not imply that the original authors endorse your modified version

For full terms, see [`LICENSE`](./LICENSE).

### Third-Party Packages

This project may include third-party open-source packages,  
each used under their respective licenses.  
For licensing information, please refer to the official documentation or license declarations in the source code of each dependency.

### Disclaimer

This project is a fan-made work and is not directly affiliated with the VTuber.  
This project is provided "as is", without any express or implied warranties.  
Any risks arising from the use of this project are borne by the user.

---

For more information about Nuxt deployment, check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment).
