<template>
  <div
    class="stage-container"
    @dragover.prevent="handleDragOver"
    @drop="handleDrop"
    @mousemove="handleMouseMove"
    @mouseup="handleMouseUp"
    @mouseleave="handleMouseUp"
  >
    <div class="stage-label">⬇️ 观众席方向 ⬇️</div>
    
    <div class="stage" ref="stage">
      <div class="stage-area stage-front" data-area="front">
        <span class="area-label">前台区</span>
      </div>
      
      <div class="stage-main">
        <div class="stage-area stage-left" data-area="left">
          <span class="area-label">左侧区</span>
        </div>
        
        <div class="stage-area stage-center" data-area="center">
          <span class="area-label">中心表演区</span>
        </div>
        
        <div class="stage-area stage-right" data-area="right">
          <span class="area-label">右侧区</span>
        </div>
      </div>
      
      <div class="stage-area stage-back" data-area="back">
        <span class="area-label">后台区</span>
      </div>

      <div
        v-for="item in placedItems"
        :key="item.id"
        class="placed-item"
        :class="{ 
          'item-light': item.type === 'light', 
          'dragging': draggingItemId === item.id 
        }"
        :style="getItemStyle(item)"
        @mousedown.stop="handleItemMouseDown($event, item)"
        @click.stop="selectItem(item)"
      >
        <span class="item-emoji">{{ item.icon }}</span>
        <button
          class="remove-btn"
          @click.stop="removeItem(item.id)"
          title="删除"
        >
          ×
        </button>
      </div>
    </div>
    
    <div class="stage-footer">
      <span>舞台尺寸: 800 × 600px</span>
      <span>已放置道具: {{ placedItems.length }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StageArea',
  props: {
    placedItems: {
      type: Array,
      default: () => []
    },
    isPreview: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      draggingItemId: null,
      selectedItemId: null,
      dragOffset: { x: 0, y: 0 },
      currentDragPos: { x: 0, y: 0 },
      isDragging: false
    }
  },
  methods: {
    getItemStyle(item) {
      let x = item.x
      let y = item.y
      
      if (this.draggingItemId === item.id && this.isDragging) {
        x = this.currentDragPos.x
        y = this.currentDragPos.y
      }
      
      return {
        left: x + 'px',
        top: y + 'px',
        background: item.color,
        boxShadow: item.type === 'light' 
          ? `0 0 30px ${item.color}, 0 0 60px ${item.color}40` 
          : 'none',
        zIndex: this.draggingItemId === item.id ? 100 : 10
      }
    },
    handleDragOver(event) {
      event.dataTransfer.dropEffect = 'copy'
    },
    handleDrop(event) {
      const stage = this.$refs.stage
      const rect = stage.getBoundingClientRect()
      const x = event.clientX - rect.left - 30
      const y = event.clientY - rect.top - 30
      
      const clampedX = Math.max(0, Math.min(x, rect.width - 60))
      const clampedY = Math.max(0, Math.min(y, rect.height - 60))
      
      this.$emit('drop-item', { x: clampedX, y: clampedY })
    },
    handleItemMouseDown(event, item) {
      if (event.target.classList.contains('remove-btn')) return
      
      this.draggingItemId = item.id
      this.isDragging = true
      
      const stage = this.$refs.stage
      const rect = stage.getBoundingClientRect()
      
      this.dragOffset = {
        x: event.clientX - rect.left - item.x,
        y: event.clientY - rect.top - item.y
      }
      
      this.currentDragPos = {
        x: item.x,
        y: item.y
      }
      
      event.preventDefault()
    },
    handleMouseMove(event) {
      if (!this.isDragging || this.draggingItemId === null) return
      
      const stage = this.$refs.stage
      const rect = stage.getBoundingClientRect()
      
      let x = event.clientX - rect.left - this.dragOffset.x
      let y = event.clientY - rect.top - this.dragOffset.y
      
      const clampedX = Math.max(0, Math.min(x, rect.width - 60))
      const clampedY = Math.max(0, Math.min(y, rect.height - 60))
      
      this.currentDragPos = {
        x: clampedX,
        y: clampedY
      }
    },
    handleMouseUp() {
      if (!this.isDragging || this.draggingItemId === null) return
      
      const item = this.placedItems.find(i => i.id === this.draggingItemId)
      if (item) {
        this.$emit('update-item', {
          ...item,
          x: this.currentDragPos.x,
          y: this.currentDragPos.y
        })
      }
      
      this.draggingItemId = null
      this.isDragging = false
    },
    selectItem(item) {
      this.selectedItemId = item.id
    },
    removeItem(itemId) {
      this.$emit('remove-item', itemId)
    }
  }
}
</script>

<style scoped>
.stage-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  user-select: none;
}

.stage-label {
  font-size: 14px;
  color: var(--text-muted);
  letter-spacing: 2px;
}

.stage {
  position: relative;
  width: 800px;
  height: 600px;
  background: var(--bg-stage);
  border: 3px solid var(--border-light);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: var(--shadow-dark), inset 0 0 100px rgba(0, 0, 0, 0.5);
}

.stage::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    linear-gradient(90deg, transparent 49%, var(--border-color) 49%, var(--border-color) 51%, transparent 51%),
    linear-gradient(0deg, transparent 49%, var(--border-color) 49%, var(--border-color) 51%, transparent 51%);
  background-size: 50px 50px;
  opacity: 0.3;
  pointer-events: none;
}

.stage-area {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px dashed var(--border-light);
  transition: all var(--transition-normal);
}

.stage-area:hover {
  background: rgba(255, 255, 255, 0.05);
}

.area-label {
  font-size: 12px;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 1px;
  pointer-events: none;
}

.stage-front {
  top: 0;
  left: 0;
  right: 0;
  height: 100px;
  background: var(--stage-area-front);
  opacity: 0.4;
}

.stage-back {
  bottom: 0;
  left: 0;
  right: 0;
  height: 100px;
  background: var(--stage-area-back);
  opacity: 0.4;
}

.stage-main {
  position: absolute;
  top: 100px;
  bottom: 100px;
  left: 0;
  right: 0;
  display: flex;
}

.stage-left {
  width: 200px;
  height: 100%;
  background: var(--stage-area-left);
  opacity: 0.4;
}

.stage-center {
  flex: 1;
  height: 100%;
  background: var(--stage-area-main);
  opacity: 0.4;
}

.stage-right {
  width: 200px;
  height: 100%;
  background: var(--stage-area-right);
  opacity: 0.4;
}

.placed-item {
  position: absolute;
  width: 60px;
  height: 60px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: grab;
  transition: box-shadow var(--transition-fast);
}

.placed-item:hover {
  z-index: 20;
}

.placed-item:active {
  cursor: grabbing;
}

.placed-item.dragging {
  transition: none;
  cursor: grabbing;
}

.placed-item.dragging .item-emoji {
  transform: scale(1.15);
}

.item-light {
  border-radius: 50%;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    filter: brightness(1);
  }
  50% {
    filter: brightness(1.2);
  }
}

.item-emoji {
  font-size: 28px;
  pointer-events: none;
  transition: transform var(--transition-fast);
}

.remove-btn {
  position: absolute;
  top: -8px;
  right: -8px;
  width: 24px;
  height: 24px;
  background: var(--danger-color);
  color: white;
  border: 2px solid white;
  border-radius: 50%;
  font-size: 16px;
  line-height: 1;
  cursor: pointer;
  display: none;
  align-items: center;
  justify-content: center;
  padding: 0;
  z-index: 30;
}

.placed-item:hover .remove-btn {
  display: flex;
}

.remove-btn:hover {
  transform: scale(1.2);
}

.stage-footer {
  display: flex;
  gap: 24px;
  font-size: 12px;
  color: var(--text-muted);
}
</style>
