<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'

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
      `https://site--strapileboncoin--2m8zk47gvydr.code.run/api/offers/${props.id}?populate=*`
    )
    const response = await axios.get(
      'https://site--strapileboncoin--2m8zk47gvydr.code.run/api/users/?populate=*'
    )

    offerInfo.value = data
    // console.log(offerInfo.value)

    usersInfo.value = response.data
    // console.log(usersInfo.value)
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

const isAvatar = (userId) => {
  for (let i = 0; i < usersInfo.value.length; i++) {
    if (usersInfo.value[i].id === userId) {
      //   console.log(usersInfo.value[i])
      owner = usersInfo.value[i]
      if (!owner.avatar) {
        return false
      } else if (owner.avatar) {
        return true
      }
    }
  }
}
</script>

<template>
  <main>
    <section class="container">
      <div v-if="!offerInfo">
        <p>En cours de chargement</p>
      </div>

      <div v-else>
        <!-- PARTIE HAUTE ------------>

        <!-- IMAGE OFFER -->
        <div class="top-part">
          <div class="img-bloc">
            <img :src="offerInfo.data.attributes.pictures.data[0].attributes.url" alt="" />

            <!-- BLOC USER DROITE -->
            <div class="right-bloc">
              <div class="user-info-bloc">
                <div class="avatar-user-bloc">
                  <img
                    :src="owner.avatar.url"
                    alt=""
                    v-if="isAvatar(offerInfo.data.attributes.owner.data.id)"
                  />

                  <h3>
                    {{ offerInfo.data.attributes.owner.data.attributes.username.toUpperCase() }}
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

              <div class="button-block">
                <button>Acheter</button>
                <button>Message</button>
              </div>
            </div>
          </div>
        </div>

        <!-- PARTIE BASSE ------------>
        <div class="bottom-part">
          <div>
            <h2>{{ offerInfo.data.attributes.title }}</h2>
            <h2>{{ offerInfo.data.attributes.price }}</h2>
            <p>{{ changeDate(offerInfo.data.attributes.publishedAt) }}</p>
          </div>

          <div>
            <h2>Description</h2>
            <p>{{ offerInfo.data.attributes.description }}</p>
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
img {
  width: 300px;
}
</style>
