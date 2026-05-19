<template>
  <div class="app-container">
    <div class="no-print">
      <el-container>
        <el-header class="header">
          <h1>📝 试卷版式排版工具</h1>
          <div class="header-actions">
            <el-button type="primary" icon="el-icon-printer" @click="handlePrint">打印试卷</el-button>
            <el-button type="success" icon="el-icon-download" @click="handleExport">导出配置</el-button>
            <el-button type="warning" icon="el-icon-upload2" @click="handleImport">导入配置</el-button>
          </div>
        </el-header>
        
        <el-container>
          <el-aside width="400px" class="sidebar">
            <el-tabs v-model="activeTab">
              <el-tab-pane label="📄 试卷设置" name="paper">
                <el-form label-position="top">
                  <el-form-item label="试卷标题">
                    <el-input v-model="paperConfig.title" placeholder="请输入试卷标题" />
                  </el-form-item>
                  <el-form-item label="副标题/说明">
                    <el-input v-model="paperConfig.subtitle" placeholder="请输入副标题" />
                  </el-form-item>
                  <el-form-item label="考试时间">
                    <el-input v-model="paperConfig.duration" placeholder="如：120分钟" />
                  </el-form-item>
                  <el-form-item label="满分">
                    <el-input v-model="paperConfig.totalScore" placeholder="如：100分" />
                  </el-form-item>
                  <el-divider />
                  <el-form-item label="基础字号 (px)">
                    <el-slider v-model="paperConfig.fontSize" :min="10" :max="24" show-input />
                  </el-form-item>
                  <el-form-item label="标题字号 (px)">
                    <el-slider v-model="paperConfig.titleFontSize" :min="16" :max="36" show-input />
                  </el-form-item>
                  <el-divider />
                  <el-row :gutter="10">
                    <el-col :span="12">
                      <el-form-item label="上边距 (mm)">
                        <el-input-number v-model="paperConfig.marginTop" :min="5" :max="50" />
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="下边距 (mm)">
                        <el-input-number v-model="paperConfig.marginBottom" :min="5" :max="50" />
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="10">
                    <el-col :span="12">
                      <el-form-item label="左边距 (mm)">
                        <el-input-number v-model="paperConfig.marginLeft" :min="5" :max="50" />
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="右边距 (mm)">
                        <el-input-number v-model="paperConfig.marginRight" :min="5" :max="50" />
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-form-item label="行高">
                    <el-slider v-model="paperConfig.lineHeight" :min="1.2" :max="2.5" :step="0.1" show-input />
                  </el-form-item>
                </el-form>
              </el-tab-pane>
              
              <el-tab-pane label="❓ 题目管理" name="questions">
                <el-button-group style="width: 100%; margin-bottom: 15px;">
                  <el-button type="primary" icon="el-icon-plus" @click="addQuestion('choice')" style="width: 33%;">选择题</el-button>
                  <el-button type="success" icon="el-icon-plus" @click="addQuestion('blank')" style="width: 33%;">填空题</el-button>
                  <el-button type="warning" icon="el-icon-plus" @click="addQuestion('answer')" style="width: 34%;">简答题</el-button>
                </el-button-group>
                
                <div class="question-list">
                  <div v-for="(q, index) in questions" :key="q.id" class="question-card" :class="{'active': editingId === q.id}">
                    <div class="question-card-header" @click="toggleEdit(q.id)">
                      <span class="question-type-tag" :class="q.type">
                        {{ getTypeLabel(q.type) }}
                      </span>
                      <span class="question-preview">{{ getQuestionPreview(q) }}</span>
                      <div class="question-actions">
                        <el-button size="mini" type="danger" icon="el-icon-delete" @click.stop="deleteQuestion(index)">删除</el-button>
                        <el-button size="mini" icon="el-icon-top" @click.stop="moveQuestion(index, -1)" :disabled="index === 0">上移</el-button>
                        <el-button size="mini" icon="el-icon-bottom" @click.stop="moveQuestion(index, 1)" :disabled="index === questions.length - 1">下移</el-button>
                      </div>
                    </div>
                    <div v-if="editingId === q.id" class="question-card-body">
                      <el-form label-position="top">
                        <el-form-item label="题目内容">
                          <el-input type="textarea" :rows="3" v-model="q.content" placeholder="请输入题目内容" />
                        </el-form-item>
                        <el-form-item label="分值">
                          <el-input-number v-model="q.score" :min="1" :max="100" />
                        </el-form-item>
                        
                        <template v-if="q.type === 'choice'">
                          <el-form-item label="选项">
                            <div v-for="(opt, optIndex) in q.options" :key="optIndex" class="option-item">
                              <span>{{ String.fromCharCode(65 + optIndex) }}.</span>
                              <el-input v-model="q.options[optIndex]" placeholder="选项内容" />
                              <el-button size="mini" type="danger" icon="el-icon-close" @click="removeOption(q, optIndex)" />
                            </div>
                            <el-button size="small" icon="el-icon-plus" @click="addOption(q)" style="margin-top: 5px;">添加选项</el-button>
                          </el-form-item>
                        </template>
                        
                        <template v-if="q.type === 'blank'">
                          <el-form-item label="填空数量">
                            <el-input-number v-model="q.blankCount" :min="1" :max="10" />
                          </el-form-item>
                          <el-form-item label="每题留空行数">
                            <el-input-number v-model="q.blankLines" :min="1" :max="5" />
                          </el-form-item>
                        </template>
                        
                        <template v-if="q.type === 'answer'">
                          <el-form-item label="答题区域高度 (行)">
                            <el-input-number v-model="q.answerLines" :min="3" :max="20" />
                          </el-form-item>
                        </template>
                      </el-form>
                    </div>
                  </div>
                </div>
                
                <el-empty v-if="questions.length === 0" description="暂无题目，请点击上方按钮添加" />
              </el-tab-pane>
            </el-tabs>
          </el-aside>
          
          <el-main class="preview-area">
            <div class="preview-toolbar">
              <span>📄 试卷预览</span>
              <el-button-group>
                <el-button size="small" :type="previewScale === 0.5 ? 'primary' : ''" @click="previewScale = 0.5">50%</el-button>
                <el-button size="small" :type="previewScale === 0.75 ? 'primary' : ''" @click="previewScale = 0.75">75%</el-button>
                <el-button size="small" :type="previewScale === 1 ? 'primary' : ''" @click="previewScale = 1">100%</el-button>
              </el-button-group>
            </div>
            <div class="preview-scroll">
              <div class="print-area">
                <div 
                  class="paper-container" 
                  :style="{
                    padding: `${paperConfig.marginTop}mm ${paperConfig.marginRight}mm ${paperConfig.marginBottom}mm ${paperConfig.marginLeft}mm`,
                    fontSize: `${paperConfig.fontSize}px`,
                    lineHeight: paperConfig.lineHeight,
                    transform: `scale(${previewScale})`,
                    transformOrigin: 'top center'
                  }"
                >
                  <div class="paper-content">
                    <div class="paper-title" :style="{ fontSize: `${paperConfig.titleFontSize}px` }">
                      {{ paperConfig.title }}
                    </div>
                    <div class="paper-subtitle">
                      {{ paperConfig.subtitle }}
                    </div>
                    <div class="paper-info">
                      <span>考试时间：{{ paperConfig.duration }}</span>
                      <span>满分：{{ paperConfig.totalScore }}</span>
                    </div>
                    
                    <div v-if="choiceQuestions.length > 0" class="question-section">
                      <div class="section-title">一、选择题（共{{ choiceQuestions.length }}题，每题{{ choiceQuestions[0]?.score || 0 }}分，共{{ choiceTotal }}分）</div>
                      <div v-for="(q, index) in choiceQuestions" :key="q.id" class="question-item">
                        <span class="question-number">{{ index + 1 }}.</span>
                        <span v-html="formatContent(q.content)"></span>
                        <span class="question-score">（{{ q.score }}分）</span>
                        <ul class="options-list">
                          <li v-for="(opt, optIndex) in q.options" :key="optIndex">
                            {{ String.fromCharCode(65 + optIndex) }}. {{ opt }}
                          </li>
                        </ul>
                      </div>
                    </div>
                    
                    <div v-if="blankQuestions.length > 0" class="question-section">
                      <div class="section-title">二、填空题（共{{ blankQuestions.length }}题，每题{{ blankQuestions[0]?.score || 0 }}分，共{{ blankTotal }}分）</div>
                      <div v-for="(q, index) in blankQuestions" :key="q.id" class="question-item">
                        <span class="question-number">{{ index + 1 }}.</span>
                        <span v-html="formatBlankContent(q.content, q.blankCount, q.blankLines)"></span>
                        <span class="question-score">（{{ q.score }}分）</span>
                      </div>
                    </div>
                    
                    <div v-if="answerQuestions.length > 0" class="question-section">
                      <div class="section-title">三、简答题（共{{ answerQuestions.length }}题，共{{ answerTotal }}分）</div>
                      <div v-for="(q, index) in answerQuestions" :key="q.id" class="question-item">
                        <span class="question-number">{{ index + 1 }}.</span>
                        <span v-html="formatContent(q.content)"></span>
                        <span class="question-score">（{{ q.score }}分）</span>
                        <div class="answer-area" :style="{ minHeight: `${q.answerLines * 1.5}em` }">
                          <div class="answer-hint">答题区域</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </el-main>
        </el-container>
      </el-container>
    </div>
    
    <input type="file" ref="importFile" style="display: none" @change="importConfig" accept=".json" />
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      activeTab: 'paper',
      editingId: null,
      previewScale: 0.75,
      paperConfig: {
        title: '2024年春季学期期末考试试卷',
        subtitle: '科目：高等数学  适用年级：大二  考试形式：闭卷',
        duration: '120分钟',
        totalScore: '100分',
        fontSize: 14,
        titleFontSize: 22,
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 25,
        marginRight: 25,
        lineHeight: 1.8
      },
      questions: [
        {
          id: 1,
          type: 'choice',
          content: '下列函数中，哪个是偶函数？',
          score: 5,
          options: ['f(x) = x^2', 'f(x) = x^3', 'f(x) = x', 'f(x) = 1/x']
        },
        {
          id: 2,
          type: 'choice',
          content: 'lim(x→0) sinx/x 的值是？',
          score: 5,
          options: ['0', '1', '∞', '不存在']
        },
        {
          id: 3,
          type: 'blank',
          content: '函数 f(x) = x^3 在 x = 2 处的导数值为 _____',
          score: 5,
          blankCount: 1,
          blankLines: 1
        },
        {
          id: 4,
          type: 'blank',
          content: '∫x^2 dx = _____ + C',
          score: 5,
          blankCount: 1,
          blankLines: 1
        },
        {
          id: 5,
          type: 'answer',
          content: '求函数 f(x) = x^3 - 3x^2 + 2 在区间 [0, 3] 上的最大值和最小值。',
          score: 15,
          answerLines: 8
        }
      ]
    }
  },
  computed: {
    choiceQuestions() {
      return this.questions.filter(q => q.type === 'choice')
    },
    blankQuestions() {
      return this.questions.filter(q => q.type === 'blank')
    },
    answerQuestions() {
      return this.questions.filter(q => q.type === 'answer')
    },
    choiceTotal() {
      return this.choiceQuestions.reduce((sum, q) => sum + q.score, 0)
    },
    blankTotal() {
      return this.blankQuestions.reduce((sum, q) => sum + q.score, 0)
    },
    answerTotal() {
      return this.answerQuestions.reduce((sum, q) => sum + q.score, 0)
    }
  },
  methods: {
    getTypeLabel(type) {
      const labels = { choice: '选择题', blank: '填空题', answer: '简答题' }
      return labels[type] || type
    },
    getQuestionPreview(q) {
      const preview = q.content.length > 30 ? q.content.substring(0, 30) + '...' : q.content
      return preview || '（空题目）'
    },
    toggleEdit(id) {
      this.editingId = this.editingId === id ? null : id
    },
    addQuestion(type) {
      const newId = Date.now()
      const newQuestion = {
        id: newId,
        type: type,
        content: '',
        score: 5
      }
      if (type === 'choice') {
        newQuestion.options = ['', '', '', '']
      } else if (type === 'blank') {
        newQuestion.blankCount = 1
        newQuestion.blankLines = 1
      } else if (type === 'answer') {
        newQuestion.answerLines = 5
      }
      this.questions.push(newQuestion)
      this.editingId = newId
    },
    deleteQuestion(index) {
      this.$confirm('确定要删除这道题吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.questions.splice(index, 1)
        this.$message.success('删除成功')
      }).catch(() => {})
    },
    moveQuestion(index, direction) {
      const newIndex = index + direction
      if (newIndex < 0 || newIndex >= this.questions.length) return
      const temp = this.questions[index]
      this.$set(this.questions, index, this.questions[newIndex])
      this.$set(this.questions, newIndex, temp)
    },
    addOption(question) {
      if (question.options.length < 8) {
        question.options.push('')
      }
    },
    removeOption(question, index) {
      if (question.options.length > 2) {
        question.options.splice(index, 1)
      } else {
        this.$message.warning('至少保留2个选项')
      }
    },
    formatContent(content) {
      return content.replace(/\n/g, '<br/>')
    },
    formatBlankContent(content, count, lines) {
      let result = content
      const underline = '<span class="blank-underline"></span>'
      const blankStr = underline.repeat(count)
      result = result.replace(/_+/g, blankStr)
      if (!result.includes(underline)) {
        result += ' ' + blankStr
      }
      if (lines > 1) {
        result += '<br/>'.repeat(lines)
      }
      return result
    },
    handlePrint() {
      window.print()
    },
    handleExport() {
      const data = {
        paperConfig: this.paperConfig,
        questions: this.questions
      }
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${this.paperConfig.title || '试卷配置'}.json`
      a.click()
      URL.revokeObjectURL(url)
      this.$message.success('导出成功')
    },
    handleImport() {
      this.$refs.importFile.click()
    },
    importConfig(event) {
      const file = event.target.files[0]
      if (!file) return
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result)
          if (data.paperConfig) this.paperConfig = data.paperConfig
          if (data.questions) this.questions = data.questions
          this.$message.success('导入成功')
        } catch (err) {
          this.$message.error('文件格式错误')
        }
      }
      reader.readAsText(file)
      event.target.value = ''
    }
  }
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Microsoft YaHei", sans-serif;
  background: #f0f2f5;
}

.app-container {
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.el-container {
  height: 100vh;
}

.header {
  background: #fff;
  border-bottom: 1px solid #e8e8e8;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  
  h1 {
    font-size: 20px;
    margin: 0;
    color: #303133;
  }
}

.sidebar {
  background: #fff;
  border-right: 1px solid #e8e8e8;
  overflow-y: auto;
  padding: 15px;
  height: calc(100vh - 60px);
  box-sizing: border-box;
}

.sidebar >>> .el-tabs__content {
  overflow-y: auto;
  max-height: calc(100vh - 120px);
}

.preview-area {
  background: #f0f2f5;
  padding: 0;
  display: flex;
  flex-direction: column;
}

.preview-toolbar {
  background: #fff;
  padding: 10px 20px;
  border-bottom: 1px solid #e8e8e8;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.preview-scroll {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  display: flex;
  justify-content: center;
}

.question-list {
  margin-top: 10px;
}

.question-card {
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  margin-bottom: 10px;
  overflow: hidden;
  
  &.active {
    border-color: #409eff;
  }
  
  &-header {
    padding: 10px;
    background: #f5f7fa;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 10px;
    
    &:hover {
      background: #ecf5ff;
    }
  }
  
  &-body {
    padding: 15px;
    border-top: 1px solid #e4e7ed;
  }
}

.question-type-tag {
  padding: 2px 8px;
  border-radius: 3px;
  font-size: 12px;
  color: #fff;
  flex-shrink: 0;
  
  &.choice {
    background: #409eff;
  }
  
  &.blank {
    background: #67c23a;
  }
  
  &.answer {
    background: #e6a23c;
  }
}

.question-preview {
  flex: 1;
  color: #606266;
  font-size: 13px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.question-actions {
  flex-shrink: 0;
  display: flex;
  gap: 5px;
}

.question-score {
  color: #909399;
  margin-left: 5px;
}

.option-item {
  display: flex;
  align-items: center;
  gap: 5px;
  margin-bottom: 5px;
  
  span {
    flex-shrink: 0;
    width: 20px;
  }
  
  .el-input {
    flex: 1;
  }
}

.answer-hint {
  color: #c0c4cc;
  text-align: center;
  font-size: 0.85em;
  padding-top: 10px;
}

.question-section {
  counter-reset: question;
}

@media print {
  .no-print {
    display: none !important;
  }
  
  .preview-scroll {
    padding: 0;
    overflow: visible;
  }
}
</style>
