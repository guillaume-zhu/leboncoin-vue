<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useWindowSize } from '@vueuse/core'

const router = useRouter()
const { width, height } = useWindowSize()
const props = defineProps(['pricemax', 'pricemin', 'sort', 'page', 'title'])

const priceMin = ref(props.pricemin)
const priceMax = ref(props.pricemax)
const sort = ref(props.sort)

const handleInput = () => {
  const queries = { ...props }

  if (!priceMin) {
    delete queries.pricemin
  }
  queries.pricemin = priceMin.value

  if (!priceMax) {
    delete queries.pricemax
  }
  queries.pricemax = priceMax.value

  if (!sort) {
    delete queries.sort
  }
  queries.sort = sort.value

  queries.page = 1

  console.log('queries copy ------->', queries)
  router.push({ name: 'home', query: queries })
}
</script>

<template>
  <form @submit.prevent="handleInput">
    <div class="price-bloc">
      <p>Prix</p>

      <div class="min-max-bloc">
        <label>
          <input
            type="number"
            name="priceMin"
            id="priceMin"
            min="0"
            v-model="priceMin"
            placeholder="Minimum"
          />
          <div class="euro-bloc"><span>€</span></div></label
        >
        <label>
          <input
            type="number"
            name="priceMax"
            id="priceMax"
            :min="priceMin"
            v-model="priceMax"
            placeholder="Maximum"
          />
          <div class="euro-bloc"><span>€</span></div></label
        >
      </div>
    </div>
    <div class="sort-bloc">
      <p>Tri</p>

      <div>
        <label
          >{{ width > 460 ? 'Prix croissants' : ''
          }}<font-awesome-icon :icon="['fas', 'sort-amount-up']" v-if="width <= 460" /><input
            type="radio"
            value="price:asc"
            id="sort"
            v-model="sort"
        /></label>

        <label
          >{{ width > 460 ? 'Prix décroissant' : ''
          }}<font-awesome-icon :icon="['fas', 'sort-amount-down']" v-if="width <= 460" /><input
            type="radio"
            value="price:desc"
            id="sort"
            v-model="sort"
        /></label>

        <label>Pas de tri<input type="radio" value="" id="sort" v-model="sort" /></label>
      </div>
    </div>

    <button>Rechercher</button>
  </form>
</template>

<style scoped>
form {
  display: flex;
  margin: 150px 0px 50px 0px;
  /* gap: 100px; */
  /* border: 1px solid blue; */
  justify-content: space-between;
  align-items: center;
}

form p {
  font-weight: bold;
}

/* PRICE BLOC -------------- */
.min-max-bloc {
  display: flex;
  margin-top: 5px;
  gap: 20px;
}

.price-bloc input {
  width: 150px;
  height: 40px;
  border-radius: 15px 0px 0px 15px;
  border: 1px solid lightgray;
  padding: 10px;
  font-size: 16px;
}

.price-bloc label {
  display: flex;
  align-items: center;
}

.euro-bloc {
  width: 45px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid lightgray;
  border-radius: 0px 15px 15px 0px;
  border-left: none;
}

/* SORT BLOC -------------- */

.sort-bloc div {
  height: 40px;
  /* border: 1px solid red; */
  margin-top: 5px;
  display: flex;
  align-items: center;
  gap: 10px;
}

/* MEDIA  */

/* 1090px */
@media (max-width: 1090px) {
  form {
    display: flex;
    flex-direction: column;
    margin-top: 40px;
    margin-bottom: 20px;
    gap: 40px;
  }

  .price-bloc > p,
  .sort-bloc > p {
    text-align: center;
    margin-bottom: 10px;
  }

  .sort-bloc > div {
    margin-top: 0px;
    display: flex;
    justify-content: center;
    height: fit-content;
  }
}

/* 460px */
@media (max-width: 460px) {
  input[type*='number'] {
    width: 100%;
  }
}
</style>
