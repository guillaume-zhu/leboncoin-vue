import './assets/main.css'

import { createApp, ref } from 'vue'
import App from './App.vue'
import router from './router'

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
  faCheckDouble,
  faChevronLeft,
  faChevronRight,
  faMapMarkerAlt,
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
  faEyeSlash
)

const app = createApp(App)

app.use(router)

// PROVIDER STORE
const changeToken = (token) => {
  userToken.value = token
}

const changeUserName = (name) => {
  userName.value = name
}

const logOut = () => {
  userToken.value = ''
  userName.value = ''
}

const userToken = ref('')
const userName = ref('')

app.provide('GlobalStore', {
  userToken: userToken,
  userName: userName,
  changeToken: changeToken,
  changeUserName: changeUserName,
  logOut: logOut
})

app.component('font-awesome-icon', FontAwesomeIcon).mount('#app')
