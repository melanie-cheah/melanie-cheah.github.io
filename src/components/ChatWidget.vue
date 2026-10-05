<script setup>
import { ref, computed, watch, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { chat, send } from '../chat.js'
import { suggestions } from '../assistant.js'

const route = useRoute()
const open = ref(false)
const draft = ref('')
const inputEl = ref(null)
const endEl = ref(null)
const launcher = ref(null)

// The Ask tab is already a full chat, so the launcher steps aside there.
const visible = computed(() => route.path !== '/ask')

async function toggle() {
  open.value = !open.value
  if (open.value) {
    await nextTick()
    if (inputEl.value) inputEl.value.focus()
  }
}

function close() {
  open.value = false
  if (launcher.value) launcher.value.focus()
}

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
</script>

<template>
  <div v-if="visible" @keydown.esc="close">
    <section v-if="open" id="assistant-panel" class="panel" role="dialog" aria-label="AI assistant">
      <header class="head">
        <h2>Ask about my work</h2>
        <button type="button" class="close" aria-label="Close assistant" @click="close">&times;</button>
      </header>

      <div class="log" aria-live="polite">
        <template v-if="!chat.messages.length">
          <p class="hello">I'm an AI assistant. Ask me about Melanie's experience, projects or skills.</p>
          <div class="suggest">
            <button v-for="s in suggestions.slice(0, 3)" :key="s" type="button" @click="send(s)">{{ s }}</button>
          </div>
        </template>

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
        <label for="widget-q" class="sr">Your question</label>
        <input
          id="widget-q"
          ref="inputEl"
          v-model="draft"
          type="text"
          maxlength="300"
          placeholder="Type a question"
          autocomplete="off"
        />
        <button type="submit" :disabled="chat.loading || !draft.trim()">Ask</button>
      </form>

      <p class="privacy">AI answers can be wrong. This site does not save your messages.</p>
    </section>

    <button
      ref="launcher"
      type="button"
      class="launcher"
      aria-label="Ask the AI assistant"
      aria-controls="assistant-panel"
      :aria-expanded="open"
      @click="toggle"
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M4 5h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H9.5L5 20.5V17H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z"
          fill="none"
          stroke="currentColor"
          stroke-width="1.8"
          stroke-linejoin="round"
        />
        <circle cx="8.5" cy="11" r="1.1" fill="currentColor" />
        <circle cx="12" cy="11" r="1.1" fill="currentColor" />
        <circle cx="15.5" cy="11" r="1.1" fill="currentColor" />
      </svg>
    </button>
  </div>
</template>

<style scoped>
.launcher {
  position: fixed;
  right: 24px;
  bottom: 24px;
  z-index: 20;
  width: 56px;
  height: 56px;
  display: grid;
  place-items: center;
  border: none;
  border-radius: 50%;
  background: var(--ink);
  color: var(--paper);
  cursor: pointer;
  box-shadow: 0 0 0 3px var(--paper), 0 0 0 4px var(--rule);
}

.launcher:hover { background: var(--teal-text); }

.launcher svg { width: 26px; height: 26px; }

.panel {
  position: fixed;
  right: 24px;
  bottom: 96px;
  z-index: 20;
  width: min(360px, calc(100vw - 32px));
  height: min(520px, 70vh);
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border: 1px solid var(--rule);
  border-radius: 12px;
  overflow: hidden;
}

.head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid var(--rule);
}

.head h2 {
  margin: 0;
  font-size: 1.05rem;
}

.close {
  background: none;
  border: none;
  color: var(--muted);
  font-size: 1.5rem;
  line-height: 1;
  padding: 0 4px;
  cursor: pointer;
}

.log {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
}

.hello {
  color: var(--muted);
  font-size: 0.93rem;
  margin-bottom: 12px;
}

.suggest {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 12px;
}

.suggest button {
  font: inherit;
  font-size: 0.9rem;
  text-align: left;
  color: var(--ink);
  background: transparent;
  border: 1px solid var(--rule);
  border-radius: 6px;
  padding: 8px 12px;
  cursor: pointer;
}

.suggest button:hover { border-color: var(--teal); }

.msg {
  margin-bottom: 14px;
  font-size: 0.95rem;
}

.msg.user {
  margin-left: auto;
  max-width: 85%;
  background: #eceff6;
  padding: 8px 12px;
  border-radius: 10px;
}

.who {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--muted);
  margin: 0 0 2px;
}

.text { white-space: pre-wrap; }

.note {
  color: var(--muted);
  font-size: 0.8rem;
  margin-top: 6px;
}

.thinking {
  color: var(--muted);
  font-size: 0.9rem;
}

.ask {
  display: flex;
  gap: 8px;
  padding: 12px;
  border-top: 1px solid var(--rule);
}

.ask input {
  flex: 1;
  min-width: 0;
  font: inherit;
  font-size: 0.93rem;
  padding: 9px 12px;
  border: 1px solid var(--rule);
  border-radius: 8px;
  color: var(--ink);
}

.ask button {
  font: inherit;
  font-weight: 600;
  padding: 0 16px;
  border: none;
  border-radius: 8px;
  background: var(--ink);
  color: var(--paper);
  cursor: pointer;
}

.ask button:disabled { opacity: 0.45; cursor: default; }

.privacy {
  color: var(--muted);
  font-size: 0.75rem;
  margin: 0;
  padding: 0 16px 12px;
}

.sr {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}

@media (max-width: 520px) {
  .launcher { right: 16px; bottom: 16px; }
  .panel { right: 16px; bottom: 88px; }
}
</style>
