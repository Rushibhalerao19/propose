  // ---------- Ambient floating hearts ----------
  const heartField = document.getElementById('heart-field');
  const heartChars = ['❤','💗','💕','💞'];

  function spawnHeart() {
    const el = document.createElement('span');
    el.className = 'floating-heart';
    el.textContent = heartChars[Math.floor(Math.random() * heartChars.length)];
    const size = 14 + Math.random() * 22;
    el.style.left = Math.random() * 100 + 'vw';
    el.style.fontSize = size + 'px';
    el.style.setProperty('--drift', (Math.random() * 80 - 40) + 'px');
    const duration = 9 + Math.random() * 8;
    el.style.animationDuration = duration + 's';
    heartField.appendChild(el);
    setTimeout(() => el.remove(), duration * 1000 + 500);
  }

  for (let i = 0; i < 10; i++) setTimeout(spawnHeart, i * 400);
  setInterval(spawnHeart, 900);

  // ---------- Page navigation ----------
  function showPage(id) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(id).classList.add('active');
  }

  function goToPage2() { showPage('page2'); }

  // ---------- "No" logic: Yes grows, No dodges ----------
  const yesBtn = document.getElementById('yesBtn');
  const noBtn = document.getElementById('noBtn');
  const nudge = document.getElementById('nudge');
  const choiceRow = document.getElementById('choice-row');

  const nudgeLines = [
    "hmm, are you sure about that?",
    "let's think about this a little more...",
    "the Yes button is getting excited 👀",
    "one more try?",
    "it's getting harder to say no, isn't it?",
    "the button believes in you",
    "okay but what if you said yes instead?",
    "so close..."
  ];

  let noClicks = 0;
  let yesScale = 1;
  const growthFactor = 1.45;   // yes button multiplies by this each "no" click
  const maxScale = 60;         // effectively unlimited — big enough to cover any screen

  const noBtnLabels = [
    "No",
    "r u sure?",
    "think again",
    "really?",
    "are you positive?",
    "last chance...",
    "sure about this?",
    "hmm, no?",
    "give it a sec",
    "still no?",
    "wait, really?",
    "okay fine, I give up"
  ];

  function sayNo() {
    noClicks++;

    yesScale = Math.min(yesScale * growthFactor, maxScale);
    yesBtn.style.transform = `scale(${yesScale})`;
    yesBtn.style.boxShadow = `0 ${10 + noClicks * 3}px ${26 + noClicks * 4}px var(--shadow)`;
    yesBtn.style.zIndex = 10 + noClicks;

    nudge.textContent = nudgeLines[Math.min(noClicks - 1, nudgeLines.length - 1)];
    noBtn.textContent = noBtnLabels[Math.min(noClicks, noBtnLabels.length - 1)];

    // after a few refusals, the No button starts to get shy and wander off
    if (noClicks >= 3) {
      const rowRect = choiceRow.getBoundingClientRect();
      const maxX = Math.max(rowRect.width - 100, 40);
      const maxY = 60;
      const randX = (Math.random() * maxX - maxX / 2);
      const randY = (Math.random() * maxY - maxY / 2);
      noBtn.style.position = 'relative';
      noBtn.style.left = randX + 'px';
      noBtn.style.top = randY + 'px';
      noBtn.style.opacity = Math.max(1 - (noClicks - 3) * 0.12, 0.35);
    }
  }

  // ---------- Yes: celebrate ----------
  function sayYes() {
    burst();
    setTimeout(() => showPage('page3'), 350);
  }

  function burst() {
    const field = document.getElementById('burst-field');
    const chars = ['❤','💗','💕','✨','💖'];
    for (let i = 0; i < 36; i++) {
      const el = document.createElement('span');
      el.className = 'burst-heart';
      el.textContent = chars[Math.floor(Math.random() * chars.length)];
      const angle = Math.random() * Math.PI * 2;
      const dist = 120 + Math.random() * 260;
      el.style.setProperty('--bx', Math.cos(angle) * dist + 'px');
      el.style.setProperty('--by', Math.sin(angle) * dist + 'px');
      el.style.setProperty('--br', (Math.random() * 360) + 'deg');
      el.style.animationDelay = (Math.random() * 0.15) + 's';
      field.appendChild(el);
      setTimeout(() => el.remove(), 1800);
    }
  }
