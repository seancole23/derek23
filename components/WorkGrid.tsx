'use client';

import { useState } from 'react';
import { PROJECTS } from '@/lib/projects';
import type { LightboxPos } from '@/lib/projects';
import ProjectCard from './ProjectCard';
import Lightbox from './Lightbox';
import styles from './WorkGrid.module.css';

export default function WorkGrid() {
  const [lightbox, setLightbox] = useState<LightboxPos | null>(null);

  return (
    <section id="work" className={styles.section}>
      <div className={styles.header}>
        <p className={styles.eyebrow}>Selected Work</p>
        <h2 className={styles.title}>Clients & Campaigns</h2>
      </div>
      <div className={styles.grid}>
        {PROJECTS.map((project, i) => (
          <ProjectCard
            key={project.slug}
            project={project}
            onClick={() => setLightbox({ clientIdx: i, videoIdx: 0 })}
          />
        ))}
      </div>

      {lightbox !== null && (
        <Lightbox
          projects={PROJECTS}
          pos={lightbox}
          onClose={() => setLightbox(null)}
          onNav={setLightbox}
        />
      )}
    </section>
  );
}
