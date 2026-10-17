import ShowcasePanel from '../../components/ShowcasePanel';
import ImageToggle from '../../components/ImageToggle';
import BrowserFrame from '../../components/BrowserFrame';

const learnedSlides = [
  {
    src: '/images/wcasl/health-articles.png',
    label: 'Article Previews',
    alt: 'Health & Wellness page with embedded article previews',
  },
  {
    src: '/images/wcasl/health-reels.png',
    label: 'Instagram Reels Carousel',
    alt: 'Health & Wellness page with Instagram Reels carousel',
  },
];

export default function WhatILearned({ styles }) {
  return (
    <div id="what-i-learned" className={styles.section}>
      <h2 className={`gradient-shimmer ${styles.sectionHeading}`}>
        What I Learned Along the Way
      </h2>

      {/* Subsection 1 — full-width layout */}
      <div className={styles.sectionBody}>
        <h3 className={styles.subsectionHeading}>
          Clear enough to act on, simple enough for everyone
        </h3>
        <p className={styles.learnedParagraph}>
          Every page needed enough detail that players knew exactly what to do next, while staying simple enough for someone who rarely uses websites. Finding that balance was one of the biggest challenges of the project.
        </p>
        <p className={styles.learnedParagraph}>Two changes made the biggest difference:</p>

        {/* Two-column takeaways */}
        <div className="learned-columns" style={{ display: 'flex', gap: '24px', marginBottom: '32px' }}>
          <div className={styles.learnedColumnItem}>
            <h4 className={styles.subsectionHeadingSmall}>
              1. Button size matches importance
            </h4>
            <p>The most important actions, like registering, got the largest buttons so players could get straight to what they came for.</p>
          </div>
          <div className={styles.learnedColumnItem}>
            <h4 className={styles.subsectionHeadingSmall}>
              2. Higher-contrast color combinations
            </h4>
            <p>We avoided light text on light backgrounds, a problem all over the old site, so every page stays easy to read.</p>
          </div>
        </div>

        {/* Screenshot */}
        <ShowcasePanel equalPadding>
          <BrowserFrame noControls>
            <img
              src="/images/wcasl/new-annotated.png"
              alt="New WCASL site with large buttons and high-contrast text highlighted"
              className={styles.showcaseImageBordered}
            />
          </BrowserFrame>
        </ShowcasePanel>
      </div>

      {/* Subsection 2 — full-width layout */}
      <div className={`${styles.sectionBody} ${styles.subsectionSpacingLg}`}>
        <h3 className={styles.subsectionHeading}>
          Learning Squarespace from scratch
        </h3>
        <p className={styles.learnedParagraphLg}>
          I had never used Squarespace before this project, so I learned it as I went. It made some things easy, but its layout options were limited. Squarespace does support custom code, so I used my programming background to fill the gaps. On the Health &amp; Wellness page, I embedded the clinic's articles with iframes, since Squarespace couldn't format them on its own. I also coded a custom carousel of the doctor's Instagram Reels, so interested players can see the clinic in action.
        </p>

        <ShowcasePanel>
          <ImageToggle
            options={learnedSlides.map((slide) => ({
              label: slide.label,
              content: (
                <BrowserFrame noControls>
                  <img
                    src={slide.src}
                    alt={slide.alt}
                    className={styles.showcaseImageBordered}
                  />
                </BrowserFrame>
              ),
            }))}
          />
        </ShowcasePanel>
      </div>
    </div>
  );
}
