<template>
  <div class="piano-keyboard">
    <div class="white-keys">
      <div
        v-for="(note, index) in whiteKeys"
        :key="'white-' + index"
        class="white-key"
        :class="{ active: activeNotes.includes(note.name), playing: currentPlayingIndex === index }"
        :style="{ '--note-color': note.color, borderColor: note.color }"
        @click="$emit('noteClick', note)"
      >
        <span class="note-name">{{ note.name }}</span>
        <span class="note-degree" v-if="note.degree !== null">{{ note.degree }}</span>
      </div>
    </div>
    <div class="black-keys">
      <div
        v-for="(note, index) in blackKeys"
        :key="'black-' + index"
        class="black-key"
        :class="{ active: activeNotes.includes(note.name) }"
        :style="{ '--note-color': note.color, left: note.position + '%' }"
        @click="$emit('noteClick', note)"
      >
        <span class="note-name">{{ note.name }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { NOTE_NAMES, NOTE_COLORS, getNoteFrequency } from '~/composables/useMusicTheory'

interface Props {
  activeNotes: string[]
  currentPlayingIndex: number
}

const props = defineProps<Props>()

defineEmits(['noteClick'])

const whiteKeyPositions = [0, 2, 4, 5, 7, 9, 11]
const blackKeyPositions = [
  { note: 1, pos: 9.5 },
  { note: 3, pos: 23.8 },
  { note: 6, pos: 52.4 },
  { note: 8, pos: 66.7 },
  { note: 10, pos: 81 }
]

const whiteKeys = computed(() => {
  return whiteKeyPositions.map((noteIndex, i) => ({
    name: NOTE_NAMES[noteIndex],
    color: NOTE_COLORS[NOTE_NAMES[noteIndex]],
    frequency: getNoteFrequency(noteIndex, 4),
    index: i,
    degree: props.activeNotes.includes(NOTE_NAMES[noteIndex]) 
      ? props.activeNotes.indexOf(NOTE_NAMES[noteIndex]) + 1 
      : null
  }))
})

const blackKeys = computed(() => {
  return blackKeyPositions.map((item, i) => ({
    name: NOTE_NAMES[item.note],
    color: NOTE_COLORS[NOTE_NAMES[item.note]],
    frequency: getNoteFrequency(item.note, 4),
    position: item.pos,
    index: -1
  }))
})
</script>

<style lang="scss" scoped>
.piano-keyboard {
  position: relative;
  width: 100%;
  max-width: 700px;
  height: 200px;
  margin: 0 auto;
  user-select: none;
}

.white-keys {
  display: flex;
  width: 100%;
  height: 100%;
}

.white-key {
  flex: 1;
  background: linear-gradient(180deg, #f8fafc 0%, #e2e8f0 100%);
  border: 2px solid $dark-border;
  border-bottom-width: 6px;
  border-radius: 0 0 8px 8px;
  margin: 0 2px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  padding-bottom: 16px;
  transition: all $transition-fast;

  &:first-child {
    margin-left: 0;
  }

  &:last-child {
    margin-right: 0;
  }

  &:hover {
    background: linear-gradient(180deg, #ffffff 0%, #f1f5f9 100%);
  }

  &.active {
    background: linear-gradient(180deg, rgba(99, 102, 241, 0.2) 0%, rgba(139, 92, 246, 0.2) 100%);
    border-color: var(--note-color, $primary-color);
  }

  &.playing {
    transform: translateY(4px);
    border-bottom-width: 2px;
    background: linear-gradient(180deg, rgba(99, 102, 241, 0.4) 0%, rgba(139, 92, 246, 0.4) 100%);
  }

  .note-name {
    font-size: 14px;
    font-weight: 600;
    color: $light-text;
  }

  .note-degree {
    font-size: 12px;
    font-weight: 700;
    color: $primary-color;
    margin-top: 4px;
  }
}

.black-keys {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 120px;
  pointer-events: none;
}

.black-key {
  position: absolute;
  width: 8%;
  height: 100%;
  background: linear-gradient(180deg, #334155 0%, #1e293b 100%);
  border-radius: 0 0 6px 6px;
  cursor: pointer;
  pointer-events: auto;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 12px;
  transition: all $transition-fast;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);

  &:hover {
    background: linear-gradient(180deg, #475569 0%, #334155 100%);
  }

  &.active {
    box-shadow: 0 0 20px var(--note-color, $primary-color);
  }

  &.playing {
    transform: translateY(4px);
    box-shadow: 0 0 30px var(--note-color, $primary-color);
  }

  .note-name {
    font-size: 11px;
    font-weight: 600;
    color: white;
  }
}
</style>
