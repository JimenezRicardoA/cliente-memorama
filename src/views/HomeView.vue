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
    username: username.value
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
  <div class = "background1">
  <div class = "background">
  <img src="https://upload.wikimedia.org/wikipedia/commons/9/98/International_Pok%C3%A9mon_logo.svg" alt="Pokémon"
    class="logo" style="width: 600px; height: auto;">
    
    <div>
      <h2 class = 'texto'>¿Eres el mejor maestro Pokemon del mundo?</h2>
      
      <h3 class = "texto">Encuentra Todos los Pookemons ocultos y demuestralo!!</h3>
    </div>

    <div>
      <h2 class = "texto">Instrucciones:</h2>
      
      <p class = "texto">Para mostrar al pokemon detrás del Ditto da click en el pokemon deseado, después elige otra opción para encontrar 
        el par</p>
      
      </div>


      <div>
        <p class = "texto">Una vez que hayas encontrado todos los pares, el juego te mostrará tu puntaje</p>
        
        <div class="input-container">
          <label class="texto">Nombre de Usuario:</label>
          <input type="text" id="username" placeholder="Usuario" v-model="username" class="username-input" />
        </div>
      </div>

      <div class="button-container">
        <button class="main-button"
        v-show="username !== ''" 
        v-on:click="getUser"
        >Registro/Ingreso</button>
      </div>
      
      <div v-if="regionsReady" class="section">
        <h2 class="texto">Región</h2>
        <div class="button-group">
          <button 
            v-for="region in regions" 
            v-on:click="setRegion(region)"
            class="main-button"
            :class="{ active: gameRegion === region }"
          >
            {{ region }}
          </button>
        </div>
      </div>
      
      <div v-show="username !== '' && gameRegion !== ''" class="section">
        <h2 class="texto">Dificultad</h2>
        <div class="button-group">
          <button
            class="main-button"
            v-for="option in options"
            :key="option"
            :class="{ active: gameMode === option }"
            @click="setMode(option)">
            {{ option }}
          </button>
        </div>
      </div>
      
      <div class="button-container">
        <button 
          v-if="username !== '' && gameRegion !== '' && gameMode !== ''" 
          @click="startGame"
          class="main-button"
        >
          Iniciar Juego
        </button>
      </div>

      </div>

      </div>

</template>

<style scoped>
.logo {
  display: block;
  margin: 0 auto;
  top: 10%;
}

.background {
  width: 100vh;
  height: 75vh;
  position: absolute;
  background-color: #F0F0F0;
  border-radius: 12px;
  padding: 16px;
  cursor: pointer;
  border: 5px solid #2D70B7;
  box-sizing: border-box;
  
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  overflow-y: auto;
}

.texto {
  color: black;
  text-align: center;
}

.background1 {
  background-image: url('https://i.blogs.es/e6db1f/pokemon/1366_2000.jpeg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.button-container {
  display: flex;
  justify-content: center;
  margin: 20px 0;
}

.button-group {
  display: flex;
  justify-content: center;
  gap: 15px;
  flex-wrap: wrap;
  margin-top: 15px;
}

.input-container {
  text-align: center;
  margin: 20px 0;
}

.username-input {
  padding: 12px 20px;
  font-size: 16px;
  border: 2px solid #2D70B7;
  border-radius: 8px;
  margin-left: 10px;
  outline: none;
  transition: border-color 0.3s, box-shadow 0.3s;
}

.main-button {
  background: linear-gradient(135deg, #2D70B7, #1e5a96);
  color: white;
  border: none;
  padding: 15px 30px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  border-radius: 10px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(45, 112, 183, 0.3);
}

.main-button:hover {
  background: linear-gradient(135deg, #1e5a96, #164a7a);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(45, 112, 183, 0.4);
}
</style>