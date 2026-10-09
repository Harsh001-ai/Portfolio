import React, { useEffect, useRef, useCallback } from 'react';

/**
 * SequenceCanvas Component
 * High-performance HTML5 Canvas rendering for the 240-frame sequence.
 */
export default function SequenceCanvas({
  images,
  currentFrameIndex,
  totalFrames = 240,
  scrubProgress = 0,
}) {
  const canvasRef = useRef(null);

  const drawFrame = useCallback((img) => {
    const canvas = canvasRef.current;
    if (!canvas || !img || !img.complete || img.naturalWidth === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;

    ctx.clearRect(0, 0, cw, ch);

    // Maintain 16:9 aspect ratio ('contain')
    const scale = Math.min(cw / iw, ch / ih);
    const w = iw * scale;
    const h = ih * scale;
    const x = (cw - w) / 2;
    const y = (ch - h) / 2;

    ctx.drawImage(img, x, y, w, h);
  }, []);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const parent = canvas.parentElement;
    const w = parent ? parent.clientWidth : window.innerWidth;
    const h = parent ? parent.clientHeight : window.innerHeight;

    canvas.width = w * dpr;
    canvas.height = h * dpr;

    if (currentFrameIndex >= 0 && images[currentFrameIndex]) {
      drawFrame(images[currentFrameIndex]);
    }
  }, [images, currentFrameIndex, drawFrame]);

  useEffect(() => {
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, [resizeCanvas]);

  useEffect(() => {
    if (currentFrameIndex >= 0 && images[currentFrameIndex]) {
      drawFrame(images[currentFrameIndex]);
    }
  }, [currentFrameIndex, images, drawFrame]);

  return (
    <div className="story-canvas-stage">
      <canvas ref={canvasRef} id="heroSequenceCanvas" width="1920" height="1080" />

      {/* Telemetry Badges */}
      <span className="canvas-hud-badge canvas-hud-top-left">
        <span className="hud-pulse-dot" />
        ASTRO_UNIT // V.240
      </span>
      <span className="canvas-hud-badge canvas-hud-bottom-left">
        FRAME: {String(currentFrameIndex + 1).padStart(3, '0')} / {totalFrames}
      </span>
      <span className="canvas-hud-badge canvas-hud-bottom-right">
        SCRUB: {Math.round(scrubProgress * 100)}%
      </span>
    </div>
  );
}
