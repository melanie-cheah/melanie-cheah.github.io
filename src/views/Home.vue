<script setup>
import { RouterLink } from 'vue-router'
import { focus } from '../content.js'
</script>

<template>
  <div>
    <section class="hero">
      <h1>Melanie Cheah</h1>
      <p class="lede">I turn slow, manual engineering work into automation that teams can rely on.</p>
      <p class="role">Software engineer working on infrastructure, data platforms and agentic AI tooling.</p>
      <p class="next">
        <RouterLink to="/experience">See my experience</RouterLink>
        <RouterLink to="/projects">Browse projects</RouterLink>
        <RouterLink to="/ask">Ask my assistant</RouterLink>
      </p>
    </section>

    <section class="block">
      <h2>What I focus on</h2>
      <div class="focus">
        <div v-for="item in focus" :key="item.title">
          <h3>{{ item.title }}</h3>
          <p>{{ item.text }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.hero { margin-bottom: 88px; }

h1 {
  font-family: var(--serif);
  font-weight: 500;
  font-size: clamp(3rem, 9vw, 5.5rem);
  line-height: 1;
  letter-spacing: -0.02em;
  margin: 0 0 28px;
}

.lede {
  font-family: var(--serif);
  font-size: clamp(1.4rem, 3.2vw, 1.85rem);
  line-height: 1.3;
  max-width: 24em;
  margin: 0 0 16px;
}

.role {
  color: var(--muted);
  max-width: 34em;
}

.next {
  display: flex;
  gap: 28px;
  margin-top: 28px;
  font-weight: 500;
}

.focus {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
}

.focus h3 {
  padding-top: 14px;
  border-top: 2px solid var(--teal);
  margin-bottom: 6px;
}

.focus p { color: var(--muted); font-size: 0.97rem; }

@media (max-width: 640px) {
  .hero { margin-bottom: 64px; }
  .focus { grid-template-columns: 1fr; gap: 28px; }
}
</style>
