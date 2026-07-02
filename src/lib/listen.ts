


export function isSpeechRecognitionSupported(): boolean {
  return 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window;
}

let recognition: SpeechRecognition | null = null;

export function stopListening() {
  if (recognition) {
    recognition.stop();
    recognition = null;
  }
}

export default function listen(): Promise<string> {

  return new Promise((resolve, reject) => {
    const SpeechRecognition = (window as any).SpeechRecognition ?? (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      reject('SpeechRecognition is not supported in this browser.');
      return;
    }

    recognition = new SpeechRecognition()
    if (!recognition) {
      reject('SpeechRecognition could not be started.')
      return;
    }
    console.log({ recognition })
    recognition.continuous = true;
    recognition.lang = "fi-FI";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.start();
    recognition.onresult = (event: SpeechRecognitionEvent) => {
      console.log({ event, recognition })
      const input = event.results?.[0]?.[0]?.transcript ?? '';
      console.log('Recognized text:', input);
      // emit('spoken', input);
      if (recognition) {
        recognition.stop();
        recognition = null
    }
      resolve(input)
    }
    recognition.onerror = (event) => {
      if (event.error === 'no-speech') {
        resolve('')
        return;
      }
      console.error('Speech recognition error:', event.error);
      if (recognition) {
        recognition.stop();
        recognition = null;
      }
      reject(event.error)
    }
  })
}
