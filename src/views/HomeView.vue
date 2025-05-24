<script setup>

import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { useGameStore, authStore } from '@/stores/counter'



const auth = authStore();

const getRegions = async () => {
  const response = await axios.get('http://localhost:3000/get-regions', {
    headers: {'Authorization': authStore().getAuthToken()}
  })

  if (response) {
    regions.value = response.data.regions
    regionsReady.value = true
  } else {
    return [];
  }
}


const getUser = async () => {
  const response = await axios.post('http://localhost:3000/get-user', {
    userName: userName.value
  })

  if (response) {
    auth.setAuthToken(response.data.token)
    console.log('Token:', response.data.token)
    console.log('authTOken', authStore().getAuthToken())
    await getRegions()
  } else {
    return [];
  }
}


let regions = ref([])
const options = ['Dificil', 'Medio', 'Facil']
const gameRegion = ref('')
const gameMode = ref('')
const username = defineModel()
const regionsReady = ref(false);

const setRegion = async (choice) => {
  gameRegion.value = choice
}

const setMode = async (choice) => {
  gameMode.value = gameMode.value === choice ? null : choice
}

const router = useRouter()
const gameStore = useGameStore()

const startGame = () => {
  gameStore.username = username.value
  gameStore.region = gameRegion.value
  gameStore.mode = gameMode.value

  router.push({ name: 'Game' })
}
</script>

<template>

  <div class = "background">
  <img src="https://upload.wikimedia.org/wikipedia/commons/9/98/International_Pok%C3%A9mon_logo.svg" alt="Pokémon"
    class="logo" style="width: 600px; height: auto;">
    
    <div>
      <h2 class = 'texto'>¿Eres el mejor maestro Pokemon del mundo?</h2>
      
      <h3 class = "texto">Encuentra Todos los Pookemons ocultos y demuestralo!!</h3>
    </div>

    <div>
      <h2 class = "texto">Intrucciones: </h2>
      
      <p class = "texto">Para mostrar al pokemon detrás del Ditto da click en el pokemon deseado, después elige otra opción para encontrar 
        el par</p>
      
      </div>


      <div>
        <p class = "texto">Una vez que hayas encontrado todos los pares, el juego te mostrará tu puntaje</p>
        
        <p class = "texto">Nombre de Usuario: <input type="text" id="userName" placeholder="Usuario" v-model="username" /></p>
      </div>

      <button class = "boton"
      v-show="username !== ''" 
      v-on:click="getUser"
      >Registro/Ingreso</button>
      
      <div v-if="regionsReady">
        <h2>Región</h2>
        <button v-for="region in regions" v-on:click="setRegion(region)">
          {{ region }}
        </button>
      </div>
      
      <div v-show="username !== '' && gameRegion !== ''">
        <h2>Dificultad</h2>
        <button
        class="regButton"
        v-for="option in options"
        :key="option"
        :class="{ active: gameMode === option }"
        @click="setMode(option)">
        {{ option }}
      </button>
    </div>
      

      <button v-if="username !== '' && gameRegion !== '' && gameMode !== ''" @click="startGame">
        Start Game
      </button>

      </div>

</template>

<style scoped>
.regButton {
  background-color: lightgray;
  color: black;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 8px;
  transition: background-color 0.3s;
}

.regButton.active {
  background-color: dodgerblue;
  color: white;
}

.logo {
  display: block;
  margin: 0 auto;
  top: 10%;
}

.background {
  width: 150vh;
  height: 150vh;
  position: relative;
  background-color: #F0F0F0;
  border-radius: 12px;
  padding: 16px;
  cursor: pointer;
  border: 5px solid #2D70B7;
  box-sizing: border-box;
  justify-content: center;
}

.texto {
  color: black;
  text-align: center;
}


</style>
