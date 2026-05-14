'use client';

import Link from 'next/link';
import { useState } from 'react';
import styles from './page.module.scss';
import ChordDiagram from '@/components/ChordDiagram';
import { chords } from '@/lib/chords';

export default function ChordTheory() {
  const [activeSection, setActiveSection] = useState('basics');

  const sections = [
    { id: 'basics', name: '和弦基础' },
    { id: 'structure', name: '和弦构成' },
    { id: 'types', name: '和弦类型' },
    { id: 'progressions', name: '常用进行' },
    { id: 'techniques', name: '指法技巧' },
  ];

  const exampleChords = chords.slice(0, 4);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>📚 和弦知识大全</h1>
        <p className={styles.subtitle}>从零开始学习吉他和弦理论与实践</p>
        <div className={styles.navLinks}>
          <Link href="/" className={styles.navLink}>
            🎵 和弦库
          </Link>
          <Link href="/chord-theory" className={styles.navLinkActive}>
            📚 和弦知识
          </Link>
        </div>
      </header>

      <div className={styles.content}>
        <nav className={styles.sidebar}>
          <div className={styles.navTitle}>目录</div>
          {sections.map((section) => (
            <button
              key={section.id}
              className={`${styles.navButton} ${activeSection === section.id ? styles.active : ''}`}
              onClick={() => setActiveSection(section.id)}
            >
              {section.name}
            </button>
          ))}
        </nav>

        <main className={styles.mainContent}>
          {activeSection === 'basics' && (
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>🎸 和弦基础</h2>
              
              <div className={styles.card}>
                <h3>什么是和弦？</h3>
                <p>
                  和弦是由三个或三个以上不同的音，按照一定的音程关系叠加在一起同时发声的组合。
                  在吉他上，我们通过按不同的品位来演奏和弦。
                </p>
              </div>

              <div className={styles.card}>
                <h3>吉他的标准调音</h3>
                <div className={styles.tuningGrid}>
                  {[
                    { string: '6弦', note: 'E', freq: '82.41 Hz' },
                    { string: '5弦', note: 'A', freq: '110.00 Hz' },
                    { string: '4弦', note: 'D', freq: '146.83 Hz' },
                    { string: '3弦', note: 'G', freq: '196.00 Hz' },
                    { string: '2弦', note: 'B', freq: '246.94 Hz' },
                    { string: '1弦', note: 'e', freq: '329.63 Hz' },
                  ].map((item) => (
                    <div key={item.string} className={styles.tuningItem}>
                      <span className={styles.stringLabel}>{item.string}</span>
                      <span className={styles.noteLabel}>{item.note}</span>
                      <span className={styles.freqLabel}>{item.freq}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.card}>
                <h3>和弦指法图说明</h3>
                <div className={styles.diagramLegend}>
                  <div className={styles.legendItem}>
                    <div className={styles.legendDot} style={{ background: '#1e293b', color: 'white' }}></div>
                    <span>按弦位置</span>
                  </div>
                  <div className={styles.legendItem}>
                    <div className={styles.legendDot} style={{ border: '2px solid #64748b', background: 'transparent' }}></div>
                    <span>空弦（不按弦直接弹）</span>
                  </div>
                  <div className={styles.legendItem}>
                    <div className={styles.legendDot} style={{ position: 'relative' }}>
                      <div style={{ position: 'absolute', top: '50%', left: '50%', width: '16px', height: '2px', background: '#94a3b8', transform: 'translate(-50%, -50%) rotate(45deg)' }}></div>
                      <div style={{ position: 'absolute', top: '50%', left: '50%', width: '16px', height: '2px', background: '#94a3b8', transform: 'translate(-50%, -50%) rotate(-45deg)' }}></div>
                    </div>
                    <span>闷音（不弹奏该弦）</span>
                  </div>
                  <div className={styles.legendItem}>
                    <div style={{ width: '40px', height: '12px', background: '#1e293b', borderRadius: '6px' }}></div>
                    <span>横按（用一指按多根弦）</span>
                  </div>
                </div>
                <div className={styles.fingerNumbers}>
                  <h4>手指编号</h4>
                  <div className={styles.fingerGrid}>
                    {[
                      { num: '1', name: '食指' },
                      { num: '2', name: '中指' },
                      { num: '3', name: '无名指' },
                      { num: '4', name: '小指' },
                    ].map((finger) => (
                      <div key={finger.num} className={styles.fingerItem}>
                        <span className={styles.fingerNum}>{finger.num}</span>
                        <span className={styles.fingerName}>{finger.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className={styles.card}>
                <h3>常用开放和弦示例</h3>
                <div className={styles.chordExamples}>
                  {exampleChords.map((chord) => (
                    <div key={chord.id} className={styles.chordExample}>
                      <ChordDiagram chord={chord} size={150} />
                      <div className={styles.chordExampleName}>{chord.name}</div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {activeSection === 'structure' && (
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>🔢 和弦构成</h2>

              <div className={styles.card}>
                <h3>音程基础知识</h3>
                <p>音程是两个音之间的距离，是构建和弦的基础：</p>
                <div className={styles.intervalTable}>
                  <div className={styles.intervalHeader}>
                    <span>音程名称</span>
                    <span>半音数</span>
                    <span>示例</span>
                  </div>
                  {[
                    { name: '根音 (Root)', semitones: '0', example: 'C' },
                    { name: '小三度 (Minor 3rd)', semitones: '3', example: 'C-Eb' },
                    { name: '大三度 (Major 3rd)', semitones: '4', example: 'C-E' },
                    { name: '纯五度 (Perfect 5th)', semitones: '7', example: 'C-G' },
                    { name: '减五度 (Diminished 5th)', semitones: '6', example: 'C-Gb' },
                    { name: '增五度 (Augmented 5th)', semitones: '8', example: 'C-G#' },
                    { name: '小七度 (Minor 7th)', semitones: '10', example: 'C-Bb' },
                    { name: '大七度 (Major 7th)', semitones: '11', example: 'C-B' },
                  ].map((interval, index) => (
                    <div key={index} className={styles.intervalRow}>
                      <span className={styles.intervalName}>{interval.name}</span>
                      <span className={styles.intervalSemitones}>{interval.semitones}</span>
                      <span className={styles.intervalExample}>{interval.example}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.card}>
                <h3>三和弦构成公式</h3>
                <p className={styles.cardIntro}>
                  三和弦是最基本的和弦类型，由根音、三音、五音三个音组成：
                </p>
                <div className={styles.triadGrid}>
                  {[
                    {
                      type: '大三和弦 (Major)',
                      formula: '根音 + 大三度 + 纯五度',
                      symbol: 'C, D, G',
                      sound: '明亮、愉快',
                      color: '#22c55e',
                    },
                    {
                      type: '小三和弦 (Minor)',
                      formula: '根音 + 小三度 + 纯五度',
                      symbol: 'Cm, Dm, Am',
                      sound: '忧郁、柔和',
                      color: '#3b82f6',
                    },
                    {
                      type: '增三和弦 (Augmented)',
                      formula: '根音 + 大三度 + 增五度',
                      symbol: 'Caug, C+',
                      sound: '紧张、不稳定',
                      color: '#f59e0b',
                    },
                    {
                      type: '减三和弦 (Diminished)',
                      formula: '根音 + 小三度 + 减五度',
                      symbol: 'Cdim, C°',
                      sound: '晦暗、紧张',
                      color: '#ef4444',
                    },
                  ].map((triad, index) => (
                    <div key={index} className={styles.triadCard} style={{ borderColor: triad.color }}>
                      <h4 style={{ color: triad.color }}>{triad.type}</h4>
                      <div className={styles.triadFormula}>{triad.formula}</div>
                      <div className={styles.triadSymbol}>标记：{triad.symbol}</div>
                      <div className={styles.triadSound}>听觉：{triad.sound}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.card}>
                <h3>七和弦构成</h3>
                <p className={styles.cardIntro}>
                  七和弦在三和弦的基础上增加了七度音，音色更加丰富：
                </p>
                <div className={styles.seventhGrid}>
                  {[
                    { type: '属七和弦 (7th)', formula: '大三 + 小七度', symbol: 'C7', desc: '爵士、蓝调常用，有解决倾向' },
                    { type: '大七和弦 (Maj7)', formula: '大三 + 大七度', symbol: 'Cmaj7', desc: '圆润、丰富，爵士抒情' },
                    { type: '小七和弦 (m7)', formula: '小三 + 小七度', symbol: 'Cm7', desc: '柔和、忧郁，爵士常用' },
                    { type: '半减七和弦 (m7b5)', formula: '减三 + 小七度', symbol: 'Cm7b5', desc: '紧张，常用作经过和弦' },
                  ].map((seventh, index) => (
                    <div key={index} className={styles.seventhCard}>
                      <h4>{seventh.type}</h4>
                      <div className={styles.seventhFormula}>{seventh.formula}</div>
                      <div className={styles.seventhSymbol}>{seventh.symbol}</div>
                      <div className={styles.seventhDesc}>{seventh.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {activeSection === 'types' && (
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>🎵 和弦类型详解</h2>

              <div className={styles.card}>
                <h3>挂留和弦 (Sus Chords)</h3>
                <div className={styles.typeDetail}>
                  <div className={styles.typeInfo}>
                    <p><strong>特点：</strong>将三音替换为二度或四度音，产生悬念感</p>
                    <p><strong>sus2：</strong>根音 + 大二度 + 纯五度（如 Csus2 = C-D-G）</p>
                    <p><strong>sus4：</strong>根音 + 纯四度 + 纯五度（如 Csus4 = C-F-G）</p>
                    <p><strong>用法：</strong>常用于流行音乐，接在同名三和弦前后制造张力和解决</p>
                  </div>
                </div>
              </div>

              <div className={styles.card}>
                <h3>强力和弦 (Power Chords)</h3>
                <div className={styles.typeDetail}>
                  <div className={styles.typeInfo}>
                    <p><strong>特点：</strong>只包含根音和五音，没有三音，音色浑厚有力</p>
                    <p><strong>标记：</strong>C5、G5、A5 等</p>
                    <p><strong>适用风格：</strong>摇滚、朋克、金属</p>
                    <p><strong>优势：</strong>指法简单，容易移动，失真音色下清晰有力</p>
                  </div>
                </div>
              </div>

              <div className={styles.card}>
                <h3>转位和弦 (Inversions)</h3>
                <div className={styles.typeDetail}>
                  <div className={styles.inversionList}>
                    <div className={styles.inversionItem}>
                      <h4>原位和弦</h4>
                      <p>根音为低音</p>
                      <code>C-E-G</code>
                    </div>
                    <div className={styles.inversionItem}>
                      <h4>第一转位</h4>
                      <p>三音为低音（6和弦）</p>
                      <code>E-G-C</code>
                    </div>
                    <div className={styles.inversionItem}>
                      <h4>第二转位</h4>
                      <p>五音为低音（46和弦）</p>
                      <code>G-C-E</code>
                    </div>
                  </div>
                  <p className={styles.inversionTip}>
                    💡 使用转位可以让和弦进行的低音线条更流畅
                  </p>
                </div>
              </div>

              <div className={styles.card}>
                <h3>延伸和弦 (Extended Chords)</h3>
                <div className={styles.extendedList}>
                  {[
                    { name: '九和弦 (9th)', desc: '七和弦加九音，音色丰富华丽' },
                    { name: '十一和弦 (11th)', desc: '九和弦加十一音，爵士常用' },
                    { name: '十三和弦 (13th)', desc: '十一和弦加十三音，非常丰满' },
                    { name: '加音和弦', desc: '如 add9、add11，不改变基础和弦性质' },
                  ].map((item, index) => (
                    <div key={index} className={styles.extendedItem}>
                      <h4>{item.name}</h4>
                      <p>{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {activeSection === 'progressions' && (
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>🎼 常用和弦进行</h2>

              <div className={styles.card}>
                <h3>什么是和弦进行？</h3>
                <p>
                  和弦进行是一系列和弦按照一定的规律和逻辑顺序排列，构成歌曲的和声基础。
                  好的和弦进行能为歌曲增添情感和表现力。
                </p>
              </div>

              <div className={styles.card}>
                <h3>卡农进行 (I-V-vi-IV)</h3>
                <div className={styles.progressionHighlight}>
                  <div className={styles.progressionChords}>
                    <span className={styles.chordProg}>I</span>
                    <span className={styles.chordArrow}>→</span>
                    <span className={styles.chordProg}>V</span>
                    <span className={styles.chordArrow}>→</span>
                    <span className={styles.chordProg}>vi</span>
                    <span className={styles.chordArrow}>→</span>
                    <span className={styles.chordProg}>IV</span>
                  </div>
                </div>
                <div className={styles.progressionDetail}>
                  <p><strong>C大调：</strong>C → G → Am → F</p>
                  <p><strong>G大调：</strong>G → D → Em → C</p>
                  <p><strong>特点：</strong>流行音乐最常用的进行之一，旋律优美，容易记忆</p>
                  <p><strong>代表歌曲：</strong>《Canon in D》、《Let It Be》、《Hallelujah》</p>
                </div>
              </div>

              <div className={styles.card}>
                <h3>蓝调进行 (I-IV-V)</h3>
                <div className={styles.progressionHighlight}>
                  <div className={styles.progressionChords}>
                    <span className={styles.chordProg} style={{ color: '#dc2626' }}>I<sup>7</sup></span>
                    <span className={styles.chordArrow}>→</span>
                    <span className={styles.chordProg} style={{ color: '#dc2626' }}>IV<sup>7</sup></span>
                    <span className={styles.chordArrow}>→</span>
                    <span className={styles.chordProg} style={{ color: '#dc2626' }}>V<sup>7</sup></span>
                  </div>
                </div>
                <div className={styles.progressionDetail}>
                  <p><strong>A调12小节蓝调：</strong></p>
                  <code>A7 / A7 / A7 / A7 / D7 / D7 / A7 / A7 / E7 / D7 / A7 / E7</code>
                  <p><strong>特点：</strong>蓝调、摇滚、R&B 的基础进行，充满灵魂感</p>
                </div>
              </div>

              <div className={styles.card}>
                <h3>爵士 ii-V-I 进行</h3>
                <div className={styles.progressionHighlight}>
                  <div className={styles.progressionChords}>
                    <span className={styles.chordProg} style={{ color: '#7c3aed' }}>ii<sup>m7</sup></span>
                    <span className={styles.chordArrow}>→</span>
                    <span className={styles.chordProg} style={{ color: '#7c3aed' }}>V<sup>7</sup></span>
                    <span className={styles.chordArrow}>→</span>
                    <span className={styles.chordProg} style={{ color: '#7c3aed' }}>I<sup>Maj7</sup></span>
                  </div>
                </div>
                <div className={styles.progressionDetail}>
                  <p><strong>C大调：</strong>Dm7 → G7 → Cmaj7</p>
                  <p><strong>特点：</strong>爵士乐最重要的进行，有强烈的解决感</p>
                </div>
              </div>

              <div className={styles.card}>
                <h3>更多常用进行</h3>
                <div className={styles.moreProgressions}>
                  {[
                    { name: '流行经典', prog: 'I-vi-IV-V', example: 'C-Am-F-G' },
                    { name: '60年代摇滚', prog: 'I-IV-V-IV', example: 'C-F-G-F' },
                    { name: '伤感抒情', prog: 'vi-IV-I-V', example: 'Am-F-C-G' },
                    { name: '民谣风格', prog: 'I-V-vi-iii-IV-I-IV-V', example: 'C-G-Am-Em-F-C-F-G' },
                  ].map((item, index) => (
                    <div key={index} className={styles.progressionItem}>
                      <h4>{item.name}</h4>
                      <div className={styles.progRoman}>{item.prog}</div>
                      <div className={styles.progExample}>{item.example}</div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {activeSection === 'techniques' && (
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>✋ 指法与练习技巧</h2>

              <div className={styles.card}>
                <h3>左手按弦正确姿势</h3>
                <div className={styles.techTipList}>
                  {[
                    {
                      icon: '👆',
                      title: '手指弯曲',
                      desc: '指尖垂直按弦，避免碰到相邻弦',
                    },
                    {
                      icon: '📍',
                      title: '按弦位置',
                      desc: '按在品丝稍前方，不要太靠近或太远离品丝',
                    },
                    {
                      icon: '🤚',
                      title: '拇指位置',
                      desc: '拇指放在琴颈后方中部，与中指相对',
                    },
                    {
                      icon: '💪',
                      title: '力度适中',
                      desc: '按弦力度要足够但不要过大，避免疲劳',
                    },
                  ].map((tip, index) => (
                    <div key={index} className={styles.techTip}>
                      <span className={styles.tipIcon}>{tip.icon}</span>
                      <div className={styles.tipContent}>
                        <h4>{tip.title}</h4>
                        <p>{tip.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.card}>
                <h3>横按技巧 (Barre Chords)</h3>
                <div className={styles.barreTips}>
                  <p className={styles.barreIntro}>
                    横按是吉他学习的重要里程碑，需要一定的练习：
                  </p>
                  <ol className={styles.barreSteps}>
                    <li>用食指的侧面（不是指腹）平按在弦上</li>
                    <li>确保每根弦都能清晰发声，没有闷音</li>
                    <li>其他手指按和弦的其他位置</li>
                    <li>从第五品开始练习，力度需求较小</li>
                  </ol>
                  <div className={styles.barreShapes}>
                    <h4>常用横按指型：</h4>
                    <div className={styles.shapeGrid}>
                      <div className={styles.shapeItem}>
                        <strong>E 指型</strong>
                        <span>根音在6弦</span>
                      </div>
                      <div className={styles.shapeItem}>
                        <strong>A 指型</strong>
                        <span>根音在5弦</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.card}>
                <h3>和弦转换练习</h3>
                <div className={styles.practiceList}>
                  {[
                    {
                      level: '初级',
                      chords: 'C → G → Am → F',
                      tip: '先练 C-G，再加 Am，最后加 F',
                    },
                    {
                      level: '中级',
                      chords: 'D → Em → A → Bm',
                      tip: '注意Bm的横按，慢慢来不急',
                    },
                    {
                      level: '进阶',
                      chords: 'F → Bb → C7 → Fmaj7',
                      tip: '全部横按和弦，提升手指力量',
                    },
                  ].map((practice, index) => (
                    <div key={index} className={styles.practiceItem}>
                      <div className={styles.practiceLevel}>{practice.level}</div>
                      <div className={styles.practiceChords}>{practice.chords}</div>
                      <div className={styles.practiceTip}>💡 {practice.tip}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.card}>
                <h3>每日练习建议</h3>
                <div className={styles.dailyRoutine}>
                  {[
                    { time: '5分钟', activity: '热身 - 爬格子练习' },
                    { time: '10分钟', activity: '和弦转换 - 使用节拍器' },
                    { time: '5分钟', activity: '新和弦学习' },
                    { time: '10分钟', activity: '歌曲片段练习' },
                    { time: '5分钟', activity: '横按强化练习' },
                  ].map((item, index) => (
                    <div key={index} className={styles.routineItem}>
                      <span className={styles.routineTime}>{item.time}</span>
                      <span className={styles.routineActivity}>{item.activity}</span>
                    </div>
                  ))}
                </div>
                <p className={styles.practiceNote}>
                  ⚠️ 注意：练习时保持正确姿势，遇到疼痛及时休息！
                </p>
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}
