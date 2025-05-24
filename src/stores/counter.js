import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})

export const useGameStore = defineStore('game', () => {
  const username = ref('')
  const region = ref('')
  const mode = ref('')
  const score = ref(0)

  return { username, region, mode, score }
})

export const authStore = defineStore('auth', () => {
  const authToken = ref('');

  function getAuthToken() {
    return authToken.value
  }

  function setAuthToken(token) {
    authToken.value = token
  }

  return { getAuthToken, setAuthToken }
})
