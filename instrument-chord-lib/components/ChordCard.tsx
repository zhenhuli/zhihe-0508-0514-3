'use client';

import { Chord } from '@/lib/chords';
import ChordDiagram from './ChordDiagram';
import ChordAudio from './ChordAudio';
import styles from './ChordCard.module.scss';

interface ChordCardProps {
  chord: Chord;
}

export default function ChordCard({ chord }: ChordCardProps) {
  const frequencies = chord.frequencies || [];
  
  return (
    <div className={styles.card}>
      <h3 className={styles.chordName}>{chord.name}</h3>
      <div className={styles.diagramContainer}>
        <ChordDiagram chord={chord} size={180} />
      </div>
      <div className={styles.info}>
        <div className={styles.details}>
          <span className={styles.category}>{chord.category}</span>
          <span className={styles.key}>Key: {chord.key}</span>
        </div>
        {frequencies.length > 0 && (
          <ChordAudio frequencies={frequencies} label="播放" />
        )}
      </div>
    </div>
  );
}
