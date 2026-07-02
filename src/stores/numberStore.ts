import { defineStore, acceptHMRUpdate } from 'pinia'
import { ref, reactive } from 'vue'


export const useNumberStore = defineStore('number', () => {
  const currentNumber = ref<number | null>(null)
  const countCorrect = ref(0)
  const countWrong = ref(0)
  const showNumber = ref(false)
  const availableNumbers: number[] = reactive([])
  const speechRate = ref(1.0)

  function initialize() {
    countCorrect.value = 0
    countWrong.value = 0
    showNumber.value = false
    currentNumber.value = -1
    // speechRate.value = 1.0
    initializeNumbers()

  }

  function initializeNumbers() {
    for (let i = 0; i < 100; i++) {
      availableNumbers[i] = i
    }
  }

  function nextNumber() {
    if (availableNumbers.length === 0) {
      initializeNumbers()
    }
    const randomIndex = Math.floor(Math.random() * availableNumbers.length)
    currentNumber.value = availableNumbers[randomIndex] as number
    availableNumbers.splice(randomIndex, 1)
    return currentNumber.value
  }

  function nextMonthDay() {
    const now = new Date()
    const firstDay = new Date(now.getFullYear(), 0, 1)
    const randomDay = new Date(firstDay.getTime() + Math.random() * 365 * 24 * 60 * 60 * 1000)
    const month = randomDay.getMonth() + 1
    const day = randomDay.getDate()
    return { month, day }
  }

  return {
    speechRate,
    initialize,
    currentNumber,
    countCorrect,
    countWrong,
    showNumber,
    nextNumber,
    nextMonthDay,
  }
})

// Hot Module Replacement
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useNumberStore, import.meta.hot))
}