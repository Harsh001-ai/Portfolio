/**
 * ==============================================================================
 * CENTRALIZED SITE CONFIGURATION & CONTENT DATA — HARSH KUMAR JHA
 * ==============================================================================
 * Single source of truth for:
 * - Brand & Personal Identity: Harsh Kumar Jha
 * - Hero Scroll Story Sequence (240 Frames) & Mid-Page Portal (40 Frames)
 * - About, Experience & Internship (Travarsa Private Limited), Certificate Lightbox
 * - Achievements & Gold Medal Ceremony Photograph
 * - Selected Projects (6 Live Web Apps + 4 Figma Interactive Prototypes + 1 In Progress)
 * - Animated Skills (HTML5, CSS3, JavaScript, PHP, Bootstrap, Three.js, React, Figma)
 * - 8 Tailored Freelance Services & Active Freelance Showcase
 * - Direct Working Contact Information & Copy-Email Feedback
 * ==============================================================================
 */

window.PORTFOLIO_DATA = {
  // Brand & Personal Identity
  config: {
    name: "HARSH KUMAR JHA",
    shortName: "HARSH JHA",
    monogram: "HKJ",
    role: "Web Designer, UI/UX Designer & Creative Frontend Developer",
    tagline: "CRAFTING ENGAGING DIGITAL EXPERIENCES THROUGH THOUGHTFUL DESIGN & CLEAN IMPLEMENTATION",
    location: "Kolkata, West Bengal, India // Open to Remote Worldwide",
    timezone: "Asia/Kolkata", // Live footer clock (IST)
    email: "jhah14687@gmail.com",
    phone: "+91 6290177421",
    phoneFormatted: "+91 62901 77421",
    githubUrl: "https://github.com/Harsh001-aimy",
    linkedinUrl: "https://www.linkedin.com/in/harsh-kumar-jha-0ab5a6318/",
    cvUrl: "assets/docs/Harsh-Kumar-Jha-CV.pdf",
    cvAvailable: true,
    portraitUrl: "assets/images/harsh-portrait.jpg",
    copyrightYear: new Date().getFullYear(),
  },

  // Hero Image Sequence & Synchronized Scroll Story (240 Frames)
  heroStory: {
    totalFrames: 240,
    folderPath: "./frames",
    filePrefix: "ezgif-frame-",
    fileExt: ".jpg",
    containerHeight: "550vh",
    subject: "Astro Cybernetic Explorer",

    // 5 Synchronized Narrative Chapters mapped directly to visual stages
    chapters: [
      {
        id: "ch-01",
        number: "01",
        indexLabel: "CHAPTER 01 / 05",
        eyebrow: "HARSH KUMAR JHA // INTRODUCTION",
        title: "CREATIVE WEB DESIGNER.\nDIGITAL CRAFTSMAN.",
        description: "Welcome to my interactive workspace. Combining clean frontend implementation with thoughtful UI/UX principles, I build websites that look distinctive and work smoothly across all devices.",
        annotation: "STATUS: ONLINE // ROLE: FRONTEND & UI/UX // PORTFOLIO: 2026",
        startFrame: 1,
        endFrame: 48,
        startProgress: 0.00,
        endProgress: 0.20,
        accentColor: "#38bdf8"
      },
      {
        id: "ch-02",
        number: "02",
        indexLabel: "CHAPTER 02 / 05",
        eyebrow: "DESIGN & DEVELOPMENT BALANCE",
        title: "WHERE VISUAL FORM\nMEETS CLEAN CODE.",
        description: "Translating creative concepts from Figma into responsive, accessible web interfaces. Focused on visual hierarchy, fluid layouts, and intuitive user ergonomics.",
        annotation: "UI/UX: FIGMA // LAYOUT: CSS GRID & FLEX // PERFORMANCE: OPTIMIZED",
        startFrame: 49,
        endFrame: 96,
        startProgress: 0.20,
        endProgress: 0.40,
        accentColor: "#818cf8"
      },
      {
        id: "ch-03",
        number: "03",
        indexLabel: "CHAPTER 03 / 05",
        eyebrow: "PRACTICAL EXPERIENCE",
        title: "HANDS-ON LEARNING.\nTESTED IN PRODUCTION.",
        description: "Gained real-world industry experience as a Web Development Intern at Travarsa Private Limited, building responsive websites and receiving the Gold Medal of Excellence.",
        annotation: "INTERNSHIP: TRAVARSA PVT LTD // AWARD: GOLD MEDAL // COMPLETED: 2024",
        startFrame: 97,
        endFrame: 144,
        startProgress: 0.40,
        endProgress: 0.60,
        accentColor: "#f59e0b"
      },
      {
        id: "ch-04",
        number: "04",
        indexLabel: "CHAPTER 04 / 05",
        eyebrow: "LIVE PROJECTS & PROTOTYPES",
        title: "TEN REAL SHOWCASES.\nDEPLOYED & INTERACTIVE.",
        description: "From full-scale e-commerce storefronts and 3D web experiments to mobile Figma prototypes, exploring the full spectrum of modern frontend technologies.",
        annotation: "LIVE WEBSITES: 6 // FIGMA PROTOTYPES: 4 // TECH: JS, PHP, REACT, 3D",
        startFrame: 145,
        endFrame: 192,
        startProgress: 0.60,
        endProgress: 0.80,
        accentColor: "#38bdf8"
      },
      {
        id: "ch-05",
        number: "05",
        indexLabel: "CHAPTER 05 / 05",
        eyebrow: "OPEN TO OPPORTUNITIES",
        title: "READY TO COLLABORATE.\nLET'S BUILD TOGETHER.",
        description: "Available for frontend developer roles, creative team internships, and freelance client engagements worldwide. Step inside to explore my complete journey.",
        annotation: "FREELANCE: ACTIVE // LOCATION: INDIA / REMOTE // TIMEZONE: IST",
        cta: {
          text: "Explore My Story ↓",
          target: "#about"
        },
        startFrame: 193,
        endFrame: 240,
        startProgress: 0.80,
        endProgress: 1.00,
        accentColor: "#60a5fa"
      }
    ]
  },

  // Mid-Page Cinematic Scroll Story: "COME, LET'S SEE MORE" (40 Frames)
  midStory: {
    totalFrames: 40,
    folderPath: "./frames_mid",
    filePrefix: "ezgif-frame-",
    fileExt: ".jpg",
    containerHeight: "450vh",
    title: "COME, LET'S SEE MORE",
    subtitle: "A personal invitation into my live projects, interactive prototypes, and creative code archive.",
    stages: [
      {
        id: "portal-01",
        stageLabel: "01 // THE INVITATION",
        eyebrow: "GATEWAY ILLUMINATION",
        headline: "COME, LET'S SEE MORE.",
        leadText: "The developer workstation ignites with kinetic golden ribbons, inviting you directly into my project archive.",
        telemetry: "GATEWAY: ACTIVE // STATUS: READY // AUTHOR: HARSH KUMAR JHA",
        startFrame: 1,
        endFrame: 12,
        startProgress: 0.00,
        endProgress: 0.28
      },
      {
        id: "portal-02",
        stageLabel: "02 // DIRECT GREETING",
        eyebrow: "COMPANION MANIFEST",
        headline: "THE WORK AWAITS.",
        leadText: "Astro Bot extends a welcoming gesture, guiding you beyond theory into real deployed websites, Figma UI systems, and interactive code.",
        telemetry: "PORTAL: ENGAGED // PROJECTS: 10+ VERIFIED // CODE: TESTED",
        startFrame: 13,
        endFrame: 26,
        startProgress: 0.28,
        endProgress: 0.62
      },
      {
        id: "portal-03",
        stageLabel: "03 // ACCELERATION & BREACH",
        eyebrow: "PORTAL TRANSITION",
        headline: "STEPPING INTO THE ARCHIVE.",
        leadText: "Diving through the digital gateway straight into my curated web development and UI/UX project collection.",
        telemetry: "TRAJECTORY: SELECTED_WORK // ACCELERATION: 100% // STATUS: UNLOCKED",
        startFrame: 27,
        endFrame: 40,
        startProgress: 0.62,
        endProgress: 1.00
      }
    ]
  },

  // About Section & Personal Narrative
  about: {
    transitionHeadline: "02 // PERSONAL INTRODUCTION & PHILOSOPHY",
    editorialTitle: "Creating digital experiences that combine thoughtful design, smooth interactions, and functional development.",
    leadParagraph: "I’m Harsh Kumar Jha, a web designer and developer passionate about creating digital experiences that combine thoughtful design, smooth interactions, and functional development. I enjoy transforming ideas into responsive websites, exploring modern UI/UX principles, and experimenting with interactive web technologies.",
    paragraphs: [
      "Through hands-on projects and my web development internship at Travarsa Private Limited, I’ve been developing my skills in frontend development, interface design, and practical web implementation. I’m continuously learning, building, and refining my approach to creating digital products that look distinctive and work beautifully across devices.",
      "I’m open to opportunities where I can contribute creatively, learn from experienced teams, and help businesses bring their ideas to life through the web."
    ],
    pillars: [
      {
        number: "01",
        title: "Thoughtful Design",
        desc: "Balancing visual hierarchy, modern typography, and clear user ergonomics to build interfaces that are both aesthetically pleasing and easy to navigate."
      },
      {
        number: "02",
        title: "Responsive Code",
        desc: "Writing clean, semantic HTML5 and modern CSS with Flexbox and Grid to ensure pixel-precise layout consistency across mobile, tablet, and desktop viewports."
      },
      {
        number: "03",
        title: "Interactive Implementation",
        desc: "Exploring contemporary JavaScript, Bootstrap, Canvas animations, and Spline 3D integrations to make web experiences engaging and memorable."
      }
    ]
  },

  // Professional Experience Timeline & Internship
  experience: [
    {
      period: "1 Year Internship",
      current: false,
      role: "Web Development Intern",
      organization: "Travarsa Private Limited",
      location: "Kolkata, West Bengal, India",
      certificateId: "travarsa-cert",
      certificateImage: "assets/images/certificate-travarsa.jpg",
      description: "Worked on web development tasks involving responsive website layouts, frontend implementation, and practical interface development. Gained hands-on experience translating design ideas into functional web pages while improving my understanding of HTML, CSS, responsive design, and website development workflows.",
      highlights: [
        "Designed and developed multiple responsive websites using HTML and CSS.",
        "Created a personal portfolio showcasing modern UI/UX principles.",
        "Built a responsive fashion e-commerce website using HTML and CSS.",
        "Worked on website layout, visual consistency, usability, and responsive behaviour.",
        "Practised translating visual concepts into working web interfaces.",
        "Continued strengthening frontend development and problem-solving skills through practical implementation."
      ],
      technologies: ["HTML5", "CSS3", "JavaScript", "Responsive Design", "UI/UX Consistency", "Frontend Workflows"]
    }
  ],

  // Achievements, Gold Medal & Certificates
  achievements: [
    {
      id: "gold-medal-award",
      title: "Rewards & Recognition Program — Gold Medal of Excellence",
      subtitle: "Honored with the Gold Medal and Certificate of Excellence during the formal Rewards & Recognition Program.",
      organization: "Travarsa Private Limited",
      year: "2024",
      image: "assets/images/award-gold-medal.jpg",
      category: "Academic & Professional Recognition",
      description: "Acknowledged for exceptional performance, consistent frontend delivery, responsive web execution, and dedicated problem-solving during the Web Designing and Development Strategies internship program.",
      meta: [
        { label: "Award", value: "Gold Medal of Excellence" },
        { label: "Program", value: "Rewards and Recognition Program" },
        { label: "Organization", value: "Travarsa Private Limited" },
        { label: "Field", value: "Web Designing & Development Strategies" }
      ]
    },
    {
      id: "travarsa-internship-cert",
      title: "Certificate of Internship — Web Designing & Development",
      subtitle: "Official completion credential issued by Travarsa Private Limited (CIN: U63090WB2016PTC209094).",
      organization: "Travarsa Private Limited",
      year: "Sep 2024",
      image: "assets/images/certificate-travarsa.jpg",
      category: "Professional Certification",
      description: "Successfully completed formal internship training in Web Designing and Web Development Strategies, demonstrating proficiency across modern responsive web workflows.",
      meta: [
        { label: "Credential", value: "Certificate of Internship" },
        { label: "Issued Date", value: "September 2024" },
        { label: "Registration No.", value: "CIN: U63090WB2016PTC209094" },
        { label: "MSME Reg.", value: "WB14D0016367" }
      ]
    }
  ],

  // Featured Projects & Real Case Studies (with verified screenshots)
  projects: [
    {
      id: "ecommerce-platform",
      title: "Fashion & Apparel E-commerce Website",
      category: "Web Development",
      categoryFilter: "web",
      year: "2024",
      status: "Completed",
      role: "Frontend Developer",
      featured: true,
      tagline: "An e-commerce website project focused on presenting products through a structured digital shopping experience.",
      summary: "An e-commerce website project focused on presenting products through a structured digital shopping experience. Features categorized product grids, promotional deals, responsive navigation, and mobile layout support.",
      techStack: ["HTML5", "CSS3", "JavaScript", "Font Awesome", "Responsive Design"],
      liveUrl: "https://e-commerce-six-delta-20.vercel.app/",
      screenshot: "assets/images/projects/project-ecommerce.jpg",
      accentColor: "#38bdf8",
      caseStudy: {
        overview: "Developed as a central project during my internship, this e-commerce platform provides a structured, responsive shopping experience designed to highlight fashion products effectively.",
        problem: "Creating an engaging product catalog that maintains visual balance, legible product cards, and smooth navigation across varying mobile screen widths without layout breaking.",
        goals: [
          "Build a fully responsive layout from 320px mobile up to desktop screens.",
          "Implement intuitive category navigation and interactive drawer menu.",
          "Ensure fast load times using clean vanilla HTML, CSS, and JavaScript."
        ],
        solution: "Structured modular CSS with custom media queries and Flexbox layouts. Engineered an accessible toggle navigation for mobile and organized product cards with hover states.",
        challenges: "Ensuring consistent aspect ratios for varied product photos and maintaining tap ergonomics on touchscreens.",
        results: "Delivered a clean, functional e-commerce interface with responsive grid behavior and positive mentor evaluation."
      }
    },
    {
      id: "startup3-framework",
      title: "StartUp3 — Creative Agency & Framework",
      category: "Web Development",
      categoryFilter: "web",
      year: "2024",
      status: "Completed",
      role: "Web Designer & Frontend Developer",
      featured: true,
      tagline: "A web design exploration focused on layout, visual presentation, and contemporary interface styling.",
      summary: "A web design exploration focused on layout, visual presentation, and contemporary interface styling. Incorporates an ambient video hero background, sleek modern typography, and structured multi-page navigation.",
      techStack: ["HTML5", "CSS3", "Background Video", "Responsive Layout", "Font Awesome"],
      liveUrl: "https://new-design-project.vercel.app/",
      screenshot: "assets/images/projects/project-startup3.jpg",
      accentColor: "#818cf8",
      caseStudy: {
        overview: "StartUp3 is an editorial web exploration engineered to test high-impact creative presentation, background video integration, and contemporary startup branding.",
        problem: "Video backgrounds can easily overwhelm content readability and degrade performance on mobile if not properly contained and formatted.",
        goals: [
          "Deliver an immersive visual experience with video hero integration.",
          "Maintain high contrast text readability over moving video backdrops.",
          "Provide seamless responsive navigation with smooth mobile menus."
        ],
        solution: "Implemented an overlay backdrop layer with controlled opacity and contrast filters over the HTML5 video element, backed by clean CSS media queries.",
        challenges: "Managing video playback attributes across mobile browsers while keeping asset loading responsive.",
        results: "Created an eye-catching, modern agency landing interface with smooth layout transitions."
      }
    },
    {
      id: "spline-3d-world",
      title: "3DWorld — Interactive 3D Web Experience",
      category: "Interactive Experiences",
      categoryFilter: "interactive",
      year: "2024",
      status: "Completed",
      role: "Creative Developer",
      featured: true,
      tagline: "An immersive website experiment exploring interactive presentation and visually engaging web experiences.",
      summary: "An immersive website experiment exploring interactive presentation and visually engaging web experiences. Integrates live interactive Spline 3D objects with a sleek dark-mode interface and Bootstrap 5 navigation.",
      techStack: ["Spline 3D", "Bootstrap 5", "HTML5", "Interactive Web", "Dark Theme"],
      liveUrl: "https://3d-website-blond.vercel.app/",
      screenshot: "assets/images/projects/project-3dworld.jpg",
      accentColor: "#a855f7",
      caseStudy: {
        overview: "3DWorld explores modern spatial web interactions by embedding a real-time interactive 3D scene from Spline directly into a responsive browser interface.",
        problem: "Integrating 3D canvas viewers without disrupting page layout, navigation stacking contexts, or mobile responsiveness.",
        goals: [
          "Integrate live interactive 3D elements into an accessible web layout.",
          "Implement Bootstrap 5 collapsible navigation and search controls.",
          "Ensure graceful loading and interaction on desktop and mobile."
        ],
        solution: "Embedded the Spline web component inside a dedicated container paired with responsive typography and styled call-to-action buttons.",
        challenges: "Ensuring 3D model rotation touch gestures do not accidentally block standard page scrolling on mobile devices.",
        results: "Delivered a visually striking 3D web experience that demonstrates an eagerness to explore cutting-edge interactive web technologies."
      }
    },
    {
      id: "stephana-figma-mobile",
      title: "Stephana — Mobile E-Commerce Prototype",
      category: "UI/UX Design (Figma)",
      categoryFilter: "ui/ux",
      year: "2025",
      status: "Interactive Prototype",
      role: "UI/UX Designer",
      featured: true,
      isMobile: true,
      tagline: "Interactive mobile shopping app prototype built with Figma Smart Animate.",
      summary: "A comprehensive mobile e-commerce prototype created in Figma. Explores product discovery, flash deal countdowns, bottom navigation ergonomics, and smooth screen-to-screen animations.",
      techStack: ["Figma", "Smart Animate", "Mobile UX", "Design Systems", "Prototyping"],
      liveUrl: "https://stephana-u5tjd26mag.figweb.site/",
      screenshot: "assets/images/projects/project-stephana.jpg",
      accentColor: "#f43f5e",
      caseStudy: {
        overview: "Stephana is a mobile-first UI/UX exploration created in Figma and deployed as an interactive prototype using figma.to.website.",
        problem: "Mobile e-commerce users demand instant feedback, legible product cards, and frictionless transitions between categories and product details.",
        goals: [
          "Design a human-centered iPhone 16 layout with auto-layout precision.",
          "Implement Smart Animate micro-interactions for deals and cart actions.",
          "Establish a consistent typographic hierarchy and vibrant accent palette."
        ],
        solution: "Constructed reusable Figma components with multi-variant states, auto-layout padding, and intuitive interactive triggers.",
        challenges: "Designing micro-animations that feel native and smooth without overwhelming the shopping experience.",
        results: "A published, interactive mobile prototype demonstrating strong mobile UI/UX and interaction design competencies."
      }
    },
    {
      id: "growthspace-figma-code",
      title: "Growthspace — Figma Design to Responsive Code",
      category: "Web Development",
      categoryFilter: "web",
      year: "2024",
      status: "Completed",
      role: "Frontend Developer",
      featured: false,
      tagline: "A project exploring the translation of design concepts into a working web interface.",
      summary: "A project exploring the translation of design concepts into a working web interface. Translated a modern SaaS landing page from Figma into clean, responsive HTML, CSS, and Bootstrap components.",
      techStack: ["Figma to Code", "Bootstrap 5", "CSS3", "Font Awesome", "Responsive Design"],
      liveUrl: "https://figma-design-by-code.vercel.app/",
      screenshot: "assets/images/projects/project-growthspace.jpg",
      accentColor: "#f59e0b",
      caseStudy: {
        overview: "Growthspace showcases my ability to inspect Figma design files, extract layout tokens, and reconstruct them into clean, responsive frontend code.",
        problem: "Bridging the gap between static design specs and flexible responsive behavior across real-world screen dimensions.",
        goals: [
          "Accurately match typography scales, button styling, and layout grids.",
          "Implement responsive Bootstrap navigation with registration CTA.",
          "Maintain clean, readable markup for straightforward future maintenance."
        ],
        solution: "Leveraged Bootstrap 5 utility classes paired with custom CSS overrides to preserve the exact aesthetic of the original design mockup.",
        challenges: "Aligning partner logos and accent badges accurately on both desktop grids and stacked mobile rows.",
        results: "Successfully converted a full design concept into a functional web interface with zero visual regression."
      }
    },
    {
      id: "rangoli-event-management",
      title: "Rangoli — Event Management Web Design",
      category: "Web Development",
      categoryFilter: "web",
      year: "2024",
      status: "Completed",
      role: "Web Designer & Frontend Developer",
      featured: false,
      tagline: "A dedicated event website concept designed to present information in a clear and engaging way.",
      summary: "A dedicated event website concept designed to present information in a clear and engaging way. Features event planning themes, promotional posters, search bars, and clear service highlights.",
      techStack: ["HTML5", "CSS3", "Bootstrap 5", "Responsive Grid", "Event UI"],
      liveUrl: "https://event-website-iota.vercel.app/",
      screenshot: "assets/images/projects/project-rangoli.jpg",
      accentColor: "#ec4899",
      caseStudy: {
        overview: "Rangoli was created to explore event planning workflows, helping clients browse theme concepts, explore booking options, and discover celebratory arrangements.",
        problem: "Event websites often suffer from visual clutter. The goal was to provide high-impact visuals while keeping navigation and contact paths immediately accessible.",
        goals: [
          "Design a cheerful, inviting layout with clear call-to-action buttons.",
          "Implement quick search and organized navigation links.",
          "Ensure mobile ergonomics for on-the-go event browsing."
        ],
        solution: "Used clear section segmentation, inviting headline typography, and a streamlined navigation header with integrated search input.",
        challenges: "Structuring content hierarchy so promotional posters do not push essential contact information out of view.",
        results: "Built an engaging, accessible concept website suitable for event management agencies."
      }
    },
    {
      id: "sangeet-music-player",
      title: "Sangeet — Interactive Music Player",
      category: "Interactive Experiences",
      categoryFilter: "interactive",
      year: "2024",
      status: "Completed",
      role: "Frontend Developer",
      featured: false,
      tagline: "An interactive music-player project focused on interface design and user interaction.",
      summary: "An interactive music-player project focused on interface design and user interaction. Features trending track sections, artist spotlight cards, customized playlist navigation, and responsive audio styling.",
      techStack: ["JavaScript", "HTML5", "CSS3", "Bootstrap 5", "Audio UI Design"],
      liveUrl: "https://music-player-three-navy.vercel.app/",
      screenshot: "assets/images/projects/project-sangeet.jpg",
      accentColor: "#10b981",
      caseStudy: {
        overview: "Sangeet is an interactive frontend project exploring media interface design, playlist layout, and user interaction mechanics for streaming music applications.",
        problem: "Designing an intuitive entertainment dashboard that highlights trending music, favorite tracks, and artist profiles across screen sizes.",
        goals: [
          "Create an aesthetic dark/vibrant music player layout.",
          "Implement dynamic artist cards and trending track lists.",
          "Build an interactive mobile drawer menu for playlist navigation."
        ],
        solution: "Engineered responsive card structures using Bootstrap and custom CSS, tied together with interactive JavaScript menu toggles.",
        challenges: "Managing image card proportions and overlay text clarity across varied smartphone widths.",
        results: "Produced an enjoyable music showcase interface with smooth navigation and cohesive media presentation."
      }
    },
    {
      id: "dayle-editorial-figma",
      title: "Dayle — Digital Identity & Editorial Prototype",
      category: "UI/UX Design (Figma)",
      categoryFilter: "ui/ux",
      year: "2025",
      status: "Interactive Prototype",
      role: "UI/UX Designer",
      featured: false,
      tagline: "Editorial web interface exploration with modern typographic hierarchy.",
      summary: "An editorial UI/UX concept built in Figma exploring whitespace discipline, typographic rhythm with Poppins & Inder, and clean digital publishing ergonomics.",
      techStack: ["Figma", "Editorial Layout", "Typography Hierarchy", "UI Wireframing"],
      liveUrl: "https://dayle-ikwaudwp47.figweb.site/",
      screenshot: "assets/images/projects/project-dayle.jpg",
      accentColor: "#6366f1",
      caseStudy: {
        overview: "Dayle examines how digital editorial platforms can achieve elegance and focus through disciplined whitespace, modern typography scales, and balanced layout framing.",
        problem: "Digital publications often suffer from cluttered sidebars and noisy layouts that distract readers from editorial content.",
        goals: [
          "Establish a harmonious typography scale using paired Google Fonts.",
          "Create uncluttered article and showcase layouts.",
          "Prototype responsive web wireframes in Figma."
        ],
        solution: "Built a systematic grid framework in Figma with consistent spacing tokens and generous line-height ratios for effortless readability.",
        challenges: "Balancing minimal design aesthetic with sufficient navigational affordance.",
        results: "A polished editorial prototype published for live interactive review."
      }
    },
    {
      id: "hestia-modern-interface",
      title: "Hestia — Modern Interface Concept",
      category: "UI/UX Design (Figma)",
      categoryFilter: "ui/ux",
      year: "2025",
      status: "Interactive Prototype",
      role: "UI/UX Designer",
      featured: false,
      tagline: "Contemporary digital product interface prototype emphasizing layout clarity.",
      summary: "Modern digital product interface prototype in Figma emphasizing layout clarity, whitespace balance, and accessible UI components.",
      techStack: ["Figma", "Component Architecture", "Layout Grids", "Prototyping"],
      liveUrl: "https://hestia-f7puv8gs3q.figweb.site/",
      screenshot: "assets/images/projects/project-hestia.jpg",
      accentColor: "#06b6d4",
      caseStudy: {
        overview: "Hestia was developed to explore modern dashboard and digital product layout principles in Figma, focusing on component modularity and visual clarity.",
        problem: "Complex interfaces often become confusing without strict visual hierarchy and consistent component tokens.",
        goals: [
          "Design modular UI components that can scale across views.",
          "Ensure accessible color contrast across primary and secondary states.",
          "Create a clickable prototype illustrating key user navigation flows."
        ],
        solution: "Structured the Figma file using atomic design concepts, creating consistent buttons, cards, and input states.",
        challenges: "Defining clear visual boundaries without relying on heavy borders or jarring drop shadows.",
        results: "A clean, functional UI prototype ready for developer handoff and interactive testing."
      }
    },
    {
      id: "raynell-design-system",
      title: "Raynell — Conceptual Design System",
      category: "UI/UX Design (Figma)",
      categoryFilter: "ui/ux",
      year: "2025",
      status: "Interactive Prototype",
      role: "UI/UX Designer",
      featured: false,
      tagline: "Design exploration focusing on design-to-development handoff and modular UI blocks.",
      summary: "Conceptual web interface exploration in Figma testing brand presentation, grid rhythm, and design-to-development workflow ergonomics.",
      techStack: ["Figma", "Design Exploration", "Brand System", "UI Flow"],
      liveUrl: "https://raynell-u5tk7y6j56.figweb.site/",
      screenshot: "assets/images/projects/project-raynell.jpg",
      accentColor: "#14b8a6",
      caseStudy: {
        overview: "Raynell explores how brand personality can be infused into web interfaces while keeping components developer-friendly and systematically organized.",
        problem: "Bridging artistic visual styling with structured layout parameters suitable for frontend implementation.",
        goals: [
          "Create a distinctive visual brand identity in Figma.",
          "Test responsive layout behavior across desktop and mobile frames.",
          "Document tokens for seamless translation into CSS variables."
        ],
        solution: "Developed an organized component library in Figma with documented color palettes, font styles, and interaction states.",
        challenges: "Ensuring visual elements translate smoothly into standard CSS box models.",
        results: "A well-structured Figma prototype published for interactive web demonstration."
      }
    },
    // IN PROGRESS PROJECT
    {
      id: "canvas-scrollytelling-lab",
      title: "Interactive Canvas & Scrollytelling Lab",
      category: "Interactive Experiences",
      categoryFilter: "interactive",
      year: "2026",
      status: "In Progress",
      role: "Creative Developer",
      featured: false,
      tagline: "Hardware-accelerated canvas sequences and bidirectional scrollytelling experiments.",
      summary: "An ongoing creative development experiment focusing on advanced scroll-linked graphics, requestAnimationFrame optimization, and narrative web experiences.",
      techStack: ["HTML5 Canvas", "JavaScript", "Scroll-Linked Motion", "rAF Engine", "Performance Tuning"],
      liveUrl: "#heroScrollContainer",
      screenshot: "frames/ezgif-frame-120.jpg",
      accentColor: "#38bdf8",
      caseStudy: {
        overview: "This interactive lab represents my continued exploration into Apple-style canvas scroll sequences, multi-frame preloading, and bidirectional scrubbing on the web.",
        problem: "Large image sequences can cause scroll stutter and layout jumps if not properly buffered, memory-managed, and tied to requestAnimationFrame.",
        goals: [
          "Achieve smooth 60fps scrubbing forward and backward.",
          "Maintain responsive aspect ratio coverage across all viewports.",
          "Respect prefers-reduced-motion with accessible static frame fallbacks."
        ],
        solution: "Engineered dual canvas pipelines with background image preloading, canvas dirty-checking, and responsive step downscaling.",
        challenges: "Preventing mobile scroll-locking while maintaining sticky pin fidelity.",
        results: "Successfully powered both hero (240 frames) and mid-page portal (40 frames) sequences on this very portfolio!"
      }
    }
  ],

  // 4 Competency Domains (Technical Skills & Practical Toolchain)
  skillDomains: [
    {
      number: "01",
      title: "Frontend Development",
      summary: "Core markup, styling, scripting, and component architecture for responsive, cross-browser web interfaces.",
      skills: [
        { name: "HTML5", badge: null },
        { name: "CSS3", badge: null },
        { name: "JavaScript (ES6+)", badge: null },
        { name: "Responsive Web Design", badge: null },
        { name: "Bootstrap", badge: null },
        { name: "React.js", badge: "Fundamentals" },
        { name: "PHP", badge: "Fundamentals" },
        { name: "MySQL", badge: "Fundamentals" }
      ]
    },
    {
      number: "02",
      title: "UI/UX & Interface Design",
      summary: "End-to-end product design from low-fidelity wireframes to high-fidelity clickable interactive prototypes.",
      skills: [
        { name: "Figma", badge: null },
        { name: "Wireframing", badge: null },
        { name: "High-Fidelity UI Design", badge: null },
        { name: "Interactive Prototyping", badge: null },
        { name: "Design Systems & Components", badge: null },
        { name: "Responsive Interface Design", badge: null },
        { name: "User Flow Design", badge: null },
        { name: "Layout & Visual Hierarchy", badge: null }
      ]
    },
    {
      number: "03",
      title: "Motion & Interactive Experiences",
      summary: "Scroll-driven animations, frame-by-frame canvas sequences, and interactive 3D web explorations.",
      skills: [
        { name: "GSAP", badge: "Learning / Practical Exploration" },
        { name: "Scroll-Driven Animations", badge: null },
        { name: "Canvas-Based Image Sequences", badge: null },
        { name: "CSS Transitions & Microinteractions", badge: null },
        { name: "JavaScript Animation", badge: null },
        { name: "Three.js", badge: "If used in actual projects" },
        { name: "Interactive Landing Pages", badge: null }
      ]
    },
    {
      number: "04",
      title: "Tools & Workflow",
      summary: "Modern developer toolchain, responsive debugging, and AI-assisted engineering workflows.",
      skills: [
        { name: "Git & GitHub", badge: null },
        { name: "VS Code", badge: null },
        { name: "Chrome DevTools", badge: null },
        { name: "Figma Prototyping", badge: null },
        { name: "Responsive Testing", badge: null },
        { name: "Browser Debugging", badge: null },
        { name: "Antigravity AI Development Workflow", badge: null }
      ]
    }
  ],

  // Design & Development Philosophy
  skillsApproach: {
    title: "My Approach",
    statement: "I combine clean frontend development with thoughtful interface design to build responsive, visually engaging digital experiences. My focus is on layout precision, smooth interactions, performance, accessibility, and creating interfaces that work beautifully across desktop, tablet, and mobile devices.",
    pillars: [
      { label: "Layout Precision" },
      { label: "Smooth Interactions" },
      { label: "Performance" },
      { label: "Accessibility" },
      { label: "Cross-Device Fidelity" }
    ]
  },

  // 8 Specific Technologies with Verified SVG Logos & Descriptions
  skills: [
    {
      id: "html5",
      name: "HTML5",
      category: "Core Frontend",
      focus: "Semantic Structure & Accessibility",
      description: "Writing clean, semantic, and accessible markup. Structuring pages with appropriate landmarks, SEO best practices, and accessible web standards (WCAG).",
      iconSvg: `<svg viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M71 460L32 0h448l-39 460-185 52-185-52z" fill="#E44D26"/><path d="M256 472l151-42 33-388H256v430z" fill="#F16529"/><path d="M256 176h-82l-6-64h88V48H104l18 192h134v-64zm0 160l-74-20-5-56h-64l9 116 134 37V336z" fill="#EBEBEB"/><path d="M256 176v64h80l-8 86-72 20v64l133-37 18-197H256zm0-128v64h148l6-64H256z" fill="#fff"/></svg>`
    },
    {
      id: "css3",
      name: "CSS3",
      category: "Styling & Motion",
      focus: "Responsive Layouts, Flexbox & Grid",
      description: "Crafting fluid, pixel-precise responsive layouts using modern CSS Grid, Flexbox, custom properties (CSS variables), keyframe animations, and media queries across 320px–4K displays.",
      iconSvg: `<svg viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M71 460L32 0h448l-39 460-185 52-185-52z" fill="#1572B6"/><path d="M256 472l151-42 33-388H256v430z" fill="#33A9DC"/><path d="M256 176h-82l-6-64h88V48H104l18 192h134v-64zm0 160l-74-20-5-56h-64l9 116 134 37V336z" fill="#EBEBEB"/><path d="M256 176v64h80l-8 86-72 20v64l133-37 18-197H256zm0-128v64h148l6-64H256z" fill="#fff"/></svg>`
    },
    {
      id: "javascript",
      name: "JavaScript",
      category: "Programming & Logic",
      focus: "ES6+ Fundamentals & Interactive DOM",
      description: "Developing interactive web behavior, DOM manipulation, asynchronous data fetching with fetch/JSON, canvas rendering loops with requestAnimationFrame, and event handling.",
      iconSvg: `<svg viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h512v512H0z" fill="#F7DF1E"/><path d="M288 396v-34c0-21 12-32 30-32 12 0 21 6 26 15l28-17c-11-20-29-30-54-30-38 0-63 24-63 64v34c0 41 24 64 64 64 26 0 44-11 55-31l-28-17c-6 9-15 15-27 15-18 0-31-10-31-31zm-136 29c7 12 17 19 32 19 16 0 26-8 26-28V264h36v152c0 38-22 56-59 56-32 0-51-16-62-37l27-16z" fill="#000"/></svg>`
    },
    {
      id: "php",
      name: "PHP",
      category: "Backend & Server",
      focus: "Server Scripting & Form Handling",
      description: "Implementing backend form processing, email transmission routing, CSRF token validation, input sanitization, and structured server-side logic for dynamic web pages.",
      iconSvg: `<svg viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M256 512C114.6 512 0 397.4 0 256S114.6 0 256 0s256 114.6 256 256-114.6 256-256 256z" fill="#777BB4"/><path d="M142 342l20-106h43c24 0 38 10 34 32-4 22-22 32-46 32h-17l-8 42h-26zm33-64h14c11 0 19-4 21-14 2-10-3-14-14-14h-14l-7 28zm101 64l20-106h26l-7 37c7-8 17-13 28-13 20 0 31 11 26 36l-9 46h-26l8-43c2-12-3-17-13-17-9 0-17 6-21 17l-8 43h-26zm114 0l20-106h43c24 0 38 10 34 32-4 22-22 32-46 32h-17l-8 42h-26zm33-64h14c11 0 19-4 21-14 2-10-3-14-14-14h-14l-7 28z" fill="#fff"/></svg>`
    },
    {
      id: "bootstrap",
      name: "Bootstrap",
      category: "UI Framework",
      focus: "Responsive Grid & Components",
      description: "Accelerating responsive web design using the Bootstrap grid system, responsive navigation bars, modals, utility classes, and customizable UI components.",
      iconSvg: `<svg viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="512" height="512" rx="100" fill="#7952B3"/><path d="M180 120h96c38 0 62 18 62 48 0 23-14 38-34 44 26 5 44 22 44 50 0 34-27 54-68 54h-100V120zm50 42v52h42c14 0 24-7 24-26 0-18-10-26-24-26h-42zm0 94v62h48c16 0 28-8 28-31 0-21-12-31-28-31h-48z" fill="#fff"/></svg>`
    },
    {
      id: "threejs",
      name: "Three.js",
      category: "Creative 3D",
      focus: "Interactive 3D Web & Spline Integration",
      description: "Experimenting with interactive 3D web elements, WebGL rendering concepts, scene creation, and integrating interactive 3D Spline experiences into modern web layouts.",
      iconSvg: `<svg viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h512v512H0z" fill="#111"/><path d="M256 60L70 390h372L256 60zm0 92l128 214H128L256 152z" fill="#fff"/><circle cx="256" cy="280" r="48" fill="#38bdf8"/></svg>`
    },
    {
      id: "react",
      name: "React",
      category: "Modern Frontend",
      focus: "Component-Based UI Architecture",
      description: "Building modular, reusable user interfaces using React components, JSX syntax, state hooks, and component lifecycle patterns for scalable single-page web applications.",
      iconSvg: `<svg viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="512" height="512" rx="100" fill="#20232A"/><ellipse cx="256" cy="256" rx="180" ry="68" stroke="#61DAFB" stroke-width="20" fill="none"/><ellipse cx="256" cy="256" rx="180" ry="68" transform="rotate(60 256 256)" stroke="#61DAFB" stroke-width="20" fill="none"/><ellipse cx="256" cy="256" rx="180" ry="68" transform="rotate(120 256 256)" stroke="#61DAFB" stroke-width="20" fill="none"/><circle cx="256" cy="256" r="30" fill="#61DAFB"/></svg>`
    },
    {
      id: "figma",
      name: "Figma",
      category: "UI/UX Design",
      focus: "Interface Design, Prototyping & Tokens",
      description: "Designing user interfaces, creating responsive auto-layouts, wireframing user flows, developing component libraries, and testing clickable interactive prototypes with Smart Animate.",
      iconSvg: `<svg viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="512" height="512" rx="100" fill="#1E1E1E"/><path d="M170 342c0 47 38 85 86 85s86-38 86-85-38-85-86-85h-86v85z" fill="#0ACF83"/><path d="M170 171c0-47 38-86 86-86h86v86h-86c-48 0-86-39-86-86z" fill="#FF7262" transform="rotate(90 256 128)"/><path d="M170 171c0 47 38 85 86 85h86V171h-86c-48 0-86-38-86-86z" fill="#1ABCFE" transform="rotate(180 256 213)"/><path d="M170 171c0-47 38-85 86-85h86v85h-86c-48 0-86-38-86-85z" fill="#F24E1E"/><path d="M170 256c0-47 38-85 86-85h86v85h-86c-48 0-86-38-86-85z" fill="#A259FF"/></svg>`
    }
  ],

  // 8 Specific Services Offered
  services: [
    {
      id: "srv-01",
      number: "01",
      title: "Responsive Website Design",
      summary: "Designing custom, visually appealing website layouts that adapt gracefully across mobile phones, tablets, and desktop displays.",
      deliverables: [
        "Mobile-first responsive layout planning",
        "Modern typographic and color palette direction",
        "Clear visual hierarchy and intuitive section flow",
        "Cross-browser and multi-device preview testing"
      ],
      turnaround: "1 — 2 Weeks"
    },
    {
      id: "srv-02",
      number: "02",
      title: "Frontend Website Development",
      summary: "Translating visual concepts into functional, fast, and semantic web pages using clean HTML5, CSS3, and JavaScript.",
      deliverables: [
        "Semantic, accessible HTML5 markup",
        "Modern CSS3 with Flexbox and Grid",
        "Interactive JavaScript navigation and features",
        "Performance and image asset optimization"
      ],
      turnaround: "1 — 3 Weeks"
    },
    {
      id: "srv-03",
      number: "03",
      title: "UI/UX Design & Interface Prototyping",
      summary: "Creating intuitive digital product interfaces in Figma with auto-layout components, structured user flows, and clickable prototypes.",
      deliverables: [
        "Wireframing and information architecture",
        "Figma design components with auto-layout",
        "Interactive prototypes with Smart Animate transitions",
        "Design assets prepared for developer handoff"
      ],
      turnaround: "1 — 3 Weeks"
    },
    {
      id: "srv-04",
      number: "04",
      title: "Landing Page Development",
      summary: "High-impact single-page websites engineered to present services, products, or portfolios with clear calls-to-action.",
      deliverables: [
        "Conversion-focused section structure",
        "Engaging hero and feature presentation blocks",
        "Working inquiry form integration",
        "Speed-optimized, lightweight implementation"
      ],
      turnaround: "5 — 10 Days"
    },
    {
      id: "srv-05",
      number: "05",
      title: "Website Redesign & UI Improvements",
      summary: "Modernizing outdated websites to enhance mobile responsiveness, elevate visual polish, and improve user clarity.",
      deliverables: [
        "Responsive layout refactoring and fixes",
        "Typography and contrast enhancement",
        "Modern navigation drawer and touch targets",
        "Clean CSS styling overhaul"
      ],
      turnaround: "1 — 2 Weeks"
    },
    {
      id: "srv-06",
      number: "06",
      title: "Portfolio Website Development",
      summary: "Crafting distinctive personal and professional portfolios that showcase real projects, skills, and credentials effectively.",
      deliverables: [
        "Personal branding and visual identity integration",
        "Project showcase grid with live preview links",
        "Interactive resume / CV download integration",
        "Direct email, phone, and social contact channels"
      ],
      turnaround: "1 — 2 Weeks"
    },
    {
      id: "srv-07",
      number: "07",
      title: "Basic PHP Website Features & Form Handling",
      summary: "Building secure, dependable server-side form handlers, email transmission scripts, and basic dynamic content integration.",
      deliverables: [
        "Server-side form data processing and sanitization",
        "Email notification routing via PHP mailer",
        "Anti-spam honeypot and input validation defense",
        "Client-side feedback confirmation with mailto fallback"
      ],
      turnaround: "3 — 7 Days"
    },
    {
      id: "srv-08",
      number: "08",
      title: "Interactive Web Experiences",
      summary: "Adding interactive micro-interactions, canvas animation sequences, or Spline 3D elements to make your web presence memorable.",
      deliverables: [
        "Hardware-accelerated HTML5 Canvas scrubbers",
        "Spline 3D model web integration",
        "Micro-interaction and button hover feedback",
        "Reduced-motion accessibility support"
      ],
      turnaround: "1 — 2 Weeks"
    }
  ],

  // Freelance Work Section — Currently Active
  freelance: {
    status: "CURRENTLY ACCEPTING ENQUIRIES",
    intro: "Alongside my learning and development journey, I work on freelance web projects, helping bring website ideas to life through thoughtful design, responsive interfaces, and practical implementation.",
    projects: [
      {
        id: "fl-01",
        title: "Bespoke Business Showcase Website",
        clientType: "Commercial Client // Add Details",
        status: "Completed",
        statusColor: "#34d399",
        description: "Designed and developed a responsive business showcase website focusing on clear service presentation, brand trust, and functional contact mechanisms.",
        deliverables: ["Responsive UI Design", "Frontend Implementation", "Contact Integration"],
        editableNote: "Client and project details can be updated here."
      },
      {
        id: "fl-02",
        title: "Responsive Brand Landing Page",
        clientType: "Creative Collaboration // In Progress",
        status: "In Progress",
        statusColor: "#38bdf8",
        description: "Currently crafting a modern, responsive product landing page featuring interactive components, clean typography hierarchy, and conversion-oriented layouts.",
        deliverables: ["Figma UI Exploration", "Mobile-First Frontend", "Interactive Motion"],
        editableNote: "Currently in active development."
      }
    ]
  },

  // Frequently Asked Questions
  faqs: [
    {
      question: "What types of web projects do you work on?",
      answer: "I specialize in responsive website design, frontend development (HTML, CSS, JavaScript, Bootstrap, React), UI/UX design in Figma, and interactive web experiences. I work on personal portfolios, business landing pages, e-commerce storefront concepts, and website redesigns."
    },
    {
      question: "Are you available for freelance work and full-time opportunities?",
      answer: "Yes! I am actively doing freelance web design and development projects, and I am also open to frontend developer roles, creative internships, and team opportunities where I can contribute and learn."
    },
    {
      question: "What is your typical turnaround time for a project?",
      answer: "A focused landing page or portfolio project typically takes 1 to 2 weeks. Interactive or multi-page implementations typically take 2 to 3 weeks depending on the exact requirements and revisions."
    },
    {
      question: "How do we get in touch and start working together?",
      answer: "You can reach out directly via email at jhah14687@gmail.com, call me at +91 6290177421, or connect with me on LinkedIn and GitHub. You can also use the contact form below, and I will respond within 24 hours."
    }
  ]
};
