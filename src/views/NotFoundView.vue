<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <main>
    <section class="container">
      <div>
        <p>404</p>
        <p>Perdu dans les</p>
        <p>RAYONS !</p>
      </div>

      <p>Désolés, on a cherché dans tous les coins, on n’a pas trouvé la bonne page.</p>

      <RouterLink :to="{ name: 'home' }">
        <font-awesome-icon :icon="['fas', 'arrow-left']" /> <span>Retour à l'accueil</span>
      </RouterLink>
    </section>
  </main>
</template>

<style scoped>
section {
  background-image: url(../assets/img/notfound-D8MXZORp.webp);
  background-repeat: no-repeat;
  background-position: right center;
  background-size: contain;
  height: calc(100vh - var(--header-height) - var(--footer-height));
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 100px;
}

section > div > p:first-child {
  font-size: 48px;
  font-weight: bold;
  color: #ec5a12;
}

section > div > p:nth-child(2) {
  font-size: 48px;
  font-weight: bold;
  color: black;
}

section > div > p:nth-child(3) {
  font-size: 62px;
  font-weight: bold;
  color: white;
  text-shadow: 0px 0px 5px #ec5a12;
}
</style>
