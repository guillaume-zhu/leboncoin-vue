<script setup>
import { RouterLink, RouterView } from 'vue-router'

import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <Header />
  <main>
    <RouterView />
  </main>
  <Footer />
</template>

<style scoped>
main {
  margin-top: calc(var(--header-height) + 30px);
}
</style>
