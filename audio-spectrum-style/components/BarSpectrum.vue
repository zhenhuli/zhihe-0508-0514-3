<template>
  <div class="bar-spectrum">
    <div
      v-for="(value, index) in displayData"
      :key="index"
      class="bar"
      :style="{
        height: `${value}%`,
        background: `linear-gradient(to top, ${colorStart}, ${colorEnd})`,
        boxShadow: `0 0 10px ${colorEnd}40`
      }"
    />
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

const displayData = ref<number[]>([])
let animationId: number | null = null

const smoothData = (data: number[], sensitivity: number): number[] => {
  const barCount = 64
  const step = Math.max(1, Math.floor(data.length / barCount))
  const result: number[] = []

  for (let i = 0; i < barCount; i++) {
    let sum = 0
    for (let j = 0; j < step; j++) {
      sum += data[i * step + j] || 0
    }
    const avg = sum / step
    const normalized = (avg / 255) * 100 * sensitivity
    result.push(Math.min(Math.max(normalized, 2), 100))
  }

  return result
}

const animate = () => {
  displayData.value = smoothData(props.frequencyData, props.sensitivity)
  animationId = requestAnimationFrame(animate)
}

onMounted(() => {
  animate()
})

onUnmounted(() => {
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
})
</script>

<style lang="scss" scoped>
.bar-spectrum {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: 3px;
  width: 100%;
  height: 100%;
  padding: 20px;

  .bar {
    flex: 1;
    min-width: 2px;
    max-width: 20px;
    border-radius: 4px 4px 0 0;
    transition: height 0.05s ease-out;
  }
}
</style>
