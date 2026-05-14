'use client';

import Link from 'next/link';
import { useState, useMemo } from 'react';
import { chords, chordCategories, keys, Chord } from '@/lib/chords';
import ChordCard from '@/components/ChordCard';
import styles from './page.module.scss';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedKey, setSelectedKey] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredChords = useMemo(() => {
    return chords.filter((chord) => {
      const matchesCategory = selectedCategory === 'all' || chord.category === selectedCategory;
      const matchesKey = selectedKey === 'all' || chord.key === selectedKey;
      const matchesSearch = chord.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           chord.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesKey && matchesSearch;
    });
  }, [selectedCategory, selectedKey, searchQuery]);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>🎸 吉他和弦图鉴库</h1>
        <p className={styles.subtitle}>探索各种吉他和弦指法，聆听和弦音效</p>
        <div className={styles.navLinks}>
          <Link href="/" className={styles.navLinkActive}>
            🎵 和弦库
          </Link>
          <Link href="/chord-theory" className={styles.navLink}>
            📚 和弦知识
          </Link>
        </div>
      </header>

      <div className={styles.filters}>
        <div className={styles.filterSection}>
          <label className={styles.filterLabel}>搜索和弦</label>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="输入和弦名称或分类..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className={styles.filterSection}>
          <label className={styles.filterLabel}>和弦分类</label>
          <div className={styles.filterButtons}>
            <button
              className={`${styles.filterButton} ${selectedCategory === 'all' ? styles.active : ''}`}
              onClick={() => setSelectedCategory('all')}
            >
              全部
            </button>
            {chordCategories.map((category) => (
              <button
                key={category.id}
                className={`${styles.filterButton} ${selectedCategory === category.id ? styles.active : ''}`}
                onClick={() => setSelectedCategory(category.id)}
                title={category.description}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.filterSection}>
          <label className={styles.filterLabel}>调式 (Key)</label>
          <div className={styles.filterButtons}>
            <button
              className={`${styles.filterButton} ${selectedKey === 'all' ? styles.active : ''}`}
              onClick={() => setSelectedKey('all')}
            >
              全部
            </button>
            {keys.map((key) => (
              <button
                key={key}
                className={`${styles.filterButton} ${selectedKey === key ? styles.active : ''}`}
                onClick={() => setSelectedKey(key)}
              >
                {key}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.results}>
        <p className={styles.resultCount}>
          共找到 <span>{filteredChords.length}</span> 个和弦
        </p>
      </div>

      <div className={styles.chordGrid}>
        {filteredChords.map((chord) => (
          <ChordCard key={chord.id} chord={chord} />
        ))}
      </div>

      {filteredChords.length === 0 && (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>🎵</div>
          <h3>没有找到匹配的和弦</h3>
          <p>尝试调整筛选条件或搜索关键词</p>
        </div>
      )}

      <footer className={styles.footer}>
        <p>使用 Web Audio API 生成和弦音效</p>
      </footer>
    </div>
  );
}
