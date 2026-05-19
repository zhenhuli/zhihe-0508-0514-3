<template>
  <div class="app-container">
    <header class="app-header">
      <h1>🎭 舞台道具摆放规划系统</h1>
      <div class="header-actions">
        <button class="btn btn-secondary" @click="clearStage">清空舞台</button>
        <button class="btn btn-primary" @click="togglePreview">
          {{ isPreview ? '返回编辑' : '预览效果' }}
        </button>
      </div>
    </header>

    <div class="main-content">
      <aside class="sidebar">
        <PropPanel @drag-start="handleDragStart" />
      </aside>

      <main class="stage-wrapper">
        <StageArea
          ref="stageArea"
          :placed-items="placedItems"
          :is-preview="isPreview"
          @drop-item="handleDrop"
          @update-item="handleUpdateItem"
          @remove-item="handleRemoveItem"
        />
      </main>

      <aside class="sidebar">
        <ItemList
          :placed-items="placedItems"
          @select-item="handleSelectItem"
          @remove-item="handleRemoveItem"
        />
      </aside>
    </div>

    <PreviewModal
      v-if="isPreview"
      :placed-items="placedItems"
      @close="togglePreview"
    />
  </div>
</template>

<script>
import PropPanel from './components/PropPanel.vue'
import StageArea from './components/StageArea.vue'
import ItemList from './components/ItemList.vue'
import PreviewModal from './components/PreviewModal.vue'
import './variables.css'
import './App.css'

export default {
  name: 'App',
  components: {
    PropPanel,
    StageArea,
    ItemList,
    PreviewModal
  },
  data() {
    return {
      placedItems: [],
      currentDragItem: null,
      isPreview: false,
      itemIdCounter: 0
    }
  },
  methods: {
    handleDragStart(item) {
      this.currentDragItem = item
    },
    handleDrop(position) {
      if (!this.currentDragItem) return
      
      const newItem = {
        id: ++this.itemIdCounter,
        ...this.currentDragItem,
        x: position.x,
        y: position.y
      }
      
      this.placedItems.push(newItem)
      this.currentDragItem = null
    },
    handleUpdateItem(updatedItem) {
      const index = this.placedItems.findIndex(item => item.id === updatedItem.id)
      if (index !== -1) {
        this.$set(this.placedItems, index, updatedItem)
      }
    },
    handleRemoveItem(itemId) {
      const index = this.placedItems.findIndex(item => item.id === itemId)
      if (index !== -1) {
        this.placedItems.splice(index, 1)
      }
    },
    handleSelectItem(item) {
      console.log('Selected item:', item)
    },
    clearStage() {
      if (confirm('确定要清空舞台上的所有道具吗？')) {
        this.placedItems = []
        this.itemIdCounter = 0
      }
    },
    togglePreview() {
      this.isPreview = !this.isPreview
    }
  }
}
</script>
