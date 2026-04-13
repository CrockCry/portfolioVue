<template>
  <header class="header">
    <div class="container header-inner">
      <div class="logo">
        <a href="/">N.S</a>
      </div>
      <nav class="nav">
        <ul>
          <li><a href="#" class="interactive">Explore</a></li>
          <li><a href="#" class="interactive">Directory</a></li>
          <li><a href="#" class="interactive">Academy</a></li>
          <li><a href="#" class="interactive">Conferences</a></li>
        </ul>
      </nav>
      <div class="header-actions">
        <!-- Emitting open-menu to App.vue -->
        <button class="menu-btn interactive" @click="$emit('open-menu')">Menu <span class="hamburger"></span></button>
      </div>
    </div>
  </header>
</template>

<script setup>
defineEmits(['open-menu']);
</script>

<style scoped>
.header {
  position: absolute; /* Using absolute so it sits on top but without difference blend if requested, or keep fixed but clean */
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
}

.nav a {
  font-size: 0.85rem;
  font-weight: 500;
  letter-spacing: 0px;
  position: relative;
  overflow: hidden;
  text-transform: none; /* Awwwards text is 'Explore v' not uppercase */
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
