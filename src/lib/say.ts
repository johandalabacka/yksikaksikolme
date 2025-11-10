

const synth = window.speechSynthesis
let voice: SpeechSynthesisVoice | null = null

export default async function say(s: string): Promise<void> {
  if (!voice) {
    const voices = synth.getVoices() // .find(v => v.lang === 'fi')
    voice = voices.find(v => v.name === 'Satu' || v.name === 'Satu (Finska (Finland))') ?? null
    if (!voice) {
      voice = voices.find(v => v.lang === 'fi-FI') ?? null
    }
  }
  if (!voice) {
    throw new Error('Voice Satu not found')
  }

  return new Promise((resolve, reject) => {
    const utterThis = new SpeechSynthesisUtterance(s);
    utterThis.voice = voice

    utterThis.onend = function (_event: SpeechSynthesisEvent) {
      resolve()
    };

    utterThis.onerror = function (_event: SpeechSynthesisErrorEvent) {
      reject()
    };

    // utterThis.pitch = pitch.value;
    // utterThis.rate = rate.value;
    synth.speak(utterThis)
  })
}