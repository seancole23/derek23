import styles from './Contact.module.css';

export default function Contact() {
  return (
    <section id="contact" className={styles.section}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>Contact</p>
        <h2 className={styles.title}>Let's Work Together</h2>
        <p className={styles.sub}>
          Available for freelance and contract work — digital advertising, motion graphics,
          animation, and interactive web production.
        </p>
        <div className={styles.links}>
          <a href="mailto:DerekHaase23@gmail.com" className={styles.link}>
            <span className={styles.linkLabel}>Email</span>
            <span className={styles.linkVal}>DerekHaase23@gmail.com</span>
          </a>
          <a href="tel:6199617002" className={styles.link}>
            <span className={styles.linkLabel}>Phone</span>
            <span className={styles.linkVal}>619.961.7002</span>
          </a>
        </div>
      </div>
      <footer className={styles.footer}>
        <p>© {new Date().getFullYear()} Derek Haase</p>
      </footer>
    </section>
  );
}
