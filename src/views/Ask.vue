<script setup>
import { ref, watch, onMounted, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { chat, send } from '../chat.js'
import { suggestions } from '../assistant.js'

const route = useRoute()
const draft = ref('')
const endEl = ref(null)

function submit() {
  const text = draft.value
  draft.value = ''
  send(text)
}

watch(
  () => [chat.messages.length, chat.loading],
  async () => {
    await nextTick()
    if (endEl.value) endEl.value.scrollIntoView({ block: 'nearest' })
  }
)

onMounted(() => {
  const q = route.query.q
  if (typeof q === 'string' && q) send(q)
})
</script>

<template>
  <div>
    <h1 class="title">Ask</h1>
    <p class="intro">
      An AI assistant that answers questions about my work, using only what is on this site.
      It can make mistakes, so check anything important with me directly.
    </p>

    <div v-if="!chat.messages.length" class="suggest">
      <button v-for="s in suggestions" :key="s" type="button" @click="send(s)">{{ s }}</button>
    </div>

    <div class="log" aria-live="polite">
      <div v-for="(m, i) in chat.messages" :key="i" :class="['msg', m.role]">
        <p class="who">{{ m.role === 'user' ? 'You' : 'Assistant' }}</p>
        <p class="text">{{ m.content }}</p>
        <p v-if="m.source === 'fallback'" class="note">
          The AI assistant is unavailable right now, so this answer comes from a simple search of this site.
        </p>
      </div>
      <p v-if="chat.loading" class="thinking">Thinking...</p>
      <div ref="endEl"></div>
    </div>

    <form class="ask" @submit.prevent="submit">
      <label for="q" class="sr">Your question</label>
      <input
        id="q"
        v-model="draft"
        type="text"
        maxlength="300"
        placeholder="Ask about my experience, projects or skills"
        autocomplete="off"
      />
      <button type="submit" :disabled="chat.loading || !draft.trim()">Ask</button>
    </form>

    <p class="privacy">
      This site does not save your messages. They pass through Cloudflare and a hosted AI model to produce a reply.
    </p>
  </div>
</template>

<style scoped>
.suggest {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 32px;
}

.suggest button {
  font: inherit;
  font-size: 0.93rem;
  color: var(--ink);
  background: transparent;
  border: 1px solid var(--rule);
  border-radius: 6px;
  padding: 8px 14px;
  cursor: pointer;
  text-align: left;
}

.suggest button:hover { border-color: var(--teal); }

.log { margin-bottom: 8px; }

.msg { margin-bottom: 24px; max-width: 40em; }

.msg.user {
  margin-left: auto;
  max-width: 80%;
  background: #eceff6;
  padding: 12px 16px;
  border-radius: 10px;
}

.who {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--muted);
  margin: 0 0 4px;
}

.text { white-space: pre-wrap; }

.note {
  color: var(--muted);
  font-size: 0.85rem;
  margin-top: 8px;
}

.thinking { color: var(--muted); margin-bottom: 16px; }

.ask {
  display: flex;
  gap: 10px;
  margin-top: 24px;
}

.ask input {
  flex: 1;
  font: inherit;
  padding: 12px 14px;
  border: 1px solid var(--rule);
  border-radius: 8px;
  background: #ffffff;
  color: var(--ink);
}

.ask button {
  font: inherit;
  font-weight: 600;
  padding: 0 22px;
  border: none;
  border-radius: 8px;
  background: var(--ink);
  color: var(--paper);
  cursor: pointer;
}

.ask button:disabled { opacity: 0.45; cursor: default; }

.privacy {
  color: var(--muted);
  font-size: 0.85rem;
  margin-top: 16px;
  max-width: 40em;
}

.sr {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}
</style>
