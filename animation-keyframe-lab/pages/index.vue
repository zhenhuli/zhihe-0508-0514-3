<template>
  <div class="uk-container uk-margin-top uk-margin-bottom">
    <h1 class="uk-heading-medium uk-text-center uk-margin-large-bottom">CSS 关键帧动画实验室</h1>
    
    <div uk-grid class="uk-grid-medium">
      <div class="uk-width-1-2@m">
        <div class="uk-card uk-card-default uk-card-body">
          <h3 class="uk-card-title">动画设置</h3>
          
          <div class="uk-margin">
            <label class="uk-form-label">动画名称</label>
            <input 
              v-model="animationName" 
              class="uk-input" 
              type="text" 
              placeholder="myAnimation"
            />
          </div>
          
          <div class="uk-margin">
            <label class="uk-form-label">动画时长 (秒)</label>
            <input 
              v-model.number="duration" 
              class="uk-input" 
              type="number" 
              min="0.1" 
              step="0.1"
            />
          </div>
          
          <div class="uk-margin">
            <label class="uk-form-label">缓动曲线</label>
            <select v-model="easing" class="uk-select">
              <option value="linear">linear</option>
              <option value="ease">ease</option>
              <option value="ease-in">ease-in</option>
              <option value="ease-out">ease-out</option>
              <option value="ease-in-out">ease-in-out</option>
              <option value="cubic-bezier(0.68, -0.55, 0.265, 1.55)">弹性效果</option>
            </select>
          </div>
          
          <div class="uk-margin">
            <label class="uk-form-label">循环次数</label>
            <select v-model="iterationCount" class="uk-select">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="infinite">无限循环</option>
            </select>
          </div>
          
          <div class="uk-margin">
            <label class="uk-form-label">方向</label>
            <select v-model="direction" class="uk-select">
              <option value="normal">normal</option>
              <option value="reverse">reverse</option>
              <option value="alternate">alternate</option>
              <option value="alternate-reverse">alternate-reverse</option>
            </select>
          </div>
          
          <hr class="uk-divider-icon" />
          
          <h4>关键帧设置</h4>
          <div class="uk-margin">
            <label class="uk-form-label">关键帧数量</label>
            <input 
              v-model.number="keyframeCount" 
              class="uk-input" 
              type="number" 
              min="2" 
              max="20"
              @change="updateKeyframes"
            />
          </div>
          
          <div class="uk-margin">
            <label class="uk-form-label">预设动画类型</label>
            <select v-model="presetType" class="uk-select" @change="applyPreset">
              <option value="custom">自定义</option>
              <option value="fadeIn">淡入</option>
              <option value="slideIn">滑入</option>
              <option value="bounce">弹跳</option>
              <option value="rotate">旋转</option>
              <option value="scale">缩放</option>
              <option value="shake">抖动</option>
            </select>
          </div>
        </div>
      </div>
      
      <div class="uk-width-1-2@m">
        <div class="uk-card uk-card-default uk-card-body">
          <h3 class="uk-card-title">实时预览</h3>
          <div 
            class="preview-container"
            :style="previewContainerStyle"
          >
            <div 
              class="animated-box"
              :style="animatedBoxStyle"
            >
              <span uk-icon="icon: star; ratio: 2"></span>
            </div>
          </div>
          
          <div class="uk-margin-top uk-flex uk-flex-center">
            <button 
              @click="togglePlay" 
              class="uk-button uk-button-primary uk-margin-small-right"
            >
              <span uk-icon="icon: play"></span> {{ isPlaying ? '暂停' : '播放' }}
            </button>
            <button 
              @click="resetAnimation" 
              class="uk-button uk-button-default"
            >
              <span uk-icon="icon: refresh"></span> 重置
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <div class="uk-card uk-card-default uk-card-body uk-margin-top">
      <h3 class="uk-card-title">关键帧编辑器</h3>
      <div class="uk-overflow-auto">
        <table class="uk-table uk-table-divider">
          <thead>
            <tr>
              <th>百分比 (%)</th>
              <th>X 偏移 (px)</th>
              <th>Y 偏移 (px)</th>
              <th>缩放</th>
              <th>旋转 (deg)</th>
              <th>透明度</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(keyframe, index) in keyframes" :key="index">
              <td>
                <input 
                  v-model.number="keyframe.percent" 
                  class="uk-input uk-form-width-small" 
                  type="number"
                  min="0"
                  max="100"
                  :readonly="index === 0 || index === keyframes.length - 1"
                />
              </td>
              <td>
                <input 
                  v-model.number="keyframe.x" 
                  class="uk-input uk-form-width-small" 
                  type="number"
                />
              </td>
              <td>
                <input 
                  v-model.number="keyframe.y" 
                  class="uk-input uk-form-width-small" 
                  type="number"
                />
              </td>
              <td>
                <input 
                  v-model.number="keyframe.scale" 
                  class="uk-input uk-form-width-small" 
                  type="number"
                  step="0.1"
                  min="0"
                />
              </td>
              <td>
                <input 
                  v-model.number="keyframe.rotate" 
                  class="uk-input uk-form-width-small" 
                  type="number"
                />
              </td>
              <td>
                <input 
                  v-model.number="keyframe.opacity" 
                  class="uk-input uk-form-width-small" 
                  type="number"
                  step="0.1"
                  min="0"
                  max="1"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    
    <div class="uk-card uk-card-default uk-card-body uk-margin-top">
      <div class="uk-flex uk-flex-between uk-flex-middle">
        <h3 class="uk-card-title uk-margin-remove">生成的 CSS 代码</h3>
        <button 
          @click="copyCode" 
          class="uk-button uk-button-primary"
        >
          <span uk-icon="icon: copy"></span> 复制代码
        </button>
      </div>
      <pre class="uk-margin-top"><code class="css-code">{{ generatedCSS }}</code></pre>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const animationName = ref('myAnimation')
const duration = ref(2)
const easing = ref('ease')
const iterationCount = ref('infinite')
const direction = ref('normal')
const keyframeCount = ref(4)
const presetType = ref('custom')
const isPlaying = ref(true)

const keyframes = ref([
  { percent: 0, x: 0, y: 0, scale: 1, rotate: 0, opacity: 1 },
  { percent: 25, x: 100, y: 50, scale: 1.2, rotate: 90, opacity: 0.8 },
  { percent: 50, x: 200, y: 0, scale: 0.8, rotate: 180, opacity: 0.6 },
  { percent: 100, x: 0, y: 0, scale: 1, rotate: 360, opacity: 1 }
])

const updateKeyframes = () => {
  const count = Math.max(2, Math.min(20, keyframeCount.value))
  const newKeyframes = []
  
  for (let i = 0; i < count; i++) {
    const percent = Math.round((i / (count - 1)) * 100)
    newKeyframes.push({
      percent,
      x: Math.round(Math.sin(percent * Math.PI / 50) * 100),
      y: Math.round(Math.cos(percent * Math.PI / 50) * 50),
      scale: 1,
      rotate: Math.round(percent * 3.6),
      opacity: 1
    })
  }
  
  keyframes.value = newKeyframes
  presetType.value = 'custom'
}

const applyPreset = () => {
  switch (presetType.value) {
    case 'fadeIn':
      keyframeCount.value = 2
      keyframes.value = [
        { percent: 0, x: 0, y: 0, scale: 1, rotate: 0, opacity: 0 },
        { percent: 100, x: 0, y: 0, scale: 1, rotate: 0, opacity: 1 }
      ]
      break
    case 'slideIn':
      keyframeCount.value = 2
      keyframes.value = [
        { percent: 0, x: -200, y: 0, scale: 1, rotate: 0, opacity: 0 },
        { percent: 100, x: 0, y: 0, scale: 1, rotate: 0, opacity: 1 }
      ]
      break
    case 'bounce':
      keyframeCount.value = 5
      keyframes.value = [
        { percent: 0, x: 0, y: 0, scale: 1, rotate: 0, opacity: 1 },
        { percent: 30, x: 0, y: -100, scale: 1.1, rotate: 0, opacity: 1 },
        { percent: 50, x: 0, y: 0, scale: 0.95, rotate: 0, opacity: 1 },
        { percent: 70, x: 0, y: -50, scale: 1.05, rotate: 0, opacity: 1 },
        { percent: 100, x: 0, y: 0, scale: 1, rotate: 0, opacity: 1 }
      ]
      break
    case 'rotate':
      keyframeCount.value = 2
      keyframes.value = [
        { percent: 0, x: 0, y: 0, scale: 1, rotate: 0, opacity: 1 },
        { percent: 100, x: 0, y: 0, scale: 1, rotate: 360, opacity: 1 }
      ]
      break
    case 'scale':
      keyframeCount.value = 4
      keyframes.value = [
        { percent: 0, x: 0, y: 0, scale: 0.3, rotate: 0, opacity: 0 },
        { percent: 50, x: 0, y: 0, scale: 1.2, rotate: 0, opacity: 1 },
        { percent: 75, x: 0, y: 0, scale: 0.9, rotate: 0, opacity: 1 },
        { percent: 100, x: 0, y: 0, scale: 1, rotate: 0, opacity: 1 }
      ]
      break
    case 'shake':
      keyframeCount.value = 5
      keyframes.value = [
        { percent: 0, x: 0, y: 0, scale: 1, rotate: 0, opacity: 1 },
        { percent: 25, x: -20, y: 0, scale: 1, rotate: 0, opacity: 1 },
        { percent: 50, x: 20, y: 0, scale: 1, rotate: 0, opacity: 1 },
        { percent: 75, x: -20, y: 0, scale: 1, rotate: 0, opacity: 1 },
        { percent: 100, x: 0, y: 0, scale: 1, rotate: 0, opacity: 1 }
      ]
      break
  }
}

const generatedCSS = computed(() => {
  let css = `@keyframes ${animationName.value} {\n`
  
  keyframes.value.forEach(kf => {
    const transforms = []
    if (kf.x !== 0 || kf.y !== 0) {
      transforms.push(`translate(${kf.x}px, ${kf.y}px)`)
    }
    if (kf.scale !== 1) {
      transforms.push(`scale(${kf.scale})`)
    }
    if (kf.rotate !== 0) {
      transforms.push(`rotate(${kf.rotate}deg)`)
    }
    
    css += `  ${kf.percent}% {\n`
    if (transforms.length > 0) {
      css += `    transform: ${transforms.join(' ')};\n`
    }
    if (kf.opacity !== 1) {
      css += `    opacity: ${kf.opacity};\n`
    }
    css += `  }\n`
  })
  
  css += `}\n\n`
  css += `.${animationName.value} {\n`
  css += `  animation: ${animationName.value} ${duration.value}s ${easing.value} ${iterationCount.value} ${direction.value};\n`
  css += `}`
  
  return css
})

const animationCSS = computed(() => {
  let css = `@keyframes ${animationName.value} {\n`
  
  keyframes.value.forEach(kf => {
    const transforms = []
    if (kf.x !== 0 || kf.y !== 0) {
      transforms.push(`translate(${kf.x}px, ${kf.y}px)`)
    }
    if (kf.scale !== 1) {
      transforms.push(`scale(${kf.scale})`)
    }
    if (kf.rotate !== 0) {
      transforms.push(`rotate(${kf.rotate}deg)`)
    }
    
    css += `  ${kf.percent}% {\n`
    if (transforms.length > 0) {
      css += `    transform: ${transforms.join(' ')};\n`
    }
    if (kf.opacity !== 1) {
      css += `    opacity: ${kf.opacity};\n`
    }
    css += `  }\n`
  })
  
  css += `}`
  return css
})

const animatedBoxStyle = computed(() => {
  if (!isPlaying.value) {
    return {
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
      animation: 'none'
    }
  }
  
  return {
    left: 'calc(50% - 40px)',
    top: 'calc(50% - 40px)',
    animation: `${animationName.value} ${duration.value}s ${easing.value} ${iterationCount.value} ${direction.value}`
  }
})

const previewContainerStyle = computed(() => {
  return {
    position: 'relative'
  }
})

const togglePlay = () => {
  isPlaying.value = !isPlaying.value
}

const resetAnimation = () => {
  isPlaying.value = false
  setTimeout(() => {
    isPlaying.value = true
  }, 50)
}

const copyCode = async () => {
  try {
    await navigator.clipboard.writeText(generatedCSS.value)
    alert('代码已复制到剪贴板！')
  } catch (err) {
    alert('复制失败，请手动复制')
  }
}

watch(animationCSS, (newCSS) => {
  if (process.client) {
    let styleEl = document.getElementById('dynamic-animation')
    if (!styleEl) {
      styleEl = document.createElement('style')
      styleEl.id = 'dynamic-animation'
      document.head.appendChild(styleEl)
    }
    styleEl.textContent = newCSS
  }
}, { immediate: true })
</script>

<style>
  .preview-container {
    width: 100%;
    height: 300px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 8px;
    position: relative;
    overflow: hidden;
  }
  
  .animated-box {
    position: absolute;
    width: 80px;
    height: 80px;
    background: #fff;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #667eea;
    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
  }
  
  .css-code {
    background: #1e293b;
    color: #e2e8f0;
    padding: 20px;
    border-radius: 8px;
    overflow-x: auto;
    font-family: 'Monaco', 'Menlo', monospace;
    font-size: 13px;
    line-height: 1.6;
  }
</style>
