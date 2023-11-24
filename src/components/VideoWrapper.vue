<template>
	<div class="video-wrapper" ref="video_elem" :data-ratio="slide.ratio" 
		:data-orientation="slide.orientation" :style="{'width': width, 'height': height}" >
        <div class="video-wrapper js-player">
            <vue-plyr ref="plyr">
			  <div class="plyr__video-embed" >
			    <iframe
			      :src="get_vimeo_url(slide.vimeoLink)"
			      allowfullscreen
			      allowtransparency
			      allow="autoplay"
			    ></iframe>
			  </div>
			</vue-plyr>
        </div>
    </div>
</template>

<script setup>
	import { ref, onMounted, watch } from 'vue'

	const props = defineProps(['slide', 'dims', 'cur_slide', 'slide_index'])
	const slide = props.slide
	const width = ref('100%')
	const height = ref('100%')
	const video_elem = ref('null')
	const plyr = ref('null')

	const get_vimeo_url = (url) => {
		let url_array = url.split('/')
		console.log(url_array)
		let id = url_array.pop()
		console.log(id)
		return 'https://player.vimeo.com/video/' + id +
			'?loop=false&amp;byline=false&amp;portrait=false&amp;title=false&amp;speed=true&amp;transparent=0&amp;gesture=media'
	}

	watch(props, () => {
		sizeVid()
		if (props.slide_index != props.cur_slide){
			// console.log('lost focus', plyr.value)
			if (plyr.value){
				plyr.value.player.stop()
			}

		}
	})

	const sizeVid = () => {
		if (video_elem.value){
			const element = video_elem.value
			const wrapperRatio = Math.round(element.offsetWidth / element.offsetHeight * 100) / 100;
			const vidRatio = Math.round(element.dataset.ratio * 100) / 100;
			console.log(element);
			console.log(wrapperRatio);
			console.log(vidRatio);
			// if(wrapperRatio == vidRatio){
			// 	element.style.width = "100%";
			// 	element.style.height = "100%";
			// }
			if(wrapperRatio > vidRatio){
				height.value = "100%";
				width.value = element.offsetHeight * vidRatio + "px";
			}
			if(wrapperRatio < vidRatio){
				width.value = "100%";
				height.value = element.offsetWidth / vidRatio + "px";
			}		
		}
	}

	onMounted(()=>{
		sizeVid()
	})
	
</script>