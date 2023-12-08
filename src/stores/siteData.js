import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import SiteQuery from '@/queries/SiteQuery.js'
import ArtistQuery from '@/queries/ArtistQuery.js'
import NewsQuery from '@/queries/NewsQuery.js'
import MetaQuery from '@/queries/MetaQuery.js'

export const useSiteData = defineStore('siteData', () => {

	const api = import.meta.env.VITE_API_ENDPOINT

	const site = ref(null)
	const artists = ref([])
	const news = ref(null)
	const meta = ref(null)

	const init_data = async () => {
		const res = await fetch(api, {
		    method: "post",
		    body: SiteQuery.query()
		})
		const json = await res.json()
		site.value = json.result
		init_meta()
		console.log(json.result)
		if (site.value.artists){
			site.value.artists.forEach((artist) => {
				init_artist(artist.slug)
			})
		}
		init_news()
	}

	const init_meta = async () => {
		const res = await fetch(api, {
		    method: "post",
		    body: MetaQuery.query()
		})
		const json = await res.json()
		meta.value = json.result
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

	const meta_titles = computed(() => {
		const titles = {}
		if (meta.value){
			const site_title = meta.value.meta_title.length ? meta.value.meta_title : meta.value.title
			meta.value.children.forEach((child) => {
				const page_title = child.meta_title.length ? child.meta_title : child.title
				const meta_title = `${page_title} - ${site_title}`
				titles[child.slug] = meta_title
			})
			meta.value.artists.forEach((child) => {
				const page_title = child.meta_title.length ? child.meta_title : child.title
				const meta_title = `${page_title} - ${site_title}`
				titles[child.slug] = meta_title
			})
		}
		return titles
	})

	const page_metas = computed(() => {
		const metas = {}
		if (meta.value){
			const site_title = meta.value.meta_title.length ? meta.value.meta_title : meta.value.title
			const site_description = meta.value.meta_description
			meta.value.children.forEach((child) => {
				const page_title = child.meta_title.length ? child.meta_title : child.title
				const page_description = child.meta_description.length ? child.meta_description : site_description
				const page_meta = {
				  description: page_description,
				  ogDescription: page_description,
				  ogTitle: page_title,
				  twitterTitle: page_title,
				  twitterDescription: page_description
				}
				metas[child.slug] = page_meta
			})
			meta.value.artists.forEach((child) => {
				const page_title = child.meta_title.length ? child.meta_title : child.title
				const page_description = child.meta_description.length ? child.meta_description : site_description
				const page_meta = {
				  title: page_title,
				  description: page_description,
				  ogDescription: page_description,
				  ogTitle: page_title,
				  twitterTitle: page_title,
				  twitterDescription: page_description
				}
				metas[child.slug] = page_meta
			})
		}
		return metas
	})

	return { 
		site, init_data, site_children, artists, init_news, news, meta, meta_titles, page_metas
	  }
})
