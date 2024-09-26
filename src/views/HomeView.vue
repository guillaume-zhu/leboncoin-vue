<script setup>
import { computed, onMounted, ref, watchEffect } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import axios from 'axios'
import OfferCard from '@/components/OfferCard.vue'
import Filters from '@/components/Filters.vue'

const router = useRouter()
const props = defineProps(['pricemin', 'pricemax', 'sort', 'page', 'title'])

// console.log('props ---->', props)

const offersInfo = ref(null)
const numberOfPages = ref(1)
const pagination = ref()

const handlePreviousPage = () => {
  const queries = { ...props }

  queries.page = queries.page - 1

  router.push({ name: 'home', query: queries })
}

const handleNextPage = () => {
  const queries = { ...props }

  queries.page = queries.page + 1

  router.push({ name: 'home', query: queries })
}

const handleActivePage = (number) => {
  const queries = { ...props }

  queries.page = number

  router.push({ name: 'home', query: queries })
}

onMounted(() => {
  watchEffect(async () => {
    try {
      let filtersPriceMax = ''
      if (!props.pricemax) {
        filtersPriceMax = ''
      } else {
        filtersPriceMax = '&filters[price][$lte]' + '=' + props.pricemax
        console.log('filtersPriceMax ----->', filtersPriceMax)
      }

      let filtersPriceMin = ''
      if (!props.pricemin) {
        filtersPriceMin = ''
      } else {
        filtersPriceMin = '&filters[price][$gte]' + '=' + props.pricemin
        console.log('filtersPriceMin ----->', filtersPriceMin)
      }
      const { data } = await axios.get(
        `https://site--strapileboncoin--2m8zk47gvydr.code.run/api/offers/?populate[0]=pictures&populate[1]=owner.avatar${filtersPriceMax}${filtersPriceMin}&sort=${props.sort}&filters[title][$containsi]=${props.title}&pagination[pageSize]=10&pagination[page]=${props.page}`
      )

      offersInfo.value = data.data
      // console.log(offersInfo.value)

      console.log('data.meta ----->', data.meta)

      numberOfPages.value = data.meta.pagination.pageCount
      console.log('number of pages ----->', numberOfPages.value)

      pagination.value = data.meta.pagination
      console.log('pagination ------>', pagination.value)
    } catch (error) {
      console.log(error)
    }
  })
})
</script>

<template>
  <main>
    <!-- FILTERS  ----------------->
    <section class="container">
      <Filters :pricemin="pricemin" :pricemax="pricemax" :sort="sort" />
    </section>

    <!-- ANNONCES  ----------------->
    <section>
      <h1 class="container">
        Des millions de petites annonces et autant d'occasions de se faire plaisir
      </h1>

      <div class="container banniere">
        <img src="../assets/img/onde-corail.svg" alt="onde-corail-leboncoin" />
        <div>
          <p>C'est le moment de vendre</p>
          <button><font-awesome-icon :icon="['far', 'plus-square']" />Déposer une annonce</button>
        </div>
        <img src="../assets/img/feuille-bleue.svg" alt="feuille-bleue-leboncoin" />
      </div>
    </section>

    <!-- OFFERS  ----------------->
    <section class="offer-section container">
      <div class="loading" v-if="!offersInfo">
        <h1>En cours de chargement</h1>
      </div>

      <OfferCard v-else :offersInfo="offersInfo" />
    </section>

    <!-- PAGINATION  ----------------->
    <div class="page-bar container">
      <font-awesome-icon
        :icon="['fas', 'chevron-left']"
        @click="handlePreviousPage"
        v-if="page > 1"
      />

      <div v-for="number in numberOfPages" :class="{ ifActivePage: number === page }">
        <p @click="handleActivePage(number)">
          {{ number }}
        </p>
      </div>

      <font-awesome-icon
        :icon="['fas', 'chevron-right']"
        @click="handleNextPage"
        v-if="page < numberOfPages"
      />
    </div>
  </main>
</template>

<style scoped>
main {
  height: calc(100vh - var(--header-heigt) - var(--footer-height));
}

.loading {
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
}

.loading > h1 {
  text-align: center;
}

h1 {
  margin-top: 30px;
  margin-bottom: 30px;
}

/* BANNIÈRE TOP  --------*/
.banniere {
  display: flex;
  justify-content: space-between;
  border-radius: 15px;
  background-color: #ffe9de;
  height: 80px;
  overflow-x: hidden;
}

.banniere > div {
  display: flex;
  justify-content: center;
  align-items: center;
}

.banniere > div > p {
  font-size: 20px;
  font-weight: bold;
  margin-right: 20px;
}

.offer-section {
  margin-top: 50px;
  /* border: 1px solid purple; */
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

/* PAGINATION --------*/
.page-bar {
  display: flex;
  /* border: 1px solid red; */
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
}

.page-bar svg {
  font-size: 12px;
  cursor: pointer;
}

.page-bar svg:first-child {
  margin-right: 20px;
}

.page-bar svg:last-child {
  margin-left: 20px;
}

.page-bar > div {
  /* border: 1px solid purple; */
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  cursor: pointer;
}

.ifActivePage {
  font-weight: bold;
  background-color: #142333;
  color: white;
}
</style>
