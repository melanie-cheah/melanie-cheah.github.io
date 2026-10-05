import { reactive } from 'vue'
import { ask } from './assistant.js'

// One conversation, shared by the floating panel and the Ask page.
export const chat = reactive({
  messages: [],
  loading: false,
})

export async function send(text) {
  const question = (text || '').trim()
  if (!question || chat.loading) return

  chat.messages.push({ role: 'user', content: question })
  chat.loading = true

  const history = chat.messages.map((m) => ({ role: m.role, content: m.content }))
  const reply = await ask(history)

  chat.messages.push({ role: 'assistant', content: reply.text, source: reply.source })
  chat.loading = false
}
