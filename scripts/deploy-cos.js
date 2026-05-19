import { readFileSync, readdirSync, statSync, existsSync } from 'fs';
import { resolve, join, dirname } from 'path';
import { fileURLToPath } from 'url';
import COS from 'cos-nodejs-sdk-v5';
import { createInterface } from 'readline';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = resolve(__dirname, '..', 'dist');

function ask(question) {
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.json': 'application/json',
  '.mp3': 'audio/mpeg',
  '.mp4': 'video/mp4',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

function getMimeType(filename) {
  const ext = filename.slice(filename.lastIndexOf('.')).toLowerCase();
  return MIME_TYPES[ext] || 'application/octet-stream';
}

function collectFiles(dir, base = '') {
  const results = [];
  const entries = readdirSync(dir);
  for (const entry of entries) {
    const fullPath = join(dir, entry);
    const relativePath = base ? `${base}/${entry}` : entry;
    if (statSync(fullPath).isDirectory()) {
      results.push(...collectFiles(fullPath, relativePath));
    } else {
      results.push({ fullPath, relativePath: relativePath.replace(/\\/g, '/') });
    }
  }
  return results;
}

async function main() {
  console.log('🚀 520 应用 - 腾讯云 COS 部署\n');

  if (!existsSync(distDir)) {
    console.log('❌ dist/ 文件夹不存在，请先运行 npm run build');
    process.exit(1);
  }

  const secretId = process.env.COS_SECRET_ID || (await ask('SecretId: '));
  const secretKey = process.env.COS_SECRET_KEY || (await ask('SecretKey: '));
  const bucket = process.env.COS_BUCKET || (await ask('Bucket名称 (格式: bucket-appid): '));
  const region = process.env.COS_REGION || (await ask('地域 (如 ap-guangzhou): ') || 'ap-guangzhou');

  const cos = new COS({
    SecretId: secretId,
    SecretKey: secretKey,
  });

  const files = collectFiles(distDir);
  console.log(`\n📦 共 ${files.length} 个文件，开始上传...\n`);

  let uploaded = 0;
  let failed = 0;

  for (const { fullPath, relativePath } of files) {
    const body = readFileSync(fullPath);
    const contentType = getMIMEType(relativePath);

    await new Promise((resolve) => {
      cos.putObject(
        {
          Bucket: bucket,
          Region: region,
          Key: relativePath,
          Body: body,
          ContentType: contentType,
        },
        (err, data) => {
          if (err) {
            console.log(`  ❌ ${relativePath}: ${err.message}`);
            failed++;
          } else {
            console.log(`  ✅ ${relativePath}`);
            uploaded++;
          }
          resolve();
        }
      );
    });
  }

  console.log(`\n${'─'.repeat(50)}`);
  console.log(`✅ 上传完成！成功 ${uploaded}，失败 ${failed}`);
  console.log(`\n🔗 访问地址（在 COS 控制台开启静态网站后）：`);
  console.log(`   https://${bucket}.cos-website.${region}.myqcloud.com`);
  console.log(`\n   → 在控制台设置静态网站首页为 index.html`);
}

main().catch((err) => {
  console.error('部署失败:', err.message);
  process.exit(1);
});
