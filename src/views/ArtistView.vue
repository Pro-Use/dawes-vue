<template>
	<div class="main-wrapper" data-page="container" data-order="1">
	    <main id="main" class="main artist-content">
	        <header class="artist-header">
	            <div class="artist-header-inner">
	                <h1 class="page-title artist-title">
	                    <a :href="site_data.all_data.url">
	                        {{artist.title}}
	                    </a>
	                </h1>
	                <p class="artist-cat mono cap">{{artist.caption}}</p>
	                <div class="bio-link-wrapper xs-hide sm-show page-margins cap">
	                    <a href="#bio" @click="toggle_bio" class="bio-link">{{bio_button}}</a>
	                </div>
	                <div class="back-link-wrapper xs-hide sm-show page-margins cap">
	                    <a :href="site_data.all_data.url" class="back-link">Back</a>
	                </div>                
	            </div>
	        </header>
	        	<MultipleContent :artist="artist" />
<!-- 	            <?php
	                $display = $page->display();
	                if($display == 'single'):
	                    snippet('single-content', ['page' => $page]);
	                else:
	                    snippet('multiple-content', ['page' => $page]);
	                endif;
	            ?> -->
	        <section id="bio" class="artist-bio" :style="{display: bio_display}">  
	            <div class="bio-inner">
	                <div class="bio-grid page-margins body-content">
	                        <div class="artist-bio-text rte" v-html="artist.biography">
	                        </div>
	                        <div class="artist-contact" v-html="artist.contact">
	                        </div>
	                </div>
	                <footer class="artist-footer page-margins">
	                    <div class="cap">
	                        <a :href="site_data.all_data.url">Artists</a> • <a :href="site_data.all_data.contact.url">Contact</a>
	                    </div>
	                </footer>
	            </div>
	        </section>
	    </main>
	</div>
</template>
<script setup>
  import { useSiteData } from '@/stores/siteData'
  import { ref, computed } from 'vue'
  import MultipleContent from '@/components/MultipleContent.vue'

  const site_data = useSiteData()
  const props = defineProps(['artist'])
  const bio = ref(false)
  const bio_button = ref('Bio')
  const bio_display = ref('none')

  const artist = computed(() => {
  	return site_data.artists.filter((artist) => artist.slug == props.artist)[0]
  })

  const toggle_bio = () => {
  	if (bio.value){
  		bio.value = false
  		bio_button.value = 'Bio'
  		bio_display.value = 'none'
  	} else {
  		bio.value = true
  		bio_button.value = 'Img'
  		bio_display.value = 'block'
  	}
  }
</script>