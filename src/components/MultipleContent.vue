<template>
	<section id="images" class="artist-index">
            <div class="filters mono cap">
<!--                 <button v-for="(category, index) in artist.categories.split()" class="filter-button button" :aria-label="'Only Show '+category" :data-filter="'filter-'+category">{{ category }}</button>
                <span v-if="index == (artist.categories.length - 1)">•</span> -->
            </div>
                <div v-if="artist.placeholder && artist.placeholder != ''" class="filters mono cap">
                    {{artist.placehholder}}
                </div>
            <ul class="artist-index-grid">
                <li v-for="(album, index) in artist.albums" class="album">
                    <button @click="cur_album = index" class="album-link" :class="[album.cover.orientation, album.cover.type]">
                                <div v-if="album.cover && album.cover.slideType == 'video'" class="image-wrapper" 
                                	:style="{ 'padding-bottom': get_ratio(album.cover) + '%' }">
                                        <video v-if="album.cover.src"
                                            width="500"
                                            height="500"
                                            v-lazyloadvideo
                                            preload="none"
                                            muted=""
                                            loop
                                            playsinline 
                                            data-autoplay=""
                                            :alt="album.title"
                                            :src="album.cover.src.url"
                                        ></video>
                                </div>
                                <div v-else class="image-wrapper" :style="{ 'padding-bottom': get_ratio(album.cover) + '%' }">
                                    <img v-lazyload :data-srcset="album.cover.srcset"  :alt="album.title"/>
                                </div>
                        <span class="album-caption mono cap">{{album.title}}</span>
                    </button>
                </li>        
            </ul>
            <footer class="artist-footer page-margins">
                <div class="cap">
                    <a :href="site_data.all_data.url">Artists</a> • <a :href="site_data.all_data.contact.url">Contact</a>
                </div>
            </footer>
        </section>
        <Slideshow :artist="props.artist" :album="cur_album"/>    
</template>
<script setup>
	import { useSiteData } from '@/stores/siteData'
	import Slideshow from './Slideshow.vue'
	import { ref } from 'vue'

	const site_data = useSiteData()
	const props = defineProps(['artist'])
	const cur_album = ref(null)

	const get_ratio = (cover) => {
		let ratio = Math.round((cover.height / cover.width * 100))
		return ratio
	}
</script>