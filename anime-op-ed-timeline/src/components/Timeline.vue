<template>
  <div class="timeline-container">
    <div class="uk-section uk-section-small">
      <div class="uk-container">
        <h2 class="uk-heading-line">
          <span>
            <span uk-icon="icon: clock"></span>
            {{ selectedYear ? `${selectedYear}年` : '全部' }} 曲目时间轴
          </span>
        </h2>
        
        <div class="uk-margin">
          <input 
            type="text" 
            class="uk-input" 
            placeholder="搜索动漫名称、曲目名称、作词作曲..."
            v-model="searchQuery"
          >
        </div>

        <div class="timeline" ref="timelineRef">
          <div 
            v-for="(anime, index) in filteredAnime" 
            :key="anime.id"
            class="timeline-item"
          >
            <div class="timeline-line" v-if="index < filteredAnime.length - 1"></div>
            
            <div class="timeline-dot">
              <span uk-icon="icon: play; ratio: 0.8"></span>
            </div>
            
            <div class="timeline-content">
              <div class="uk-card uk-card-default uk-card-hover">
                <div class="uk-card-header">
                  <div class="uk-grid-small uk-flex-middle" uk-grid>
                    <div class="uk-width-expand">
                      <h3 class="uk-card-title uk-margin-remove-bottom">{{ anime.title }}</h3>
                      <p class="uk-text-meta uk-margin-remove-top">
                        <span class="uk-badge uk-margin-small-right">{{ anime.year }}年</span>
                        <span>{{ anime.episodes }} 集</span>
                      </p>
                    </div>
                    <div class="uk-width-auto">
                      <span class="uk-label" :class="getTypeLabelClass(anime.type)">
                        {{ anime.type }}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div class="uk-card-body">
                  <div 
                    v-for="track in anime.tracks" 
                    :key="track.id"
                    class="track-item uk-margin-bottom"
                  >
                    <div class="uk-grid-small" uk-grid>
                      <div class="uk-width-1-1">
                        <div class="uk-flex uk-flex-middle">
                          <span class="uk-badge uk-margin-small-right" :class="getTrackBadgeClass(track.type)">
                            {{ track.type }}
                          </span>
                          <strong class="uk-h5 uk-margin-remove">{{ track.title }}</strong>
                        </div>
                        <p class="uk-text-meta uk-margin-small">
                          <span uk-icon="icon: clock"></span>
                          {{ track.startTime }} - {{ track.endTime }}
                          <span class="uk-margin-small-left">
                            <span uk-icon="icon: music"></span>
                            {{ track.duration }}
                          </span>
                        </p>
                        <div class="uk-grid-small uk-child-width-auto" uk-grid>
                          <div>
                            <span class="uk-text-small">
                              <span uk-icon="icon: user"></span>
                              作词: {{ track.lyricist }}
                            </span>
                          </div>
                          <div>
                            <span class="uk-text-small">
                              <span uk-icon="icon: pencil"></span>
                              作曲: {{ track.composer }}
                            </span>
                          </div>
                          <div>
                            <span class="uk-text-small">
                              <span uk-icon="icon: mic"></span>
                              演唱: {{ track.artist }}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <hr v-if="anime.tracks.indexOf(track) < anime.tracks.length - 1" class="uk-margin-small">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div v-if="filteredAnime.length === 0" class="uk-text-center uk-section">
          <span uk-icon="icon: search; ratio: 3"></span>
          <p class="uk-text-meta uk-margin-small">没有找到匹配的曲目</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';

const props = defineProps({
  animeList: {
    type: Array,
    required: true
  },
  selectedYear: {
    type: Number,
    default: null
  }
});

defineEmits(['scroll-to-year']);

const searchQuery = ref('');
const timelineRef = ref(null);

const filteredAnime = computed(() => {
  if (!searchQuery.value) {
    return props.animeList;
  }
  
  const query = searchQuery.value.toLowerCase();
  return props.animeList.filter(anime => {
    if (anime.title.toLowerCase().includes(query)) return true;
    return anime.tracks.some(track => 
      track.title.toLowerCase().includes(query) ||
      track.lyricist.toLowerCase().includes(query) ||
      track.composer.toLowerCase().includes(query) ||
      track.artist.toLowerCase().includes(query)
    );
  });
});

const getTypeLabelClass = (type) => {
  const classes = {
    'TV': 'uk-label-success',
    '剧场版': 'uk-label-warning',
    'OVA': 'uk-label-danger'
  };
  return classes[type] || 'uk-label-default';
};

const getTrackBadgeClass = (type) => {
  const classes = {
    'OP': 'uk-badge-primary',
    'ED': 'uk-badge-success',
    'IN': 'uk-badge-secondary'
  };
  return classes[type] || 'uk-badge-default';
};

watch(() => props.selectedYear, () => {
  if (timelineRef.value) {
    timelineRef.value.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
});
</script>

<style scoped>
.timeline-container {
  height: calc(100vh - 120px);
  overflow-y: auto;
  scroll-behavior: smooth;
}

.timeline {
  position: relative;
  padding: 20px 0;
}

.timeline-item {
  position: relative;
  margin-bottom: 40px;
  padding-left: 60px;
}

.timeline-line {
  position: absolute;
  left: 19px;
  top: 40px;
  bottom: -40px;
  width: 2px;
  background: linear-gradient(to bottom, #e5e5e5, #d4d4d4);
}

.timeline-dot {
  position: absolute;
  left: 0;
  top: 0;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
  z-index: 1;
}

.timeline-content {
  animation: fadeInUp 0.5s ease;
}

.track-item {
  transition: transform 0.2s ease;
}

.track-item:hover {
  transform: translateX(5px);
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.uk-card {
  border-left: 4px solid #667eea;
}
</style>
