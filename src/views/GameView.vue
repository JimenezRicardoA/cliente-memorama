<template>

<div class = background>

  <div class="title">

    <h1 class="text">Encuentra los pares lo mas pronto posible!</h1>

    <div class = "inforow">
      <h2>Username: {{ store.username }}</h2>
      <h2>Region: {{ store.region }}</h2>
      <h2>Dificultad: {{ store.mode }}</h2>
    </div>

  </div>

  <div v-if="isLoading" class="loading">
    <h1>Cargando...</h1>
  </div>

  <div v-else>

  <div class='column'>

    <div class='row' v-for="(row, rowIndex) in grid" :key = "rowIndex">
      
      <div class = 'box' v-for = "item in row" :key = "item.uid"
      @click="handleClick(item)" role = 'button' tabindex = '0'>
      <img
      :src="item.flipped ? item.image : DITTO_IMAGE"
      :alt="item.name"
      class="pokemon-image"/>
      </div>
    
    </div>

    <h2 class="puntaje">Puntaje: {{ store.score }}</h2>

    <div v-if="finished" class ="finished">
      <h1>Juego Terminado</h1>
      <button @click="gotoScore">Score</button>
    </div>

  </div>
  </div>

  </div>

</template>


<script setup>
import { computed, ref, onMounted } from 'vue'
import { useGameStore } from '@/stores/counter'
import axios from 'axios'
import { useRouter } from 'vue-router'

const store = useGameStore()
const DITTO_IMAGE = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png'

const isLoading = ref(true)

const score = ref(0)
const router = useRouter()

const dimension = computed(() => {
  switch (store.mode) {
    case 'Facil':
      return {rows: 2, columns: 3, unique: 3}
    case 'Medio':
      return {rows: 3, columns: 4, unique: 6}
    case 'Dificil':
      return {rows: 4, columns: 5, unique: 10}
    default:
      return {rows: 2, columns: 3, unique: 3}
  }
})

const grid = ref([])
const finished = ref(false)

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

const regiones = {
  Kanto: 'kanto',
  Johto: 'original-johto',
  Hoenn: 'hoenn',
  Sinnoh: 'original-sinnoh',
  Unova: 'unova',
  Kalos: 'kalos-central',
  Alola: 'original-alola',
  Galar: 'galar',
  Paldea: 'paldea'
}

async function loadGrid() {
  const uniqueCount = dimension.value.unique
  const regionName = regiones[store.region]
  
  const regionResponse = await axios.get(`https://pokeapi.co/api/v2/pokedex/${regionName}`)
  const pokedexEntries = regionResponse.data.pokemon_entries

  const shuffledEntries = shuffle(pokedexEntries).slice(0, uniqueCount)

  const pokemonList = await Promise.all(shuffledEntries.map(async (entry) => {
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${entry.pokemon_species.name}`)
    return {
      id: res.data.id,
      name: res.data.name,
      image: res.data.sprites.front_default,
    }
  }))

  const paired = shuffle([...pokemonList, ...pokemonList].map((poke, index) => ({
    ...poke,
    uid: index,
    flipped: false
  })))

  const rows = []
  const columnsPerRow = dimension.value.columns
  for (let i = 0; i < dimension.value.rows; i++) {
    const row = paired.slice(i * columnsPerRow, (i + 1) * columnsPerRow)
    rows.push(row)
  }

  grid.value = rows

  setTimeout(() => {
  isLoading.value = false
  }, 2000)

}

onMounted(() => {
  loadGrid()
})

const flippedCards = ref([]); 

const handleClick = (item) => {
  if (flippedCards.value.length === 2) return;

  item.flipped = !item.flipped;

  flippedCards.value.push(item);

  if (flippedCards.value.length === 2) {
    const [first, second] = flippedCards.value;

    if (first.id !== second.id) {
      setTimeout(() => {
        first.flipped = false;
        second.flipped = false;
        flippedCards.value = []; 
      }, 500); 
    } else {
      flippedCards.value = [];
      finishedGame();
    }
  }

  sumScore()
};

const sumScore = () => {
  store.score += 1;
}

const finishedGame = () => {
  const allFlipped = grid.value.flat().every(card => card.flipped);

  if (allFlipped) {
    finished.value = true;
    console.log(store.score);
    console.log('Juego terminado');
    
    saveGameData();
  }
}


const saveGameData = () => {
  console.log('🎮 Store data:', {
    username: store.username,
    region: store.region,
    mode: store.mode,
    score: store.score
  })

  const gameData = {
    username: store.username,
    region: store.region,
    mode: store.mode,
    score: store.score,
  }

  console.log('gameData: ', gameData)


  localStorage.setItem('gameData', JSON.stringify(gameData))
  console.log('💾 Current game saved to gameData')

  const existingData = localStorage.getItem('allGameData');
  console.log('existing: ', existingData)
  
  let allGames = [];

  if (existingData) {
    allGames = JSON.parse(existingData);
    console.log('📋 Parsed existing games:', allGames)
  }

  allGames.push(gameData)
  console.log('allGames: ', allGames)

  localStorage.setItem('allGameData', JSON.stringify(allGames))
}

const gotoScore = () => {
  router.push({ name: 'Score' })
}
</script>




<style scoped>
.box {
  width: 150px;
  height: 150px;
  position: relative;
  background-color: #FFCB05;
  border-radius: 12px;
  padding: 16px;
  cursor: pointer;
  border: 5px solid #2D70B7;
  box-sizing: border-box;
}

.box button {
  position: absolute;
  bottom: 10px;
  right: 10px;
}

.column {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 30%;
  bottom: 10%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 10px;
}

.title {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 1%;
  text-align: center;
  margin-bottom: 20px;
  background-color: #2D70B7;
  width: 100%;
  height: 10%;
  align-items: center;
  justify-content: center;
  position: absolute
  
}

.inforow {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 20px;
  
}

.pokemon-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.puntaje{
  text-align: center;
}

.text {
  text-align: center;
  color: #FFCB05;
  font-weight: bold;
}
</style>