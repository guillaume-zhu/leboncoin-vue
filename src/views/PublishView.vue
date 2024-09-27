<script setup>
import { ref, inject, computed } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()
const GlobalStore = inject('GlobalStore')
console.log('GlobalStore --->', GlobalStore.userInfo.value)

const title = ref('')
const description = ref('')
const price = ref('')
const pictures = ref(null)

const isSubmitting = ref(false)
const errorMessage = ref('')

const imagePreview = computed(() => {
  const imageTab = []

  for (const key in pictures.value) {
    if (Object.hasOwnProperty.call(pictures.value, key)) {
      imageTab.push(URL.createObjectURL(pictures.value[key]))
    }
  }
  console.log(imageTab)

  return imageTab
})

const handleSubmit = async () => {
  if (!title.value || !description.value || !price.value || !pictures.value) {
    errorMessage.value = 'Veuillez remplir tous les champs'
    return
  }

  const formData = new FormData()

  for (const key in pictures.value) {
    if (Object.hasOwnProperty.call(pictures.value, key)) {
      formData.append('files.pictures', pictures.value[key])
    }
  }

  const stringifiedInfo = JSON.stringify({
    title: title.value,
    description: description.value,
    price: price.value,
    owner: GlobalStore.userInfo.value.id
  })

  formData.append('data', stringifiedInfo)

  try {
    isSubmitting.value = true

    const { data } = await axios.post(
      'https://site--strapileboncoin--2m8zk47gvydr.code.run/api/offers',
      formData,
      {
        headers: {
          Authorization: 'Bearer ' + GlobalStore.userInfo.value.token,
          'Content-Type': 'multipart/form-data'
        }
      }
    )

    console.log('response ----->', data)

    router.push({ name: 'offer', params: { id: data.data.id } })
  } catch (error) {
    console.log(error)
  }

  pictures.value = null
  isSubmitting.value = false
}

const selectPhoto = (event) => {
  errorMessage.value = ''

  const numOfFiles = event.target.files.length
  // console.log(event.target.files.length)

  if (numOfFiles <= 10) {
    pictures.value = event.target.files
  } else {
    errorMessage.value = '10 photos maximum'
    pictures.value = null
  }
}
</script>

<template>
  <main>
    <section class="container" v-if="isSubmitting">
      <h1>Envoi en cours ...</h1>
    </section>

    <section v-else class="container publish-card">
      <p>Déposer une annonce</p>

      <!-- FORM -------------------------->
      <form @submit.prevent="handleSubmit">
        <!-- TITLE ------>
        <div>
          <label for="title">Titre de l'annonce</label>
          <input type="text" name="title" id="title" v-model="title" @input="errorMessage = ''" />
          <p>Vous n'avez pas besoin de mentionner « Achat » ou « Vente » ici.</p>
        </div>

        <!-- DESCRIPTION -->
        <div>
          <label for="description">Description de l'annonce</label>
          <textarea
            name="description"
            id="description"
            v-model="description"
            @input="errorMessage = ''"
            rows="10"
          ></textarea>
          <p>
            Nous vous rappelons que la vente de contrefaçons est interdite. Nous vous invitons à
            ajouter tout élément permettant de prouver l’authenticité de votre article: numéro de
            série, facture, certificat, inscription de la marque sur l’article, emballage etc.
            Indiquez dans le texte de l’annonce si vous proposez un droit de rétractation à
            l’acheteur. En l’absence de toute mention, l’acheteur n’en bénéficiera pas et ne pourra
            pas demander le remboursement ou l’échange du bien ou service proposé
          </p>
        </div>

        <!-- PRICE ------>
        <div>
          <label for="price">Votre prix de vente</label>
          <div class="price-bloc">
            <input
              type="number"
              min="0"
              name="price"
              id="price"
              v-model="price"
              @input="errorMessage = ''"
            />
            <div>€</div>
          </div>
        </div>

        <!-- PHOTO -------->
        <div>
          <label
            >Ajoutez des photos
            <div class="photo-bloc">
              <font-awesome-icon :icon="['fas', 'camera']" />
              <span>Sélectionnez jusqu'à 10 photos</span>
            </div>
            <input type="file" name="pictures" id="pictures" @input="selectPhoto" multiple
          /></label>
        </div>

        <p v-if="errorMessage === '10 photos maximum'">{{ errorMessage }}</p>

        <!-- IMAGE PREVIEW ---->
        <div class="image-preview" v-if="pictures">
          <img :src="url" alt="" v-for="url in imagePreview" />
        </div>

        <button>Déposer mon annonce</button>
      </form>

      <!-- ERROR MESSAGE ------------------------>
      <p v-if="errorMessage === 'Veuillez remplir tous les champs'">{{ errorMessage }}</p>
    </section>
  </main>
</template>

<style scoped>
main {
  background-color: #f4f9fd;
  padding-top: 40px;
  /* padding-bottom: 40px; */
  height: calc(100vh - var(--header-heigt) - var(--footer-height));
}

.publish-card {
  /* border: 1px solid blue; */
  background-color: white;
  border-radius: 15px;
  padding: 20px;
}

.publish-card > p:first-child {
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 45px;
}

/* FORM ---------------------*/

form {
  display: flex;
  flex-direction: column;
  gap: 30px;
  /* max-width: 770px; */
  /* border: 1px solid red; */
}

form > div {
  display: flex;
  flex-direction: column;
}

form label {
  margin-bottom: 10px;
  font-size: 16px;
}

input {
  height: 45px;
  border: 1px solid black;
  border-radius: 10px;
  font-size: 16px;
  padding-left: 10px;
}

textarea {
  border: 1px solid black;
  border-radius: 10px;
  font-size: 16px;
  font-family: 'Nunito Sans', sans-serif;
  padding: 10px;
}

form > div p {
  font-size: 12px;
  margin-top: 5px;
  line-height: 14px;
}

/* PRICE ------*/
.price-bloc {
  display: flex;
  align-items: center;
}

input[id*='price'] {
  border-radius: 10px 0px 0px 10px;
  border-right: none;
}

.price-bloc > div {
  border: 1px solid black;
  width: 45px;
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0px 10px 10px 0px;
}

/* PHOTO -----*/
.photo-bloc {
  width: 150px;
  height: 150px;
  border: 1px solid black;
  border-radius: 10px;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 10px;
}

.photo-bloc span {
  font-size: 16px;
  text-align: center;
  line-height: 20px;
}

.photo-bloc svg {
  font-size: 40px;
}

input[id*='pictures'] {
  display: none;
}

/* IMG PREVIEW */
.image-preview {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 11px;
}

img {
  width: 193px;
  height: 193px;
  object-fit: cover;
  border-radius: 10px;
}

/* BUTTON */
button {
  width: fit-content;
  margin-top: 10px;
}
</style>
