<template>
  <div class="directory-view">
    <header class="directory-header container">
      <div class="header-content reveal-text">
        <h1 class="reveal-inner">{{ t('directory.title') }}</h1>
        <p class="reveal-inner">{{ t('directory.subtitle') }}</p>
      </div>
    </header>

    <div class="directory-grid container">
      <div v-for="project in projects" :key="project.id" class="directory-item reveal-text">
        <router-link :to="`/project/${project.id}`" class="item-link">
          <div class="item-meta">
            <span class="item-date">{{ project.date }}</span>
            <span class="item-category">{{ project.category[locale] }}</span>
          </div>
          <div class="item-main">
            <h2 class="item-title">{{ project.title }}</h2>
            <div class="item-image-wrapper">
              <img :src="project.image" :alt="project.title">
            </div>
          </div>
          <div class="item-footer">
            <span class="item-author">By {{ project.author }}</span>
            <span class="item-label">{{ t(project.label) }}</span>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { projects } from '../data/projects';
import { useI18n } from '../i18n';
import gsap from 'gsap';

const { t, locale } = useI18n();

onMounted(() => {
  const tl = gsap.timeline();
  
  const innerTexts = document.querySelectorAll('.reveal-inner');
  const items = document.querySelectorAll('.directory-item');

  tl.fromTo(innerTexts, 
    { y: '120%' },
    { y: '0%', duration: 1.2, stagger: 0.1, ease: 'power4.out', delay: 0.2 }
  );

  tl.fromTo(items,
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: 'power3.out' },
    '-=0.8'
  );
});
</script>

<style scoped>
.directory-view {
  padding-top: 160px;
  padding-bottom: 120px;
  background-color: var(--color-bg);
  min-height: 100vh;
}

.directory-header {
  margin-bottom: 80px;
}

.directory-header h1 {
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: 800;
  letter-spacing: -3px;
  line-height: 0.9;
  margin-bottom: 1.5rem;
  text-transform: uppercase;
}

.directory-header p {
  font-size: 1.2rem;
  opacity: 0.6;
  max-width: 600px;
}

.directory-grid {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.directory-item {
  border-top: 1px solid rgba(0,0,0,0.1);
  padding-top: 2rem;
}

.item-link {
  display: block;
  text-decoration: none;
  color: inherit;
}

.item-meta {
  display: flex;
  justify-content: space-between;
  font-family: var(--font-secondary);
  font-size: 0.8rem;
  text-transform: uppercase;
  margin-bottom: 1.5rem;
  opacity: 0.5;
}

.item-main {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 1.5rem;
}

.item-title {
  font-size: clamp(2rem, 5vw, 4rem);
  font-weight: 700;
  letter-spacing: -1px;
  transition: transform 0.4s cubic-bezier(0.23, 1, 0.32, 1);
}

.item-image-wrapper {
  width: 15vw;
  min-width: 150px;
  aspect-ratio: 16/9;
  overflow: hidden;
  border-radius: 4px;
  opacity: 0;
  transform: translateX(20px) rotate(5deg);
  transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
}

.item-image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item-link:hover .item-image-wrapper {
  opacity: 1;
  transform: translateX(0) rotate(0deg);
}

.item-link:hover .item-title {
  transform: translateX(20px);
}

.item-footer {
  display: flex;
  justify-content: space-between;
  font-family: var(--font-secondary);
  font-size: 0.9rem;
  opacity: 0.6;
}

@media (max-width: 768px) {
  .item-main {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  .item-image-wrapper {
    width: 100%;
    opacity: 1;
    transform: none;
  }
}
</style>
