'use client';

import { useEffect, useRef, useCallback, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import type { Project } from '@/lib/projects';
import styles from './Lightbox.module.css';

type Props = {
  projects: Project[];
  activeIndex: number;
  onClose: () => void;
  onNav: (index: number) => void;
};

export default function Lightbox({ projects, activeIndex, onClose, onNav }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ratio, setRatio] = useState<number | null>(null);
  const project = projects[activeIndex];

  const prev = useCallback(() => {
    onNav((activeIndex - 1 + projects.length) % projects.length);
  }, [activeIndex, projects.length, onNav]);

  const next = useCallback(() => {
    onNav((activeIndex + 1) % projects.length);
  }, [activeIndex, projects.length, onNav]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose, prev, next]);

  // Reset ratio and reload video whenever the project changes
  useEffect(() => {
    setRatio(null);
    const v = videoRef.current;
    if (!v) return;
    v.load();
    v.play().catch(() => {});
  }, [activeIndex]);

  const handleMetadata = () => {
    const v = videoRef.current;
    if (!v || !v.videoWidth || !v.videoHeight) return;
    setRatio(v.videoWidth / v.videoHeight);
  };

  return createPortal(
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.panel} onClick={e => e.stopPropagation()}>

        <button className={styles.close} onClick={onClose} aria-label="Close">
          ✕
        </button>

        <div
          className={styles.videoWrap}
          style={ratio ? { aspectRatio: String(ratio) } : undefined}
        >
          <video
            ref={videoRef}
            className={styles.video}
            src={project.video}
            autoPlay
            muted
            loop
            playsInline
            controls
            onLoadedMetadata={handleMetadata}
          />
        </div>

        <div className={styles.info}>
          <div className={styles.infoLeft}>
            <div className={styles.logoWrap}>
              <Image
                src={project.logo}
                alt={project.client}
                width={120}
                height={44}
                style={{ objectFit: 'contain', objectPosition: 'left center' }}
              />
            </div>
            <h2 className={styles.client}>{project.client}</h2>
            <p className={styles.desc}>{project.description}</p>
            <div className={styles.tags}>
              {project.tags.map(tag => (
                <span key={tag} className={styles.tag}>{tag}</span>
              ))}
            </div>
          </div>
          <div className={styles.nav}>
            <button className={styles.navBtn} onClick={prev} aria-label="Previous project">
              ← Prev
            </button>
            <span className={styles.navCount}>
              {activeIndex + 1} / {projects.length}
            </span>
            <button className={styles.navBtn} onClick={next} aria-label="Next project">
              Next →
            </button>
          </div>
        </div>

      </div>
    </div>,
    document.body
  );
}
