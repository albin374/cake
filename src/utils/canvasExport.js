/**
 * Canvas Export Utility for both React Three Fiber WebGL Canvas and Konva Stage
 */

export const exportStageToDataUrl = (stageRef, pixelRatio = 2) => {
  if (!stageRef || !stageRef.current) return null;
  const target = stageRef.current;

  try {
    if (typeof target.toDataURL === 'function') {
      // Standard HTMLCanvasElement (Three.js WebGL Canvas)
      if (typeof HTMLCanvasElement !== 'undefined' && target instanceof HTMLCanvasElement) {
        return target.toDataURL('image/png', 0.95);
      }
      // Konva Stage or custom wrapper
      return target.toDataURL({
        pixelRatio,
        mimeType: 'image/png',
        quality: 0.95
      });
    }
    return null;
  } catch (err) {
    console.error('Error generating image from canvas/stage:', err);
    return null;
  }
};

export const downloadCakeImage = (stageRef, filename = 'my-dream-cake.png') => {
  if (!stageRef || !stageRef.current) return false;
  const target = stageRef.current;

  try {
    let dataUrl = null;
    if (typeof HTMLCanvasElement !== 'undefined' && target instanceof HTMLCanvasElement) {
      dataUrl = target.toDataURL('image/png', 1.0);
    } else if (typeof target.toDataURL === 'function') {
      dataUrl = target.toDataURL({
        pixelRatio: 2.5,
        mimeType: 'image/png'
      });
    }

    if (!dataUrl) return false;

    const link = document.createElement('a');
    link.download = filename;
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return true;
  } catch (err) {
    console.error('Failed to download cake design:', err);
    return false;
  }
};
