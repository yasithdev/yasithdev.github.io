// Scatter the skill labels in the empty margins left and right of the content, biggest first, without overlaps.
(() => {
  const sky = document.querySelector(".skyline");
  const words = [...sky.children].sort((a, b) => parseFloat(b.style.getPropertyValue("--y")) - parseFloat(a.style.getPropertyValue("--y")));
  const content = document.querySelector(".page-content .wrapper");
  const PAD = 12, TOP = 72;
  // Fixed-seed random (mulberry32), so every load and page places the labels in the same spots.
  let seed;
  const rand = () => { seed = (seed + 0x6d2b79f5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t ^= t + Math.imul(t ^ (t >>> 7), 61 | t); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  function layout() {
    seed = 42;
    const vw = innerWidth, vh = innerHeight, box = content.getBoundingClientRect();
    const gutters = [[PAD, box.left - PAD], [box.right + PAD, vw - PAD]];
    const placed = [];
    for (const w of words) {
      w.classList.remove("placed");
      const ww = w.offsetWidth, wh = w.offsetHeight;
      for (let t = 0; t < 60; t++) {
        const [a, b] = gutters[t % 2];
        if (b - a < ww) continue;
        const x = a + rand() * (b - a - ww), y = TOP + rand() * (vh - TOP - PAD - wh);
        if (placed.some((r) => x < r.x + r.w + 8 && r.x < x + ww + 8 && y < r.y + r.h + 6 && r.y < y + wh + 6)) continue;
        placed.push({ x, y, w: ww, h: wh });
        w.style.left = x + "px"; w.style.top = y + "px"; w.classList.add("placed");
        w.hx = x + ww / 2; w.hy = y + wh / 2; // centre, cached for the motion loop
        break;
      }
    }
  }
  // Subtle motion: each label drifts a few pixels around its spot and eases away from the cursor, then springs back.
  if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const DRIFT = 4, PUSH = 110;
    const body = words.map((w, i) => ({ w, i, dx: 0, dy: 0, vx: 0, vy: 0 }));
    let mx = -1e4, my = -1e4;
    addEventListener("pointermove", (e) => { mx = e.clientX; my = e.clientY; });
    document.addEventListener("pointerleave", () => { mx = my = -1e4; });
    const tick = (now) => {
      for (const b of body) {
        if (!b.w.classList.contains("placed")) continue;
        const tx = DRIFT * Math.sin(now / 2600 + b.i), ty = DRIFT * Math.cos(now / 3100 + b.i * 1.7);
        b.vx += (tx - b.dx) * 0.01; b.vy += (ty - b.dy) * 0.01;
        const px = b.w.hx + b.dx - mx, py = b.w.hy + b.dy - my, r = Math.hypot(px, py);
        if (r < PUSH && r > 0) { const f = (1 - r / PUSH) * 0.6; b.vx += (px / r) * f; b.vy += (py / r) * f; }
        b.vx *= 0.9; b.vy *= 0.9; b.dx += b.vx; b.dy += b.vy;
        b.w.style.transform = `translate(${b.dx.toFixed(1)}px, ${b.dy.toFixed(1)}px)`;
      }
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }
  let t;
  addEventListener("resize", () => { clearTimeout(t); t = setTimeout(layout, 150); });
  document.fonts.ready.then(layout);
})();
