'use client';

import { useRef, useEffect } from 'react';
import styles from './Hero.module.css';

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.play().catch(() => {});
  }, []);

  return (
    <section id="hero" className={styles.hero}>
      <video
        ref={videoRef}
        className={styles.reel}
        src="/video/reel.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />
      <div className={styles.overlay} />
      <div className={styles.content}>
        <p className={styles.eyebrow}>Creative Developer</p>
        <h1 className={styles.name}>Derek Haase</h1>
        <p className={styles.sub}>
          Motion Graphics · Animation · Digital Advertising
        </p>
        <a href="#work" className={styles.cta}>View Work</a>
      </div>
      <a href="#work" className={styles.scrollHint} aria-label="Scroll to work">
        <span className={styles.scrollLine} />
      </a>
    </section>
  );
}
