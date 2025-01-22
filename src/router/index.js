import { createRouter, createWebHistory } from 'vue-router'
import ResultView from '../views/ResultView.vue'
import SearchArea from '@/components/SearchArea.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'search',
      component: SearchArea,
      children: [
        {
          path: '/:headCodeName/:orgCodeName?/:orgName',
          name: 'result',
          component: ResultView,
        },
      ],
    },
  ],
})

export default router
