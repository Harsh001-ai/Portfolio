import React, { useEffect, useRef, useState, useCallback } from 'react';
import SequenceCanvas from './components/SequenceCanvas';
import NarrativePanel from './components/NarrativePanel';

/**
 * HeroStory Component
 * 
 * Synchronized, Apple-caliber scroll-linked storytelling hero experience.
 * Powered by React, HTML5 Canvas, and optional GSAP ScrollTrigger integration.
 */
export default function HeroStory({
  storyConfig,
}) {
  const containerRef = useRef(null);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
  const [scrubProgress, setScrubProgress] = useState(0);
  const [activeChapter, setActiveChapter] = useState(null);

  const config = storyConfig || (window.PORTFOLIO_DATA ? window.PORTFOLIO_DATA.heroStory : null);
  const totalFrames = config ? config.totalFrames : 240;
  const chapters = config ? config.chapters : [];

  // Helper to format frame filenames
  const getFrameUrl = useCallback((index) => {
    const padded = String(index).padStart(3, '0');
    return `${config.folderPath}/${config.filePrefix}${padded}${config.fileExt}`;
  }, [config]);

  // Preload sequence
  useEffect(() => {
    if (!config) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;
    const step = isMobile ? 2 : 1;

    const framesToFetch = [];
    if (prefersReducedMotion) {
      framesToFetch.push(1);
    } else {
      for (let i = 1; i <= totalFrames; i += step) {
        framesToFetch.push(i);
      }
      if (framesToFetch[framesToFetch.length - 1] !== totalFrames) {
        framesToFetch.push(totalFrames);
      }
    }

    const totalToFetch = framesToFetch.length;
    let loadedCount = 0;
    const loadedImages = new Array(totalToFetch);

    framesToFetch.forEach((frameNum, index) => {
      const img = new Image();
      img.src = getFrameUrl(frameNum);

      const onComplete = () => {
        loadedCount++;
        setLoadProgress(Math.round((loadedCount / totalToFetch) * 100));

        if (loadedCount === totalToFetch) {
          setImages(loadedImages);
          setIsLoading(false);
          setActiveChapter(chapters[0]);
        }
      };

      img.onload = onComplete;
      img.onerror = onComplete;
      loadedImages[index] = img;
    });

    return () => {
      loadedImages.forEach((img) => {
        if (img) {
          img.onload = null;
          img.onerror = null;
        }
      });
    };
  }, [config, totalFrames, chapters, getFrameUrl]);

  // Scroll & Chapter Synchronization
  useEffect(() => {
    if (isLoading || images.length === 0) return;

    let rafId = null;

    const handleScroll = () => {
      if (rafId) return;

      rafId = requestAnimationFrame(() => {
        rafId = null;

        const container = containerRef.current;
        if (!container) return;

        const rect = container.getBoundingClientRect();
        const scrollDistance = container.offsetHeight - window.innerHeight;
        if (scrollDistance <= 0) return;

        const progress = Math.min(Math.max(-rect.top / scrollDistance, 0), 1);
        setScrubProgress(progress);

        // Map to frame index
        const maxIndex = images.length - 1;
        const targetFrame = Math.min(maxIndex, Math.max(0, Math.round(progress * maxIndex)));
        setCurrentFrameIndex(targetFrame);

        // Update active chapter
        let matchingChapter = chapters[0];
        for (let i = 0; i < chapters.length; i++) {
          if (progress >= chapters[i].startProgress && progress <= chapters[i].endProgress) {
            matchingChapter = chapters[i];
            break;
          }
        }
        if (progress >= 0.99) {
          matchingChapter = chapters[chapters.length - 1];
        }

        setActiveChapter(matchingChapter);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isLoading, images, chapters]);

  // Handle direct click on chapter jump navigation
  const handleJumpToChapter = useCallback((index) => {
    const container = containerRef.current;
    if (!container || !chapters[index]) return;

    const targetProgress = chapters[index].startProgress + 0.02;
    const scrollDistance = container.offsetHeight - window.innerHeight;
    const targetScrollY = container.offsetTop + (scrollDistance * targetProgress);

    window.scrollTo({
      top: targetScrollY,
      behavior: 'smooth'
    });
  }, [chapters]);

  return (
    <section
      ref={containerRef}
      className="hero-scroll-container"
      id="heroScrollContainer"
      style={{ height: config ? config.containerHeight : '500vh' }}
    >
      <div className="hero-sticky-viewport">
        {/* Ambient glow backdrop */}
        <div className="hero-ambient-glow" aria-hidden="true" />

        <div className="hero-story-grid">
          {/* Canvas Visual Stage */}
          <SequenceCanvas
            images={images}
            currentFrameIndex={currentFrameIndex}
            totalFrames={totalFrames}
            scrubProgress={scrubProgress}
          />

          {/* Narrative Storytelling Panel */}
          <NarrativePanel
            chapters={chapters}
            activeChapter={activeChapter}
            scrubProgress={scrubProgress}
            onJumpToChapter={handleJumpToChapter}
          />
        </div>

        {/* Loading Overlay */}
        {isLoading && (
          <div className="hero-preloader" role="status" aria-live="polite">
            <div className="preloader-monogram">
              AV<span>.</span>
            </div>
            <div className="preloader-spinner" />
            <div className="preloader-text">
              Preloading Story Sequence // {loadProgress}%
            </div>
            <div className="preloader-bar-track">
              <div className="preloader-bar-fill" style={{ width: `${loadProgress}%` }} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
