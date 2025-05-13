import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CollectionView from '../views/CollectionView.vue'


const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/collection',
      name: 'Collection',
      component: CollectionView
    },
    // {
    //   path: '/design-space',
    //   name: 'DesignSpace',
    //   component: () => import('../views/DesignSpace.vue')
    // },
  ]
})

export default router
