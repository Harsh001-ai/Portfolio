/**
 * ==============================================================================
 * MAIN INTERACTION & UI CONTROLLER — HARSH KUMAR JHA
 * ==============================================================================
 * Powers:
 * - Dynamic data hydration from site-data.js
 * - Navigation & active link observer
 * - Mobile menu toggle
 * - Project filtering & Case Study Modal Drawer
 * - Certificate & Award Photo Full-Screen Lightbox
 * - Animated Skills Showcase with SVG Logos
 * - 8 Freelance Services & Active Freelance Section
 * - Copy-Email Interaction with Floating Toast
 * - Contact Form Validation & Mailto Fallback
 * - Live Footer Clock for Asia/Kolkata (IST) & Back-to-Top
 * ==============================================================================
 */

(function () {
  'use strict';

  const data = window.PORTFOLIO_DATA;
  if (!data) {
    console.error('PORTFOLIO_DATA not found. Ensure site-data.js is loaded first.');
    return;
  }

  // DOM Elements
  const header = document.querySelector('.site-header');
  const mobileToggleBtn = document.getElementById('mobileToggleBtn');
  const mobileNavDrawer = document.getElementById('mobileNavDrawer');
  const caseStudyModal = document.getElementById('caseStudyModal');
  const caseStudyDrawer = document.getElementById('caseStudyDrawer');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const imageLightboxModal = document.getElementById('imageLightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxCloseBtn = document.getElementById('lightboxCloseBtn');
  const footerClock = document.getElementById('footerClock');
  const backToTopBtn = document.getElementById('backToTopBtn');
  const contactForm = document.getElementById('contactForm');
  const projectTypePills = document.querySelectorAll('.type-pill-btn');
  const projectTypeInput = document.getElementById('projectTypeInput');
  const formStatusFeedback = document.getElementById('formStatusFeedback');
  const copyToast = document.getElementById('copyToast');

  /* 
   * ==============================================================================
   * 1. NAVIGATION & SCROLL TRACKING
   * ==============================================================================
   */
  function initNavigation() {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }, { passive: true });

    if (mobileToggleBtn && mobileNavDrawer) {
      mobileToggleBtn.addEventListener('click', () => {
        const isOpen = mobileNavDrawer.classList.contains('open');
        if (isOpen) {
          mobileNavDrawer.classList.remove('open');
          mobileToggleBtn.classList.remove('open');
          document.body.style.overflow = '';
        } else {
          mobileNavDrawer.classList.add('open');
          mobileToggleBtn.classList.add('open');
          document.body.style.overflow = 'hidden';
        }
      });

      document.querySelectorAll('.mobile-nav-link').forEach((link) => {
        link.addEventListener('click', () => {
          mobileNavDrawer.classList.remove('open');
          mobileToggleBtn.classList.remove('open');
          document.body.style.overflow = '';
        });
      });
    }

    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const currentId = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            if (link.getAttribute('href') === `#${currentId}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, observerOptions);

    sections.forEach((section) => sectionObserver.observe(section));
  }

  /* 
   * ==============================================================================
   * 2. RENDER WORK & PROJECTS (6 LIVE + 4 FIGMA + 1 IN PROGRESS)
   * ==============================================================================
   */
  let currentProjectFilter = 'all';

  function renderProjects() {
    const grid = document.getElementById('projectsGrid');
    if (!grid) return;

    const filtered = currentProjectFilter === 'all'
      ? data.projects
      : data.projects.filter(p => p.categoryFilter === currentProjectFilter || p.category.toLowerCase().includes(currentProjectFilter.toLowerCase()));

    grid.innerHTML = filtered.map((proj) => {
      const isFigma = proj.category.includes('Figma');
      const isInProgress = proj.status === 'In Progress';
      const techTags = proj.techStack.map(t => `<span class="tech-tag">${t}</span>`).join('');

      const liveBtnLabel = isFigma ? 'Open Figma Prototype ↗' : (isInProgress ? 'Interactive Lab' : 'View Live Project ↗');
      const liveBtnTarget = isInProgress ? '' : 'target="_blank" rel="noopener noreferrer"';
      const liveBadge = isFigma 
        ? '<span class="status-pill" style="font-size: 0.68rem; padding: 0.2rem 0.5rem; background: rgba(244, 63, 94, 0.1); border-color: rgba(244, 63, 94, 0.3); color: #f43f5e;"><span class="status-dot" style="background:#f43f5e;"></span>Figma Prototype</span>'
        : (isInProgress 
          ? '<span class="status-pill" style="font-size: 0.68rem; padding: 0.2rem 0.5rem; background: rgba(56, 189, 248, 0.1); border-color: rgba(56, 189, 248, 0.3); color: #38bdf8;"><span class="status-dot" style="background:#38bdf8;"></span>In Progress</span>'
          : '<span class="status-pill" style="font-size: 0.68rem; padding: 0.2rem 0.5rem; background: rgba(16, 185, 129, 0.1); border-color: rgba(16, 185, 129, 0.3); color: #34d399;"><span class="status-dot" style="background:#34d399;"></span>Live Website</span>');

      let displayHostname = 'project-preview.live';
      try {
        if (proj.liveUrl.startsWith('http')) {
          displayHostname = new URL(proj.liveUrl).hostname;
        } else {
          displayHostname = 'internal-experiment.local';
        }
      } catch (e) {
        displayHostname = 'interactive.preview';
      }

      const mediaHtml = proj.isMobile ? `
        <div class="project-media-wrap is-mobile-view" style="--accent: ${proj.accentColor};" role="button" tabindex="0" aria-label="Explore ${proj.title} case study">
          <div class="project-device-ambient-glow" style="background: radial-gradient(circle, ${proj.accentColor}25 0%, transparent 70%);"></div>
          <div class="project-device-frame mobile-mockup">
            <div class="mobile-speaker-notch"></div>
            <div class="device-screen-wrap">
              <img src="${proj.screenshot}" alt="${proj.title} Screen Preview" class="project-screenshot-img mobile" loading="lazy">
              <div class="project-screen-overlay">
                <span class="screen-view-cta">
                  <span>Interactive Prototype</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </span>
              </div>
            </div>
            <div class="mobile-home-indicator"></div>
          </div>
        </div>
      ` : `
        <div class="project-media-wrap" style="--accent: ${proj.accentColor};" role="button" tabindex="0" aria-label="Explore ${proj.title} case study">
          <div class="project-device-ambient-glow" style="background: radial-gradient(circle, ${proj.accentColor}18 0%, transparent 70%);"></div>
          <div class="project-device-frame browser-mockup">
            <div class="browser-chrome-bar">
              <div class="browser-dots">
                <span class="b-dot red"></span>
                <span class="b-dot yellow"></span>
                <span class="b-dot green"></span>
              </div>
              <div class="browser-address-bar">
                <svg class="browser-lock-icon" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                <span class="browser-address-text">${displayHostname}</span>
              </div>
              <div class="browser-chrome-actions">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              </div>
            </div>
            <div class="device-screen-wrap">
              <img src="${proj.screenshot}" alt="${proj.title} Screen Preview" class="project-screenshot-img" loading="lazy">
              <div class="project-screen-overlay">
                <span class="screen-view-cta">
                  <span>${isFigma ? 'Explore Figma Prototype' : (isInProgress ? 'Interactive Canvas Lab' : 'View Live Website')}</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </span>
              </div>
            </div>
          </div>
        </div>
      `;

      return `
        <article class="project-card standard" data-project-id="${proj.id}">
          ${mediaHtml}
          <div class="project-info-wrap">
            <div>
              <div class="project-card-meta">
                <span class="project-category-tag" style="color: ${proj.accentColor}">${proj.category}</span>
                ${liveBadge}
              </div>
              <h3 class="project-title">${proj.title}</h3>
              <p class="project-desc">${proj.summary}</p>
              <div class="project-tech-list">
                ${techTags}
              </div>
            </div>
            <div class="project-actions" style="margin-top: 1.5rem; display: flex; gap: 0.75rem; flex-wrap: wrap;">
              <a href="${proj.liveUrl}" ${liveBtnTarget} class="btn btn-primary" style="padding: 0.6rem 1.15rem; font-size: 0.8125rem;">
                ${liveBtnLabel}
              </a>
              <button type="button" class="btn btn-secondary view-case-study-btn" data-project-id="${proj.id}" style="padding: 0.6rem 1.15rem; font-size: 0.8125rem;">
                Project Overview
                <span class="btn-icon">→</span>
              </button>
            </div>
          </div>
        </article>
      `;
    }).join('');

    // Bind media-wrap clicks to open case study
    grid.querySelectorAll('.project-media-wrap').forEach((wrap) => {
      const openFromMedia = (e) => {
        if (e.target.closest('a')) return;
        const card = wrap.closest('.project-card');
        if (card) {
          const pId = card.getAttribute('data-project-id');
          openCaseStudy(pId);
        }
      };
      wrap.addEventListener('click', openFromMedia);
      wrap.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openFromMedia(e);
        }
      });
    });

    // Bind case study buttons
    grid.querySelectorAll('.view-case-study-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const pId = btn.getAttribute('data-project-id');
        openCaseStudy(pId);
      });
    });

    // Refresh ScrollTrigger if active
    if (window.ScrollTrigger) {
      window.ScrollTrigger.refresh();
    }
  }

  function initProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        if (window.AV_SOUND && window.AV_SOUND.isEnabled()) {
          window.AV_SOUND.playClick();
        }
        filterBtns.forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
        currentProjectFilter = btn.getAttribute('data-filter') || 'all';
        renderProjects();
      });
    });
  }

  /* 
   * ==============================================================================
   * 3. CASE STUDY DRAWER MODAL
   * ==============================================================================
   */
  function openCaseStudy(projectId) {
    const project = data.projects.find(p => p.id === projectId);
    if (!project) return;

    if (window.AV_SOUND && window.AV_SOUND.isEnabled()) {
      window.AV_SOUND.playChapterChime(2);
    }

    const cs = project.caseStudy;
    const bodyContent = document.getElementById('caseStudyBody');
    if (!bodyContent) return;

    const isFigma = project.category.includes('Figma');
    const liveLinkText = isFigma ? 'Open Interactive Figma Prototype ↗' : 'View Live Deployed Project ↗';

    bodyContent.innerHTML = `
      <span class="case-study-badge" style="color: ${project.accentColor}">${project.category} // ${project.year}</span>
      <h2 class="case-study-title">${project.title}</h2>
      <p class="case-study-summary">${project.tagline}</p>

      <div class="case-study-section-block">
        <h4>Project Overview</h4>
        <p style="color: var(--text-secondary); line-height: 1.7;">${cs.overview}</p>
      </div>

      <div class="case-study-section-block">
        <h4>The Problem & Context</h4>
        <p style="color: var(--text-secondary); line-height: 1.7;">${cs.problem}</p>
      </div>

      <div class="case-study-section-block">
        <h4>Project Goals & Requirements</h4>
        <ul class="case-study-goals-list">
          ${cs.goals.map(g => `<li>${g}</li>`).join('')}
        </ul>
      </div>

      <div class="case-study-section-block">
        <h4>Design & Technical Solution</h4>
        <p style="color: var(--text-secondary); line-height: 1.7;">${cs.solution}</p>
      </div>

      <div class="case-study-section-block">
        <h4>Key Challenges Solved</h4>
        <p style="color: var(--text-secondary); line-height: 1.7;">${cs.challenges}</p>
      </div>

      <div class="case-study-section-block">
        <h4>Verified Outcome</h4>
        <p style="color: var(--text-secondary); line-height: 1.7;">${cs.results}</p>
      </div>

      <div class="case-study-section-block">
        <h4>Technologies & Tools</h4>
        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 0.75rem;">
          ${project.techStack.map(t => `<span class="tech-tag">${t}</span>`).join('')}
        </div>
      </div>

      <div style="margin-top: 3rem; padding-top: 2rem; border-top: 1px solid var(--border-subtle); display: flex; gap: 1rem; flex-wrap: wrap;">
        <a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
          ${liveLinkText}
        </a>
        <button type="button" class="btn btn-secondary" onclick="document.getElementById('modalCloseBtn').click()">
          Close Drawer
        </button>
      </div>
    `;

    caseStudyModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function initCaseStudyModal() {
    if (modalCloseBtn && caseStudyModal) {
      modalCloseBtn.addEventListener('click', () => {
        caseStudyModal.classList.remove('open');
        document.body.style.overflow = '';
      });

      caseStudyModal.addEventListener('click', (e) => {
        if (e.target === caseStudyModal) {
          caseStudyModal.classList.remove('open');
          document.body.style.overflow = '';
        }
      });

      window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && caseStudyModal.classList.contains('open')) {
          caseStudyModal.classList.remove('open');
          document.body.style.overflow = '';
        }
      });
    }
  }

  /* 
   * ==============================================================================
   * 4. UNIVERSAL IMAGE LIGHTBOX (FOR CERTIFICATE & AWARD PHOTOGRAPH)
   * ==============================================================================
   */
  function openImageLightbox(imageSrc, captionText) {
    if (!imageLightboxModal || !lightboxImg) return;

    if (window.AV_SOUND && window.AV_SOUND.isEnabled()) {
      window.AV_SOUND.playClick();
    }

    lightboxImg.src = imageSrc;
    lightboxImg.alt = captionText || 'Enlarged Credential Photo';
    if (lightboxCaption) {
      lightboxCaption.textContent = captionText || '';
    }

    imageLightboxModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function initImageLightbox() {
    if (!imageLightboxModal) return;

    if (lightboxCloseBtn) {
      lightboxCloseBtn.addEventListener('click', () => {
        imageLightboxModal.classList.remove('open');
        document.body.style.overflow = '';
      });
    }

    imageLightboxModal.addEventListener('click', (e) => {
      if (e.target === imageLightboxModal) {
        imageLightboxModal.classList.remove('open');
        document.body.style.overflow = '';
      }
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && imageLightboxModal.classList.contains('open')) {
        imageLightboxModal.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  /* 
   * ==============================================================================
   * 5. RENDER EXPERIENCE TIMELINE & CERTIFICATE LIGHTBOX TRIGGER
   * ==============================================================================
   */
  function renderExperience() {
    const container = document.getElementById('experienceTimeline');
    if (!container) return;

    container.innerHTML = data.experience.map((exp) => {
      const highlights = exp.highlights.map(h => `<li>${h}</li>`).join('');
      const techTags = exp.technologies.map(t => `<span class="tech-tag">${t}</span>`).join('');

      return `
        <div class="timeline-entry">
          <div class="timeline-dot"></div>
          <div class="timeline-card">
            <div class="timeline-card-header">
              <span class="timeline-period">${exp.period}</span>
              <span class="status-pill" style="font-size: 0.72rem; padding: 0.25rem 0.65rem;">
                <span class="status-dot"></span>Completed & Certified
              </span>
            </div>
            <h3 class="timeline-role">${exp.role}</h3>
            <div class="timeline-org">${exp.organization} // ${exp.location}</div>
            <p style="font-size: var(--text-sm); line-height: 1.65; color: var(--text-secondary);">${exp.description}</p>
            
            <h4 style="font-size: 0.85rem; color: #ffffff; margin-top: 1.25rem; font-family: var(--font-mono); text-transform: uppercase; letter-spacing: 0.05em;">Key Contributions & Achievements:</h4>
            <ul class="timeline-highlights-list">
              ${highlights}
            </ul>
            <div style="display: flex; flex-wrap: wrap; gap: 0.4rem; margin-top: 1rem;">
              ${techTags}
            </div>

            <!-- Internship Certificate Presentation Card -->
            <div class="experience-cert-wrap">
              <div class="cert-preview-card" id="openCertBtn" role="button" tabindex="0" aria-label="View Travarsa Certificate of Internship in full resolution">
                <div class="cert-thumb-wrap">
                  <img src="${exp.certificateImage}" alt="Certificate of Internship — Travarsa Private Limited" class="cert-thumb-img" loading="lazy">
                  <div class="cert-zoom-pill">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
                    <span>Enlarge Certificate</span>
                  </div>
                </div>
                <div class="cert-info">
                  <h4>
                    <span>Verified Internship Certificate</span>
                    <span style="color: #fbbf24;">★</span>
                  </h4>
                  <p>Official Certificate of Internship awarded to <strong>Harsh Kumar Jha</strong> for Web Designing & Web Development Strategies by Travarsa Private Limited.</p>
                  <div class="cert-meta-tags">
                    <span class="tech-tag" style="color: #fbbf24; border-color: rgba(251, 191, 36, 0.3);">Issued: Sep 2024</span>
                    <span class="tech-tag">CIN: U63090WB2016PTC209094</span>
                    <span class="tech-tag">Reg. No. 209094</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      `;
    }).join('');

    const certBtn = document.getElementById('openCertBtn');
    if (certBtn) {
      certBtn.addEventListener('click', () => {
        openImageLightbox(
          'assets/images/certificate-travarsa.jpg',
          'Certificate of Internship — Web Designing & Web Development Strategies awarded to Harsh Kumar Jha by Travarsa Private Limited (Issued: Sep 2024).'
        );
      });
      certBtn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          certBtn.click();
        }
      });
    }
  }

  /* 
   * ==============================================================================
   * 6. RENDER ACHIEVEMENTS & GOLD MEDAL SPOTLIGHT
   * ==============================================================================
   */
  function renderAchievements() {
    const container = document.getElementById('achievementsSpotlight');
    if (!container) return;

    const award = data.achievements[0];
    if (!award) return;

    container.innerHTML = `
      <div class="achievement-spotlight-card">
        <div class="achievement-media-frame" id="openAwardPhotoBtn" role="button" tabindex="0" aria-label="Enlarge Gold Medal & Certificate Award Photograph">
          <img src="${award.image}" alt="Harsh Kumar Jha receiving Gold Medal and Certificate during Rewards and Recognition Program" class="achievement-img">
          <div class="cert-zoom-pill" style="opacity: 0.9; bottom: 1rem; top: auto; right: 1rem; left: auto; padding: 0.4rem 0.85rem; border-radius: var(--radius-full);">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
            <span>Click to Enlarge Photo</span>
          </div>
        </div>

        <div>
          <div class="achievement-badge-pill">
            <span style="color: #fbbf24; font-size: 0.9rem;">★</span>
            HONORED WITH GOLD MEDAL
          </div>
          <h3 class="achievement-title">${award.title}</h3>
          <p class="achievement-desc">${award.description}</p>

          <div class="achievement-meta-grid">
            ${award.meta.map(m => `
              <div>
                <div class="achievement-meta-item-label">${m.label}</div>
                <div class="achievement-meta-item-val">${m.value}</div>
              </div>
            `).join('')}
          </div>

          <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
            <button type="button" class="btn btn-primary" id="viewAwardModalBtn" style="padding: 0.75rem 1.5rem; font-size: 0.85rem;">
              Enlarge Photograph
              <span class="btn-icon">↗</span>
            </button>
            <a href="#experience" class="btn btn-secondary" style="padding: 0.75rem 1.5rem; font-size: 0.85rem;">
              View Internship Details
              <span class="btn-icon">↓</span>
            </a>
          </div>
        </div>
      </div>
    `;

    const openPhotoHandler = () => {
      openImageLightbox(
        'assets/images/award-gold-medal.jpg',
        'Rewards and Recognition Program Ceremony: Harsh Kumar Jha receiving the Gold Medal and Certificate of Excellence at Travarsa Private Limited.'
      );
    };

    const awardPhotoBtn = document.getElementById('openAwardPhotoBtn');
    const viewAwardModalBtn = document.getElementById('viewAwardModalBtn');
    if (awardPhotoBtn) awardPhotoBtn.addEventListener('click', openPhotoHandler);
    if (viewAwardModalBtn) viewAwardModalBtn.addEventListener('click', openPhotoHandler);
  }

  /* 
   * ==============================================================================
   * 7. RENDER SKILLS (DOMAINS, PHILOSOPHY & 8 OFFICIAL TECHNOLOGIES)
   * ==============================================================================
   */
  function renderSkills() {
    // 1. Render 4 Competency Domains (01 Frontend, 02 UI/UX, 03 Motion, 04 Tools)
    const domainsGrid = document.getElementById('skillsDomainsGrid');
    if (domainsGrid && data.skillDomains) {
      domainsGrid.innerHTML = data.skillDomains.map((domain) => `
        <div class="skills-domain-card" data-domain="${domain.number}">
          <div class="skills-domain-header">
            <div class="skills-domain-meta">
              <span class="skills-domain-num">${domain.number}</span>
              <span class="skills-domain-eyebrow">DOMAIN</span>
            </div>
            <h3 class="skills-domain-title">${domain.title}</h3>
            ${domain.summary ? `<p class="skills-domain-desc">${domain.summary}</p>` : ''}
          </div>
          <div class="skills-tags-wrap">
            ${domain.skills.map((s) => `
              <span class="skills-tag-pill">
                <span class="pill-name">${s.name}</span>
                ${s.badge ? `<span class="pill-badge">${s.badge}</span>` : ''}
              </span>
            `).join('')}
          </div>
        </div>
      `).join('');
    }

    // 2. Render "My Approach" Editorial Card
    const approachCard = document.getElementById('skillsApproachCard');
    if (approachCard && data.skillsApproach) {
      const { title, statement, pillars } = data.skillsApproach;
      approachCard.innerHTML = `
        <div class="approach-card-inner">
          <div class="approach-header">
            <div class="approach-badge-line">
              <span class="mono-label">PHILOSOPHY &amp; FOCUS</span>
            </div>
            <h3 class="approach-title">${title}</h3>
          </div>
          <blockquote class="approach-quote">
            <p>${statement}</p>
          </blockquote>
          ${pillars && pillars.length ? `
            <div class="approach-pillars-wrap">
              ${pillars.map(p => `
                <div class="approach-pillar-item">
                  <span class="pillar-bullet" aria-hidden="true">✓</span>
                  <span class="pillar-label">${p.label}</span>
                </div>
              `).join('')}
            </div>
          ` : ''}
        </div>
      `;
    }

    // 3. Render 8 Verified Production Technologies with Official SVG Icons
    const grid = document.getElementById('skillsTechGrid');
    if (grid && data.skills) {
      grid.innerHTML = data.skills.map((skill) => `
        <div class="tech-card" data-tech="${skill.id}">
          <div class="tech-card-header">
            <div class="tech-card-icon" aria-hidden="true">
              ${skill.iconSvg}
            </div>
            <span class="tech-card-category">${skill.category}</span>
          </div>
          <h3 class="tech-card-name">${skill.name}</h3>
          <div class="tech-card-focus">${skill.focus}</div>
          <p class="tech-card-desc">${skill.description}</p>
        </div>
      `).join('');
    }
  }

  /* 
   * ==============================================================================
   * 8. RENDER SERVICES (8 FREELANCE OFFERINGS)
   * ==============================================================================
   */
  function renderServices() {
    const grid = document.getElementById('servicesGrid');
    if (!grid) return;

    grid.innerHTML = data.services.map((s) => {
      const deliverables = s.deliverables.map(d => `<li>${d}</li>`).join('');

      return `
        <div class="service-card">
          <div>
            <div class="service-num">${s.number}</div>
            <h3 class="service-title">${s.title}</h3>
            <p class="service-desc">${s.summary}</p>
            <ul class="service-deliverables-list">
              ${deliverables}
            </ul>
          </div>
          <div class="service-footer">
            <span class="service-timeline-tag">Est: ${s.turnaround}</span>
            <a href="#contact" class="btn btn-secondary service-inquire-btn" data-service-title="${s.title}" style="padding: 0.5rem 1rem; font-size: 0.8rem;">
              Inquire
              <span class="btn-icon">→</span>
            </a>
          </div>
        </div>
      `;
    }).join('');

    grid.querySelectorAll('.service-inquire-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const sTitle = btn.getAttribute('data-service-title');
        const descField = document.getElementById('contactMessage');
        if (descField) {
          descField.value = `Hello Harsh, I would like to discuss: ${sTitle}.\n\nProject overview:\n`;
          descField.focus();
        }
      });
    });
  }

  /* 
   * ==============================================================================
   * 9. RENDER FREELANCE WORK SECTION
   * ==============================================================================
   */
  function renderFreelance() {
    const introEl = document.getElementById('freelanceIntroText');
    const gridEl = document.getElementById('freelanceProjectsGrid');

    if (introEl && data.freelance) {
      introEl.textContent = data.freelance.intro;
    }

    if (gridEl && data.freelance) {
      gridEl.innerHTML = data.freelance.projects.map((fp) => {
        const deliverables = fp.deliverables.map(d => `<li>${d}</li>`).join('');
        return `
          <div class="freelance-project-card">
            <div>
              <div class="freelance-project-header">
                <span class="freelance-client-type" style="margin-bottom: 0;">${fp.clientType}</span>
                <span class="freelance-status-pill" style="background: ${fp.statusColor}18; color: ${fp.statusColor}; border: 1px solid ${fp.statusColor}40;">
                  <span class="status-dot" style="background: ${fp.statusColor};"></span>
                  ${fp.status}
                </span>
              </div>
              <h3 class="freelance-project-title">${fp.title}</h3>
              <p class="freelance-project-desc">${fp.description}</p>
              <ul class="freelance-deliverables-list">
                ${deliverables}
              </ul>
            </div>
            <div style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-muted); border-top: 1px solid var(--border-subtle); padding-top: 1rem;">
              Note: ${fp.editableNote}
            </div>
          </div>
        `;
      }).join('');
    }
  }

  /* 
   * ==============================================================================
   * 10. COPY EMAIL INTERACTION & FLOATING TOAST
   * ==============================================================================
   */
  function initCopyEmail() {
    const copyBtns = document.querySelectorAll('.copy-email-trigger');
    copyBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const email = data.config.email;
        if (navigator.clipboard) {
          navigator.clipboard.writeText(email).then(() => {
            showCopyToast(`Email copied to clipboard: ${email}`);
          }).catch(() => {
            showCopyToast(`Email: ${email}`);
          });
        } else {
          showCopyToast(`Email: ${email}`);
        }
      });
    });
  }

  function showCopyToast(msg) {
    if (!copyToast) return;
    copyToast.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
      <span>${msg}</span>
    `;
    copyToast.classList.add('show');
    setTimeout(() => {
      copyToast.classList.remove('show');
    }, 3500);
  }

  /* 
   * ==============================================================================
   * 11. FAQ ACCORDION
   * ==============================================================================
   */
  function renderFaqs() {
    const list = document.getElementById('faqList');
    if (!list) return;

    list.innerHTML = data.faqs.map((faq, idx) => `
      <div class="faq-item" data-index="${idx}">
        <button class="faq-trigger" type="button" aria-expanded="false" aria-controls="faq-content-${idx}">
          <span>${faq.question}</span>
          <span class="faq-icon">+</span>
        </button>
        <div class="faq-content-wrap" id="faq-content-${idx}">
          <div class="faq-body">${faq.answer}</div>
        </div>
      </div>
    `).join('');

    list.querySelectorAll('.faq-trigger').forEach((trigger) => {
      trigger.addEventListener('click', () => {
        if (window.AV_SOUND && window.AV_SOUND.isEnabled()) {
          window.AV_SOUND.playClick();
        }
        const item = trigger.closest('.faq-item');
        const isOpen = item.classList.contains('active');

        list.querySelectorAll('.faq-item').forEach(i => {
          i.classList.remove('active');
          i.querySelector('.faq-trigger').setAttribute('aria-expanded', 'false');
        });

        if (!isOpen) {
          item.classList.add('active');
          trigger.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }

  /* 
   * ==============================================================================
   * 12. CONTACT FORM SUBMISSION & MAILTO FALLBACK
   * ==============================================================================
   */
  function initContactForm() {
    projectTypePills.forEach((pill) => {
      pill.addEventListener('click', () => {
        projectTypePills.forEach(p => p.classList.remove('selected'));
        pill.classList.add('selected');
        if (projectTypeInput) {
          projectTypeInput.value = pill.getAttribute('data-value') || '';
        }
      });
    });

    if (!contactForm) return;

    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const name = document.getElementById('contactName').value.trim();
      const email = document.getElementById('contactEmail').value.trim();
      const projectType = projectTypeInput ? projectTypeInput.value : 'General Inquiry';
      const budget = document.getElementById('contactBudget').value.trim();
      const message = document.getElementById('contactMessage').value.trim();
      const consent = document.getElementById('contactConsent').checked;

      if (!name || !email || !message) {
        showFormFeedback('Please fill out all required fields (Name, Email, Message).', 'error');
        return;
      }

      if (!consent) {
        showFormFeedback('Please accept the privacy consent checkbox to continue.', 'error');
        return;
      }

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.innerHTML = 'Sending Inquiry...';
      submitBtn.disabled = true;

      const formData = new FormData(contactForm);

      try {
        const response = await fetch('contact.php', {
          method: 'POST',
          body: formData
        });

        if (response.ok) {
          const result = await response.json();
          if (result.success) {
            showFormFeedback(result.message || 'Thank you! Your message has been sent successfully.', 'success');
            contactForm.reset();
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
            return;
          } else {
            throw new Error(result.error || 'Server validation error.');
          }
        } else {
          throw new Error('HTTP Status: ' + response.status);
        }
      } catch (err) {
        console.warn('Backend handler not available; switching to email client:', err.message);

        const recipient = data.config.email;
        const subject = encodeURIComponent(`Project Inquiry: ${projectType} from ${name}`);
        const mailBody = encodeURIComponent(
          `Hello Harsh,\n\nName: ${name}\nEmail: ${email}\nProject Type: ${projectType}\nBudget: ${budget || 'Not specified'}\n\nProject Scope:\n${message}`
        );

        showFormFeedback(
          `Inquiry prepared! Opening your email client to send to ${recipient}... (Details also copied to clipboard)`,
          'success'
        );

        if (navigator.clipboard) {
          navigator.clipboard.writeText(`Name: ${name}\nEmail: ${email}\nProject: ${projectType}\nBudget: ${budget}\n\n${message}`);
        }

        window.location.href = `mailto:${recipient}?subject=${subject}&body=${mailBody}`;

        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
      }
    });
  }

  function showFormFeedback(msg, type) {
    if (!formStatusFeedback) return;
    formStatusFeedback.textContent = msg;
    formStatusFeedback.className = `form-status-feedback ${type}`;
    formStatusFeedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  /* 
   * ==============================================================================
   * 13. LIVE FOOTER CLOCK (KOLKATA / IST) & BACK TO TOP
   * ==============================================================================
   */
  function initLiveClock() {
    if (!footerClock) return;

    function updateTime() {
      const now = new Date();
      const options = {
        timeZone: data.config.timezone || 'Asia/Kolkata',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZoneName: 'short'
      };
      try {
        const timeStr = new Intl.DateTimeFormat('en-US', options).format(now);
        footerClock.textContent = `KOLKATA (IST): ${timeStr}`;
      } catch (e) {
        footerClock.textContent = `LOCAL: ${now.toTimeString().split(' ')[0]} UTC`;
      }
    }

    updateTime();
    setInterval(updateTime, 1000);
  }

  function initBackToTop() {
    if (backToTopBtn) {
      backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }

  /* 
   * ==============================================================================
   * 14. CV DOWNLOAD TRACKING & FEEDBACK
   * ==============================================================================
   */
  function initCvDownload() {
    const cvButtons = document.querySelectorAll('a[href*="Harsh-Kumar-Jha-CV.pdf"]');
    cvButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        showCopyToast('Downloading Harsh Kumar Jha\'s official CV (PDF)...');
      });
    });
  }

  /* 
   * ==============================================================================
   * 15. CINEMATIC GSAP SCROLLTRIGGER REVEALS (RESPECTS PREFERS-REDUCED-MOTION)
   * ==============================================================================
   */
  function initScrollAnimations() {
    if (typeof window.gsap === 'undefined' || typeof window.ScrollTrigger === 'undefined') {
      return;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    // Subtle reveals for editorial section headlines (skipping pinned canvas containers)
    const editorialHeaders = document.querySelectorAll(
      '.about-section .section-badge-header, .about-section .about-headline, ' +
      '.experience-section .section-badge-header, .experience-section .section-editorial-title, ' +
      '.achievements-section .section-badge-header, .achievements-section .section-editorial-title, ' +
      '.projects-section .section-badge-header, .projects-section .section-editorial-title, ' +
      '.skills-section .section-badge-header, .skills-section .section-editorial-title, ' +
      '.services-section .section-badge-header, .services-section .section-editorial-title, ' +
      '.freelance-section .section-badge-header, .freelance-section .section-editorial-title, ' +
      '.contact-section .section-badge-header, .contact-section .section-editorial-title'
    );

    editorialHeaders.forEach((el) => {
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 24,
        duration: 0.65,
        ease: 'power2.out',
        immediateRender: false
      });
    });

    // About pillars stagger
    const pillarCards = document.querySelectorAll('.about-pillars-grid .pillar-card');
    if (pillarCards.length > 0) {
      gsap.from(pillarCards, {
        scrollTrigger: {
          trigger: '.about-pillars-grid',
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 28,
        stagger: 0.12,
        duration: 0.7,
        ease: 'power2.out',
        immediateRender: false
      });
    }

    // Experience timeline card & Achievement spotlight card
    const spotlightCards = document.querySelectorAll('.timeline-card, .achievement-spotlight-card');
    spotlightCards.forEach((card) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top 86%',
          toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 30,
        duration: 0.75,
        ease: 'power2.out',
        immediateRender: false
      });
    });

    // Skills competency domain cards stagger
    const domainCards = document.querySelectorAll('.skills-domain-card');
    if (domainCards.length > 0) {
      gsap.from(domainCards, {
        scrollTrigger: {
          trigger: '#skillsDomainsGrid',
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 25,
        stagger: 0.1,
        duration: 0.65,
        ease: 'power2.out',
        immediateRender: false
      });
    }

    // "My Approach" philosophy card entrance
    const approachCardEl = document.querySelector('.skills-approach-card');
    if (approachCardEl) {
      gsap.from(approachCardEl, {
        scrollTrigger: {
          trigger: '#skillsApproachCard',
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 25,
        duration: 0.65,
        ease: 'power2.out',
        immediateRender: false
      });
    }

    // Tech skills grid stagger
    const techCards = document.querySelectorAll('.tech-card');
    if (techCards.length > 0) {
      gsap.from(techCards, {
        scrollTrigger: {
          trigger: '#skillsTechGrid',
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 25,
        stagger: 0.08,
        duration: 0.65,
        ease: 'power2.out',
        immediateRender: false
      });
    }

    // Freelance cards stagger
    const freelanceCards = document.querySelectorAll('.freelance-project-card');
    if (freelanceCards.length > 0) {
      gsap.from(freelanceCards, {
        scrollTrigger: {
          trigger: '#freelanceProjectsGrid',
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 25,
        stagger: 0.1,
        duration: 0.7,
        ease: 'power2.out',
        immediateRender: false
      });
    }
  }

  // INITIALIZE ALL SYSTEMS
  document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initProjectFilters();
    renderProjects();
    initCaseStudyModal();
    initImageLightbox();
    renderExperience();
    renderAchievements();
    renderSkills();
    renderServices();
    renderFreelance();
    initCopyEmail();
    initCvDownload();
    renderFaqs();
    initContactForm();
    initLiveClock();
    initBackToTop();
    initScrollAnimations();
  });
})();
