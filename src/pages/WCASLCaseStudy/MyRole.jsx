import { motion } from 'framer-motion';
import ShowcasePanel from '../../components/case-study/ShowcasePanel';
import ImageToggle from '../../components/case-study/ImageToggle';

export default function MyRole({ styles, prefersReduced }) {
  return (
    <div id="my-role" className={styles.section}>
      <motion.h2
        className={`gradient-shimmer ${styles.sectionHeading}`}
        initial={prefersReduced ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        My Role
      </motion.h2>

      <motion.p
        initial={prefersReduced ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className={styles.roleIntro}
      >
        I worked as a UI/UX designer on a team of 7. After the original project ended in August 2025, three of us, including me, stayed on to keep improving and expanding the site.
      </motion.p>

      {/* Research and planning */}
      <motion.div
        initial={prefersReduced ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className={styles.sectionBody}
      >
        <h3 className={styles.subsectionHeading}>Research and planning</h3>
        <ul className={styles.bulletList}>
          <li>Created two user personas representing the league's main audiences: a new player looking to join and a longtime player checking his weekly schedule</li>
          <li>Mapped user flows for the two main audiences: new players joining the league and current players checking their match schedule</li>
        </ul>
        <div className={styles.showcaseWrapper}>
          <ShowcasePanel>
            <ImageToggle
              options={[
                {
                  label: 'Personas',
                  content: (
                    <img
                      src="/images/wcasl/personas.png"
                      alt="User personas for WCASL representing a new player and a returning player"
                      className={styles.showcaseImage}
                    />
                  ),
                },
                {
                  label: 'User Flows',
                  content: (
                    <img
                      src="/images/wcasl/userflow.png"
                      alt="User flow diagram showing paths for new and returning WCASL players"
                      className={styles.showcaseImage}
                    />
                  ),
                },
              ]}
            />
          </ShowcasePanel>
        </div>
      </motion.div>

      {/* Design */}
      <motion.div
        initial={prefersReduced ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className={`${styles.sectionBody} ${styles.subsectionSpacing}`}
      >
        <h3 className={styles.subsectionHeading}>Design</h3>
        <ul className={styles.bulletList}>
          <li>Explored color palettes to give the league a consistent visual identity</li>
          <li>Designed the navigation bar and footer, taking them from lo-fi wireframes to hi-fi designs that matched the new branding</li>
        </ul>
        <div className={styles.showcaseWrapper}>
          <ShowcasePanel>
            <ImageToggle
              wipe
              options={[
                {
                  label: 'Low Fidelity',
                  content: (
                    <img
                      src="/images/wcasl/lofi-home.png"
                      alt="Lo-fi wireframes of the WCASL Home, About, and Membership pages"
                      className={styles.blockImage}
                    />
                  ),
                },
                {
                  label: 'High Fidelity',
                  content: (
                    <img
                      src="/images/wcasl/hifi-home.png"
                      alt="Hi-fi designs of the WCASL Home, About, and Membership pages"
                      className={styles.blockImage}
                    />
                  ),
                },
              ]}
            />
          </ShowcasePanel>
        </div>
      </motion.div>

      {/* Build and maintenance */}
      <motion.div
        initial={prefersReduced ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className={`${styles.sectionBody} ${styles.subsectionSpacing}`}
      >
        <h3 className={styles.subsectionHeading}>Build and maintenance</h3>
        <ul className={styles.bulletList}>
          <li>Built our hi-fi designs in Squarespace for launch</li>
          <li>Since launch, I've maintained the site with two teammates and added new pages, including Health &amp; Wellness, Donate, and Contact</li>
          <li>The design kept evolving after hi-fi. Iteration and feedback from the league shaped the live site, so it differs from our original designs</li>
        </ul>
        <div className={styles.showcaseWrapper}>
          <ShowcasePanel equalPadding>
            <img
              src="/images/wcasl/live-home.png"
              alt="Live WCASL website screenshots of the Home, About, and Membership pages"
              className={styles.blockImage}
            />
          </ShowcasePanel>
        </div>
      </motion.div>
    </div>
  );
}
