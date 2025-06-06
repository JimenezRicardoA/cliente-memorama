<template>

<div class = "background">
    
    <div class = "tit">
        <h1 class = "titulo">Tabla de Posiciones</h1>    
    </div>

    <div class = "tablacontainer">

        <div class = "dif">
            <h2 class = "dificultad">Dificultad Facil</h2>
        </div>

    <table class="tabla" border="1" cellpadding="10" cellspacing="0">
          <thead>
            <tr>
              <th>Pos</th>
              <th>Nombre</th>
              <th>Región</th>
              <th>Dificultad</th>
              <th>Puntaje</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(user, index) in facilUsers" :key="'facil-' + index">
              <td class="position">{{ index + 1 }}</td>
              <td>{{ user.username }}</td>
              <td>{{ user.region }}</td>
              <td>{{ user.mode }}</td>
              <td class="score">{{ user.score }}</td>
            </tr>
            <tr v-if="facilUsers.length === 0">
              <td colspan="4" class="no-data-cell">No hay datos para esta dificultad</td>
            </tr>
          </tbody>
        </table>

        <div class = "dificultad">
            <h2 class = "dificultad">Dificultad Medio</h2>
        </div>

    <table class="tabla" border="1" cellpadding="10" cellspacing="0">
          <thead>
            <tr>
              <th>Pos</th>
              <th>Nombre</th>
              <th>Región</th>
              <th>Dificultad</th>
              <th>Puntaje</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(user, index) in medioUsers" :key="'medio-' + index">
              <td class="position">{{ index + 1 }}</td>
              <td>{{ user.username }}</td>
              <td>{{ user.region }}</td>
              <td>{{ user.mode }}</td>
              <td class="score">{{ user.score }}</td>
            </tr>
            <tr v-if="facilUsers.length === 0">
              <td colspan="4" class="no-data-cell">No hay datos para esta dificultad</td>
            </tr>
          </tbody>
        </table>

        <div class = "dificultad">
            <h2 class = "dificultad">Dificultad Dificil</h2>
        </div>

        <table class="tabla" border="1" cellpadding="10" cellspacing="0">
          <thead>
            <tr>
              <th>Pos</th>
              <th>Nombre</th>
              <th>Región</th>
              <th>Dificultad</th>
              <th>Puntaje</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(user, index) in dificilUsers" :key="'dificil-' + index">
              <td class="position">{{ index + 1 }}</td>
              <td>{{ user.username }}</td>
              <td>{{ user.region }}</td>
              <td>{{ user.mode }}</td>
              <td class="score">{{ user.score }}</td>
            </tr>
            <tr v-if="dificilUsers.length === 0">
              <td colspan="4" class="no-data-cell">No hay datos para esta dificultad</td>
            </tr>
          </tbody>
        </table>
  </div>

</div>

</template>

<script setup>

import { ref, computed, onMounted } from 'vue'

const users = ref([])

const facilUsers = computed(() => {
  return [...users.value]
    .filter(user => user.mode === 'Facil')
    .sort((a, b) => a.score - b.score)
})

const medioUsers = computed(() => {
  return [...users.value]
    .filter(user => user.mode === 'Medio')
    .sort((a, b) => a.score - b.score)
})

const dificilUsers = computed(() => {
  return [...users.value]
    .filter(user => user.mode === 'Dificil')
    .sort((a, b) => a.score - b.score)
})

const loadAllUsers = () => {
  
  const allGameData = localStorage.getItem('allGameData')
  
  if (allGameData) {
    const parsedAllData = JSON.parse(allGameData)
    users.value = parsedAllData
    console.log('✅ users.value after assignment:', users.value)
    console.log('📊 Facil users:', facilUsers.value.length)
    console.log('📊 Medio users:', medioUsers.value.length)
    console.log('📊 Dificil users:', dificilUsers.value.length)
  } else {
    console.log('❌ No data found in allGameData')
    users.value = []
  }
}

onMounted(() => {
  loadAllUsers()
})
</script>

<style scoped>

.background {
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

.tit {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    background-color: #2D70B7;
    width: 100%;
    height: 10%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.titulo {
    text-align: center;
    font-size: 50px;
    font-weight: bold;
    color: #FFCB05;
    margin: 0;
}

.tablacontainer {
    position: absolute;
    top: 15%;
    left: 50%;
    transform: translateX(-50%);
    width: 90%;
    max-width: 800px;
}

.tabla {
     width: 100%;
     border-collapse: collapse;
     background-color: white;
     box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
     border-radius: 8px;
     overflow: hidden;
}

.tabla th {
    background-color: #2D70B7;
    color: #FFCB05;
    padding: 15px;
    text-align: center;
    font-weight: bold;
    border: solid #FFCB05
}

.tabla td {
    padding: 12px;
    text-align: center;
    color: #333;
    border-bottom: 1px solid #ddd;
    border: 2px solid #FFCB05; 
}

.tabla tr:nth-child(even) {
    background-color: #f9f9f9;
}

.no-data {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    color: #666;
    font-size: 18px;
    padding: 20px;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.debug-info {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background-color: #f0f0f0;
    padding: 15px;
    border-radius: 8px;
    border: 2px solid #ccc;
    max-width: 400px;
    font-size: 12px;
    z-index: 1000;
}

.debug-info h3 {
    margin: 0 0 10px 0;
    color: #333;
}

.debug-info p {
    margin: 5px 0;
    word-break: break-all;
}

.dificultad {
    text-align: center;
    font-size: 25px;
    font-weight: bold;
    color: #FFCB05;
    margin: 0;
    -webkit-text-stroke: 2px black;
}

.dif {
  top: 40%
}



</style>



