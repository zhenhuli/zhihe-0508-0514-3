<template>
  <div class="step-container">
    <div class="step-header">
      <h2>🏹 第一步：搭箭</h2>
      <p class="step-desc">将箭正确地放置在弓上，为后续动作做好准备</p>
    </div>

    <div class="step-content">
      <div class="svg-container">
        <svg viewBox="0 0 500 400" class="posture-svg">
          <defs>
            <linearGradient id="skinGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#FFE4C4;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#DEB887;stop-opacity:1" />
            </linearGradient>
          </defs>

          <g class="archer">
            <ellipse cx="200" cy="80" rx="30" ry="35" fill="url(#skinGradient)" />
            <line x1="200" y1="115" x2="200" y2="250" stroke="#8B4513" stroke-width="8" stroke-linecap="round" />
            <line x1="200" y1="140" x2="130" y2="200" stroke="#8B4513" stroke-width="8" stroke-linecap="round" />
            <line x1="200" y1="140" x2="300" y2="180" stroke="#8B4513" stroke-width="8" stroke-linecap="round" />
            <line x1="200" y1="250" x2="170" y2="350" stroke="#4A4A4A" stroke-width="10" stroke-linecap="round" />
            <line x1="200" y1="250" x2="230" y2="350" stroke="#4A4A4A" stroke-width="10" stroke-linecap="round" />
            <circle cx="200" cy="70" r="8" fill="#333" />
          </g>

          <g class="bow">
            <path d="M 300 100 Q 380 180 300 260" stroke="#8B4513" stroke-width="6" fill="none" stroke-linecap="round" />
            <line x1="300" y1="100" x2="300" y2="260" stroke="#D2B48C" stroke-width="2" stroke-dasharray="5,3" />
          </g>

          <g class="arrow">
            <line x1="300" y1="180" x2="420" y2="180" stroke="#8B4513" stroke-width="3" />
            <polygon points="420,180 410,175 410,185" fill="#C0C0C0" />
            <polygon points="300,175 290,170 290,190 300,185" fill="#FF6347" />
            <line x1="295" y1="172" x2="290" y2="168" stroke="#FF6347" stroke-width="2" />
            <line x1="295" y1="188" x2="290" y2="192" stroke="#FF6347" stroke-width="2" />
          </g>

          <g class="guide-lines" v-if="showGuide">
            <line x1="200" y1="50" x2="200" y2="350" stroke="#228B22" stroke-width="2" stroke-dasharray="10,5" opacity="0.8" />
            <line x1="120" y1="180" x2="430" y2="180" stroke="#228B22" stroke-width="2" stroke-dasharray="10,5" opacity="0.8" />
            <line x1="130" y1="115" x2="300" y2="180" stroke="#FF6347" stroke-width="2" stroke-dasharray="5,5" opacity="0.6" />
            <text x="210" y="60" fill="#228B22" font-size="14" font-weight="bold">脊柱垂直</text>
            <text x="350" y="170" fill="#228B22" font-size="14" font-weight="bold">箭水平</text>
            <text x="150" y="130" fill="#FF6347" font-size="12">手臂角度</text>
          </g>
        </svg>
      </div>

      <div class="instructions">
        <div class="key-points">
          <h3>动作要点</h3>
          <ul>
            <li><span class="check">✓</span> 身体站直，双脚与肩同宽</li>
            <li><span class="check">✓</span> 箭尾扣入弓弦箭口</li>
            <li><span class="check">✓</span> 箭杆置于箭台或左手持弓</li>
            <li><span class="check">✓</span> 箭羽远离身体，保持水平</li>
            <li><span class="check">✓</span> 头部正直，目视前方</li>
          </ul>
        </div>

        <div class="common-mistakes">
          <h3>常见错误</h3>
          <ul>
            <li><span class="cross">✗</span> 箭未完全扣入弓弦</li>
            <li><span class="cross">✗</span> 箭杆倾斜或下垂</li>
            <li><span class="cross">✗</span> 身体前倾或后仰</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StepNock',
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
