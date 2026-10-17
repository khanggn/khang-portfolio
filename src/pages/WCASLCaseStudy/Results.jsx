import { motion } from 'framer-motion';
import AnimatedNumber from '../../components/case-study/AnimatedNumber';

export default function Results({ styles }) {
  return (
    <div id="results" className={styles.section}>
      <h2 className={`gradient-shimmer ${styles.sectionHeading}`}>
        Results
      </h2>

      {/* Stat row */}
      <motion.div
        className={`results-stats ${styles.resultsStatRow}`}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className={styles.resultsStat}>
          <span className={styles.resultsStatValue}>
            <AnimatedNumber value={7500} suffix="+" />
          </span>
          <span className={styles.resultsStatLabel}>
            visits so far in 2026
          </span>
        </div>

        <div className={`results-divider ${styles.resultsDivider}`} />

        <div className={styles.resultsStat}>
          <span className={styles.resultsStatValue}>
            <AnimatedNumber value={800} suffix="+" />
          </span>
          <span className={styles.resultsStatLabel}>
            players across four divisions
          </span>
        </div>

        <div className={`results-divider ${styles.resultsDivider}`} />

        <div className={styles.resultsStat}>
          <span className={styles.resultsStatValue}>
            <AnimatedNumber value={3} />
          </span>
          <span className={styles.resultsStatLabel}>
            new pages added since launch
          </span>
        </div>
      </motion.div>

      {/* Bullets */}
      <ul className={styles.resultsBullets}>
        <li>Registration kept working after the switch away from AREENA, with clear steps for new and returning players</li>
        <li>Testimonials from current players help new visitors see the league is legit</li>
        <li>The Health &amp; Wellness page connects players with the league's health partners for the first time</li>
        <li>The commissioner kept three of us on after the original project ended, and I continue to maintain and expand the site</li>
      </ul>
    </div>
  );
}
