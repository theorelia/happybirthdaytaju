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

// ===== MUSIC =====
let isPlaying = false;
let ytPlayer = null;

// Load YouTube IFrame API
function loadYT() {
  const tag = document.createElement('script');
  tag.src = 'https://www.youtube.com/iframe_api';
  document.head.appendChild(tag);
}
loadYT();

window.onYouTubeIframeAPIReady = function () {
  ytPlayer = new YT.Player('yt-frame', {
    videoId: 'cwLRQn61oUY',
    playerVars: { autoplay: 0, loop: 1, playlist: 'cwLRQn61oUY' },
    events: {
      onStateChange: function(e) {
        if (e.data === YT.PlayerState.PLAYING) {
          isPlaying = true;
          document.getElementById('wave').classList.add('playing');
          document.querySelector('.play-icon').textContent = '⏸';
        } else {
          isPlaying = false;
          document.getElementById('wave').classList.remove('playing');
          document.querySelector('.play-icon').textContent = '▶';
        }
      }
    }
  });
};

function toggleMusic() {
  if (!ytPlayer) return;
  if (isPlaying) {
    ytPlayer.pauseVideo();
  } else {
    ytPlayer.playVideo();
  }
}

// Prevent page scroll while curtain is up
document.body.style.overflow = 'hidden';