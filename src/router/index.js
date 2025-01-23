import { createRouter, createWebHistory } from 'vue-router'
import ResultView from '../views/components/ResultView.vue'
import SearchArea from '@/views/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: SearchArea,
      children: [
        {
          path: '/:headCodeName/:orgCodeName?/:orgName.html',
          name: 'result',
          component: ResultView,
        },
      ],
    },
  ],
})

export default router
