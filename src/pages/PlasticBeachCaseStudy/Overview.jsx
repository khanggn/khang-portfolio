import { motion } from 'framer-motion';

export default function Overview({ styles, prefersReduced }) {
  return (
    <div id="overview" className={styles.sectionAnchor}>
      <motion.h2
        className={`gradient-shimmer ${styles.sectionHeading}`}
        initial={prefersReduced ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        Overview
      </motion.h2>

      <motion.div
        initial={prefersReduced ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className={styles.bodyNarrow}
      >
        <div className={`${styles.sectionBody} ${styles.bodyParagraphs}`}>
          <p>
            Plastic Beach is a 501(c)(3) nonprofit based in Encinitas, CA, facilitating soft plastic recycling across 40+ business partners and six community collection sites. Despite a clear mission and real operational impact (250,000+ pounds diverted from landfills), their materials weren't keeping up. They had no brand style guide, no consistent visual language, and two failing touchpoints:
          </p>
          <ul style={{ paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <li>A <strong style={{ color: '#C4B5FD' }}>sorting placard</strong> that business partners couldn't use effectively</li>
            <li>A <strong style={{ color: '#C4B5FD' }}>website</strong> that left visitors confused about what Plastic Beach actually does and how to get involved</li>
          </ul>
          <p>
            Our team of five, through Design for America at UC San Diego, took on both. We built a design system first, then applied it to the placard and the website across a 13-week project.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
