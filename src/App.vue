<template>
  <Header/>
  <div v-if="site_data.all_data" data-page="wrapper" class="site-wrapper">
    <a href="#main" class="skip-to-content">Skip to content</a>
    <Nav/>
    <RouterView />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import { onMounted, ref, provide } from 'vue'
import { useSiteData } from '@/stores/siteData'
import Query from './components/Query.js'
import Header from './components/Header.vue'
import Nav from './components/Nav.vue'

const site_data = useSiteData()
const api = import.meta.env.VITE_API_ENDPOINT

onMounted( async () => {
  const res = await fetch(api, {
    method: "post",
    body: Query.query
  })
  const json = await res.json()
  site_data.all_data = json.result
  console.log(json.result)
})

</script>

<style scoped>

</style>
