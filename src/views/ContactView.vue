<template>
  <div class="contact-view">
    <!-- Ambient Background Layer -->
    <div class="ambient-layer" :class="{ 'is-energized': isHoveringCTA }" ref="ambientLayer">
      <div 
        v-for="(ghost, index) in ghosts" 
        :key="ghost.id"
        class="ghost-phrase"
        :style="ghost.style"
        :ref="el => { if (el) ghostRefs[index] = el }"
      >
        {{ ghost.displayText }}<span class="cursor">_</span>
      </div>
    </div>

    <!-- Main Content -->
    <div class="contact-content container">
      <div class="contact-header reveal-text">
        <h1 class="reveal-inner">{{ t('contact.greeting') }}</h1>
        <p class="reveal-inner">{{ t('contact.intro') }}</p>
      </div>

      <div 
        class="primary-contact"
        @mouseenter="isHoveringCTA = true"
        @mouseleave="isHoveringCTA = false"
      >
        <a href="mailto:pedrovischisoares@gmail.com" class="main-cta interactive">
          {{ t('contact.get_started') }}
        </a>
      </div>

      <div class="social-links reveal-text">
        <div class="reveal-inner links-wrapper">
          <a href="https://linkedin.com" target="_blank" class="social-link interactive">LinkedIn</a>
          <a href="https://instagram.com" target="_blank" class="social-link interactive">Instagram</a>
          <a href="https://wa.me/5511965786713?text=Olá! Vi seu portfólio e gostaria de conversar." target="_blank" class="social-link interactive">Whatsapp</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useI18n } from '../i18n';
import gsap from 'gsap';

const { t } = useI18n();
const ambientLayer = ref(null);
const ghosts = ref([]);
const ghostRefs = ref([]);
const isHoveringCTA = ref(false);

const PHRASES = [
  'ambient.ecommerce',
  'ambient.branding',
  'ambient.editorial',
  'ambient.digital',
  'ambient.interfaces',
  'ambient.performance',
  'ambient.institucional',
  'ambient.landingpage',
  'ambient.hotsite',
  'ambient.dinamico',
  'ambient.uxui',
  'ambient.blog',
  'ambient.portfolio',
  'ambient.restaurante',
  'ambient.casamento'
];

let ghostIdCounter = 0;

const spawnGhost = () => {
  const phraseKey = PHRASES[Math.floor(Math.random() * PHRASES.length)];
  const fullText = t(phraseKey);
  const id = ghostIdCounter++;
  
  const style = {
    top: `${Math.random() * 80 + 10}%`,
    left: `${Math.random() * 60 + 10}%`,
    fontSize: `${Math.random() * 3 + 1.5}vw`,
    transform: `rotate(${Math.random() * 20 - 10}deg)`,
  };

  const newGhost = ref({ id, fullText, displayText: '', style });
  ghosts.value.push(newGhost.value);

  let charIndex = 0;
  const typeInterval = setInterval(() => {
    if (charIndex < fullText.length) {
      newGhost.value.displayText += fullText[charIndex];
      charIndex++;
    } else {
      clearInterval(typeInterval);
    }
  }, 100);

  setTimeout(() => {
    ghosts.value = ghosts.value.filter(g => g.id !== id);
  }, 10000);
};

let spawnInterval;

onMounted(() => {
  const tl = gsap.timeline();
  tl.fromTo('.reveal-inner', 
    { y: '120%' },
    { y: '0%', duration: 1.2, stagger: 0.1, ease: 'power4.out', delay: 0.2 }
  );

  tl.fromTo('.main-email',
    { opacity: 0, scale: 0.9 },
    { opacity: 1, scale: 1, duration: 2, ease: 'power3.out' },
    '-=0.5'
  );

  spawnGhost();
  spawnInterval = setInterval(spawnGhost, 3000);
});

onUnmounted(() => {
  clearInterval(spawnInterval);
});
</script>

<style scoped>
.contact-view {
  width: 100%;
  min-height: 100vh;
  padding-top: 180px;
  padding-bottom: 120px;
  background-color: var(--color-bg);
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
}

.ambient-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
  transition: background 0.8s ease;
}

.ambient-layer.is-energized {
  background: radial-gradient(circle at 50% 50%, rgba(200, 255, 0, 0.1) 0%, transparent 70%);
}

.ghost-phrase {
  position: absolute;
  font-family: var(--font-primary);
  font-weight: 800;
  color: var(--color-text);
  opacity: 0;
  white-space: nowrap;
  animation: ghost-fade 8s ease-in-out forwards;
  filter: blur(4px) grayscale(1);
  transition: filter 0.8s ease, color 0.8s ease, transform 0.8s ease;
  user-select: none;
}

.is-energized .ghost-phrase {
  filter: blur(0px) grayscale(0);
  color: #c8ff00;
  transform: scale(1.2) !important;
}

@keyframes ghost-fade {
  0% { opacity: 0; transform: translateY(20px) rotate(-5deg); }
  20% { opacity: 0.5; transform: translateY(0) rotate(0deg); }
  80% { opacity: 0.5; transform: translateY(-20px) rotate(5deg); }
  100% { opacity: 0; transform: translateY(-40px) rotate(10deg); }
}

.cursor {
  opacity: 1;
  animation: blink 1s infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

.contact-content {
  position: relative;
  z-index: 2;
  text-align: center;
  width: 100%;
}

.contact-header {
  margin-bottom: 4rem;
}

.contact-header h1 {
  font-size: clamp(2rem, 5vw, 4rem);
  font-weight: 800;
  margin-bottom: 1.5rem;
  text-transform: uppercase;
  letter-spacing: -2px;
}

.contact-header p {
  font-size: 1.2rem;
  opacity: 0.6;
}

.primary-contact {
  margin-bottom: 6rem;
  width: 500px;
  justify-self: center;
}

.main-cta {
  font-size: clamp(3rem, 5vw, 8rem);
  font-weight: 900;
  color: var(--color-text);
  text-decoration: none;
  transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
  display: inline-block;
  letter-spacing: -6px;
  line-height: 0.8;
  position: relative;
  animation: pulse-animation 2s infinite;
  width: max-content;
}

@keyframes pulse-animation {
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.05); opacity: 0.8; }
  100% { transform: scale(1); opacity: 1; }
}

.main-cta::after {
  content: '→';
  font-size: 0.3em;
  vertical-align: middle;
  margin-left: 20px;
  opacity: 0;
  transform: translateX(-40px);
  transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
}

.main-cta:hover {
  color: #007e9e;
  transform: scale(1.02);
}

.main-cta:hover::after {
  opacity: 1;
  transform: translateX(0);
}

.social-links {
  margin-top: 4rem;
}

.links-wrapper {
  display: flex;
  justify-content: center;
  gap: 3rem;
  flex-wrap: wrap;
}

.social-link {
  font-family: var(--font-secondary);
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-text);
  text-decoration: none;
  opacity: 0.6;
  position: relative;
  transition: opacity 0.3s ease;
}

.social-link::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 100%;
  height: 1px;
  background-color: currentColor;
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.4s ease;
}

.social-link:hover {
  opacity: 1;
}

.social-link:hover::after {
  transform: scaleX(1);
  transform-origin: left;
}

@media (max-width: 768px) {
  .main-cta {
    font-size: 1.8rem;
    letter-spacing: -1px;
  }
}
</style>
