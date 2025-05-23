<template>
	<div  class="main-wrapper" data-page="container" data-order="1">
	    <main v-if="private_data && login.success == true" id="main" class="main artist-content">
	        <header class="artist-header">
	            <div class="artist-header-inner">
	                <h1 class="page-title artist-title">
	                    <RouterLink to="/">{{private_data.title}}</RouterLink>
	                </h1>
	                <p class="artist-cat mono cap" v-html="private_data.caption"></p>
	                <!-- <div class="bio-link-wrapper xs-hide sm-show page-margins cap">
	                    <a href="#bio" @click="toggle_bio" class="bio-link">{{bio_button}}</a>
	                </div> -->
	                <div class="back-link-wrapper xs-hide sm-show page-margins cap">
	                     <RouterLink to="/" class="back-link">Back</RouterLink>
	                </div>                
	            </div>
	        </header>
	        <PrivateContent :slides="private_data.slides" />
	        <!-- <section id="bio" class="artist-bio"  :class="bio ? 'active' : 'inactive'">  
	            <div class="bio-inner">
	                <div class="bio-grid page-margins body-content">
	                        <div class="artist-bio-text rte" v-html="artist.biography">
	                        </div>
	                        <div class="artist-contact" v-html="artist.contact">
	                        </div>
	                </div>
	                <footer class="artist-footer page-margins">
	                    <div class="cap">
	                        <RouterLink to="/">Artists</RouterLink> • <RouterLink to="/contact">Contact</RouterLink>
	                    </div>
	                </footer>
	            </div>
	        </section> -->
	    </main>
		<PrivateLogin ref="login" :password="private_data?.password"/>
	</div>

</template>

<script setup>
  import { useSiteData } from '@/stores/siteData'
  import { ref, computed, onMounted, provide } from 'vue'
  import { useRoute, useRouter } from "vue-router";
  import PrivateQuery from '@/queries/PrivateQuery.js'
  import PrivateContent from '@/components/PrivateContent.vue'
  import PrivateLogin from '@/components/PrivateLogin.vue'

  const api = import.meta.env.VITE_API_ENDPOINT
  const site_data = useSiteData()
  const props = defineProps(['slug'])
  const route = useRoute()
  const router = useRouter()
  const token = route.query.token
  const login = ref(null)
  const private_data = ref(null)

  const caption = ref(null)

  provide('caption', caption)

  console.log(route)

  
  onMounted( async() => {
  	// Handle Draft
  	if (token){
  		const res = await fetch(api, {
		    method: "post",
		    body: PrivateQuery.query(props.slug, 'draft')
		})
		const json = await res.json()
		console.log(json)
		private_data.value = json.result
	} else {
		const res = await fetch(api, {
		    method: "post",
		    body: PrivateQuery.query(props.slug)
		})
		const json = await res.json()
		console.log(json)
		private_data.value = json.result
	}
	caption.value = private_data.value?.caption
  	// } else {
  	// 	// Handle unlisted
  	// 	const in_artists = site_data.site.artists.find((artist) => props.artist == artist.slug)
  	// 	if (!in_artists){
  	// 		const res = await fetch(api, {
	// 		    method: "post",
	// 		    body: ArtistQuery.query(props.artist, 'listed')
	// 			})
	// 			const json = await res.json()
	// 			console.log(json)
	// 			if (json.result != null){
	// 				artist_unpublished.value = json.result
	// 			}
  	// 	}
  	// }
	// if(artist.value == null){
	// 	router.push('/error')
	// }
  })

//   const artist = computed(() => {
//   	// if route.query re-call kql before returning...
//   	if (artist_unpublished.value && artist_full.value){
//   		return artist_full.value
//   	} else {
// 	  	console.log(site_data.site.artists)
// 	  	const filtered = site_data.site.artists.filter((artist) => artist.slug == props.artist)
// 	  	if (filtered.length){
// 	  		return filtered[0]
// 	  	} else {
// 	  		return null
// 	  	}
// 	  }
//   })

//   const artist_full = computed(() => {
//   	if (artist_unpublished.value){
//   		return artist_unpublished.value
//   	}
//   	// if route.query re-call kql before returning...
//   	const filtered = site_data.artists.filter((artist) => artist.slug == props.artist)
//   	if (filtered.length){
//   		return filtered[0]
//   	} else {
//   		return null
//   	}
//   })

//   const toggle_bio = () => {
//   	if (bio.value){
//   		bio.value = false
//   		bio_button.value = 'Bio'
//   		bio_display.value = 'none'
//   	} else {
//   		bio.value = true
//   		bio_button.value = 'Img'
//   		bio_display.value = 'block'
//   	}
//   }
</script>

<style scoped>


@media screen and (max-width: 600px) {
	.active, .inactive{
		display: block;
	}
}

@media screen and (min-width: 600px) {
	.active{
		display: block;
	}
	.inactive{
		display: none;
	}
}

</style>