<template>
  <p style="font-size: 4rem">{{ number }}</p>
  <p>Say the number out loud</p>
  <p v-if="spoken" class="text-danger">You said "{{ spoken }}"</p>
  <p v-if="error" class="text-danger">{{ error }}</p>
</template>

<script setup lang="ts">

import { ref, onMounted, onUnmounted } from 'vue';
import listen, { stopListening } from '../lib/listen';
import { numberToFinnish } from '../lib/numberToFinnish.ts'
import { useNumberStore } from '../stores/numberStore.ts';
import pingSound from '../assets/ping.mp3'
import failureSound from '../assets/failure.mp3'

const ping = new Audio(pingSound);
const failure = new Audio(failureSound);

const numberStore = useNumberStore();
const number = ref(0);
const spoken = ref('');
const error = ref('');

onMounted(async () => {

  nextNumber();
});

onUnmounted(() => {
  console.log('Unmounting SpeakPractise, stopping listening');
  stopListening();
});


async function nextNumber() {
  for (; ;) {
    number.value = numberStore.nextNumber()
    spoken.value = '';
    const finnish = numberToFinnish(number.value);

    for (; ;) {

    try {
      spoken.value = await listen();
    } catch (e) {
      console.error('Listening error:', e);
      error.value = 'Error during listening. Please try again.';
      return; // Retry listening on error
    }
      console.log('heard', spoken.value, 'expected', finnish);
      if (!spoken.value) {
        // No speech detected, try again
        continue;
      }

      const normalizedSpoken = spoken.value.trim().toLowerCase();
      const numberStr = number.value.toString();



      if (normalizedSpoken === numberStr || normalizedSpoken === finnish) {
        ping.play();
        numberStore.countCorrect++;
        console.log('correct', spoken.value);
        break
      } else {
        failure.play();
        numberStore.countWrong++;
        console.log('wrong', spoken.value);
      }
    }
  }
}

</script>


<style scoped></style>