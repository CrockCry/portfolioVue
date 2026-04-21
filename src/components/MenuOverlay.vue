<template>
  <div class="menu-overlay" :class="{ 'is-open': isOpen }">
    <div class="menu-background"></div>
    <div class="container menu-inner">
      <nav class="menu-nav">
        <ul>
          <li class="menu-item">
            <div class="reveal-text">
              <router-link to="/" class="reveal-inner menu-link interactive" @click="closeMenu">{{ t('menu.home') }}</router-link>
            </div>
          </li>
          <li class="menu-item">
            <div class="reveal-text">
              <router-link to="/directory" class="reveal-inner menu-link interactive" @click="closeMenu">{{ t('menu.projects') }}</router-link>
            </div>
          </li>
          <li class="menu-item">
            <div class="reveal-text">
              <router-link to="/studio" class="reveal-inner menu-link interactive" @click="closeMenu">{{ t('menu.studio') }}</router-link>
            </div>
          </li>
          <li class="menu-item">
            <div class="reveal-text">
              <router-link to="/contact" class="reveal-inner menu-link interactive" @click="closeMenu">{{ t('menu.contact') }}</router-link>
            </div>
          </li>
        </ul>
      </nav>
      <div class="menu-footer">
        <div class="reveal-text">
          <div class="reveal-inner menu-footer-content">
            <p>{{ t('menu.ready') }}</p>
            <router-link to="mailto:pedrovischisoares@gmail.com" class="interactive">pedrovischisoares@gmail.com</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { watch, nextTick } from 'vue';
import { useI18n } from '../i18n';
import gsap from 'gsap';

const props = defineProps({
  isOpen: Boolean
});

const emit = defineEmits(['close']);
const { t } = useI18n();

const closeMenu = () => {
  emit('close');
};

watch(() => props.isOpen, async (newVal) => {
  if (newVal) {
    document.body.style.overflow = 'hidden'; 
    
    await nextTick();
    
    const tl = gsap.timeline();
    tl.to('.menu-overlay', { duration: 0, display: 'block' })
      .to('.menu-background', { y: '0%', duration: 0.8, ease: 'power4.inOut' })
      .fromTo('.menu-link', 
        { y: '120%' }, 
        { y: '0%', duration: 0.8, stagger: 0.1, ease: 'power3.out' },
        '-=0.3'
      )
      .fromTo('.menu-footer-content',
        { y: '120%' },
        { y: '0%', duration: 0.6, ease: 'power3.out' },
        '<0.2'
      );
  } else {
    document.body.style.overflow = '';
    
    const tl = gsap.timeline();
    tl.to('.menu-link, .menu-footer-content', { 
        y: '-120%', 
        duration: 0.4, 
        stagger: 0.05, 
        ease: 'power2.in' 
      })
      .to('.menu-background', { y: '-100%', duration: 0.7, ease: 'power4.inOut' }, '-=0.2')
      .set('.menu-link, .menu-footer-content', { y: '120%' }) 
      .set('.menu-background', { y: '100%' }) 
      .to('.menu-overlay', { duration: 0, display: 'none' });
  }
}, { immediate: false });

</script>

<style scoped>
.menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 90;
  display: none;
  pointer-events: none;
}

.menu-overlay.is-open {
  pointer-events: all;
}

.menu-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--color-accent);
  color: var(--color-white);
  transform: translateY(100%);
  will-change: transform;
}

.menu-inner {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: 100px;
  color: var(--color-white);
}

.menu-nav ul {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.menu-link {
  font-family: var(--font-primary);
  font-size: clamp(4rem, 8vw, 8rem);
  font-weight: 700;
  text-transform: uppercase;
  line-height: 0.9;
  display: inline-block;
  color: var(--color-white);
  transition: color 0.3s;
}

.menu-link:hover {
  -webkit-text-stroke: 1px var(--color-white);
  color: transparent;
}

.menu-footer {
  margin-top: auto;
  padding-bottom: 4rem;
  font-family: var(--font-secondary);
  font-size: 1.2rem;
}

.menu-footer a {
  text-decoration: underline;
  margin-top: 0.5rem;
  display: inline-block;
}
</style>
