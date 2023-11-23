import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useSiteData = defineStore('siteData', () => {

	const all_data = ref(null)

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
		all_data, site_children, artists
	  }
})
