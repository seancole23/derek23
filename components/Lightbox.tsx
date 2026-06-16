'use client';

import { useEffect, useRef, useCallback, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import type { Project } from '@/lib/projects';
import styles from './Lightbox.module.css';

type LightboxPos = { clientIdx: number; videoIdx: number };

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

  const prev = useCallback(() => {
    if (pos.videoIdx > 0) {
      onNav({ clientIdx: pos.clientIdx, videoIdx: pos.videoIdx - 1 });
    } else {
      const prevClientIdx = (pos.clientIdx - 1 + projects.length) % projects.length;
      onNav({ clientIdx: prevClientIdx, videoIdx: projects[prevClientIdx].videos.length - 1 });
    }
  }, [pos, projects, onNav]);

  const next = useCallback(() => {
    if (pos.videoIdx < videos.length - 1) {
      onNav({ clientIdx: pos.clientIdx, videoIdx: pos.videoIdx + 1 });
    } else {
      onNav({ clientIdx: (pos.clientIdx + 1) % projects.length, videoIdx: 0 });
    }
  }, [pos, videos.length, projects, onNav]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape')     onClose();
      if (e.key === 'ArrowLeft')  prev();
      if (e.key === 'ArrowRight') next();
    };
    document.addEventListener('keydown', onKey);
    window.addEventListener('resize', recomputeSize);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', recomputeSize);
      document.body.style.overflow = '';
    };
  }, [onClose, prev, next, recomputeSize]);

  useEffect(() => {
    setSize(null);
    const v = videoRef.current;
    if (!v) return;
    v.volume = 0.7;
    v.load();
    v.play().catch(() => {});
  }, [pos]);

  // Keep volume at 0.7 on the visible video after size is computed (new element in DOM)
  useEffect(() => {
    const v = videoRef.current;
    if (v) v.volume = 0.7;
  }, [size]);

  const handleMetadata = () => {
    const v    = videoRef.current;
    const info = infoRef.current;
    if (!v || !v.videoWidth || !info) return;
    setSize(computeSize(v.videoWidth / v.videoHeight, info.offsetHeight));
  };

  const panelStyle = size ? { width: size.width } : undefined;
  const wrapStyle  = size ? { aspectRatio: String(size.ratio) } : undefined;

  const videoLabel  = `${pos.videoIdx + 1} / ${videos.length}`;
  const clientLabel = `${pos.clientIdx + 1} / ${projects.length}`;

  return createPortal(
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.panel} style={panelStyle} onClick={e => e.stopPropagation()}>

        <button className={styles.close} onClick={onClose} aria-label="Close">✕</button>

        {wrapStyle && (
          <div className={styles.videoWrap} style={wrapStyle}>
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
        )}

        {/* Hidden video to fire onLoadedMetadata before size is known */}
        {!wrapStyle && (
          <video
            ref={videoRef}
            src={videos[pos.videoIdx]}
            style={{ display: 'none' }}
            muted
            playsInline
            onLoadedMetadata={handleMetadata}
          />
        )}

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
            <p className={styles.desc}>{project.description}</p>
            <div className={styles.tags}>
              {project.tags.map(tag => (
                <span key={tag} className={styles.tag}>{tag}</span>
              ))}
            </div>
          </div>
          <div className={styles.nav}>
            <button className={styles.navBtn} onClick={prev} aria-label="Previous">← Prev</button>
            <div className={styles.navCount}>
              <span>{videoLabel}</span>
              <span className={styles.navCountSub}>{clientLabel} clients</span>
            </div>
            <button className={styles.navBtn} onClick={next} aria-label="Next">Next →</button>
          </div>
        </div>

      </div>
    </div>,
    document.body
  );
}
