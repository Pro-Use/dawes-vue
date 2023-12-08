import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import LazyLoadDirective from "./directives/LazyLoadDirective";
import LazyLoadVideoDirective from "./directives/LazyLoadVideoDirective";
import VuePlyr from 'vue-plyr'
import 'vue-plyr/dist/vue-plyr.css'
import Vue3Marquee from 'vue3-marquee'
import { createHead } from '@unhead/vue'


const pinia = createPinia()
const app = createApp(App)
const head = createHead()

app.use(pinia)
app.use(router)
app.use(VuePlyr, {
    plyr: {
        'controls':['play-large'],
    	'vimeo':{
    		'autoplay': false,
    		'controls': false,
    		'mute': false
    	}
   	}
  })
app.use(Vue3Marquee)
app.use(head)
app.directive('lazyload', LazyLoadDirective);
app.directive('lazyloadvideo', LazyLoadVideoDirective);

app.mount('#app')
