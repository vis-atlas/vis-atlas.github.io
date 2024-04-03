import './assets/main.css'

import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import MasonryWall from '@yeger/vue-masonry-wall'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router).use(ElementPlus)
.use(MasonryWall)
app.mount('#app')
