<template>
  <Header/>
  <div v-if="site_data.site" data-page="wrapper" class="site-wrapper">
    <a href="#main" class="skip-to-content">Skip to content</a>
    <Nav/>
    <RouterView v-slot="{ Component, route }">
      <transition
        :name="route.meta.transition"
        >
        <component :is="Component" />
      </transition>
    </RouterView>
  </div>
</template>

<script setup>
import { RouterView, useRoute } from 'vue-router'
import { onMounted, computed, provide, ref, onBeforeUnmount } from 'vue'
import { useSiteData } from '@/stores/siteData'
import Header from './components/Header.vue'
import Nav from './components/Nav.vue'

const site_data = useSiteData()
const route = useRoute()
console.log(route)
const slideshow_open = ref(false)
provide('slideshow_open', slideshow_open)

onMounted( async() => {
  await site_data.init_data()
})


</script>

<style scoped>
  .slideup-enter-active,
  .slideup-leave-active,
  .slidedown-enter-active,
  .slidedown-leave-active {
    transition: top 0.5s;
  }
  .slideup-enter-from{
    top: 100vh;
  }
  .slideup-leave-to {
    top: -100vh;
  }
  .slidedown-enter-from {
    top: -100vh;
  }
  .slidedown-leave-to {
    top: 100vh;
  }
</style>
