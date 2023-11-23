<template>
	<div v-show="props.album != null" 
	id="slideshow-wrapper" class="main-wrapper slideshow-wrapper" data-page="container" data-order="2">
    <button @click="slideshow_close" aria-label="close slideshow" class="slideshow-close-button cap">Close</button>
    <div class="slideshow" ref="slideshow">
        <div v-for="(slide, index) in props.artist.albums[0].slides"
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
                            <div class="video-wrapper" :data-ratio="slide.ratio" :data-orientation="slide.orientation">
                                <div class="video-wrapper js-player">
                                    <vue-plyr>
									  <div class="plyr__video-embed">
									    <iframe
									      :src="slide.vimeoLink+'?loop=false&amp;byline=false&amp;portrait=false&amp;title=false&amp;speed=true&amp;transparent=0&amp;gesture=media'"
									      allowfullscreen
									      allowtransparency
									      allow="autoplay"
									    ></iframe>
									  </div>
									</vue-plyr>
                                </div>
                            </div>
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
	import { ref, computed, watch, onMounted } from 'vue'
	import Flickity from 'flickity'

	const site_data = useSiteData()
	const props = defineProps(['artist', 'album'])

	const album_index = ref(props.album)
	const slide_index = ref(0)
	const slideshow = ref(null)
	const flickityOptions = {
        prevNextButtons: false,
        pageDots: false,
        wrapAround: true
    }
    const flickity = null

    console.log(Flickity)

	watch(props, () => {
		album_index.value = props.album
		slide_index.value = 0
		console.log(slideshow.value)
		// if (flickity === null && slideshow.value){
		// 	flickity = new Flickity(
		// 		slideshow.value, flickityOptions
		// 	)
		// } else {
		// 	flickity.reloadCells()
		// }
		// console.log(flickity.value)
	})

	const cur_album = computed(()=>{
		if (!album_index.value){
			return null
		} else {
			return props.artist.albums[album_index.value]
		}
	})

	// const cur_slide = computed(()=>{
	// 	if (!album_index.value || !props.artist.albums[album_index.value].slides.length) {
	// 		return null
	// 	} else {
	// 		return props.artist.albums[album_index.value].slides[slide_index.value]
	// 	}
	// })


	const get_ratio = (slide) => {
		let ratio = Math.round((slide.height / slide.width * 100))
		return ratio
	}

	const slideshow_close = () => {
		album_index.value = null
		// emit close to parent
	}

	const slideshow_next = () => {
		if (flickity.value){
			flickety.value.next()
		}
	}
	
	const slideshow_prev = () => {
		if (flickity.value){
			flickety.value.prev()
		}
	}
</script>

<style scoped>
	.slideshow-wrapper {
		z-index: 200;
	}
</style>