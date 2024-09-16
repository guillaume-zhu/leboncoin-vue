<script setup></script>

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

button {
  background-color: #ec5a12;
  border: none;
  /* width: 205px; */
  padding: 10px 15px;
  border-radius: 10px;
  color: white;
  font-size: 16px;
  font-weight: bold;
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
