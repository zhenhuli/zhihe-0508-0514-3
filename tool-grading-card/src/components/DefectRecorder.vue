<template>
  <div class="form-container">
    <h3 class="title is-4 mb-4" style="color: #8B4513;">🔍 瑕疵细节记录</h3>
    
    <div class="box" style="background-color: #FFF8F0; border: 1px dashed #D2691E;">
      <div class="columns">
        <div class="column">
          <div class="field">
            <label class="label">瑕疵类型</label>
            <div class="control">
              <div class="select is-fullwidth">
                <select v-model="newDefect.type">
                  <option value="">请选择类型</option>
                  <option value="裂痕">裂痕</option>
                  <option value="磕碰">磕碰</option>
                  <option value="磨损">磨损</option>
                  <option value="锈蚀">锈蚀</option>
                  <option value="变形">变形</option>
                  <option value="缺失">缺失</option>
                  <option value="修复">修复痕迹</option>
                  <option value="污渍">污渍</option>
                  <option value="其他">其他</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div class="column">
          <div class="field">
            <label class="label">严重程度</label>
            <div class="control">
              <div class="select is-fullwidth">
                <select v-model="newDefect.severity">
                  <option value="轻微">轻微</option>
                  <option value="中等">中等</option>
                  <option value="严重">严重</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="field">
        <label class="label">位置描述</label>
        <div class="control">
          <input 
            class="input" 
            type="text" 
            placeholder="如：器身左侧、口沿处、底部..."
            v-model="newDefect.location"
          />
        </div>
      </div>

      <div class="field">
        <label class="label">详细描述</label>
        <div class="control">
          <textarea 
            class="textarea" 
            placeholder="请详细描述瑕疵的特征、大小、深度等"
            rows="2"
            v-model="newDefect.description"
          ></textarea>
        </div>
      </div>

      <div class="field is-grouped is-grouped-right">
        <p class="control">
          <button class="button" @click="clearNewDefect">
            清空
          </button>
        </p>
        <p class="control">
          <button class="button is-primary" @click="addDefect" style="background-color: #8B4513;">
            ➕ 添加瑕疵
          </button>
        </p>
      </div>
    </div>

    <div class="mt-4" v-if="modelValue.length > 0">
      <h4 class="title is-5 mb-3" style="color: #D2691E;">已记录的瑕疵 ({{ modelValue.length }})</h4>
      <div class="mb-2" v-for="(defect, index) in modelValue" :key="index">
        <div class="box" style="background-color: #FDF8F0; border-left: 4px solid;" :style="{ borderLeftColor: getSeverityColor(defect.severity) }">
          <div class="columns is-vcentered">
            <div class="column is-narrow">
              <span class="tag is-medium" :class="getSeverityTagClass(defect.severity)">
                {{ defect.severity }}
              </span>
            </div>
            <div class="column">
              <p class="is-size-5 has-text-weight-bold" style="color: #8B4513;">
                {{ defect.type }}
                <span v-if="defect.location" class="is-size-6 has-text-grey ml-2">
                  @ {{ defect.location }}
                </span>
              </p>
              <p v-if="defect.description" class="is-size-6 has-text-grey-dark mt-1">
                {{ defect.description }}
              </p>
            </div>
            <div class="column is-narrow">
              <button class="button is-small is-danger" @click="removeDefect(index)">
                ✕ 删除
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="has-text-centered py-6 has-text-grey">
      <span class="is-size-4">📝</span>
      <p class="mt-2">暂无瑕疵记录，请添加瑕疵信息</p>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue';

const props = defineProps({
  modelValue: {
    type: Array,
    required: true
  }
});

const emit = defineEmits(['update:modelValue']);

const newDefect = reactive({
  type: '',
  severity: '轻微',
  location: '',
  description: ''
});

const getSeverityColor = (severity) => {
  switch (severity) {
    case '轻微': return '#48c78e';
    case '中等': return '#ffe08a';
    case '严重': return '#f14668';
    default: return '#D2691E';
  }
};

const getSeverityTagClass = (severity) => {
  switch (severity) {
    case '轻微': return 'is-success';
    case '中等': return 'is-warning';
    case '严重': return 'is-danger';
    default: return 'is-light';
  }
};

const addDefect = () => {
  if (!newDefect.type) {
    return;
  }
  const updatedDefects = [
    ...props.modelValue,
    { ...newDefect }
  ];
  emit('update:modelValue', updatedDefects);
  clearNewDefect();
};

const removeDefect = (index) => {
  const updatedDefects = props.modelValue.filter((_, i) => i !== index);
  emit('update:modelValue', updatedDefects);
};

const clearNewDefect = () => {
  newDefect.type = '';
  newDefect.severity = '轻微';
  newDefect.location = '';
  newDefect.description = '';
};
</script>

<style scoped>
.label {
  color: #8B4513;
  font-family: 'Georgia', serif;
}

.input, .select select, .textarea {
  border-color: #D2691E;
  background-color: #FDF8F0;
}

.input:focus, .select select:focus, .textarea:focus {
  border-color: #8B4513;
  box-shadow: 0 0 0 0.125em rgba(139, 69, 19, 0.25);
}
</style>
