<template>
  <section class="project-grid">
    <div class="container">
      <div class="grid-header">
        <span class="grid-category">{{ t('grid.category') }}</span>
        <h2 v-html="t('grid.title')"></h2>
      </div>
      
      <div class="grid">
        <article 
          class="project-card interactive" 
          v-for="project in projects.slice(0, 4)" 
          :key="project.id" 
          ref="cardsRef"
          @click="openProject(project.id)"
        >
          <div class="card-media">
            <div class="media-placeholder">
              <img :src="project.image" :alt="project.title">
            </div>
            
            <div class="card-overlay">
              <div class="overlay-left">
                <span class="overlay-label">{{ t(project.label) }}</span>
                <span class="overlay-title">{{ project.title }}</span>
              </div>
              <div class="overlay-right">
                <a :href="project.link" target="_blank" class="icon-link" @click.stop>
                  <button class="icon-btn">↗</button>
                </a>
              </div>
            </div>
          </div>
          
          <div class="card-info">
            <span class="project-title">{{ project.title }}</span>
            <span class="by-text">{{ t('grid.by') }}</span>
            <div class="author-info">
              <div class="author-avatar" style="background:#111;"></div>
              <span class="author-name">{{ project.author }}</span>
              <span class="pro-badge">PRO</span>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { projects } from '../data/projects';
import { useI18n } from '../i18n';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const { t } = useI18n();
const router = useRouter();
const cardsRef = ref([]);

const openProject = (id) => {
  router.push(`/project/${id}`);
};

onMounted(() => {
  cardsRef.value.forEach((card, i) => {
    gsap.fromTo(card, 
      { y: 60, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 1, 
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
        }
      }
    );
  });
});
</script>

<style scoped>
.project-grid {
  padding: 80px 0;
  background-color: var(--color-white);
}

.grid-header {
  margin-bottom: 4rem;
}

.grid-category {
  font-family: var(--font-secondary);
  font-size: 0.85rem; 
  font-weight: 500;
  color: #C26339; 
  text-transform: capitalize;
}

.grid-header h2 {
  font-size: clamp(3rem, 5vw, 4.5rem);
  line-height: 1.1;
  font-weight: 700;
  letter-spacing: -2px;
  margin-top: 1rem;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 3rem;
}

.project-card {
  display: flex;
  flex-direction: column;
}

.card-link,
.icon-link {
  text-decoration: none;
  color: inherit;
  pointer-events: all; 
}

.card-media {
  width: 100%;
  aspect-ratio: 4/3;
  overflow: hidden;
  border-radius: 12px;
  position: relative;
}

.media-placeholder {
  width: 100%;
  height: 100%;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-primary);
  font-size: 1.5rem;
  color: #999;
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.media-placeholder :deep(img),
.media-placeholder :deep(video) {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
}

.card-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0) 100%);
  opacity: 0;
  transition: opacity 0.4s ease;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 1.5rem;
  color: white;
  pointer-events: none; 
}

.project-card:hover .media-placeholder {
  transform: scale(1.05); 
}

.project-card:hover .card-overlay {
  opacity: 1;
}

.overlay-left {
  display: flex;
  flex-direction: column;
}

.overlay-label {
  font-family: var(--font-secondary);
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 4px;
}

.overlay-title {
  font-family: var(--font-primary);
  font-size: 1.2rem;
  font-weight: 700;
  text-transform: uppercase;
}

.overlay-right {
  display: flex;
  gap: 1rem;
}

.icon-btn {
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  pointer-events: all;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s;
}

.icon-btn:hover {
  transform: scale(1.1);
}

/* CARD INFO (Bottom text) */
.card-info {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding-top: 1.2rem;
}

.project-title {
  font-size: 1.1rem;
  font-weight: 700;
}

.by-text {
  font-family: var(--font-secondary);
  font-size: 0.8rem;
  color: #888;
  font-style: italic;
  margin: 0 0.2rem;
}

.author-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.author-avatar {
  width: 20px;
  height: 20px;
  border-radius: 50%;
}

.author-name {
  font-weight: 700;
  font-size: 0.95rem;
  border-bottom: 2px solid #ccc;
  transition: border-color 0.3s;
}

.project-card:hover .author-name {
  border-color: var(--color-text);
}

.pro-badge {
  font-size: 0.55rem;
  font-weight: 700;
  border: 1px solid #ccc;
  padding: 1px 4px;
  border-radius: 3px;
  color: #666;
}
</style>
