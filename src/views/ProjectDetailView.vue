<template>
  <div v-if="project" class="project-detail">
    <!-- Header Info -->
    <header class="project-header container">
      <div class="project-meta reveal-text">
        <span class="reveal-inner">
          <span class="category">{{ project.category[locale] }}</span>
          <span class="date">{{ project.date }}</span>
        </span>
      </div>
      <h1 class="project-title reveal-text">
        <span class="reveal-inner">{{ project.title }}</span>
      </h1>
      
      <div class="project-info reveal-text">
        <p class="project-description reveal-inner">{{ project.description[locale] }}</p>
      </div>
      
      <!-- Credits Grid -->
      <div class="project-credits reveal-text">
        <div class="reveal-inner">
          <div class="credits-label">{{ t('detail.credits') }}</div>
          <div class="credits-list">
            <div v-for="credit in project.credits" :key="credit.name" class="credit-item">
              <span class="credit-name">{{ credit.name }}</span>
              <span class="credit-role">{{ credit.role }}</span>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Hero Media -->
    <section class="project-hero container">
      <div class="hero-media-wrapper interactive" ref="heroRef">
        <img :src="project.image" :alt="project.title">
      </div>
    </section>

    <!-- Project Metrics (Stats) -->
    <section class="project-metrics container" v-if="project.stats">
      <div class="metrics-grid">
        <div v-for="(val, label) in project.stats" :key="label" class="metric-item">
          <div class="metric-info">
            <span class="metric-label">{{ label }}</span>
            <span class="metric-value">{{ val }}</span>
          </div>
          <div class="metric-bar">
            <div class="metric-fill" :style="{ width: (val * 10) + '%' }"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Elements Gallery -->
    <section class="elements-gallery container" v-if="project.features">
      <h2 class="section-label">{{ t('detail.elements') }}</h2>
      <div class="elements-grid">
        <div v-for="feat in project.features" :key="feat.title[locale]" class="element-card">
          <div class="element-media">
            <img :src="feat.image" :alt="feat.title[locale]">
          </div>
          <div class="element-info">
            <h3>{{ feat.title[locale] }}</h3>
            <p>{{ feat.description[locale] }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Built With Section -->
    <section class="built-with section container" v-if="project.tags">
      <p class="section-subtitle">{{ t('detail.builtWith') }}</p>
      <div class="tags-container">
        <div v-for="tag in project.tags" :key="tag.label" class="tag-pill">
          {{ tag.label }}
        </div>
      </div>
    </section>

    <!-- Bottom Sticky Menu -->
    <nav class="bottom-menu-pill">
      <router-link to="/" class="pill-btn secondary">{{ t('detail.back') }}</router-link>
      <a :href="project.link" target="_blank" class="pill-btn primary">{{ t('detail.visit') }}</a>
    </nav>
  </div>

  <div v-else class="project-not-found container">
    <p>{{ t('detail.not_found') }}</p>
    <router-link to="/">{{ t('detail.return_home') }}</router-link>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { projects } from '../data/projects';
import { useI18n } from '../i18n';
import gsap from 'gsap';

const route = useRoute();
const { t, locale } = useI18n();

const project = computed(() => projects.find(p => p.id === route.params.id));

const titleRef = ref(null);
const heroRef = ref(null);

onMounted(() => {
  if (project.value) {
    const tl = gsap.timeline();

    // Reveal animations
    tl.fromTo('.reveal-inner', 
      { y: '120%' },
      { y: '0%', duration: 1.2, stagger: 0.1, ease: 'power4.out', delay: 0.2 }
    );

    tl.fromTo(heroRef.value,
      { scale: 0.9, opacity: 0, y: 50 },
      { scale: 1, opacity: 1, y: 0, duration: 1.5, ease: 'power3.out' },
      '-=0.8'
    );
  }
});
</script>

<style scoped>
.project-detail {
  padding-top: 180px;
  padding-bottom: 200px;
  background-color: var(--color-bg);
  min-height: 100vh;
}

.project-header {
  text-align: center;
  margin-bottom: 80px;
}

.project-meta {
  margin-bottom: 2rem;
  font-family: var(--font-secondary);
  font-size: 0.9rem;
  letter-spacing: 1px;
  text-transform: uppercase;
  opacity: 0.6;
}

.project-title {
  font-size: clamp(3rem, 10vw, 8rem);
  font-weight: 800;
  line-height: 0.9;
  letter-spacing: -3px;
  margin-bottom: 60px;
}

.project-description {
  font-size: clamp(1.5rem, 2.5vw, 2.2rem);
  line-height: 1.3;
  font-weight: 500;
  max-width: 900px;
  margin: 0 auto 80px;
}

.credits-label {
  font-family: var(--font-secondary);
  font-size: 0.75rem;
  text-transform: uppercase;
  opacity: 0.4;
  margin-bottom: 1.5rem;
}

.credits-list {
  display: flex;
  justify-content: center;
  gap: 3rem;
  flex-wrap: wrap;
}

.credit-item {
  display: flex;
  flex-direction: column;
  text-align: left;
}

.credit-name {
  font-weight: 700;
  font-size: 1rem;
}

.credit-role {
  font-size: 0.8rem;
  opacity: 0.6;
}

/* Hero Media */
.project-hero {
  margin-bottom: 120px;
}

.hero-media-wrapper {
  width: 100%;
  aspect-ratio: 16/9;
  border-radius: 24px;
  overflow: hidden;
  background: #eee;
}

.hero-media-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Project Metrics (Stats) */
.project-metrics {
  margin-bottom: 120px;
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  max-width: 1000px;
  margin: 0 auto;
}

.metric-item {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.metric-info {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.metric-label {
  font-size: 0.7rem;
  text-transform: uppercase;
  font-weight: 700;
  opacity: 0.5;
}

.metric-value {
  font-size: 1.2rem;
  font-family: var(--font-primary);
  font-weight: 800;
}

.metric-bar {
  height: 4px;
  background: rgba(0,0,0,0.05);
  border-radius: 2px;
  overflow: hidden;
}

.metric-fill {
  height: 100%;
  background: var(--color-accent);
  border-radius: 2px;
}

/* Elements Gallery */
.section-label {
  font-size: 0.8rem;
  text-transform: uppercase;
  margin-bottom: 3rem;
  opacity: 0.4;
  border-bottom: 1px solid rgba(0,0,0,0.1);
  padding-bottom: 1rem;
}

.elements-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
}

.element-card {
  background: rgba(255,255,255,0.3);
  border-radius: 16px;
  padding: 1.5rem;
}

.element-media {
  aspect-ratio: 16/9;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 1.5rem;
  background: #eee;
}

.element-media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.element-info h3 {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
}

.element-info p {
  font-size: 0.9rem;
  opacity: 0.7;
  line-height: 1.5;
}

/* Built With Section */
.built-with {
  padding-top: 100px;
  text-align: center;
}

.section-subtitle {
  font-size: 0.9rem;
  opacity: 0.6;
  margin-bottom: 2.5rem;
}

.tags-container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 12px;
  max-width: 900px;
  margin: 0 auto;
}

.tag-pill {
  padding: 10px 24px;
  border-radius: 40px;
  border: 1px solid rgba(0,0,0,0.1);
  font-family: var(--font-secondary);
  font-size: 0.95rem;
  font-weight: 500;
  background: white;
  transition: all 0.3s ease;
  cursor: default;
}

.tag-pill:hover {
  border-color: var(--color-accent);
  color: var(--color-accent);
  transform: translateY(-2px);
}


/* Bottom Menu */
.bottom-menu-pill {
  position: fixed;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(255,255,255,0.8);
  backdrop-filter: blur(20px);
  padding: 8px;
  border-radius: 40px;
  display: flex;
  gap: 8px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  z-index: 1000;
  border: 1px solid rgba(255,255,255,0.5);
}

.pill-btn {
  padding: 12px 24px;
  border-radius: 30px;
  font-family: var(--font-secondary);
  font-size: 0.9rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
}

.pill-btn.primary {
  background: var(--color-accent);
  color: #fff;
}

.pill-btn.secondary {
  background: transparent;
  color: var(--color-text);
}

.pill-btn:hover {
  transform: translateY(-2px);
  filter: brightness(1.1);
}

@media (max-width: 900px) {
  .info-grid {
    grid-template-columns: 1fr;
  }
  .elements-grid {
    grid-template-columns: 1fr;
  }
}
</style>
