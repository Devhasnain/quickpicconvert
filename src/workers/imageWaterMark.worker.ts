// imageWaterMark.worker.js
//
// Runs inside a dedicated Web Worker. Receives already-decoded ImageBitmaps
// -- transferred, not structurally cloned, from the main thread -- plus
// each watermark's position/size/rotation/opacity, and composites them onto
// an OffscreenCanvas at full resolution.
//
// No file decoding happens here anymore: that used to run twice (once via
// `new Image()` on the main thread for the Konva preview, once via
// `createImageBitmap(file)` here for export). Now the main thread decodes
// each file exactly once into an ImageBitmap and reuses it for both the
// preview and (a cheap in-memory copy of) the export, so this worker's only
// job is the actual pixel compositing.
//
// IMPORTANT: because this file uses `export`, it must be instantiated as a
// module worker:
//   new Worker(new URL('./imageWaterMark.worker.js', import.meta.url), { type: 'module' })

export async function compositeWatermark(bgBitmap:ImageBitmap, watermarks:any[],) {

  const canvas = new OffscreenCanvas(bgBitmap.width, bgBitmap.height);
  const ctx = canvas.getContext('2d');

  if(!ctx) return

  // 1. draw the background at its native resolution
  ctx.drawImage(bgBitmap, 0, 0, bgBitmap.width, bgBitmap.height);

  // 2. draw each watermark on top, respecting its own position/size/rotation/opacity
  for (const wm of watermarks) {
    ctx.save();
    ctx.globalAlpha = Math.min(1, Math.max(0, wm.opacity));
    ctx.translate(wm.centerX, wm.centerY);
    ctx.rotate((wm.rotation * Math.PI) / 180);
    ctx.drawImage(wm.bitmap, -wm.width / 2, -wm.height / 2, wm.width, wm.height);
    ctx.restore();
  }

  return canvas.convertToBlob();
}

self.onmessage = async (e) => {
  const { type, id, payload } = e.data;
  if (type !== 'COMPOSITE') return;

  const { bgBitmap, watermarks } = payload;

  try {
    const blob = await compositeWatermark(bgBitmap, watermarks);
    self.postMessage({ type: 'COMPOSITE_DONE', id, blob });
  } catch (err:any) {
    self.postMessage({ type: 'COMPOSITE_ERROR', id, error: err.message || String(err) });
  } finally {
    // these were transferred copies made solely for this export, safe to close
    bgBitmap?.close?.();
    watermarks.forEach((wm:any) => wm.bitmap?.close?.());
  }
};