import { motion } from 'framer-motion';
import styles from '../../pages/PlasticBeachCaseStudy.module.css';

export default function PbHero() {
  return (
    <section className={styles.heroSection}>
      <img
        src="/images/projects/plasticbeach-hero.jpg"
        alt="PlasticBeach hero"
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
          PlasticBeach
        </h1>
        <p className={styles.heroSubtitle}>
          Redesigning recycling materials for a SoCal nonprofit cutting soft-plastic waste
        </p>
      </motion.div>
    </section>
  );
}
