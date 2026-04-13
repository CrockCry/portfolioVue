<template>
  <section class="marquee-section">
    <div class="marquee-container" ref="marqueeRef">
      <div class="marquee-track">
        <h1 class="marquee-text">AWESOME DESIGN • INTERACTIVE • NEXT STAGE PORTIFOLIO • </h1>
        <h1 class="marquee-text">AWESOME DESIGN • INTERACTIVE • NEXT STAGE PORTIFOLIO • </h1>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import gsap from 'gsap';

const marqueeRef = ref(null);

onMounted(() => {
  // Animação infinita do letreiro
  const track = document.querySelector('.marquee-track');
  
  gsap.to(track, {
    xPercent: -50,
    ease: "none",
    duration: 15,
    repeat: -1
  });
});
</script>

<style scoped>
.marquee-section {
  padding: 100px 0;
  overflow: hidden;
  background-color: var(--color-bg);
  border-top: 1px solid rgba(0,0,0,0.1);
  border-bottom: 1px solid rgba(0,0,0,0.1);
}

.marquee-container {
  width: 100%;
  white-space: nowrap;
}

.marquee-track {
  display: inline-flex;
}

.marquee-text {
  font-family: var(--font-primary);
  font-size: clamp(5rem, 12vw, 15rem);
  font-weight: 800;
  color: transparent;
  -webkit-text-stroke: 1px var(--color-text);
  line-height: 1;
  padding-right: 2rem;
}
</style>
