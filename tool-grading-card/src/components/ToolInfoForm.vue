<template>
  <div class="form-container">
    <h3 class="title is-4 mb-4" style="color: #8B4513;">📋 藏品基本信息</h3>
    
    <div class="field">
      <label class="label">藏品名称</label>
      <div class="control">
        <input 
          class="input" 
          type="text" 
          placeholder="请输入藏品名称"
          :value="modelValue.name"
          @input="updateField('name', $event.target.value)"
        />
      </div>
    </div>

    <div class="columns">
      <div class="column">
        <div class="field">
          <label class="label">藏品类别</label>
          <div class="control">
            <div class="select is-fullwidth">
              <select 
                :value="modelValue.category"
                @change="updateField('category', $event.target.value)"
              >
                <option value="">请选择类别</option>
                <option value="青铜器">青铜器</option>
                <option value="玉器">玉器</option>
                <option value="瓷器">瓷器</option>
                <option value="书画">书画</option>
                <option value="木器">木器</option>
                <option value="钱币">钱币</option>
                <option value="杂项">杂项</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div class="column">
        <div class="field">
          <label class="label">年代</label>
          <div class="control">
            <div class="select is-fullwidth">
              <select 
                :value="modelValue.era"
                @change="updateField('era', $event.target.value)"
              >
                <option value="">请选择年代</option>
                <option value="商周">商周</option>
                <option value="秦汉">秦汉</option>
                <option value="魏晋南北朝">魏晋南北朝</option>
                <option value="隋唐">隋唐</option>
                <option value="宋元">宋元</option>
                <option value="明清">明清</option>
                <option value="民国">民国</option>
                <option value="近现代">近现代</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="columns">
      <div class="column">
        <div class="field">
          <label class="label">产地</label>
          <div class="control">
            <input 
              class="input" 
              type="text" 
              placeholder="如：景德镇"
              :value="modelValue.origin"
              @input="updateField('origin', $event.target.value)"
            />
          </div>
        </div>
      </div>
      <div class="column">
        <div class="field">
          <label class="label">材质</label>
          <div class="control">
            <input 
              class="input" 
              type="text" 
              placeholder="如：青花瓷"
              :value="modelValue.material"
              @input="updateField('material', $event.target.value)"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="columns">
      <div class="column">
        <div class="field">
          <label class="label">尺寸</label>
          <div class="control">
            <input 
              class="input" 
              type="text" 
              placeholder="如：高30cm 口径15cm"
              :value="modelValue.dimensions"
              @input="updateField('dimensions', $event.target.value)"
            />
          </div>
        </div>
      </div>
      <div class="column">
        <div class="field">
          <label class="label">重量</label>
          <div class="control">
            <input 
              class="input" 
              type="text" 
              placeholder="如：1.5kg"
              :value="modelValue.weight"
              @input="updateField('weight', $event.target.value)"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="columns">
      <div class="column">
        <div class="field">
          <label class="label">收藏家</label>
          <div class="control">
            <input 
              class="input" 
              type="text" 
              placeholder="请输入收藏家姓名"
              :value="modelValue.collector"
              @input="updateField('collector', $event.target.value)"
            />
          </div>
        </div>
      </div>
      <div class="column">
        <div class="field">
          <label class="label">入藏日期</label>
          <div class="control">
            <input 
              class="input" 
              type="date"
              :value="modelValue.collectionDate"
              @input="updateField('collectionDate', $event.target.value)"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="field">
      <label class="label">传承来源</label>
      <div class="control">
        <textarea 
          class="textarea" 
          placeholder="请描述藏品的传承历史和来源"
          rows="3"
          :value="modelValue.provenance"
          @input="updateField('provenance', $event.target.value)"
        ></textarea>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['update:modelValue']);

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

.input, .select select, .textarea {
  border-color: #D2691E;
  background-color: #FDF8F0;
}

.input:focus, .select select:focus, .textarea:focus {
  border-color: #8B4513;
  box-shadow: 0 0 0 0.125em rgba(139, 69, 19, 0.25);
}
</style>
