import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ArtistView from '../views/ArtistView.vue'
import ContactView from '../views/ContactView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/artists/:artist',
      name: 'artist',
      component: ArtistView,
      props: true
    },
    {
      path: '/artists/:artist/:album',
      name: 'album',
      component: ArtistView,
      props: true
    },
    {
      path: '/contact',
      name: 'contact',
      component: ContactView
    },
  ]
})

export default router
