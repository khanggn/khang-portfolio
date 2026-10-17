import { motion, AnimatePresence } from 'framer-motion';
import { SkipBack, SkipForward } from '@phosphor-icons/react';

export default function Sidebar({ styles, tocSections, activeSection, isScrollingRef, scrollToSection, scrollProgress, handlePrevSection, handleNextSection }) {
  return (
    <aside className="wcasl-toc-sidebar">
      <div className={styles.sidebarSticky}>
        <nav aria-label="Case study sections" style={{ width: '100%' }}>
          <div className={styles.sidebarCard}>

            {/* Section list */}
            <ul className={styles.tocList}>
              {tocSections.map((section) => {
                const isActive = activeSection === section.id;
                return (
                  <li key={section.id} className={styles.tocItem}>
                    <a
                      href={`#${section.id}`}
                      aria-current={isActive ? 'true' : undefined}
                      onClick={(e) => { e.preventDefault(); if (!isScrollingRef.current) scrollToSection(section.id); }}
                      className={styles.tocLink}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        borderLeft: 'none',
                        paddingLeft: 0,
                      }}
                    >
                      <AnimatePresence>
                        {isActive && (
                          <motion.img
                            src="/images/shared/ditto-separator.png"
                            alt=""
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: 'easeOut' }}
                            style={{
                              width: 24,
                              height: 16,
                              flexShrink: 0,
                            }}
                          />
                        )}
                      </AnimatePresence>
                      <span
                        className={styles.tocLinkText}
                        style={{
                          color: isActive ? '#C4B5FD' : 'rgba(255,255,255,0.5)',
                        }}
                        onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.color = '#E8E8E3'; }}
                        onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; }}
                      >
                        {section.num} · {section.label}
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>

            {/* Player controls — progress bar + prev/next */}
            <div>
              {/* Progress bar */}
              <div className={styles.progressWrapper}>
                <div
                  role="progressbar"
                  aria-valuenow={Math.round(scrollProgress)}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label="Reading progress"
                  className={styles.progressTrack}
                >
                  <div
                    className={styles.progressFill}
                    style={{ width: `${scrollProgress}%` }}
                  />
                </div>
              </div>

              <div className={styles.playerControls}>
                <button
                  onClick={handlePrevSection}
                  aria-label="Previous section"
                  disabled={tocSections.findIndex(s => s.id === activeSection) === 0}
                  className={styles.skipBtn}
                  style={{
                    cursor: tocSections.findIndex(s => s.id === activeSection) === 0 ? 'default' : 'pointer',
                    color: tocSections.findIndex(s => s.id === activeSection) === 0 ? 'rgba(255,255,255,0.2)' : '#E8E8E3',
                  }}
                  onMouseEnter={(e) => {
                    if (!e.currentTarget.disabled) {
                      e.currentTarget.style.color = '#C4B5FD';
                      e.currentTarget.style.filter = 'drop-shadow(0 0 8px rgba(196, 181, 253, 0.6))';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!e.currentTarget.disabled) {
                      e.currentTarget.style.color = '#E8E8E3';
                      e.currentTarget.style.filter = 'drop-shadow(0 0 0px rgba(196, 181, 253, 0))';
                    }
                  }}
                >
                  <SkipBack size={22} weight="fill" />
                </button>
                <button
                  onClick={handleNextSection}
                  aria-label="Next section"
                  disabled={tocSections.findIndex(s => s.id === activeSection) === tocSections.length - 1}
                  className={styles.skipBtn}
                  style={{
                    cursor: tocSections.findIndex(s => s.id === activeSection) === tocSections.length - 1 ? 'default' : 'pointer',
                    color: tocSections.findIndex(s => s.id === activeSection) === tocSections.length - 1 ? 'rgba(255,255,255,0.2)' : '#E8E8E3',
                  }}
                  onMouseEnter={(e) => {
                    if (!e.currentTarget.disabled) {
                      e.currentTarget.style.color = '#C4B5FD';
                      e.currentTarget.style.filter = 'drop-shadow(0 0 8px rgba(196, 181, 253, 0.6))';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!e.currentTarget.disabled) {
                      e.currentTarget.style.color = '#E8E8E3';
                      e.currentTarget.style.filter = 'drop-shadow(0 0 0px rgba(196, 181, 253, 0))';
                    }
                  }}
                >
                  <SkipForward size={22} weight="fill" />
                </button>
              </div>
            </div>

          </div>
        </nav>
      </div>
    </aside>
  );
}
