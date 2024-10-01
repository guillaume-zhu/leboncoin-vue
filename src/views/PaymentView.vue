<script setup>
import { onMounted, ref, computed, onBeforeMount, inject } from 'vue'
import axios from 'axios'
import { loadStripe } from '@stripe/stripe-js'
import { useRouter } from 'vue-router'

const GlobalStore = inject('GlobalStore')
// console.log(GlobalStore.userInfo.value.token)

const router = useRouter()

const stripePromise = loadStripe(
  'pk_test_51Q58cZ2NVg5X1oh2CTsUoI1sny3ABDXB3QP5W41tXH3GA2OlD9REqIJ5Ryy3DyTxAYDuFqzPLKKr2JfbUb15nPh400ZpjYFLWc'
)

const props = defineProps({
  id: String
})
// console.log(props.id)

const offerInfo = ref(null)
const isLoading = ref(false)
const delivery = ref(null)
const firstname = ref('')
const lastname = ref('')
const phone = ref('')
const errorMessage = ref('')

const cardElement = ref(null)
const confirmedPayment = ref(false)

onBeforeMount(async () => {
  const stripe = await stripePromise
  const elements = stripe.elements()
  cardElement.value = elements.create('card', {
    style: {
      // Style appliqué à l'élément 'Card' au démarrage
      base: {
        fontSize: '14px'
      }
    }
  })
  cardElement.value.mount('#card-element')
})

onMounted(async () => {
  try {
    isLoading.value = true

    const { data } = await axios.get(
      `https://site--strapileboncoin--2m8zk47gvydr.code.run/api/offers/${props.id}?populate[0]=pictures`
    )

    console.log('data axios response ---->', data.data)
    offerInfo.value = data.data
  } catch (error) {
    console.log(error)
  }
})

const totalAmount = computed(() => {
  let total = 0
  total = total + offerInfo.value.attributes.price + 0.99
  if (delivery.value === 'colissimo') {
    total = total + 15.6
  }
  return total
})

const handlePayment = async () => {
  if (!firstname.value || !lastname.value) {
    errorMessage.value = 'Votre nom et prénom sont obligatoires'
    return
  }

  try {
    // ENVOI CARTE À STRIPE
    const stripe = await stripePromise

    const { token } = await stripe.createToken(cardElement.value)

    console.log('response stripe token ---->', token)

    const stripeToken = token.id

    // ENVOI TRANSACTION AU BACK

    const { data } = await axios.post(
      'https://site--strapileboncoin--2m8zk47gvydr.code.run/api/offers/buy',
      {
        title: offerInfo.value.attributes.title,
        amount: totalAmount.value,
        token: stripeToken
      },
      {
        headers: {
          Authorization: `Bearer ${GlobalStore.userInfo.value.token}`
        }
      }
    )

    console.log('response back payment---->', data)
    if (data.status === 'succeeded') {
      alert(
        `Paiement de ${totalAmount.value} validé pour l'achat du produit ${offerInfo.value.attributes.title} par ${firstname.value} ${lastname.value}`
      )
      router.push({ name: 'home' })
    }
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <main>
    <div class="container">
      <h1>Finalisez votre paiement</h1>
      <div class="global-bloc">
        <div class="left-bloc">
          <div class="personal-info">
            <h3>Informations personnelles</h3>
            <p>Une pièce d'identité vous sera demandée pour récupérer votre colis.</p>

            <form>
              <label for="firstname">Prénom</label>
              <input type="text" name="firstname" id="firstname" placeholder="Prénom" />

              <label for="lastname">Nom</label>
              <input type="text" name="lastname" id="lastname" placeholder="Nom" />

              <label for="phone">Téléphone</label
              ><input
                type="number"
                name="phone"
                id="phone"
                placeholder="Téléphone"
                v-model="phone"
              />
              <p>Recevoir un SMS pour l’arrivée de votre colis ou votre code de locker</p>
            </form>
          </div>

          <p>
            Vous ne serez débité que lorsque le vendeur aura confirmé la disponibilité de la
            commande.
          </p>

          <div class="payment-bloc">
            <h3>Coordonnées bancaires</h3>

            <div id="card-element"></div>

            <div class="pay-error-bloc">
              <button @click="handlePayment">Payer</button>
              <p v-if="errorMessage">{{ errorMessage }}</p>
            </div>

            <p>
              Paiement sécurisé Votre banque peut vous demander d’autoriser le paiement pour
              compléter votre achat.
            </p>

            <p>
              Vous êtes sur un serveur de paiement sécurisé par les normes ssl (https) et pcidss de
              nos partenaires bancaires. Vos données sont encryptées pour plus de sécurité.
            </p>
          </div>
        </div>

        <div class="right-bloc" v-if="offerInfo">
          <div>
            <div>
              <img :src="offerInfo.attributes.pictures.data[0].attributes.url" alt="image-offre" />
              <h4>{{ offerInfo.attributes.title }}</h4>
            </div>
            <h4>{{ offerInfo.attributes.price }} €</h4>
          </div>

          <div>
            <h4>Mode de remise</h4>

            <form>
              <label>
                <div class="radio-bloc1">
                  <div class="radio-input-bloc">
                    <input
                      type="radio"
                      name="delivery"
                      id="delivery"
                      value="faceToFace"
                      v-model="delivery"
                    />
                  </div>

                  <div>
                    <p>Remise en main propre</p>
                    <p class="delivery-p">
                      Payez en ligne et récupérez votre achat en main propre lors de votre
                      rendez-vous avec le vendeur
                    </p>
                  </div>
                </div>
              </label>

              <label>
                <div class="radio-bloc2">
                  <div>
                    <div class="radio-input-bloc">
                      <input
                        type="radio"
                        name="delivery"
                        id="delivery"
                        value="colissimo"
                        v-model="delivery"
                      />
                    </div>

                    <div>
                      <p>Colissimo</p>
                      <p class="delivery-p">à votre domicile sous 2-3 jours</p>
                    </div>
                  </div>

                  <h4>15,60 €</h4>
                </div>
              </label>
            </form>

            <div class="protection-bloc">
              <h4>Protection leboncoin</h4>
              <h4>0,99 €</h4>
            </div>

            <div class="check-bloc">
              <div>
                <div>
                  <font-awesome-icon :icon="['fas', 'check']" />
                </div>
                <span>Votre argent est sécurisé et versé au bon moment</span>
              </div>

              <div>
                <div>
                  <font-awesome-icon :icon="['fas', 'check']" />
                </div>
                <span>Notre service client dédié vous accompagne</span>
              </div>
            </div>
          </div>

          <div class="total-bloc">
            <h3>Total</h3>
            <p>{{ totalAmount }}</p>
          </div>
        </div>

        <p v-else>En cours de chargement ...</p>
      </div>
    </div>
  </main>
</template>

<style scoped>
main {
  padding: 40px;
  margin-bottom: 40px;
}

.global-bloc {
  display: flex;
  gap: 20px;
}

h1 {
  text-align: left;
  margin-bottom: 20px;
}

/* LEFT BLOC -------------------------------------*/
.left-bloc {
  width: 675px;
  /* border: 1px solid red; */
}
.left-bloc p {
  font-size: 12px;
}

/* PERSONAL INFO -----------*/
.personal-info {
  /* border: 1px solid blue; */
  box-shadow: 0px 0px 10px lightgray;
  border-radius: 10px;
  padding: 20px;
}

/* FORM */
.personal-info form {
  display: flex;
  flex-direction: column;
}

.personal-info form label {
  margin-top: 30px;
}

.personal-info input {
  margin-top: 15px;
  border: 1px solid lightgray;
  border-radius: 15px;
  height: 45px;
  padding: 15px;
  font-size: 16px;
}

.personal-info form p {
  margin-top: 5px;
}

/* SMALL TEXT -----------*/
.left-bloc > p {
  margin: 25px 0px;
}

/* PAYMENT BLOC -----------*/
.payment-bloc {
  box-shadow: 0px 0px 10px lightgray;
  border-radius: 10px;
  padding: 20px;
}

#card-element {
  border: 1px solid lightgray;
  padding: 15px;
  border-radius: 15px;
  margin: 20px 0px;
}

.pay-error-bloc {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.pay-error-bloc {
  margin-bottom: 20px;
}

.pay-error-bloc > p {
  font-size: 16px;
  color: red;
}

.payment-bloc > p {
  margin: 5px;
}

/* RIGHT BLOC -------------------------------------*/
.right-bloc {
  flex: 1;
  box-shadow: 0px 0px 10px lightgray;
  height: fit-content;
  border-radius: 10px;
}

/* OFFER INFO BLOC */
.right-bloc > div:first-child {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid lightgray;
  padding: 20px;
  padding-bottom: 35px;
}

.right-bloc img {
  width: 80px;
  height: 80px;
  border-radius: 10px;
  object-fit: cover;
  object-position: top;
  margin-right: 10px;
}

.right-bloc > div:first-child > h4 {
  color: #89380f;
}

.right-bloc > div:first-child > div {
  display: flex;
  align-items: center;
}

/* DELIVERY BLOC */
.right-bloc > div:nth-child(2) {
  padding: 20px;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid lightgray;
}

.radio-bloc1,
.radio-bloc2 {
  /* border: 1px solid red; */
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
  margin-bottom: 10px;
}

.radio-input-bloc {
  padding: 5px;
}

.delivery-p {
  font-size: 12px;
  line-height: 14px;
  margin-top: 5px;
}

.radio-bloc2 > div:first-child {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.radio-bloc2 > h4 {
  color: #89380f;
}

/* PROTECTION BLOC */
.protection-bloc {
  /* border: 1px solid blue; */
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
}

.protection-bloc > h4:last-child {
  color: #89380f;
}

/* CHECK QUOTES */
.check-bloc {
  margin-top: 10px;
}

.check-bloc > div:first-child {
  margin-bottom: 10px;
  display: flex;
}

.check-bloc > div:last-child {
  display: flex;
}

.check-bloc svg {
  color: green;
  font-size: 16px;
  margin-right: 15px;
}

/* TOTAL BLOC */
.total-bloc {
  padding: 20px;
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
}
</style>
