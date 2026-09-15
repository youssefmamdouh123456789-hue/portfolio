/**
 * Youssef Mamdouh Portfolio - Core JavaScript
 * Data Analyst | Aspiring Data Scientist
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* ==========================================================================
     1. THEME SWITCHER (DARK / LIGHT MODE)
     ========================================================================== */
  const themeToggle = document.getElementById('themeToggle');
  const htmlRoot = document.documentElement;

  // Initialize theme from localStorage or system preference (default to dark)
  const savedTheme = localStorage.getItem('ym_theme') || 'dark';
  htmlRoot.setAttribute('data-theme', savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = htmlRoot.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      htmlRoot.setAttribute('data-theme', newTheme);
      localStorage.setItem('ym_theme', newTheme);
    });
  }

  /* ==========================================================================
     2. MOBILE NAVIGATION DRAWER
     ========================================================================== */
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const closeMobileMenuBtn = document.getElementById('closeMobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  function openMobileMenu() {
    if (!mobileMenu) return;
    mobileMenu.classList.add('open');
    mobileMenu.setAttribute('aria-hidden', 'false');
    mobileMenuBtn?.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    if (!mobileMenu) return;
    mobileMenu.classList.remove('open');
    mobileMenu.setAttribute('aria-hidden', 'true');
    mobileMenuBtn?.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  mobileMenuBtn?.addEventListener('click', openMobileMenu);
  closeMobileMenuBtn?.addEventListener('click', closeMobileMenu);

  // Close when clicking outside menu inner
  mobileMenu?.addEventListener('click', (e) => {
    if (e.target === mobileMenu) {
      closeMobileMenu();
    }
  });

  // Close on nav link click
  mobileNavLinks.forEach((link) => {
    link.addEventListener('click', () => {
      closeMobileMenu();
    });
  });

  // Close on Escape key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu?.classList.contains('open')) {
      closeMobileMenu();
    }
  });

  /* ==========================================================================
     3. SCROLLSPY & ACTIVE NAVIGATION INDICATOR
     ========================================================================== */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.desktop-nav .nav-link');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  function highlightNavOnScroll() {
    const scrollY = window.scrollY;

    sections.forEach((current) => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });

        mobileLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightNavOnScroll, { passive: true });

  /* ==========================================================================
     4. ANIMATED METRICS COUNTER
     ========================================================================== */
  const counterElements = document.querySelectorAll('.counter');
  let hasCounted = false;

  function runCounterAnimation() {
    counterElements.forEach((counter) => {
      const target = +counter.getAttribute('data-target');
      const duration = 1800; // ms
      const startTime = performance.now();

      function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Ease out quadratic function for smooth slowing
        const easeProgress = 1 - (1 - progress) * (1 - progress);
        const currentVal = Math.floor(easeProgress * target);

        counter.textContent = currentVal.toLocaleString();

        if (progress < 1) {
          requestAnimationFrame(updateNumber);
        } else {
          counter.textContent = target.toLocaleString();
        }
      }

      requestAnimationFrame(updateNumber);
    });
  }

  const statsSection = document.querySelector('.stats-banner-section');
  if (statsSection && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasCounted) {
            hasCounted = true;
            runCounterAnimation();
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.25 }
    );
    observer.observe(statsSection);
  } else {
    // Fallback
    runCounterAnimation();
  }

  /* ==========================================================================
     5. PROJECT CATEGORY FILTER
     ========================================================================== */
  const projectFilterBtns = document.querySelectorAll('.project-filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  projectFilterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      // Toggle active button state
      projectFilterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach((card) => {
        const categories = card.getAttribute('data-category').split(' ');
        if (filterValue === 'all' || categories.includes(filterValue)) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.4s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  /* ==========================================================================
     6. SKILLS CATEGORY FILTER
     ========================================================================== */
  const skillFilterBtns = document.querySelectorAll('.skill-filter-btn');
  const skillCards = document.querySelectorAll('.skill-category-card');

  skillFilterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      skillFilterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      skillCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.4s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  /* ==========================================================================
     7. PROJECT DETAILS MODAL SYSTEM
     ========================================================================== */
  const projectData = {
    insurance: {
      title: 'Insurance Risk & Claims Analysis Dashboard',
      badges: ['Power BI', 'DAX Measures', 'Data Modeling', 'Risk Assessment'],
      description:
        'Built an interactive Power BI dashboard analyzing 37,500+ insurance policies and $187.8M in total claim amounts to support risk assessment, policyholder segmentation, and data-driven underwriting decision-making.',
      highlights: [
        'Analyzed 37,500+ real-world insurance policy records across individual and commercial categories.',
        'Evaluated $187.8M in total historical claims to identify major cost drivers and loss frequency.',
        'Developed dynamic multidimensional analysis by vehicle usage, car make, coverage zone, age demographic, and manufacture year.',
        'Segmented policyholder risk profiles by education level and marital status, isolating $96.3M in segmented claim distributions.',
        'Created executive KPI summary tiles with loss-ratio indicators and dynamic time-range slicers.'
      ],
      architecture:
        'Designed with a robust star-schema data model in Power BI. Calculated dynamic DAX measures for Claim Frequency, Severity Ratio, and Cumulative Loss Ratios. Integrated dynamic tooltip visuals and bookmark navigation for executive drill-downs.',
      github: 'https://github.com/youssefmamdouh123456789-hue'
    },
    blinkit: {
      title: 'BlinkIT Sales Analysis Dashboard',
      badges: ['Power BI', 'Microsoft Excel', 'Power Query ETL', 'Retail BI'],
      description:
        'Designed an interactive sales performance dashboard analyzing 8,000+ transactional records and tracking 10+ core business KPIs to evaluate outlet performance, product-category margins, and logistics efficiency.',
      highlights: [
        'Modeled and analyzed 8,000+ grocery and quick-commerce transaction records.',
        'Tracked 10+ mission-critical KPIs including Total Revenue, Average Sales per Item, Customer Ratings, and Outlet Size Efficiency.',
        'Automated multi-step ETL workflows using Excel Power Query to eliminate duplicate records and normalize missing values.',
        'Conducted detailed item fat-content and product category breakdown across Tier 1, Tier 2, and Tier 3 cities.',
        'Analyzed average delivery performance and outlet establishment year correlations.'
      ],
      architecture:
        'Cleaned raw transactional data through Power Query transformation steps. Designed relational tables and KPI cards in Power BI, implementing custom DAX matrix tables and bar chart breakdowns with interactive filtering.',
      github: 'https://github.com/youssefmamdouh123456789-hue'
    },
    elections: {
      title: 'India Elections 2024 SQL Analysis',
      badges: ['SQL Server', 'SSMS', 'Star Schema', 'Complex Joins', 'Subqueries'],
      description:
        'Performed an analytical deep-dive into national election datasets covering 543 constituencies, utilizing relational database architecture, complex joins, aggregations, and subqueries to uncover voting behavior and regional patterns.',
      highlights: [
        'Modeled comprehensive voting datasets covering all 543 national parliamentary constituencies.',
        'Engineered an optimized Star Schema database structure in SQL Server Management Studio (SSMS).',
        'Authored advanced queries using INNER JOIN, LEFT JOIN, Common Table Expressions (CTEs), and correlated subqueries.',
        'Computed margin of victory, party-wise vote share percentages, and state-level analytical breakdowns.',
        'Conducted voter turnout analysis correlating demographic regional data with final electoral results.'
      ],
      architecture:
        'Organized fact tables (ElectoralResultsFact) and dimension tables (DimConstituency, DimCandidate, DimParty, DimState) with foreign key constraints, primary keys, and indexed columns for fast aggregation queries.',
      github: 'https://github.com/youssefmamdouh123456789-hue'
    },
    swiggy: {
      title: 'Swiggy Food Delivery Performance Analytics',
      badges: ['Microsoft Excel', 'Pivot Tables', 'Data Cleaning', 'Operations Modeling'],
      description:
        'Built a centralized analytics model for 5,000+ food delivery orders to evaluate delivery efficiency, customer ratings, peak ordering windows, and restaurant performance segments.',
      highlights: [
        'Processed and sanitized 5,000+ customer delivery order records.',
        'Performed end-to-end data cleaning, handling null fields, date/time formatting, and outlier detection in Excel.',
        'Constructed multi-dimensional Pivot Tables and dynamic Pivot Charts connected with timeline slicers.',
        'Evaluated delivery time trends against weather conditions, distance brackets, and city zones.',
        'Segmented restaurant partners based on volume throughput, cancellation rates, and customer review scores.'
      ],
      architecture:
        'Developed in Microsoft Excel using structured Excel Tables, nested logical functions (IF, IFS, SWITCH), lookup routines (XLOOKUP, INDEX/MATCH), and interactive slicer dashboards for operational insights.',
      github: 'https://github.com/youssefmamdouh123456789-hue'
    }
  };

  const projectModal = document.getElementById('projectModal');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const modalCloseActionBtn = document.getElementById('modalCloseActionBtn');
  const modalTriggers = document.querySelectorAll('.project-modal-trigger');

  const modalTitle = document.getElementById('modalTitle');
  const modalTechBadges = document.getElementById('modalTechBadges');
  const modalDescription = document.getElementById('modalDescription');
  const modalHighlightsList = document.getElementById('modalHighlightsList');
  const modalArchitectureText = document.getElementById('modalArchitectureText');
  const modalGithubLink = document.getElementById('modalGithubLink');

  function openProjectModal(projectKey) {
    const data = projectData[projectKey];
    if (!data || !projectModal) return;

    modalTitle.textContent = data.title;
    modalDescription.textContent = data.description;
    modalArchitectureText.textContent = data.architecture;
    modalGithubLink.href = data.github;

    // Badges
    modalTechBadges.innerHTML = '';
    data.badges.forEach((b) => {
      const badgeSpan = document.createElement('span');
      badgeSpan.className = 'badge-tech';
      badgeSpan.textContent = b;
      modalTechBadges.appendChild(badgeSpan);
    });

    // Highlights
    modalHighlightsList.innerHTML = '';
    data.highlights.forEach((h) => {
      const li = document.createElement('li');
      li.innerHTML = `<i class="fa-solid fa-circle-check"></i> <span>${h}</span>`;
      modalHighlightsList.appendChild(li);
    });

    projectModal.classList.add('open');
    projectModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeProjectModal() {
    if (!projectModal) return;
    projectModal.classList.remove('open');
    projectModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  modalTriggers.forEach((trigger) => {
    trigger.addEventListener('click', (e) => {
      const key = trigger.getAttribute('data-project');
      openProjectModal(key);
    });
  });

  closeModalBtn?.addEventListener('click', closeProjectModal);
  modalCloseActionBtn?.addEventListener('click', closeProjectModal);

  projectModal?.addEventListener('click', (e) => {
    if (e.target === projectModal) {
      closeProjectModal();
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectModal?.classList.contains('open')) {
      closeProjectModal();
    }
  });

  /* ==========================================================================
     8. CONTACT FORM CLIENT-SIDE VALIDATION & TOAST
     ========================================================================== */
  const contactForm = document.getElementById('contactForm');
  const formToast = document.getElementById('formToast');

  if (contactForm) {
    const nameInput = document.getElementById('userName');
    const emailInput = document.getElementById('userEmail');
    const subjectInput = document.getElementById('userSubject');
    const messageInput = document.getElementById('userMessage');

    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const subjectError = document.getElementById('subjectError');
    const messageError = document.getElementById('messageError');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function clearErrors() {
      if (nameError) nameError.textContent = '';
      if (emailError) emailError.textContent = '';
      if (subjectError) subjectError.textContent = '';
      if (messageError) messageError.textContent = '';
    }

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      clearErrors();
      let isValid = true;

      // Validate Name
      if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
        if (nameError) nameError.textContent = 'Please enter your full name (at least 2 characters).';
        isValid = false;
      }

      // Validate Email
      if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
        if (emailError) emailError.textContent = 'Please enter a valid email address.';
        isValid = false;
      }

      // Validate Subject
      if (!subjectInput.value.trim() || subjectInput.value.trim().length < 3) {
        if (subjectError) subjectError.textContent = 'Please enter a subject (at least 3 characters).';
        isValid = false;
      }

      // Validate Message
      if (!messageInput.value.trim() || messageInput.value.trim().length < 10) {
        if (messageError) messageError.textContent = 'Please write a message (at least 10 characters).';
        isValid = false;
      }

      if (isValid) {
        // Show success toast feedback
        if (formToast) {
          formToast.style.display = 'flex';
          formToast.querySelector('.toast-message').textContent =
            `Thank you, ${nameInput.value.trim()}! Your message has been prepared. I will get back to you shortly.`;
        }

        contactForm.reset();

        setTimeout(() => {
          if (formToast) formToast.style.display = 'none';
        }, 6000);
      }
    });
  }

  /* ==========================================================================
     9. BACK TO TOP SMOOTH SCROLL
     ========================================================================== */
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
});
