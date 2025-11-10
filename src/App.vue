
<template>
  <main class="flex-shrink-0">
    <div class="container text-center">
      <h1 class="mt-5">Finnish numbers 🇫🇮</h1>
      <template v-if="!running">
        <p>Press the button to start</p>
        <button type="button" class="btn btn-primary" @click="start">Start</button>
      </template>
      <template v-else>
        <p v-if="showNumber">{{ asString }}</p>
        <div class="input-group mb-3">
          <input ref="answerInput" class="form-control" v-model="answer" @keyup.enter="checkAnswer" type="number" pattern="\d*" />
          <button type="button" class="btn btn-primary" @click="checkAnswer">Answer</button>
        </div>
        <p>Type the number you heard and press Enter</p>
      </template>

    </div>
  </main>

  <footer class="footer fixed-bottom mt-auto py-3 bg-light text-center">
    <div class="container">
      <span class="text-muted me-3">🙂 Correct: {{countCorrect}}</span>
      <span class="me-3">😟 Wrong: {{countWrong}}</span>
      <input type="checkbox" class="form-check-input" id="showNumber" v-model="showNumber" />
      <label for="showNumber" class="form-check-label">&nbsp;Show number</label>
    </div>
  </footer>
</template>

<script setup lang="ts">
 
  import { nextTick, ref, useTemplateRef } from 'vue'
  import numberToFinnish from './lib/numberToFinnish'
  import say from './lib/say'
  import pingSound from './assets/ping.mp3'

  const running = ref(false)
  const showNumber = ref(false)
  const answer = ref('')
  const answerInput = useTemplateRef('answerInput')

  const countCorrect = ref(0)
  const countWrong = ref(0)

  const ping = new Audio(pingSound)


  let n = -1
  const asString = ref('')

  async function start() {
    running.value = true
    await nextTick()
    answerInput.value?.focus()
    nextNumber()
  }

  async function nextNumber() { 
    n = Math.floor(Math.random() * 100)
    asString.value = numberToFinnish(n)
    await say(asString.value)
  }

  async function checkAnswer() {
    if (parseInt(answer.value) === n) {
      answer.value = ''
      countCorrect.value += 1
      await ping.play()
      // await say('oikein')
      await nextNumber()
    } else {
      answer.value = ''
      countWrong.value += 1
      await say('väärin')
      await say(asString.value)
    }
  }
</script>


<style scoped>
  .container {
    width: auto;
    max-width: 680px;
    padding: 0 15px;
  }
</style>
