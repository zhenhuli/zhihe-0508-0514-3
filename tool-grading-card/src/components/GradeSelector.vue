<template>
  <div class="form-container">
    <h3 class="title is-4 mb-4" style="color: #8B4513;">⭐ 品相评级</h3>
    
    <div class="field mb-6">
      <label class="label">综合品级</label>
      <div class="control">
        <div class="buttons is-centered">
          <button 
            v-for="grade in gradeLevels" 
            :key="grade.value"
            class="button is-large"
            :class="{ 
              'is-active': modelValue.overallGrade === grade.value,
              [grade.color]: true
            }"
            @click="updateField('overallGrade', grade.value)"
          >
            <span class="grade-badge" style="font-size: 1.5rem;">{{ grade.value }}</span>
          </button>
        </div>
        <p class="help has-text-centered mt-2">
          {{ currentGradeDescription }}
        </p>
      </div>
    </div>

    <div class="decorative-line my-4"></div>

    <div class="field">
      <label class="label">
        完整度 <span class="has-text-grey is-size-6">({{ modelValue.completeness }}分)</span>
      </label>
      <div class="control">
        <input 
          type="range" 
          min="0" 
          max="100" 
          class="slider"
          :value="modelValue.completeness"
          @input="updateField('completeness', parseInt($event.target.value))"
          style="width: 100%;"
        />
      </div>
      <div class="columns is-mobile has-text-centered is-size-7">
        <div class="column">残缺</div>
        <div class="column">一般</div>
        <div class="column">完好</div>
        <div class="column">完美</div>
      </div>
    </div>

    <div class="field">
      <label class="label">
        原创度 <span class="has-text-grey is-size-6">({{ modelValue.originality }}分)</span>
      </label>
      <div class="control">
        <input 
          type="range" 
          min="0" 
          max="100" 
          class="slider"
          :value="modelValue.originality"
          @input="updateField('originality', parseInt($event.target.value))"
          style="width: 100%;"
        />
      </div>
      <div class="columns is-mobile has-text-centered is-size-7">
        <div class="column">仿品</div>
        <div class="column">存疑</div>
        <div class="column">真品</div>
        <div class="column">精品</div>
      </div>
    </div>

    <div class="field">
      <label class="label">
        保存状况 <span class="has-text-grey is-size-6">({{ modelValue.preservation }}分)</span>
      </label>
      <div class="control">
        <input 
          type="range" 
          min="0" 
          max="100" 
          class="slider"
          :value="modelValue.preservation"
          @input="updateField('preservation', parseInt($event.target.value))"
          style="width: 100%;"
        />
      </div>
      <div class="columns is-mobile has-text-centered is-size-7">
        <div class="column">极差</div>
        <div class="column">一般</div>
        <div class="column">良好</div>
        <div class="column">极佳</div>
      </div>
    </div>

    <div class="field">
      <label class="label">
        稀有度 <span class="has-text-grey is-size-6">({{ modelValue.rarity }}分)</span>
      </label>
      <div class="control">
        <input 
          type="range" 
          min="0" 
          max="100" 
          class="slider"
          :value="modelValue.rarity"
          @input="updateField('rarity', parseInt($event.target.value))"
          style="width: 100%;"
        />
      </div>
      <div class="columns is-mobile has-text-centered is-size-7">
        <div class="column">常见</div>
        <div class="column">较少</div>
        <div class="column">稀有</div>
        <div class="column">孤品</div>
      </div>
    </div>

    <div class="field">
      <label class="label">
        艺术价值 <span class="has-text-grey is-size-6">({{ modelValue.aesthetic }}分)</span>
      </label>
      <div class="control">
        <input 
          type="range" 
          min="0" 
          max="100" 
          class="slider"
          :value="modelValue.aesthetic"
          @input="updateField('aesthetic', parseInt($event.target.value))"
          style="width: 100%;"
        />
      </div>
      <div class="columns is-mobile has-text-centered is-size-7">
        <div class="column">一般</div>
        <div class="column">良好</div>
        <div class="column">优秀</div>
        <div class="column">绝伦</div>
      </div>
    </div>

    <div class="decorative-line my-4"></div>

    <div class="field">
      <label class="label">评级说明</label>
      <div class="control">
        <textarea 
          class="textarea" 
          placeholder="请详细描述评级依据和特点"
          rows="3"
          :value="modelValue.description"
          @input="updateField('description', $event.target.value)"
        ></textarea>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  modelValue: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['update:modelValue']);

const gradeLevels = [
  { value: 'SSS', color: 'is-danger', description: '绝世珍品，完美无瑕，具有极高的历史和艺术价值' },
  { value: 'SS', color: 'is-warning', description: '顶级藏品，近乎完美，保存极佳' },
  { value: 'S', color: 'is-primary', description: '精品藏品，品相优秀，特征明显' },
  { value: 'A+', color: 'is-info', description: '上品，品相良好， minor瑕疵不影响整体价值' },
  { value: 'A', color: 'is-success', description: '佳品，品相不错，有轻微使用痕迹' },
  { value: 'B', color: 'is-light', description: '中品，有明显瑕疵但不影响收藏' },
  { value: 'C', color: 'is-light', description: '下品，瑕疵较多，适合研究学习' }
];

const currentGradeDescription = computed(() => {
  const grade = gradeLevels.find(g => g.value === props.modelValue.overallGrade);
  return grade ? grade.description : '请选择综合品级';
});

const updateField = (field, value) => {
  emit('update:modelValue', {
    ...props.modelValue,
    [field]: value
  });
};
</script>

<style scoped>
.label {
  color: #8B4513;
  font-family: 'Georgia', serif;
}

.button.is-active {
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.button.is-danger.is-active {
  background-color: #ff3860;
  border-color: #ff3860;
}

.button.is-warning.is-active {
  background-color: #ffdd57;
  border-color: #ffdd57;
}

.button.is-primary.is-active {
  background-color: #00d1b2;
  border-color: #00d1b2;
}

.slider {
  -webkit-appearance: none;
  height: 8px;
  border-radius: 4px;
  background: linear-gradient(to right, #D2691E, #8B4513);
  outline: none;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #DAA520;
  cursor: pointer;
  border: 2px solid #8B4513;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.slider::-moz-range-thumb {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #DAA520;
  cursor: pointer;
  border: 2px solid #8B4513;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.textarea {
  border-color: #D2691E;
  background-color: #FDF8F0;
}

.textarea:focus {
  border-color: #8B4513;
  box-shadow: 0 0 0 0.125em rgba(139, 69, 19, 0.25);
}
</style>
