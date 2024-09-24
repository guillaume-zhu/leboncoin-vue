<script setup>
import { RouterLink, RouterView } from 'vue-router'

import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <Header />

  <RouterView />

  <Footer />
</template>

<style scoped>
main {
  margin-top: calc(var(--header-height));
  height: calc(100vh - var(--header-height) - var(--footer-height));
}
</style>
