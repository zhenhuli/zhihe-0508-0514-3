<template>
  <div class="container py-6">
    <section class="hero is-small mb-6">
      <div class="hero-body has-text-centered">
        <h1 class="title" style="color: #8B4513; font-family: 'Georgia', serif;">
          🏺 老式收藏工具品级鉴定
        </h1>
        <p class="subtitle" style="color: #D2691E;">
          专业藏品评级 · 标准化卡片生成
        </p>
      </div>
    </section>

    <div class="columns">
      <div class="column is-7">
        <div class="box paper-bg vintage-border">
          <div class="tabs is-boxed">
            <ul>
              <li :class="{ 'is-active': activeTab === 'info' }">
                <a @click="activeTab = 'info'">
                  <span>📋 基本信息</span>
                </a>
              </li>
              <li :class="{ 'is-active': activeTab === 'grade' }">
                <a @click="activeTab = 'grade'">
                  <span>⭐ 品相评级</span>
                </a>
              </li>
              <li :class="{ 'is-active': activeTab === 'defect' }">
                <a @click="activeTab = 'defect'">
                  <span>🔍 瑕疵记录</span>
                </a>
              </li>
              <li :class="{ 'is-active': activeTab === 'photos' }">
                <a @click="activeTab = 'photos'">
                  <span>📷 配图归档</span>
                </a>
              </li>
            </ul>
          </div>

          <div class="mt-4">
            <ToolInfoForm v-if="activeTab === 'info'" v-model="toolInfo" />
            <GradeSelector v-if="activeTab === 'grade'" v-model="gradeInfo" />
            <DefectRecorder v-if="activeTab === 'defect'" v-model="defects" />
            <PhotoUploader v-if="activeTab === 'photos'" v-model="photos" />
          </div>

          <div class="field is-grouped is-grouped-centered mt-6">
            <p class="control">
              <button class="button is-warning" @click="resetForm">
                <span>🔄 重置</span>
              </button>
            </p>
          </div>
        </div>
      </div>

      <div class="column is-5">
        <GradingCard 
          :tool-info="toolInfo" 
          :grade-info="gradeInfo" 
          :defects="defects" 
          :photos="photos"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import ToolInfoForm from './components/ToolInfoForm.vue';
import GradeSelector from './components/GradeSelector.vue';
import DefectRecorder from './components/DefectRecorder.vue';
import PhotoUploader from './components/PhotoUploader.vue';
import GradingCard from './components/GradingCard.vue';

const activeTab = ref('info');

let toolInfo = ref({
  name: '',
  category: '',
  era: '',
  origin: '',
  material: '',
  dimensions: '',
  weight: '',
  collector: '',
  collectionDate: '',
  provenance: ''
});

let gradeInfo = ref({
  overallGrade: '',
  completeness: 0,
  originality: 0,
  preservation: 0,
  rarity: 0,
  aesthetic: 0,
  description: ''
});

const defects = ref([]);
const photos = ref([]);

const resetForm = () => {
  toolInfo.value = {
    name: '',
    category: '',
    era: '',
    origin: '',
    material: '',
    dimensions: '',
    weight: '',
    collector: '',
    collectionDate: '',
    provenance: ''
  };
  gradeInfo.value = {
    overallGrade: '',
    completeness: 0,
    originality: 0,
    preservation: 0,
    rarity: 0,
    aesthetic: 0,
    description: ''
  };
  defects.value = [];
  photos.value = [];
  activeTab.value = 'info';
};


</script>
