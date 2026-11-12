import * as THREE from 'three';

// Cache generated textures so they are created once
const textureCache = new Map();

/**
 * Generates a procedural CanvasTexture for the top frosting spatula swirl
 */
export const getButtercreamTopTexture = () => {
  if (textureCache.has('buttercream_top')) {
    return textureCache.get('buttercream_top');
  }

  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  // Neutral 128, 128, 255 normal map base
  ctx.fillStyle = '#8080ff';
  ctx.fillRect(0, 0, size, size);

  const cx = size / 2;
  const cy = size / 2;

  // Draw gentle concentric and spiral spatula ridges
  ctx.lineWidth = 14;
  for (let r = 25; r < size * 0.48; r += 28) {
    ctx.beginPath();
    // Slightly eccentric spiral
    ctx.ellipse(cx, cy, r, r * 0.95, 0.4, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(160, 160, 255, 0.35)';
    ctx.stroke();

    ctx.beginPath();
    ctx.ellipse(cx + 2, cy + 2, r, r * 0.95, 0.4, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(90, 90, 220, 0.35)';
    ctx.stroke();
  }

  // Add subtle creaming pores (fine noise)
  const imgData = ctx.getImageData(0, 0, size, size);
  const data = imgData.data;
  for (let i = 0; i < data.length; i += 4) {
    const noise = (Math.random() - 0.5) * 12;
    data[i] = Math.min(255, Math.max(0, data[i] + noise));
    data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + noise));
  }
  ctx.putImageData(imgData, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  textureCache.set('buttercream_top', texture);
  return texture;
};

/**
 * Generates a procedural CanvasTexture for the side frosting horizontal spatula marks
 */
export const getButtercreamSideTexture = () => {
  if (textureCache.has('buttercream_side')) {
    return textureCache.get('buttercream_side');
  }

  const width = 1024;
  const height = 512;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  // Normal base
  ctx.fillStyle = '#8080ff';
  ctx.fillRect(0, 0, width, height);

  // Horizontal spatula bands
  for (let y = 15; y < height; y += 32) {
    const bandHeight = 10 + Math.random() * 8;
    // Highlight ridge
    ctx.fillStyle = 'rgba(165, 165, 255, 0.3)';
    ctx.fillRect(0, y, width, bandHeight / 2);
    // Shadow furrow
    ctx.fillStyle = 'rgba(95, 95, 230, 0.3)';
    ctx.fillRect(0, y + bandHeight / 2, width, bandHeight / 2);
  }

  // Creaming pores noise
  const imgData = ctx.getImageData(0, 0, width, height);
  const data = imgData.data;
  for (let i = 0; i < data.length; i += 4) {
    const noise = (Math.random() - 0.5) * 10;
    data[i] = Math.min(255, Math.max(0, data[i] + noise));
    data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + noise));
  }
  ctx.putImageData(imgData, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  textureCache.set('buttercream_side', texture);
  return texture;
};

/**
 * Generates an elegant Carrara marble texture for the cake board
 */
export const getMarbleTexture = () => {
  if (textureCache.has('marble')) {
    return textureCache.get('marble');
  }

  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  // Pristine white base
  ctx.fillStyle = '#F8F9FA';
  ctx.fillRect(0, 0, size, size);

  // Soft subtle gray marble veins
  ctx.strokeStyle = 'rgba(215, 218, 224, 0.45)';
  ctx.lineWidth = 3;
  ctx.lineCap = 'round';

  for (let i = 0; i < 8; i++) {
    ctx.beginPath();
    let x = Math.random() * size;
    let y = 0;
    ctx.moveTo(x, y);

    while (y < size) {
      x += (Math.random() - 0.48) * 45;
      y += 20 + Math.random() * 30;
      ctx.lineTo(x, y);
    }
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  textureCache.set('marble', texture);
  return texture;
};
