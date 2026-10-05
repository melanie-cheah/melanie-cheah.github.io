<script setup>
import { RouterLink } from 'vue-router'
import { work, personal, links } from '../content.js'
</script>

<template>
  <div>
    <h1 class="title">Projects</h1>
    <p class="intro">Work I can describe publicly, and things I build on my own.</p>

    <section class="block">
      <h2>At work</h2>
      <div class="rows">
        <article v-for="item in work" :key="item.title" class="row">
          <h3>{{ item.title }}</h3>
          <div>
            <p>{{ item.text }}</p>
            <p class="more">
              <RouterLink :to="{ path: '/ask', query: { q: 'Tell me about ' + item.title } }">Ask about this</RouterLink>
            </p>
          </div>
        </article>
      </div>
    </section>

    <section class="block">
      <h2>On my own</h2>
      <div class="rows">
        <article v-for="item in personal" :key="item.title" class="row">
          <h3>{{ item.title }}</h3>
          <div>
            <p>{{ item.text }}</p>
            <p class="more">
              <a :href="links.source">View the source</a>
              <RouterLink :to="{ path: '/ask', query: { q: 'Tell me about ' + item.title } }">Ask about this</RouterLink>
            </p>
          </div>
        </article>
      </div>
    </section>
  </div>
</template>

<style scoped>
.more {
  display: flex;
  gap: 24px;
  margin-top: 8px;
  font-size: 0.95rem;
}
</style>
