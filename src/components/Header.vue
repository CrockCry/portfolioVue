<template>
  <header class="header">
    <div class="container header-inner">
      <div class="logo">
        <router-link to="/">N.S</router-link>
      </div>
      <nav class="nav">
        <ul>
          <li><router-link to="/" class="interactive">{{ t('nav.home') }}</router-link></li>
          <li><router-link to="/projects" class="interactive">{{ t('nav.projects') }}</router-link></li>
          <li><router-link to="/contact" class="interactive">{{ t('nav.contact') }}</router-link></li>
        </ul>
      </nav>
      <div class="header-actions">
        <div class="lang-switch">
          <button 
            class="lang-btn" 
            :class="{ active: locale === 'pt-br' }" 
            @click="setLocale('pt-br')"
          >PT</button>
          <span class="lang-divider">|</span>
          <button 
            class="lang-btn" 
            :class="{ active: locale === 'en' }" 
            @click="setLocale('en')"
          >EN</button>
        </div>
        
        <button class="menu-btn interactive" @click="$emit('open-menu')">{{ t('nav.menu') }} <span class="hamburger"></span></button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { useI18n } from '../i18n';

defineEmits(['open-menu']);
const { t, locale, setLocale } = useI18n();
</script>

<style scoped>
.header {
  position: absolute; 
  top: 0;
  left: 0;
  width: 100%;
  padding: 2rem 0;
  z-index: 100;
  color: var(--color-text);
}

.header-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo a {
  font-family: var(--font-primary);
  font-size: 1.5rem;
  font-weight: 800;
  letter-spacing: -1px;
}

.nav ul {
  display: flex;
  gap: 2rem;
  margin-left: 100px;
}

.nav a {
  font-size: 0.85rem;
  font-weight: 500;
  letter-spacing: 0px;
  position: relative;
  overflow: hidden;
  text-transform: none; 
}

.nav a::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 1px;
  background-color: currentColor;
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.nav a:hover::after {
  transform: scaleX(1);
  transform-origin: left;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.lang-switch {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-secondary);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 1px;
}

.lang-btn {
  background: none;
  border: none;
  padding: 0;
  color: inherit;
  opacity: 0.4;
  cursor: pointer;
  transition: opacity 0.3s ease;
}

.lang-btn.active {
  opacity: 1;
}

.lang-btn:hover {
  opacity: 0.8;
}

.lang-divider {
  opacity: 0.2;
}

.menu-btn {
  background: none;
  border: none;
  color: inherit;
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: uppercase;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
}
</style>
