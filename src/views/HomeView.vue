<script setup>
import { computed, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import axios from 'axios'
import OfferCard from '@/components/OfferCard.vue'

const offersInfo = ref(null)

onMounted(async () => {
  try {
    const { data } = await axios.get(
      ' https://site--strapileboncoin--2m8zk47gvydr.code.run/api/offers/?populate[0]=pictures&populate[1]=owner.avatar'
    )

    const response = await axios.get(
      'https://site--strapileboncoin--2m8zk47gvydr.code.run/api/users?populate=*'
    )

    offersInfo.value = data.data
    console.log(offersInfo.value)

    // console.log(usersInfo.value)
  } catch (error) {
    console.log(error)
  }
})

// const priceSpace = (price) => {
//   let newString = ''
//   let priceString = price.toString()
//   let priceArray = priceString.split('')

//   if (priceArray.length > 3) {
//     priceArray = priceArray.reverse()

//     for (let i = 0; i < priceArray.length; i++) {
//       newString = newString + priceArray[i]
//       if (i === 2 || i === 5 || i === 8 || i === 11) {
//         newString = newString + ' '
//       }
//     }
//     return newString.split('').reverse().join('')
//   } else return priceArray.join('')
// }
</script>

<template>
  <main>
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

    <section class="offer-section container">
      <div class="loading" v-if="!offersInfo">
        <h1>En cours de chargement</h1>
      </div>

      <OfferCard v-else :offersInfo="offersInfo" />
    </section>
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

section > h1:first-child {
  margin-top: 140px;
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
</style>
