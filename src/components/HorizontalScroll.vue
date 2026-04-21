<template>
  <section class="horizontal-section" ref="sectionRef">
    <div class="h-scroll-container" ref="containerRef">
      <!-- Mudar de direção (scroll horizontal) -->
      <div class="h-scroll-content" ref="contentRef">
        
        <router-link 
          v-for="project in displayedProjects" 
          :key="project.id" 
          :to="`/project/${project.id}`"
          class="h-slide interactive"
        >
          <div class="media-placeholder">
            <img :src="project.image" :alt="project.title">
          </div>
          <div class="slide-info">
            <p class="slide-category">{{ project.category[locale] }}</p>
            <h3 class="slide-title">{{ project.title }}</h3>
          </div>
        </router-link>

      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { projects } from '../data/projects';
import { useI18n } from '../i18n';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const { locale } = useI18n();

// Shuffle projects for randomized display
const displayedProjects = ref([...projects].sort(() => Math.random() - 0.5));

gsap.registerPlugin(ScrollTrigger);

const sectionRef = ref(null);
const containerRef = ref(null);
const contentRef = ref(null);

onMounted(() => {
  const contentWidth = contentRef.value.scrollWidth;
  const containerWidth = window.innerWidth;

  const moveAmount = contentWidth - containerWidth + 100; 

  gsap.to(contentRef.value, {
    x: -moveAmount,
    ease: "none",
    scrollTrigger: {
      trigger: sectionRef.value,
      start: "top top",
      end: () => `+=${moveAmount}`,
      pin: true,
      scrub: 1, 
      invalidateOnRefresh: true
    }
  });
});
</script>

<style scoped>
.horizontal-section {
  width: 100%;
  overflow: hidden;
  background-color: #111; 
  color: white;
}

.h-scroll-container {
  height: 100vh;
  display: flex;
  align-items: center;
  padding-left: 4vw; 
}

.h-scroll-content {
  display: flex;
  gap: 4rem;
  padding-right: 4vw;
}

.h-slide {
  width: 60vw;
  min-width: 400px;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.item-link, .h-slide {
  text-decoration: none;
  color: inherit;
}

.media-placeholder {
  width: 100%;
  aspect-ratio: 16/9;
  background-color: #333;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  overflow: hidden;
  transition: transform var(--transition);
}

.media-placeholder img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.h-slide:hover .media-placeholder {
  transform: scale(0.98);
}

.slide-info {
  margin-top: 1rem;
}

.slide-category {
  font-family: var(--font-secondary);
  font-size: 0.8rem;
  text-transform: uppercase;
  opacity: 0.5;
  margin-bottom: 0.5rem;
}

.slide-title {
  font-family: var(--font-primary);
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: -0.5px;
}
</style>
