/**
 * Asset Generation Script for Ma3
 * Creates branded PNG files using Sharp library
 */

const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const assetsDir = path.join(__dirname, '..', 'assets');

if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

// Ma3 brand colors
const primaryGreen = { r: 0, g: 107, b: 63 };
const accentGold = { r: 255, g: 184, b: 0 };

// SVG icon with Ma3 branding (bus on green background)
const createIconSVG = (size) => `
<svg width="${size}" height="${size}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="50" r="50" fill="#006B3F"/>
  <path d="M25 55 L35 30 L65 30 L75 55 L75 68 L25 68 Z" fill="#FFB800"/>
  <circle cx="35" cy="72" r="7" fill="#1a1a1a"/>
  <circle cx="65" cy="72" r="7" fill="#1a1a1a"/>
  <rect x="38" y="38" width="10" height="14" fill="#ffffff" rx="2"/>
  <rect x="52" y="38" width="10" height="14" fill="#ffffff" rx="2"/>
  <text x="50" y="88" font-family="Arial Black, sans-serif" font-size="14" font-weight="bold" text-anchor="middle" fill="#ffffff">Ma3</text>
</svg>`;

// Splash screen SVG with centered logo
const createSplashSVG = (width, height) => `
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${width}" height="${height}" fill="#006B3F"/>
  <g transform="translate(${width/2 - 100}, ${height/2 - 120})">
    <circle cx="100" cy="100" r="80" fill="#ffffff" opacity="0.15"/>
    <path d="M50 110 L70 60 L130 60 L150 110 L150 136 L50 136 Z" fill="#FFB800"/>
    <circle cx="70" cy="144" r="14" fill="#1a1a1a"/>
    <circle cx="130" cy="144" r="14" fill="#1a1a1a"/>
    <rect x="76" y="76" width="20" height="28" fill="#ffffff" rx="3"/>
    <rect x="104" y="76" width="20" height="28" fill="#ffffff" rx="3"/>
  </g>
  <text x="${width/2}" y="${height/2 + 80}" font-family="Arial Black, sans-serif" font-size="72" font-weight="bold" text-anchor="middle" fill="#ffffff">Ma3</text>
  <text x="${width/2}" y="${height/2 + 130}" font-family="Arial, sans-serif" font-size="24" text-anchor="middle" fill="#ffffff" opacity="0.8">Panda. Lipa. Fika.</text>
</svg>`;

async function generateAssets() {
  console.log('Generating Ma3 branded assets...\n');

  // Icon 1024x1024
  await sharp(Buffer.from(createIconSVG(1024)))
    .resize(1024, 1024)
    .png()
    .toFile(path.join(assetsDir, 'icon.png'));
  console.log('✓ icon.png (1024x1024)');

  // Adaptive icon 1024x1024
  await sharp(Buffer.from(createIconSVG(1024)))
    .resize(1024, 1024)
    .png()
    .toFile(path.join(assetsDir, 'adaptive-icon.png'));
  console.log('✓ adaptive-icon.png (1024x1024)');

  // Splash 1284x2778
  await sharp(Buffer.from(createSplashSVG(1284, 2778)))
    .resize(1284, 2778)
    .png()
    .toFile(path.join(assetsDir, 'splash.png'));
  console.log('✓ splash.png (1284x2778)');

  // Favicon 48x48
  await sharp(Buffer.from(createIconSVG(48)))
    .resize(48, 48)
    .png()
    .toFile(path.join(assetsDir, 'favicon.png'));
  console.log('✓ favicon.png (48x48)');

  console.log('\n✅ Ma3 branded assets generated!');
}

generateAssets().catch(console.error);
