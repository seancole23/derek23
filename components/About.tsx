import styles from './About.module.css';

const SERVICES = [
  'Digital Display Advertising',
  'Social Media Video',
  'Motion Graphics',
  'Scroll-Based Web Animation',
  'Corporate Marketing Video',
  'How-To & Training Video',
];

export default function About() {
  return (
    <section id="about" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <p className={styles.eyebrow}>About</p>
          <h2 className={styles.title}>Creative Developer<br />& Animator</h2>
          <p className={styles.bio}>
            Over 10 years building digital experiences for global brands — from animated
            display ads and social campaigns to scroll-based microsites and motion graphics.
            I bridge the gap between design and development, turning ideas into polished,
            production-ready motion.
          </p>
          <p className={styles.bio}>
            Clients include Airwick, Coca-Cola, Verizon, Google, Mastercard, Wolters Kluwer,
            and more. Available for freelance and contract work.
          </p>
          <a href="#contact" className={styles.cta}>Get in Touch</a>
        </div>
        <div className={styles.right}>
          <p className={styles.servicesLabel}>Services</p>
          <ul className={styles.services}>
            {SERVICES.map(s => (
              <li key={s} className={styles.service}>{s}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
