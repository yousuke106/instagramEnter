const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

const distDir = path.join(__dirname, '..', 'dist');
const packageName = 'instagram-ctrl-enter-submit-v1.0.0.zip';
const packagePath = path.join(distDir, packageName);

// Create dist directory
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

console.log('Building distribution package...');

// Remove old package if exists
if (fs.existsSync(packagePath)) {
  fs.unlinkSync(packagePath);
}

// Create write stream
const output = fs.createWriteStream(packagePath);
const archive = archiver('zip', {
  zlib: { level: 9 }
});

output.on('close', () => {
  console.log(`\n✓ Package created: ${packagePath}`);
  console.log(`✓ Total size: ${(archive.pointer() / 1024).toFixed(2)} KB`);
  console.log(`\nTo install:`);
  console.log(`1. Extract the ZIP file`);
  console.log(`2. Open chrome://extensions/`);
  console.log(`3. Enable "Developer mode"`);
  console.log(`4. Click "Load unpacked"`);
  console.log(`5. Select the extracted folder`);
});

archive.on('error', (err) => {
  console.error('Error creating package:', err.message);
  process.exit(1);
});

// Pipe archive to output file
archive.pipe(output);

// Add files
const rootDir = path.join(__dirname, '..');
archive.file(path.join(rootDir, 'manifest.json'), { name: 'manifest.json' });
archive.file(path.join(rootDir, 'README.md'), { name: 'README.md' });

// Add directories (excluding certain files)
archive.directory(path.join(rootDir, 'icons'), 'icons', (entry) => {
  // Exclude README.md and source SVG
  if (entry.name === 'README.md' || entry.name === 'icon.svg') {
    return false;
  }
  return entry;
});

archive.directory(path.join(rootDir, 'src'), 'src');

// Finalize the archive
archive.finalize();