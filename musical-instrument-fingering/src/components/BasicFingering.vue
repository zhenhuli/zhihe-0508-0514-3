<template>
  <div class="basic-fingering">
    <el-card class="main-card">
      <div slot="header" class="card-header">
        <span>📖 笛子基础指法表</span>
        <el-tag type="success" size="mini">共 {{ basicFingerings.length }} 个常用指法</el-tag>
      </div>

      <div class="range-filter">
        <span class="filter-label">音区筛选：</span>
        <el-radio-group v-model="selectedRange" size="small">
          <el-radio-button label="all">全部</el-radio-button>
          <el-radio-button label="low">低音区</el-radio-button>
          <el-radio-button label="mid">中音区</el-radio-button>
          <el-radio-button label="high">高音区</el-radio-button>
        </el-radio-group>
      </div>

      <div class="fingering-list">
        <div
          v-for="(item, index) in filteredFingerings"
          :key="index"
          class="fingering-card"
          :class="{ active: selectedIndex === index }"
          @click="selectFingering(index)"
        >
          <div class="note-info">
            <div class="note-name">{{ item.note }}</div>
            <div class="solfege">{{ item.solfege }}</div>
          </div>
          <div class="holes-display">
            <div
              v-for="(hole, hIndex) in item.holes"
              :key="hIndex"
              class="hole"
              :class="{ closed: hole === 0, open: hole === 1 }"
            >
              <span v-if="hole === 0">●</span>
              <span v-else>○</span>
            </div>
          </div>
          <div class="description">{{ item.description }}</div>
        </div>
      </div>

      <div v-if="selectedFingering" class="detail-panel">
        <div class="detail-title">指法详情</div>
        <div class="detail-dizi">
          <div class="dizi-container">
            <div class="dizi-body">
              <div class="dizi-left">
                <div class="mouthpiece"></div>
              </div>
              <div class="dizi-holes">
                <div
                  v-for="(hole, index) in selectedFingering.holes"
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
        <div class="detail-info">
          <el-row :gutter="20">
            <el-col :span="8">
              <div class="info-item">
                <span class="label">音名</span>
                <span class="value">{{ selectedFingering.note }}</span>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="info-item">
                <span class="label">唱名</span>
                <span class="value">{{ selectedFingering.solfege }}</span>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="info-item">
                <span class="label">音区</span>
                <span class="value">
                  <el-tag :type="getRangeType(selectedFingering.note)" size="small">
                    {{ getRangeName(selectedFingering.note) }}
                  </el-tag>
                </span>
              </div>
            </el-col>
          </el-row>
          <div class="info-item full-width">
            <span class="label">吹奏说明</span>
            <span class="value">{{ selectedFingering.description }}</span>
          </div>
        </div>
      </div>

      <div class="legend">
        <div class="legend-item">
          <span class="legend-dot open">○</span>
          <span>开孔（不按）</span>
        </div>
        <div class="legend-item">
          <span class="legend-dot closed">●</span>
          <span>闭孔（按指）</span>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { basicFingerings, holeNames } from '../data/songs.js'

export default {
  name: 'BasicFingering',
  data() {
    return {
      basicFingerings,
      holeNames,
      selectedRange: 'all',
      selectedIndex: 0
    }
  },
  computed: {
    filteredFingerings() {
      if (this.selectedRange === 'all') return this.basicFingerings
      return this.basicFingerings.filter(item => {
        if (this.selectedRange === 'low') return item.note.includes('低音')
        if (this.selectedRange === 'mid') return item.note.includes('中音')
        if (this.selectedRange === 'high') return item.note.includes('高音')
        return true
      })
    },
    selectedFingering() {
      return this.filteredFingerings[this.selectedIndex] || null
    }
  },
  methods: {
    selectFingering(index) {
      this.selectedIndex = index
    },
    getRangeType(note) {
      if (note.includes('低音')) return 'info'
      if (note.includes('中音')) return 'success'
      if (note.includes('高音')) return 'warning'
      return 'info'
    },
    getRangeName(note) {
      if (note.includes('低音')) return '低音区'
      if (note.includes('中音')) return '中音区'
      if (note.includes('高音')) return '高音区'
      return ''
    }
  }
}
</script>

<style scoped>
.basic-fingering {
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

.range-filter {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.filter-label {
  font-size: 14px;
  color: #606266;
  font-weight: 500;
}

.fingering-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 12px;
  margin-bottom: 24px;
}

.fingering-card {
  background: #f5f7fa;
  border: 2px solid transparent;
  border-radius: 12px;
  padding: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
}

.fingering-card:hover {
  background: #ecf5ff;
  transform: translateY(-2px);
}

.fingering-card.active {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-color: transparent;
  color: white;
}

.fingering-card.active .description {
  color: rgba(255, 255, 255, 0.85);
}

.note-info {
  margin-bottom: 10px;
}

.note-name {
  font-size: 24px;
  font-weight: bold;
  line-height: 1.2;
}

.solfege {
  font-size: 14px;
  opacity: 0.8;
}

.holes-display {
  display: flex;
  justify-content: center;
  gap: 6px;
  margin-bottom: 10px;
}

.holes-display .hole {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
}

.holes-display .hole.open {
  background: #303133;
  color: #fff;
}

.fingering-card.active .holes-display .hole.open {
  background: rgba(0, 0, 0, 0.4);
}

.holes-display .hole.closed {
  background: #fff;
  color: #409eff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
}

.fingering-card.active .holes-display .hole.closed {
  background: rgba(255, 255, 255, 0.9);
}

.description {
  font-size: 12px;
  color: #909399;
  line-height: 1.4;
}

.detail-panel {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 16px;
}

.detail-title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 16px;
}

.detail-dizi {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.dizi-container {
  background: linear-gradient(180deg, #8B4513 0%, #A0522D 50%, #8B4513 100%);
  border-radius: 40px;
  padding: 24px 32px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
}

.dizi-body {
  display: flex;
  align-items: center;
}

.dizi-left {
  margin-right: 24px;
}

.mouthpiece {
  width: 24px;
  height: 24px;
  background: #4a2c0a;
  border-radius: 50%;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.5);
}

.dizi-holes {
  display: flex;
  gap: 14px;
}

.hole-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}

.hole-label {
  font-size: 10px;
  color: rgba(255, 255, 255, 0.8);
  white-space: nowrap;
}

.dizi-holes .hole {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  transition: all 0.3s ease;
}

.dizi-holes .hole.open {
  background: #2c1810;
  color: #fff;
  box-shadow: inset 0 4px 8px rgba(0, 0, 0, 0.8);
}

.dizi-holes .hole.closed {
  background: linear-gradient(145deg, #d4a574, #b8956a);
  color: #4a2c0a;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
}

.detail-info {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 16px;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.info-item.full-width {
  margin-top: 16px;
}

.info-item .label {
  font-size: 12px;
  opacity: 0.8;
}

.info-item .value {
  font-size: 18px;
  font-weight: 600;
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
  color: #303133;
}

.legend-dot.closed {
  color: #409eff;
}
</style>
