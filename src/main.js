import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faClock, faHeart, faPlusSquare, faUser } from '@fortawesome/free-regular-svg-icons'
import {
  faCheckDouble,
  faChevronLeft,
  faChevronRight,
  faMapMarkerAlt
} from '@fortawesome/free-solid-svg-icons'

library.add(
  faUser,
  faPlusSquare,
  faHeart,
  faCheckDouble,
  faClock,
  faMapMarkerAlt,
  faChevronRight,
  faChevronLeft
)

const app = createApp(App)

app.use(router)

app.component('font-awesome-icon', FontAwesomeIcon).mount('#app')
