<template>
	<div class="main-wrapper" data-page="container" data-order="1">
	    <main id="main" class="main news-content">
	        <header class="artist-header">
	            <div class="artist-header-inner">
	                <h1 class="page-title artist-title">
	                    News
	                </h1>
	                <div class="back-link-wrapper xs-hide sm-show page-margins cap">
	                    <RouterLink to="/" class="back-link">Back</RouterLink>
	                </div>                
	            </div>
	        </header>
            
            <NewsSignup/>

	        <section id="images" class="news-index">
                <ul v-if="news" class="artist-index-grid" :class="'col-'+ site_data.site.display_columns">
                    <li v-for="(album, index) in news" class="album">
                        <div v-if="album.cover && album.cover.slideType == 'video'" class="image-wrapper" 
                            :style="{ 'padding-bottom': get_ratio(album.cover) + '%' }">
                                <video v-if="album.cover.src"
                                    width="500"
                                    height="500"
                                    v-lazyloadvideo
                                    preload="none"
                                    muted
                                    loop
                                    playsinline 
                                    data-autoplay=""
                                    :alt="album.title"
                                    :src="album.cover.src.url"
                                ></video>
                        </div>
                        <div v-if="album.cover.slideType == 'vimeo'" class="slide-image-container" :class="album.cover.orientation">
                            <VideoWrapper :slide="album.cover" />
                        </div>
                        <div v-else class="image-wrapper" :style="{ 'padding-bottom': get_ratio(album.cover) + '%' }">
                            <img v-lazyload :data-srcset="album.cover.srcset"  :alt="album.title"/>
                        </div>
                        <span class="album-caption mono cap" style="opacity: 1;">{{album.date}}</span>
                        <span class="album-caption mono cap" style="opacity: 1;" v-html="album.caption"></span>
                    </li>        
                </ul>
            </section>
            <footer class="artist-footer page-margins">
                <div class="cap">
                    <RouterLink to="/" >Artists</RouterLink> • <RouterLink to="/Contact">Contact</RouterLink>
                </div>
            </footer>
	    </main>
	</div>
</template>
<script setup>
  import { useSiteData } from '@/stores/siteData'
  import { ref, computed, onMounted } from 'vue'
  import { useRoute } from "vue-router";
  import NewsQuery from '@/queries/NewsQuery.js'
  import VideoWrapper from '@/components/VideoWrapper.vue'
  import NewsSignup from '@/components/NewsSignup.vue'

  const site_data = useSiteData()
  const route = useRoute()
  const token = route.query.token
  const api = import.meta.env.VITE_API_ENDPOINT
  const news_unpublished = ref(null)

  onMounted( async () => {
    if (token){
        const res = await fetch(api, {
            method: "post",
            body: NewsQuery.query('draft')
        })
        const json = await res.json()
        console.log(json.result)
        news_unpublished.value = json.result
      }
  })
  

  const news = computed(() => {
  	if (news_unpublished.value){
        return news_unpublished.value
    } else {
        return site_data.news
    }
  })

  const get_ratio = (slide) => {
        let ratio = Math.round((slide.height / slide.width * 100))
        return ratio
    }

</script>
<style scoped>
    .news-index {
      padding: 0 3.5em 3.5em;
    }

    .main{
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        padding-bottom: 0;
        position: static;
    }

    .news-index{
        flex: 1;
    }


    @media screen and (min-width: 1200px) {
            
        .artist-index-grid.col-one {
            grid-template-columns: repeat(1,1fr);
            max-width: 700px;
            margin: 0 auto;
            gap: 80px;
        }

        .artist-index-grid.col-two {
            grid-template-columns: repeat(2,1fr);
            max-width: 1400px;
            margin: 0 auto;
        }

        .artist-index-grid.col-three {
            grid-template-columns: repeat(3,1fr);
        }
        
    }


</style>