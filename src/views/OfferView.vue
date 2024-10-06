<script setup>
import { computed, onMounted, ref } from 'vue'
import axios from 'axios'
import { useCycleList } from '@vueuse/core'
import { RouterLink } from 'vue-router'

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
      `https://site--backend-leboncoin-exercice--fbdk2fdpdqp5.code.run/api/offers/${props.id}?populate[0]=pictures&populate[1]=owner.avatar&populate[2]=owner.offers`
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
              <RouterLink :to="{ name: 'payment', params: { id: id } }">
                <button class="buy-button">Acheter</button>
              </RouterLink>
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

          <!-- BUTTON BLOC RESPONSIVE DISPLAY ONLY -->
          <div class="button-responsive-bloc">
            <RouterLink :to="{ name: 'payment', params: { id: id } }">
              <button class="buy-button">Acheter</button>
            </RouterLink>
          </div>

          <!-- USER BLOC RESPONSIVE DISPLAY ONLY -->
          <div class="user-responsive-bloc">
            <img
              :src="offerInfo.attributes.owner.data.attributes.avatar.data.attributes.url"
              alt="avatar"
              v-if="offerInfo.attributes.owner.data.attributes.avatar.data"
            />

            <div>
              <h3>{{ offerInfo.attributes.owner.data.attributes.username }}</h3>
              <p>
                {{ offerInfo.attributes.owner.data.attributes.offers.data.length }}
                {{
                  offerInfo.attributes.owner.data.attributes.offers.data.length > 1
                    ? 'annonces'
                    : 'annonce'
                }}
              </p>
            </div>
          </div>

          <!-- PROTECTION BLOC -->
          <div class="protection-bloc">
            <img src="../assets/img/secured-payment.svg" alt="protection" />

            <div>
              <div class="euro">€</div>
              <p>Votre argent est sécurisé et versé au bon moment</p>
            </div>

            <div>
              <div class="comments">
                <font-awesome-icon :icon="['far', 'comments']" />
              </div>
              <p>Notre service client dédié vous accompagne</p>
            </div>

            <div>
              <p>En savoir plus</p>
              <font-awesome-icon :icon="['fas', 'arrow-right']" />
            </div>
          </div>

          <!-- DESCRIPTION BLOC -->
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

      <!-- FOOTER RESPONSIVE DISPLAY ONLY -->
    </section>
  </main>
  <div class="offer-footer">
    <button>Contacter</button>
    <button>Acheter</button>
  </div>
</template>

<style scoped>
template {
  position: relative;
}
main {
  padding: 30px;
}

.section {
  position: relative;
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
  max-width: 80%;
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
  object-fit: cover;
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

.button-bloc > button,
.buy-button {
  margin: 5px 0px;
  height: 50px;
  width: 100%;
}

.button-bloc > button:nth-child(2) {
  background-color: #094171;
}

.button-bloc > a {
  width: 100%;
}

/* PARTIE BASSE --------------------------- */

/* OFFER INFO -------*/
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

/* PROTECTION BLOC ----- */
.protection-bloc {
  padding: 25px 0px;
  border-bottom: 1px solid lightgray;
}

.protection-bloc > div {
  display: flex;
  margin: 15px 0px;
  align-items: center;
  gap: 10px;
}

.euro,
.comments {
  background-color: #e6f2fd;
  /* border: 1px solid red; */
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
}

.protection-bloc > div:last-child > p {
  font-weight: bold;
}

.protection-bloc > div:last-child {
  margin: 0px;
  margin-top: 20px;
}

/* DESCRIPTION --------- */
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

/* MEDIA -------------------------------------- */

.user-responsive-bloc {
  display: none;
}

.button-responsive-bloc {
  display: none;
}

.offer-footer {
  display: none;
}

/* 970px */
@media (max-width: 970px) {
  .right-bloc {
    display: none;
  }

  .img-bloc {
    width: 100%;
  }

  .bottom-part > div:first-child {
    width: 100%;
    /* padding-bottom: 20px; */
    /* background-color: red; */
  }

  /* BUTTON BLOC RESPONSIVE ----------*/
  .button-responsive-bloc {
    padding: 25px 0px;
    border-bottom: 1px solid lightgray;
    border-top: none;
    display: block;
  }

  /* USER BLOC RESPONSIVE ----------- */
  .user-responsive-bloc {
    display: flex;
    align-items: center;
    /* border: 1px solid blue; */
    padding: 25px 0px;
    border-bottom: 1px solid lightgray;
  }

  .user-responsive-bloc > img {
    width: 65px;
    height: 65px;
    border-radius: 50px;
    margin-right: 20px;
  }

  .user-responsive-bloc > div:nth-child(2) {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  /* FOOTER RESPONSIVE */
  .offer-footer {
    /* border: 1px solid red; */
    background-color: white;
    width: 100vw;
    height: 75px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 15px;
    padding: 20px;
    position: fixed;
    bottom: 0px;
  }

  .offer-footer > button {
    flex: 1;
    height: 45px;
  }

  .offer-footer > button:first-child {
    border: 1px solid black;
    background-color: white;
    color: black;
  }
}
</style>
