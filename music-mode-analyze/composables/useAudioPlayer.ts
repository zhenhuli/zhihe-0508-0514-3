import type { Note } from './useMusicTheory'

export function useAudioPlayer() {
  const audioContext = ref<AudioContext | null>(null)
  const isPlaying = ref(false)
  const currentNoteIndex = ref(-1)

  function initAudioContext() {
    if (!audioContext.value) {
      audioContext.value = new (window.AudioContext || (window as any).webkitAudioContext)()
    }
    return audioContext.value
  }

  function playNote(frequency: number, duration: number = 0.5, startTime: number = 0): Promise<void> {
    return new Promise((resolve) => {
      const ctx = initAudioContext()
      const oscillator = ctx.createOscillator()
      const gainNode = ctx.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(ctx.destination)

      oscillator.type = 'sine'
      oscillator.frequency.value = frequency

      const now = ctx.currentTime + startTime
      gainNode.gain.setValueAtTime(0, now)
      gainNode.gain.linearRampToValueAtTime(0.3, now + 0.05)
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + duration)

      oscillator.start(now)
      oscillator.stop(now + duration)

      setTimeout(() => resolve(), duration * 1000)
    })
  }

  async function playScale(notes: Note[], noteDuration: number = 0.4, pauseBetween: number = 0.1) {
    if (isPlaying.value) return
    
    isPlaying.value = true
    currentNoteIndex.value = 0

    for (let i = 0; i < notes.length; i++) {
      currentNoteIndex.value = i
      await playNote(notes[i].frequency, noteDuration)
      if (i < notes.length - 1) {
        await new Promise(resolve => setTimeout(resolve, pauseBetween * 1000))
      }
    }

    currentNoteIndex.value = -1
    isPlaying.value = false
  }

  async function playChord(notes: Note[], duration: number = 1) {
    const ctx = initAudioContext()
    const now = ctx.currentTime

    notes.forEach(note => {
      const oscillator = ctx.createOscillator()
      const gainNode = ctx.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(ctx.destination)

      oscillator.type = 'triangle'
      oscillator.frequency.value = note.frequency

      gainNode.gain.setValueAtTime(0, now)
      gainNode.gain.linearRampToValueAtTime(0.15, now + 0.1)
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + duration)

      oscillator.start(now)
      oscillator.stop(now + duration)
    })
  }

  function stop() {
    isPlaying.value = false
    currentNoteIndex.value = -1
  }

  return {
    isPlaying,
    currentNoteIndex,
    playNote,
    playScale,
    playChord,
    stop
  }
}
