<template>
  <div class="song-list">
    <el-card class="song-card">
      <div slot="header" class="card-header">
        <span>📚 曲目列表</span>
      </div>
      <div class="search-box">
        <el-input
          v-model="searchKeyword"
          placeholder="搜索曲目..."
          prefix-icon="el-icon-search"
          clearable
        />
      </div>
      <div class="song-items">
        <div
          v-for="song in filteredSongs"
          :key="song.id"
          class="song-item"
          :class="{ active: currentSongId === song.id }"
          @click="selectSong(song)"
        >
          <div class="song-info">
            <div class="song-name">{{ song.name }}</div>
            <el-tag :type="getDifficultyType(song.difficulty)" size="mini">
              {{ song.difficulty }}
            </el-tag>
          </div>
          <div class="song-desc">{{ song.description }}</div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { songs } from '../data/songs.js'

export default {
  name: 'SongList',
  data() {
    return {
      songs,
      searchKeyword: '',
      currentSongId: 1
    }
  },
  computed: {
    filteredSongs() {
      if (!this.searchKeyword) return this.songs
      return this.songs.filter(song =>
        song.name.includes(this.searchKeyword) ||
        song.description.includes(this.searchKeyword)
      )
    }
  },
  methods: {
    selectSong(song) {
      this.currentSongId = song.id
      this.$root.$emit('select-song', song)
    },
    getDifficultyType(difficulty) {
      const types = {
        '入门': 'success',
        '初级': 'primary',
        '中级': 'warning',
        '高级': 'danger'
      }
      return types[difficulty] || 'info'
    }
  },
  mounted() {
    const defaultSong = this.songs[0]
    this.$root.$emit('select-song', defaultSong)
  }
}
</script>

<style scoped>
.song-list {
  height: 100%;
}

.song-card {
  height: calc(100vh - 128px);
  overflow: hidden;
}

.card-header {
  font-weight: bold;
  font-size: 16px;
  color: #303133;
}

.search-box {
  margin-bottom: 16px;
}

.song-items {
  max-height: calc(100vh - 240px);
  overflow-y: auto;
}

.song-item {
  padding: 12px;
  margin-bottom: 8px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid #ebeef5;
}

.song-item:hover {
  background: #f5f7fa;
  transform: translateX(4px);
}

.song-item.active {
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-color: transparent;
}

.song-item.active .song-desc {
  color: rgba(255, 255, 255, 0.85);
}

.song-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
}

.song-name {
  font-weight: 600;
  font-size: 15px;
}

.song-desc {
  font-size: 12px;
  color: #909399;
  line-height: 1.4;
}
</style>
