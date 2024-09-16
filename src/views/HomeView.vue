<script setup></script>

<template>
  <main>
    <h1 class="container">
      Des millions de petites annonces et autant d'occasions de se faire plaisir
    </h1>

    <div class="container banniere">
      <img src="../assets/img/onde-corail.svg" alt="onde-corail-leboncoin" />
      <div>
        <p>C'est le moment de vendre</p>
        <button><font-awesome-icon :icon="['far', 'plus-square']" />Déposer une annonce</button>
      </div>
      <img src="../assets/img/feuille-bleue.svg" alt="feuille-bleue-leboncoin" />
    </div>
  </main>
</template>

<style scoped>
h1 {
  margin-top: 30px;
  margin-bottom: 30px;
}

/* BANNIÈRE TOP  --------*/
.banniere {
  display: flex;
  justify-content: space-between;
  border-radius: 15px;
  background-color: #ffe9de;
  height: 80px;
  overflow-x: hidden;
}

.banniere > div {
  display: flex;
  justify-content: center;
  align-items: center;
}

.banniere > div > p {
  font-size: 20px;
  font-weight: bold;
  margin-right: 20px;
}
</style>
