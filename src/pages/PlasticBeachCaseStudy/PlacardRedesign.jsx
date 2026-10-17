import { motion } from 'framer-motion';

export default function PlacardRedesign({ styles, prefersReduced }) {
  return (
    <div id="placard-redesign" className={styles.section}>
      <motion.h2
        className={`gradient-shimmer ${styles.sectionHeading}`}
        initial={prefersReduced ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        Placard Redesign
      </motion.h2>

      {/* Problem */}
      <motion.div
        initial={prefersReduced ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className={styles.sectionBody}
      >
        <h3 className={styles.subsectionHeading}>Problem</h3>
        <div className={styles.bodyParagraphs}>
          <p>
            Business partners were placing incorrect materials in soft plastic collection bins. The existing placard, meant to guide sorting decisions at partner locations, scored 6.3/10 from users and was consistently described as text-heavy, visually overwhelming, and hard to scan under real workplace conditions.
          </p>
        </div>

        {/* Annotated old placard */}
        <div className={styles.annotatedContainer}>
          <img
            src="/images/plasticbeach/old-placard.jpg"
            alt="Original Plastic Beach sorting placard"
            className={styles.annotatedImage}
          />

          {/* Annotation: Top right - hard to read title */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className={`gradient-text ${styles.annotationRight}`}
            style={{ top: '3%', transform: 'rotate(-4deg)' }}
          >
            Colors clash, title font <br/>is hard to read
          </motion.div>

          {/* Annotation: Top left - inconsistent alignment */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            viewport={{ once: true }}
            className={`gradient-text ${styles.annotationLeft}`}
            style={{ top: '3%', transform: 'rotate(3deg)' }}
          >
            Inconsistent spacing and <br/>alignment across sections
          </motion.div>

          {/* Annotation: Left - crammed label */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className={`gradient-text ${styles.annotationLeft}`}
            style={{ top: '42%', transform: 'rotate(-3deg)' }}
          >
            Too many items crammed <br/>into one label
          </motion.div>

          {/* Annotation: Left - too much text */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className={`gradient-text ${styles.annotationLeft}`}
            style={{ top: '75%', transform: 'rotate(-2deg)' }}
          >
            Too much text, <br/> too small to read
          </motion.div>

          {/* Annotation: Right - overwhelming do not include */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            viewport={{ once: true }}
            className={`gradient-text ${styles.annotationRight}`}
            style={{ top: '40%', transform: 'rotate(3deg)' }}
          >
            Overwhelming "Do <br/>Not Include" list
          </motion.div>

          {/* Annotation: Bottom right - confusing symbols */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            viewport={{ once: true }}
            className={`gradient-text ${styles.annotationRight}`}
            style={{ top: '80%', transform: 'rotate(2deg)' }}
          >
            Store drop-off symbol <br/> is confusing
          </motion.div>
        </div>

        <p className={styles.imageCaption}>
          The original sorting placard with annotations with our team's initial observations
        </p>
      </motion.div>

      {/* Outcome */}
      <motion.div
        initial={prefersReduced ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className={`${styles.sectionBody} ${styles.subsectionSpacingLg}`}
      >
        <h3 className={styles.subsectionHeading}>Outcome</h3>
        <div className={styles.bodyParagraphs}>
          <p>
            All four business partners surveyed after launch rated the redesigned placard clear and helpful. 8 out of 10 general public participants sorted plastics correctly in a task-based usability test, compared to a <strong style={{ color: '#C4B5FD' }}>6.3/10 baseline</strong> on the original. The project also produced a brand style guide giving Plastic Beach a reusable system applicable to social media and the website redesign.
          </p>
        </div>
      </motion.div>

      {/* Solution */}
      <motion.div
        initial={prefersReduced ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className={`${styles.sectionBody} ${styles.subsectionSpacingLg}`}
      >
        <h3 className={styles.subsectionHeading}>Solution</h3>
        <div className={styles.bodyParagraphs}>
          <p>
            A visual-first placard that removed the exhaustive "do not include" list and replaced it with a single decision rule: the <strong style={{ color: '#C4B5FD' }}>Stretch Test</strong>. Accepted plastic types display as a labeled illustration grid. A QR code routes edge-case questions to the website.
          </p>
        </div>

        {/* Final placard image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className={styles.annotatedContainer}
          style={{ marginTop: '48px' }}
        >
          <img
            src="/images/plasticbeach/final-placard.png"
            alt="Redesigned Plastic Beach sorting placard"
            className={styles.annotatedImage}
          />
          <p className={styles.imageCaption} style={{ maxWidth: '100%' }}>
            The redesigned sorting placard
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
