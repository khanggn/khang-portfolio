import { motion } from 'framer-motion';

export default function WebsiteRedesign({ styles, prefersReduced }) {
  return (
    <div id="website-redesign" className={styles.section}>
      <motion.h2
        className={`gradient-shimmer ${styles.sectionHeading}`}
        initial={prefersReduced ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        Website Redesign
      </motion.h2>

      <motion.div
        initial={prefersReduced ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className={styles.bodyNarrow}
      >
        <div className={`${styles.sectionBody} ${styles.bodyParagraphs}`}>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontStyle: 'italic' }}>
            Coming soon — content in progress.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
