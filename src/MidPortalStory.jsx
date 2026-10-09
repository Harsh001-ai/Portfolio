import React, { useEffect, useRef, useState, useCallback } from 'react';
import SequenceCanvas from './components/SequenceCanvas';

/**
 * MidPortalStory Component
 * 
 * Second cinematic scrollytelling gateway: "COME, LET'S SEE MORE"
 * Positioned between Capabilities and Selected Work.
 * Features 40 Full HD frames from ./frames_mid/ depicting the developer workstation,
 * Astro Bot greeting, and warp transition into Selected Work.
 */
export default function MidPortalStory({
  portalConfig,
}) {
  const containerRef = useRef(null);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
  const [scrubProgress, setScrubProgress] = useState(0);
  const [activeStage, setActiveStage] = useState(null);

  const config = portalConfig || (window.PORTFOLIO_DATA ? window.PORTFOLIO_DATA.midStory : {
    totalFrames: 40,
    folderPath: './frames_mid',
    filePrefix: 'ezgif-frame-',
    fileExt: '.jpg',
    stages: [
      {
        id: 'portal-01',
        eyebrow: '01 // THE INVITATION',
        headline: "COME, LET'S SEE MORE.",
        leadText: 'The developer display awakens with kinetic golden ribbons, framing an invitation into the creative workshop.',
        telemetry: 'STATUS: GATEWAY_STANDBY // FLUX: NOMINAL // SIGNAL: READY',
        startProgress: 0.00,
        endProgress: 0.35,
        frameRange: [1, 12],
      },
      {
        id: 'portal-02',
        eyebrow: '02 // DIRECT GREETING',
        headline: "WELCOME ABOARD, EXPLORER.",
        leadText: 'Astro Bot leans into view with vibrant digital eyes, offering a warm and curious salute to companions of craft.',
        telemetry: 'COMPANION: ASTRO_BOT // OPTICS: CALIBRATED // TRUST: 100%',
        startProgress: 0.35,
        endProgress: 0.70,
        frameRange: [13, 26],
      },
      {
        id: 'portal-03',
        eyebrow: '03 // ACCELERATION & BREACH',
        headline: "ENTERING SELECTED WORK.",
        leadText: 'Twin ion thrusters ignite in luminous azure fire, initiating a rapid orbital dive straight toward the project archives.',
        telemetry: 'VELOCITY: WARP_0.8 // TRAJECTORY: PORTFOLIO_INDEX // TARGET: LOCKED',
        startProgress: 0.70,
        endProgress: 1.00,
        frameRange: [27, 40],
      },
    ],
  });

  const totalFrames = config.totalFrames || 40;
  const stages = config.stages || [];

  const getFrameUrl = useCallback((index) => {
    const padded = String(index).padStart(3, '0');
    return `${config.folderPath}/${config.filePrefix}${padded}${config.fileExt}`;
  }, [config]);

  // Preload frames
  useEffect(() => {
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
          setActiveStage(stages[0]);
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
  }, [config, totalFrames, stages, getFrameUrl]);

  // Scroll synchronization
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

        // Frame calculation
        const maxIndex = images.length - 1;
        const targetIndex = Math.min(maxIndex, Math.max(0, Math.round(progress * maxIndex)));
        setCurrentFrameIndex(targetIndex);

        // Stage calculation
        let matchedStage = stages[0];
        for (let i = 0; i < stages.length; i++) {
          if (progress >= stages[i].startProgress && progress <= stages[i].endProgress) {
            matchedStage = stages[i];
            break;
          }
        }
        if (progress >= 0.98) {
          matchedStage = stages[stages.length - 1];
        }

        if (matchedStage && (!activeStage || matchedStage.id !== activeStage.id)) {
          setActiveStage(matchedStage);
          if (window.AV_SOUND && window.AV_SOUND.isEnabled()) {
            if (matchedStage.id === 'portal-03') {
              window.AV_SOUND.playPortalPulse();
            } else {
              window.AV_SOUND.playChapterChime(stages.indexOf(matchedStage) + 1);
            }
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isLoading, images, stages, activeStage]);

  const currentStage = activeStage || stages[0] || {};

  return (
    <section
      ref={containerRef}
      className="mid-portal-scroll-container"
      id="portalScrollContainer"
      aria-label="Gateway: Come Let's See More"
    >
      <div className="mid-portal-sticky-viewport">
        <div className="mid-portal-stage-grid">
          
          {/* Visual Canvas Frame */}
          <div className="portal-canvas-frame">
            <SequenceCanvas
              images={images}
              currentFrameIndex={currentFrameIndex}
              totalFrames={totalFrames}
              scrubProgress={scrubProgress}
            />

            <span className="canvas-hud-badge canvas-hud-top-left">
              <span className="hud-pulse-dot" style={{ backgroundColor: '#fbbf24', boxShadow: '0 0 8px #fbbf24' }}></span>
              GATEWAY_MONITOR // ARCHIVE
            </span>
            <span className="canvas-hud-badge canvas-hud-bottom-left">
              PORTAL: {String(currentFrameIndex + 1).padStart(2, '0')}/40
            </span>
            <span className="canvas-hud-badge canvas-hud-bottom-right" style={{ color: '#fbbf24' }}>
              GATEWAY: {Math.round(scrubProgress * 100)}%
            </span>
          </div>

          {/* Kinetic Narrative Card */}
          <div className="portal-narrative-card">
            <div className="portal-progress-strip">
              <span className="portal-stage-label">{currentStage.eyebrow}</span>
              <div className="portal-segmented-bar" aria-label="Gateway stage progress">
                {stages.map((stg) => {
                  let fillPct = 0;
                  if (scrubProgress >= stg.endProgress) {
                    fillPct = 100;
                  } else if (scrubProgress > stg.startProgress) {
                    const span = stg.endProgress - stg.startProgress;
                    fillPct = Math.min(Math.max(((scrubProgress - stg.startProgress) / span) * 100, 0), 100);
                  }

                  return (
                    <div key={stg.id} className="portal-segment">
                      <div
                        className="portal-segment-fill"
                        style={{ width: `${fillPct}%` }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="portal-eyebrow">
              <span className="chapter-eyebrow-dot" style={{ backgroundColor: '#fbbf24', boxShadow: '0 0 8px #fbbf24' }}></span>
              <span>WORKSHOP GATEWAY</span>
            </div>

            <h2 className="portal-headline">
              {currentStage.headline}
            </h2>

            <p className="portal-lead">
              {currentStage.leadText}
            </p>

            <div className="portal-telemetry-box">
              <code>{currentStage.telemetry}</code>
            </div>

            <div>
              <a href="#work" className="btn btn-primary" style={{ padding: '0.85rem 1.75rem' }}>
                Explore Selected Projects
                <span className="btn-icon">↓</span>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
