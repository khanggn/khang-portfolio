import { motion } from 'framer-motion';
import { PenTool, AppWindow, Code } from 'lucide-react';
import PlayButton from '../../components/case-study/PlayButton';
import AnimatedNumber from '../../components/case-study/AnimatedNumber';
import ToolChip from '../../components/case-study/ToolChip';

export default function GlanceSection({ styles, prefersReduced, openTooltipId, setOpenTooltipId, scrollToSection }) {
  return (
    <>
      <PlayButton href="https://www.plastic-beach.com/" label="Go to Site" styles={styles} />

      {/* Hero stats */}
      <div className={`glance-stats ${styles.glanceStats}`}>
        <div>
          <span className={`gradient-shimmer ${styles.statValue}`}>
            <AnimatedNumber value={250000} suffix="+" />
          </span>
          <span className={styles.statLabel}>
            lbs of plastic diverted
          </span>
        </div>

        <div>
          <span className={`gradient-shimmer ${styles.statValue}`}>
            <AnimatedNumber value={40} suffix="+" />
          </span>
          <span className={styles.statLabel}>
            business partners
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
            <p className={styles.summaryParagraph}>Plastic Beach had no brand style guide, no consistent visual language, and two failing touchpoints: a sorting placard that business partners couldn't use effectively, and a website that left visitors confused about what the org actually does.</p>
          </div>
          <div>
            <h3 className={styles.summaryHeading}>Solution</h3>
            <p className={styles.summaryParagraph}>We built a design system first, then applied it to a visual-first sorting placard and a clearer website, across a 13-week project through Design for America at UC San Diego.</p>
          </div>
          <div>
            <h3 className={styles.summaryHeading}>Impact</h3>
            <p className={styles.summaryParagraph}>8 out of 10 participants sorted plastics correctly in usability testing (up from 6.3/10 baseline). All four surveyed business partners rated the redesigned placard clear and helpful.</p>
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
                  href="#overview"
                  onClick={(e) => { e.preventDefault(); scrollToSection('overview'); }}
                  className={styles.roleLink}
                >
                  UI/UX Designer
                </a>
              ),
            },
            { label: 'Team', value: '5 Designers' },
            { label: 'Type', value: 'Product Design · UX Design · Web Redesign' },
            { label: 'Timeline', value: 'Apr 2025 – Jul 2025' },
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

          {/* Built with */}
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
                id="wix"
                icon={<AppWindow size={16} strokeWidth={1.75} color="#C4B5FD" />}
                label="Wix"
                tooltip="Site build & content management"
                isOpen={openTooltipId === 'wix'}
                onToggle={setOpenTooltipId}
                prefersReduced={prefersReduced}
                styles={styles}
              />
              <ToolChip
                id="code"
                icon={<Code size={16} strokeWidth={1.75} color="#C4B5FD" />}
                label="Custom code"
                tooltip="Custom HTML/CSS/JS beyond Wix's defaults"
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
