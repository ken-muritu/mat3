/**
 * Ma3 App Icon Generator
 * Generates app icons with Ma3 text inside car icon
 * Run: node generate-icons.js
 */

const path = require('path');
const sharp = require('sharp');

const makeVehicleMarkSvg = ({ transparentBackground }) => {
  const background = transparentBackground
    ? ''
    : '<rect width="1024" height="1024" fill="#006B3F" rx="180" ry="180"/>';

  return `<svg width="1024" height="1024" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
  ${background}

  <!-- Vehicle mark (kept within safe area) -->
  <g transform="translate(0, 0) scale(0.92) translate(45, 45)">
    <rect x="240" y="290" width="544" height="340" rx="44" ry="44" fill="#FFFFFF"/>
    <path d="M 280 290 L 315 200 L 709 200 L 744 290 Z" fill="#FFFFFF"/>

    <rect x="290" y="320" width="120" height="105" rx="18" fill="#006B3F"/>
    <rect x="430" y="320" width="120" height="105" rx="18" fill="#006B3F"/>
    <rect x="570" y="320" width="120" height="105" rx="18" fill="#006B3F"/>

    <rect x="240" y="450" width="544" height="44" fill="#FFD700"/>
    <rect x="240" y="494" width="544" height="44" fill="#006B3F"/>
    <rect x="240" y="538" width="544" height="44" fill="#FF0000"/>

    <circle cx="330" cy="650" r="62" fill="#1b1b1b"/>
    <circle cx="694" cy="650" r="62" fill="#1b1b1b"/>

    <!-- Ma3 placed fully on the yellow stripe + white stroke for readability -->
    <text x="512" y="472" font-family="Arial, sans-serif" font-size="96" font-weight="900" fill="#006B3F" stroke="#FFFFFF" stroke-width="10" paint-order="stroke" text-anchor="middle" dominant-baseline="middle">Ma3</text>
  </g>
</svg>`;
};

const makeSplashSvg = () => {
  // Transparent PNG; Expo will show backgroundColor (#006B3F) behind it.
  // Make the mark large and centered so it doesn't appear tiny.
  return `<svg width="1242" height="2688" viewBox="0 0 1242 2688" xmlns="http://www.w3.org/2000/svg">
  <rect width="1242" height="2688" fill="#006B3F"/>
  <g transform="translate(0, 0)">
    <g transform="translate(20, 640) scale(1.35)">
      <rect x="120" y="220" width="784" height="440" rx="56" ry="56" fill="#FFFFFF"/>
      <path d="M 170 220 L 210 70 L 814 70 L 854 220 Z" fill="#FFFFFF"/>

      <rect x="205" y="270" width="150" height="140" rx="20" fill="#006B3F"/>
      <rect x="385" y="270" width="150" height="140" rx="20" fill="#006B3F"/>
      <rect x="565" y="270" width="150" height="140" rx="20" fill="#006B3F"/>

      <rect x="120" y="470" width="784" height="56" fill="#FFD700"/>
      <rect x="120" y="526" width="784" height="56" fill="#006B3F"/>
      <rect x="120" y="582" width="784" height="56" fill="#FF0000"/>

      <circle cx="250" cy="700" r="80" fill="#1b1b1b"/>
      <circle cx="774" cy="700" r="80" fill="#1b1b1b"/>

      <!-- Place Ma3 on the yellow stripe so it doesn't get hidden by windows -->
      <text x="512" y="498" font-family="Arial, sans-serif" font-size="150" font-weight="900" fill="#006B3F" text-anchor="middle" dominant-baseline="middle">Ma3</text>
    </g>

    <text x="621" y="1860" font-family="Arial, sans-serif" font-size="72" font-weight="700" fill="#FFFFFF" text-anchor="middle">Panda. Lipa. Fika.</text>
  </g>
</svg>`;
};

async function main() {
  const assetsDir = path.join(__dirname, 'assets');

  const iconSvg = makeVehicleMarkSvg({ transparentBackground: false });
  const adaptiveSvg = makeVehicleMarkSvg({ transparentBackground: true });
  const splashSvg = makeSplashSvg();

  await sharp(Buffer.from(iconSvg)).png().toFile(path.join(assetsDir, 'icon.png'));
  await sharp(Buffer.from(adaptiveSvg)).png().toFile(path.join(assetsDir, 'adaptive-icon.png'));
  await sharp(Buffer.from(splashSvg)).png().toFile(path.join(assetsDir, 'splash.png'));

  console.log('✅ Generated assets/icon.png');
  console.log('✅ Generated assets/adaptive-icon.png');
  console.log('✅ Generated assets/splash.png');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
