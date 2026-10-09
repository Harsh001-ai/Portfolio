/**
 * ==============================================================================
 * MID-PAGE CINEMATIC SCROLL STORY: "COME, LET'S SEE MORE"
 * ==============================================================================
 * Independent second canvas engine orchestrating:
 * - 40 Full HD frames from ./frames_mid/
 * - Stage-synchronized kinetic scrollytelling text
 * - Device pixel ratio crisp rendering (16:9 aspect ratio preservation)
 * - Seamless transition directly into Selected Work / Featured Projects
 * - rAF performance throttling and repaint optimization
 * ==============================================================================
 */

(function () {
  'use strict';

  const midData = window.PORTFOLIO_DATA ? window.PORTFOLIO_DATA.midStory : null;
  if (!midData) {
    console.warn('midStory configuration not found in PORTFOLIO_DATA.');
    return;
  }

  // DOM Elements
  const container = document.getElementById('portalScrollContainer');
  const canvas = document.getElementById('portalSequenceCanvas');
  if (!container || !canvas) return;

  const ctx = canvas.getContext('2d');
  const stageEyebrow = document.getElementById('portalStageEyebrow');
  const stageTitle = document.getElementById('portalStageTitle');
  const stageLead = document.getElementById('portalStageLead');
  const stageTelemetry = document.getElementById('portalStageTelemetry');
  const portalHudFrame = document.getElementById('portalHudFrame');
  const portalHudScrub = document.getElementById('portalHudScrub');
  const portalProgressSegments = document.querySelectorAll('.portal-segment-fill');

  // Accessibility & Mobile Checks
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobile = window.innerWidth < 768;
  const frameStep = isMobile ? 2 : 1;

  // Frame Cache
  const images = [];
  let loadedCount = 0;
  let currentFrameIndex = -1;
  let activeStageId = null;
  let rafId = null;

  // Compile frame list to load
  const framesToLoad = [];
  if (prefersReducedMotion) {
    framesToLoad.push(1);
  } else {
    for (let i = 1; i <= midData.totalFrames; i += frameStep) {
      framesToLoad.push(i);
    }
    if (framesToLoad[framesToLoad.length - 1] !== midData.totalFrames) {
      framesToLoad.push(midData.totalFrames); // Always guarantee the actual final frame is loaded
    }
  }

  const totalToLoad = framesToLoad.length;

  function getFrameUrl(frameNum) {
    const padded = String(frameNum).padStart(3, '0');
    return `${midData.folderPath}/${midData.filePrefix}${padded}${midData.fileExt}`;
  }

  // Draw frame on canvas with aspect ratio preservation (contain)
  function drawFrame(img) {
    if (!img || !img.complete || img.naturalWidth === 0) return;

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
  }

  // Resize canvas taking devicePixelRatio into account
  function resizeCanvas() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const stage = canvas.parentElement;
    const w = stage ? stage.clientWidth : window.innerWidth;
    const h = stage ? stage.clientHeight : window.innerHeight;

    canvas.width = w * dpr;
    canvas.height = h * dpr;

    if (currentFrameIndex >= 0 && images[currentFrameIndex]) {
      drawFrame(images[currentFrameIndex]);
    }
  }

  function renderFrame(index) {
    if (index < 0 || index >= images.length) return;
    currentFrameIndex = index;
    drawFrame(images[index]);

    if (portalHudFrame) {
      const realFrameNumber = framesToLoad[index] || (index + 1);
      portalHudFrame.textContent = `PORTAL: ${String(realFrameNumber).padStart(2, '0')}/40`;
    }
  }

  /*
   * ==============================================================================
   * KINETIC STAGE SYNCHRONIZATION
   * ==============================================================================
   */
  function updatePortalNarrative(progress) {
    const stages = midData.stages;
    let currentStage = stages[0];

    for (let i = 0; i < stages.length; i++) {
      if (progress >= stages[i].startProgress && progress <= stages[i].endProgress) {
        currentStage = stages[i];
        break;
      }
    }

    if (progress >= 0.98) {
      currentStage = stages[stages.length - 1];
    }

    // Update segmented progress bars
    if (portalProgressSegments && portalProgressSegments.length === stages.length) {
      stages.forEach((stg, idx) => {
        const seg = portalProgressSegments[idx];
        if (!seg) return;

        if (progress >= stg.endProgress) {
          seg.style.width = '100%';
        } else if (progress < stg.startProgress) {
          seg.style.width = '0%';
        } else {
          const span = stg.endProgress - stg.startProgress;
          const local = (progress - stg.startProgress) / span;
          seg.style.width = `${Math.min(Math.max(local * 100, 0), 100)}%`;
        }
      });
    }

    // If stage changed, animate text transition
    if (currentStage.id !== activeStageId) {
      activeStageId = currentStage.id;

      if (window.AV_SOUND && window.AV_SOUND.isEnabled()) {
        if (currentStage.id === 'portal-03') {
          window.AV_SOUND.playPortalPulse();
        } else {
          window.AV_SOUND.playChapterChime(stages.indexOf(currentStage) + 1);
        }
      }

      if (stageEyebrow) {
        stageEyebrow.textContent = currentStage.stageLabel || currentStage.eyebrow;
      }

      const stageEyebrowSub = document.getElementById('portalEyebrowSub');
      if (stageEyebrowSub && currentStage.eyebrow) {
        stageEyebrowSub.textContent = currentStage.eyebrow;
      }

      if (stageTitle) {
        stageTitle.classList.add('switching');
        setTimeout(() => {
          stageTitle.textContent = currentStage.headline;
          stageTitle.classList.remove('switching');
        }, 140);
      }

      if (stageLead) {
        stageLead.classList.add('switching');
        setTimeout(() => {
          stageLead.textContent = currentStage.leadText;
          stageLead.classList.remove('switching');
        }, 140);
      }

      if (stageTelemetry) {
        stageTelemetry.textContent = currentStage.telemetry;
      }
    }
  }

  /*
   * ==============================================================================
   * SCROLL CHOREOGRAPHY & rAF LOOP
   * ==============================================================================
   */
  function handleScroll() {
    if (rafId !== null) return;

    rafId = requestAnimationFrame(() => {
      rafId = null;

      if (images.length === 0) return;

      const rect = container.getBoundingClientRect();
      const scrollDistance = container.offsetHeight - window.innerHeight;

      if (scrollDistance <= 0) return;

      const progress = Math.min(Math.max(-rect.top / scrollDistance, 0), 1);

      // Map progress to frame index
      const maxIndex = images.length - 1;
      const targetIndex = Math.min(maxIndex, Math.max(0, Math.round(progress * maxIndex)));

      if (portalHudScrub) {
        portalHudScrub.textContent = `GATEWAY: ${Math.round(progress * 100)}%`;
      }

      updatePortalNarrative(progress);

      // Repaint guard
      if (targetIndex !== currentFrameIndex) {
        renderFrame(targetIndex);
      }
    });
  }

  // Preload Mid-Sequence Frames
  function preloadMidFrames() {
    framesToLoad.forEach((frameNum, idx) => {
      const img = new Image();
      img.src = getFrameUrl(frameNum);

      const onComplete = () => {
        loadedCount++;
        if (loadedCount === totalToLoad) {
          resizeCanvas();
          renderFrame(0);
          updatePortalNarrative(0);

          if (!prefersReducedMotion) {
            window.addEventListener('scroll', handleScroll, { passive: true });
            handleScroll();
          }
          const onMidWindowResize = () => {
            resizeCanvas();
            handleScroll();
          };
          window.addEventListener('resize', onMidWindowResize);
          window.addEventListener('orientationchange', onMidWindowResize);
        }
      };

      img.onload = onComplete;
      img.onerror = onComplete;
      images[idx] = img;
    });
  }

  document.addEventListener('DOMContentLoaded', preloadMidFrames);
})();
