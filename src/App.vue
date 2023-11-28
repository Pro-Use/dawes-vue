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
import Header from './components/Header.vue'
import Nav from './components/Nav.vue'

const site_data = useSiteData()

onMounted( async () => {
  await site_data.init_data()
})

</script>

<style scoped>

</style>
