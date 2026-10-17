import { SkipBack, SkipForward } from '@phosphor-icons/react';

export default function MobileBar({ styles, tocSections, activeSection, scrollProgress, handlePrevSection, handleNextSection, prefersReduced }) {
  return (
    <div className={`wcasl-mobile-bar ${styles.mobileBar}`}>
      {/* Prev */}
      <button
        onClick={handlePrevSection}
        aria-label="Previous section"
        disabled={tocSections.findIndex(s => s.id === activeSection) === 0}
        className={styles.mobileBarBtn}
        style={{
          cursor: tocSections.findIndex(s => s.id === activeSection) === 0 ? 'default' : 'pointer',
          color: tocSections.findIndex(s => s.id === activeSection) === 0 ? 'rgba(255,255,255,0.2)' : '#E8E8E3',
        }}
      >
        <SkipBack size={18} weight="fill" />
      </button>

      {/* Section name + progress */}
      <div className={styles.mobileBarSection}>
        <span className={styles.mobileBarLabel}>
          {tocSections.find(s => s.id === activeSection)?.label || ''}
        </span>
        <div
          role="progressbar"
          aria-valuenow={Math.round(scrollProgress)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Reading progress"
          className={styles.mobileBarProgress}
        >
          <div
            className={styles.mobileBarProgressFill}
            style={{
              width: `${scrollProgress}%`,
              transition: prefersReduced ? 'none' : 'width 0.15s linear',
            }}
          />
        </div>
      </div>

      {/* Next */}
      <button
        onClick={handleNextSection}
        aria-label="Next section"
        disabled={tocSections.findIndex(s => s.id === activeSection) === tocSections.length - 1}
        className={styles.mobileBarBtn}
        style={{
          cursor: tocSections.findIndex(s => s.id === activeSection) === tocSections.length - 1 ? 'default' : 'pointer',
          color: tocSections.findIndex(s => s.id === activeSection) === tocSections.length - 1 ? 'rgba(255,255,255,0.2)' : '#E8E8E3',
        }}
      >
        <SkipForward size={18} weight="fill" />
      </button>
    </div>
  );
}
