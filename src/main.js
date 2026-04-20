import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import Lenis from '@studio-freight/lenis'

// Initialize Vue App
const app = createApp(App)

// Initialize Smooth Scroll (Lenis)
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  direction: 'vertical',
  gestureDirection: 'vertical',
  smooth: true,
  mouseMultiplier: 1,
  smoothTouch: false,
  touchMultiplier: 2,
  infinite: false,
})

// Update router scroll behavior to interact with Lenis if needed
router.afterEach(() => {
  lenis.scrollTo(0, { immediate: true })
})

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}

requestAnimationFrame(raf)

// Provide lenis instance to the app globally
app.provide('lenis', lenis)

app.use(router)
app.mount('#app')
