<template>
  <div class="scale-display">
    <div class="scale-notes">
      <div
        v-for="(note, index) in notes"
        :key="index"
        class="note-bubble"
        :class="{ playing: currentPlayingIndex === index }"
        :style="{ backgroundColor: note.color }"
      >
        <span class="note-name">{{ note.name }}</span>
        <span class="note-degree">{{ index + 1 }}</span>
      </div>
    </div>
    <div class="intervals">
      <div class="interval-line" v-for="(_, index) in notes.length - 1" :key="index">
        <span class="interval-value">{{ intervals[index] }}</span>
        <span class="interval-name">{{ intervalNames[index] }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Note } from '~/composables/useMusicTheory'
import { getIntervalName } from '~/composables/useMusicTheory'

interface Props {
  notes: Note[]
  intervals: number[]
  currentPlayingIndex: number
}

const props = defineProps<Props>()

const intervalNames = computed(() => {
  return props.intervals.map(semitones => getIntervalName(semitones))
})
</script>

<style lang="scss" scoped>
.scale-display {
  padding: 24px 0;
}

.scale-notes {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

.note-bubble {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  color: white;
  font-weight: 700;
  transition: all $transition-normal;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);

  &:hover {
    transform: scale(1.1);
  }

  &.playing {
    transform: scale(1.2);
    box-shadow: 0 0 30px currentColor;
    animation: pulse 0.4s ease;
  }

  .note-name {
    font-size: 18px;
  }

  .note-degree {
    font-size: 12px;
    opacity: 0.8;
  }
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1.2);
  }
  50% {
    transform: scale(1.3);
  }
}

.intervals {
  display: flex;
  justify-content: center;
  margin-top: 16px;
  padding: 0 35px;
}

.interval-line {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 86px;
  padding: 8px 0;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    height: 2px;
    background: $dark-border;
  }

  .interval-value {
    font-size: 14px;
    font-weight: 700;
    color: $primary-color;
    margin-top: 8px;
  }

  .interval-name {
    font-size: 11px;
    color: $dark-text-muted;
    margin-top: 2px;
  }
}
</style>
