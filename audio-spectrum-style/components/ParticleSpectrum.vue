<template>
  <div class="particle-spectrum">
    <canvas ref="canvasRef" class="particle-canvas"></canvas>
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

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  life: number
  maxLife: number
  color: string
}

const particles: Particle[] = []
const maxParticles = 200

const createParticle = (width: number, height: number, intensity: number): Particle => {
  const centerX = width / 2
  const centerY = height / 2
  const angle = Math.random() * Math.PI * 2
  const speed = 1 + intensity * 5

  const gradient = ctx!.createLinearGradient(0, 0, width, height)
  gradient.addColorStop(0, props.colorStart)
  gradient.addColorStop(1, props.colorEnd)

  return {
    x: centerX + (Math.random() - 0.5) * 50,
    y: centerY + (Math.random() - 0.5) * 50,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    size: 2 + Math.random() * 4 * intensity,
    life: 1,
    maxLife: 60 + Math.random() * 60,
    color: Math.random() > 0.5 ? props.colorStart : props.colorEnd
  }
}

const drawParticles = () => {
  if (!canvasRef.value || !ctx) return

  const canvas = canvasRef.value
  const width = canvas.width
  const height = canvas.height

  if (width === 0 || height === 0) {
    animationId = requestAnimationFrame(drawParticles)
    return
  }

  ctx.clearRect(0, 0, width, height)

  const data = props.frequencyData
  const avgVolume = data.length > 0 ? data.reduce((a, b) => a + b, 0) / data.length : 0
  const intensity = (avgVolume / 255) * props.sensitivity

  const emitCount = Math.floor(intensity * 5)
  for (let i = 0; i < emitCount && particles.length < maxParticles; i++) {
    particles.push(createParticle(width, height, intensity))
  }

  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i]

    p.x += p.vx * (1 + intensity * 0.5)
    p.y += p.vy * (1 + intensity * 0.5)
    p.life -= 1 / p.maxLife

    if (p.life <= 0 || p.x < 0 || p.x > width || p.y < 0 || p.y > height) {
      particles.splice(i, 1)
      continue
    }

    const alpha = Math.floor(p.life * 255).toString(16).padStart(2, '0')
    const size = p.size * p.life

    ctx.beginPath()
    ctx.arc(p.x, p.y, size * 2, 0, Math.PI * 2)
    ctx.fillStyle = p.color + Math.floor(p.life * 60).toString(16).padStart(2, '0')
    ctx.fill()

    ctx.beginPath()
    ctx.arc(p.x, p.y, size, 0, Math.PI * 2)
    ctx.fillStyle = p.color + alpha
    ctx.shadowBlur = 20
    ctx.shadowColor = p.color
    ctx.fill()
    ctx.shadowBlur = 0
  }

  animationId = requestAnimationFrame(drawParticles)
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
    drawParticles()
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
.particle-spectrum {
  width: 100%;
  height: 100%;

  .particle-canvas {
    width: 100%;
    height: 100%;
  }
}
</style>
