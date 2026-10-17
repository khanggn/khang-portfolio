import { motion } from 'framer-motion';

export default function Results({ styles }) {
  return (
    <div id="results" className={styles.section}>
      <motion.h2
        className={`gradient-shimmer ${styles.sectionHeading}`}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        Results
      </motion.h2>

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
            8/10
          </span>
          <span className={styles.resultsStatLabel}>
            sorting accuracy in usability test
          </span>
        </div>

        <div className={`results-divider ${styles.resultsDivider}`} />

        <div className={styles.resultsStat}>
          <span className={styles.resultsStatValue}>
            4/4
          </span>
          <span className={styles.resultsStatLabel}>
            partners rated placard clear
          </span>
        </div>

        <div className={`results-divider ${styles.resultsDivider}`} />

        <div className={styles.resultsStat}>
          <span className={styles.resultsStatValue}>
            1
          </span>
          <span className={styles.resultsStatLabel}>
            brand style guide delivered
          </span>
        </div>
      </motion.div>

      <ul className={styles.resultsBullets}>
        <li>Sorting accuracy improved from 6.3/10 to 8/10 in task-based usability tests</li>
        <li>All four surveyed business partners rated the redesigned placard clear and helpful</li>
        <li>Brand style guide gives Plastic Beach a reusable system for social media and future materials</li>
      </ul>
    </div>
  );
}
