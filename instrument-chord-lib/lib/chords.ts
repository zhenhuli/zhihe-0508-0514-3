export interface ChordFingerPosition {
  string: number;
  fret: number;
  finger?: number;
}

export interface Chord {
  id: string;
  name: string;
  category: string;
  key: string;
  suffix: string;
  positions: ChordFingerPosition[];
  barres?: { fret: number; fromString: number; toString: number }[];
  baseFret: number;
  mutedStrings?: number[];
  openStrings?: number[];
  frequencies?: number[];
}

export const chordCategories = [
  { id: 'major', name: '大三和弦', description: '明亮、欢快的和弦' },
  { id: 'minor', name: '小三和弦', description: '忧郁、柔和的和弦' },
  { id: '7th', name: '七和弦', description: '带有爵士感的和弦' },
  { id: 'maj7', name: '大七和弦', description: '丰富、圆润的和弦' },
  { id: 'm7', name: '小七和弦', description: '柔和的爵士和弦' },
  { id: 'sus', name: '挂留和弦', description: '带有悬念感的和弦' },
  { id: 'power', name: '强力和弦', description: '摇滚风格的和弦' },
];

export const keys = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

export const guitarStringFrequencies = [82.41, 110.0, 146.83, 196.0, 246.94, 329.63];

const getFrequency = (string: number, fret: number): number => {
  const baseFreq = guitarStringFrequencies[string - 1];
  return baseFreq * Math.pow(2, fret / 12);
};

const calculateFrequencies = (positions: ChordFingerPosition[], mutedStrings: number[] = [], openStrings: number[] = []): number[] => {
  const freqs: number[] = [];
  
  for (let string = 1; string <= 6; string++) {
    if (mutedStrings.includes(string)) continue;
    
    const pos = positions.find(p => p.string === string);
    if (pos) {
      freqs.push(getFrequency(string, pos.fret));
    } else if (openStrings.includes(string)) {
      freqs.push(getFrequency(string, 0));
    }
  }
  
  return freqs;
};

export const chords: Chord[] = [
  {
    id: 'c-major',
    name: 'C',
    category: 'major',
    key: 'C',
    suffix: '',
    baseFret: 1,
    positions: [
      { string: 2, fret: 1, finger: 1 },
      { string: 4, fret: 2, finger: 2 },
      { string: 5, fret: 3, finger: 3 },
    ],
    mutedStrings: [6],
    openStrings: [1, 3],
    get frequencies() { return calculateFrequencies(this.positions, this.mutedStrings, this.openStrings); },
  },
  {
    id: 'd-major',
    name: 'D',
    category: 'major',
    key: 'D',
    suffix: '',
    baseFret: 1,
    positions: [
      { string: 1, fret: 2, finger: 2 },
      { string: 2, fret: 3, finger: 3 },
      { string: 3, fret: 2, finger: 1 },
    ],
    mutedStrings: [5, 6],
    openStrings: [4],
    get frequencies() { return calculateFrequencies(this.positions, this.mutedStrings, this.openStrings); },
  },
  {
    id: 'e-major',
    name: 'E',
    category: 'major',
    key: 'E',
    suffix: '',
    baseFret: 1,
    positions: [
      { string: 3, fret: 1, finger: 1 },
      { string: 4, fret: 2, finger: 2 },
      { string: 5, fret: 2, finger: 3 },
    ],
    openStrings: [1, 2, 6],
    get frequencies() { return calculateFrequencies(this.positions, this.mutedStrings, this.openStrings); },
  },
  {
    id: 'f-major',
    name: 'F',
    category: 'major',
    key: 'F',
    suffix: '',
    baseFret: 1,
    positions: [
      { string: 3, fret: 2, finger: 3 },
      { string: 4, fret: 3, finger: 4 },
      { string: 5, fret: 3, finger: 2 },
    ],
    barres: [{ fret: 1, fromString: 1, toString: 6 }],
    get frequencies() { return calculateFrequencies(this.positions, this.mutedStrings, this.openStrings); },
  },
  {
    id: 'g-major',
    name: 'G',
    category: 'major',
    key: 'G',
    suffix: '',
    baseFret: 1,
    positions: [
      { string: 1, fret: 3, finger: 3 },
      { string: 5, fret: 2, finger: 1 },
      { string: 6, fret: 3, finger: 2 },
    ],
    openStrings: [2, 3, 4],
    get frequencies() { return calculateFrequencies(this.positions, this.mutedStrings, this.openStrings); },
  },
  {
    id: 'a-major',
    name: 'A',
    category: 'major',
    key: 'A',
    suffix: '',
    baseFret: 1,
    positions: [
      { string: 2, fret: 2, finger: 1 },
      { string: 3, fret: 2, finger: 2 },
      { string: 4, fret: 2, finger: 3 },
    ],
    mutedStrings: [6],
    openStrings: [1, 5],
    get frequencies() { return calculateFrequencies(this.positions, this.mutedStrings, this.openStrings); },
  },
  {
    id: 'b-major',
    name: 'B',
    category: 'major',
    key: 'B',
    suffix: '',
    baseFret: 2,
    positions: [
      { string: 2, fret: 4, finger: 2 },
      { string: 3, fret: 4, finger: 3 },
      { string: 4, fret: 4, finger: 4 },
    ],
    barres: [{ fret: 2, fromString: 1, toString: 5 }],
    mutedStrings: [6],
    get frequencies() { return calculateFrequencies(this.positions, this.mutedStrings, this.openStrings); },
  },
  {
    id: 'c-minor',
    name: 'Cm',
    category: 'minor',
    key: 'C',
    suffix: 'm',
    baseFret: 3,
    positions: [
      { string: 2, fret: 4, finger: 2 },
      { string: 4, fret: 5, finger: 4 },
      { string: 5, fret: 5, finger: 3 },
    ],
    barres: [{ fret: 3, fromString: 1, toString: 6 }],
    get frequencies() { return calculateFrequencies(this.positions, this.mutedStrings, this.openStrings); },
  },
  {
    id: 'd-minor',
    name: 'Dm',
    category: 'minor',
    key: 'D',
    suffix: 'm',
    baseFret: 1,
    positions: [
      { string: 1, fret: 1, finger: 1 },
      { string: 2, fret: 3, finger: 3 },
      { string: 3, fret: 2, finger: 2 },
    ],
    mutedStrings: [5, 6],
    openStrings: [4],
    get frequencies() { return calculateFrequencies(this.positions, this.mutedStrings, this.openStrings); },
  },
  {
    id: 'e-minor',
    name: 'Em',
    category: 'minor',
    key: 'E',
    suffix: 'm',
    baseFret: 1,
    positions: [
      { string: 4, fret: 2, finger: 1 },
      { string: 5, fret: 2, finger: 2 },
    ],
    openStrings: [1, 2, 3, 6],
    get frequencies() { return calculateFrequencies(this.positions, this.mutedStrings, this.openStrings); },
  },
  {
    id: 'a-minor',
    name: 'Am',
    category: 'minor',
    key: 'A',
    suffix: 'm',
    baseFret: 1,
    positions: [
      { string: 2, fret: 1, finger: 1 },
      { string: 3, fret: 2, finger: 2 },
      { string: 4, fret: 2, finger: 3 },
    ],
    mutedStrings: [6],
    openStrings: [1, 5],
    get frequencies() { return calculateFrequencies(this.positions, this.mutedStrings, this.openStrings); },
  },
  {
    id: 'g-minor',
    name: 'Gm',
    category: 'minor',
    key: 'G',
    suffix: 'm',
    baseFret: 3,
    positions: [
      { string: 2, fret: 4, finger: 2 },
      { string: 4, fret: 5, finger: 4 },
      { string: 5, fret: 5, finger: 3 },
    ],
    barres: [{ fret: 3, fromString: 1, toString: 6 }],
    get frequencies() { return calculateFrequencies(this.positions, this.mutedStrings, this.openStrings); },
  },
  {
    id: 'c-7th',
    name: 'C7',
    category: '7th',
    key: 'C',
    suffix: '7',
    baseFret: 1,
    positions: [
      { string: 2, fret: 1, finger: 1 },
      { string: 3, fret: 3, finger: 3 },
      { string: 4, fret: 2, finger: 2 },
      { string: 5, fret: 3, finger: 4 },
    ],
    mutedStrings: [6],
    openStrings: [1],
    get frequencies() { return calculateFrequencies(this.positions, this.mutedStrings, this.openStrings); },
  },
  {
    id: 'd-7th',
    name: 'D7',
    category: '7th',
    key: 'D',
    suffix: '7',
    baseFret: 1,
    positions: [
      { string: 1, fret: 2, finger: 2 },
      { string: 2, fret: 1, finger: 1 },
      { string: 3, fret: 2, finger: 3 },
    ],
    mutedStrings: [5, 6],
    openStrings: [4],
    get frequencies() { return calculateFrequencies(this.positions, this.mutedStrings, this.openStrings); },
  },
  {
    id: 'e-7th',
    name: 'E7',
    category: '7th',
    key: 'E',
    suffix: '7',
    baseFret: 1,
    positions: [
      { string: 3, fret: 1, finger: 1 },
      { string: 5, fret: 2, finger: 2 },
    ],
    openStrings: [1, 2, 4, 6],
    get frequencies() { return calculateFrequencies(this.positions, this.mutedStrings, this.openStrings); },
  },
  {
    id: 'g-7th',
    name: 'G7',
    category: '7th',
    key: 'G',
    suffix: '7',
    baseFret: 1,
    positions: [
      { string: 1, fret: 1, finger: 1 },
      { string: 5, fret: 2, finger: 2 },
      { string: 6, fret: 3, finger: 3 },
    ],
    openStrings: [2, 3, 4],
    get frequencies() { return calculateFrequencies(this.positions, this.mutedStrings, this.openStrings); },
  },
  {
    id: 'a-7th',
    name: 'A7',
    category: '7th',
    key: 'A',
    suffix: '7',
    baseFret: 1,
    positions: [
      { string: 2, fret: 2, finger: 1 },
      { string: 4, fret: 2, finger: 2 },
    ],
    mutedStrings: [6],
    openStrings: [1, 3, 5],
    get frequencies() { return calculateFrequencies(this.positions, this.mutedStrings, this.openStrings); },
  },
  {
    id: 'c-maj7',
    name: 'Cmaj7',
    category: 'maj7',
    key: 'C',
    suffix: 'maj7',
    baseFret: 1,
    positions: [
      { string: 2, fret: 1, finger: 1 },
      { string: 3, fret: 2, finger: 2 },
      { string: 4, fret: 2, finger: 3 },
      { string: 5, fret: 3, finger: 4 },
    ],
    mutedStrings: [6],
    openStrings: [1],
    get frequencies() { return calculateFrequencies(this.positions, this.mutedStrings, this.openStrings); },
  },
  {
    id: 'd-maj7',
    name: 'Dmaj7',
    category: 'maj7',
    key: 'D',
    suffix: 'maj7',
    baseFret: 1,
    positions: [
      { string: 1, fret: 2, finger: 2 },
      { string: 2, fret: 2, finger: 1 },
      { string: 3, fret: 2, finger: 3 },
    ],
    mutedStrings: [5, 6],
    openStrings: [4],
    get frequencies() { return calculateFrequencies(this.positions, this.mutedStrings, this.openStrings); },
  },
  {
    id: 'e-maj7',
    name: 'Emaj7',
    category: 'maj7',
    key: 'E',
    suffix: 'maj7',
    baseFret: 1,
    positions: [
      { string: 3, fret: 1, finger: 1 },
      { string: 4, fret: 2, finger: 2 },
      { string: 5, fret: 2, finger: 3 },
    ],
    openStrings: [1, 2, 6],
    get frequencies() { return calculateFrequencies(this.positions, this.mutedStrings, this.openStrings); },
  },
  {
    id: 'g-maj7',
    name: 'Gmaj7',
    category: 'maj7',
    key: 'G',
    suffix: 'maj7',
    baseFret: 1,
    positions: [
      { string: 2, fret: 2, finger: 1 },
      { string: 5, fret: 2, finger: 2 },
      { string: 6, fret: 3, finger: 3 },
    ],
    openStrings: [1, 3, 4],
    get frequencies() { return calculateFrequencies(this.positions, this.mutedStrings, this.openStrings); },
  },
  {
    id: 'a-maj7',
    name: 'Amaj7',
    category: 'maj7',
    key: 'A',
    suffix: 'maj7',
    baseFret: 1,
    positions: [
      { string: 3, fret: 1, finger: 1 },
      { string: 2, fret: 2, finger: 2 },
      { string: 4, fret: 2, finger: 3 },
    ],
    mutedStrings: [6],
    openStrings: [1, 5],
    get frequencies() { return calculateFrequencies(this.positions, this.mutedStrings, this.openStrings); },
  },
  {
    id: 'd-m7',
    name: 'Dm7',
    category: 'm7',
    key: 'D',
    suffix: 'm7',
    baseFret: 1,
    positions: [
      { string: 1, fret: 1, finger: 1 },
      { string: 2, fret: 1, finger: 1 },
      { string: 3, fret: 2, finger: 2 },
    ],
    mutedStrings: [5, 6],
    openStrings: [4],
    get frequencies() { return calculateFrequencies(this.positions, this.mutedStrings, this.openStrings); },
  },
  {
    id: 'e-m7',
    name: 'Em7',
    category: 'm7',
    key: 'E',
    suffix: 'm7',
    baseFret: 1,
    positions: [
      { string: 4, fret: 2, finger: 1 },
      { string: 5, fret: 2, finger: 2 },
    ],
    openStrings: [1, 2, 3, 6],
    get frequencies() { return calculateFrequencies(this.positions, this.mutedStrings, this.openStrings); },
  },
  {
    id: 'a-m7',
    name: 'Am7',
    category: 'm7',
    key: 'A',
    suffix: 'm7',
    baseFret: 1,
    positions: [
      { string: 2, fret: 1, finger: 1 },
      { string: 4, fret: 2, finger: 2 },
    ],
    mutedStrings: [6],
    openStrings: [1, 3, 5],
    get frequencies() { return calculateFrequencies(this.positions, this.mutedStrings, this.openStrings); },
  },
  {
    id: 'g-m7',
    name: 'Gm7',
    category: 'm7',
    key: 'G',
    suffix: 'm7',
    baseFret: 3,
    positions: [
      { string: 2, fret: 4, finger: 2 },
      { string: 4, fret: 5, finger: 4 },
      { string: 5, fret: 5, finger: 3 },
    ],
    barres: [{ fret: 3, fromString: 1, toString: 6 }],
    get frequencies() { return calculateFrequencies(this.positions, this.mutedStrings, this.openStrings); },
  },
  {
    id: 'c-sus2',
    name: 'Csus2',
    category: 'sus',
    key: 'C',
    suffix: 'sus2',
    baseFret: 3,
    positions: [
      { string: 2, fret: 5, finger: 3 },
      { string: 3, fret: 5, finger: 4 },
    ],
    barres: [{ fret: 3, fromString: 1, toString: 6 }],
    openStrings: [4, 5, 6],
    get frequencies() { return calculateFrequencies(this.positions, this.mutedStrings, this.openStrings); },
  },
  {
    id: 'd-sus4',
    name: 'Dsus4',
    category: 'sus',
    key: 'D',
    suffix: 'sus4',
    baseFret: 1,
    positions: [
      { string: 1, fret: 3, finger: 3 },
      { string: 2, fret: 3, finger: 4 },
      { string: 3, fret: 2, finger: 1 },
    ],
    mutedStrings: [5, 6],
    openStrings: [4],
    get frequencies() { return calculateFrequencies(this.positions, this.mutedStrings, this.openStrings); },
  },
  {
    id: 'g-sus4',
    name: 'Gsus4',
    category: 'sus',
    key: 'G',
    suffix: 'sus4',
    baseFret: 1,
    positions: [
      { string: 1, fret: 1, finger: 1 },
      { string: 1, fret: 3, finger: 3 },
      { string: 5, fret: 2, finger: 1 },
      { string: 6, fret: 3, finger: 2 },
    ],
    openStrings: [2, 3, 4],
    get frequencies() { return calculateFrequencies(this.positions, this.mutedStrings, this.openStrings); },
  },
  {
    id: 'a-sus2',
    name: 'Asus2',
    category: 'sus',
    key: 'A',
    suffix: 'sus2',
    baseFret: 1,
    positions: [
      { string: 3, fret: 2, finger: 1 },
      { string: 4, fret: 2, finger: 2 },
    ],
    mutedStrings: [6],
    openStrings: [1, 2, 5],
    get frequencies() { return calculateFrequencies(this.positions, this.mutedStrings, this.openStrings); },
  },
  {
    id: 'e-power',
    name: 'E5',
    category: 'power',
    key: 'E',
    suffix: '5',
    baseFret: 1,
    positions: [
      { string: 5, fret: 2, finger: 1 },
      { string: 6, fret: 2, finger: 1 },
    ],
    mutedStrings: [1, 2, 3, 4],
    get frequencies() { return calculateFrequencies(this.positions, this.mutedStrings, this.openStrings); },
  },
  {
    id: 'a-power',
    name: 'A5',
    category: 'power',
    key: 'A',
    suffix: '5',
    baseFret: 1,
    positions: [
      { string: 4, fret: 2, finger: 1 },
      { string: 5, fret: 2, finger: 1 },
    ],
    mutedStrings: [1, 2, 3, 6],
    get frequencies() { return calculateFrequencies(this.positions, this.mutedStrings, this.openStrings); },
  },
  {
    id: 'd-power',
    name: 'D5',
    category: 'power',
    key: 'D',
    suffix: '5',
    baseFret: 5,
    positions: [
      { string: 4, fret: 7, finger: 2 },
      { string: 5, fret: 7, finger: 2 },
    ],
    barres: [{ fret: 5, fromString: 5, toString: 6 }],
    mutedStrings: [1, 2, 3],
    get frequencies() { return calculateFrequencies(this.positions, this.mutedStrings, this.openStrings); },
  },
  {
    id: 'g-power',
    name: 'G5',
    category: 'power',
    key: 'G',
    suffix: '5',
    baseFret: 3,
    positions: [
      { string: 5, fret: 5, finger: 2 },
      { string: 6, fret: 5, finger: 2 },
    ],
    barres: [{ fret: 3, fromString: 6, toString: 6 }],
    mutedStrings: [1, 2, 3, 4],
    get frequencies() { return calculateFrequencies(this.positions, this.mutedStrings, this.openStrings); },
  },
];

export const getChordsByCategory = (category: string): Chord[] => {
  return chords.filter(chord => chord.category === category);
};

export const getChordsByKey = (key: string): Chord[] => {
  return chords.filter(chord => chord.key === key);
};

export const transposeChord = (chord: Chord, semitones: number): Chord => {
  const keyIndex = keys.indexOf(chord.key);
  const newKeyIndex = (keyIndex + semitones + 12) % 12;
  const newKey = keys[newKeyIndex];
  
  return {
    ...chord,
    id: `${chord.id}-transposed-${semitones}`,
    key: newKey,
    name: `${newKey}${chord.suffix}`,
    baseFret: chord.baseFret + semitones,
    positions: chord.positions.map(pos => ({
      ...pos,
      fret: pos.fret + semitones,
    })),
    barres: chord.barres?.map(barre => ({
      ...barre,
      fret: barre.fret + semitones,
    })),
  };
};
