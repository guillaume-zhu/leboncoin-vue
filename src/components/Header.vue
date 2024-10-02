<script setup>
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { inject, ref } from 'vue'

const GlobalStore = inject('GlobalStore')
// console.log(GlobalStore)
// console.log('cookie ---->', $cookies.get('userInfoCookie'))

const route = useRoute()
const router = useRouter()

const research = ref('')

const handleSubmit = (event) => {
  console.log('Input search ------>', event.target[0].value)
  console.log('Route query ------>', route.query)

  const queries = { ...route.query }
  if (research.value) {
    queries.title = research.value
  } else {
    delete queries.title
  }

  queries.page = 1

  router.push({ name: 'home', query: queries })
}

const changeValue = (event) => {
  if (event.target.value === '') {
    const queries = { ...route.query }
    delete queries.title

    router.push({ name: 'home', query: queries })
  }
}
</script>

<template>
  <header>
    <!-- HEADER TOP PART -------------------->
    <div class="header-top container">
      <!-- LOGO -->
      <RouterLink :to="{ name: 'home' }">
        <img src="../assets/img/logo.svg" alt="leboncoin-logo" />
      </RouterLink>

      <!-- MID BUTTONS -->
      <div>
        <RouterLink :to="{ name: 'publish' }">
          <button><font-awesome-icon :icon="['far', 'plus-square']" />Déposer une annonce</button>
        </RouterLink>

        <div class="research-bloc">
          <form @submit.prevent="handleSubmit" class="research-bar">
            <input
              type="text"
              id="research"
              name="resarch"
              v-model="research"
              placeholder="Rechercher sur leboncoin"
              @input="changeValue"
            />
            <button class="research-button"><font-awesome-icon :icon="['fas', 'search']" /></button>
          </form>
        </div>
      </div>

      <!-- CONNECT BLOC -->
      <RouterLink :to="{ name: 'login' }" v-if="!GlobalStore.userInfo.value">
        <div class="connect">
          <font-awesome-icon :icon="['far', 'user']" />
          <p>Se connecter</p>
        </div>
      </RouterLink>

      <div class="disconnect" v-else>
        <RouterLink :to="{ name: 'profile' }">
          <div class="connect">
            <font-awesome-icon :icon="['far', 'user']" />
            <p>{{ GlobalStore.userInfo.value.username }}</p>
          </div>
        </RouterLink>
        <RouterLink :to="{ name: 'home' }" @click="GlobalStore.logOut()">
          <font-awesome-icon :icon="['fas', 'sign-out-alt']" />
        </RouterLink>
      </div>
    </div>

    <!-- HEADER BOTTOM PART -------------------->
    <nav class="header-bot container">
      <a href="">Immobilier</a>
      <p>⸱</p>
      <a href="">Véhicules</a>
      <p>⸱</p>
      <a href="">Location de vacances</a>
      <p>⸱</p>
      <a href="">Emploi</a>
      <p>⸱</p>
      <a href="">Mode</a>
      <p>⸱</p>
      <a href="">Maison & Jardin</a>
      <p>⸱</p>
      <a href="">Famille</a>
      <p>⸱</p>
      <a href="">Electronique</a>
      <p>⸱</p>
      <a href="">Loisirs</a>
      <p>⸱</p>
      <a href="">Autres</a>
    </nav>
  </header>
</template>

<style scoped>
header {
  height: var(--header-height);
  /* border: 1px solid peru; */
  padding: 10px;
  border-bottom: 1px solid black;
  position: fixed;
  top: 0px;
  background-color: white;
  width: 100%;
}

/* HEADER TOP -------------*/
.header-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  /* border: 1px solid red; */
}

.header-top img {
  width: 165px;
}

.header-top > div:nth-child(2) {
  display: flex;
  align-items: center;
  gap: 10px;
}

button > svg {
  margin-right: 10px;
}

/* SEARCH -------- */
.research-bloc {
  position: relative;
}

input[id*='research'] {
  height: 40px;
  width: 300px;
  border: none;
  border-radius: 15px;
  background-color: #f4f9fe;
  font-size: 16px;
  padding: 10px 15px;
}

.research-button {
  display: flex;
  height: 25px;
  width: 25px;
  justify-content: center;
  align-items: center;
  padding: 10px 10px;
  border-radius: 5px;
  position: absolute;
  top: 7.5px;
  right: 7.5px;
  cursor: pointer;
}

.research-button svg {
  margin: 0px 0px 0px 0px;
  color: black;
  font-size: 12px;
}

/* CONNECT BLOC ----*/
.connect {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
}

.connect > p {
  font-size: 12px;
}

.disconnect {
  display: flex;
  align-items: center;
  gap: 30px;
}

/* HEADER BOT -------------*/

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* border: 1px solid blue; */
  margin-top: 25px;
}

nav > a {
  text-decoration: none;
  font-size: 14px;
}
</style>
