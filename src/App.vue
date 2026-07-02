<template>
  <header class="bg-light py-3 text-center">
      <h1>Learn Finnish numbers, days and months 🇫🇮</h1>
      <p v-if="state === 'start'" class="lead">Press the button to start</p>
      <button type="button" :disabled="state === 'listen'" class="btn btn-primary btn-sm" @click="startListen">Listen</button>
      <button type="button" :disabled="state === 'speak' || !isSpeechRecognitionSupported()" class="btn btn-primary btn-sm ms-3" @click="startSpeak">Speak</button>
      <button type="button" :disabled="state === 'daymonth'" class="btn btn-primary btn-sm ms-3" @click="startDayMonth">Day & Month</button>
      <div v-if="state !== 'start'" class="mt-3">
        <span class="text-muted me-3">🙂 Correct: {{ numberStore.countCorrect }}</span>
        <span class="me-3">😟 Wrong: {{ numberStore.countWrong }}</span>
        <input type="checkbox" class="form-check-input" id="showNumber" v-model="numberStore.showNumber" />
        <label for="showNumber" class="form-check-label me-3">&nbsp;Show number</label>
        <label for="speed" class="form-check-label ms-3">Speech speed</label>
        <span class="ms-3">🐌</span>
        <input type="range" class="mx-1" id="speed" name="speed" min="0.25" max="1.75" value="1" step="0.25" v-model="numberStore.speechRate" />🚀
        
    </div>
  </header>
  <main class="flex-shrink-0 mt-5">
    <div class="container text-center">
        <p v-if="!isSpeechRecognitionSupported()" class="text-danger mt-2">Speech recognition is not supported in this browser.</p>
      <template v-else-if="state == 'listen'">
        <ListenPractise />
      </template>
      <template v-else-if="state == 'speak'">
        <SpeakPractise />
      </template>
      <template v-else-if="state == 'daymonth'">
        <DayMonthPractise />
      </template>
    </div>
  </main>
</template>

<script setup lang="ts">
import ListenPractise from './components/ListenPractise.vue'
import SpeakPractise from './components/SpeakPractise.vue'
import DayMonthPractise from './components/DayMonthPractise.vue'
import { ref } from 'vue'
import { useNumberStore } from './stores/numberStore.ts'
const state = ref("start")
import { isSpeechRecognitionSupported } from './lib/listen.ts'

console.log('Speech recognition supported:', isSpeechRecognitionSupported())

const numberStore = useNumberStore()



function startListen() {
  state.value = "listen"
  useNumberStore().initialize()
}
function startSpeak() {
  state.value = "speak"
  useNumberStore().initialize()
}
function startDayMonth() {
  state.value = "daymonth"
  // useNumberStore().initialize()
}

</script>


<style scoped>
.container {
  width: auto;
  max-width: 680px;
  padding: 0 15px;
}
</style>
