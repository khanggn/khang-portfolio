import ShowcasePanel from '../../components/ShowcasePanel';
import ImageToggle from '../../components/ImageToggle';
import BrowserFrame from '../../components/BrowserFrame';

const decision01Slides = [
  {
    src: '/images/wcasl/registration-before.png',
    label: 'Before: AREENA App Banner',
    alt: 'Old WCASL registration flow sending users to the AREENA app',
  },
  {
    src: '/images/wcasl/registration-after.png',
    label: 'After: New Registration Page',
    alt: 'New WCASL step-by-step registration page for new and returning players',
  },
];

const decision02Slides = [
  {
    src: '/images/wcasl/game-sheet.png',
    label: 'Recordings Spreadsheet',
    alt: 'Google Sheet listing WCASL game recordings with teams, dates, and fields',
  },
  {
    src: '/images/wcasl/game-cards.png',
    label: 'Game Video Page',
    alt: 'Custom match cards built in Squarespace that were eventually scrapped',
  },
];

const decision04Slides = [
  {
    src: '/images/wcasl/palette-initial.png',
    label: 'Initial Color Palette',
    alt: 'Initial WCASL color palette derived from the league logo',
  },
  {
    src: '/images/wcasl/palette-final.png',
    label: 'Approved Branding Style',
    alt: 'Final approved WCASL branding style and color palette',
  },
];

export default function KeyDecisions({ styles }) {
  return (
    <div id="key-decisions" className={styles.section}>
      <h2 className={`gradient-shimmer ${styles.sectionHeading}`}>
        Key Decisions
      </h2>

      {/* Decision 01 */}
      <div className={styles.sectionBody}>
        <h3 className={styles.subsectionHeadingFlex}>
          1. Rebuilding registration after losing AREENA
        </h3>
        <div className={styles.decisionParagraphs}>
          <p>
            When we started, the league ran everything through AREENA, a league management app that handled player info, payments, and schedules. The website was built around it. We embedded AREENA's schedules on the site, and anyone who wanted to register was sent to the app store to create an account.
          </p>
          <p>
            Then we learned the league could no longer use AREENA. Everything embedded from it stopped working on a site that was already live.
          </p>
          <p>
            We moved quickly to replace every part of the site that relied on it. The biggest change was registration. Instead of sending people to an app, we created a step-by-step registration page with separate paths for new and returning players.
          </p>
        </div>
        <ShowcasePanel>
          <ImageToggle
            options={decision01Slides.map((slide) => ({
              label: slide.label,
              content: (
                <BrowserFrame noControls>
                  <img src={slide.src} alt={slide.alt} className={styles.showcaseImageBordered} />
                </BrowserFrame>
              ),
            }))}
          />
        </ShowcasePanel>
      </div>

      {/* Decision 02 */}
      <div className={`${styles.sectionBody} ${styles.subsectionSpacingLg}`}>
        <h3 className={styles.subsectionHeadingFlex}>
          2. Choosing a simpler solution for game videos
        </h3>
        <div className={styles.decisionParagraphs}>
          <p>
            The commissioner kept a Google Sheet of game recordings, listing the teams, date, and field for each match. I wanted players to be able to find and rewatch their games directly on the website instead of searching through a spreadsheet.
          </p>
          <p>
            Squarespace had no component for this, so I built the match cards with custom code and worked on the page for about two to three months. Eventually I realized it wasn't sustainable. Squarespace can't connect to Google Sheets, so every new recording meant adding a card by hand, and the commissioner couldn't keep it updated without me.
          </p>
          <p>
            We scrapped the page and linked directly to the Google Sheet instead. It was a less exciting solution, but one the league can maintain on its own.
          </p>
        </div>
        <ShowcasePanel>
          <ImageToggle
            options={decision02Slides.map((slide) => ({
              label: slide.label,
              content: (
                <img src={slide.src} alt={slide.alt} className={styles.showcaseImage} />
              ),
            }))}
          />
        </ShowcasePanel>
      </div>

      {/* Decision 03 */}
      <div className={`${styles.sectionBody} ${styles.subsectionSpacingLg}`}>
        <h3 className={styles.subsectionHeadingFlex}>
          3. Adding a Health &amp; Wellness page
        </h3>
        <div className={styles.decisionParagraphs}>
          <p>
            WCASL partners with local health practitioners, including Goswami Clinic, a regenerative medicine clinic. The old site never mentioned them. Current players may have known, but new players had no way to find out. We saw these partnerships as a reason for someone to join, so the three of us proposed a Health &amp; Wellness page. I built the page's custom sections, including the article previews and the Instagram Reels carousel. The commissioner loved how the page turned out and is excited for more players to take advantage of these partnerships.
          </p>
        </div>
        <ShowcasePanel equalPadding>
          <img
            src="/images/wcasl/health-page.png"
            alt="WCASL Health & Wellness page showing partnership information, article previews, and Instagram Reels carousel"
            className={styles.blockImage}
          />
        </ShowcasePanel>
      </div>

      {/* Decision 04 */}
      <div className={`${styles.sectionBody} ${styles.subsectionSpacingLg}`}>
        <h3 className={styles.subsectionHeadingFlex}>
          4. Letting the client lead on color
        </h3>
        <div className={styles.decisionParagraphs}>
          <p>
            We originally wanted to pull colors from the league's logo so everything would match. The team liked the idea, but the commissioner didn't like those colors, even though they came from his own logo. We could push for consistency with the logo or create a palette he was happy with. Since it's his league, we developed a new palette, which he approved.
          </p>
        </div>
        <ShowcasePanel>
          <ImageToggle
            options={decision04Slides.map((slide) => ({
              label: slide.label,
              content: (
                <img src={slide.src} alt={slide.alt} className={styles.blockImage} />
              ),
            }))}
          />
        </ShowcasePanel>
      </div>
    </div>
  );
}
