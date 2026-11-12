/**
 * Canvas Export Utility for Konva Stage
 */

export const exportStageToDataUrl = (stageRef, pixelRatio = 2) => {
  if (!stageRef || !stageRef.current) return null;
  try {
    return stageRef.current.toDataURL({
      pixelRatio,
      mimeType: 'image/png',
      quality: 0.95
    });
  } catch (err) {
    console.error('Error generating image from stage:', err);
    return null;
  }
};

export const downloadCakeImage = (stageRef, filename = 'my-dream-cake.png') => {
  if (!stageRef || !stageRef.current) return false;
  try {
    const dataUrl = stageRef.current.toDataURL({
      pixelRatio: 3,
      mimeType: 'image/png'
    });
    
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
