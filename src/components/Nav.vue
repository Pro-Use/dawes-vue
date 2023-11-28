<template>
	<nav class="main-menu" :class="{'menu--open': responsive_menu}">
    <details>
      <summary @click="toggle_menu()" id="menu-toggle-button" 
        class="button menu-toggle-button"
        :aria-expanded="expanded">
        <span class="visuallyhidden">Main Menu</span>
        <div class="menu-toggle-button-inner">
          <span class="menu-bar"></span>
          <span class="menu-bar"></span>
        </div>          
      </summary>
    </details>
    <div v-if="responsive_menu" id="menu" class="main-menu-container2">
      <button ref="close" @click="toggle_menu()" class="button menu-close" aria-controls="menu" 
        :aria-expanded="expanded">
        Close
      </button>
      
      <ul class="main-menu-list">
          <li v-for="child in site_data.site_children" class="menu-item">
            <a @click.prevent="nav_link(child.id)">{{child.title}}</a>
          </li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
  import { ref, computed } from 'vue'
  import { useRouter } from 'vue-router'
	import { useSiteData } from '@/stores/siteData'
 
	const site_data = useSiteData()
  const responsive_menu = ref(false)
  const router = useRouter()
  const close = ref('null')

  const expanded = computed(()=>{
    return String(responsive_menu.value)
  })

  const toggle_menu = () => {
    responsive_menu.value = !responsive_menu.value
  }

  const nav_link = (route_name) => {
    router.push({'name': route_name})
    toggle_menu()
  }

</script>

<style scoped>
  .menu-item {
    cursor: pointer;
  }

  .main-menu-container2 {
    width: 100vw;
    min-height: 100vh;
    background: var(--dawes-green);
    position: fixed;
    display: -ms-grid;
    display: grid;
    -ms-grid-rows: 50px 1fr 70px;
    grid-template-rows: 50px 1fr 70px;
    /* -webkit-transform: translate(-100%, 0); */
    /* transform: translate(-100%, 0); */
    z-index: 1000;
    height: 100%;
    top: 0;
    left: 0;
  }
</style>