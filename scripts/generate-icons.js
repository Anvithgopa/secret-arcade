import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

function createPng(width, height, drawFn) {
  // 8 bytes PNG signature
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR chunk: 13 bytes
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr.writeUInt8(8, 8); // 8-bit depth
  ihdr.writeUInt8(6, 9); // RGBA color type
  ihdr.writeUInt8(0, 10); // compression method 0
  ihdr.writeUInt8(0, 11); // filter method 0
  ihdr.writeUInt8(0, 12); // interlace 0

  const ihdrChunk = createChunk('IHDR', ihdr);

  // Raw image data: height rows, each row has 1 filter byte (0) + width * 4 bytes RGBA
  const rawBytes = Buffer.alloc(height * (1 + width * 4));
  let offset = 0;

  for (let y = 0; y < height; y++) {
    rawBytes.writeUInt8(0, offset++); // filter byte: None
    for (let x = 0; x < width; x++) {
      const [r, g, b, a] = drawFn(x, y, width, height);
      rawBytes.writeUInt8(r, offset++);
      rawBytes.writeUInt8(g, offset++);
      rawBytes.writeUInt8(b, offset++);
      rawBytes.writeUInt8(a, offset++);
    }
  }

  const compressed = zlib.deflateSync(rawBytes);
  const idatChunk = createChunk('IDAT', compressed);
  const iendChunk = createChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

function crc32(buf) {
  let c;
  const table = [];
  for (let n = 0; n < 256; n++) {
    c = n;
    for (let k = 0; k < 8; k++) {
      c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
    }
    table[n] = c;
  }
  let crc = 0 ^ (-1);
  for (let i = 0; i < buf.length; i++) {
    crc = (crc >>> 8) ^ table[(crc ^ buf[i]) & 0xff];
  }
  return (crc ^ (-1)) >>> 0;
}

function createChunk(type, data) {
  const len = data.length;
  const chunk = Buffer.alloc(4 + 4 + len + 4);
  chunk.writeUInt32BE(len, 0);
  chunk.write(type, 4, 4, 'ascii');
  data.copy(chunk, 8);
  const typeAndData = Buffer.alloc(4 + len);
  typeAndData.write(type, 0, 4, 'ascii');
  data.copy(typeAndData, 4);
  const crc = crc32(typeAndData);
  chunk.writeUInt32BE(crc, 8 + len);
  return chunk;
}

// Draw arcade cabinet silhouette with neon lime screen and glowing joystick
function drawArcadeIcon(x, y, width, height) {
  const nx = x / width;
  const ny = y / height;

  // Background: dark slate #0b0d10 with rounded border
  const cx = nx - 0.5;
  const cy = ny - 0.5;
  const dist = Math.sqrt(cx * cx + cy * cy);

  // Outer border squircle
  if (Math.abs(cx) > 0.46 || Math.abs(cy) > 0.46) {
    return [0, 0, 0, 0];
  }

  // Cabinet outline
  const isBorder = Math.abs(cx) > 0.44 || Math.abs(cy) > 0.44;
  if (isBorder) {
    return [215, 255, 63, 255]; // Neon lime border
  }

  // Marquee top: [0.15, 0.28]
  if (ny >= 0.15 && ny <= 0.26 && nx >= 0.2 && nx <= 0.8) {
    return [255, 77, 141, 255]; // Neon pink marquee
  }

  // CRT Screen: [0.32, 0.62]
  if (ny >= 0.32 && ny <= 0.62 && nx >= 0.22 && nx <= 0.78) {
    // Screen bezel
    if (ny < 0.35 || ny > 0.59 || nx < 0.25 || nx > 0.75) {
      return [21, 25, 31, 255];
    }
    // Snake / space invader pixel in center of screen
    const snkX = Math.abs(nx - 0.5);
    const snkY = Math.abs(ny - 0.47);
    if ((snkX < 0.08 && snkY < 0.04) || (snkX < 0.03 && snkY < 0.08)) {
      return [215, 255, 63, 255]; // Lime snake
    }
    return [15, 35, 25, 255]; // CRT phosphor dark green
  }

  // Controls deck: [0.68, 0.82]
  if (ny >= 0.68 && ny <= 0.82 && nx >= 0.2 && nx <= 0.8) {
    // Joystick ball
    const jx = nx - 0.36;
    const jy = ny - 0.74;
    if (Math.sqrt(jx * jx + jy * jy) < 0.06) {
      return [255, 77, 141, 255]; // Pink joystick ball
    }
    // Buttons
    const b1x = nx - 0.56;
    const b1y = ny - 0.75;
    const b2x = nx - 0.68;
    const b2y = ny - 0.73;
    if (Math.sqrt(b1x * b1x + b1y * b1y) < 0.04) return [215, 255, 63, 255];
    if (Math.sqrt(b2x * b2x + b2y * b2y) < 0.04) return [0, 240, 255, 255];

    return [26, 32, 42, 255];
  }

  // Dark cabinet body
  return [11, 13, 16, 255];
}

const outDir = path.resolve('public', 'icons');
fs.mkdirSync(outDir, { recursive: true });

[16, 32, 48, 128].forEach(size => {
  const png = createPng(size, size, drawArcadeIcon);
  const dest = path.join(outDir, `icon-${size}.png`);
  fs.writeFileSync(dest, png);
  console.log(`Generated ${dest} (${size}x${size})`);
});
