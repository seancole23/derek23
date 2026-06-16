import { PROJECTS } from '@/lib/projects';
import ProjectCard from './ProjectCard';
import styles from './WorkGrid.module.css';

export default function WorkGrid() {
  return (
    <section id="work" className={styles.section}>
      <div className={styles.header}>
        <p className={styles.eyebrow}>Selected Work</p>
        <h2 className={styles.title}>Clients & Campaigns</h2>
      </div>
      <div className={styles.grid}>
        {PROJECTS.map(project => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}
