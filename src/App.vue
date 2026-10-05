<script setup>
import { ref, onMounted } from 'vue'

// Replace the LinkedIn handle before you publish.
const links = {
  linkedin: 'https://www.linkedin.com/in/tze-ying-melanie-cheah-163572183',
  github: 'https://github.com/melanie-cheah',
}

const work = [
  {
    title: 'Automating a manual renewal',
    text: 'Spotted a certificate renewal process that took over three hours by hand, proposed automating it to the team, and cut it to twenty minutes.',
  },
  {
    title: 'Tools for AI agents',
    text: 'Built the MCP server that gives an internal AI agent its tools and skills. The team shipped it to production on top of existing infrastructure.',
  },
  {
    title: 'Dashboards for decisions',
    text: 'Turn raw engineering data into dashboards people act on, including a new dashboard to replace a legacy tool that was being retired.',
  },
]

const journey = [
  {
    years: '2020 to 2021',
    role: 'IT Intern',
    org: 'Zebra Technologies',
    text: 'Onboarded fully remote during lockdown and built C# tooling for the QA test cycle.',
  },
  {
    years: '2021 to 2022',
    role: 'Graduate Trainee',
    org: 'Intel',
    text: 'Learned Splunk from scratch and built dashboards for internal customers.',
  },
  {
    years: '2022 to 2025',
    role: 'EDA Tools Software Engineer',
    org: 'Intel',
    text: 'Key developer on a Python and Perl design data management platform. Learned test-driven development.',
  },
  {
    years: '2025 to now',
    role: 'Infrastructure and DevOps Engineer',
    org: 'Intel',
    text: 'Platform administration, automation, dashboards and agentic AI tooling.',
    current: true,
  },
]

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
  <main class="page">
    <header class="hero">
      <h1>Melanie Cheah</h1>
      <p class="lede">I turn slow, manual engineering work into automation that teams can rely on.</p>
      <p class="role">Software engineer working on infrastructure, data platforms and agentic AI tooling.</p>
      <nav class="links" aria-label="Profiles">
        <a :href="links.linkedin">LinkedIn</a>
        <a :href="links.github">GitHub</a>
      </nav>
    </header>

    <section aria-labelledby="work-h">
      <h2 id="work-h">Selected work</h2>
      <div class="work-list">
        <article v-for="item in work" :key="item.title" class="work">
          <h3>{{ item.title }}</h3>
          <p>{{ item.text }}</p>
        </article>
      </div>
    </section>

    <section aria-labelledby="journey-h">
      <h2 id="journey-h">Journey</h2>
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
    </section>

    <section aria-labelledby="skills-h">
      <h2 id="skills-h">Skills</h2>
      <div class="skills">
        <div>
          <h3>Day to day</h3>
          <p>Python, Perl, Splunk (SPL), Jenkins, Git, Linux, JavaScript</p>
        </div>
        <div>
          <h3>Growing into</h3>
          <p>Docker, Kubernetes, Azure, Vue</p>
        </div>
      </div>
    </section>

    <footer>
      BSc (Hons) Computer Science, First Class Honours. INTI International College Penang, with Coventry University.
    </footer>
  </main>
</template>

<style scoped>
.page {
  max-width: 780px;
  margin: 0 auto;
  padding: 88px 24px 96px;
}

.hero { margin-bottom: 96px; }

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
  margin: 0;
}

.links {
  display: flex;
  gap: 28px;
  margin-top: 28px;
  font-weight: 500;
}

section { margin-top: 88px; }

h2 {
  font-family: var(--serif);
  font-weight: 600;
  font-size: 1.85rem;
  margin: 0 0 24px;
}

h3 {
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
}

p { margin: 0; }

/* Selected work */
.work-list { border-bottom: 1px solid var(--rule); }

.work {
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: 8px 32px;
  padding: 22px 0;
  border-top: 1px solid var(--rule);
}

.work p { max-width: 36em; }

/* Journey pipeline */
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

/* Skills */
.skills {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px 32px;
}

.skills p { color: var(--muted); margin-top: 4px; }

footer {
  margin-top: 96px;
  padding-top: 24px;
  border-top: 1px solid var(--rule);
  color: var(--muted);
  font-size: 0.9rem;
}

@media (max-width: 640px) {
  .page { padding: 56px 20px 72px; }
  .hero { margin-bottom: 72px; }
  section { margin-top: 64px; }
  .work { grid-template-columns: 1fr; }
  .journey li { grid-template-columns: 1fr; }
  .skills { grid-template-columns: 1fr; }
}

@media (prefers-reduced-motion: reduce) {
  .journey::after,
  .journey li::before { transition: none; }
}
</style>
