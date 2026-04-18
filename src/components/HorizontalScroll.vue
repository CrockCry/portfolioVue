<template>
  <section class="horizontal-section" ref="sectionRef">
    <div class="h-scroll-container" ref="containerRef">
      <!-- Mudar de direção (scroll horizontal) -->
      <div class="h-scroll-content" ref="contentRef">
        
        <div class="h-slide interactive" v-for="i in 5" :key="i">
          <div class="media-placeholder" data-type="image">
            <span>Galeria Img {{ i }}</span>
          </div>
          <p class="slide-caption">Projeto de Destaque {{ i }}</p>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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

.media-placeholder {
  width: 100%;
  aspect-ratio: 16/9;
  background-color: #333;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  font-family: var(--font-primary);
  font-size: 2rem;
  color: #888;
  transition: transform var(--transition);
}

.h-slide:hover .media-placeholder {
  transform: scale(0.98);
}

.slide-caption {
  font-family: var(--font-secondary);
  font-size: 1.2rem;
  opacity: 0.8;
}
</style>
