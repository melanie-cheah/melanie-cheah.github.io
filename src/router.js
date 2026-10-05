import { createRouter, createWebHashHistory } from 'vue-router'
import Home from './views/Home.vue'
import Experience from './views/Experience.vue'
import Projects from './views/Projects.vue'
import Skills from './views/Skills.vue'
import Ask from './views/Ask.vue'
import Contact from './views/Contact.vue'

const routes = [
  { path: '/', component: Home, meta: { title: 'Home' } },
  { path: '/experience', component: Experience, meta: { title: 'Experience' } },
  { path: '/projects', component: Projects, meta: { title: 'Projects' } },
  { path: '/skills', component: Skills, meta: { title: 'Skills' } },
  { path: '/ask', component: Ask, meta: { title: 'Ask' } },
  { path: '/contact', component: Contact, meta: { title: 'Contact' } },
  { path: '/:pathMatch(.*)*', redirect: '/' },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 }),
})

router.afterEach((to) => {
  document.title =
    to.path === '/' ? 'Melanie Cheah' : `${to.meta.title} | Melanie Cheah`
})

export default router
