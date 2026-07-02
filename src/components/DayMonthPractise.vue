<template>
  <p v-if="numberStore.showNumber">{{ asString }}</p>
  <div class="input-group mb-3">
    <input ref="answerInput" class="form-control" v-model="answer" @keyup.enter="checkAnswer" type="date"
      :min="minDate" :max="maxDate" />
    <button type="button" class="btn btn-primary" @click="checkAnswer">Answer</button>
  </div>
  <p>Select the month and day you heard and press Enter</p>
</template>


<script setup lang="ts">
import { ref, useTemplateRef, onMounted, nextTick, computed } from 'vue'
import { useNumberStore } from '../stores/numberStore.ts'
import { monthDayToFinnish } from '../lib/numberToFinnish'
import say from '../lib/say.ts'
import pingSound from '../assets/ping.mp3'

const answerInput = useTemplateRef('answerInput')

const asString = ref('')


const running = ref(false)
const answer = ref('')

const numberStore = useNumberStore()

const ping = new Audio(pingSound)


let day = -1
let month = -1

onMounted(async () => {
  running.value = true
  await nextTick()
  nextNumber()
})

const maxDate = computed(() => {
  const now = new Date()
  const year = now.getFullYear()
  return `${year}-12-31`
})

const minDate = computed(() => {
  const now = new Date()
  const year = now.getFullYear()
  return `${year}-01-01`
})  


async function nextNumber() {
  answerInput.value?.focus()
  const next = numberStore.nextMonthDay()
  day = next.day
  month = next.month
  console.log('next day/month', day, month)
  asString.value = monthDayToFinnish(next)
  await say(asString.value, numberStore.speechRate)
}

async function checkAnswer() {
  const answerDate = new Date(answer.value)
  const answerDay = answerDate.getDate()
  const answerMonth = answerDate.getMonth() + 1
  
  if (answerDay === day && answerMonth === month) {
    answer.value = ''
    numberStore.countCorrect += 1
    await ping.play()
    // await say('oikein')
    await nextNumber()
  } else {
    numberStore.countWrong += 1
    await say('väärin', 1.0)
    await say(asString.value, numberStore.speechRate)
  }
}
</script>