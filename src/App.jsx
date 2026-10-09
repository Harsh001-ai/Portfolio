import React from 'react';
import HeroStory from './HeroStory';
import MidPortalStory from './MidPortalStory';

/**
 * App Component
 * Demonstrates the full dual-sequence scrollytelling portfolio experience in React.
 */
export default function App() {
  return (
    <div className="portfolio-app">
      {/* Background Grain Overlay */}
      <div className="grain-overlay" aria-hidden="true" />

      {/* Opening Hero Scrollytelling Experience (240 Frames) */}
      <HeroStory />

      {/* Narrative Section: About */}
      <section className="section about-section" id="about">
        <div className="container">
          <div className="section-badge-header">
            <span className="mono-label">02 // BEHIND EVERY INTERACTION IS AN IDEA</span>
          </div>
          <div className="about-grid">
            <div>
              <h2 className="about-headline">
                I turn ambitious ideas into meaningful, high-performance digital experiences.
              </h2>
              <p className="about-lead">
                Bridging the delicate space where aesthetic sensibility meets computational precision.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Capabilities */}
      <section className="section capabilities-section" id="capabilities">
        <div className="container">
          <div className="section-badge-header">
            <span className="mono-label">03 // CAPABILITIES & DISCIPLINES</span>
          </div>
          <h2 className="section-editorial-title">
            Full-spectrum creative engineering from wireframes to deployment.
          </h2>
        </div>
      </section>

      {/* Mid-Page Scrollytelling Gateway: Come Let's See More (40 Frames) */}
      <MidPortalStory />

      {/* Section: Selected Work */}
      <section className="section projects-section" id="work">
        <div className="container-wide">
          <div className="projects-header-bar">
            <div>
              <div className="section-badge-header">
                <span className="mono-label">04 // SELECTED ARCHIVES</span>
              </div>
              <h2 className="section-editorial-title">Crafted with intention and technical rigor.</h2>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
