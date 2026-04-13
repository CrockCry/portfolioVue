<template>
  <footer class="footer">
    <ParticleCanvas :targetShape="currentShape" />
    <div class="container footer-inner">
      <div class="footer-top">
        <p>Gostou do que viu?<br>Vamos construir algo incrível.</p>
        <button 
          class="contact-btn interactive magnetic-btn" 
          ref="btnRef"
          @mouseenter="currentShape = 'CHECK'"
          @mouseleave="currentShape = ''"
        >
          <span class="btn-text">Começar Projeto</span>
        </button>
      </div>
      
      <div class="footer-middle">
        <h1 class="footer-heading">NEXT STAGE</h1>
      </div>
      
      <div class="footer-bottom">
        <p>&copy; 2026 Next Stage. Todos os direitos reservados.</p>
        <div class="social-links">
          <a href="#" class="interactive">Instagram</a>
          <a href="#" class="interactive">Github</a>
          <a href="#" class="interactive">Whatsapp</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import gsap from 'gsap';
import ParticleCanvas from './ParticleCanvas.vue';

const btnRef = ref(null);
const currentShape = ref('');

onMounted(() => {
  // Magnetic Button Effect
  const btn = btnRef.value;
  const text = btn.querySelector('.btn-text');

  const onMouseMove = (e) => {
    const rect = btn.getBoundingClientRect();
    const h = rect.width / 2;
    
    // Calcula distância da borda
    const x = e.clientX - rect.left - h;
    const y = e.clientY - rect.top - h;

    gsap.to(btn, {
      x: x * 0.4,
      y: y * 0.4,
      duration: 0.4,
      ease: 'power3.out'
    });
    
    gsap.to(text, {
      x: x * 0.2,
      y: y * 0.2,
      duration: 0.4,
      ease: 'power3.out'
    });
  };

  const onMouseLeave = () => {
    gsap.to(btn, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.3)' });
    gsap.to(text, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.3)' });
  };

  btn.addEventListener('mousemove', onMouseMove);
  btn.addEventListener('mouseleave', onMouseLeave);

  onUnmounted(() => {
    btn.removeEventListener('mousemove', onMouseMove);
    btn.removeEventListener('mouseleave', onMouseLeave);
  });
});
</script>

<style scoped>
.footer {
  background-color: var(--color-accent);
  color: var(--color-white);
  padding-top: 100px;
  overflow: hidden;
  position: relative; /* Base para o canvas absoluto */
}

.footer-inner {
  position: relative;
  z-index: 2; /* Fica por cima das partículas */
  pointer-events: none; /* Deixa o mouse chegar nos botões/links mas ignora o container vazio */
}

.footer-inner > * {
  pointer-events: all; /* Ativa eventos nos botões e links */
}

.footer-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8rem;
}

.footer-top p {
  font-size: 2rem;
  line-height: 1.2;
}

.contact-btn {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background-color: var(--color-white);
  color: var(--color-accent);
  border: none;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
}

.footer-middle {
  text-align: center;
  margin-bottom: 2rem;
  margin-top: 5rem; /* Reduzi um pouco para não descer demais */
}

.footer-heading {
  font-size: clamp(5rem, 15vw, 20rem);
  line-height: 0.75;
  letter-spacing: -3px;
  margin: 0;
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 0;
  border-top: 1px solid rgba(255,255,255,0.2);
  font-size: 0.9rem;
}

.social-links {
  display: flex;
  gap: 2rem;
}

.social-links a {
  text-transform: uppercase;
  position: relative;
}

.social-links a::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 1px;
  background-color: var(--color-white);
  transform: translateX(-101%);
  transition: transform 0.4s ease;
}

.social-links a:hover::after {
  transform: translateX(0);
}
</style>
