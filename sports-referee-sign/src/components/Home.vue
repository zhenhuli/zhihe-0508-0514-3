<template>
  <div class="home">
    <div class="search-section">
      <el-input
        v-model="searchKeyword"
        placeholder="搜索手势名称、动作或含义..."
        size="large"
        clearable
        class="search-input"
        prefix-icon="el-icon-search"
      />
    </div>

    <div class="category-title">
      <h2>📋 选择运动项目</h2>
      <p>共收录 {{ totalSigns }} 个裁判手势</p>
    </div>

    <el-row :gutter="24" class="sports-grid">
      <el-col
        v-for="sport in filteredSports"
        :key="sport.type"
        :xs="24"
        :sm="12"
        :md="8"
        :lg="8"
        :xl="6"
      >
        <div
          class="sport-card"
          :style="{ borderLeftColor: sport.color }"
          @click="goToSport(sport.type)"
        >
          <div class="sport-icon" :style="{ backgroundColor: sport.color + '20', color: sport.color }">
            {{ sport.icon }}
          </div>
          <div class="sport-info">
            <h3>{{ sport.name }}</h3>
            <p>{{ sport.description }}</p>
            <div class="sport-count">
              <el-tag size="small" :style="{ backgroundColor: sport.color, borderColor: sport.color }">
                {{ sport.signs.length }} 个手势
              </el-tag>
            </div>
          </div>
          <div class="sport-arrow">
            <i class="el-icon-arrow-right"></i>
          </div>
        </div>
      </el-col>
    </el-row>

    <div v-if="searchKeyword && searchResults.length > 0" class="search-results">
      <div class="category-title">
        <h2>🔍 搜索结果</h2>
        <p>找到 {{ searchResults.length }} 个匹配结果</p>
      </div>
      <el-row :gutter="20">
        <el-col
          v-for="result in searchResults"
          :key="result.id"
          :xs="24"
          :sm="12"
          :md="8"
          :lg="6"
        >
          <el-card class="sign-card" shadow="hover">
            <div class="sign-image-wrap">
              <img :src="result.sign.image" :alt="result.sign.name" class="sign-image" />
              <div class="sign-sport-tag" :style="{ backgroundColor: result.sport.color }">
                {{ result.sport.icon }} {{ result.sport.name }}
              </div>
            </div>
            <div class="sign-content">
              <h4>{{ result.sign.name }}</h4>
              <p class="sign-action">
                <i class="el-icon-position"></i>
                <span>{{ result.sign.action }}</span>
              </p>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <div v-if="searchKeyword && searchResults.length === 0" class="no-results">
      <el-empty description="未找到相关手势，换个关键词试试吧" />
    </div>
  </div>
</template>

<script>
import { sportsData, sportsList } from '../data/signs'

export default {
  name: 'Home',
  data() {
    return {
      searchKeyword: ''
    }
  },
  computed: {
    totalSigns() {
      return sportsList.reduce((sum, sport) => sum + sport.signs.length, 0)
    },
    filteredSports() {
      if (!this.searchKeyword) return sportsList
      return sportsList.filter(sport => {
        return sport.name.toLowerCase().includes(this.searchKeyword.toLowerCase()) ||
               sport.description.toLowerCase().includes(this.searchKeyword.toLowerCase())
      })
    },
    searchResults() {
      if (!this.searchKeyword) return []
      const keyword = this.searchKeyword.toLowerCase()
      const results = []
      
      Object.keys(sportsData).forEach(sportKey => {
        const sport = sportsData[sportKey]
        sport.signs.forEach(sign => {
          if (
            sign.name.toLowerCase().includes(keyword) ||
            sign.action.toLowerCase().includes(keyword) ||
            sign.meaning.toLowerCase().includes(keyword) ||
            sign.scene.toLowerCase().includes(keyword)
          ) {
            results.push({
              id: `${sportKey}-${sign.id}`,
              sport: { ...sport, type: sportKey },
              sign
            })
          }
        })
      })
      
      return results
    }
  },
  methods: {
    goToSport(type) {
      this.$router.push(`/sport/${type}`)
    }
  }
}
</script>

<style scoped>
.home {
  max-width: 1400px;
  margin: 0 auto;
}

.search-section {
  margin-bottom: 40px;
  text-align: center;
}

.search-input {
  max-width: 600px;
}

.search-input >>> .el-input__inner {
  border-radius: 25px;
  height: 50px;
  font-size: 16px;
}

.category-title {
  margin-bottom: 24px;
  text-align: center;
}

.category-title h2 {
  font-size: 28px;
  color: #2c3e50;
  margin-bottom: 8px;
}

.category-title p {
  color: #7f8c8d;
  font-size: 14px;
}

.sports-grid {
  margin-bottom: 50px;
}

.sport-card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
  border-left: 4px solid;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  margin-bottom: 20px;
}

.sport-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.sport-icon {
  width: 60px;
  height: 60px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  margin-right: 16px;
  flex-shrink: 0;
}

.sport-info {
  flex: 1;
  min-width: 0;
}

.sport-info h3 {
  font-size: 20px;
  color: #2c3e50;
  margin-bottom: 6px;
}

.sport-info p {
  font-size: 13px;
  color: #7f8c8d;
  margin-bottom: 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.sport-count >>> .el-tag {
  color: white;
}

.sport-arrow {
  color: #bdc3c7;
  font-size: 20px;
  margin-left: 12px;
  transition: transform 0.3s ease;
}

.sport-card:hover .sport-arrow {
  transform: translateX(4px);
  color: #667eea;
}

.search-results {
  margin-top: 40px;
}

.sign-card {
  margin-bottom: 20px;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
}

.sign-card:hover {
  transform: translateY(-4px);
}

.sign-image-wrap {
  position: relative;
  height: 180px;
  overflow: hidden;
  background: #f8f9fa;
}

.sign-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.sign-sport-tag {
  position: absolute;
  top: 10px;
  left: 10px;
  color: white;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
}

.sign-content {
  padding: 16px;
}

.sign-content h4 {
  font-size: 16px;
  color: #2c3e50;
  margin-bottom: 10px;
}

.sign-action {
  display: flex;
  align-items: flex-start;
  font-size: 13px;
  color: #7f8c8d;
  line-height: 1.5;
}

.sign-action i {
  margin-right: 6px;
  margin-top: 2px;
  flex-shrink: 0;
  color: #3498db;
}

.no-results {
  padding: 60px 0;
}
</style>
