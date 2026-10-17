import { motion } from 'framer-motion';
import ScreenshotPanel from '../../components/ScreenshotPanel';

const problemSlides = [
  {
    src: '/images/wcasl/old-divisions.png',
    label: 'Divisions Page',
    alt: 'Old WCASL Divisions page',
  },
  {
    src: '/images/wcasl/old-home.png',
    label: 'Home Page',
    alt: 'Old WCASL Homepage',
  },
  {
    src: '/images/wcasl/old-about.png',
    label: 'About Page',
    alt: 'Old WCASL About page',
  },
];

export default function WhereWeStarted({ styles, prefersReduced }) {
  return (
    <div id="where-we-started" className={styles.sectionAnchor}>
      <motion.h2
        className={`gradient-shimmer ${styles.sectionHeading}`}
        initial={prefersReduced ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        Where We Started
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
            Dave Rice runs the West Coast Adult Soccer League (WCASL), a recreational league in South Orange County founded in 2009. It has over 800 players across four divisions: 30+ Competitive, 45+ Veterans, 55+ Senior, and Coed Recreational.
          </p>
          <p>
            The league's old website felt unfinished and offered little beyond the basics. Some pages still had template placeholder text. The Divisions page described a basketball league in North Dallas. Dave wanted the new site to be the league's central hub, a place where current players could find what they needed and new players could learn how to join.
          </p>
          <p>
            The audience was the other key factor. With most players over 30, the site had to be clear and easy to navigate for people less comfortable online.
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={prefersReduced ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className={styles.subsectionSpacing}
      >
        <ScreenshotPanel slides={problemSlides} />
      </motion.div>
    </div>
  );
}
