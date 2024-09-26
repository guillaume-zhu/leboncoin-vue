import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import OfferView from '@/views/OfferView.vue'
import SignupView from '@/views/SignupView.vue'
import LoginView from '@/views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      props: (route) => {
        return {
          pricemin: Number(route.query.pricemin) || '',
          pricemax: Number(route.query.pricemax) || '',
          sort: route.query.sort || '',
          page: parseInt(route.query.page) || 1,
          title: route.query.title || ''
        }
      }
    },
    {
      path: '/offer/:id',
      name: 'offer',
      component: () => import('../views/OfferView.vue'),
      props: true
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('../views/SignupView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    }
  ],
  // SCROLL BEHAVIOR
  scrollBehavior() {
    return { top: 0, left: 0 }
  }
})

export default router
