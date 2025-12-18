/*
  icon: {
    // 先拿 name 再拿 url 再拿 emoji, 只要用誰就給哪些的值就好

    name?: string; // 使用 icon 名稱 mdi-icon: https://pictogrammers.com/library/mdi/
    color?: string; // icon 顏色

    url?: string; // 使用 圖片 url

    emoji?: string; // 使用 emoji
  }
*/

type T_LinkIcon = {
  color?: string;
  name?: string;
  url?: string;
  emoji?: string;
};

type T_Link = {
  icon: T_LinkIcon;
  title: string;
  url: string;
};

export const links: T_Link[][] = [
  [
    {
      icon: {
        color: '#A96FFF',
        name: 'mdi-twitch'
      },
      title: 'Twitch',
      url: 'https://www.twitch.tv/meoao0a0'
    },
    {
      icon: {
        color: '#FF0032',
        name: 'mdi-youtube'
      },
      title: 'Youtube',
      url: 'https://www.youtube.com/@Meouo'
    },
    {
      icon: {
        color: '#1E9AF0',
        name: 'mdi-twitter'
      },
      title: 'Twitter',
      url: 'https://x.com/Meouo__'
    },
    {
      icon: {
        color: '#5965F2',
        name: 'mdi-discord'
      },
      title: 'Discord',
      url: ''
    }
  ],
  [
    {
      icon: {
        emoji: '♦️'
      },
      title: '佔位 - 梅奧奧',
      url: ''
    },
  ]
];
