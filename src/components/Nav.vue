<template>
	<nav class="main-menu">
        <details>
          <summary id="menu-toggle-button" class="button menu-toggle-button">
            <span class="visuallyhidden">Main Menu</span>
            <div class="menu-toggle-button-inner">
              <span class="menu-bar"></span>
              <span class="menu-bar"></span>
            </div>          
          </summary>
          <div id="menu" class="main-menu-container">
            <button class="button menu-close" aria-expanded="false" aria-controls="menu">Close</button>
            
            <ul class="main-menu-list">
                <li v-for="child in site_data.site_children" class="menu-item"><a :href="child.url">{{child.title}}</a></li>
            </ul>
          </div>
        </details>
      </nav>
</template>

<script setup>
	import { useSiteData } from '@/stores/siteData'

	const site_data = useSiteData()

</script>