// Background: drifting dots joined by faint lines when close; the cursor gently pushes them away.
(() => {
  const canvas = document.getElementById("particles");
  const ctx = canvas.getContext("2d");
  const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const LINK = 110, SPEED = 0.25, PUSH = 90;
  let w, h, color, mx = -1e4, my = -1e4;
  const dots = [];

  function resize() {
    const dpr = devicePixelRatio || 1;
    w = innerWidth; h = innerHeight;
    canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const n = Math.min(120, Math.round((w * h) / 12000));
    while (dots.length < n) dots.push({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - 0.5) * SPEED, vy: (Math.random() - 0.5) * SPEED });
    dots.length = n;
  }

  function step() {
    for (const d of dots) {
      const dx = d.x - mx, dy = d.y - my, r2 = dx * dx + dy * dy;
      if (r2 < PUSH * PUSH) { const f = (1 - Math.sqrt(r2) / PUSH) * 0.03; d.x += dx * f; d.y += dy * f; }
      d.x = (d.x + d.vx + w) % w; d.y = (d.y + d.vy + h) % h; // wrap at edges
    }
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = ctx.strokeStyle = color;
    for (let i = 0; i < dots.length; i++) {
      const a = dots[i];
      for (let j = i + 1; j < dots.length; j++) {
        const b = dots[j], d2 = (a.x - b.x) ** 2 + (a.y - b.y) ** 2;
        if (d2 < LINK * LINK) {
          ctx.globalAlpha = (1 - Math.sqrt(d2) / LINK) * 0.18;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
        }
      }
      ctx.globalAlpha = 0.35;
      ctx.beginPath(); ctx.arc(a.x, a.y, 1.2, 0, Math.PI * 2); ctx.fill();
    }
  }

  function loop() { step(); draw(); requestAnimationFrame(loop); }
  const readColor = () => { color = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim(); if (still) draw(); };

  addEventListener("resize", () => { resize(); if (still) draw(); });
  addEventListener("pointermove", (e) => { mx = e.clientX; my = e.clientY; });
  document.addEventListener("pointerleave", () => { mx = my = -1e4; });
  matchMedia("(prefers-color-scheme: dark)").addEventListener("change", readColor);
  resize(); readColor();
  if (!still) loop();
})();
