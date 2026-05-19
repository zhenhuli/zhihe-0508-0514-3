<template>
  <div class="sport-detail">
    <div class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>{{ sportInfo ? sportInfo.name : '' }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div v-if="sportInfo" class="sport-header" :style="{ background: `linear-gradient(135deg, ${sportInfo.color} 0%, ${sportInfo.color}cc 100%)` }">
      <div class="sport-header-content">
        <span class="sport-icon">{{ sportInfo.icon }}</span>
        <div>
          <h1>{{ sportInfo.name }}裁判手势</h1>
          <p>{{ sportInfo.description }} · 共 {{ sportInfo.signs.length }} 个手势</p>
        </div>
      </div>
    </div>

    <div v-if="sportInfo" class="signs-container">
      <el-row :gutter="24">
        <el-col
          v-for="sign in sportInfo.signs"
          :key="sign.id"
          :xs="24"
          :sm="12"
          :md="8"
          :lg="8"
        >
          <el-card class="sign-card" shadow="hover">
            <div slot="header" class="card-header">
              <span class="sign-number" :style="{ backgroundColor: sportInfo.color }">{{ sign.id }}</span>
              <span class="sign-name">{{ sign.name }}</span>
            </div>
            <div class="sign-image-wrap">
              <img :src="sign.image" :alt="sign.name" class="sign-image" />
            </div>
            <div class="sign-details">
              <div class="detail-item">
                <div class="detail-label">
                  <i class="el-icon-s-promotion"></i>
                  <span>手势动作</span>
                </div>
                <p class="detail-content">{{ sign.action }}</p>
              </div>
              <div class="detail-item">
                <div class="detail-label">
                  <i class="el-icon-document"></i>
                  <span>判罚含义</span>
                </div>
                <p class="detail-content">{{ sign.meaning }}</p>
              </div>
              <div class="detail-item">
                <div class="detail-label">
                  <i class="el-icon-location-information"></i>
                  <span>适用场景</span>
                </div>
                <p class="detail-content">{{ sign.scene }}</p>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <div v-else class="loading-wrap">
      <el-empty description="未找到该运动项目" />
    </div>

    <div class="back-btn">
      <el-button type="primary" icon="el-icon-arrow-left" @click="goBack">
        返回首页
      </el-button>
    </div>
  </div>
</template>

<script>
import { sportsData } from '../data/signs'

export default {
  name: 'SportDetail',
  data() {
    return {
      sportType: ''
    }
  },
  computed: {
    sportInfo() {
      return sportsData[this.sportType] || null
    }
  },
  mounted() {
    this.sportType = this.$route.params.type
  },
  watch: {
    '$route.params.type'(newType) {
      this.sportType = newType
    }
  },
  methods: {
    goBack() {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
.sport-detail {
  max-width: 1400px;
  margin: 0 auto;
}

.breadcrumb {
  margin-bottom: 20px;
}

.breadcrumb >>> .el-breadcrumb__inner {
  color: #7f8c8d;
}

.breadcrumb >>> .el-breadcrumb__inner:hover {
  color: #667eea;
}

.sport-header {
  border-radius: 16px;
  padding: 40px;
  color: white;
  margin-bottom: 40px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.sport-header-content {
  display: flex;
  align-items: center;
}

.sport-icon {
  font-size: 64px;
  margin-right: 24px;
  flex-shrink: 0;
}

.sport-header-content h1 {
  font-size: 32px;
  margin-bottom: 8px;
  font-weight: 700;
}

.sport-header-content p {
  font-size: 14px;
  opacity: 0.9;
}

.signs-container {
  margin-bottom: 40px;
}

.sign-card {
  margin-bottom: 24px;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.sign-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15) !important;
}

.card-header {
  display: flex;
  align-items: center;
  padding: 0;
  background: #fafafa;
  border-bottom: 1px solid #ebedf0;
}

.sign-number {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 16px;
  margin-right: 12px;
  flex-shrink: 0;
}

.sign-name {
  font-size: 18px;
  font-weight: 600;
  color: #2c3e50;
}

.sign-image-wrap {
  height: 200px;
  overflow: hidden;
  background: #f8f9fa;
  display: flex;
  align-items: center;
  justify-content: center;
}

.sign-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.sign-details {
  padding: 20px 0 0;
}

.detail-item {
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 1px dashed #ebedf0;
}

.detail-item:last-child {
  margin-bottom: 0;
  padding-bottom: 0;
  border-bottom: none;
}

.detail-label {
  display: flex;
  align-items: center;
  font-size: 13px;
  color: #7f8c8d;
  margin-bottom: 6px;
  font-weight: 500;
}

.detail-label i {
  margin-right: 6px;
  color: #667eea;
}

.detail-content {
  font-size: 14px;
  color: #34495e;
  line-height: 1.6;
  margin: 0;
}

.loading-wrap {
  padding: 80px 0;
}

.back-btn {
  text-align: center;
  padding: 20px 0 40px;
}

.back-btn >>> .el-button {
  padding: 12px 32px;
  font-size: 16px;
  border-radius: 25px;
}
</style>
