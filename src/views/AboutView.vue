<template>
	<div class="main-wrapper" data-page="container" data-order="1">
	    <main id="main" class="main about-content">
            <header class="artist-header">
	            <div class="artist-header-inner">
	                <h1 class="page-title artist-title">
	                    <RouterLink to="/">About</RouterLink>
	                </h1>
	                <div class="back-link-wrapper xs-hide sm-show page-margins cap">
	                     <RouterLink to="/" class="back-link">Back</RouterLink>
	                </div>                
	            </div>
	        </header>
            <section class="artist-bio visible about-section">  
	            <div class="bio-inner">
	                <div class="about-grid page-margins body-content">
                        <template v-for="block in page_full?.text">
	                        <div v-if="block.type == 'text'" class="artist-bio-text rte about-block-text" v-html="block.text">
	                        </div>
                            <img 
                                v-if="block.type == 'image'" 
                                :srcset="block.image.srcset"
                                :class="{
                                    'about-img-portrait': block.image.ratio <= 1,
                                    'about-img-landscape': block.image.ratio > 1
                                }"
                            >
                        </template>
                        <div class="artist-contact about-contact" v-html="page_full?.social">
                        </div>
	                </div>
	                <footer class="artist-footer page-margins">
	                    <div class="cap">
	                        <RouterLink to="/">Artists</RouterLink> • <RouterLink to="/contact">Contact</RouterLink>
	                    </div>
	                </footer>
	            </div>
	        </section>
        </main>
    </div>
</template>

<script setup>
    import { useSiteData } from '@/stores/siteData'
    import { ref, computed, onMounted } from 'vue'
    import { useRoute, useRouter } from "vue-router";
    import AboutQuery from '@/queries/AboutQuery.js'
    import MultipleContent from '@/components/MultipleContent.vue'

    const api = import.meta.env.VITE_API_ENDPOINT
    const site_data = useSiteData()
    const props = defineProps(['page_slug'])
    const route = useRoute()
    const router = useRouter()
    const token = route.query.token
    const page_unpublished = ref(null)

    console.log(route)

    
    onMounted( async() => {
        // Handle Draft
        if (token){
            const res = await fetch(api, {
                method: "post",
                body: AboutQuery.query(props.page_slug, 'draft')
                })
                const json = await res.json()
                console.log(json)
                page_unpublished.value = json.result
        } else {
            // Handle unlisted
            const in_pages = site_data.site.artists.find((artist) => props.page_slug == artist.slug)
            if (!in_pages){
                const res = await fetch(api, {
                    method: "post",
                    body: AboutQuery.query(props.page_slug, 'listed')
                    })
                    const json = await res.json()
                    console.log(json)
                    if (json.result != null){
                        page_unpublished.value = json.result
                    }
            }
        }
        if(page.value == null){
            router.push('/error')
        }
    })

    const page = computed(() => {
        // if route.query re-call kql before returning...
        if (page_unpublished.value && page_full.value){
            return page_full.value
        } else {
            console.log(site_data.site.pages)
            const filtered = site_data.site.artists.filter((artist) => artist.slug == props.page_slug)
            if (filtered.length){
                return filtered[0]
            } else {
                return null
            }
        }
    })

    const page_full = computed(() => {
        if (page_unpublished.value){
            return page_unpublished.value
        }
        // if route.query re-call kql before returning...
        const filtered = site_data.pages.filter((page) => page.slug == props.page_slug)
        if (filtered.length){
            return filtered[0]
        } else {
            return null
        }
    })


    const social = computed (()=>{
        return site_data.about?.social
    })


</script>
<style scoped>

 .visible {
    display: block;
 }

 .about-section {
    position: relative;
 }

 .about-contact {
    text-transform: none;
 }
 @media only screen and (min-width: 1200px) {
    .about-grid {
        grid-template-columns:repeat(3, 1fr);
        grid-column-gap:60px;
        display:grid
    }
 }
 .about-block-text {
    grid-row: auto;
 }

 .about-img-portrait {
    grid-column:2/span 1;
    width: 100%;
    padding-bottom: 1.5em;
 }

 .about-img-landscape {
    grid-column:2/span 3;
    width: 100%;
    padding-bottom: 1.5em;
 }

</style>