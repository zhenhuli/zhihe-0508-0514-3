'use client';

import { Chord } from '@/lib/chords';
import styles from './ChordDiagram.module.scss';

interface ChordDiagramProps {
  chord: Chord;
  size?: number;
}

export default function ChordDiagram({ chord, size = 150 }: ChordDiagramProps) {
  const stringCount = 6;
  const fretCount = 5;
  const padding = size * 0.15;
  const innerSize = size - padding * 2;
  const stringSpacing = innerSize / (stringCount - 1);
  const fretSpacing = innerSize / fretCount;
  const dotRadius = size * 0.06;

  const getX = (string: number) => padding + (string - 1) * stringSpacing;
  const getY = (fret: number) => padding + (fret - chord.baseFret) * fretSpacing + fretSpacing / 2;

  return (
    <svg width={size} height={size} className={styles.diagram}>
      <rect width={size} height={size} fill="white" rx="8" />
      
      {Array.from({ length: fretCount + 1 }).map((_, i) => (
        <line
          key={`fret-${i}`}
          x1={padding}
          y1={padding + i * fretSpacing}
          x2={size - padding}
          y2={padding + i * fretSpacing}
          stroke={i === 0 ? '#333' : '#ccc'}
          strokeWidth={i === 0 ? 3 : 1.5}
        />
      ))}

      {Array.from({ length: stringCount }).map((_, i) => (
        <line
          key={`string-${i}`}
          x1={padding + i * stringSpacing}
          y1={padding}
          x2={padding + i * stringSpacing}
          y2={size - padding}
          stroke="#999"
          strokeWidth={1.5}
        />
      ))}

      {chord.baseFret > 1 && (
        <text
          x={padding / 2}
          y={padding + fretSpacing / 2}
          fontSize={size * 0.09}
          fill="#666"
          textAnchor="middle"
          dominantBaseline="middle"
        >
          {chord.baseFret}fr
        </text>
      )}

      {chord.mutedStrings?.map((string) => (
        <g key={`muted-${string}`}>
          <line
            x1={getX(string) - dotRadius * 0.7}
            y1={padding / 2 - dotRadius * 0.3}
            x2={getX(string) + dotRadius * 0.7}
            y2={padding / 2 + dotRadius * 0.3}
            stroke="#999"
            strokeWidth={2}
          />
          <line
            x1={getX(string) + dotRadius * 0.7}
            y1={padding / 2 - dotRadius * 0.3}
            x2={getX(string) - dotRadius * 0.7}
            y2={padding / 2 + dotRadius * 0.3}
            stroke="#999"
            strokeWidth={2}
          />
        </g>
      ))}

      {chord.openStrings?.map((string) => (
        <circle
          key={`open-${string}`}
          cx={getX(string)}
          cy={padding / 2}
          r={dotRadius * 0.6}
          fill="none"
          stroke="#666"
          strokeWidth={2}
        />
      ))}

      {chord.barres?.map((barre, index) => (
        <rect
          key={`barre-${index}`}
          x={getX(barre.fromString) - dotRadius}
          y={getY(barre.fret) - dotRadius * 0.8}
          width={getX(barre.toString) - getX(barre.fromString) + dotRadius * 2}
          height={dotRadius * 1.6}
          fill="#333"
          rx={dotRadius * 0.8}
        />
      ))}

      {chord.positions.map((pos, index) => {
        const isPartOfBarre = chord.barres?.some(
          barre => barre.fret === pos.fret && pos.string >= barre.fromString && pos.string <= barre.toString
        );
        if (isPartOfBarre) return null;
        
        return (
          <g key={`pos-${index}`}>
            <circle
              cx={getX(pos.string)}
              cy={getY(pos.fret)}
              r={dotRadius}
              fill="#333"
            />
            {pos.finger && (
              <text
                x={getX(pos.string)}
                y={getY(pos.fret) + 1}
                fontSize={size * 0.08}
                fill="white"
                textAnchor="middle"
                dominantBaseline="middle"
                fontWeight="bold"
              >
                {pos.finger}
              </text>
            )}
          </g>
        );
      })}

      {['E', 'A', 'D', 'G', 'B', 'e'].map((label, index) => (
        <text
          key={`label-${index}`}
          x={getX(index + 1)}
          y={size - padding / 3}
          fontSize={size * 0.07}
          fill="#999"
          textAnchor="middle"
        >
          {label}
        </text>
      ))}
    </svg>
  );
}
