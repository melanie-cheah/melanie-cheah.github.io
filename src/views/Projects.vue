<script setup>
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
          <p>{{ item.text }}</p>
        </article>
      </div>
    </section>

    <section class="block">
      <h2>On my own</h2>
      <div class="rows">
        <article v-for="item in personal" :key="item.title" class="row">
          <h3>{{ item.title }}</h3>
          <p>
            {{ item.text }}
            <a :href="links.source">View the source</a>.
          </p>
        </article>
      </div>
    </section>
  </div>
</template>
