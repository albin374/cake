/**
 * Geometrical Surface Boundary Validation & Coordinate Mapping
 * Supports both 2D canvas coordinates (cx: 250, cy: 165) and 3D world space coordinates
 */

export const clampToCakeSurface = (x, y, shape = 'round') => {
  const cx = 250;
  const cy = 165;

  if (shape === 'round') {
    const rx = 135;
    const ry = 68;
    const dx = x - cx;
    const dy = y - cy;
    const distSq = (dx * dx) / (rx * rx) + (dy * dy) / (ry * ry);

    if (distSq <= 1.0) {
      return { x, y };
    }
    const angle = Math.atan2(dy / ry, dx / rx);
    return {
      x: Math.round(cx + Math.cos(angle) * (rx * 0.94)),
      y: Math.round(cy + Math.sin(angle) * (ry * 0.94))
    };
  }

  if (shape === 'heart') {
    const rx = 130;
    const ry = 66;
    const dx = x - cx;
    const dy = y - cy;
    const nx = dx / rx;
    const ny = -dy / ry;
    const heartDist = Math.pow(nx * nx + Math.pow(ny - Math.sqrt(Math.abs(nx)), 2), 0.5);

    if (heartDist <= 1.05 && ny >= -0.85 && ny <= 1.1) {
      return { x, y };
    }

    const angle = Math.atan2(dy, dx);
    return {
      x: Math.round(cx + Math.cos(angle) * (rx * 0.88)),
      y: Math.round(cy + Math.sin(angle) * (ry * 0.88))
    };
  }

  if (shape === 'square') {
    const rx = 126;
    const ry = 64;
    const dx = Math.abs(x - cx);
    const dy = Math.abs(y - cy);
    const diamondDist = dx / rx + dy / ry;

    if (diamondDist <= 0.96) {
      return { x, y };
    }
    const factor = 0.92 / diamondDist;
    return {
      x: Math.round(cx + (x - cx) * factor),
      y: Math.round(cy + (y - cy) * factor)
    };
  }

  if (shape === 'rectangle') {
    const rx = 150;
    const ry = 56;
    const dx = Math.abs(x - cx);
    const dy = Math.abs(y - cy);

    if (dx <= rx * 0.94 && dy <= ry * 0.94) {
      return { x, y };
    }
    return {
      x: Math.round(Math.max(cx - rx * 0.92, Math.min(cx + rx * 0.92, x))),
      y: Math.round(Math.max(cy - ry * 0.92, Math.min(cy + ry * 0.92, y)))
    };
  }

  return { x, y };
};

/**
 * Maps 2D canvas coordinates (cx: 250, cy: 165) to 3D surface coordinates [x, y, z]
 */
export const canvas2DTo3D = (x, y, topY = 0.74) => {
  return {
    x3d: (x - 250) / 95,
    y3d: topY,
    z3d: (y - 165) / 95
  };
};

/**
 * Maps 3D surface coordinates [x, y, z] back to 2D canvas coordinates
 */
export const space3DTo2D = (x3d, z3d) => {
  return {
    x: Math.round(250 + x3d * 95),
    y: Math.round(165 + z3d * 95)
  };
};
