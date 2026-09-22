// Сборка статики для GitHub Pages: API-роуты несовместимы с output: 'export',
// поэтому на время сборки они переносятся из app/api, затем возвращаются.
import { execSync } from 'node:child_process';
import { existsSync, mkdirSync, renameSync, rmSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const apiDir = join(root, 'app', 'api');
const backupDir = join(root, '.api-backup-pages');

if (existsSync(backupDir)) rmSync(backupDir, { recursive: true, force: true });

const moved = existsSync(apiDir);
if (moved) renameSync(apiDir, backupDir);

try {
  execSync('npx next build', {
    stdio: 'inherit',
    env: {
      ...process.env,
      STATIC_EXPORT: '1',
      NEXT_PUBLIC_BASE_PATH: process.env.NEXT_PUBLIC_BASE_PATH || '/beauty-room',
    },
  });
} finally {
  if (moved) renameSync(backupDir, apiDir);
  if (existsSync(backupDir)) rmSync(backupDir, { recursive: true, force: true });
}

if (!existsSync(join(root, 'out', 'index.html'))) {
  console.error('Static export failed: out/index.html not found');
  process.exit(1);
}
console.log('Static export ready in ./out');
