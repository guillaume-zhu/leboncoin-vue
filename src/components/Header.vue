<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'

const offersInfo = ref(null)

onMounted(async () => {
  try {
    const { data } = await axios.get(
      'https://site--strapileboncoin--2m8zk47gvydr.code.run/api/offers'
    )

    offersInfo.value = data
    console.log(offersInfo.value)
  } catch (error) {
    console.log(error)
  }
})
</script>

<template>
  <header>
    <div class="header-top container">
      <img src="../assets/img/logo.svg" alt="leboncoin-logo" />
      <div>
        <button><font-awesome-icon :icon="['far', 'plus-square']" />Déposer une annonce</button>
        <div class="research-bar">research bar</div>
      </div>
      <div class="connect">
        <font-awesome-icon :icon="['far', 'user']" />
        <p>Se connecter</p>
      </div>
    </div>
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
}

/* HEADER TOP -------------*/
.header-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  /* border: 1px solid red; */
}

.header-top > img {
  width: 140px;
}

.header-top > div:nth-child(2) {
  display: flex;
  align-items: center;
  gap: 10px;
}

button > svg {
  margin-right: 10px;
}

.connect {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
}

.connect > p {
  font-size: 12px;
}

/* HEADER BOT -------------*/

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* border: 1px solid blue; */
  margin-top: 20px;
}

nav > a {
  text-decoration: none;
  font-size: 14px;
}
</style>
