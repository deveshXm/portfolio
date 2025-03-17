const fs = require('fs');
const sharp = require('sharp');

async function generateFavicon() {
  try {
    // Read the SVG file
    const svgBuffer = fs.readFileSync('./icon.svg');
    
    // Generate favicon with multiple sizes
    const sizes = [16, 32, 48, 64, 128, 256];
    
    for (const size of sizes) {
      await sharp(svgBuffer)
        .resize(size, size)
        .toFile(`./favicon-${size}.png`);
      
      console.log(`Generated ${size}x${size} favicon`);
    }
    
    // Convert to ICO using sharp (this is a workaround since sharp doesn't directly support ICO)
    const pngBuffer = await sharp(svgBuffer)
      .resize(32, 32)
      .png()
      .toBuffer();
    
    fs.writeFileSync('./src/app/favicon.ico', pngBuffer);
    console.log('Favicon generated successfully!');
    
  } catch (error) {
    console.error('Error generating favicon:', error);
  }
}

generateFavicon();