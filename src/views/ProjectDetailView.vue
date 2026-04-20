<template>
  <div v-if="project" class="project-detail">
    <!-- Header Section -->
    <header class="detail-header container">
      <div class="meta-row reveal-text">
        <span class="reveal-inner">{{ project.date }} — {{ project.category }}</span>
      </div>
      <h1 class="project-title reveal-text" ref="titleRef">
        <span class="reveal-inner">{{ project.title }}</span>
      </h1>
      
      <div class="credits-section reveal-text">
        <div class="reveal-inner credits-list">
          <div v-for="person in project.credits" :key="person.name" class="person">
            <img :src="person.avatar" :alt="person.name" class="avatar">
            <div class="person-info">
              <span class="name">{{ person.name }}</span>
              <span class="role">{{ person.role }}</span>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Hero Media -->
    <section class="hero-media-container container">
      <div class="hero-media-inner interactive" ref="heroRef">
        <img :src="project.image" :alt="project.title" class="main-image">
      </div>
    </section>

    <!-- Description & Stats -->
    <section class="project-info container">
      <div class="info-grid">
        <div class="description-col">
          <p class="large-text">{{ project.description }}</p>
        </div>
        <div class="stats-col" v-if="project.stats">
          <div v-for="(val, key) in project.stats" :key="key" class="stat-item">
            <span class="stat-label">{{ key }}</span>
            <div class="stat-bar-bg">
              <div class="stat-bar-fill" :style="{ width: (val * 10) + '%' }"></div>
            </div>
            <span class="stat-value">{{ val }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Elements Gallery -->
    <section class="elements-gallery container" v-if="project.features">
      <h2 class="section-label">Selected Elements</h2>
      <div class="elements-grid">
        <div v-for="feat in project.features" :key="feat.title" class="element-card">
          <div class="element-media">
            <img :src="feat.image" :alt="feat.title">
          </div>
          <div class="element-info">
            <h3>{{ feat.title }}</h3>
            <p>{{ feat.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Built With Section -->
    <section class="built-with section container" v-if="project.tags">
      <p class="section-subtitle">This website was built with...</p>
      <div class="tags-container">
        <!-- Visual decorators for Awwwards style -->
        <!-- <div class="tag-pill decorator dark"></div>
        <div class="tag-pill decorator light"></div> -->
        
        <div v-for="tag in project.tags" :key="tag.label" class="tag-pill">
          {{ tag.label }}
        </div>
      </div>
    </section>

    <!-- Bottom Sticky Menu -->
    <nav class="bottom-menu-pill">
      <router-link to="/" class="pill-btn secondary">Back to Projects</router-link>
      <a :href="project.link" target="_blank" class="pill-btn primary">Visit Live Site ↗</a>
    </nav>
  </div>
  <div v-else class="loading-state container">
    <p>Project not found...</p>
    <router-link to="/">Return Home</router-link>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { projects } from '../data/projects';
import gsap from 'gsap';

const route = useRoute();
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

.detail-header {
  text-align: center;
  margin-bottom: 80px;
}

.meta-row {
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

.credits-list {
  display: flex;
  justify-content: center;
  gap: 3rem;
  flex-wrap: wrap;
}

.person {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  background: #ddd;
}

.person-info {
  display: flex;
  flex-direction: column;
  text-align: left;
}

.person-info .name {
  font-weight: 700;
  font-size: 0.9rem;
}

.person-info .role {
  font-size: 0.75rem;
  opacity: 0.6;
}

/* Hero Media */
.hero-media-container {
  margin-bottom: 120px;
}

.hero-media-inner {
  width: 100%;
  height: 85vh;
  border-radius: 24px;
  overflow: hidden;
  background: #eee;
}

.main-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Project Info */
.project-info {
  margin-bottom: 120px;
}

.info-grid {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 5rem;
}

.large-text {
  font-size: clamp(1.5rem, 2.5vw, 2.2rem);
  line-height: 1.3;
  font-weight: 500;
}

.stats-col {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.stat-item {
  display: grid;
  grid-template-columns: 80px 1fr 30px;
  align-items: center;
  gap: 1rem;
}

.stat-label {
  font-size: 0.7rem;
  text-transform: uppercase;
  font-weight: 700;
  opacity: 0.5;
}

.stat-bar-bg {
  height: 4px;
  background: rgba(0,0,0,0.05);
  border-radius: 2px;
}

.stat-bar-fill {
  height: 100%;
  background: var(--color-accent);
  border-radius: 2px;
}

.stat-value {
  font-size: 0.8rem;
  font-weight: 700;
  text-align: right;
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
  padding: 100px 0;
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
