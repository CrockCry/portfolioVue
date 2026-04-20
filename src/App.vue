<template>
  <Preloader @complete="onPreloaderComplete" />
  
  <div class="custom-cursor" ref="cursor"></div>
  
  <MenuOverlay :isOpen="isMenuOpen" @close="isMenuOpen = false" />
  
  <AppHeader @open-menu="isMenuOpen = true" />
  
  <router-view v-slot="{ Component }">
    <transition name="page-fade" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>

  <AppFooter />
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import gsap from 'gsap';
import AppHeader from './components/Header.vue';
import AppFooter from './components/Footer.vue';
import MenuOverlay from './components/MenuOverlay.vue';
import Preloader from './components/Preloader.vue';

const cursor = ref(null);
const isMenuOpen = ref(false);
const isLoaded = ref(false);

const onPreloaderComplete = () => {
  isLoaded.value = true;
  // Lenis may need a resize trigger logic if locked, but removing overflow:hidden in Preloader handles most layout shifts
};

onMounted(() => {
  // Custom Cursor Logic
  const onMouseMove = (e) => {
    gsap.to(cursor.value, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.1,
      ease: "power2.out"
    });
  };

  const onMouseEnterInteractive = () => {
    cursor.value.classList.add('active');
  };

  const onMouseLeaveInteractive = () => {
    cursor.value.classList.remove('active');
  };

  window.addEventListener('mousemove', onMouseMove);

  // Use event delegation for dynamic interactive elements
  const onMouseOverDelegated = (e) => {
    if (e.target.closest('.interactive, a, button')) {
      onMouseEnterInteractive();
    }
  };
  
  const onMouseOutDelegated = (e) => {
    if (e.target.closest('.interactive, a, button')) {
      onMouseLeaveInteractive();
    }
  };

  window.addEventListener('mouseover', onMouseOverDelegated);
  window.addEventListener('mouseout', onMouseOutDelegated);

  onUnmounted(() => {
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('mouseover', onMouseOverDelegated);
    window.removeEventListener('mouseout', onMouseOutDelegated);
  });
});
</script>

<style scoped>
main {
  width: 100%;
  min-height: 100vh;
}
</style>
