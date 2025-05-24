<template>

<div class="titulo">
    <h1 class="tit">El resultado de tu partida!</h1>
</div>

<div class="info">
    <h2>Nombre de Usuario: {{ store.username }}</h2>
    <h2>Región: {{ store.region }}</h2>
    <h2>Dificultad: {{ store.mode }}</h2>
    <h2>Puntaje: {{ store.score }}</h2>


    <div class = "rowinf">
        <button @click="router.push({ name: 'Game', query: { reset: true } })">
            Volver a jugar
        </button>

        <button @click="router.push({ name: 'Rank' })">
            Puntajes
        </button>
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
    top: 100%;
}

.titulo{
    position: absolute;
    transform: translateX(-50%);
    top: 1%;
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
</style>