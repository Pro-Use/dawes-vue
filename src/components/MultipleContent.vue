<template>
	<section id="images" class="artist-index">
            <div v-if="artist.placeholder != ''" class="filters mono cap" v-html="artist.placeholder">
            </div>
            <div v-else-if="artist.categories != ''" class="filters mono cap">
                <template  v-for="(category, index) in artist.categories">
                    <button 
                        @click="toggleFilter(category)" 
                        :class="selectedFilter == category ? 'selected' : ''"
                        class="filter-button button" 
                        :aria-label="'Only Show '+category" :data-filter="'filter-'+category">
                        {{ category }}
                    </button>
                    <span v-if="index != (artist.categories.length - 1)"> • </span>
                </template>
            </div>


            <ul class="artist-index-grid">
                <template v-for="(album, index) in props.artist.albums">
                    <li
                        v-if="selectedFilter == 'all' || album.categories.includes(selectedFilter)"
                        class="album" 
                        :class="album.categories">
                        <a v-if="album.cover" @click.prevent="cur_album = index" class="album-link" :class="[album.cover.orientation, album.cover.type]">
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
                </template>      
            </ul>
            <footer class="artist-footer page-margins">
                <div class="cap">
                    <RouterLink to="/" >Artists</RouterLink> • <RouterLink to="/Contact">Contact</RouterLink>
                </div>
            </footer>
        </section>
        <transition name="slide">
            <Slideshow v-if="cur_album !== null" :artist="props.artist" :album="cur_album" @close_slideshow="close_slideshow"/>
        </transition>  
</template>
<script setup>
	import Slideshow from './Slideshow.vue'
	import { ref, onMounted } from 'vue'
    import { useRouter } from "vue-router";

	const props = defineProps(['artist', 'album'])
	const cur_album = ref(null)
    const router = useRouter()

    const selectedFilter = ref('all')

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

    function toggleFilter(category){
        console.log(selectedFilter.value)
        if(selectedFilter.value == category){
            selectedFilter.value = 'all'
        }else{
            selectedFilter.value = category
        }
        // console.log(selectedFilter.value)
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

    button.selected{
        text-decoration: underline;
    }

    .slide-enter-active,
    .slide-leave-active {
      transition: top 0.5s;
    }
    .slide-enter-from,
    .slide-leave-to {
      top: 100vh;
    }
</style>