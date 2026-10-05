import { motion } from 'framer-motion';
import styles from '../../pages/WCASLCaseStudy.module.css';

export default function WcaslHero() {
  return (
    <section className={styles.heroSection}>
      <img
        src="/images/projects/wcaslPhotoCS.png"
        alt="West Coast Adult Soccer League hero"
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
          West Coast Adult Soccer League
        </h1>
        <p className={styles.heroSubtitle}>
          Website redesign for a recreational soccer league in South Orange County
        </p>
      </motion.div>
    </section>
  );
}
