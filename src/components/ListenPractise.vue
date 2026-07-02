<template>
  <p v-if="numberStore.showNumber">{{ asString }}</p>
  <div class="input-group mb-3">
    <input ref="answerInput" class="form-control" v-model="answer" @keyup.enter="checkAnswer" type="number"
      pattern="\d*" />
    <button type="button" class="btn btn-primary" @click="checkAnswer">Answer</button>
  </div>
  <p>Type the number you heard and press Enter</p>
</template>


<script setup lang="ts">
import { ref, useTemplateRef, onMounted, nextTick } from 'vue'
import { useNumberStore } from '../stores/numberStore.ts'
import { numberToFinnish } from '../lib/numberToFinnish'
import say from '../lib/say.ts'
import pingSound from '../assets/ping.mp3'

const numberStore = useNumberStore()


const answerInput = useTemplateRef('answerInput')

const asString = ref('')

const running = ref(false)
const answer = ref('')

const ping = new Audio(pingSound)


let n = -1

onMounted(async () => {
  running.value = true
  await nextTick()
  nextNumber()
})

async function nextNumber() {
  answerInput.value?.focus()
  n = numberStore.nextNumber()
  asString.value = numberToFinnish(n)
  await say(asString.value, numberStore.speechRate)
}

async function checkAnswer() {
  if (parseInt(answer.value) === n) {
    answer.value = ''
    numberStore.countCorrect += 1
    await ping.play()
    // await say('oikein')
    await nextNumber()
  } else {
    answer.value = ''
    numberStore.countWrong += 1
    await say('väärin', 1.0)
    await say(asString.value, numberStore.speechRate)
  }
}
</script>