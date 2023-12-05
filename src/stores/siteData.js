import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import SiteQuery from '@/queries/SiteQuery.js'
import ArtistQuery from '@/queries/ArtistQuery.js'
import NewsQuery from '@/queries/NewsQuery.js'

export const useSiteData = defineStore('siteData', () => {

	const api = import.meta.env.VITE_API_ENDPOINT

	const site = ref(null)
	const artists = ref([])
	const news = ref(null)

	const init_data = async () => {
		const res = await fetch(api, {
		    method: "post",
		    body: SiteQuery.query()
		})
		const json = await res.json()
		site.value = json.result
		console.log(json.result)
		if (site.value.artists){
			site.value.artists.forEach((artist) => {
				init_artist(artist.slug)
			})
		}

		init_news()

	}

	const init_artist = async (artist) => {
		const res = await fetch(api, {
		    method: "post",
		    body: ArtistQuery.query(artist)
		})
		const json = await res.json()
		// console.log(json.result)
		artists.value.push(json.result)
	}

	const init_news = async () => {
		const res = await fetch(api, {
		    method: "post",
		    body: NewsQuery.query()
		})
		const json = await res.json()
		console.log(json.result)
		news.value = json.result
	}

	const site_children = computed(()=> {
		if (site.value){
			return site.value.children
		} else {
			return []
		}
	})

	return { 
		site, init_data, site_children, artists, news
	  }
})
