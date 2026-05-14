<template>
  <div class="uk-container uk-container-expand">
    <header class="uk-section uk-section-primary uk-light">
      <div class="uk-container">
        <h1 class="uk-heading-small uk-margin-remove-bottom">
          <span uk-icon="icon: play-circle; ratio: 2"></span>
          Anime OP/ED Timeline
        </h1>
        <p class="uk-text-meta uk-margin-small-top">动漫 OP/ED 曲目时间轴整理</p>
      </div>
    </header>

    <div class="uk-grid uk-grid-collapse" uk-grid>
      <div class="uk-width-1-4@m uk-width-1-3@l">
        <YearNavigator 
          :years="years" 
          :selectedYear="selectedYear"
          @select-year="selectYear"
        />
      </div>
      
      <div class="uk-width-3-4@m uk-width-2-3@l">
        <Timeline 
          :animeList="filteredAnime" 
          :selectedYear="selectedYear"
          @scroll-to-year="scrollToYear"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import YearNavigator from './components/YearNavigator.vue';
import Timeline from './components/Timeline.vue';
import { animeData } from './data/animeData';

const selectedYear = ref(null);
const animeList = ref(animeData);

const years = computed(() => {
  const yearSet = new Set();
  animeList.value.forEach(anime => {
    yearSet.add(anime.year);
  });
  return Array.from(yearSet).sort((a, b) => b - a);
});

const filteredAnime = computed(() => {
  if (!selectedYear.value) {
    return animeList.value;
  }
  return animeList.value.filter(anime => anime.year === selectedYear.value);
});

const selectYear = (year) => {
  selectedYear.value = selectedYear.value === year ? null : year;
};

const scrollToYear = (year) => {
  selectedYear.value = year;
};

onMounted(() => {
  if (years.value.length > 0) {
    selectedYear.value = years.value[0];
  }
});
</script>

<style scoped>
header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
</style>
