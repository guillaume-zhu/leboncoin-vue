<script setup>
import { RouterLink, useRouter, useRoute } from 'vue-router'
import { ref, inject } from 'vue'
import axios from 'axios'

const GlobalStore = inject('GlobalStore')
// console.log(GlobalStore)
const route = useRoute()
const router = useRouter()

const identifier = ref('')
const password = ref('')
const showPassword = ref(false)

const errorMessage = ref('')
const isSubmiting = ref(false)

const logIn = async () => {
  console.log('submit >>>>>', { identifier: identifier.value, password: password.value })

  if (!identifier.value || !password.value) {
    errorMessage.value = 'Veuillez remplir tous les champs'
    return errorMessage.value
  }

  isSubmiting.value = true

  try {
    const { data } = await axios.post(
      'https://site--backend-leboncoin-exercice--fbdk2fdpdqp5.code.run//api/auth/local',
      {
        identifier: identifier.value,
        password: password.value
      }
    )

    // STOCKAGE PROVIDE TOKEN +
    GlobalStore.createUserInfo(data.jwt, data.user.username, data.user.id)

    // AFFICHAGE REPONSE CONSOLE
    console.log('response >>>>>>>', data)
    // console.log('response correction >>>>>>>', data.user.username)

    // REDIRECTION
    router.push({ path: route.query.redirect || '/' })
  } catch (error) {
    console.log(error)
    errorMessage.value = 'Un problème est survenu, veuillez essayer à nouveau'
  }
  isSubmiting.value = false
}
</script>

<template>
  <main>
    <div class="container">
      <div class="log-bloc">
        <h1>Bonjour !</h1>
        <p>Connectez-vous pour découvrir toutes nos fonctionnalités.</p>

        <!-- FORM ---------------------->
        <form @submit.prevent="logIn()">
          <!-- IDENTIFIER -->
          <label for="email">E-mail *</label>
          <input
            type="email"
            name="email"
            id="email"
            v-model="identifier"
            @input="errorMessage = ''"
          />

          <!-- PASSWORD -->
          <div v-if="!showPassword" class="password-bloc">
            <label for="password">Mot de passe *</label>
            <div class="password-eye-bloc">
              <input
                type="password"
                id="password"
                name="password"
                v-model="password"
                @input="errorMessage = ''"
              />
              <div class="svg-bloc">
                <font-awesome-icon :icon="['far', 'eye']" @click="showPassword = !showPassword" />
              </div>
            </div>
          </div>

          <div v-if="showPassword" class="password-bloc">
            <label for="password">Mot de passe *</label>
            <div class="password-eye-bloc">
              <input
                type="text"
                id="password"
                name="password"
                v-model="password"
                @input="errorMessage = ''"
              />
              <div class="svg-bloc">
                <font-awesome-icon
                  :icon="['far', 'eye-slash']"
                  @click="showPassword = !showPassword"
                />
              </div>
            </div>
          </div>

          <!-- BUTTON SUBMIT -->
          <button v-if="!isSubmiting">
            Se connecter <font-awesome-icon :icon="['fas', 'arrow-right']" />
          </button>
          <button v-if="isSubmiting">Connexion en cours</button>
        </form>

        <!-- ERROR MESSAGE -->
        <p class="error-message" v-if="errorMessage === 'Veuillez remplir tous les champs'">
          {{ errorMessage }}
        </p>
        <p
          class="error-message"
          v-else-if="errorMessage === 'Un problème est survenu, veuillez essayer à nouveau'"
        >
          {{ errorMessage }}
        </p>

        <p class="p-link">
          Envie de nous rejoindre ?
          <RouterLink :to="{ name: 'signup' }"><span>Créer un compte</span></RouterLink>
        </p>
      </div>
    </div>
  </main>
</template>

<style scoped>
.container {
  background-image: url(../assets/img/illustration.png);
  background-position: bottom;
  background-repeat: no-repeat;
  background-size: contain;
  height: calc(100vh - var(--header-height) - var(--footer-height));
  display: flex;
  justify-content: center;
  align-items: center;
}

.log-bloc {
  /* border: 1px solid blue; */
  padding: 30px;
  width: 480px;
  /* height: 490px; */
  background-color: white;
  border-radius: 10px;
  box-shadow: 0px 0px 10px lightgray;
}

.log-bloc h1 {
  text-align: left;
  margin-bottom: 10px;
}

.log-bloc p {
  margin-bottom: 10px;
}

/* FORM -----------------*/
form {
  display: flex;
  flex-direction: column;
}

label {
  margin-top: 20px;
  margin-bottom: 10px;
}

input {
  height: 45px;
  padding-left: 10px;
  border-radius: 15px;
  border: 1px solid black;
}

/* PASSWORD + EYE ICON */

.password-bloc {
  display: flex;
  flex-direction: column;
}

.password-eye-bloc {
  display: flex;
}

input[id*='password'] {
  width: 380px;
  border-radius: 15px 0px 0px 15px;
}

.svg-bloc {
  border: 1px solid black;
  border-left: none;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  border-radius: 0px 15px 15px 0px;
}

/* BUTTON SUBMIT */

button {
  margin-top: 15px;
  height: 45px;
}

button svg {
  font-size: 14px;
  margin-left: 10px;
}

/* ERROR + MESSAGE */
.error-message {
  color: red;
  text-align: center;
  margin-top: 15px;
}

/* P-LINK -------------*/
.p-link {
  text-align: center;
  margin-top: 30px;
}

.p-link span {
  font-weight: bold;
  text-decoration: underline;
}

/* MEDIA -----------------------------*/

/* 680px */
@media (max-width: 680px) {
  main {
    padding-left: 0px;
    padding-right: 0px;
  }

  h1 {
    font-size: 28px;
  }

  main > div:first-child {
    align-items: flex-start;
  }

  .log-bloc {
    border-radius: 0px;
    width: 100vw;
    min-height: calc(100vh - var(--header-height) - var(--footer-height));
  }

  .log-bloc > p {
    line-height: 20px;
  }

  .password-eye-bloc {
    /* border: 1px solid red; */
  }

  input[type*='password'] {
    width: 100%;
  }
}
</style>
