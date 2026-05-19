<template>
  <div class="step-container">
    <div class="step-header">
      <h2>🎯 第三步：瞄准</h2>
      <p class="step-desc">稳定姿势，精确瞄准目标，准备撒放</p>
    </div>

    <div class="step-content">
      <div class="svg-container">
        <svg viewBox="0 0 500 400" class="posture-svg">
          <defs>
            <linearGradient id="skinGradient3" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#FFE4C4;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#DEB887;stop-opacity:1" />
            </linearGradient>
          </defs>

          <g class="target">
            <circle cx="450" cy="170" r="50" fill="white" stroke="#333" stroke-width="2" />
            <circle cx="450" cy="170" r="40" fill="#FF6347" stroke="#333" stroke-width="1" />
            <circle cx="450" cy="170" r="30" fill="white" stroke="#333" stroke-width="1" />
            <circle cx="450" cy="170" r="20" fill="#FF6347" stroke="#333" stroke-width="1" />
            <circle cx="450" cy="170" r="10" fill="#FFD700" stroke="#333" stroke-width="1" />
            <text x="445" y="175" font-size="12" fill="#333" font-weight="bold">10</text>
          </g>

          <g class="archer">
            <ellipse cx="150" cy="80" rx="30" ry="35" fill="url(#skinGradient3)" />
            <line x1="150" y1="115" x2="150" y2="250" stroke="#8B4513" stroke-width="8" stroke-linecap="round" />
            <line x1="150" y1="140" x2="280" y2="170" stroke="#8B4513" stroke-width="8" stroke-linecap="round" />
            <line x1="150" y1="140" x2="70" y2="170" stroke="#8B4513" stroke-width="8" stroke-linecap="round" />
            <line x1="150" y1="250" x2="120" y2="350" stroke="#4A4A4A" stroke-width="10" stroke-linecap="round" />
            <line x1="150" y1="250" x2="180" y2="350" stroke="#4A4A4A" stroke-width="10" stroke-linecap="round" />
            <circle cx="150" cy="70" r="8" fill="#333" />
            <line x1="160" y1="70" x2="450" y2="170" stroke="#4169E1" stroke-width="1" stroke-dasharray="8,4" opacity="0.6" />
          </g>

          <g class="bow">
            <path d="M 280 80 Q 380 170 280 260" stroke="#8B4513" stroke-width="6" fill="none" stroke-linecap="round" />
            <line x1="280" y1="80" x2="90" y2="170" stroke="#D2B48C" stroke-width="3" />
            <line x1="90" y1="170" x2="280" y2="260" stroke="#D2B48C" stroke-width="3" />
          </g>

          <g class="arrow">
            <line x1="90" y1="170" x2="280" y2="170" stroke="#8B4513" stroke-width="3" />
            <polygon points="280,170 270,165 270,175" fill="#C0C0C0" />
            <polygon points="90,165 80,160 80,180 90,175" fill="#FF6347" />
            <line x1="85" y1="162" x2="80" y2="158" stroke="#FF6347" stroke-width="2" />
            <line x1="85" y1="178" x2="80" y2="182" stroke="#FF6347" stroke-width="2" />
          </g>

          <g class="guide-lines" v-if="showGuide">
            <line x1="150" y1="50" x2="150" y2="350" stroke="#228B22" stroke-width="2" stroke-dasharray="10,5" opacity="0.8" />
            <line x1="80" y1="170" x2="480" y2="170" stroke="#228B22" stroke-width="2" stroke-dasharray="10,5" opacity="0.8" />
            <line x1="150" y1="140" x2="70" y2="170" stroke="#FF6347" stroke-width="2" stroke-dasharray="5,5" opacity="0.6" />
            <line x1="150" y1="140" x2="280" y2="170" stroke="#4169E1" stroke-width="2" stroke-dasharray="5,5" opacity="0.6" />
            <line x1="70" y1="90" x2="300" y2="90" stroke="#FFD700" stroke-width="2" stroke-dasharray="5,5" opacity="0.6" />
            <circle cx="160" cy="70" r="15" fill="none" stroke="#9932CC" stroke-width="2" stroke-dasharray="5,3" opacity="0.7" />
            <text x="160" y="60" fill="#228B22" font-size="14" font-weight="bold">脊柱垂直</text>
            <text x="300" y="160" fill="#228B22" font-size="12" font-weight="bold">瞄准线水平</text>
            <text x="20" y="120" fill="#FF6347" font-size="12">拉臂90°</text>
            <text x="290" y="130" fill="#4169E1" font-size="12">推臂</text>
            <text x="70" y="80" fill="#FFD700" font-size="12">肩膀水平</text>
            <text x="170" y="50" fill="#9932CC" font-size="12">主眼瞄准</text>
          </g>
        </svg>
      </div>

      <div class="instructions">
        <div class="key-points">
          <h3>动作要点</h3>
          <ul>
            <li><span class="check">✓</span> 保持拉弓姿势不变，肌肉持续用力</li>
            <li><span class="check">✓</span> 主眼通过弓弦、箭杆瞄准靶心</li>
            <li><span class="check">✓</span> 保持呼吸平稳，避免晃动</li>
            <li><span class="check">✓</span> 确认姿势正确后再撒放</li>
            <li><span class="check">✓</span> 撒放后保持姿势跟随动作</li>
          </ul>
        </div>

        <div class="common-mistakes">
          <h3>常见错误</h3>
          <ul>
            <li><span class="cross">✗</span> 瞄准时身体晃动或低头</li>
            <li><span class="cross">✗</span> 用力不均导致弓弦偏移</li>
            <li><span class="cross">✗</span> 撒放时手抖或提前松手</li>
            <li><span class="cross">✗</span> 呼吸急促影响稳定性</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StepAim',
  props: {
    showGuide: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="less" scoped>
@primary-color: #8B4513;
@success-color: #228B22;
@error-color: #FF6347;

.step-container {
  width: 100%;
}

.step-header {
  text-align: center;
  margin-bottom: 30px;

  h2 {
    font-size: 2rem;
    color: @primary-color;
    margin-bottom: 10px;
  }

  .step-desc {
    font-size: 1.1rem;
    color: #666;
  }
}

.step-content {
  display: flex;
  gap: 40px;
  align-items: flex-start;

  @media (max-width: 900px) {
    flex-direction: column;
  }
}

.svg-container {
  flex: 1;
  background: linear-gradient(135deg, #F5F5DC 0%, #FAEBD7 100%);
  border-radius: 12px;
  padding: 20px;
  box-shadow: inset 0 2px 10px rgba(0, 0, 0, 0.05);
}

.posture-svg {
  width: 100%;
  height: auto;
  max-height: 400px;
}

.instructions {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.key-points, .common-mistakes {
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);

  h3 {
    color: @primary-color;
    margin-bottom: 15px;
    font-size: 1.2rem;
    padding-bottom: 10px;
    border-bottom: 2px solid #eee;
  }

  ul {
    list-style: none;

    li {
      padding: 8px 0;
      font-size: 0.95rem;
      display: flex;
      align-items: center;
      gap: 10px;

      .check {
        color: @success-color;
        font-weight: bold;
        font-size: 1.2rem;
      }

      .cross {
        color: @error-color;
        font-weight: bold;
        font-size: 1.2rem;
      }
    }
  }
}

.common-mistakes {
  h3 {
    color: @error-color;
  }
}
</style>
