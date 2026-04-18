<template>
  <div class="preloader" ref="preloaderRef">
    <div class="preloader-bg"></div>
    <div class="video-container">
      <video 
        ref="videoRef"
        src="../assets/preloadBackground.mp4" 
        autoplay 
        muted 
        playsinline
        @ended="onVideoEnded"
      ></video>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import gsap from 'gsap';

const emit = defineEmits(['complete']);
const preloaderRef = ref(null);
const videoRef = ref(null);

onMounted(() => {
  document.body.style.overflow = 'hidden';
  
  setTimeout(() => {
    if (preloaderRef.value && preloaderRef.value.style.display !== 'none') {
      onVideoEnded();
    }
  }, 5000); 
});

const onVideoEnded = () => {
  const tl = gsap.timeline({
    onComplete: () => {
      document.body.style.overflow = '';
      emit('complete');
    }
  });

  tl.to(videoRef.value, { opacity: 0, duration: 0.4, ease: 'power2.inOut' })
    .to(preloaderRef.value, { yPercent: -100, duration: 1.2, ease: 'power4.inOut' }, '+=0.1');
};
</script>

<style scoped>
.preloader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: all;
  background-color: var(--color-bg); 
}

.preloader-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #EAE8E3; 
  z-index: -1;
}

.video-container {
  width: 100%;
  max-width: 100%; 
  aspect-ratio: 16/9;
  display: flex;
  justify-content: center;
  align-items: center;
}

.video-container video {
  width: 100%;
  height: 100%;
  object-fit: contain; 
}
</style>
