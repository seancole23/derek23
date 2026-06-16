'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import type { Project } from '@/lib/projects';
import styles from './ProjectCard.module.css';

export default function ProjectCard({ project, onClick }: { project: Project; onClick: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const handleMouseEnter = () => {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = 0;
    v.play().then(() => setPlaying(true)).catch(() => {});
  };

  const handleMouseLeave = () => {
    const v = videoRef.current;
    if (!v) return;
    v.pause();
    setPlaying(false);
  };

  return (
    <article
      className={styles.card}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      <div className={styles.media}>
        <Image
          src={project.cover}
          alt={project.client}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={`${styles.poster} ${playing ? styles.hidden : ''}`}
          priority={false}
        />
        <video
          ref={videoRef}
          className={`${styles.video} ${playing ? styles.visible : ''}`}
          src={project.video}
          muted
          loop
          playsInline
          preload="none"
        />
        <div className={styles.overlay} />
        <div className={styles.logoWrap}>
          <Image
            src={project.logo}
            alt={`${project.client} logo`}
            width={100}
            height={40}
            className={styles.logo}
            style={{ objectFit: 'contain', objectPosition: 'left center' }}
          />
        </div>
        <div className={styles.tags}>
          {project.tags.map(tag => (
            <span key={tag} className={styles.tag}>{tag}</span>
          ))}
        </div>
      </div>
      <div className={styles.info}>
        <h3 className={styles.client}>{project.client}</h3>
        <p className={styles.desc}>{project.description}</p>
      </div>
    </article>
  );
}
