<template>
  <header>
  </header>

  <RouterView />
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { onMounted } from 'vue'

const api = import.meta.env.VITE_API_ENDPOINT

onMounted( async() => {
  const res = await fetch(api, {
    method: "post",
    body: JSON.stringify(
      {"query":"site",
        "select": {
            "url": true,
            "title": true,
            "contact": "site.children.find('contact').contact",
            "artists": {
                "query":"page('artists').children.listed",
                "select": {
                    "url": true,
                    "title": true,
                    "caption": true,
                    "display": true,
                    "biography": true,
                    "covers": {
                        "query": "page.cover.toFiles"
                        // Allow srcSet method!
                        // "select":{
                        //     "srcSet": "file.srcSet"
                        // }
                    },
                    "gallery": {
                        "query": "page.gallery.toFiles"
                    },
                    "albums":{
                        "query": "page.children.template('slideshow').listed",
                        "select": {
                            // "categories": "page.categories.split",
                            "url": true,
                            "title": true,
                            "cover": {
                                "query": "page.cover.toFile",
                                "select": {
                                    "orientation": true,
                                    "type": true,
                                    "slideType": true,
                                    "height": true,
                                    "width": true,
                                    "srcset": true,
                                    "src": "file.videoFile.toFile"
                                }
                            }
                        }
                    }
                }
            }
        }
      }
    )
  })
  console.log(res.json())
})

</script>

<style scoped>

</style>
