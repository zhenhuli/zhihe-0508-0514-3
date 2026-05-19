<template>
  <div class="prop-panel">
    <h2 class="panel-title">🎪 道具库</h2>
    
    <div class="category-section">
      <h3 class="category-title">道具</h3>
      <div class="item-grid">
        <div
          v-for="item in propsList"
          :key="item.id"
          class="prop-item"
          draggable="true"
          @dragstart="handleDragStart($event, item)"
        >
          <div class="item-icon" :style="{ background: item.color }">
            {{ item.icon }}
          </div>
          <span class="item-name">{{ item.name }}</span>
        </div>
      </div>
    </div>

    <div class="category-section">
      <h3 class="category-title">💡 灯光</h3>
      <div class="item-grid">
        <div
          v-for="item in lightsList"
          :key="item.id"
          class="prop-item"
          draggable="true"
          @dragstart="handleDragStart($event, item)"
        >
          <div class="item-icon light-icon" :style="{ background: item.color, boxShadow: `0 0 20px ${item.color}` }">
            {{ item.icon }}
          </div>
          <span class="item-name">{{ item.name }}</span>
        </div>
      </div>
    </div>

    <div class="category-section">
      <h3 class="category-title">🎨 装饰</h3>
      <div class="item-grid">
        <div
          v-for="item in decorList"
          :key="item.id"
          class="prop-item"
          draggable="true"
          @dragstart="handleDragStart($event, item)"
        >
          <div class="item-icon" :style="{ background: item.color }">
            {{ item.icon }}
          </div>
          <span class="item-name">{{ item.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PropPanel',
  data() {
    return {
      propsList: [
        { id: 'p1', name: '桌子', icon: '🪑', color: '#8B4513', type: 'prop' },
        { id: 'p2', name: '椅子', icon: '💺', color: '#A0522D', type: 'prop' },
        { id: 'p3', name: '沙发', icon: '🛋️', color: '#4682B4', type: 'prop' },
        { id: 'p4', name: '钢琴', icon: '🎹', color: '#2F4F4F', type: 'prop' },
        { id: 'p5', name: '麦克风', icon: '🎤', color: '#1a1a1a', type: 'prop' },
        { id: 'p6', name: '吉他', icon: '🎸', color: '#8B0000', type: 'prop' }
      ],
      lightsList: [
        { id: 'l1', name: '聚光灯', icon: '🔦', color: '#FFD700', type: 'light' },
        { id: 'l2', name: '彩色灯', icon: '🌈', color: '#FF69B4', type: 'light' },
        { id: 'l3', name: '氛围灯', icon: '✨', color: '#9370DB', type: 'light' },
        { id: 'l4', name: '频闪灯', icon: '⚡', color: '#00FFFF', type: 'light' }
      ],
      decorList: [
        { id: 'd1', name: '花朵', icon: '🌸', color: '#FFB6C1', type: 'decor' },
        { id: 'd2', name: '气球', icon: '🎈', color: '#FF6347', type: 'decor' },
        { id: 'd3', name: '幕布', icon: '🎭', color: '#800000', type: 'decor' },
        { id: 'd4', name: '星星', icon: '⭐', color: '#FFD700', type: 'decor' }
      ]
    }
  },
  methods: {
    handleDragStart(event, item) {
      event.dataTransfer.effectAllowed = 'copy'
      event.dataTransfer.setData('text/plain', JSON.stringify(item))
      this.$emit('drag-start', item)
    }
  }
}
</script>

<style scoped>
.prop-panel {
  padding: 16px;
  height: 100%;
}

.panel-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 20px;
  color: var(--text-primary);
}

.category-section {
  margin-bottom: 24px;
}

.category-title {
  font-size: 14px;
  font-weight: 500;
  color: var(--text-secondary);
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--border-color);
}

.item-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

.prop-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px 8px;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  cursor: grab;
  transition: all var(--transition-fast);
}

.prop-item:hover {
  background: var(--border-color);
  transform: translateY(-2px);
  box-shadow: var(--shadow-medium);
}

.prop-item:active {
  cursor: grabbing;
}

.item-icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  border-radius: 8px;
  margin-bottom: 8px;
}

.light-icon {
  animation: glow 2s ease-in-out infinite;
}

@keyframes glow {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

.item-name {
  font-size: 12px;
  color: var(--text-secondary);
  text-align: center;
}
</style>
