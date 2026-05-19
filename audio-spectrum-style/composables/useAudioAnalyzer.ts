import { ref, onUnmounted } from 'vue'

export function useAudioAnalyzer() {
  const audioContext = ref<AudioContext | null>(null)
  const analyser = ref<AnalyserNode | null>(null)
  const dataArray = ref<Uint8Array | null>(null)
  const source = ref<MediaStreamAudioSourceNode | null>(null)
  const isPlaying = ref(false)
  const audioElement = ref<HTMLAudioElement | null>(null)
  const animationId = ref<number | null>(null)

  const initAudio = async (file?: File) => {
    if (!audioContext.value) {
      audioContext.value = new (window.AudioContext || (window as any).webkitAudioContext)()
    }

    if (!analyser.value) {
      analyser.value = audioContext.value.createAnalyser()
      analyser.value.fftSize = 256
      const bufferLength = analyser.value.frequencyBinCount
      dataArray.value = new Uint8Array(bufferLength)
    }

    if (file) {
      if (audioElement.value) {
        audioElement.value.pause()
        audioElement.value.src = ''
      }
      audioElement.value = new Audio()
      audioElement.value.src = URL.createObjectURL(file)
      audioElement.value.crossOrigin = 'anonymous'

      if (source.value) {
        source.value.disconnect()
      }
      source.value = audioContext.value.createMediaElementSource(audioElement.value)
      source.value.connect(analyser.value)
      analyser.value.connect(audioContext.value.destination)
    }
  }

  const initMic = async () => {
    try {
      if (!audioContext.value) {
        audioContext.value = new (window.AudioContext || (window as any).webkitAudioContext)()
      }

      if (!analyser.value) {
        analyser.value = audioContext.value.createAnalyser()
        analyser.value.fftSize = 256
        const bufferLength = analyser.value.frequencyBinCount
        dataArray.value = new Uint8Array(bufferLength)
      }

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      if (source.value) {
        source.value.disconnect()
      }
      source.value = audioContext.value.createMediaStreamSource(stream)
      source.value.connect(analyser.value)
      isPlaying.value = true
      return true
    } catch (error) {
      console.error('麦克风访问失败:', error)
      return false
    }
  }

  const play = async () => {
    if (audioElement.value && audioContext.value) {
      if (audioContext.value.state === 'suspended') {
        await audioContext.value.resume()
      }
      await audioElement.value.play()
      isPlaying.value = true
    }
  }

  const pause = () => {
    if (audioElement.value) {
      audioElement.value.pause()
      isPlaying.value = false
    }
  }

  const getFrequencyData = (): number[] => {
    if (!analyser.value || !dataArray.value) return []
    analyser.value.getByteFrequencyData(dataArray.value)
    return Array.from(dataArray.value)
  }

  const getAverageVolume = (): number => {
    const data = getFrequencyData()
    if (data.length === 0) return 0
    const sum = data.reduce((a, b) => a + b, 0)
    return sum / data.length
  }

  const cleanup = () => {
    if (animationId.value) {
      cancelAnimationFrame(animationId.value)
    }
    if (audioElement.value) {
      audioElement.value.pause()
      audioElement.value.src = ''
    }
    if (source.value) {
      source.value.disconnect()
    }
    if (audioContext.value) {
      audioContext.value.close()
    }
    audioContext.value = null
    analyser.value = null
    dataArray.value = null
    source.value = null
    isPlaying.value = false
  }

  onUnmounted(() => {
    cleanup()
  })

  return {
    audioContext,
    analyser,
    dataArray,
    isPlaying,
    initAudio,
    initMic,
    play,
    pause,
    getFrequencyData,
    getAverageVolume,
    cleanup
  }
}
