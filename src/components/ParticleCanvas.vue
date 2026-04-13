<template>
  <canvas ref="canvasRef" class="particle-canvas"></canvas>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';

const props = defineProps({
  targetShape: {
    type: String,
    default: ''
  }
});

const canvasRef = ref(null);
let ctx = null;
let particles = [];
let animationFrame = null;
let mouse = { x: -1000, y: -1000, radius: 100 };

const PARTICLE_COUNT = 10000;
const PARTICLE_SIZE = 1.5;
const GAP = 12; // Gap between particles in grid

class Particle {
  constructor(canvasWidth, canvasHeight) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    
    this.x = Math.random() * canvasWidth;
    this.y = Math.random() * canvasHeight;
    
    // Stable target (grid or shape)
    this.targetX = this.x;
    this.targetY = this.y;
    
    // Grid base
    this.baseX = this.x;
    this.baseY = this.y;
    
    this.vx = 0;
    this.vy = 0;
    this.radius = PARTICLE_SIZE;
    this.friction = 0.9;
    this.stiffness = 0.05;
    this.density = Math.random() * 30 + 1;
  }

  setBase(x, y) {
    this.baseX = x;
    this.baseY = y;
    this.targetX = x;
    this.targetY = y;
  }

  update() {
    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    
    // Mouse Repulsion
    if (distance < mouse.radius) {
      let force = (mouse.radius - distance) / mouse.radius;
      let forceX = (dx / distance) * force * this.density;
      let forceY = (dy / distance) * force * this.density;
      this.vx -= forceX;
      this.vy -= forceY;
    }

    // Spring Attraction to target
    let ax = (this.targetX - this.x) * this.stiffness;
    let ay = (this.targetY - this.y) * this.stiffness;
    
    this.vx += ax;
    this.vy += ay;
    
    this.vx *= this.friction;
    this.vy *= this.friction;
    
    this.x += this.vx;
    this.y += this.vy;
  }

  draw(context) {
    context.fillStyle = 'white';
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    context.fill();
  }
}

const initParticles = () => {
  const canvas = canvasRef.value;
  const w = canvas.width;
  const h = canvas.height;
  particles = [];

  // Create grid
  const cols = Math.floor(w / GAP);
  const rows = Math.min(Math.floor(h / GAP), Math.floor((h * 0.45) / GAP)); 
  const gridW = cols * GAP;
  const gridH = rows * GAP;
  const startX = (w - gridW) / 2;
  const startY = 0; // Gruda no topo do Canvas

  // Save grid area for text centering
  canvas.gridArea = { startX, startY, gridW, gridH };

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push(new Particle(w, h));
  }

  let particleIndex = 0;
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (particleIndex < PARTICLE_COUNT) {
        particles[particleIndex].setBase(startX + x * GAP, startY + y * GAP);
        particleIndex++;
      }
    }
  }

  // Handle leftover particles that didn't fit in the grid
  // We send them to the edges or just hide them off-canvas
  for (let i = particleIndex; i < PARTICLE_COUNT; i++) {
    particles[i].setBase(i % 2 === 0 ? -100 : w + 100, Math.random() * h);
  }
};

const sampleText = (text) => {
  if (!text) {
    particles.forEach(p => {
      p.targetX = p.baseX;
      p.targetY = p.baseY;
    });
    return;
  }

  const canvas = canvasRef.value;
  const tempCanvas = document.createElement('canvas');
  const tempCtx = tempCanvas.getContext('2d', { willReadFrequently: true });
  tempCanvas.width = canvas.width;
  tempCanvas.height = canvas.height;

  // Draw text centered in the same area as the grid
  const { startX, startY, gridW, gridH } = canvas.gridArea;
  const centerX = startX + gridW / 2;
  const centerY = startY + gridH / 2;

  let displayText = text.toUpperCase();
  let fontSize = Math.min(canvas.width / text.length * 1.2, 160);

  tempCtx.fillStyle = 'white';
  tempCtx.font = `900 ${fontSize}px Outfit`;
  tempCtx.textAlign = 'center';
  tempCtx.textBaseline = 'middle';

  if (text === 'CHECK') {
    displayText = '✔';
    // Colocamos o check no topo da área da grade
    tempCtx.fillText(displayText, centerX, startY + 100); 
  } else {
    tempCtx.fillText(displayText, centerX, centerY);
  }

  const imageData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height).data;
  const points = [];
  const step = 4;

  for (let y = 0; y < tempCanvas.height; y += step) {
    for (let x = 0; x < tempCanvas.width; x += step) {
      const index = (y * tempCanvas.width + x) * 4;
      if (imageData[index + 3] > 128) {
        points.push({ x, y });
      }
    }
  }

  // Shuffle particles to make movement look more organic
  const shuffledParticles = [...particles].sort(() => Math.random() - 0.5);

  shuffledParticles.forEach((p, i) => {
    if (i < points.length) {
      p.targetX = points[i].x;
      p.targetY = points[i].y;
    } else {
      // Particles not in the shape fly to the edges
      p.targetX = p.x < canvas.width / 2 ? -50 : canvas.width + 50;
      p.targetY = Math.random() * canvas.height;
    }
  });
};

const animate = () => {
  ctx.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height);
  
  particles.forEach(p => {
    p.update();
    p.draw(ctx);
  });
  
  animationFrame = requestAnimationFrame(animate);
};

onMounted(() => {
  const canvas = canvasRef.value;
  ctx = canvas.getContext('2d');
  
  const resize = () => {
    const parent = canvas.parentElement;
    canvas.width = parent.clientWidth;
    canvas.height = parent.clientHeight;
    initParticles();
  };

  const parent = canvas.parentElement;
  window.addEventListener('resize', resize);
  resize();

  const handleMouseMove = (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  };

  const handleMouseLeave = () => {
    mouse.x = -1000;
    mouse.y = -1000;
  };

  parent.addEventListener('mousemove', handleMouseMove);
  parent.addEventListener('mouseleave', handleMouseLeave);

  animate();

  onUnmounted(() => {
    window.removeEventListener('resize', resize);
    parent.removeEventListener('mousemove', handleMouseMove);
    parent.removeEventListener('mouseleave', handleMouseLeave);
    cancelAnimationFrame(animationFrame);
  });
});

watch(() => props.targetShape, (newVal) => {
  sampleText(newVal);
});
</script>

<style scoped>
.particle-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none; /* Let clicks pass through to links */
  z-index: 1;
}
</style>
