import React from 'react';

/**
 * NarrativePanel Component
 * Displays the active story chapter, segmented progress bar,
 * telemetry readout, and chapter jump navigation.
 */
export default function NarrativePanel({
  chapters = [],
  activeChapter,
  scrubProgress = 0,
  onJumpToChapter,
}) {
  if (!activeChapter) return null;

  return (
    <div className="story-narrative-panel">
      {/* Segmented Progress Indicator */}
      <div className="chapter-progress-strip">
        <span className="chapter-index-label">{activeChapter.indexLabel}</span>
        <div className="segmented-progress-bar" aria-label="Story chapter progress">
          {chapters.map((ch, idx) => {
            let fillPct = 0;
            if (scrubProgress >= ch.endProgress) {
              fillPct = 100;
            } else if (scrubProgress > ch.startProgress) {
              const span = ch.endProgress - ch.startProgress;
              fillPct = Math.min(Math.max(((scrubProgress - ch.startProgress) / span) * 100, 0), 100);
            }

            return (
              <div key={ch.id} className="progress-segment">
                <div
                  className="progress-segment-fill"
                  style={{ width: `${fillPct}%` }}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Chapter Eyebrow */}
      <div className="chapter-eyebrow">
        <span className="chapter-eyebrow-dot" />
        <span>{activeChapter.eyebrow}</span>
      </div>

      {/* Animated Chapter Title */}
      <div className="chapter-title-wrap">
        <h2 className="chapter-title">{activeChapter.title}</h2>
      </div>

      {/* Animated Chapter Description */}
      <div className="chapter-description-wrap">
        <p className="chapter-description">{activeChapter.description}</p>
      </div>

      {/* Telemetry Diagnostics Box */}
      <div className="chapter-telemetry-box">
        <code className="chapter-telemetry-code">
          {activeChapter.annotation}
        </code>
      </div>

      {/* Interactive Chapter Jump Navigation */}
      <div className="chapter-jump-nav" aria-label="Jump to story chapter">
        {chapters.map((ch, idx) => (
          <button
            key={ch.id}
            type="button"
            className={`chapter-jump-btn ${activeChapter.id === ch.id ? 'active' : ''}`}
            onClick={() => onJumpToChapter && onJumpToChapter(idx)}
            title={`Jump to ${ch.eyebrow}`}
          >
            {ch.number}
          </button>
        ))}
      </div>

      {/* Chapter Action Wrap */}
      <div className="chapter-action-wrap">
        {activeChapter.cta ? (
          <a
            href={activeChapter.cta.target}
            className="btn btn-primary"
            style={{ padding: '0.75rem 1.5rem', fontSize: '0.85rem' }}
          >
            {activeChapter.cta.text}
            <span className="btn-icon">↓</span>
          </a>
        ) : (
          <div className="hero-scroll-cue-wrap">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
            </svg>
            <span>Scroll to advance narrative</span>
          </div>
        )}
      </div>
    </div>
  );
}
