import { motion } from 'framer-motion';
import styles from './CaseStudy.module.css';

export default function CaseStudyHero({ image, alt, title, subtitle, subtitleClassName }) {
  return (
    <section className={styles.heroSection}>
      <img
        src={image}
        alt={alt}
        className={styles.heroImage}
      />
      <div className={styles.heroGradient} />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className={styles.heroContent}
      >
        <h1 className={`font-bold ${styles.heroTitle}`}>
          {title}
        </h1>
        <p className={subtitleClassName}>
          {subtitle}
        </p>
      </motion.div>
    </section>
  );
}
