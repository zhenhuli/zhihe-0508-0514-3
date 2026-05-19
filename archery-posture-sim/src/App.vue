<template>
  <div class="app-container">
    <header class="app-header">
      <h1>🏹 传统射箭姿势教学演示</h1>
      <p class="subtitle">分步学习正确的射箭姿势，掌握射箭精髓</p>
    </header>

    <div class="steps-nav">
      <button
        v-for="(step, index) in steps"
        :key="step.id"
        :class="['step-btn', { active: currentStep === index }]"
        @click="currentStep = index"
      >
        <span class="step-number">{{ index + 1 }}</span>
        <span class="step-name">{{ step.name }}</span>
      </button>
    </div>

    <div class="content-area">
      <component :is="currentComponent" :show-guide="showGuide" />
    </div>

    <div class="control-panel">
      <label class="toggle-label">
        <input type="checkbox" v-model="showGuide" />
        <span>显示姿势纠正参考线</span>
      </label>
      <div class="nav-buttons">
        <button
          class="nav-btn prev"
          :disabled="currentStep === 0"
          @click="prevStep"
        >
          ← 上一步
        </button>
        <button
          class="nav-btn next"
          :disabled="currentStep === steps.length - 1"
          @click="nextStep"
        >
          下一步 →
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import StepNock from './components/StepNock.vue'
import StepDraw from './components/StepDraw.vue'
import StepAim from './components/StepAim.vue'

export default {
  name: 'App',
  components: {
    StepNock,
    StepDraw,
    StepAim
  },
  data() {
    return {
      currentStep: 0,
      showGuide: true,
      steps: [
        { id: 'nock', name: '搭箭', component: 'StepNock' },
        { id: 'draw', name: '拉弓', component: 'StepDraw' },
        { id: 'aim', name: '瞄准', component: 'StepAim' }
      ]
    }
  },
  computed: {
    currentComponent() {
      return this.steps[this.currentStep].component
    }
  },
  methods: {
    prevStep() {
      if (this.currentStep > 0) {
        this.currentStep--
      }
    },
    nextStep() {
      if (this.currentStep < this.steps.length - 1) {
        this.currentStep++
      }
    }
  }
}
</script>

<style lang="less" scoped>
@primary-color: #8B4513;
@secondary-color: #D2691E;
@bg-color: #FFF8DC;
@card-bg: #FFFAF0;

.app-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-header {
  text-align: center;
  padding: 30px 20px;
  background: linear-gradient(135deg, @primary-color 0%, @secondary-color 100%);
  border-radius: 16px;
  color: white;
  margin-bottom: 30px;
  box-shadow: 0 8px 32px rgba(139, 69, 19, 0.3);

  h1 {
    font-size: 2.5rem;
    margin-bottom: 10px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  }

  .subtitle {
    font-size: 1.1rem;
    opacity: 0.9;
  }
}

.steps-nav {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 30px;
  flex-wrap: wrap;

  .step-btn {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 15px 30px;
    border: 3px solid @primary-color;
    background: white;
    border-radius: 50px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 1rem;
    font-weight: 600;
    color: @primary-color;

    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 6px 20px rgba(139, 69, 19, 0.3);
    }

    &.active {
      background: @primary-color;
      color: white;
      transform: scale(1.05);
    }

    .step-number {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: @primary-color;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
    }

    &.active .step-number {
      background: white;
      color: @primary-color;
    }
  }
}

.content-area {
  flex: 1;
  background: @card-bg;
  border-radius: 16px;
  padding: 40px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
}

.control-panel {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 30px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  flex-wrap: wrap;
  gap: 20px;

  .toggle-label {
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    font-size: 1rem;
    color: @primary-color;
    font-weight: 500;

    input[type="checkbox"] {
      width: 20px;
      height: 20px;
      cursor: pointer;
      accent-color: @primary-color;
    }
  }

  .nav-buttons {
    display: flex;
    gap: 15px;

    .nav-btn {
      padding: 12px 30px;
      border: none;
      border-radius: 8px;
      background: @primary-color;
      color: white;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover:not(:disabled) {
        background: @secondary-color;
        transform: translateY(-2px);
      }

      &:disabled {
        background: #ccc;
        cursor: not-allowed;
      }

      &.prev {
        background: #666;

        &:hover:not(:disabled) {
          background: #555;
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .app-header h1 {
    font-size: 1.8rem;
  }

  .steps-nav {
    gap: 10px;

    .step-btn {
      padding: 10px 20px;
      font-size: 0.9rem;
    }
  }

  .content-area {
    padding: 20px;
  }

  .control-panel {
    flex-direction: column;
    align-items: stretch;

    .nav-buttons {
      justify-content: space-between;
    }
  }
}
</style>
