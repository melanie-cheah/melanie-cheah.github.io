<script setup>
import { links } from '../content.js'
</script>

<template>
  <div>
    <h1 class="title">Contact</h1>
    <p class="intro">The best way to reach me is a message on LinkedIn.</p>

    <div class="rows">
      <div class="row">
        <h3>LinkedIn</h3>
        <p><a :href="links.linkedin">Send me a message</a></p>
      </div>
      <div class="row">
        <h3>GitHub</h3>
        <p><a :href="links.github">See my code</a></p>
      </div>
    </div>
  </div>
</template>
