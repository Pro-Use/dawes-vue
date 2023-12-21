<template>
	<div class="ticker-container">
		<RouterLink to='news' class="ticker-link">
			<div class="ticker-wrapper">
				<Vue3Marquee :duration="80">
<!-- 		        <vue-marquee-slider
		          id="marquee-slider"
		          :speed="50000"
		          :space="0"
		          :autoWidth="true"
		        > -->
		        <div class="ticker-item" v-for="index in 2">
					<span class="more-news">• NEWS •</span>{{ site_data.site.news_text }}
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

<style scoped lang="scss">

	.ticker-link{
		color: #fff;
		display: block;
		&:hover{
			color: #FF5C00
		}
	}
    .ticker-item {
      flex-shrink: 0;
	  font-size: 28px;
    }

    .ticker-wrapper {
		background-color: #FF5C00;
        z-index: 50;
        position: absolute;
		bottom: 70px;
        padding: 3px 0px;
        // border: #FF5C00 solid 2px;
        width: 140%;
        left: -20%;
    }

	a:hover .ticker-wrapper{
		background-color: #fff;
	}

    .more-news {
		font-size: 15px;
    	vertical-align: middle;
    	padding:0 15px;
		margin-top: -2px;
		display: inline-block;
		font-family: "Monument-Semi-Mono",monospace;
    }

    @media only screen and (min-width: 768px){
    	.ticker-item {
    		font-size: 45px;
    	}
		.more-news {
			font-size: 22px;
			margin-top: -5px;
		}    	
    }

	@media only screen and (min-width: 1200px){
		.ticker-wrapper {
			bottom: 90px;
		}
	}
</style>