import Image from 'next/image';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section id="hero" className={styles.hero}>
      <Image
        src="/images/hero-bg.jpg"
        alt=""
        fill
        priority
        className={styles.bg}
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
