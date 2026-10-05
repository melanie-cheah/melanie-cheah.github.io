<script setup>
import { skillGroups } from '../content.js'
</script>

<template>
  <div>
    <h1 class="title">Skills</h1>
    <p class="intro">What I use every day, and what I'm actively building experience in.</p>

    <div class="rows">
      <div v-for="group in skillGroups" :key="group.label" class="row">
        <h3>{{ group.label }}</h3>
        <p>{{ group.items }}</p>
      </div>
    </div>
  </div>
</template>
