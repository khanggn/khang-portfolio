import { motion } from 'framer-motion';
import { PenTool, AppWindow, Code } from 'lucide-react';
import PlayButton from '../../components/case-study/PlayButton';
import AnimatedNumber from '../../components/case-study/AnimatedNumber';
import ToolChip from '../../components/case-study/ToolChip';

export default function GlanceSection({ styles, prefersReduced, openTooltipId, setOpenTooltipId, scrollToSection }) {
  return (
    <>
      <PlayButton href="https://www.wcasl.org/" label="Go to Site" styles={styles} />

      {/* Hero stats */}
      <div className={`glance-stats ${styles.glanceStats}`}>
        <div>
          <span className={`gradient-shimmer ${styles.statValue}`}>
            <AnimatedNumber value={7500} suffix="+" />
          </span>
          <span className={styles.statLabel}>
            site visits in 2026
          </span>
        </div>

        <div>
          <span className={`gradient-shimmer ${styles.statValue}`}>
            <AnimatedNumber value={800} suffix="+" />
          </span>
          <span className={styles.statLabel}>
            players served
          </span>
        </div>
      </div>

      {/* Summary + Credits side by side */}
      <div className={`glance-body ${styles.glanceBody}`}>
        {/* Problem / Solution / Impact — 60% */}
        <motion.div
          className={`glance-summary ${styles.glanceSummary}`}
          initial={prefersReduced ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <div>
            <h3 className={styles.summaryHeading}>Problem</h3>
            <p className={styles.summaryParagraph}>WCASL's old website lacked key information for both current and prospective players. Since most players are over 30, the new site also needed to be easy to navigate for people less comfortable online.</p>
          </div>
          <div>
            <h3 className={styles.summaryHeading}>Solution</h3>
            <p className={styles.summaryParagraph}>Our team rebuilt the site in Squarespace with a clearer layout and more complete information, creating one hub for both new and returning players.</p>
          </div>
          <div>
            <h3 className={styles.summaryHeading}>Impact</h3>
            <p className={styles.summaryParagraph}>Live since August 2025, the site has had 7,500+ visits so far in 2026. The league's commissioner kept three of us on after the original project ended, and we continue to maintain and expand the site.</p>
          </div>
        </motion.div>

        {/* Credits — compact liner notes — 40% */}
        <motion.div
          className={`glance-credits ${styles.glanceCredits}`}
          initial={prefersReduced ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <span className={styles.creditsLabel}>
            Credits
          </span>
          {[
            {
              label: 'Role',
              value: (
                <a
                  href="#my-role"
                  onClick={(e) => { e.preventDefault(); scrollToSection('my-role'); }}
                  className={styles.roleLink}
                >
                  UI/UX Designer
                </a>
              ),
            },
            { label: 'Team', value: '7 designers' },
            { label: 'Type', value: 'Web Design · Product Design' },
            { label: 'Timeline', value: `${Math.max(1, (new Date().getFullYear() - 2025) * 12 + new Date().getMonth() - 3)}+ months` },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={prefersReduced ? false : { opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.35 + 0.08 * i }}
              className={styles.creditRow}
            >
              <span className={styles.creditLabel}>
                {item.label}
              </span>
              <span className={styles.creditValue}>
                {item.value}
              </span>
            </motion.div>
          ))}

          {/* Built with — stacked below credits */}
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.35 + 0.08 * 3 }}
            className={styles.builtWithWrapper}
          >
            <span className={styles.builtWithLabel}>
              Built with
            </span>
            <span className={styles.builtWithChips}>
              <ToolChip
                id="figma"
                icon={<PenTool size={16} strokeWidth={1.75} color="#C4B5FD" />}
                label="Figma"
                tooltip="Wireframes, mockups & prototypes"
                isOpen={openTooltipId === 'figma'}
                onToggle={setOpenTooltipId}
                prefersReduced={prefersReduced}
                styles={styles}
              />
              <ToolChip
                id="squarespace"
                icon={<AppWindow size={16} strokeWidth={1.75} color="#C4B5FD" />}
                label="Squarespace"
                tooltip="Site build & content management"
                isOpen={openTooltipId === 'squarespace'}
                onToggle={setOpenTooltipId}
                prefersReduced={prefersReduced}
                styles={styles}
              />
              <ToolChip
                id="code"
                icon={<Code size={16} strokeWidth={1.75} color="#C4B5FD" />}
                label="Custom code"
                tooltip="Custom HTML/CSS/JS beyond Squarespace's defaults"
                isOpen={openTooltipId === 'code'}
                onToggle={setOpenTooltipId}
                prefersReduced={prefersReduced}
                tooltipAlign="right"
                styles={styles}
              />
            </span>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}
