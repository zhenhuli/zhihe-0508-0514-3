'use client';

import { useState, useCallback } from 'react';
import { Chord } from '@/lib/chords';
import styles from './ChordAudio.module.scss';

interface ChordAudioProps {
  frequencies: number[];
  label?: string;
}

export default function ChordAudio({ frequencies, label = '播放' }: ChordAudioProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const playChord = useCallback(() => {
    if (isPlaying) return;
    
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    setIsPlaying(true);

    const oscillators: OscillatorNode[] = [];
    const gains: GainNode[] = [];

    frequencies.forEach((freq, index) => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.type = 'triangle';
      oscillator.frequency.setValueAtTime(freq, audioContext.currentTime);

      const volume = 0.15 / Math.sqrt(frequencies.length);
      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(volume, audioContext.currentTime + 0.05);
      gainNode.gain.exponentialRampToValueAtTime(volume * 0.7, audioContext.currentTime + 1.5);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 2);

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillators.push(oscillator);
      gains.push(gainNode);
    });

    oscillators.forEach((osc, index) => {
      osc.start(audioContext.currentTime + index * 0.03);
      osc.stop(audioContext.currentTime + 2);
    });

    setTimeout(() => {
      setIsPlaying(false);
    }, 2000);
  }, [frequencies, isPlaying]);

  return (
    <button 
      className={`${styles.playButton} ${isPlaying ? styles.playing : ''}`}
      onClick={playChord}
      disabled={isPlaying}
      aria-label={label}
    >
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
        {isPlaying ? (
          <>
            <rect x="6" y="4" width="4" height="16" rx="1" />
            <rect x="14" y="4" width="4" height="16" rx="1" />
          </>
        ) : (
          <path d="M8 5v14l11-7z" />
        )}
      </svg>
      <span>{isPlaying ? '播放中...' : label}</span>
    </button>
  );
}
