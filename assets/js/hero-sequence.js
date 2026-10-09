/**
 * ==============================================================================
 * HERO CANVAS SCROLL-LINKED SEQUENCE & SYNCHRONIZED STORYTELLING ENGINE
 * ==============================================================================
 * Powers:
 * - 240-frame Astro Bot cinematic launch sequence
 * - High-DPI canvas backing store with devicePixelRatio
 * - rAF throttling (only repaints when frame index changes)
 * - Real-time 5-chapter narrative text synchronization
 * - Smooth bidirectional transitions (forward and backward scrolling)
 * - Segmented chapter progress bars & telemetry telemetry updates
 * - Interactive chapter jump navigation
 * ==============================================================================
 */

(function () {
  'use strict';

  const storyData = window.PORTFOLIO_DATA ? window.PORTFOLIO_DATA.heroStory : null;
  if (!storyData) {
    console.error('heroStory configuration not found in PORTFOLIO_DATA.');
    return;
  }

  // DOM Elements
  const container = document.getElementById('heroScrollContainer');
  const canvas = document.getElementById('heroSequenceCanvas');
  if (!canvas || !container) return;

  const ctx = canvas.getContext('2d');
  const preloader = document.getElementById('heroPreloader');
  const preloaderText = document.getElementById('preloaderText');
  const preloaderFill = document.getElementById('preloaderFill');
  const hudFrame = document.getElementById('hudFrame');
  const hudScrub = document.getElementById('hudScrub');

  // Narrative Panel DOM Elements
  const chapterIndexLabel = document.getElementById('chapterIndexLabel');
  const chapterEyebrowText = document.getElementById('chapterEyebrowText');
  const chapterTitle = document.getElementById('chapterTitle');
  const chapterDesc = document.getElementById('chapterDesc');
  const chapterTelemetry = document.getElementById('chapterTelemetry');
  const chapterJumpNav = document.getElementById('chapterJumpNav');
  const chapterActionWrap = document.getElementById('chapterActionWrap');
  const progressSegments = document.querySelectorAll('.progress-segment-fill');

  // Accessibility & Mobile Checks
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobile = window.innerWidth < 768;
  const frameStep = isMobile ? 2 : 1;

  // Frame Cache
  const images = [];
  let loadedCount = 0;
  let currentFrameIndex = -1;
  let activeChapterId = null;
  let rafId = null;

  // Compile frame list to load
  const framesToLoad = [];
  if (prefersReducedMotion) {
    framesToLoad.push(1); // Single static frame for reduced motion
  } else {
    for (let i = 1; i <= storyData.totalFrames; i += frameStep) {
      framesToLoad.push(i);
    }
    if (framesToLoad[framesToLoad.length - 1] !== storyData.totalFrames) {
      framesToLoad.push(storyData.totalFrames); // Always guarantee the actual final frame is loaded
    }
  }

  // Prevent scroll interaction until required frames are available
  if (preloader && !prefersReducedMotion) {
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
  }

  const totalToLoad = framesToLoad.length;

  function getFrameUrl(frameNum) {
    const padded = String(frameNum).padStart(3, '0');
    return `${storyData.folderPath}/${storyData.filePrefix}${padded}${storyData.fileExt}`;
  }

  // Draw frame on canvas with aspect ratio preservation (contain)
  function drawFrame(img) {
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;

    ctx.clearRect(0, 0, cw, ch);

    // Scaling math (contain mode: entire 16:9 scene fits without distortion)
    const scale = Math.min(cw / iw, ch / ih);
    const w = iw * scale;
    const h = ih * scale;
    const x = (cw - w) / 2;
    const y = (ch - h) / 2;

    ctx.drawImage(img, x, y, w, h);
  }

  // Resize canvas taking devicePixelRatio into account
  function resizeCanvas() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2); // Cap at 2 for performance
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

    if (hudFrame) {
      const realFrameNumber = framesToLoad[index] || (index + 1);
      hudFrame.textContent = `FRAME: ${String(realFrameNumber).padStart(3, '0')} / 240`;
    }
  }

  /*
   * ==============================================================================
   * SYNCHRONIZED NARRATIVE CHAPTER ENGINE
   * ==============================================================================
   */
  function updateNarrative(progress) {
    // 1. Identify active chapter based on normalized scroll progress
    const chapters = storyData.chapters;
    let currentChapter = chapters[0];

    for (let i = 0; i < chapters.length; i++) {
      if (progress >= chapters[i].startProgress && progress <= chapters[i].endProgress) {
        currentChapter = chapters[i];
        break;
      }
    }

    // Fallback if at the very end
    if (progress >= 0.99) {
      currentChapter = chapters[chapters.length - 1];
    }

    // 2. Update Segmented Progress Bars
    if (progressSegments && progressSegments.length === chapters.length) {
      chapters.forEach((ch, idx) => {
        const seg = progressSegments[idx];
        if (!seg) return;

        if (progress >= ch.endProgress) {
          seg.style.width = '100%';
        } else if (progress < ch.startProgress) {
          seg.style.width = '0%';
        } else {
          // Progress inside current chapter
          const chapterSpan = ch.endProgress - ch.startProgress;
          const chapterLocal = (progress - ch.startProgress) / chapterSpan;
          seg.style.width = `${Math.min(Math.max(chapterLocal * 100, 0), 100)}%`;
        }
      });
    }

    // 3. If Chapter changed, perform animated text transition
    if (currentChapter.id !== activeChapterId) {
      activeChapterId = currentChapter.id;

      // Play subtle chime if sound is enabled
      if (window.AV_SOUND && window.AV_SOUND.isEnabled()) {
        window.AV_SOUND.playChapterChime(parseInt(currentChapter.number, 10));
      }

      // Update Eyebrow & Index
      if (chapterIndexLabel) {
        chapterIndexLabel.textContent = currentChapter.indexLabel;
      }
      if (chapterEyebrowText) {
        chapterEyebrowText.textContent = currentChapter.eyebrow;
      }

      // Title & Description text swap with smooth cubic-bezier animation
      if (chapterTitle) {
        chapterTitle.classList.add('switching');
        setTimeout(() => {
          chapterTitle.textContent = currentChapter.title;
          chapterTitle.classList.remove('switching');
        }, 150);
      }

      if (chapterDesc) {
        chapterDesc.classList.add('switching');
        setTimeout(() => {
          chapterDesc.textContent = currentChapter.description;
          chapterDesc.classList.remove('switching');
        }, 150);
      }

      // Telemetry Box Update
      if (chapterTelemetry) {
        chapterTelemetry.textContent = currentChapter.annotation;
      }

      // Update Active Navigation Pill
      if (chapterJumpNav) {
        const buttons = chapterJumpNav.querySelectorAll('.chapter-jump-btn');
        buttons.forEach((btn, idx) => {
          if (chapters[idx].id === currentChapter.id) {
            btn.classList.add('active');
          } else {
            btn.classList.remove('active');
          }
        });
      }

      // Update CTA (if final chapter reached)
      if (chapterActionWrap) {
        if (currentChapter.cta) {
          chapterActionWrap.innerHTML = `
            <a href="${currentChapter.cta.target}" class="btn btn-primary" style="padding: 0.75rem 1.5rem; font-size: 0.85rem;">
              ${currentChapter.cta.text}
              <span class="btn-icon">↓</span>
            </a>
          `;
        } else {
          chapterActionWrap.innerHTML = `
            <div class="hero-scroll-cue-wrap">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M7 13l5 5 5-5M7 6l5 5 5-5"/>
              </svg>
              <span>Scroll to advance narrative</span>
            </div>
          `;
        }
      }
    }
  }

  /*
   * ==============================================================================
   * SCROLL-TO-FRAME & rAF CHOREOGRAPHY
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

      // Normalized progress clamped between 0 and 1
      const progress = Math.min(Math.max(-rect.top / scrollDistance, 0), 1);

      // Map progress to frame array index
      const maxIndex = images.length - 1;
      const targetIndex = Math.min(maxIndex, Math.max(0, Math.round(progress * maxIndex)));

      // Update scrub HUD
      if (hudScrub) {
        hudScrub.textContent = `SCRUB: ${Math.round(progress * 100)}%`;
      }

      // Synchronize Narrative Text
      updateNarrative(progress);

      // REPAINT ONLY WHEN FRAME INDEX ACTUALLY CHANGES
      if (targetIndex !== currentFrameIndex) {
        renderFrame(targetIndex);
      }
    });
  }

  /*
   * ==============================================================================
   * INTERACTIVE CHAPTER JUMP NAVIGATION
   * ==============================================================================
   */
  function initChapterJumps() {
    if (!chapterJumpNav) return;

    const chapters = storyData.chapters;
    chapterJumpNav.innerHTML = chapters.map((ch, idx) => `
      <button type="button" class="chapter-jump-btn ${idx === 0 ? 'active' : ''}" data-chapter-index="${idx}" title="Jump to ${ch.eyebrow}">
        ${ch.number}
      </button>
    `).join('');

    chapterJumpNav.querySelectorAll('.chapter-jump-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-chapter-index'), 10);
        const targetProgress = chapters[idx].startProgress + 0.02; // Small offset into chapter
        const scrollDistance = container.offsetHeight - window.innerHeight;
        const containerTop = container.offsetTop;
        const targetScrollY = containerTop + (scrollDistance * targetProgress);

        window.scrollTo({
          top: targetScrollY,
          behavior: 'smooth'
        });
      });
    });
  }

  /*
   * ==============================================================================
   * PRELOADING & LIFECYCLE
   * ==============================================================================
   */
  function onAllFramesLoaded() {
    if (preloader) {
      preloader.classList.add('loaded');
    }

    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';

    resizeCanvas();
    renderFrame(0);
    initChapterJumps();
    updateNarrative(0);

    if (!prefersReducedMotion) {
      window.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll();
    }
    const onWindowResize = () => {
      resizeCanvas();
      handleScroll();
    };
    window.addEventListener('resize', onWindowResize);
    window.addEventListener('orientationchange', onWindowResize);
  }

  // Preload sequence
  framesToLoad.forEach((frameNum, idx) => {
    const img = new Image();
    img.src = getFrameUrl(frameNum);

    const onComplete = () => {
      loadedCount++;
      const pct = Math.round((loadedCount / totalToLoad) * 100);

      if (preloaderText) {
        preloaderText.textContent = `Preloading Story Sequence // ${loadedCount}/${totalToLoad} (${pct}%)`;
      }
      if (preloaderFill) {
        preloaderFill.style.width = `${pct}%`;
      }

      if (loadedCount === totalToLoad) {
        onAllFramesLoaded();
      }
    };

    img.onload = onComplete;
    img.onerror = () => {
      console.warn(`Failed to preload frame: ${img.src}`);
      onComplete(); // Don't hang loader on single network glitch
    };

    images[idx] = img;
  });
})();
