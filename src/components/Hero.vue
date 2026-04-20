<template>
  <section class="hero">
    <div class="hero-inner">
      

      <div class="hero-meta reveal-text">
        <span class="reveal-inner">
          <span class="meta-label">Site of the Day</span>
          <span class="meta-date">Apr 17, 2026</span>
        </span>
      </div>


      <div class="hero-content">
        <h1 class="hero-title reveal-text" ref="titleRef">
          <span class="reveal-inner">BOOK SHOP</span>
        </h1>
      </div>


      <div class="hero-authors reveal-text">
        <div class="reveal-inner authors-list">
          <div class="author">
            <div class="author-avatar" style="background:#333;"></div>
            <span>Pedro Vischi <span class="badge">Developer</span></span>
          </div>
        </div>
      </div>

      <div class="hero-media interactive" ref="mediaRef">
        <div class="media-placeholder" data-type="video/image">
          <img src="../assets/bookShop.png" alt="Hero Image">
        </div>
      </div>
      
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import gsap from 'gsap';

const titleRef = ref(null);
const mediaRef = ref(null);

onMounted(() => {
  const tl = gsap.timeline();
  

  const innerTexts = document.querySelectorAll('.hero-inner .reveal-inner');
  
  tl.fromTo(innerTexts, 
    { y: '120%' },
    { y: '0%', duration: 1.2, stagger: 0.1, ease: 'power4.out', delay: 0.2 }
  );


  tl.fromTo(mediaRef.value,
    { scale: 0.95, opacity: 0, y: 30 },
    { scale: 1, opacity: 1, y: 0, duration: 1.5, ease: 'power3.out' },
    '-=0.8'
  );
});
</script>

<style scoped>
.hero {
  width: 100%;
  min-height: 100vh;
  padding-top: 140px; /* offset for header */
  padding-bottom: 60px;
  background-color: var(--color-bg);
}

.hero-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100%;
}

/* Meta info */
.hero-meta {
  font-family: var(--font-secondary);
  font-size: 0.85rem;
  margin-bottom: 2rem;
  color: var(--color-text);
  opacity: 0.8;
}

.hero-meta span span {
  margin: 0 0.5rem;
}

.meta-date {
  border: 1px solid rgba(0,0,0,0.2);
  padding: 0.2rem 0.6rem;
  border-radius: 4px;
}

/* Title */
.hero-title {
  font-family: var(--font-primary);
  font-size: clamp(2.5rem, 7vw, 7rem);
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: -2px;
  line-height: 1;
  margin-bottom: 2rem;
  color: var(--color-text);
  max-width: 95vw;
}

/* Authors */
.hero-authors {
  margin-bottom: 4rem;
}

.authors-list {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
}

.author {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-secondary);
  font-size: 1rem;
  font-weight: 500;
  color: var(--color-text);
  cursor: pointer;
  padding-bottom: 2px;
  border-bottom: 1px solid transparent;
  transition: border-bottom 0.3s;
}

.author:hover {
  border-bottom: 1px solid var(--color-text);
}

.author-avatar {
  width: 24px;
  height: 24px;
  border-radius: 50%;
}

.badge {
  font-size: 0.6rem;
  border: 1px solid var(--color-text);
  padding: 1px 4px;
  border-radius: 3px;
  margin-left: 4px;
}

/* Massive Media Placeholder */
.hero-media {
  width: 92%;
  max-width: 1600px;
  height: 75vh;
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  cursor: none; /* Custom cursor */
  box-shadow: 0 20px 40px rgba(0,0,0,0.1);
}

.media-placeholder {
  width: 100%;
  height: 100%;
  background: #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
}

.media-placeholder img,
.media-placeholder video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
