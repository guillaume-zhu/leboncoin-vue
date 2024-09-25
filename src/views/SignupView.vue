<script setup>
import { RouterLink, useRouter } from 'vue-router'
import { ref, inject } from 'vue'
import axios from 'axios'

const username = ref('')
const email = ref('')
const password = ref('')
const showPassword = ref(false)

const router = useRouter()

const errorMessage = ref('')
const isSubmiting = ref(false)

const GlobalStore = inject('GlobalStore')
console.log('GlobalStore >>>>>', GlobalStore)

const signup = async () => {
  console.log('submit', { email: email.value, username: username.value, password: password.value })

  if (!username.value || !email.value || !password.value) {
    errorMessage.value = 'Veuillez remplir tous les champs'
    return errorMessage.value
  }

  isSubmiting.value = true
  try {
    // REQUETE AU BACK/API
    const { data } = await axios.post(
      'https://site--strapileboncoin--2m8zk47gvydr.code.run/api/auth/local/register',
      { email: email.value, username: username.value, password: password.value }
    )

    // STOCKAGE PROVIDE DU JWT + NOM

    GlobalStore.createUserInfo(data.jwt, data.user.username)

    //   AFFICHAGE DE LA RÉPONSE CONSOLE
    console.log('response >>>>', data)

    // REDIRECTION
    router.push({ name: 'home' })
  } catch (error) {
    console.log(error.response.data.error)
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
        <p>Inscrivez-vous pour découvrir toutes nos fonctionnalités</p>

        <!-- FORM -------------------------->
        <form @submit.prevent="signup()">
          <!-- NAME -->
          <label for="name">Nom *</label>
          <input type="text" id="name" name="name" v-model="username" @input="errorMessage = ''" />

          <!-- EMAIL -->
          <label for="email">E-mail *</label>
          <input type="email" id="email" name="email" v-model="email" @input="errorMessage = ''" />

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
            S'inscrire <font-awesome-icon :icon="['fas', 'arrow-right']" />
          </button>
          <button v-else-if="isSubmiting">Inscription en cours</button>

          <!-- ERROR + MESSAGE -->
          <p class="error-message" v-if="errorMessage === 'Veuillez remplir tous les champs'">
            {{ errorMessage }}
          </p>
          <p
            class="error-message"
            v-else-if="errorMessage === 'Un problème est survenu, veuillez essayer à nouveau'"
          >
            {{ errorMessage }}
          </p>
        </form>

        <p class="p-link">
          Vous avez déjà un compte ?
          <RouterLink :to="{ name: 'login' }"> <span>Connectez-vous</span></RouterLink>
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
</style>
