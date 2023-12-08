<template>
	<div class="ticker-container">
		<RouterLink to='news'>
			<div class="ticker-wrapper" :style="{'margin-bottom':ticker_top+'px', 'rotate': ticker_rotation}">
				<Vue3Marquee :duration="80">
<!-- 		        <vue-marquee-slider
		          id="marquee-slider"
		          :speed="50000"
		          :space="0"
		          :autoWidth="true"
		        > -->
		        <div class="ticker-item" v-for="index in 2">
		            NEWS: {{ site_data.site.news_text }} <span class="more-news"> • MORE NEWS  • </span>
		        </div>
		        <!-- </vue-marquee-slider> -->
		    </Vue3Marquee>
		    </div>
		</RouterLink>
	</div>
</template>
<script setup>
	import { ref, onMounted, onUnmounted } from 'vue'
	import { useSiteData } from '@/stores/siteData'
	import { VueMarqueeSlider } from 'vue3-marquee-slider';
	import '../../node_modules/vue3-marquee-slider/dist/style.css'

	const site_data = useSiteData()
	const ticker_rotation = ref('0deg')
  	const ticker_top = ref(null)
  	const props = defineProps(['artist_list'])
  	const artist_list = props.artist_list

  	const get_ticker_pos = () => {
	    const y = artist_list.clientHeight
	    const grandparent = artist_list.parentElement
	    const available = grandparent.clientHeight - y
	    ticker_top.value = available/2
	}

	onMounted( () => {
		get_ticker_pos()
		window.addEventListener('resize', get_ticker_pos);
	})

	onUnmounted( () => {
    	window.removeEventListener('resize', get_ticker_pos);
	})
	
</script>

<style scoped>
    .ticker-item {
      flex-shrink: 0;
      color: #FF5C00;
      font-size: 45px;
    }

    .ticker-wrapper {
        z-index: 50;
        position: relative;
        background: white;
        padding: 5px 0px;
        border: #FF5C00 solid 2px;
        width: 140%;
        left: -20%;
        margin-bottom: 50px;
    }

    .more-news {
    	font-size: 22px;
    	vertical-align: middle;
    	padding:0 15px ;
    }

    @media only screen and (max-width: 600px){
    	.ticker-item {
    		font-size: 16px;
    	}

		.more-news {
			font-size: 10px;
		}    	
    }
</style>