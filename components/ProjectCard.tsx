'use client';

import { useRef } from 'react';
import Image from 'next/image';
import type { Project } from '@/lib/projects';
import styles from './ProjectCard.module.css';

export default function ProjectCard({ project, onClick }: { project: Project; onClick: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = 0;
    v.play().catch(() => {});
  };

  const handleMouseLeave = () => {
    const v = videoRef.current;
    if (!v) return;
    v.pause();
    v.load(); // resets to poster
  };

  return (
    <article
      className={styles.card}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      <div className={styles.media}>
        <video
          ref={videoRef}
          className={styles.video}
          src={project.video}
          poster={project.cover}
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
