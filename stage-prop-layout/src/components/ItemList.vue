<template>
  <div class="item-list">
    <h2 class="panel-title">📋 已放置道具</h2>
    
    <div v-if="placedItems.length === 0" class="empty-state">
      <div class="empty-icon">🎪</div>
      <p>舞台上还没有道具</p>
      <p class="hint">从左侧拖拽道具到舞台上</p>
    </div>
    
    <div v-else class="items-container">
      <div class="stats-bar">
        <div class="stat-item">
          <span class="stat-icon">🎭</span>
          <span class="stat-value">{{ propCount }}</span>
          <span class="stat-label">道具</span>
        </div>
        <div class="stat-item">
          <span class="stat-icon">💡</span>
          <span class="stat-value">{{ lightCount }}</span>
          <span class="stat-label">灯光</span>
        </div>
        <div class="stat-item">
          <span class="stat-icon">🎨</span>
          <span class="stat-value">{{ decorCount }}</span>
          <span class="stat-label">装饰</span>
        </div>
      </div>
      
      <div class="items-list">
        <div
          v-for="item in placedItems"
          :key="item.id"
          class="list-item"
          @click="$emit('select-item', item)"
        >
          <div class="item-preview" :style="{ background: item.color }">
            {{ item.icon }}
          </div>
          <div class="item-info">
            <div class="item-name">{{ item.name }}</div>
            <div class="item-pos">
              位置: ({{ Math.round(item.x) }}, {{ Math.round(item.y) }})
            </div>
          </div>
          <button
            class="delete-btn"
            @click.stop="$emit('remove-item', item.id)"
            title="删除"
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ItemList',
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
.item-list {
  padding: 16px;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.panel-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 20px;
  color: var(--text-primary);
}

.empty-state {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: var(--text-muted);
}

.empty-icon {
  font-size: 48px;
  margin-bottom: 16px;
  opacity: 0.5;
}

.empty-state p {
  margin: 4px 0;
}

.hint {
  font-size: 12px;
  opacity: 0.7;
}

.items-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.stats-bar {
  display: flex;
  justify-content: space-around;
  padding: 12px;
  background: var(--bg-card);
  border-radius: 8px;
  margin-bottom: 16px;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.stat-icon {
  font-size: 20px;
}

.stat-value {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
}

.stat-label {
  font-size: 10px;
  color: var(--text-muted);
  text-transform: uppercase;
}

.items-list {
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.list-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.list-item:hover {
  background: var(--border-color);
  transform: translateX(4px);
}

.item-preview {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  border-radius: 8px;
  flex-shrink: 0;
}

.item-info {
  flex: 1;
  min-width: 0;
}

.item-name {
  font-size: 14px;
  font-weight: 500;
  color: var(--text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.item-pos {
  font-size: 11px;
  color: var(--text-muted);
  margin-top: 2px;
}

.delete-btn {
  width: 32px;
  height: 32px;
  border: none;
  background: transparent;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--transition-fast);
  flex-shrink: 0;
}

.delete-btn:hover {
  background: var(--danger-color);
  transform: scale(1.1);
}
</style>
