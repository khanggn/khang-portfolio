import { motion } from 'framer-motion';

export default function WhatIdDoDifferently({ styles }) {
  return (
    <div id="what-id-do-differently" className={styles.section}>
      <h2 className={`gradient-shimmer ${styles.sectionHeading}`}>
        What I'd Do Differently
      </h2>

      <div>
        {/* Row 01 */}
        <motion.div
          className={`differently-row ${styles.differentlyRow}`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className={`differently-left ${styles.differentlyLeft}`}>
            <span className={styles.differentlyNum}>01</span>
            <h3 className={styles.differentlyTitle}>
              Find another way to test when players don't respond
            </h3>
          </div>
          <div className={`differently-right ${styles.differentlyRight}`}>
            <p className={styles.differentlyText}>
              We asked the commissioner to help recruit players for usability testing, but no one took part. Looking back, I should have tested with people outside the league who fit the audience, like family members or family friends over 30, so we had some feedback before launch. This problem later inspired{' '}
              <a
                href="https://devpost.com/software/agent-ux"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.agentuxLink}
              >
                AgentUX
              </a>
              , a hackathon project where AI agents simulate users to catch usability issues when real testers aren't available.
            </p>
          </div>
        </motion.div>

        {/* Row 02 */}
        <motion.div
          className={`differently-row ${styles.differentlyRow}`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className={`differently-left ${styles.differentlyLeft}`}>
            <span className={styles.differentlyNum}>02</span>
            <h3 className={styles.differentlyTitle}>
              Check what the platform can handle before building
            </h3>
          </div>
          <div className={`differently-right ${styles.differentlyRight}`}>
            <p className={styles.differentlyText}>
              I spent two to three months on the game videos page before realizing Squarespace couldn't keep it updated. Now I'd ask early on whether a feature can run without me.
            </p>
          </div>
        </motion.div>

        {/* Row 03 */}
        <motion.div
          className={`differently-row ${styles.differentlyRow}`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className={`differently-left ${styles.differentlyLeft}`}>
            <span className={styles.differentlyNum}>03</span>
            <h3 className={styles.differentlyTitle}>
              Avoid relying on a single outside service
            </h3>
          </div>
          <div className={`differently-right ${styles.differentlyRight}`}>
            <p className={styles.differentlyText}>
              When the league stopped using AREENA, a lot of the site broke at once. I'd keep essential information, like how to register, on the site itself.
            </p>
          </div>
        </motion.div>

        {/* Row 04 */}
        <motion.div
          className={`differently-row ${styles.differentlyRowLast}`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className={`differently-left ${styles.differentlyLeft}`}>
            <span className={styles.differentlyNum}>04</span>
            <h3 className={styles.differentlyTitle}>
              Get the client's input earlier
            </h3>
          </div>
          <div className={`differently-right ${styles.differentlyRight}`}>
            <p className={styles.differentlyText}>
              We built a palette around the logo before checking how the commissioner felt about those colors. Asking first would have saved us a round of work.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
