<script setup>
import { RouterLink } from 'vue-router'

const props = defineProps({
  offersInfo: {
    type: Object
  }
})

if (window.matchMedia('(max-width: 1075px)').matches) {
  console.log(true)
} else {
  console.log(false)
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
</script>

<template>
  <RouterLink
    :to="{ name: 'offer', params: { id: offer.id } }"
    v-for="offer in offersInfo"
    :key="offer.id"
  >
    <div class="offer">
      <div>
        <!-- <p>{{ offer.attributes.owner.data.avatar }}</p> -->
        <div class="offer-user">
          <img
            :src="offer.attributes.owner.data.attributes.avatar.data.attributes.url"
            alt=""
            v-if="offer.attributes.owner?.data.attributes.avatar.data"
          />

          <p>{{ offer.attributes.owner?.data.attributes.username }}</p>
        </div>

        <img
          v-if="offer.attributes.pictures.data"
          class="offer-img"
          :src="offer.attributes.pictures.data[0].attributes.url"
          alt=""
        />

        <div v-else class="no-img-offer"></div>

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
</template>

<style scoped>
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

.no-img-offer {
  width: 100%;
  height: 240px;
  background-color: grey;
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

/* MEDIA */

/* 1090px */
@media (max-width: 1090px) {
  .offer {
    width: 100%;
    height: 100%;
    justify-content: flex-start;
    margin-bottom: 20px;
  }
  a {
    width: calc((100% - 60px) / 4);
  }

  .offer-img {
    height: 300px;
  }
}

/* 880px */
@media (max-width: 880px) {
  a {
    width: calc((100% - 40px) / 3);
    /* margin-bottom: 20px; */
  }

  .offer-img {
    height: 300px;
  }
}

/* 680 */
@media (max-width: 680px) {
  a {
    width: calc((100% - 40px) / 3);
  }

  .offer-img {
    height: 200px;
  }
}

/* 460px */
@media (max-width: 460px) {
  a {
    width: calc((100% - 20px) / 2);
  }

  .offer-img {
    max-height: 180px;
  }
}
</style>
