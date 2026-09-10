document.addEventListener('DOMContentLoaded', function () {
  // Mobile nav toggle
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      nav.classList.toggle('open');
    });
  }

  // ---- Header reacts to scroll ----
  var header = document.querySelector('.site-header');
  if (header) {
    var updateHeader = function () {
      if (window.scrollY > 12) {
        header.classList.add('is-scrolled');
      } else {
        header.classList.remove('is-scrolled');
      }
    };
    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });
  }

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var canHover = window.matchMedia('(hover: hover)').matches;

  // ---- Scroll reveal (staggered within each parent) ----
  var revealEls = document.querySelectorAll('.reveal');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach(function (el) { el.classList.add('revealed'); });
  } else {
    // Stagger siblings that reveal around the same time
    var siblingIndex = new Map();
    revealEls.forEach(function (el) {
      var parent = el.parentElement;
      var idx = siblingIndex.get(parent) || 0;
      el.style.transitionDelay = Math.min(idx * 90, 360) + 'ms';
      siblingIndex.set(parent, idx + 1);
    });

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
          entry.target.addEventListener('transitionend', function () {
            entry.target.style.willChange = 'auto';
            entry.target.style.transitionDelay = '';
          }, { once: true });
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px 220px 0px' });
    revealEls.forEach(function (el) { observer.observe(el); });

    // Safety net: if anything ever prevents the observer from firing
    // (older mobile browsers, odd viewport timing), force content visible
    // after 2s so nothing stays permanently blank.
    setTimeout(function () {
      revealEls.forEach(function (el) { el.classList.add('revealed'); });
    }, 2000);
  }

  // ---- Flip-to-reveal fact cards (About page) — must work on tap, not just hover ----
  var factCards = document.querySelectorAll('.fact-card');
  factCards.forEach(function (card) {
    card.addEventListener('click', function () {
      var isOpen = card.getAttribute('aria-expanded') === 'true';
      card.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
    });
  });

  // ---- AI Tool Matcher quiz (Home page) — must work on tap, not just hover ----
  var quiz = document.querySelector('[data-quiz]');
  if (quiz) {
    var recommendations = {
      writing_new: [
        { title: 'What is AI and How Does It Actually Work — A Beginner\'s Guide', href: 'articles/article-1.html' },
        { title: 'How to Write Better AI Prompts — A Complete Guide', href: 'articles/article-3.html' },
        { title: 'Best Free AI Chatbots Compared (ChatGPT vs Claude vs Gemini)', href: 'articles/article-2.html' }
      ],
      writing_experienced: [
        { title: 'Best Free AI Chatbots Compared (ChatGPT vs Claude vs Gemini)', href: 'articles/article-2.html' },
        { title: 'AI Coding Assistants Compared: Claude Code vs GitHub Copilot', href: 'articles/article-13.html' },
        { title: 'How to Write Better AI Prompts — A Complete Guide', href: 'articles/article-3.html' }
      ],
      images_new: [
        { title: 'What is AI and How Does It Actually Work — A Beginner\'s Guide', href: 'articles/article-1.html' },
        { title: 'Best AI Image Generators in 2026, Ranked', href: 'articles/article-4.html' },
        { title: 'How to Remove Image Backgrounds Using Free AI Tools', href: 'articles/article-8.html' }
      ],
      images_experienced: [
        { title: 'Best AI Image Generators in 2026, Ranked', href: 'articles/article-4.html' },
        { title: 'How to Use AI to Design a Logo From Scratch', href: 'articles/article-7.html' },
        { title: 'How to Remove Image Backgrounds Using Free AI Tools', href: 'articles/article-8.html' }
      ],
      video_new: [
        { title: 'What is AI and How Does It Actually Work — A Beginner\'s Guide', href: 'articles/article-1.html' },
        { title: 'How to Build a YouTube Channel Using AI Tools (Start to Finish)', href: 'articles/article-9.html' },
        { title: 'Best AI Tools for Content Creators in 2026', href: 'articles/article-11.html' }
      ],
      video_experienced: [
        { title: 'How to Use AI for Video Editing — Auto-Clip Tools Explained', href: 'articles/article-10.html' },
        { title: 'How to Use OBS Studio With AI-Assisted Recording Setup', href: 'articles/article-12.html' },
        { title: 'Best AI Tools for Content Creators in 2026', href: 'articles/article-11.html' }
      ],
      organize_new: [
        { title: 'What is AI and How Does It Actually Work — A Beginner\'s Guide', href: 'articles/article-1.html' },
        { title: 'Free AI Tools Every Student Should Know About', href: 'articles/article-5.html' },
        { title: 'Free vs Paid AI Tools — Is Upgrading Worth It?', href: 'articles/article-15.html' }
      ],
      organize_experienced: [
        { title: 'Best AI Productivity Tools for Students and Freelancers', href: 'articles/article-14.html' },
        { title: 'AI Website Builders Compared: Which One Is Actually Worth It', href: 'articles/article-6.html' },
        { title: 'Free vs Paid AI Tools — Is Upgrading Worth It?', href: 'articles/article-15.html' }
      ]
    };

    var quizState = {};
    var steps = quiz.querySelectorAll('[data-quiz-step]');
    var dots = quiz.querySelectorAll('[data-progress-dot]');

    var goToStep = function (stepNumber) {
      steps.forEach(function (step) {
        step.hidden = step.getAttribute('data-quiz-step') !== String(stepNumber);
      });
      dots.forEach(function (dot) {
        var dotNumber = dot.getAttribute('data-progress-dot');
        dot.classList.toggle('is-active', Number(dotNumber) <= stepNumber);
      });
    };

    var showResults = function () {
      var key = quizState.interest + '_' + quizState.level;
      var picks = recommendations[key] || recommendations.writing_new;
      var list = quiz.querySelector('[data-quiz-results]');
      list.innerHTML = '';
      picks.forEach(function (item) {
        var a = document.createElement('a');
        a.className = 'quiz-result-item';
        a.href = item.href;
        a.textContent = item.title;
        list.appendChild(a);
      });
      goToStep(3);
    };

    quiz.querySelectorAll('[data-interest]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        quizState.interest = btn.getAttribute('data-interest');
        goToStep(2);
      });
    });

    quiz.querySelectorAll('[data-level]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        quizState.level = btn.getAttribute('data-level');
        showResults();
      });
    });

    var retakeBtn = quiz.querySelector('[data-quiz-retake]');
    if (retakeBtn) {
      retakeBtn.addEventListener('click', function () {
        quizState = {};
        goToStep(1);
      });
    }
  }

  if (reduceMotion || !canHover) return;

  // ---- Hero media 3D parallax on mouse move ----
  var hero = document.querySelector('.hero');
  var heroMedia = document.querySelector('.hero-media');
  if (hero && heroMedia) {
    hero.addEventListener('mousemove', function (e) {
      var rect = hero.getBoundingClientRect();
      var relX = (e.clientX - rect.left) / rect.width - 0.5;
      var relY = (e.clientY - rect.top) / rect.height - 0.5;
      heroMedia.style.transform =
        'rotateY(' + (relX * 9) + 'deg) rotateX(' + (relY * -9) + 'deg)';
    });
    hero.addEventListener('mouseleave', function () {
      heroMedia.style.transform = 'rotateY(0deg) rotateX(0deg)';
    });
  }

  // ---- 3D tilt on article cards ----
  var tiltCards = document.querySelectorAll('.tilt-card');
  tiltCards.forEach(function (card) {
    card.addEventListener('mousemove', function (e) {
      var rect = card.getBoundingClientRect();
      var relX = (e.clientX - rect.left) / rect.width - 0.5;
      var relY = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform =
        'rotateY(' + (relX * 10) + 'deg) rotateX(' + (relY * -10) + 'deg) translateY(-4px)';
    });
    card.addEventListener('mouseleave', function () {
      card.style.transform = 'rotateY(0deg) rotateX(0deg) translateY(0)';
    });
  });

// ---- Contact form (Web3Forms) ----
  var contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var statusEl = contactForm.querySelector('[data-form-status]');
      var submitBtn = contactForm.querySelector('button[type="submit"]');

      // Honeypot: real visitors never fill this hidden field. Bots often do.
      var honeypot = contactForm.querySelector('input[name="botcheck"]');
      if (honeypot && honeypot.checked) {
        return; // silently drop suspected bot submissions
      }

      var keyField = contactForm.querySelector('input[name="access_key"]');
      if (!keyField || !keyField.value || keyField.value.indexOf('PASTE_YOUR') === 0) {
        statusEl.hidden = false;
        statusEl.textContent = 'Form is not fully set up yet \u2014 missing access key.';
        statusEl.className = 'form-status is-error';
        return;
      }

      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';

      fetch(contactForm.action, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: new FormData(contactForm)
      })
        .then(function (res) { return res.json(); })
        .then(function (data) {
          statusEl.hidden = false;
          if (data.success) {
            statusEl.textContent = "Thanks \u2014 your message has been sent. We'll get back to you soon.";
            statusEl.className = 'form-status is-success';
            contactForm.reset();
          } else {
            statusEl.textContent = 'Something went wrong sending your message. Please try again.';
            statusEl.className = 'form-status is-error';
          }
        })
        .catch(function () {
          statusEl.hidden = false;
          statusEl.textContent = 'Could not send right now \u2014 check your connection and try again.';
          statusEl.className = 'form-status is-error';
        })
        .finally(function () {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Send Message';
        });
    });
  }
});
