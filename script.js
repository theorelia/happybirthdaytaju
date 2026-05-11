// ===== CURTAIN OPEN =====
function openCurtain() {
  const left = document.querySelector('.curtain-left');
  const right = document.querySelector('.curtain-right');
  const curtain = document.getElementById('curtain');
  const content = document.getElementById('main-content');

  left.classList.add('open');
  right.classList.add('open');

  setTimeout(() => {
    content.classList.add('revealed');
  }, 400);

  setTimeout(() => {
    curtain.style.display = 'none';
    document.body.style.overflow = 'auto';
    initScrollObserver();
    // Auto-reveal first visible elements
    document.querySelectorAll('.scene-inner, .title-card, .letter-inner').forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight) el.classList.add('visible');
    });
  }, 1500);
}

// ===== SCROLL REVEAL =====
function initScrollObserver() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.scene-inner, .title-card, .letter-inner').forEach(el => {
    observer.observe(el);
  });
}

// ===== MUSIC - Opens YouTube in small popup (bypasses iframe restrictions) =====
let musicWindow = null;
let isPlaying = false;

function toggleMusic() {
  const wave = document.getElementById('wave');
  const icon = document.querySelector('.play-icon');

  if (!isPlaying) {
    const w = 320, h = 180;
    const left = window.screen.width - w - 20;
    const top = window.screen.height - h - 80;
    musicWindow = window.open(
      'https://www.youtube.com/watch?v=cwLRQn61oUY',
      'music',
      `width=${w},height=${h},left=${left},top=${top},toolbar=no,menubar=no,scrollbars=no`
    );
    isPlaying = true;
    wave.classList.add('playing');
    icon.textContent = '⏸';

    const poll = setInterval(() => {
      if (musicWindow && musicWindow.closed) {
        isPlaying = false;
        wave.classList.remove('playing');
        icon.textContent = '▶';
        clearInterval(poll);
      }
    }, 1000);

  } else {
    if (musicWindow && !musicWindow.closed) musicWindow.close();
    isPlaying = false;
    wave.classList.remove('playing');
    icon.textContent = '▶';
  }
}

// Prevent page scroll while curtain is up
document.body.style.overflow = 'hidden';
