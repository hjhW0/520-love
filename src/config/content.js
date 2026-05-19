// ============================================
//  520 应用配置文件 — 在这里自定义所有内容！
// ============================================

// ---- 情侣信息 ----
// startDate 必须使用 UTC 时间格式，避免时区问题
export const COUPLE_INFO = {
  partner1: '宝贝',
  partner2: '我',
  startDate: '2024-02-14T00:00:00Z',
};

// ---- 照片列表 ----
// 将照片放入 public/assets/photos/ 文件夹
// 文件名请使用英文 + 数字，如 photo-01.jpg
export const PHOTOS = [
  { id: '01', src: '/assets/photos/photo-01.jpg', caption: '我们的第一张合照' },
  { id: '02', src: '/assets/photos/photo-02.jpg', caption: '那次海边旅行' },
  { id: '03', src: '/assets/photos/photo-03.jpg', caption: '一起看电影' },
  { id: '04', src: '/assets/photos/photo-04.jpg', caption: '你的生日' },
  { id: '05', src: '/assets/photos/photo-05.jpg', caption: '最美的一天' },
  { id: '06', src: '/assets/photos/photo-06.jpg', caption: '甜蜜时光' },
];

// ---- 音乐播放列表 ----
// 将音乐放入 public/assets/music/ 文件夹
export const PLAYLIST = [
  {
    title: 'Our Song',
    artist: '专属歌单',
    src: '/assets/music/song-01.mp3',
    cover: '',
  },
];

// ---- 情书内容 ----
export const LOVE_LETTER = {
  title: '致我最爱的你',
  paragraphs: [
    '今天是520，一个属于爱与浪漫的日子。我想借这个机会，把平时藏在心底的话，一字一句地说给你听。',
    '从遇见你的那一刻起，我的世界就变得不一样了。你的笑容，是我每天最期待看到的风景；你的声音，是我听过最动听的旋律。',
    '和你在一起的每一天，都是上天给我最好的礼物。谢谢你包容我的不完美，谢谢你陪我走过每一个平凡却珍贵的日子。',
    '未来的路还很长，但我一点都不害怕，因为我知道，你会一直在我身边。我想和你一起看遍世间风景，一起经历人生的每一个季节。',
    '520快乐，我的宝贝。愿我们的故事，永远未完待续。',
  ],
  signOff: '永远爱你的，\n[你的名字]',
};

// ---- 记忆游戏卡片（8对 = 16张） ----
// type: 'emoji' 使用 emoji 图标
// type: 'image' 使用照片（content 填照片路径）
export const GAME_CARDS = [
  { pairId: '1', content: '❤️', type: 'emoji' },
  { pairId: '2', content: '🌹', type: 'emoji' },
  { pairId: '3', content: '💕', type: 'emoji' },
  { pairId: '4', content: '💌', type: 'emoji' },
  { pairId: '5', content: '🥰', type: 'emoji' },
  { pairId: '6', content: '💝', type: 'emoji' },
  { pairId: '7', content: '✨', type: 'emoji' },
  { pairId: '8', content: '🫶', type: 'emoji' },
];

// ---- 密码保护（可选） ----
// 留空 = 无需密码；设置字符串 = 首页需要输入密码
export const APP_PASSWORD = '';
