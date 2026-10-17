import { Play } from '@phosphor-icons/react';
import sharedStyles from './CaseStudy.module.css';

export default function PlayButton({ href, label, styles }) {
  return (
    <div className={sharedStyles.playBtnWrapper}>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.playBtn}
      >
        <Play size={24} weight="fill" color="#262626" className={sharedStyles.playIcon} />
        <span className={styles.playLabel}>{label}</span>
      </a>
    </div>
  );
}
