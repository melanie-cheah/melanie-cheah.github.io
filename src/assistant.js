import { work, personal, journey, skillGroups, education, links } from './content.js'

// Paste your Worker address here after Part 1.
export const WORKER_URL = 'https://melanie-ask.melaniecheah46.workers.dev/'

const configured = !WORKER_URL.includes('REPLACE')

export const suggestions = [
  'What has Melanie built with AI agents?',
  'Tell me about her career',
  'Which skills does she use day to day?',
  'What is she learning next?',
  'How can I contact her?',
]

const STOP = new Set([
  'a', 'an', 'the', 'and', 'or', 'of', 'to', 'in', 'on', 'at', 'for', 'with', 'is', 'are',
  'was', 'were', 'be', 'she', 'her', 'he', 'his', 'it', 'its', 'what', 'which', 'who', 'how',
  'do', 'does', 'did', 'can', 'me', 'my', 'you', 'your', 'about', 'tell', 'has', 'have', 'had',
  'this', 'that', 'they', 'them', 'from', 'as', 'by', 'any',
])

const stem = (w) => w.replace(/(ing|ed|es|s)$/, '')

function tokenise(text) {
  return (text.toLowerCase().match(/[a-z0-9]+/g) || [])
    .filter((w) => !STOP.has(w))
    .map(stem)
    .filter((w) => w.length > 1)
}

const careerText = journey.map((j) => `${j.role}, ${j.org} (${j.years})`).join('; ')
const skillsText = skillGroups.map((g) => `${g.label}: ${g.items}`).join('. ')

const entries = [
  {
    label: 'About',
    text: 'Melanie Cheah is a software engineer working on infrastructure, data platforms and agentic AI tooling. She turns slow, manual engineering work into automation that teams can rely on.',
    extra: 'who about introduce melanie engineer summary',
  },
  {
    label: 'Career',
    text: `Her career so far: ${careerText}.`,
    extra: 'career experience journey history roles worked jobs background',
  },
  ...work.map((w) => ({ label: w.title, text: w.text, extra: '' })),
  ...personal.map((p) => ({ label: p.title, text: p.text, extra: 'website site built portfolio' })),
  ...journey.map((j) => ({
    label: j.role,
    text: `${j.role} at ${j.org}, ${j.years}. ${j.text}`,
    extra: j.org,
  })),
  {
    label: 'Skills',
    text: `Skills. ${skillsText}.`,
    extra: 'skills tools technologies stack languages strongest',
  },
  ...skillGroups.map((g) => ({
    label: g.label,
    text: `${g.label}: ${g.items}.`,
    extra: g.label === 'Growing into' ? 'learning learn next future ramp' : '',
  })),
  {
    label: 'Education',
    text: education,
    extra: 'education degree university study studied school',
  },
  {
    label: 'Contact',
    text: `The best way to reach Melanie is a message on LinkedIn: ${links.linkedin}`,
    extra: 'contact reach email linkedin message hire get touch',
  },
]

const index = entries.map((e) => ({
  e,
  label: new Set(tokenise(e.label + ' ' + e.extra)),
  body: new Set(tokenise(e.text)),
}))

export function localAnswer(question) {
  const q = new Set(tokenise(question))
  let best = null
  let bestScore = 0

  for (const item of index) {
    let score = 0
    for (const t of q) {
      if (item.label.has(t)) score += 2
      else if (item.body.has(t)) score += 1
    }
    if (score > bestScore) {
      best = item
      bestScore = score
    }
  }

  if (!best) {
    return "I can answer questions about Melanie's experience, projects, skills, education and how to contact her. Try one of the suggested questions."
  }
  return best.e.text
}

export async function ask(history) {
  const lastUser = [...history].reverse().find((m) => m.role === 'user')

  if (configured) {
    try {
      const controller = new AbortController()
      const timer = setTimeout(() => controller.abort(), 15000)
      const res = await fetch(WORKER_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history.slice(-6) }),
        signal: controller.signal,
      })
      clearTimeout(timer)
      if (!res.ok) throw new Error('status ' + res.status)
      const data = await res.json()
      if (!data.reply) throw new Error('empty reply')
      return { text: data.reply, source: 'ai' }
    } catch (err) {
      // Fall through to the local answer.
    }
  }

  return { text: localAnswer(lastUser ? lastUser.content : ''), source: 'fallback' }
}
