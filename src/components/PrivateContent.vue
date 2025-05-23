<template>
	<section id="images" class="artist-index">
            <ul class="artist-index-grid">
                <template v-for="(slide, index) in props.slides">
                    <li
                        class="album" >
                        <a @click.prevent="cur_slide = index" class="album-link" :class="[slide.orientation, slide.slideType]">
                                    <div v-if="slide.slideType == 'video'" class="image-wrapper" 
                                        :style="{ 'padding-bottom': get_ratio(album.cover) + '%' }">
                                            <video v-if="slide.src"
                                                width="500"
                                                height="500"
                                                v-lazyloadvideo
                                                preload="none"
                                                muted=""
                                                loop
                                                playsinline 
                                                data-autoplay=""
                                                :alt="album.title"
                                                :src="slide.src.url"
                                            ></video>
                                    </div>
                                    <div v-else class="image-wrapper" :style="{ 'padding-bottom': get_ratio(slide) + '%' }">
                                        <img v-lazyload :data-srcset="slide.srcset"  :alt="slide.alt"/>
                                    </div>
                            <!-- <span class="album-caption mono cap">{{album.title}}</span> -->
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
            <PrivateSlideshow v-if="cur_slide !== null" :slides="props.slides" :index="cur_slide" @close_slideshow="close_slideshow"/>
        </transition>  
</template>
<script setup>
	import PrivateSlideshow from './PrivateSlideshow.vue'
	import { ref, onMounted } from 'vue'
    import { useRouter } from "vue-router";

	const props = defineProps(['slides'])
	const cur_slide = ref(null)
    const router = useRouter()

    const selectedFilter = ref('all')

	const get_ratio = (cover) => {
		let ratio = Math.round((cover.height / cover.width * 100))
		return ratio
	}

    const close_slideshow = () => {
        cur_slide.value = null
        if(props.album != null){
            router.push('/'+props.artist.id)
        }
    }

    onMounted(() =>{
        // if (props.album !== null){
        //     const album_index = props.artist.albums.findIndex((album) => {
        //         if (album.slug == props.album){
        //             return true
        //         }
        //     })
        //     console.log(album_index)
        //     if (album_index >= 0){
        //         cur_slide.value = album_index
        //     }
        // }
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