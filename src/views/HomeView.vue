<template>
  <main>
    <Hero />
    <ProjectGrid />
    <MarqueeSection />
    <HorizontalScroll />
  </main>
</template>

<script setup>
import Hero from '../components/Hero.vue'
import ProjectGrid from '../components/ProjectGrid.vue'
import MarqueeSection from '../components/MarqueeSection.vue'
import HorizontalScroll from '../components/HorizontalScroll.vue'
</script>

<style scoped>
main {
  width: 100%;
  min-height: 100vh;
}
</style>
