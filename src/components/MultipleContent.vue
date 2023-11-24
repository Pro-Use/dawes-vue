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
                    <a @click.prevent="cur_album = index" class="album-link" :class="[album.cover.orientation, album.cover.type]">
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
                    </a>
                </li>        
            </ul>
            <footer class="artist-footer page-margins">
                <div class="cap">
                    <RouterLink to="/" >Artists</RouterLink> • <RouterLink to="/Contact">Contact</RouterLink>
                </div>
            </footer>
        </section>
        <Slideshow v-if="cur_album !== null" :artist="props.artist" :album="cur_album" @close_slideshow="close_slideshow"/>    
</template>
<script setup>
	import { useSiteData } from '@/stores/siteData'
	import Slideshow from './Slideshow.vue'
	import { ref, onMounted } from 'vue'
    import { useRoute, useRouter } from "vue-router";

	const site_data = useSiteData()
	const props = defineProps(['artist', 'album'])
	const cur_album = ref(null)
    const route = useRoute()
    const router = useRouter()

    console.log(route.query)

	const get_ratio = (cover) => {
		let ratio = Math.round((cover.height / cover.width * 100))
		return ratio
	}

    const close_slideshow = () => {
        cur_album.value = null
        if(props.album != null){
            router.push('/'+props.artist.id)
        }
    }

    onMounted(() =>{
        if (props.album !== null){
            const album_index = props.artist.albums.findIndex((album) => {
                if (album.slug == props.album){
                    return true
                }
            })
            console.log(album_index)
            if (album_index >= 0){
                cur_album.value = album_index
            }
        }
    })
</script>

<style scoped>
    .album-link {
        cursor: pointer;
    }
</style>