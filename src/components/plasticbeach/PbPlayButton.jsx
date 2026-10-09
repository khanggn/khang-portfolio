import { Play } from '@phosphor-icons/react';
import styles from '../../pages/PlasticBeachCaseStudy.module.css';

export default function PbPlayButton() {
  return (
    <div className={styles.playBtnWrapper}>
      <a
        href="https://www.plastic-beach.com/"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.playBtn}
      >
        <Play size={24} weight="fill" color="#262626" className={styles.playIcon} />
        <span className={styles.playLabel}>Go to Site</span>
      </a>
    </div>
  );
}
