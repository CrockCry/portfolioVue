<template>
  <router-link to="/contact" class="floating-contact interactive" ref="floatingBtn">
    <div class="bubble">
      <span class="text">HI!</span>
      <div class="pulse"></div>
    </div>
  </router-link>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import gsap from 'gsap';

const floatingBtn = ref(null);

onMounted(() => {
  gsap.fromTo(floatingBtn.value, 
    { y: 100, opacity: 0 },
    { y: 0, opacity: 1, duration: 1, ease: 'power4.out', delay: 2 }
  );
});
</script>

<style scoped>
.floating-contact {
  position: fixed;
  bottom: 40px;
  right: 40px;
  z-index: 1000;
  text-decoration: none;
}

.bubble {
  width: 60px;
  height: 60px;
  background-color: var(--color-text);
  color: var(--color-bg);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  font-size: 0.8rem;
  position: relative;
  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.text {
  position: relative;
  z-index: 2;
}

.floating-contact:hover .bubble {
  transform: scale(1.1);
  background-color: #007e9e;
}

.pulse {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--color-text);
  border-radius: 50%;
  z-index: 1;
  opacity: 0.5;
  animation: pulse-ring 2s infinite;
}

@keyframes pulse-ring {
  0% { transform: scale(1); opacity: 0.5; }
  100% { transform: scale(1.6); opacity: 0; }
}

@media (max-width: 768px) {
  .floating-contact {
    bottom: 20px;
    right: 20px;
  }
}
</style>
