<script setup>
import axios from 'axios'
import { useRouter, RouterLink } from 'vue-router'
import { onMounted, ref, inject } from 'vue'

const GlobalStore = inject('GlobalStore')
const router = useRouter()

const isLoading = ref(false)
const userInfo = ref(null)

onMounted(async () => {
  isLoading.value = true
  try {
    const { data } = await axios.get(
      'https://site--strapileboncoin--2m8zk47gvydr.code.run/api/users/me?populate[0]=offers&populate[1]=avatar&populate[2]=offers.pictures',
      { headers: { Authorization: `Bearer ${GlobalStore.userInfo.value.token}` } }
    )

    userInfo.value = data
    console.log('response axios data ------>', data)
  } catch (error) {
    console.log(error)
  }
  isLoading.value = false
})

const handleDelete = async (offerId) => {
  try {
    const { data } = await axios.delete(
      `https://site--strapileboncoin--2m8zk47gvydr.code.run/api/offers/${offerId}`,
      { headers: { Authorization: `Bearer ${GlobalStore.userInfo.value.token}` } }
    )

    router.go()
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <main>
    <h1 v-if="!userInfo">En cours de chargement</h1>

    <div class="container" v-else>
      <!-- USER INFO BLOC ------------->
      <div class="user-bloc">
        <!-- IF HAVE AVATAR -->
        <img v-if="userInfo.avatar" src="" alt="" />

        <!-- IF DONT HAVE AVATAR -->
        <div class="no-avatar" v-else>
          <p>{{ userInfo.username[0] }}</p>
        </div>

        <div class="user-text-info">
          <h1>{{ userInfo.username }}</h1>
          <p>{{ userInfo.email }}</p>
        </div>
      </div>

      <!-- NUMBER OF OFFERS ------------->
      <h3>{{ userInfo.offers.length }} annonces</h3>

      <!-- OFFERS LIST BLOC ------------->

      <RouterLink
        :to="{ name: 'offer', params: { id: offer.id } }"
        v-for="offer in userInfo.offers"
        :key="offer.id"
      >
        <div class="offer">
          <div>
            <!-- IF HAVE PICTURES -->
            <img :src="offer.pictures[0].url" alt="image-offre" v-if="offer.pictures" />

            <!-- IF DONT HAVE PICTURES -->
            <div class="no-offer-picture" v-else></div>

            <p>{{ offer.title }}</p>
          </div>

          <div>
            <h3>{{ offer.price }} €</h3>
            <font-awesome-icon @click="handleDelete(offer.id)" :icon="['fas', 'trash']" />
          </div>
        </div>
      </RouterLink>
    </div>
  </main>
</template>

<style scoped>
main > div:first-child {
  padding: 40px;
  display: flex;
  flex-direction: column;
  gap: 30px;
}

/* USER INFO BLOC ----------------*/
.user-bloc {
  border: 1px solid black;
  border-radius: 15px;
  padding: 15px;
  display: flex;
}

.user-text-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-left: 20px;
  gap: 10px;
}

.user-text-info > h1 {
  text-align: left;
}

/* IF DONT HAVE AVATAR */
.no-avatar {
  width: 100px;
  height: 100px;
  background-color: #637c93;
  border-radius: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.no-avatar > p {
  font-size: 40px;
  color: white;
}

/* IF HAVE AVATAR */
.user-bloc img {
  width: 100px;
  height: 100px;
  border-radius: 50px;
  object-fit: cover;
}

/* OFFERS LIST BLOC ----------------*/

.offer {
  width: 100%;
  padding: 15px;
  box-shadow: 0px 0px 10px lightgray;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* margin-bottom: 20px; */
}

.offer > div:first-child {
  display: flex;
  align-items: center;
}

.offer > div:last-child {
  display: flex;
  align-items: center;
}

.offer > div:last-child h3 {
  color: #89380f;
}

.offer svg {
  color: #ec5a12;
  margin-left: 20px;
  font-size: 20px;
  margin-top: -4px;
  cursor: pointer;
}

.offer img {
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 5px;
}

.offer p {
  font-size: 22px;
  font-weight: bold;
  margin-left: 30px;
}
</style>
