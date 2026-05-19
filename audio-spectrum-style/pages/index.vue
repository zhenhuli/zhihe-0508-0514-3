<template>
  <div class="spectrum-page">
    <header class="header">
      <h1 class="title">🎵 Audio Spectrum Visualizer</h1>
      <p class="subtitle">选择音频输入方式，体验四种炫酷频谱效果</p>
    </header>

    <div class="main-content">
      <div class="control-panel card">
        <div class="control-section">
          <h3>音频输入</h3>
          <div class="input-buttons">
            <label class="btn file-label">
              📁 选择音频文件
              <input
                type="file"
                accept="audio/*"
                class="file-input"
                @change="handleFileSelect"
                ref="fileInput"
              />
            </label>
            <button
              class="btn"
              :class="{ active: useMic }"
              @click="toggleMic"
            >
              🎤 {{ useMic ? '关闭麦克风' : '使用麦克风' }}
            </button>
          </div>
          <div v-if="selectedFile" class="file-info">
            已选择: {{ selectedFile.name }}
            <button
              v-if="!isPlaying"
              class="btn small"
              @click="playAudio"
            >
              ▶️ 播放
            </button>
            <button
              v-else
              class="btn small"
              @click="pauseAudio"
            >
              ⏸️ 暂停
            </button>
          </div>
        </div>

        <div class="control-section">
          <h3>频谱样式</h3>
          <div class="style-buttons">
            <button
              v-for="style in spectrumStyles"
              :key="style.value"
              class="btn"
              :class="{ active: currentStyle === style.value }"
              @click="currentStyle = style.value"
            >
              {{ style.icon }} {{ style.label }}
            </button>
          </div>
        </div>

        <div class="control-section">
          <h3>配色方案</h3>
          <div class="color-presets">
            <button
              v-for="preset in colorPresets"
              :key="preset.name"
              class="color-preset"
              :class="{ active: colorStart === preset.start && colorEnd === preset.end }"
              :style="{ background: `linear-gradient(135deg, ${preset.start}, ${preset.end})` }"
              @click="colorStart = preset.start; colorEnd = preset.end"
              :title="preset.name"
            />
          </div>
          <div class="custom-colors">
            <div class="color-picker">
              <label>起始色</label>
              <input type="color" v-model="colorStart" />
              <span class="color-value">{{ colorStart }}</span>
            </div>
            <div class="color-picker">
              <label>结束色</label>
              <input type="color" v-model="colorEnd" />
              <span class="color-value">{{ colorEnd }}</span>
            </div>
          </div>
        </div>

        <div class="control-section">
          <h3>灵敏度</h3>
          <div class="slider-control">
            <input
              type="range"
              v-model.number="sensitivity"
              min="0.1"
              max="3"
              step="0.1"
            />
            <span class="slider-value">{{ sensitivity.toFixed(1) }}x</span>
          </div>
        </div>
      </div>

      <div class="spectrum-container card">
        <div class="spectrum-wrapper">
          <BarSpectrum
            v-if="currentStyle === 'bar'"
            :frequencyData="frequencyData"
            :sensitivity="sensitivity"
            :colorStart="colorStart"
            :colorEnd="colorEnd"
          />
          <WaveSpectrum
            v-else-if="currentStyle === 'wave'"
            :frequencyData="frequencyData"
            :sensitivity="sensitivity"
            :colorStart="colorStart"
            :colorEnd="colorEnd"
          />
          <RingSpectrum
            v-else-if="currentStyle === 'ring'"
            :frequencyData="frequencyData"
            :sensitivity="sensitivity"
            :colorStart="colorStart"
            :colorEnd="colorEnd"
          />
          <ParticleSpectrum
            v-else-if="currentStyle === 'particle'"
            :frequencyData="frequencyData"
            :sensitivity="sensitivity"
            :colorStart="colorStart"
            :colorEnd="colorEnd"
          />
        </div>
        <div v-if="!isPlaying && !useMic" class="placeholder">
          <div class="placeholder-icon">🎧</div>
          <p>上传音频文件或开启麦克风开始可视化</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useAudioAnalyzer } from '~/composables/useAudioAnalyzer'

const { initAudio, initMic, play, pause, getFrequencyData, isPlaying, cleanup } = useAudioAnalyzer()

const currentStyle = ref('bar')
const sensitivity = ref(1.5)
const colorStart = ref('#667eea')
const colorEnd = ref('#764ba2')
const useMic = ref(false)
const selectedFile = ref<File | null>(null)
const frequencyData = ref<number[]>(new Array(128).fill(0))
const fileInput = ref<HTMLInputElement | null>(null)

let animationId: number | null = null

const spectrumStyles = [
  { value: 'bar', label: '柱状', icon: '📊' },
  { value: 'wave', label: '波浪', icon: '🌊' },
  { value: 'ring', label: '环形', icon: '⭕' },
  { value: 'particle', label: '粒子', icon: '✨' }
]

const colorPresets = [
  { name: '紫色', start: '#667eea', end: '#764ba2' },
  { name: '粉色', start: '#f093fb', end: '#f5576c' },
  { name: '青色', start: '#4facfe', end: '#00f2fe' },
  { name: '绿色', start: '#43e97b', end: '#38f9d7' },
  { name: '橙色', start: '#fa709a', end: '#fee140' },
  { name: '红色', start: '#f43f5e', end: '#ef4444' }
]

const updateFrequencyData = () => {
  frequencyData.value = getFrequencyData()
  animationId = requestAnimationFrame(updateFrequencyData)
}

const handleFileSelect = async (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) {
    selectedFile.value = file
    useMic.value = false
    await initAudio(file)
    play()
  }
}

const toggleMic = async () => {
  if (useMic.value) {
    cleanup()
    useMic.value = false
    frequencyData.value = new Array(128).fill(0)
  } else {
    selectedFile.value = null
    if (fileInput.value) {
      fileInput.value.value = ''
    }
    const success = await initMic()
    if (success) {
      useMic.value = true
    }
  }
}

const playAudio = () => {
  play()
}

const pauseAudio = () => {
  pause()
}

onMounted(() => {
  updateFrequencyData()
})

onUnmounted(() => {
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
})
</script>

<style lang="scss" scoped>
.spectrum-page {
  min-height: 100vh;
  padding: 20px;
  background: $bg-dark;
}

.header {
  text-align: center;
  margin-bottom: 30px;

  .title {
    font-size: 2.5rem;
    font-weight: 700;
    background: $gradient-purple;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 10px;
  }

  .subtitle {
    color: $text-secondary;
    font-size: 1rem;
  }
}

.main-content {
  display: grid;
  grid-template-columns: 350px 1fr;
  gap: 20px;
  max-width: 1400px;
  margin: 0 auto;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
}

.control-panel {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.control-section {
  h3 {
    font-size: 0.9rem;
    font-weight: 600;
    color: $text-secondary;
    margin-bottom: 12px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
}

.input-buttons {
  display: flex;
  flex-direction: column;
  gap: 10px;

  .file-label {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    .file-input {
      display: none;
    }
  }
}

.file-info {
  margin-top: 10px;
  padding: 10px;
  background: $bg-dark;
  border-radius: 8px;
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  flex-wrap: wrap;

  .small {
    padding: 5px 12px;
    font-size: 0.8rem;
  }
}

.style-buttons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}

.color-presets {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 15px;

  .color-preset {
    width: 36px;
    height: 36px;
    border-radius: 8px;
    border: 2px solid transparent;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      transform: scale(1.1);
    }

    &.active {
      border-color: $text-primary;
      transform: scale(1.1);
    }
  }
}

.custom-colors {
  display: flex;
  gap: 20px;

  .color-picker {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;

    label {
      font-size: 0.8rem;
      color: $text-secondary;
    }

    .color-value {
      font-size: 0.75rem;
      color: $text-secondary;
      font-family: monospace;
    }
  }
}

.slider-control {
  display: flex;
  align-items: center;
  gap: 15px;

  input[type="range"] {
    flex: 1;
  }

  .slider-value {
    min-width: 50px;
    text-align: right;
    font-weight: 600;
    color: $primary-color;
    font-family: monospace;
  }
}

.spectrum-container {
  min-height: 500px;
  position: relative;
  overflow: hidden;
}

.spectrum-wrapper {
  width: 100%;
  height: 100%;
  min-height: 460px;
}

.placeholder {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: $text-secondary;
  pointer-events: none;

  .placeholder-icon {
    font-size: 4rem;
    margin-bottom: 15px;
    opacity: 0.5;
  }

  p {
    font-size: 1rem;
  }
}
</style>
