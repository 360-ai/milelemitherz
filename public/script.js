// milele.mit.herz — Interaktion

// Mobile-Menu
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
  // Close on link click
  navMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navMenu.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Nav scrolled state
const nav = document.querySelector('.nav');
const onScroll = () => {
  if (!nav) return;
  if (window.scrollY > 20) nav.classList.add('is-scrolled');
  else nav.classList.remove('is-scrolled');
};
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// FAQ Accordion
document.querySelectorAll('.faq-item').forEach(item => {
  const btn = item.querySelector('.faq-q');
  const answer = item.querySelector('.faq-a');
  if (!btn || !answer) return;
  btn.setAttribute('aria-expanded', 'false');
  btn.addEventListener('click', () => {
    const isOpen = item.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(isOpen));
  });
});

// Reveal on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { rootMargin: '0px 0px -10% 0px', threshold: 0.05 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Tier modal
const TIER_DATA = {
  hund: {
    title: 'Der Hund',
    text: 'Der Hund begleitet den Alltag auf milele.mit.herz mit ruhiger Präsenz. In der Arbeit mit Menschen ist er oft ein Brückenbauer — er begegnet ohne Bewertung, schenkt Aufmerksamkeit und schafft schnell Vertrauen.',
    photos: [
      { src: '/assets/photos/schafstall-hund-schafe.png', alt: 'Hund mit den Schafen am Schafstall' }
    ]
  },
  huehner: {
    title: 'Die Hühner',
    text: 'Die Hühner stehen für Alltagsstruktur, kleine Verantwortung und unaufgeregte Beobachtung. Gerade Kinder und Jugendliche finden in ihrer Versorgung oft einen ersten praktischen Zugang zur Arbeit auf dem Hof.',
    photos: []
  },
  schafe: {
    title: 'Die Schafe',
    text: 'Die Schafe leben am Schafstall und gehören zum ruhigen Herz des Hofes. Sie reagieren feinfühlig auf Stimmung und Körpersprache — und ermöglichen so unmittelbare Erfahrungen von Kontakt, Achtsamkeit und Geduld.',
    photos: [
      { src: '/assets/photos/sven-mit-schafen.png', alt: 'Sven mit den Schafen am Schafstall' },
      { src: '/assets/photos/schafstall-hund-schafe.png', alt: 'Schafstall mit Hund und Schafen' }
    ]
  },
  kaninchen: {
    title: 'Die Kaninchen',
    text: 'Die Kaninchen ermöglichen ruhige, körpernahe Begegnungen. Sie laden ein, sich zu verlangsamen, leise zu werden und genau hinzuschauen — Qualitäten, die im Alltag oft kaum Raum bekommen.',
    photos: [
      { src: '/assets/photos/kaninchen-meerschweinchen.png', alt: 'Kaninchen und Meerschweinchen' }
    ]
  },
  meerschweinchen: {
    title: 'Die Meerschweinchen',
    text: 'Die Meerschweinchen sind oft erste Begegnungspunkte für Kinder. Sie zeigen sehr direkt, wie sich Ruhe, Aufmerksamkeit und ein achtsamer Umgang auf die Beziehung auswirken.',
    photos: [
      { src: '/assets/photos/meerschweinchen.png', alt: 'Meerschweinchen im Stall' },
      { src: '/assets/photos/kaninchen-meerschweinchen.png', alt: 'Kaninchen und Meerschweinchen zusammen' }
    ]
  }
};

const tierModal = document.getElementById('tier-modal');
const tierTitle = document.getElementById('tier-modal-title');
const tierText = document.getElementById('tier-modal-text');
const tierGallery = document.getElementById('tier-modal-gallery');
let lastFocused = null;

function openTier(key) {
  const data = TIER_DATA[key];
  if (!data || !tierModal) return;

  tierTitle.textContent = data.title;
  tierText.textContent = data.text;

  // Build gallery
  tierGallery.innerHTML = '';
  tierGallery.classList.toggle('has-many', data.photos.length > 1);
  if (data.photos.length === 0) {
    const ph = document.createElement('div');
    ph.className = 'placeholder warm';
    ph.innerHTML = '<span class="ph-label">[ Fotos folgen — Sven liefert nach ]</span>';
    tierGallery.appendChild(ph);
  } else {
    data.photos.forEach(p => {
      const img = document.createElement('img');
      img.src = p.src;
      img.alt = p.alt;
      img.loading = 'lazy';
      tierGallery.appendChild(img);
    });
  }

  // Highlight active nav button
  tierModal.querySelectorAll('[data-tier-nav]').forEach(btn => {
    btn.classList.toggle('is-active', btn.dataset.tierNav === key);
  });

  tierModal.classList.add('is-open');
  tierModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  lastFocused = document.activeElement;
}

function closeTier() {
  if (!tierModal) return;
  tierModal.classList.remove('is-open');
  tierModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  if (lastFocused && lastFocused.focus) lastFocused.focus();
}

document.querySelectorAll('.tier-chip, .tier-card').forEach(chip => {
  chip.addEventListener('click', () => openTier(chip.dataset.tier));
});
if (tierModal) {
  tierModal.querySelectorAll('[data-close]').forEach(el => {
    el.addEventListener('click', closeTier);
  });
  tierModal.querySelectorAll('[data-tier-nav]').forEach(btn => {
    btn.addEventListener('click', () => openTier(btn.dataset.tierNav));
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && tierModal.classList.contains('is-open')) closeTier();
  });
}

// ───────── Hero video (inline) ─────────
// Sven kann hier später eine andere Datei eintragen.
const HERO_VIDEO = { kind: 'mp4', src: '/assets/videos/derort.mp4' };

const heroPlay = document.getElementById('hero-play');
const heroMedia = heroPlay ? heroPlay.parentElement : null;

if (heroPlay && heroMedia && HERO_VIDEO) {
  heroPlay.addEventListener('click', () => {
    // Bild + Play-Button + Badge ausblenden, Video an dessen Stelle einsetzen
    const img = heroMedia.querySelector('img.photo');
    const badge = heroMedia.querySelector('.badge');

    let player;
    if (HERO_VIDEO.kind === 'mp4') {
      player = document.createElement('video');
      player.src = HERO_VIDEO.src;
      player.autoplay = true;
      player.controls = true;
      player.playsInline = true;
      player.preload = 'auto';
    } else if (HERO_VIDEO.kind === 'youtube') {
      player = document.createElement('iframe');
      player.src = `https://www.youtube-nocookie.com/embed/${HERO_VIDEO.id}?autoplay=1&rel=0`;
      player.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
      player.allowFullscreen = true;
      player.frameBorder = 0;
    } else if (HERO_VIDEO.kind === 'vimeo') {
      player = document.createElement('iframe');
      player.src = `https://player.vimeo.com/video/${HERO_VIDEO.id}?autoplay=1`;
      player.allow = 'autoplay; fullscreen; picture-in-picture';
      player.allowFullscreen = true;
      player.frameBorder = 0;
    }
    if (!player) return;

    player.className = 'hero-video';
    heroMedia.classList.add('is-playing');
    if (img) img.style.display = 'none';
    if (badge) badge.style.display = 'none';
    heroPlay.style.display = 'none';
    heroMedia.appendChild(player);

    if (player.tagName === 'VIDEO') player.play().catch(() => {});
  });
}

// ───────── Soft form submit (placeholder — no backend) ─────────
const form = document.querySelector('#kontakt-form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const status = form.querySelector('.form-status');
    if (status) {
      status.textContent = 'Vielen Dank — Ihre Nachricht ist bei mir angekommen. Ich melde mich in Ruhe zurück.';
      status.style.color = 'var(--moss-deep)';
    }
    form.reset();
  });
}
