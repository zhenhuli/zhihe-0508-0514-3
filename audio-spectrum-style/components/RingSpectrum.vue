<template>
  <div class="ring-spectrum">
    <canvas ref="canvasRef" class="ring-canvas"></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps<{
  frequencyData: number[]
  sensitivity: number
  colorStart: string
  colorEnd: string
}>()

const canvasRef = ref<HTMLCanvasElement | null>(null)
let animationId: number | null = null
let ctx: CanvasRenderingContext2D | null = null

const drawRing = () => {
  if (!canvasRef.value || !ctx) return

  const canvas = canvasRef.value
  const width = canvas.width
  const height = canvas.height

  if (width === 0 || height === 0) {
    animationId = requestAnimationFrame(drawRing)
    return
  }

  const centerX = width / 2
  const centerY = height / 2
  const baseRadius = Math.min(width, height) * 0.25

  ctx.clearRect(0, 0, width, height)

  const data = props.frequencyData
  const barCount = 180
  const step = Math.max(1, Math.floor(data.length / barCount))

  for (let i = 0; i < barCount; i++) {
    let sum = 0
    for (let j = 0; j < step; j++) {
      sum += data[i * step + j] || 0
    }
    const avg = sum / step
    const normalized = (avg / 255) * props.sensitivity
    const barLength = normalized * 120 + 10

    const angle = (i / barCount) * Math.PI * 2 - Math.PI / 2
    const innerX = centerX + Math.cos(angle) * baseRadius
    const innerY = centerY + Math.sin(angle) * baseRadius
    const outerX = centerX + Math.cos(angle) * (baseRadius + barLength)
    const outerY = centerY + Math.sin(angle) * (baseRadius + barLength)

    const gradient = ctx.createLinearGradient(innerX, innerY, outerX, outerY)
    gradient.addColorStop(0, props.colorStart)
    gradient.addColorStop(1, props.colorEnd)

    ctx.beginPath()
    ctx.moveTo(innerX, innerY)
    ctx.lineTo(outerX, outerY)
    ctx.strokeStyle = gradient
    ctx.lineWidth = 3
    ctx.lineCap = 'round'
    ctx.shadowBlur = 10
    ctx.shadowColor = props.colorEnd
    ctx.stroke()
  }

  const innerGlow = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, baseRadius)
  innerGlow.addColorStop(0, props.colorStart + '60')
  innerGlow.addColorStop(1, props.colorEnd + '20')
  ctx.beginPath()
  ctx.arc(centerX, centerY, baseRadius - 5, 0, Math.PI * 2)
  ctx.fillStyle = innerGlow
  ctx.fill()

  ctx.beginPath()
  ctx.arc(centerX, centerY, baseRadius - 5, 0, Math.PI * 2)
  ctx.strokeStyle = props.colorEnd + '80'
  ctx.lineWidth = 2
  ctx.stroke()

  animationId = requestAnimationFrame(drawRing)
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
    drawRing()
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
.ring-spectrum {
  width: 100%;
  height: 100%;

  .ring-canvas {
    width: 100%;
    height: 100%;
  }
}
</style>
