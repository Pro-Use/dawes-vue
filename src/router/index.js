import { createRouter, createWebHistory } from 'vue-router'
import { useSiteData } from '@/stores/siteData'
import { useHead, useSeoMeta } from '@unhead/vue'
import HomeView from '../views/HomeView.vue'
import ArtistView from '../views/ArtistView.vue'
import ContactView from '../views/ContactView.vue'
import NewsView from '../views/NewsView.vue'

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
    {
      path: '/news',
      name: 'news',
      component: NewsView
    },
    {
      path: '/news/:item',
      name: 'newsitem',
      component: NewsView
    }
  ]
})

router.afterEach((to) => {
  const site_data = useSiteData()
  let slug = 'artists'
  if (to.name == 'home'){
    slug = 'artists'
  } else if (to.name == 'contact'){
    slug = 'contact'
  } else if (to.name == 'news'){
    slug = 'news'
  } else if (to.name == 'artist' || to.name == 'album' ){
    slug = to.params.artist
  }
  console.log(site_data.page_metas[slug])
  useHead({
      title: () => site_data.meta_titles[slug] ? site_data.meta_titles[slug] : 'Dawes & Co'
  })

  useSeoMeta({
    description: () => site_data.page_metas[slug] ? site_data.page_metas[slug]['description'] : '',
    ogDescription: () => site_data.page_metas[slug] ? site_data.page_metas[slug]['description'] : '',
    ogTitle: () => site_data.page_metas[slug] ? site_data.page_metas[slug]['title'] : '',
    twitterTitle: () => site_data.page_metas[slug] ? site_data.page_metas[slug]['title'] : '',
    twitterDescription: () => site_data.page_metas[slug] ? site_data.page_metas[slug]['description'] : '',
  })


})

export default router
