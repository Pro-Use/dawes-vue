<template>
<div class="main-wrapper" data-page="container" data-order="0">
    <main id="main" class="main page-content home-content">
            <header class="site-header">
                <h1 class="site-title">
                    <router-link to="/">
                        <span class="visuallyhidden">{{site_data.site.title}}</span>
                        <logo1/>
                    </router-link>
                </h1>
            </header>
            <div id="artists" class="artist-list-wrapper">
                <div class="ui-layer" style="overflow-x: hidden; width: 100vw;">
                    <ul ref="artist_list" class="artist-list">
                        <li v-for="(artist,index) in site_data.site.artists">
                            <RouterLink 
                              :id="index" class="artist-link" :to="artist.id" :style="rotations[index]" 
                              @mouseenter="cur_cover = index"
                            >
                                <span class="artist-name">{{artist.title}}</span>
                                <span class="artist-caption">{{artist.caption}}</span>
                            </RouterLink>
                        </li>
                    </ul>
                    <Ticker v-if="artist_list && site_data.site.news_on" :artist_list="artist_list" />
                    <footer class="home-footer">
                        <RouterLink to="/contact" class="contact-link contact-link-toggle prevent cap">Contact</RouterLink>
                    </footer>
                </div>
                <div class="artist-background-images">
                    <div v-for="(artist,a_index) in site_data.site.artists" class="image-group" :data-artist="artist.title">
                            <img class="artist-background-image" :style="{ display: cover_visible[a_index]}" 
                            :srcset="get_cover(a_index)" aria-hidden="true"/>
                    </div>
                </div>
            </div>
            <div id="contact" class="contact-wrapper">
                    <div class="contact-details">
                        <div class="body-content">
                            {{site_data.site.contact.contact}}
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
  import Ticker from '@/components/Ticker.vue'

  const site_data = useSiteData()
  const cur_cover = ref(null)
  const artist_list = ref(null)

  const get_cover = (i) => {
    if (!site_data) {
      return null
    } else {
      let covers = site_data.site.artists[i].covers
      let rand_cover = covers[0]
      return rand_cover.srcset
    }
  }

  const rotations = computed(() => {
    console.log('rotating')
    let rotation_vals = []
    for(let i=0;i<site_data.site.artists.length;i++){
      if(i % 2 == 0) {
        rotation_vals.push("transform: rotate(" +  Math.random() * 5 + 1 + "deg)")
      }else{
        rotation_vals.push("transform: rotate(-" +  Math.random() * 5 + 1 + "deg)")
      }
    }
    return rotation_vals
  })

  const cover_visible = computed(() => {
    let covers_visible = Array(site_data.site.artists.length).fill('none')
    if (cur_cover.value !== null){
      covers_visible[cur_cover.value] = 'block'
    }
    return covers_visible
  })

</script>