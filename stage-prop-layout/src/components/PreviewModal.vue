<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-content">
      <div class="modal-header">
        <h2>🎬 舞台布景预览</h2>
        <button class="close-btn" @click="$emit('close')">✕</button>
      </div>
      
      <div class="preview-stage">
        <div class="preview-stage-inner">
          <div class="audience-label">👥 观众席</div>
          
          <div class="stage-view">
            <div class="stage-curtain left"></div>
            <div class="stage-curtain right"></div>
            
            <div class="stage-floor">
              <div
                v-for="item in placedItems"
                :key="item.id"
                class="preview-item"
                :class="{ 'preview-light': item.type === 'light' }"
                :style="{
                  left: (item.x / 800 * 100) + '%',
                  top: (item.y / 600 * 100) + '%',
                  background: item.color,
                  boxShadow: item.type === 'light' ? `0 0 40px ${item.color}, 0 0 80px ${item.color}60` : '0 4px 12px rgba(0,0,0,0.3)'
                }"
              >
                <span class="preview-emoji">{{ item.icon }}</span>
              </div>
            </div>
            
            <div class="stage-backdrop">
              <div class="spotlight" v-for="n in 3" :key="n" :class="'spotlight-' + n"></div>
            </div>
          </div>
          
          <div class="stats-row">
            <div class="stat-card">
              <span class="stat-number">{{ placedItems.length }}</span>
              <span class="stat-text">道具总数</span>
            </div>
            <div class="stat-card">
              <span class="stat-number">{{ propCount }}</span>
              <span class="stat-text">道具</span>
            </div>
            <div class="stat-card">
              <span class="stat-number">{{ lightCount }}</span>
              <span class="stat-text">灯光</span>
            </div>
            <div class="stat-card">
              <span class="stat-number">{{ decorCount }}</span>
              <span class="stat-text">装饰</span>
            </div>
          </div>
        </div>
      </div>
      
      <div class="modal-footer">
        <button class="btn btn-primary" @click="$emit('close')">关闭预览</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PreviewModal',
  props: {
    placedItems: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    propCount() {
      return this.placedItems.filter(item => item.type === 'prop').length
    },
    lightCount() {
      return this.placedItems.filter(item => item.type === 'light').length
    },
    decorCount() {
      return this.placedItems.filter(item => item.type === 'decor').length
    }
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
}

.modal-content {
  background: var(--bg-panel);
  border-radius: 16px;
  width: 90%;
  max-width: 1000px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid var(--border-color);
}

.modal-header h2 {
  font-size: 20px;
  font-weight: 600;
  color: var(--text-primary);
}

.close-btn {
  width: 36px;
  height: 36px;
  border: none;
  background: var(--bg-card);
  color: var(--text-secondary);
  border-radius: 8px;
  font-size: 18px;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.close-btn:hover {
  background: var(--danger-color);
  color: white;
}

.preview-stage {
  flex: 1;
  padding: 24px;
  overflow: auto;
}

.preview-stage-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
}

.audience-label {
  font-size: 14px;
  color: var(--text-muted);
  letter-spacing: 4px;
  text-transform: uppercase;
}

.stage-view {
  position: relative;
  width: 100%;
  max-width: 800px;
  aspect-ratio: 4 / 3;
  perspective: 1000px;
}

.stage-backdrop {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 40%;
  background: linear-gradient(180deg, #1a0a2e 0%, #2d1b4e 100%);
  border-radius: 8px 8px 0 0;
  overflow: hidden;
}

.spotlight {
  position: absolute;
  width: 150px;
  height: 200px;
  background: radial-gradient(ellipse at top, rgba(255, 215, 0, 0.3) 0%, transparent 70%);
  pointer-events: none;
}

.spotlight-1 {
  left: 20%;
  animation: sway1 4s ease-in-out infinite;
}

.spotlight-2 {
  left: 50%;
  transform: translateX(-50%);
  animation: sway2 5s ease-in-out infinite;
}

.spotlight-3 {
  right: 20%;
  animation: sway3 4.5s ease-in-out infinite;
}

@keyframes sway1 {
  0%, 100% { transform: rotate(-5deg); }
  50% { transform: rotate(5deg); }
}

@keyframes sway2 {
  0%, 100% { transform: translateX(-50%) rotate(0deg); }
  50% { transform: translateX(-50%) rotate(3deg); }
}

@keyframes sway3 {
  0%, 100% { transform: rotate(5deg); }
  50% { transform: rotate(-5deg); }
}

.stage-floor {
  position: absolute;
  top: 40%;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(180deg, #1a472a 0%, #0d2818 100%);
  border-radius: 0 0 8px 8px;
  box-shadow: inset 0 10px 30px rgba(0, 0, 0, 0.5);
}

.stage-floor::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    linear-gradient(90deg, transparent 49%, rgba(255, 255, 255, 0.1) 49%, rgba(255, 255, 255, 0.1) 51%, transparent 51%),
    linear-gradient(0deg, transparent 49%, rgba(255, 255, 255, 0.1) 49%, rgba(255, 255, 255, 0.1) 51%, transparent 51%);
  background-size: 40px 40px;
}

.stage-curtain {
  position: absolute;
  top: 0;
  width: 60px;
  height: 100%;
  z-index: 10;
}

.stage-curtain.left {
  left: 0;
  background: linear-gradient(90deg, #800000 0%, #4a0000 100%);
  border-radius: 8px 0 0 0;
}

.stage-curtain.right {
  right: 0;
  background: linear-gradient(-90deg, #800000 0%, #4a0000 100%);
  border-radius: 0 8px 0 0;
}

.preview-item {
  position: absolute;
  width: 50px;
  height: 50px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 5;
  transform: translate(-50%, -50%);
}

.preview-light {
  border-radius: 50%;
  animation: glow 2s ease-in-out infinite;
}

@keyframes glow {
  0%, 100% {
    filter: brightness(1);
  }
  50% {
    filter: brightness(1.3);
  }
}

.preview-emoji {
  font-size: 24px;
}

.stats-row {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  justify-content: center;
}

.stat-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px 24px;
  background: var(--bg-card);
  border-radius: 12px;
  min-width: 100px;
}

.stat-number {
  font-size: 28px;
  font-weight: 700;
  color: var(--primary-color);
}

.stat-text {
  font-size: 12px;
  color: var(--text-muted);
  margin-top: 4px;
}

.modal-footer {
  display: flex;
  justify-content: center;
  padding: 16px 24px;
  border-top: 1px solid var(--border-color);
}
</style>
