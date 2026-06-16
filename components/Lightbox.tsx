'use client';

import { useEffect, useRef, useCallback, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import type { Project, LightboxPos } from '@/lib/projects';
import styles from './Lightbox.module.css';

type Props = {
  projects: Project[];
  pos: LightboxPos;
  onClose: () => void;
  onNav: (pos: LightboxPos) => void;
};

type VideoSize = { width: number; ratio: number };

const GUTTER  = 48;
const TOP_GAP = 12;

function computeSize(ratio: number, infoH: number): VideoSize {
  const maxW = Math.min(window.innerWidth - GUTTER, 1280);
  const maxH = window.innerHeight - GUTTER - infoH - TOP_GAP;
  let w = maxW;
  if (w / ratio > maxH) w = maxH * ratio;
  return { width: Math.round(w), ratio };
}

export default function Lightbox({ projects, pos, onClose, onNav }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const infoRef  = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState<VideoSize | null>(null);

  const project = projects[pos.clientIdx];
  const videos  = project.videos;

  const recomputeSize = useCallback(() => {
    const v    = videoRef.current;
    const info = infoRef.current;
    if (!v || !v.videoWidth || !info) return;
    setSize(computeSize(v.videoWidth / v.videoHeight, info.offsetHeight));
  }, []);

  // ‹ › buttons navigate clients
  const prevClient = useCallback(() => {
    const prevIdx = (pos.clientIdx - 1 + projects.length) % projects.length;
    onNav({ clientIdx: prevIdx, videoIdx: 0 });
  }, [pos.clientIdx, projects, onNav]);

  const nextClient = useCallback(() => {
    onNav({ clientIdx: (pos.clientIdx + 1) % projects.length, videoIdx: 0 });
  }, [pos.clientIdx, projects, onNav]);

  // Keyboard ← → navigate videos, wrapping to prev/next client at boundaries
  const prevVideo = useCallback(() => {
    if (pos.videoIdx > 0) {
      onNav({ clientIdx: pos.clientIdx, videoIdx: pos.videoIdx - 1 });
    } else {
      const prevIdx = (pos.clientIdx - 1 + projects.length) % projects.length;
      onNav({ clientIdx: prevIdx, videoIdx: projects[prevIdx].videos.length - 1 });
    }
  }, [pos, projects, onNav]);

  const nextVideo = useCallback(() => {
    if (pos.videoIdx < videos.length - 1) {
      onNav({ clientIdx: pos.clientIdx, videoIdx: pos.videoIdx + 1 });
    } else {
      onNav({ clientIdx: (pos.clientIdx + 1) % projects.length, videoIdx: 0 });
    }
  }, [pos, videos.length, projects, onNav]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape')     onClose();
      if (e.key === 'ArrowLeft')  prevVideo();
      if (e.key === 'ArrowRight') nextVideo();
    };
    document.addEventListener('keydown', onKey);
    window.addEventListener('resize', recomputeSize);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', recomputeSize);
      document.body.style.overflow = '';
    };
  }, [onClose, prevVideo, nextVideo, recomputeSize]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.volume = 0.7;
    v.load();
    v.play().catch(() => {});
    // Keep previous size during navigation — panel holds shape until new metadata fires
  }, [pos]);

  const handleMetadata = () => {
    const v    = videoRef.current;
    const info = infoRef.current;
    if (!v || !v.videoWidth || !info) return;
    setSize(computeSize(v.videoWidth / v.videoHeight, info.offsetHeight));
  };

  return createPortal(
    <div className={styles.backdrop} onClick={onClose}>
      <div
        className={styles.panel}
        style={size ? { width: size.width } : undefined}
        onClick={e => e.stopPropagation()}
      >
        <button className={styles.close} onClick={onClose} aria-label="Close">✕</button>

        <div
          className={styles.videoWrap}
          style={{ aspectRatio: size ? String(size.ratio) : '16/9' }}
        >
          <video
            ref={videoRef}
            className={styles.video}
            src={videos[pos.videoIdx]}
            autoPlay
            muted
            loop
            playsInline
            controls
            onLoadedMetadata={handleMetadata}
          />
        </div>

        <div ref={infoRef} className={styles.info}>
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
            <div className={styles.tags}>
              {project.tags.map(tag => (
                <span key={tag} className={styles.tag}>{tag}</span>
              ))}
            </div>
          </div>
          <div className={styles.nav}>
            <button className={styles.clientBtn} onClick={prevClient} aria-label="Previous client">‹</button>
            <div className={styles.pills}>
              {videos.map((_, i) => (
                <button
                  key={i}
                  className={`${styles.pill} ${i === pos.videoIdx ? styles.pillActive : ''}`}
                  onClick={() => onNav({ clientIdx: pos.clientIdx, videoIdx: i })}
                  aria-label={`Video ${i + 1}`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <button className={styles.clientBtn} onClick={nextClient} aria-label="Next client">›</button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
