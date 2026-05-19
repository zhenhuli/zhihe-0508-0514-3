<template>
  <div class="app-container">
    <el-header class="header">
      <div class="header-content">
        <h1 class="title">🎵 笛子指法图谱库</h1>
        <p class="subtitle">民族乐器吹弹指法学习系统</p>
      </div>
      <div class="header-tabs">
        <el-tabs v-model="activeTab" class="header-tabs-inner">
          <el-tab-pane label="🎼 曲目练习" name="songs" />
          <el-tab-pane label="📖 基础指法表" name="basic" />
        </el-tabs>
      </div>
    </el-header>
    <el-main class="main-content">
      <div v-show="activeTab === 'songs'">
        <el-row :gutter="20">
          <el-col :span="6">
            <song-list />
          </el-col>
          <el-col :span="18">
            <dizi-fingering />
          </el-col>
        </el-row>
      </div>
      <div v-show="activeTab === 'basic'">
        <basic-fingering />
      </div>
    </el-main>
  </div>
</template>

<script>
import SongList from './components/SongList.vue'
import DiziFingering from './components/DiziFingering.vue'
import BasicFingering from './components/BasicFingering.vue'

export default {
  name: 'App',
  components: {
    SongList,
    DiziFingering,
    BasicFingering
  },
  data() {
    return {
      activeTab: 'songs'
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body, html {
  height: 100%;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", Arial, sans-serif;
}

#app {
  height: 100%;
}

.app-container {
  height: 100%;
  background: linear-gradient(135deg, #f5f7fa 0%, #e8ecf1 100%);
}

.header {
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
  color: white;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 0 !important;
  height: 80px !important;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header-content {
  padding: 0 40px;
}

.title {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 4px;
}

.subtitle {
  font-size: 14px;
  opacity: 0.9;
}

.header-tabs {
  padding-right: 40px;
}

.header-tabs-inner ::v-deep .el-tabs__item {
  color: rgba(255, 255, 255, 0.8);
  font-size: 15px;
  height: 80px;
  line-height: 80px;
}

.header-tabs-inner ::v-deep .el-tabs__item:hover {
  color: white;
}

.header-tabs-inner ::v-deep .el-tabs__item.is-active {
  color: white;
}

.header-tabs-inner ::v-deep .el-tabs__active-bar {
  background-color: white;
  height: 3px;
}

.header-tabs-inner ::v-deep .el-tabs__nav-wrap::after {
  display: none;
}

.main-content {
  padding: 24px;
}
</style>
