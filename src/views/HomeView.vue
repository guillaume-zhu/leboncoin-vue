<script setup>
import { computed, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import axios from 'axios'

const offersInfo = ref(null)
const usersInfo = ref(null)
let owner = ''

onMounted(async () => {
  try {
    const { data } = await axios.get(
      'https://site--strapileboncoin--2m8zk47gvydr.code.run/api/offers/?populate=*'
    )

    const response = await axios.get(
      'https://site--strapileboncoin--2m8zk47gvydr.code.run/api/users?populate=*'
    )

    offersInfo.value = data
    // console.log(offersInfo.value)

    usersInfo.value = response.data
    // console.log(usersInfo.value)
  } catch (error) {
    console.log(error)
  }
})
const isAvatar = (userId) => {
  for (let i = 0; i < usersInfo.value.length; i++) {
    // console.log(usersInfo.value[i])
    if (usersInfo.value[i].id === userId) {
      // console.log(usersInfo.value[i])
      owner = usersInfo.value[i]

      if (!owner.avatar) {
        return false
      } else if (owner.avatar) {
        return true
      }
    }
  }
}

const changeDate = (rawDate) => {
  let newDate = rawDate.slice(0, 10)
  let newDateArray = newDate.split('-')
  newDate = `${newDateArray[2]}/${newDateArray[1]}/${newDateArray[0]}`
  // console.log(newDate)
  return newDate
}

const priceSpace = (price) => {
  let newString = ''
  let priceString = price.toString()
  for (let i = priceString.length - 1; i > -1; i--) {
    newString = newString + priceString[i]
    // console.log(newString)
    if (i === priceString.length - 3 || i === priceString.length - 6) {
      newString = newString + ' '
    }
  }
  return newString.split('').reverse().join('')
}

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
      <div class="loading" v-if="!offersInfo || !usersInfo">
        <h1>En cours de chargement</h1>
      </div>

      <RouterLink
        v-else
        :to="{ name: 'offer', params: { id: offer.id } }"
        v-for="offer in offersInfo.data"
        :key="offer.id"
      >
        <div class="offer">
          <div>
            <div class="offer-user">
              <img
                :src="owner.avatar.url"
                alt=""
                v-if="isAvatar(offer.attributes.owner.data.id) === true"
              />

              <p>{{ offer.attributes.owner.data.attributes.username }}</p>
            </div>

            <img class="offer-img" :src="offer.attributes.pictures.data[0].attributes.url" alt="" />

            <div>
              <p class="offer-title">{{ offer.attributes.title }}</p>

              <p class="offer-price">{{ priceSpace(offer.attributes.price) }} €</p>
            </div>
          </div>

          <div class="offer-date-like-bloc">
            <p class="p-date">{{ changeDate(offer.attributes.publishedAt) }}</p>
            <font-awesome-icon :icon="['far', 'heart']" />
          </div>
        </div>
      </RouterLink>
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

/* OFFERS  --------------*/

.offer-section {
  margin-top: 50px;
  /* border: 1px solid purple; */
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.offer {
  /* border: 1px solid blue; */
  width: calc((1050px - 40px) / 5);
  height: 380px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 30px;
}

/* AVATAR + USER */

.offer-user {
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  gap: 5px;
  margin-bottom: 10px;
}

.offer-user > img {
  width: 25px;
  height: 25px;
  object-fit: cover;
  border-radius: 50px;
}

.offer-user > p {
  font-size: 14px;
  font-weight: bold;
}

/* IMG + CONTENT */

.offer-img {
  width: 100%;
  height: 240px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 10px;
}

.offer-price,
.offer-title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
}

.offer-date-like-bloc {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.offer-date-like-bloc svg {
  font-size: 20px;
}
</style>
