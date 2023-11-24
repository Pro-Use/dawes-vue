<template>
<div class="main-wrapper" data-page="container" data-order="0">
    <main id="main" class="main page-content home-content">
            <header class="site-header">
                <h1 class="site-title">
                    <router-link to="/">
                        <span class="visuallyhidden">{{site_data.all_data.title}}</span>
                        <logo1/>
                    </router-link>
                </h1>
            </header>
            <div id="artists" class="artist-list-wrapper">
                <div class="ui-layer">
                    <ul class="artist-list">
                        <li v-for="(artist,index) in site_data.artists">
                            <RouterLink 
                              :id="index" class="artist-link" :to="artist.id" :style="rotations[index]" 
                              @mouseenter="cur_cover = index"
                            >
                                <span class="artist-name">{{artist.title}}</span>
                                <span class="artist-caption">{{artist.caption}}</span>
                            </RouterLink>
                        </li>
                    </ul>
                    <footer class="home-footer">
                        <RouterLink to="/contact" class="contact-link contact-link-toggle prevent cap">Contact</RouterLink>
                    </footer>
                </div>
                <div class="artist-background-images">
                        <div v-for="(artist,a_index) in site_data.artists" class="image-group">
                                <img class="artist-background-image" :style="{ display: cover_visible[a_index]}" 
                                :srcset="get_cover(a_index)" aria-hidden="true"/>
                        </div>
                </div>
            </div>
            <div id="contact" class="contact-wrapper">
                    <div class="contact-details">
                        <div class="body-content">
                            {{site_data.all_data.contact.contact}}
                        </div>
                    </div>
                    <footer class="home-footer">
                        <RouterLink to="/" class="contact-link contact-link-toggle prevent cap" >Artists</RouterLink>
                    </footer>
            </div>

    </main>
</div>
</template>

<script setup>
  import { useSiteData } from '@/stores/siteData'
  import { ref, computed } from 'vue'
  import { RouterLink } from 'vue-router'
  import logo1 from '@/components/icons/logo1.vue'

  const site_data = useSiteData()
  const cur_cover = ref(null)

  const get_cover = (i) => {
    if (!site_data) {
      return null
    } else {
      let covers = site_data.artists[i].covers
      let rand_cover = covers[Math.floor(Math.random() * covers.length)]
      return rand_cover.srcset
    }
  }

  const rotations = computed(() => {
    console.log('rotating')
    let rotation_vals = []
    for(let i=0;i<site_data.artists.length;i++){
      if(i % 2 == 0) {
        rotation_vals.push("transform: rotate(" +  Math.random() * 5 + 1 + "deg)")
      }else{
        rotation_vals.push("transform: rotate(-" +  Math.random() * 5 + 1 + "deg)")
      }
    }
    return rotation_vals
  })

  const cover_visible = computed(() => {
    let covers_visible = Array(site_data.artists.length).fill('none')
    if (cur_cover.value !== null){
      covers_visible[cur_cover.value] = 'block'
    }
    return covers_visible
  })
</script>