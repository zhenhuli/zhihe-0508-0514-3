<template>
  <div class="app">
    <header class="header">
      <div class="container">
        <h1>🎵 乐理调式科普演示</h1>
        <p class="subtitle">探索大小调与中古调式的奥秘，聆听音阶的色彩</p>
      </div>
    </header>

    <main class="main">
      <div class="container">
        <div class="control-panel card mb-6">
          <div class="control-row">
            <div class="control-group">
              <label>根音选择</label>
              <div class="root-notes">
                <button
                  v-for="(note, index) in NOTE_NAMES"
                  :key="note"
                  class="root-btn"
                  :class="{ active: selectedRoot === index }"
                  :style="{ backgroundColor: selectedRoot === index ? NOTE_COLORS[note] : 'transparent' }"
                  @click="handleRootChange(index)"
                >
                  {{ note }}
                </button>
              </div>
            </div>
          </div>

          <div class="control-row mt-4">
            <div class="control-group">
              <label>调式类型</label>
              <div class="mode-filters">
                <button
                  v-for="type in modeTypes"
                  :key="type.value"
                  class="filter-btn"
                  :class="{ active: selectedType === type.value }"
                  @click="selectedType = type.value"
                >
                  {{ type.label }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="modes-grid grid mb-8">
          <div
            v-for="mode in filteredModes"
            :key="mode.name"
            class="mode-card card"
            :class="{ active: selectedMode?.name === mode.name }"
            @click="selectMode(mode)"
          >
            <div class="mode-header">
              <h3>{{ mode.chineseName }}</h3>
              <span class="mode-type" :class="mode.type">{{ getTypeLabel(mode.type) }}</span>
            </div>
            <p class="mode-desc">{{ mode.description }}</p>
            <div class="mode-intervals">
              <span v-for="(interval, i) in mode.intervals" :key="i" class="interval-tag">
                {{ interval }}
              </span>
            </div>
          </div>
        </div>

        <div v-if="selectedMode" class="scale-player card">
          <div class="player-header">
            <h2>{{ selectedMode.chineseName }}</h2>
            <div class="player-controls">
              <button
                class="btn btn-primary"
                :disabled="isPlaying"
                @click="playSelectedScale"
              >
                {{ isPlaying ? '播放中...' : '▶ 播放音阶' }}
              </button>
              <button class="btn btn-secondary" @click="playSelectedChord">
                🔊 播放和弦
              </button>
            </div>
          </div>

          <ScaleDisplay
            :notes="currentNotes"
            :intervals="scaleIntervals"
            :current-playing-index="currentPlayingIndex"
          />

          <div class="keyboard-wrapper mt-6">
            <PianoKeyboard
              :active-notes="activeNoteNames"
              :current-playing-index="currentPlayingIndex"
              @note-click="handleNoteClick"
            />
          </div>

          <div class="info-section mt-6">
            <h3>音阶信息</h3>
            <div class="info-grid">
              <div class="info-item">
                <span class="label">根音</span>
                <span class="value">{{ NOTE_NAMES[selectedRoot] }}</span>
              </div>
              <div class="info-item">
                <span class="label">音数</span>
                <span class="value">{{ currentNotes.length }} 个音</span>
              </div>
              <div class="info-item">
                <span class="label">半音数</span>
                <span class="value">{{ totalSemitones }}</span>
              </div>
              <div class="info-item">
                <span class="label">类型</span>
                <span class="value">{{ getTypeLabel(selectedMode.type) }}</span>
              </div>
            </div>
          </div>

          <div class="detail-section mt-6">
            <h3>调式详解</h3>
            
            <div class="detail-card">
              <div class="detail-icon">📐</div>
              <div class="detail-content">
                <h4>音程公式</h4>
                <p class="formula">{{ selectedMode.formula }}</p>
              </div>
            </div>

            <div class="detail-card">
              <div class="detail-icon">✨</div>
              <div class="detail-content">
                <h4>音乐特点</h4>
                <p>{{ selectedMode.characteristic }}</p>
              </div>
            </div>

            <div class="detail-card">
              <div class="detail-icon">🎯</div>
              <div class="detail-content">
                <h4>应用场景</h4>
                <p>{{ selectedMode.usage }}</p>
              </div>
            </div>

            <div class="detail-card">
              <div class="detail-icon">🎵</div>
              <div class="detail-content">
                <h4>代表作品</h4>
                <div class="works-list">
                  <span v-for="(work, index) in selectedMode.famousWorks" :key="index" class="work-tag">
                    {{ work }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <footer class="footer">
      <div class="container text-center">
        <p class="text-muted">基于 Web Audio API 的乐理调式演示工具</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick } from 'vue'
import {
  NOTE_NAMES,
  MODES,
  getModeNotes,
  type Note,
  type Mode
} from '~/composables/useMusicTheory'
import { useAudioPlayer } from '~/composables/useAudioPlayer'

const { isPlaying, currentPlayingIndex, playScale, playChord, playNote, stop } = useAudioPlayer()

const selectedRoot = ref(0)
const selectedMode = ref<Mode | null>(MODES[0])
const selectedType = ref<string>('all')

function handleRootChange(index: number) {
  selectedRoot.value = index
}

const modeTypes = [
  { value: 'all', label: '全部' },
  { value: 'major', label: '大调' },
  { value: 'minor', label: '小调' },
  { value: 'modal', label: '中古调式' }
]

const filteredModes = computed(() => {
  if (selectedType.value === 'all') return MODES
  return MODES.filter(m => m.type === selectedType.value)
})

const currentNotes = computed<Note[]>(() => {
  if (!selectedMode.value) return []
  return getModeNotes(selectedMode.value, selectedRoot.value)
})

const activeNoteNames = computed(() => {
  return currentNotes.value.map(n => n.name)
})

const scaleIntervals = computed(() => {
  if (!selectedMode.value) return []
  const intervals = selectedMode.value.intervals
  const result = []
  for (let i = 1; i < intervals.length; i++) {
    result.push(intervals[i] - intervals[i - 1])
  }
  return result
})

const totalSemitones = computed(() => {
  return scaleIntervals.value.reduce((a, b) => a + b, 0)
})

function getTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    major: '大调',
    minor: '小调',
    modal: '中古调式'
  }
  return labels[type] || type
}

function selectMode(mode: Mode) {
  selectedMode.value = mode
  nextTick(() => {
    const playerElement = document.querySelector('.scale-player')
    if (playerElement) {
      playerElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  })
}

function playSelectedScale() {
  playScale(currentNotes.value, 0.4, 0.08)
}

function playSelectedChord() {
  playChord(currentNotes.value.slice(0, 4), 1.5)
}

function handleNoteClick(note: any) {
  playNote(note.frequency || 440, 0.5)
}
</script>

<style lang="scss">
.app {
  min-height: 100vh;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
}

.header {
  padding: 48px 0 32px;
  text-align: center;

  h1 {
    font-size: 2.5rem;
    margin-bottom: 12px;
    background: linear-gradient(135deg, $primary-color, $accent-color);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .subtitle {
    font-size: 1.1rem;
    color: $dark-text-muted;
  }
}

.main {
  padding-bottom: 60px;
}

.control-panel {
  .control-row {
    display: flex;
    flex-wrap: wrap;
    gap: 24px;
  }

  .control-group {
    flex: 1;
    min-width: 280px;

    label {
      display: block;
      font-weight: 600;
      margin-bottom: 12px;
      color: $dark-text;
    }
  }

  .root-notes {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;

    .root-btn {
      width: 44px;
      height: 44px;
      border-radius: 8px;
      border: 2px solid $dark-border;
      background: transparent;
      color: $dark-text;
      font-weight: 600;
      cursor: pointer;
      transition: all $transition-fast;

      &:hover {
        border-color: $primary-color;
      }

      &.active {
        color: white;
        border-color: transparent;
        transform: scale(1.1);
      }
    }
  }

  .mode-filters {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;

    .filter-btn {
      padding: 10px 20px;
      border-radius: 8px;
      border: 2px solid $dark-border;
      background: transparent;
      color: $dark-text;
      font-weight: 500;
      cursor: pointer;
      transition: all $transition-fast;

      &:hover {
        border-color: $primary-color;
      }

      &.active {
        background: $primary-color;
        border-color: $primary-color;
        color: white;
      }
    }
  }
}

.modes-grid {
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));

  .mode-card {
    cursor: pointer;
    transition: all $transition-normal;
    border: 2px solid transparent;

    &:hover {
      transform: translateY(-4px);
      border-color: rgba(99, 102, 241, 0.3);
    }

    &.active {
      border-color: $primary-color;
      background: linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%);
    }

    .mode-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 12px;

      h3 {
        margin: 0;
        font-size: 1.1rem;
      }

      .mode-type {
        padding: 4px 10px;
        border-radius: 20px;
        font-size: 12px;
        font-weight: 600;

        &.major {
          background: rgba(16, 185, 129, 0.2);
          color: #10b981;
        }

        &.minor {
          background: rgba(239, 68, 68, 0.2);
          color: #ef4444;
        }

        &.modal {
          background: rgba(139, 92, 246, 0.2);
          color: #8b5cf6;
        }
      }
    }

    .mode-desc {
      font-size: 14px;
      color: $dark-text-muted;
      margin-bottom: 12px;
      line-height: 1.5;
    }

    .mode-intervals {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;

      .interval-tag {
        padding: 4px 8px;
        background: $dark-border;
        border-radius: 4px;
        font-size: 12px;
        font-weight: 600;
        color: $dark-text;
      }
    }
  }
}

.scale-player {
  .player-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 16px;
    margin-bottom: 24px;

    h2 {
      margin: 0;
    }

    .player-controls {
      display: flex;
      gap: 12px;
    }
  }

  .keyboard-wrapper {
    padding: 24px;
    background: rgba(30, 41, 59, 0.5);
    border-radius: 12px;
  }

  .info-section {
    h3 {
      margin-bottom: 16px;
      font-size: 1.1rem;
    }

    .info-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 16px;

      .info-item {
        padding: 16px;
        background: rgba(30, 41, 59, 0.5);
        border-radius: 8px;
        text-align: center;

        .label {
          display: block;
          font-size: 12px;
          color: $dark-text-muted;
          margin-bottom: 8px;
        }

        .value {
          font-size: 18px;
          font-weight: 700;
          color: $primary-color;
        }
      }
    }
  }

  .detail-section {
    h3 {
      margin-bottom: 16px;
      font-size: 1.25rem;
    }

    .detail-card {
      display: flex;
      gap: 16px;
      padding: 20px;
      background: rgba(30, 41, 59, 0.6);
      border-radius: 12px;
      margin-bottom: 12px;
      border: 1px solid rgba(99, 102, 241, 0.1);
      transition: all 0.3s ease;

      &:hover {
        background: rgba(30, 41, 59, 0.8);
        border-color: rgba(99, 102, 241, 0.3);
        transform: translateX(4px);
      }

      .detail-icon {
        font-size: 2rem;
        flex-shrink: 0;
        width: 48px;
        height: 48px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(139, 92, 246, 0.2));
        border-radius: 12px;
      }

      .detail-content {
        flex: 1;

        h4 {
          font-size: 1rem;
          margin-bottom: 8px;
          color: $dark-text;
        }

        p {
          font-size: 0.9rem;
          color: $dark-text-muted;
          line-height: 1.6;
          margin: 0;
        }

        .formula {
          font-family: 'Courier New', monospace;
          font-weight: 600;
          color: $secondary-color;
          font-size: 1rem;
          letter-spacing: 2px;
        }

        .works-list {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 4px;

          .work-tag {
            padding: 6px 12px;
            background: rgba(99, 102, 241, 0.15);
            border-radius: 20px;
            font-size: 0.8rem;
            color: $primary-color;
            border: 1px solid rgba(99, 102, 241, 0.3);
            transition: all 0.2s ease;

            &:hover {
              background: rgba(99, 102, 241, 0.3);
              transform: scale(1.05);
            }
          }
        }
      }
    }
  }
}

.footer {
  padding: 24px 0;
  border-top: 1px solid $dark-border;
}

@media (max-width: 768px) {
  .header h1 {
    font-size: 1.8rem;
  }

  .player-header {
    flex-direction: column;
    align-items: flex-start !important;
  }

  .modes-grid {
    grid-template-columns: 1fr;
  }

  .detail-card {
    flex-direction: column;
    gap: 12px;

    .detail-icon {
      width: 40px;
      height: 40px;
      font-size: 1.5rem;
    }
  }

  .works-list {
    .work-tag {
      font-size: 0.75rem;
      padding: 4px 10px;
    }
  }
}
</style>
