<template>
  <div class="dizi-fingering">
    <el-card class="main-card">
      <div slot="header" class="card-header">
        <div class="header-left">
          <span>🎼 {{ currentSong ? currentSong.name : '请选择曲目' }}</span>
          <el-tag v-if="currentSong" type="info" size="mini" style="margin-left: 8px;">
            共 {{ currentSong.fingeringSequence.length }} 个指法
          </el-tag>
        </div>
        <div class="header-right">
          <span class="speed-label">演示速度:</span>
          <el-slider
            v-model="playSpeed"
            :min="500"
            :max="3000"
            :step="100"
            style="width: 150px; display: inline-block; margin: 0 12px;"
          />
          <span>{{ (playSpeed / 1000).toFixed(1) }}s</span>
        </div>
      </div>

      <div v-if="currentSong" class="content">
        <div class="dizi-visualization">
          <div class="dizi-container">
            <div class="dizi-body">
              <div class="dizi-left">
                <div class="mouthpiece"></div>
              </div>
              <div class="dizi-holes">
                <div
                  v-for="(hole, index) in currentFingering.holes"
                  :key="index"
                  class="hole-wrapper"
                >
                  <div class="hole-label">{{ holeNames[index] }}</div>
                  <div class="hole" :class="{ closed: hole === 0, open: hole === 1 }">
                    <span v-if="hole === 0">●</span>
                    <span v-else>○</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="note-display">
          <div class="current-note">
            <span class="note-label">当前音符</span>
            <span class="note-value">{{ currentFingering.note }}</span>
            <span class="note-name">({{ currentFingering.name }})</span>
          </div>
          <div class="progress-info">
            第 {{ currentIndex + 1 }} / {{ currentSong.fingeringSequence.length }} 个指法
          </div>
        </div>

        <div class="control-panel">
          <el-button-group>
            <el-button icon="el-icon-d-arrow-left" @click="prevStep" :disabled="isPlaying">
              上一个
            </el-button>
            <el-button :icon="isPlaying ? 'el-icon-video-pause' : 'el-icon-video-play'" type="primary" @click="togglePlay">
              {{ isPlaying ? '暂停' : '开始演示' }}
            </el-button>
            <el-button icon="el-icon-d-arrow-right" @click="nextStep" :disabled="isPlaying">
              下一个
            </el-button>
          </el-button-group>
          <el-button icon="el-icon-refresh-left" @click="reset">
            重置
          </el-button>
        </div>

        <div class="sequence-display">
          <div class="sequence-title">指法序列</div>
          <div class="sequence-list">
            <div
              v-for="(item, index) in currentSong.fingeringSequence"
              :key="index"
              class="sequence-item"
              :class="{ active: index === currentIndex, played: index < currentIndex }"
              @click="jumpTo(index)"
            >
              <span class="seq-note">{{ item.note }}</span>
              <div class="seq-holes">
                <span
                  v-for="(h, i) in item.holes"
                  :key="i"
                  class="seq-hole"
                  :class="{ closed: h === 0, open: h === 1 }"
                >{{ h === 0 ? '●' : '○' }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="legend">
          <div class="legend-item">
            <span class="legend-dot open">○</span>
            <span>开孔</span>
          </div>
          <div class="legend-item">
            <span class="legend-dot closed">●</span>
            <span>闭孔（按指）</span>
          </div>
        </div>
      </div>

      <el-empty v-else description="请从左侧选择一个曲目开始学习" />
    </el-card>
  </div>
</template>

<script>
import { holeNames } from '../data/songs.js'

export default {
  name: 'DiziFingering',
  data() {
    return {
      currentSong: null,
      currentIndex: 0,
      isPlaying: false,
      playSpeed: 1500,
      playTimer: null,
      holeNames
    }
  },
  computed: {
    currentFingering() {
      if (!this.currentSong) return { holes: [0, 0, 0, 0, 0, 0], note: '-', name: '' }
      return this.currentSong.fingeringSequence[this.currentIndex] || { holes: [0, 0, 0, 0, 0, 0], note: '-', name: '' }
    }
  },
  methods: {
    selectSong(song) {
      this.currentSong = song
      this.reset()
    },
    prevStep() {
      if (this.currentIndex > 0) {
        this.currentIndex--
      }
    },
    nextStep() {
      if (this.currentIndex < this.currentSong.fingeringSequence.length - 1) {
        this.currentIndex++
      } else {
        this.stopPlay()
      }
    },
    togglePlay() {
      if (this.isPlaying) {
        this.stopPlay()
      } else {
        this.startPlay()
      }
    },
    startPlay() {
      if (this.currentIndex >= this.currentSong.fingeringSequence.length - 1) {
        this.currentIndex = 0
      }
      this.isPlaying = true
      this.playTimer = setInterval(() => {
        this.nextStep()
      }, this.playSpeed)
    },
    stopPlay() {
      this.isPlaying = false
      if (this.playTimer) {
        clearInterval(this.playTimer)
        this.playTimer = null
      }
    },
    reset() {
      this.stopPlay()
      this.currentIndex = 0
    },
    jumpTo(index) {
      if (!this.isPlaying) {
        this.currentIndex = index
      }
    }
  },
  mounted() {
    this.$root.$on('select-song', this.selectSong)
  },
  beforeDestroy() {
    this.$root.$off('select-song', this.selectSong)
    this.stopPlay()
  }
}
</script>

<style scoped>
.dizi-fingering {
  height: 100%;
}

.main-card {
  height: calc(100vh - 128px);
  overflow-y: auto;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  font-size: 16px;
}

.header-right {
  display: flex;
  align-items: center;
}

.speed-label {
  font-size: 14px;
  color: #606266;
  font-weight: normal;
}

.content {
  padding: 10px 0;
}

.dizi-visualization {
  display: flex;
  justify-content: center;
  margin-bottom: 24px;
}

.dizi-container {
  background: linear-gradient(180deg, #8B4513 0%, #A0522D 50%, #8B4513 100%);
  border-radius: 40px;
  padding: 30px 40px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
}

.dizi-body {
  display: flex;
  align-items: center;
}

.dizi-left {
  margin-right: 30px;
}

.mouthpiece {
  width: 30px;
  height: 30px;
  background: #4a2c0a;
  border-radius: 50%;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.5);
}

.dizi-holes {
  display: flex;
  gap: 18px;
}

.hole-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.hole-label {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.8);
  white-space: nowrap;
}

.hole {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  transition: all 0.3s ease;
}

.hole.open {
  background: #2c1810;
  color: #fff;
  box-shadow: inset 0 4px 8px rgba(0, 0, 0, 0.8);
}

.hole.closed {
  background: linear-gradient(145deg, #d4a574, #b8956a);
  color: #4a2c0a;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
}

.note-display {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 16px 24px;
  border-radius: 12px;
  margin-bottom: 20px;
}

.current-note {
  display: flex;
  align-items: baseline;
  gap: 12px;
}

.note-label {
  font-size: 14px;
  opacity: 0.9;
}

.note-value {
  font-size: 48px;
  font-weight: bold;
  line-height: 1;
}

.note-name {
  font-size: 18px;
  opacity: 0.95;
}

.progress-info {
  font-size: 14px;
  opacity: 0.9;
}

.control-panel {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-bottom: 24px;
}

.sequence-display {
  background: #f5f7fa;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
}

.sequence-title {
  font-weight: 600;
  margin-bottom: 12px;
  color: #303133;
}

.sequence-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.sequence-item {
  background: white;
  border: 2px solid #ebeef5;
  border-radius: 8px;
  padding: 8px 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 60px;
  text-align: center;
}

.sequence-item:hover {
  border-color: #667eea;
  transform: translateY(-2px);
}

.sequence-item.active {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-color: transparent;
  color: white;
}

.sequence-item.played {
  background: #ecf5ff;
  border-color: #b3d8ff;
}

.seq-note {
  display: block;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 4px;
}

.seq-holes {
  display: flex;
  justify-content: center;
  gap: 2px;
}

.seq-hole {
  font-size: 8px;
}

.seq-hole.open {
  color: #606266;
}

.seq-hole.closed {
  color: #409eff;
}

.legend {
  display: flex;
  justify-content: center;
  gap: 32px;
  padding-top: 16px;
  border-top: 1px solid #ebeef5;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #606266;
}

.legend-dot {
  font-size: 18px;
}

.legend-dot.open {
  color: #606266;
}

.legend-dot.closed {
  color: #409eff;
}
</style>
