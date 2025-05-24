import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/game',
      name: 'Game',
      component: () => import('../views/GameView.vue'),
    },
    {
      path: '/rank',
      name: 'Rank',
      component: () => import('../views/RankView.vue'),
    },
    {
      path: '/score',
      name: 'Score',
      component: () => import('../views/ScoreView.vue'),
    }
  ],
})

export default router
