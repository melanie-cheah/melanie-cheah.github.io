<script setup>
import { ref, onMounted } from 'vue'
import { journey, education } from '../content.js'

const journeyEl = ref(null)
const drawn = ref(false)

onMounted(() => {
  if (!('IntersectionObserver' in window)) {
    drawn.value = true
    return
  }
  const io = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        drawn.value = true
        io.disconnect()
      }
    },
    { threshold: 0.25 }
  )
  io.observe(journeyEl.value)
})
</script>

<template>
  <div>
    <h1 class="title">Experience</h1>
    <p class="intro">From intern to infrastructure and DevOps engineer, one stage at a time.</p>

    <ol ref="journeyEl" class="journey" :class="{ drawn }">
      <li
        v-for="(step, i) in journey"
        :key="step.role"
        :class="{ current: step.current }"
        :style="{ '--i': i }"
      >
        <span class="years">{{ step.years }}</span>
        <div>
          <h3>{{ step.role }}</h3>
          <p class="where">{{ step.org }}</p>
          <p>{{ step.text }}</p>
        </div>
      </li>
    </ol>

    <section class="block">
      <h2>Education</h2>
      <p class="edu">{{ education }}</p>
    </section>
  </div>
</template>

<style scoped>
.journey {
  position: relative;
  list-style: none;
  margin: 0;
  padding: 0 0 0 32px;
}

.journey::before,
.journey::after {
  content: '';
  position: absolute;
  left: 5px;
  top: 12px;
  bottom: 12px;
  width: 2px;
}

.journey::before { background: var(--rule); }

.journey::after {
  background: var(--teal);
  transform: scaleY(0);
  transform-origin: top;
  transition: transform 1.4s ease-out;
}

.journey.drawn::after { transform: scaleY(1); }

.journey li {
  position: relative;
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: 0 24px;
  padding-bottom: 36px;
}

.journey li:last-child { padding-bottom: 0; }

.journey li::before {
  content: '';
  position: absolute;
  left: -32px;
  top: 7px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--paper);
  border: 2px solid var(--rule);
  transition: border-color 0.4s ease, background-color 0.4s ease;
  transition-delay: calc(var(--i) * 0.35s);
}

.journey.drawn li::before { border-color: var(--teal); }
.journey.drawn li.current::before { background: var(--teal); }

.years {
  color: var(--muted);
  font-size: 0.9rem;
  padding-top: 3px;
  font-variant-numeric: tabular-nums;
}

.journey li.current .years { color: var(--teal-text); font-weight: 600; }

.where { color: var(--muted); font-size: 0.95rem; margin: 2px 0 6px; }

.block { margin-top: 72px; }

.edu { color: var(--muted); max-width: 36em; }

@media (max-width: 640px) {
  .journey li { grid-template-columns: 1fr; }
}

@media (prefers-reduced-motion: reduce) {
  .journey::after,
  .journey li::before { transition: none; }
}
</style>
