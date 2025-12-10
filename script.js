// Simple rain animation on the canvas

const canvas = document.getElementById("rain-canvas");
const ctx = canvas.getContext("2d");

let drops = [];
const NUM_DROPS = 320;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener("resize", () => {
  resizeCanvas();
  initRain();
});

function initRain() {
  drops = [];
  for (let i = 0; i < NUM_DROPS; i++) {
    drops.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      len: 14 + Math.random() * 20,
      speed: 6 + Math.random() * 6,
      opacity: 0.35 + Math.random() * 0.35
    });
  }
}

function drawRain() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = "rgba(200, 240, 255, 0.9)";
  ctx.lineWidth = 1.4;
  ctx.lineCap = "round";

  for (let i = 0; i < drops.length; i++) {
    const d = drops[i];
    ctx.globalAlpha = d.opacity;
    ctx.beginPath();
    ctx.moveTo(d.x, d.y);
    ctx.lineTo(d.x, d.y + d.len);
    ctx.stroke();

    d.y += d.speed;
    if (d.y > canvas.height) {
      d.y = -20;
      d.x = Math.random() * canvas.width;
      d.speed = 6 + Math.random() * 6;
      d.len = 14 + Math.random() * 20;
    }
  }

  requestAnimationFrame(drawRain);
}

// Smooth scroll for nav (basic)
document.addEventListener("click", (e) => {
  if (e.target.matches("nav a[href^='#']")) {
    e.preventDefault();
    const targetId = e.target.getAttribute("href");
    const el = document.querySelector(targetId);
    if (el) {
      window.scrollTo({
        top: el.offsetTop - 72,
        behavior: "smooth"
      });
    }
  }
});

// Set footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Init
resizeCanvas();
initRain();
drawRain();
