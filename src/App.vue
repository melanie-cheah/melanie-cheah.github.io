<script setup>
import { RouterLink, RouterView } from 'vue-router'

const tabs = [
  { to: '/', label: 'Home' },
  { to: '/experience', label: 'Experience' },
  { to: '/projects', label: 'Projects' },
  { to: '/skills', label: 'Skills' },
  { to: '/contact', label: 'Contact' },
]

const year = new Date().getFullYear()
</script>

<template>
  <div class="shell">
    <header class="bar">
      <div class="bar-inner">
        <RouterLink to="/" class="brand">Melanie Cheah</RouterLink>
        <nav aria-label="Main">
          <RouterLink
            v-for="tab in tabs"
            :key="tab.to"
            :to="tab.to"
            class="tab"
          >
            {{ tab.label }}
          </RouterLink>
        </nav>
      </div>
    </header>

    <main class="page">
      <RouterView />
    </main>

    <footer class="foot">
      <div class="foot-inner">
        <span>&copy; {{ year }} Melanie Cheah</span>
        <span>Built with Vue 3 and Vite</span>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.shell {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.bar {
  position: sticky;
  top: 0;
  z-index: 10;
  background: var(--paper);
  border-bottom: 1px solid var(--rule);
}

.bar-inner {
  max-width: var(--width);
  margin: 0 auto;
  padding: 16px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}

.brand {
  font-family: var(--serif);
  font-weight: 600;
  font-size: 1.25rem;
  text-decoration: none;
  color: var(--ink);
}

nav {
  display: flex;
  gap: 28px;
}

.tab {
  color: var(--muted);
  text-decoration: none;
  font-weight: 500;
  font-size: 0.95rem;
  padding: 6px 0;
  border-bottom: 2px solid transparent;
}

.tab:hover { color: var(--ink); }

.tab[aria-current='page'] {
  color: var(--ink);
  border-bottom-color: var(--teal);
}

.page {
  flex: 1;
  width: 100%;
  max-width: var(--width);
  margin: 0 auto;
  padding: 72px 24px 96px;
}

.foot {
  border-top: 1px solid var(--rule);
  color: var(--muted);
  font-size: 0.875rem;
}

.foot-inner {
  max-width: var(--width);
  margin: 0 auto;
  padding: 20px 24px;
  display: flex;
  justify-content: space-between;
  gap: 16px;
}

@media (max-width: 700px) {
  .bar-inner {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    padding-bottom: 8px;
  }
  nav {
    gap: 20px;
    overflow-x: auto;
    width: 100%;
  }
  .page { padding: 48px 20px 72px; }
  .foot-inner { flex-direction: column; gap: 4px; }
}
</style>
