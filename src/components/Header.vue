<script setup>
import { RouterLink } from 'vue-router'
import { inject } from 'vue'

const GlobalStore = inject('GlobalStore')
// console.log(GlobalStore)
// console.log('cookie ---->', $cookies.get('userInfoCookie'))
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
        <button><font-awesome-icon :icon="['far', 'plus-square']" />Déposer une annonce</button>
        <div class="research-bar">research bar</div>
      </div>

      <!-- CONNECT BLOC -->
      <RouterLink :to="{ name: 'login' }" v-if="!GlobalStore.userInfo.value">
        <div class="connect">
          <font-awesome-icon :icon="['far', 'user']" />
          <p>Se connecter</p>
        </div>
      </RouterLink>

      <RouterLink :to="{ name: 'home' }" v-else @click="GlobalStore.logOut()">
        <div class="disconnect">
          <div class="connect">
            <font-awesome-icon :icon="['far', 'user']" />
            <p>{{ GlobalStore.userInfo.value.username }}</p>
          </div>
          <font-awesome-icon :icon="['fas', 'sign-out-alt']" />
        </div>
      </RouterLink>
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
