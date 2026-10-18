import { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { experience, education } from '../../data/experience';

// Subtle hand-drawn divider — mostly straight with tiny micro-wobbles,
// like a slightly shaky pen. Each seed gives a different line.
function HandDrawnLine({ seed = 0 }) {
  const paths = [
    'M0,4 C15,2 35,5.5 55,2.5 C75,5 95,1.5 120,4.5 C145,1.5 165,5.5 190,2 C215,5 240,1.5 265,4.5 C290,1.5 315,5.5 340,2.5 C365,5 390,1.5 415,4 C440,1.5 465,5 485,2.5 500,3.5',
    'M0,3 C20,5.5 45,1 70,4.5 C95,1 120,5.5 145,2 C170,5 200,1.5 225,4.5 C250,1 280,5.5 305,2.5 C330,5 360,1 385,4.5 C410,1.5 435,5 460,2 C480,5 495,2 500,3',
    'M0,3.5 C25,1 50,5.5 80,2 C105,5.5 130,1 155,4.5 C180,1 210,5 235,2.5 C260,5.5 290,1 315,4 C340,1.5 370,5.5 395,2.5 C420,5 445,1 470,4.5 C490,2 500,3.5',
    'M0,4.5 C20,1.5 45,5 70,2 C100,5.5 125,1 150,4.5 C175,1.5 205,5.5 230,2 C255,5 285,1.5 310,4 C335,1 365,5.5 390,2.5 C415,5 440,1.5 465,4.5 C485,2 500,3',
    'M0,2.5 C25,5.5 50,1 80,4.5 C110,1 135,5.5 160,2 C190,5 215,1.5 240,4 C270,1 295,5.5 320,2.5 C350,5 375,1 400,4.5 C425,1.5 455,5 480,2.5 500,3.5',
    'M0,3.5 C20,1 50,5 75,2.5 C100,5.5 130,1 155,4.5 C185,1.5 210,5 240,2 C265,5.5 295,1 320,4.5 C350,1 375,5.5 400,2 C430,5 455,1.5 480,4 500,3',
  ];
  return (
    <div style={{ position: 'relative', width: '100%', height: 6, overflow: 'visible' }}>
      <svg
        viewBox="0 0 500 6"
        preserveAspectRatio="none"
        style={{ position: 'absolute', left: 0, right: 0, top: 0, width: '100%', height: 6, display: 'block' }}
        aria-hidden="true"
      >
        <path
          d={paths[seed % paths.length]}
          fill="none"
          stroke="#4E4A5C"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

function useIsMobile(bp = 769) {
  const [mobile, setMobile] = useState(
    () => typeof window !== 'undefined' && window.innerWidth < bp,
  );
  useEffect(() => {
    const h = () => setMobile(window.innerWidth < bp);
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, [bp]);
  return mobile;
}

function OrgLink({ name, link }) {
  const [active, setActive] = useState(false);

  const style = {
    color: '#C4B5FD',
    textDecoration: active ? 'underline' : 'none',
    display: 'inline-flex',
    alignItems: 'center',
    gap: 2,
    outline: 'none',
    borderRadius: 2,
  };

  const focusOutline = {
    boxShadow: '0 0 0 2px rgba(196, 181, 253, 0.6)',
  };

  const arrow = (
    <ArrowUpRight
      size={14}
      style={{
        opacity: active ? 1 : 0,
        transform: active ? 'translate(0, 0)' : 'translate(-2px, 2px)',
        transition: 'opacity 0.15s, transform 0.15s',
      }}
    />
  );

  const handlers = {
    onMouseEnter: () => setActive(true),
    onMouseLeave: () => setActive(false),
    onFocus: () => setActive(true),
    onBlur: () => setActive(false),
  };

  if (!link) {
    return <span>{name}</span>;
  }

  if (link.startsWith('/')) {
    return (
      <Link
        to={link}
        style={{ ...style, ...(active ? focusOutline : {}) }}
        {...handlers}
      >
        {name}
        {arrow}
      </Link>
    );
  }

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      style={{ ...style, ...(active ? focusOutline : {}) }}
      {...handlers}
    >
      {name}
      {arrow}
    </a>
  );
}

function SquigglyDash() {
  return (
    <svg
      viewBox="0 0 24 6"
      preserveAspectRatio="none"
      aria-hidden="true"
      style={{
        width: 14,
        height: 6,
        display: 'inline-block',
        verticalAlign: 'middle',
        margin: '0 4px',
      }}
    >
      <path
        d="M0,3 C4,1.5 8,4.5 12,3 C16,1.5 20,4.5 24,3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ExperienceRow({ entry, index, isMobile, prefersReduced }) {
  const dateText = (
    <span>
      {entry.start} <SquigglyDash /> {entry.current ? (
        <span style={{ color: '#C4B5FD' }}>Present</span>
      ) : (
        entry.end
      )}
    </span>
  );

  const content = (
    <>
      <span style={{ fontWeight: 600, color: '#E8E8E3' }}>
        {entry.role}
      </span>
      {' at '}
      <OrgLink name={entry.org} link={entry.link} />
      <p style={{ margin: '4px 0 0', color: 'rgba(255,255,255,0.5)', fontSize: 14 }}>
        {entry.summary}
      </p>
    </>
  );

  return (
    <motion.li
      style={{
        padding: '20px 0',
        listStyle: 'none',
        fontFamily: "'Inter', sans-serif",
        fontSize: 16,
        lineHeight: 1.6,
        width: '100%',
      }}
      initial={prefersReduced ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: 0.08 * index }}
    >
      <HandDrawnLine seed={index} />
      <div
        style={isMobile
          ? { marginTop: 16 }
          : { display: 'grid', gridTemplateColumns: '160px 1fr', gap: 24, alignItems: 'baseline', marginTop: 16 }}
      >
      {isMobile ? (
        <>
          <div style={{ fontFamily: "'Gamja Flower', sans-serif", fontSize: 18, color: 'rgba(255,255,255,0.5)', marginBottom: 4 }}>
            {dateText}
          </div>
          <div>{content}</div>
        </>
      ) : (
        <>
          <div style={{ fontFamily: "'Gamja Flower', sans-serif", fontSize: 18, color: 'rgba(255,255,255,0.5)' }}>
            {dateText}
          </div>
          <div>{content}</div>
        </>
      )}
      </div>
    </motion.li>
  );
}

function SectionBlock({ data, heading, headingTag }) {
  const prefersReduced = useReducedMotion();
  const isMobile = useIsMobile();
  const Tag = headingTag === 'h3' ? motion.h3 : motion.h2;
  const isSubheading = headingTag === 'h3';

  return (
    <div>
      <Tag
        style={{
          fontFamily: "'Clash Display', sans-serif",
          fontSize: isSubheading ? 'clamp(24px, 3vw, 32px)' : 'clamp(36px, 4vw, 48px)',
          fontWeight: 600,
          color: '#E8E8E3',
          margin: 0,
          marginBottom: 24,
          lineHeight: 1.2,
          textAlign: 'left',
        }}
        initial={prefersReduced ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
      >
        {heading}
      </Tag>
      <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
        {data.map((entry, i) => (
          <ExperienceRow
            key={`${entry.org}-${entry.role}`}
            entry={entry}
            index={i}
            isMobile={isMobile}
            prefersReduced={prefersReduced}
          />
        ))}
      </ul>
    </div>
  );
}

function Experience() {
  return (
    <section
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 64,
        paddingTop: 80,
        paddingBottom: 80,
      }}
    >
      <SectionBlock data={experience} heading="Experience" headingTag="h2" />
      <SectionBlock data={education} heading="Education" headingTag="h3" />
    </section>
  );
}

export default Experience;
