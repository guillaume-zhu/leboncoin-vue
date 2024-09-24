<script setup>
import { computed, onMounted, ref } from 'vue'
import axios from 'axios'
import { useCycleList } from '@vueuse/core'

const props = defineProps({
  id: {
    type: String,
    Required: true
  }
})

const offerInfo = ref(null)
const usersInfo = ref(null)

let owner = ''

onMounted(async () => {
  try {
    const { data } = await axios.get(
      `https://site--strapileboncoin--2m8zk47gvydr.code.run/api/offers/${props.id}?populate[0]=pictures&populate[1]=owner.avatar`
    )

    offerInfo.value = data.data
    // console.log(offerInfo.value)
  } catch (error) {
    console.log(error)
  }
})

const changeDate = (rawDate) => {
  let newDate = rawDate.slice(0, 10)
  let newDateArray = newDate.split('-')
  newDate = `${newDateArray[2]}/${newDateArray[1]}/${newDateArray[0]}`
  // console.log(newDate)
  return newDate
}

const cycleList = computed(() => {
  if (offerInfo.value.attributes.pictures.data) {
    const { state, next, prev } = useCycleList(offerInfo.value.attributes.pictures.data)
    // console.log(state)

    return { state, next, prev }
  } else {
    return {}
  }
})
</script>

<template>
  <main>
    <section class="container">
      <div class="loading" v-if="!offerInfo">
        <h1>En cours de chargement</h1>
      </div>

      <div v-else>
        <!-- PARTIE HAUTE ------------>

        <div class="top-part">
          <!-- IMAGE OFFER -->
          <div
            class="img-bloc"
            :class="{ noMorePicture: offerInfo.attributes.pictures.data?.length < 2 }"
          >
            <font-awesome-icon
              :icon="['fas', 'chevron-left']"
              @click="cycleList.prev()"
              v-if="offerInfo.attributes.pictures.data?.length > 1"
            />
            <img :src="cycleList.state.value.attributes.url" alt="" />
            <font-awesome-icon
              :icon="['fas', 'chevron-right']"
              @click="cycleList.next()"
              v-if="offerInfo.attributes.pictures.data?.length > 1"
            />
          </div>

          <!-- BLOC USER DROITE -->
          <div class="right-bloc">
            <div class="user-info-bloc">
              <div class="avatar-user-bloc">
                <img
                  :src="offerInfo.attributes.owner.data.attributes.avatar.data.attributes.url"
                  alt=""
                  v-if="offerInfo.attributes.owner.data.attributes.avatar.data"
                />

                <h3>
                  {{ offerInfo.attributes.owner.data.attributes.username.toUpperCase() }}
                </h3>
              </div>

              <div class="identity-check-bloc">
                <font-awesome-icon :icon="['fas', 'check-double']" />
                <p>Pièce d'identité vérifiée</p>
              </div>

              <div class="answer-bloc">
                <font-awesome-icon :icon="['far', 'clock']" />
                <p>Répond généralement en 1 heure</p>
              </div>
            </div>

            <div class="button-bloc">
              <button>Acheter</button>
              <button>Message</button>
            </div>
          </div>
        </div>

        <!-- PARTIE BASSE ------------>
        <div class="bottom-part">
          <div>
            <h1>{{ offerInfo.attributes.title }}</h1>
            <h2>{{ offerInfo.attributes.price }} €</h2>
            <p class="p-date">{{ changeDate(offerInfo.attributes.publishedAt) }}</p>
          </div>

          <div class="description-bloc">
            <h2>Description</h2>
            <p>{{ offerInfo.attributes.description }}</p>
          </div>

          <div>
            <font-awesome-icon :icon="['fas', 'map-marker-alt']" />
            <p>Agon-Coutainville (50230)</p>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
main {
  padding: 30px 0px;
  height: calc(100vh - var(--header-heigt) - var(--footer-height));
  margin-bottom: 12px;
}

.loading {
  height: 100vh;
  /* width: 100vw; */
  display: flex;
  justify-content: center;
}

/* PARTIE HAUTE --------------------------- */

.top-part {
  /* border: 1px solid red; */
  display: flex;
  justify-content: space-between;
  gap: 30px;
}

/* IMAGE OFFER --------- */
.img-bloc {
  width: 650px;
  height: 350px;
  /* border: 1px solid blue; */
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.noMorePicture {
  justify-content: center;
}

.img-bloc > img {
  height: 350px;
  object-fit: cover;
}

.img-bloc > svg {
  cursor: pointer;
}

/* USER BLOC  ---------- */
.right-bloc {
  /* border: 1px solid lightgray; */
  box-shadow: 0px 0px 5px lightgray;
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 375px;
}

.user-info-bloc {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* AVATAR BLOCK */
.avatar-user-bloc {
  display: flex;
}

.avatar-user-bloc > img {
  width: 65px;
  height: 65px;
  border-radius: 50px;
  margin-right: 10px;
}

/* IDENTITY CHECK */
.identity-check-bloc {
  display: flex;
  background-color: #ffe9de;
  width: fit-content;
  padding: 5px;
  border-radius: 50px;
}

.identity-check-bloc > svg {
  font-size: 12px;
  margin-right: 5px;
}

.identity-check-bloc > p {
  font-size: 12px;
}

/* ANSWER TIME */
.answer-bloc {
  display: flex;
}

.answer-bloc > svg {
  font-size: 14px;
  margin-right: 5px;
}

.answer-bloc > p {
  font-size: 14px;
}

/* BUTTON BLOC */
.button-bloc {
  /* border: 1px solid purple; */
  display: flex;
  flex-direction: column;
  padding-top: 15px;
  border-top: 1px solid lightgray;
}

.button-bloc > button {
  margin: 5px 0px;
  height: 50px;
}

.button-bloc > button:nth-child(2) {
  background-color: #094171;
}

/* PARTIE BASSE --------------------------- */

.bottom-part > div:first-child {
  border-bottom: 1px solid lightgray;
  width: 650px;
}
h1 {
  text-align: start;
  margin-bottom: 35px;
}

h2 {
  margin-bottom: 25px;
}

.p-date {
  margin-bottom: 50px;
}

.description-bloc {
  border-bottom: 1px solid lightgray;
}

.description-bloc > h2 {
  margin-top: 25px;
  margin-bottom: 30px;
}

.description-bloc > p {
  margin-bottom: 55px;
  font-size: 16px;
}

.bottom-part > div:last-child {
  display: flex;
  margin-top: 25px;
}

.bottom-part > div:last-child > svg {
  font-size: 16px;
  margin-right: 5px;
}

.bottom-part > div:last-child > p {
  font-size: 16px;
}
</style>
