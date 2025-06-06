<template>

<div class = "background1">

<div class="titulo">
    <h1 class="tit">El resultado de tu partida!</h1>
</div>

<div class = "background">
<div class="info">
    <h2 class = "data" >Nombre de Usuario: {{ store.username }}</h2>
    <h2 class = "data" >Región: {{ store.region }}</h2>
    <h2 class = "data" >Dificultad: {{ store.mode }}</h2>
    <h2 class = "data" >Puntaje: {{ store.score }}</h2>


    <div class = "rowinf">
        <button class = "main-button" @click="router.push({ name: 'Game', query: { reset: true } })">
            Volver a jugar
        </button>

        <button class = "main-button" @click="router.push({ name: 'Rank' })">
            Puntajes
        </button>
    </div>
</div>

</div>
</div>

</template>

<script setup>
import { useGameStore } from '@/stores/counter'
import { useRouter } from 'vue-router'

const router = useRouter()   

const store = useGameStore()

</script>

<style scoped>

.info{
    display: flex;
    flex-direction: column;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    justify-content: center;
    align-items: center;
    top: 25%;
}

.rowinf {
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    align-items: center;
    top: 25px;
}

.titulo{
    position: relative;
    transform: translateX(-50%);
    top: 1%;
    left: 50%;
    text-align: center;
    background-color: #2D70B7;
    width: 100%;
    height: 10%;
    align-items: center;
    justify-content: center;
    position: absolute
}

.tit{
    flex: 5;
    text-align: center;
    font-size: 50px;
    font-weight: bold;
    color: #FFCB05
}

.data{
  color: #2D70B7;
  text-align: center;
  font-weight: bold;
}

.background {
  width: 50vh;
  height: 50vh;
  position: absolute;
  background-color: #F0F0F0;
  border-radius: 12px;
  padding: 16px;
  cursor: pointer;
  border: 5px solid #2D70B7;
  box-sizing: border-box;
  
  /* Centrado perfecto */
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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