<template>
  <div class="grading-card-container">
    <h3 class="title is-4 mb-4 has-text-centered" style="color: #8B4513;">🎴 评级卡片预览</h3>
    
    <div class="card-preview paper-bg vintage-border card-shadow" ref="cardElement" id="grading-card">
      <div class="card-header-section">
        <div class="has-text-centered py-3" style="background: linear-gradient(135deg, #8B4513, #D2691E);">
          <h2 class="title is-5 has-text-white" style="font-family: 'Georgia', serif; margin: 0;">
            🏺 藏品品级鉴定证书
          </h2>
          <p class="has-text-white is-size-7" style="opacity: 0.9;">COLLECTION GRADING CERTIFICATE</p>
        </div>
      </div>

      <div class="card-content-section p-4">
        <div class="columns is-vcentered">
          <div class="column is-three-quarters">
            <h1 class="title is-3" style="color: #8B4513; font-family: 'Georgia', serif; margin-bottom: 0.5rem;">
              {{ toolInfo.name || '未命名藏品' }}
            </h1>
            <div class="tags">
              <span class="tag is-warning is-light" v-if="toolInfo.category">{{ toolInfo.category }}</span>
              <span class="tag is-info is-light" v-if="toolInfo.era">{{ toolInfo.era }}</span>
              <span class="tag is-primary is-light" v-if="toolInfo.origin">{{ toolInfo.origin }}</span>
            </div>
          </div>
          <div class="column is-one-quarter has-text-centered">
            <div 
              class="grade-display"
              :style="{ backgroundColor: getGradeColor(gradeInfo.overallGrade) }"
            >
              <span class="grade-text">{{ gradeInfo.overallGrade || '?' }}</span>
            </div>
            <p class="is-size-7 mt-1" style="color: #8B4513;">综合品级</p>
          </div>
        </div>

        <div class="decorative-line my-3"></div>

        <div class="columns is-multiline is-small">
          <div class="column is-half" v-if="toolInfo.material">
            <p class="is-size-7 has-text-grey">材质</p>
            <p class="is-size-6" style="color: #2C1810;">{{ toolInfo.material }}</p>
          </div>
          <div class="column is-half" v-if="toolInfo.dimensions">
            <p class="is-size-7 has-text-grey">尺寸</p>
            <p class="is-size-6" style="color: #2C1810;">{{ toolInfo.dimensions }}</p>
          </div>
          <div class="column is-half" v-if="toolInfo.weight">
            <p class="is-size-7 has-text-grey">重量</p>
            <p class="is-size-6" style="color: #2C1810;">{{ toolInfo.weight }}</p>
          </div>
          <div class="column is-half" v-if="toolInfo.collector">
            <p class="is-size-7 has-text-grey">收藏家</p>
            <p class="is-size-6" style="color: #2C1810;">{{ toolInfo.collector }}</p>
          </div>
          <div class="column is-half" v-if="toolInfo.collectionDate">
            <p class="is-size-7 has-text-grey">入藏日期</p>
            <p class="is-size-6" style="color: #2C1810;">{{ toolInfo.collectionDate }}</p>
          </div>
        </div>

        <div class="decorative-line my-3"></div>

        <div class="mb-4">
          <h4 class="is-size-6 has-text-weight-bold mb-2" style="color: #8B4513;">📊 评分详情</h4>
          <div class="columns is-multiline is-small">
            <div class="column is-one-fifth" v-for="item in scoreItems" :key="item.key">
              <div class="has-text-centered">
                <div class="score-circle" :style="{ background: getScoreGradient(item.value) }">
                  <span class="score-text">{{ item.value }}</span>
                </div>
                <p class="is-size-7 mt-1" style="color: #8B4513;">{{ item.label }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="mb-4" v-if="defects.length > 0">
          <h4 class="is-size-6 has-text-weight-bold mb-2" style="color: #8B4513;">🔍 瑕疵记录</h4>
          <div class="tags">
            <span 
              v-for="(defect, index) in defects" 
              :key="index"
              class="tag"
              :class="getSeverityTagClass(defect.severity)"
            >
              {{ defect.type }} @ {{ defect.location || '未标注' }}
            </span>
          </div>
        </div>

        <div class="mb-4" v-if="gradeInfo.description">
          <h4 class="is-size-6 has-text-weight-bold mb-2" style="color: #8B4513;">📝 评级说明</h4>
          <p class="is-size-6" style="color: #2C1810; line-height: 1.6;">{{ gradeInfo.description }}</p>
        </div>

        <div class="mb-4" v-if="photos.length > 0">
          <h4 class="is-size-6 has-text-weight-bold mb-2" style="color: #8B4513;">📷 藏品照片</h4>
          <div class="columns is-multiline is-mobile">
            <div class="column is-one-third" v-for="(photo, index) in photos.slice(0, 3)" :key="index">
              <figure class="image is-4by3">
                <img :src="photo.url" :alt="photo.caption || '藏品照片'" style="object-fit: cover; border: 1px solid #D2691E; border-radius: 4px;" />
              </figure>
              <p v-if="photo.caption" class="is-size-7 has-text-centered mt-1" style="color: #8B4513;">{{ photo.caption }}</p>
            </div>
          </div>
          <p v-if="photos.length > 3" class="is-size-7 has-text-grey has-text-centered mt-1">
            共 {{ photos.length }} 张照片
          </p>
        </div>

        <div v-if="toolInfo.provenance">
          <h4 class="is-size-6 has-text-weight-bold mb-2" style="color: #8B4513;">📜 传承来源</h4>
          <p class="is-size-6" style="color: #2C1810; line-height: 1.6;">{{ toolInfo.provenance }}</p>
        </div>
      </div>

      <div class="card-footer-section" style="background: linear-gradient(135deg, #D2691E, #8B4513);">
        <div class="columns is-vcentered px-4 py-2">
          <div class="column">
            <p class="has-text-white is-size-7">鉴定日期: {{ currentDate }}</p>
            <p class="has-text-white is-size-7">鉴定师: {{ toolInfo.collector || '专业鉴定师' }}</p>
          </div>
          <div class="column has-text-right">
            <p class="has-text-white is-size-7 stamp-text">AUTHENTICATED</p>
            <div class="stamp-seal">
              <span>鉴</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="has-text-centered mt-4">
      <button class="button is-primary" @click="downloadCard" style="background-color: #8B4513;">
        <span>⬇️ 下载评级卡片</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import html2canvas from 'html2canvas';

const props = defineProps({
  toolInfo: {
    type: Object,
    required: true
  },
  gradeInfo: {
    type: Object,
    required: true
  },
  defects: {
    type: Array,
    required: true
  },
  photos: {
    type: Array,
    required: true
  }
});

const cardElement = ref(null);

const currentDate = computed(() => {
  return new Date().toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
});

const scoreItems = computed(() => [
  { key: 'completeness', label: '完整度', value: props.gradeInfo.completeness },
  { key: 'originality', label: '原创度', value: props.gradeInfo.originality },
  { key: 'preservation', label: '保存', value: props.gradeInfo.preservation },
  { key: 'rarity', label: '稀有度', value: props.gradeInfo.rarity },
  { key: 'aesthetic', label: '艺术', value: props.gradeInfo.aesthetic }
]);

const getGradeColor = (grade) => {
  const colors = {
    'SSS': '#ff3860',
    'SS': '#ffdd57',
    'S': '#00d1b2',
    'A+': '#3298dc',
    'A': '#48c78e',
    'B': '#b5b5b5',
    'C': '#7a7a7a'
  };
  return colors[grade] || '#dbdbdb';
};

const getScoreGradient = (score) => {
  if (score >= 90) return 'linear-gradient(135deg, #ffdd57, #ff3860)';
  if (score >= 75) return 'linear-gradient(135deg, #00d1b2, #3298dc)';
  if (score >= 60) return 'linear-gradient(135deg, #48c78e, #00d1b2)';
  return 'linear-gradient(135deg, #b5b5b5, #7a7a7a)';
};

const getSeverityTagClass = (severity) => {
  switch (severity) {
    case '轻微': return 'is-success is-light';
    case '中等': return 'is-warning is-light';
    case '严重': return 'is-danger is-light';
    default: return 'is-light';
  }
};

const downloadCard = async () => {
  if (!cardElement.value) return;
  
  try {
    const canvas = await html2canvas(cardElement.value, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#FDF8F0'
    });
    
    const link = document.createElement('a');
    link.download = `评级卡片_${props.toolInfo.name || '藏品'}_${currentDate.value}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  } catch (error) {
    console.error('下载失败:', error);
    alert('下载失败，请重试');
  }
};

defineExpose({
  downloadCard
});
</script>

<style scoped>
.grading-card-container {
  position: sticky;
  top: 1rem;
}

.card-preview {
  max-width: 500px;
  margin: 0 auto;
  overflow: hidden;
}

.grade-display {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  border: 3px solid #fff;
}

.grade-text {
  font-size: 2rem;
  font-weight: bold;
  color: white;
  font-family: 'Georgia', serif;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.score-circle {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}

.score-text {
  font-size: 0.9rem;
  font-weight: bold;
  color: white;
  font-family: 'Georgia', serif;
}

.stamp-seal {
  display: inline-block;
  width: 40px;
  height: 40px;
  background-color: #dc3545;
  color: white;
  font-size: 1.2rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transform: rotate(-15deg);
  margin-left: auto;
  font-family: 'KaiTi', 'SimSun', serif;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}
</style>
