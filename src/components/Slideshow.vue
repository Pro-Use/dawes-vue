<template>
	<div id="slideshow-wrapper" class="main-wrapper slideshow-wrapper" data-page="container" data-order="2">
    <a @click.prevent="slideshow_close" aria-label="close slideshow" class="slideshow-close-button cap">Close</a>
    <div class="slideshow" ref="slideshow">
        <div v-for="(slide, index) in props.artist.albums[album_index].slides"
        	class="slide" :class="slide.slideType">
            <div class="slide-inner">
                <div v-if="slide.slideType == 'video'" class="slide-image-container" :class="slide.orientation">
                    <video
                        width="500"
                        height="500"
                        v-lazyloadvideo
                        style="width: 100%; height: 100%;"
                        preload="none"
                        loop
                        :data-autoplay="slide.autoplayVideo"
                        :muted="slide.autoplayVideo"
                        :data-poster="slide.url"
                        :alt="slide.alt"
                        :src="slide.url">
                    </video>
                </div>
                <div v-if="slide.slideType == 'vimeo'" class="slide-image-container" :class="slide.orientation">
                    <VideoWrapper :slide="slide" :dims="dims" 
                    	:cur_slide="index" :slide_index="slide_index" />
                </div>
	            <div v-else class="slide-image-container" :class="slide.orientation">
	                <img v-lazyload :data-srcset="slide.srcset" :alt="slide.alt" />
	                <!-- data-flickity-lazyload-src="<?= $slide->resize(1500)->url();?>" -->
	            </div>
            </div>
        </div>
    </div>
    <button @click="slideshow_prev" class="prev-slide">
        <span class="visuallyhidden">Previous Image</span>
    </button>
    <button @click="slideshow_next" class="next-slide">
        <span class="visuallyhidden">Next Image</span>
    </button>
    <footer class="slideshow-footer cap mono">
        <div v-if="cur_album" class="slideshow-caption">
            <span class=""> {{cur_album.caption}} &mdash;</span> <span id="count">{{slide_index}}</span>/
            <span id="total">{{cur_album.slides.length}}</span>
        </div>
    </footer>
</div>
</template>
<script setup>
	import { useSiteData } from '@/stores/siteData'
	import { ref, computed, watch, onMounted, onUnmounted, inject } from 'vue'
	import VideoWrapper from './VideoWrapper.vue'
	import Flickity from 'flickity'

	const site_data = useSiteData()
	const props = defineProps(['artist', 'album'])
	const emit = defineEmits(['close_slideshow'])

	const album_index = ref(props.album)
	const slide_index = ref(1)
	const slideshow = ref(null)
	const flickityOptions = {
        prevNextButtons: false,
        pageDots: false,
        wrapAround: true
    }
    let flickity = null
    const dims = ref([])
    const slideshow_open = inject('slideshow_open')

	const cur_album = computed(()=>{
		if (!album_index.value){
			return null
		} else {
			return props.artist.albums[album_index.value]
		}
	})

	const get_ratio = (slide) => {
		let ratio = Math.round((slide.height / slide.width * 100))
		return ratio
	}

	const slideshow_close = () => {
		album_index.value = null
		slide_index.value = 1
		emit('close_slideshow')
		// emit close to parent

	}

	const slideshow_next = () => {
		if (flickity){
			flickity.next()
			slide_index.value = flickity.selectedIndex + 1
		}
	}
	
	const slideshow_prev = () => {
		if (flickity){
			flickity.previous()
			slide_index.value = flickity.selectedIndex + 1
		}
	}

	const get_dimensions = () => {
      const width = document.documentElement.clientWidth;
      const height = document.documentElement.clientHeight;
      dims.value =  [width, height]
    }

    get_dimensions()

	watch(props, () => {
		if (album_index.value !== props.album){
			album_index.value = props.album
			slide_index.value = 0
			flickity.reloadCells()
		}
		
	})

	onMounted( () => {
		flickity = new Flickity(
			slideshow.value, flickityOptions
		)
		window.addEventListener('resize', get_dimensions);
		slideshow_open.value = true
	})

	onUnmounted( () => {
		window.removeEventListener('resize', get_dimensions);
		slideshow_open.value = false
	})

</script>

<style scoped>
	.slideshow-wrapper {
		z-index: 200;
		position: fixed;
	}

	.slideshow-close-button {
		cursor: pointer;
	}
</style>