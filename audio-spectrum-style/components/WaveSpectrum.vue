<template>
  <div class="wave-spectrum">
    <canvas ref="canvasRef" class="wave-canvas"></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'

const props = defineProps<{
  frequencyData: number[]
  sensitivity: number
  colorStart: string
  colorEnd: string
}>()

const canvasRef = ref<HTMLCanvasElement | null>(null)
let animationId: number | null = null
let ctx: CanvasRenderingContext2D | null = null

const drawWave = () => {
  if (!canvasRef.value || !ctx) return

  const canvas = canvasRef.value
  const width = canvas.width
  const height = canvas.height

  if (width === 0 || height === 0) {
    animationId = requestAnimationFrame(drawWave)
    return
  }

  ctx.clearRect(0, 0, width, height)

  const gradient = ctx.createLinearGradient(0, 0, width, 0)
  gradient.addColorStop(0, props.colorStart)
  gradient.addColorStop(1, props.colorEnd)

  ctx.strokeStyle = gradient
  ctx.lineWidth = 3
  ctx.shadowBlur = 15
  ctx.shadowColor = props.colorEnd

  const data = props.frequencyData
  const barCount = 128
  const step = Math.max(1, Math.floor(data.length / barCount))

  ctx.beginPath()

  for (let i = 0; i < barCount; i++) {
    let sum = 0
    for (let j = 0; j < step; j++) {
      sum += data[i * step + j] || 0
    }
    const avg = sum / step
    const normalized = (avg / 255) * props.sensitivity
    const y = height / 2 + Math.sin(i * 0.1) * (normalized * height * 0.4)
    const x = (i / barCount) * width

    if (i === 0) {
      ctx.moveTo(x, y)
    } else {
      const prevX = ((i - 1) / barCount) * width
      let prevSum = 0
      for (let j = 0; j < step; j++) {
        prevSum += data[(i - 1) * step + j] || 0
      }
      const prevAvg = prevSum / step
      const prevNormalized = (prevAvg / 255) * props.sensitivity
      const prevY = height / 2 + Math.sin((i - 1) * 0.1) * (prevNormalized * height * 0.4)

      const cpX = (prevX + x) / 2
      ctx.quadraticCurveTo(prevX, prevY, cpX, (prevY + y) / 2)
    }
  }

  ctx.stroke()

  ctx.lineTo(width, height)
  ctx.lineTo(0, height)
  ctx.closePath()

  const fillGradient = ctx.createLinearGradient(0, 0, 0, height)
  fillGradient.addColorStop(0, props.colorEnd + '40')
  fillGradient.addColorStop(1, props.colorStart + '10')
  ctx.fillStyle = fillGradient
  ctx.fill()

  animationId = requestAnimationFrame(drawWave)
}

const resizeCanvas = () => {
  if (canvasRef.value && canvasRef.value.parentElement) {
    canvasRef.value.width = canvasRef.value.parentElement.clientWidth
    canvasRef.value.height = canvasRef.value.parentElement.clientHeight
  }
}

onMounted(() => {
  if (canvasRef.value) {
    ctx = canvasRef.value.getContext('2d')
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    drawWave()
  }
})

onUnmounted(() => {
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
  window.removeEventListener('resize', resizeCanvas)
})
</script>

<style lang="scss" scoped>
.wave-spectrum {
  width: 100%;
  height: 100%;

  .wave-canvas {
    width: 100%;
    height: 100%;
  }
}
</style>
