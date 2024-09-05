<template>
	<div class="main-wrapper" data-page="container" data-order="0">
	    <main id="main" class="main page-content contact-content">
	            <header class="site-header">
	                <h1 class="site-title">
	                    <router-link to="/">
	                        <span class="visuallyhidden">{{site_data.site.title}}</span>
	                        <logo1 />
	                    </router-link>
	                </h1>
	            </header>
	            <div id="contact" class="contact-wrapper">
	                    <div class="contact-details">
	                        <div class="body-content">
	                            Page not found
	                        </div>
	                    </div>
	                    <footer class="home-footer">
	                        <router-link to="/" class="contact-link contact-link-toggle prevent cap">Artists</router-link> 
	                    </footer>
	            </div>

	    </main>
	</div>
</template>

<script setup>
	import { useSiteData } from '@/stores/siteData'
	import logo1 from '@/components/icons/logo1.vue'

	const site_data = useSiteData()
	
</script>