import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const distDir = path.resolve('dist');
const releaseDir = path.resolve('release');

if (!fs.existsSync(distDir)) {
  console.error('dist directory does not exist. Please run "npm run build" first.');
  process.exit(1);
}

fs.mkdirSync(releaseDir, { recursive: true });

const zipName = 'secret-arcade-v1.0.0.zip';
const zipPath = path.join(releaseDir, zipName);

if (fs.existsSync(zipPath)) {
  fs.unlinkSync(zipPath);
}

// Pre-package checks
const manifestPath = path.join(distDir, 'manifest.json');
if (!fs.existsSync(manifestPath)) {
  console.error('❌ Error: dist/manifest.json not found! Chrome Web Store requires manifest.json at zip root.');
  process.exit(1);
}

// Clean macOS metadata files if any exist in dist
try {
  execSync(`find "${distDir}" -name ".DS_Store" -delete 2>/dev/null || true`);
} catch (e) {}

try {
  execSync(`cd "${distDir}" && zip -r "${zipPath}" ./* -x "*.DS_Store" -x "__MACOSX*"`, { stdio: 'inherit' });
  console.log(`\n🎉 Production package successfully created: ${zipPath}`);
  const stats = fs.statSync(zipPath);
  console.log(`📦 Package Size: ${(stats.size / 1024).toFixed(2)} KB`);
  console.log(`✅ Ready to upload to Chrome Web Store Developer Dashboard!`);
} catch (err) {
  console.error('Failed to create zip package:', err);
  process.exit(1);
}
