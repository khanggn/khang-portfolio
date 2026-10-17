import { motion } from 'framer-motion';
import { ArrowRight, ArrowDown } from 'lucide-react';

export default function IdeasThatChanged({ styles }) {
  return (
    <div id="ideas-that-changed" className={styles.section}>
      <h2 className={`gradient-shimmer ${styles.sectionHeading}`}>
        Ideas That Changed Along the Way
      </h2>
      <div
        className="ideas-cards"
        style={{ display: 'flex', alignItems: 'stretch', gap: '0px' }}
      >
        {/* Card 1 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={styles.ideasCard}
        >
          <span className={styles.ideasCardLabel}>
            At First
          </span>
          <p className={styles.ideasCardText}>
            Early on, we suggested adding a donation page, since WCASL is a nonprofit league. The commissioner decided against it because he didn't want to ask players for money, so we set the idea aside.
          </p>
        </motion.div>

        {/* Arrow */}
        <div className={`ideas-arrow ${styles.ideasArrow}`}>
          <ArrowRight className="ideas-arrow-horizontal" size={24} color="#9D92C8" />
          <ArrowDown className="ideas-arrow-vertical" size={24} color="#9D92C8" style={{ display: 'none' }} />
        </div>

        {/* Card 2 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className={styles.ideasCard}
        >
          <span className={styles.ideasCardLabel}>
            Later
          </span>
          <p className={styles.ideasCardText}>
            After one of the league's players passed away, the commissioner asked us to create a page where the community could donate to the player's family. We built the Donate page the next day, giving the league a simple way to support the family when it mattered most.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
