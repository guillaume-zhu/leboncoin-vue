import './assets/main.css'

import { createApp, ref } from 'vue'
import App from './App.vue'
import router from './router'
import VueCookies from 'vue-cookies'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faClock,
  faEye,
  faEyeSlash,
  faHeart,
  faPlusSquare,
  faUser
} from '@fortawesome/free-regular-svg-icons'
import {
  faArrowRight,
  faCamera,
  faCheckDouble,
  faChevronLeft,
  faChevronRight,
  faMapMarkerAlt,
  faSearch,
  faSignOutAlt
} from '@fortawesome/free-solid-svg-icons'

library.add(
  faUser,
  faPlusSquare,
  faHeart,
  faCheckDouble,
  faClock,
  faMapMarkerAlt,
  faChevronRight,
  faChevronLeft,
  faArrowRight,
  faSignOutAlt,
  faEye,
  faEyeSlash,
  faSearch,
  faCamera
)

const app = createApp(App)

app.use(router)
app.use(VueCookies)

// PROVIDER STORE

const userInfo = ref($cookies.get('userInfoCookie') || '')

const createUserInfo = (token, username, id) => {
  userInfo.value = { token: token, username: username, id: id }
  $cookies.set('userInfoCookie', userInfo.value)
}

const logOut = () => {
  $cookies.remove('userInfoCookie')
  userInfo.value = ''
}

app.provide('GlobalStore', {
  userInfo: userInfo,
  createUserInfo: createUserInfo,
  logOut: logOut
})

app.component('font-awesome-icon', FontAwesomeIcon).mount('#app')
