export interface Note {
  name: string
  frequency: number
  color: string
}

export interface Mode {
  name: string
  chineseName: string
  intervals: number[]
  description: string
  type: 'major' | 'minor' | 'modal'
  formula: string
  characteristic: string
  usage: string
  famousWorks: string[]
}

export const NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']

export const NOTE_COLORS: Record<string, string> = {
  'C': '#ef4444',
  'C#': '#f97316',
  'D': '#f59e0b',
  'D#': '#84cc16',
  'E': '#10b981',
  'F': '#06b6d4',
  'F#': '#3b82f6',
  'G': '#6366f1',
  'G#': '#8b5cf6',
  'A': '#a855f7',
  'A#': '#d946ef',
  'B': '#ec4899'
}

export const MODES: Mode[] = [
  {
    name: 'Ionian (Major)',
    chineseName: '伊奥尼亚调式（自然大调）',
    intervals: [0, 2, 4, 5, 7, 9, 11],
    description: '明亮、开朗、积极的感觉，是西方音乐中最基础的调式',
    type: 'major',
    formula: '全全半全全全半',
    characteristic: '大三和弦主音，稳定明亮，最符合人的听觉习惯',
    usage: '流行音乐、古典音乐、儿歌、赞美诗等绝大多数音乐类型',
    famousWorks: ['贝多芬《欢乐颂》', '莫扎特《小星星变奏曲》', '生日快乐歌']
  },
  {
    name: 'Dorian',
    chineseName: '多利亚调式',
    intervals: [0, 2, 3, 5, 7, 9, 10],
    description: '爵士风格，略带忧郁但又不失活力，常用于民谣和爵士',
    type: 'modal',
    formula: '全半全全全半全',
    characteristic: '小六度是特色音程，既有小调的忧郁又有大调的明亮感',
    usage: '爵士乐、融合爵士、凯尔特民谣、摇滚抒情曲',
    famousWorks: ['So What (Miles Davis)', ' Scarborough Fair', '御法度配乐']
  },
  {
    name: 'Phrygian',
    chineseName: '弗里几亚调式',
    intervals: [0, 1, 3, 5, 7, 8, 10],
    description: '西班牙、弗拉门戈风格，带有神秘和异域风情',
    type: 'modal',
    formula: '半全全全半全全',
    characteristic: '小二度开头，极具张力和异域色彩，最具特色的中古调式之一',
    usage: '弗拉门戈、西班牙音乐、金属乐、电影悬疑配乐',
    famousWorks: ['西班牙斗牛曲', ' Metallica 作品', '波斯风格音乐']
  },
  {
    name: 'Lydian',
    chineseName: '利底亚调式',
    intervals: [0, 2, 4, 6, 7, 9, 11],
    description: '梦幻、空灵、童话般的感觉，常用于电影配乐',
    type: 'modal',
    formula: '全全全半全全半',
    characteristic: '增四度是标志性音程，梦幻飘渺，像是大调的"梦幻版"',
    usage: '电影配乐、新世纪音乐、动画配乐、梦幻场景音乐',
    famousWorks: ['辛普森一家主题曲', '天空之城插曲', '迪斯尼梦幻音乐']
  },
  {
    name: 'Mixolydian',
    chineseName: '混合利底亚调式',
    intervals: [0, 2, 4, 5, 7, 9, 10],
    description: '蓝调、摇滚风格，带有一种轻松不羁的感觉',
    type: 'modal',
    formula: '全全半全全半全',
    characteristic: '小七度是特色，带有蓝调色彩，轻松随性不严肃',
    usage: '摇滚乐、蓝调、乡村音乐、放克音乐',
    famousWorks: [' Beatles 大量作品', 'Sweet Home Alabama', '美国乡村音乐']
  },
  {
    name: 'Aeolian (Natural Minor)',
    chineseName: '爱奥尼亚调式（自然小调）',
    intervals: [0, 2, 3, 5, 7, 8, 10],
    description: '悲伤、忧郁、深沉的感觉，是小调音乐的基础',
    type: 'minor',
    formula: '全半全全半全全',
    characteristic: '小三和弦主音，情感深沉，是表达悲伤情感的基础调式',
    usage: '悲伤抒情曲、古典音乐小调作品、电影悲剧配乐',
    famousWorks: ['贝多芬《命运交响曲》', '绿袖子', '莫斯科郊外的晚上']
  },
  {
    name: 'Locrian',
    chineseName: '洛克里亚调式',
    intervals: [0, 1, 3, 5, 6, 8, 10],
    description: '不稳定、紧张、神秘的感觉，很少单独使用',
    type: 'modal',
    formula: '半全全半全全全',
    characteristic: '减五度主和弦，极其不稳定，是唯一没有纯五度的中古调式',
    usage: '实验音乐、金属乐、惊悚电影配乐、现代爵士',
    famousWorks: ['金属乐中的应用', '惊悚电影配乐', '现代无调性音乐']
  },
  {
    name: 'Harmonic Minor',
    chineseName: '和声小调',
    intervals: [0, 2, 3, 5, 7, 8, 11],
    description: '带有阿拉伯风格，七级音升高增加了导向性',
    type: 'minor',
    formula: '全半全全半增二度半',
    characteristic: '七级音升高半音，增强了到主音的倾向性，增二度过渡是特色',
    usage: '古典音乐、阿拉伯风格音乐、弗拉门戈、电影配乐',
    famousWorks: ['巴赫《平均律钢琴曲集》', '天方夜谭组曲', '西班牙古典音乐']
  },
  {
    name: 'Melodic Minor',
    chineseName: '旋律小调',
    intervals: [0, 2, 3, 5, 7, 9, 11],
    description: '上行时升高六七级，下行时还原，常用于爵士',
    type: 'minor',
    formula: '上行：全半全全全全半 / 下行：全全半全全半全',
    characteristic: '上行接近大调明亮感，下行回归小调深沉，是最灵活的小调',
    usage: '爵士乐、古典音乐旋律写作、 bebop 风格、现代爵士',
    famousWorks: ['Charlie Parker 作品', '爵士标准曲', '古典声乐作品']
  }
]

export function getNoteFrequency(noteIndex: number, octave: number = 4): number {
  const a4Frequency = 440
  const a4Index = 9
  const semitonesFromA4 = noteIndex - a4Index + (octave - 4) * 12
  return a4Frequency * Math.pow(2, semitonesFromA4 / 12)
}

export function getModeNotes(mode: Mode, rootNote: number, octave: number = 4): Note[] {
  return mode.intervals.map(interval => {
    const noteIndex = (rootNote + interval) % 12
    const noteOctave = octave + Math.floor((rootNote + interval) / 12)
    return {
      name: NOTE_NAMES[noteIndex],
      frequency: getNoteFrequency(noteIndex, noteOctave),
      color: NOTE_COLORS[NOTE_NAMES[noteIndex]]
    }
  })
}

export function getIntervalName(semitones: number): string {
  const intervalNames: Record<number, string> = {
    0: '纯一度',
    1: '小二度',
    2: '大二度',
    3: '小三度',
    4: '大三度',
    5: '纯四度',
    6: '增四度/减五度',
    7: '纯五度',
    8: '小六度',
    9: '大六度',
    10: '小七度',
    11: '大七度'
  }
  return intervalNames[semitones] || `${semitones}半音`
}
