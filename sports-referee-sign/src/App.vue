<template>
  <div id="app">
    <el-header class="header">
      <div class="header-content">
        <h1 class="title">🏅 体育赛事裁判手势图鉴</h1>
        <p class="subtitle">图文搭配 · 动作标注 · 场景分类</p>
      </div>
    </el-header>
    <el-main class="main">
      <router-view />
    </el-main>
    <el-footer class="footer">
      <p>© 2024 体育赛事裁判手势图鉴 - 让规则更清晰</p>
    </el-footer>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body, #app {
  height: 100%;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

.header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-align: center;
  padding: 30px 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
}

.header-content .title {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 8px;
  letter-spacing: 2px;
}

.header-content .subtitle {
  font-size: 14px;
  opacity: 0.9;
  letter-spacing: 4px;
}

.main {
  background: #f5f7fa;
  min-height: calc(100vh - 200px);
  padding: 30px 50px;
}

.footer {
  background: #2c3e50;
  color: #ecf0f1;
  text-align: center;
  padding: 20px;
  font-size: 14px;
}
</style>
