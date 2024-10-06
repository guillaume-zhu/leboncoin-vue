import { createRouter, createWebHistory } from 'vue-router'
import { inject } from 'vue'
import HomeView from '../views/HomeView.vue'
import OfferView from '@/views/OfferView.vue'
import SignupView from '@/views/SignupView.vue'
import LoginView from '@/views/LoginView.vue'
import PublishView from '@/views/PublishView.vue'
import PaymentView from '@/views/PaymentView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import ProfileView from '@/views/ProfileView.vue'

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
    },
    {
      path: '/publish',
      name: 'publish',
      component: () => import('../views/PublishView.vue')
      // meta: { requiredAuth: true }
    },
    {
      path: '/payment/:id',
      name: 'payment',
      component: PaymentView,
      props: true
      // meta: { requiredAuth: true }
    },
    {
      path: '/:catchAll(.*)',
      name: 'notFound',
      component: NotFoundView
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
      meta: { requiredAuth: true }
    }
  ],
  // SCROLL BEHAVIOR
  scrollBehavior() {
    return { top: 0, left: 0 }
  }
})

router.beforeEach((to, from) => {
  const GlobalStore = inject('GlobalStore')
  // console.log('GlobalStore ----->', GlobalStore.userInfo.value)
  // console.log('to ---->', to)
  // console.log('from ---->', from)

  if (to.meta.requiredAuth === true && !GlobalStore.userInfo.value?.token) {
    return { name: 'login', query: { redirect: to.path } }
  }
})
export default router
