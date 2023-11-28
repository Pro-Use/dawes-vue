import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import Query from '@/components/Query.js'

export const useSiteData = defineStore('siteData', () => {

	const api = import.meta.env.VITE_API_ENDPOINT

	const all_data = ref(null)

	const init_data = async () => {
		const res = await fetch(api, {
		    method: "post",
		    body: Query.query
		})
		const json = await res.json()
		all_data.value = json.result
		console.log(json.result)
	}

	const site_children = computed(()=> {
		if (all_data.value){
			return all_data.value.children
		} else {
			return []
		}
	})

	const artists = computed(()=> {
		if (all_data.value){
			return all_data.value.artists
		} else {
			return []
		}
	})

	return { 
		all_data, init_data, site_children, artists
	  }
})
