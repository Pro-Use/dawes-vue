import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import LazyLoadDirective from "./directives/LazyLoadDirective";
import LazyLoadVideoDirective from "./directives/LazyLoadVideoDirective";
import VuePlyr from 'vue-plyr'
import 'vue-plyr/dist/vue-plyr.css'


const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(VuePlyr, {
    plyr: {
    	'vimeo':{
    		'autoplay': false,
    		'controls': false,
    		'mute': false
    	}
   	}
  })
app.directive('lazyload', LazyLoadDirective);
app.directive('lazyloadvideo', LazyLoadVideoDirective);

app.mount('#app')
