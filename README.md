# Happy 520! ❤️

一个专属于你们的浪漫网页应用，包含照片回忆墙、音乐播放器和互动小游戏。

## ⚠️ 隐私警告

此应用包含你的私人照片和情书内容。**如果部署到公网（GitHub Pages、Vercel 等），内容可能被搜索引擎收录或他人访问。**

**推荐方案**：
1. **本地运行后局域网分享**（最安全）：运行 `npm run dev`，手机连接同一 WiFi，访问 `http://你的电脑IP:5173`
2. **设置密码保护**：编辑 `src/config/content.js`，设置 `APP_PASSWORD` 为你的密码

---

## 快速开始

### 1. 准备你的资源

将所有照片和音乐放入对应文件夹：

```
public/assets/photos/   ← 放入照片（如 photo-01.jpg, photo-02.jpg）
public/assets/music/    ← 放入音乐（如 song-01.mp3）
```

> ⚠️ 文件名请使用英文 + 数字，不要使用中文或特殊字符

### 2. 自定义内容

编辑 `src/config/content.js`，修改：
- `COUPLE_INFO` — 你和她的名字、在一起的第一天
- `PHOTOS` — 照片列表（路径 + 配文）
- `PLAYLIST` — 音乐播放列表
- `LOVE_LETTERS` — 情书集（支持多封）
- `GAME_CARDS` — 记忆游戏卡片（默认 emoji，可改为照片）
- `APP_PASSWORD` — 可选密码（留空则不启用）

### 3. 安装和运行

```bash
npm install
npm run dev
```

浏览器打开 `http://localhost:5173` 即可预览。

### 4. 打包部署

```bash
npm run build
```

`dist/` 文件夹即为可部署的静态文件，拖到 Vercel / Netlify 即可。

---

## 页面说明

| 页面 | 路由 | 功能 |
|---|---|---|
| 首页 | `#/` | 在一起天数、漂浮爱心、快捷入口 |
| 照片 | `#/gallery` | 瀑布流照片墙，点击放大查看 |
| 音乐 | `#/music` | 音乐播放器（需先点击播放按钮） |
| 游戏 | `#/game` | 记忆翻牌配对，记录最佳成绩 |
| 情书集 | `#/letter` | 情书集列表 + 打字机效果 |

---

## 技术栈

React 19 + Vite 6 + React Router 7 + react-icons
