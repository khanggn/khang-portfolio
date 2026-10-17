import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import FooterWithSpotlight from '../../components/layout/FooterWithSpotlight';
import CaseStudyNavbar from '../../components/case-study/CaseStudyNavbar';

import Overview from './Overview';
import ProblemStatement from './ProblemStatement';
import UserResearch from './UserResearch';
import DesignProcess from './DesignProcess';
import FinalSolution from './FinalSolution';
import UserTesting from './UserTesting';
import TradeoffsFutureWork from './TradeoffsFutureWork';

function PropelCaseStudy() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="min-h-screen bg-[#262626] text-white flex flex-col">
      <CaseStudyNavbar />

      {/* Main Content */}
      <main className="flex-1" style={{ padding: '0 var(--page-padding)' }}>
        <section style={{ paddingTop: '80px', paddingBottom: '80px' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ width: '100%' }}
          >
          <h1
            className="font-bold"
            style={{
              fontFamily: "'Clash Display', sans-serif",
              fontSize: 'clamp(32px, 5vw, 64px)',
              lineHeight: '1.2',
              marginBottom: '16px'
            }}
          >
            Extending Propel
          </h1>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 'clamp(16px, 2vw, 20px)',
              color: '#9D92C8',
              marginBottom: '24px',
              lineHeight: '1.6'
            }}
          >
            Helping EBT Families Plan Meals Without Running Out
          </p>
          <div
            style={{
              height: '4px',
              width: '120px',
              backgroundColor: '#C4B5FD',
              marginBottom: '48px'
            }}
          />

          {/* Content sections */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '64px', textAlign: 'left', marginTop: '48px' }}>
            <Overview />
            <ProblemStatement />
            <UserResearch />
            <DesignProcess />
            <FinalSolution />
            <UserTesting />
            <TradeoffsFutureWork />
          </div>

          <Link
            to="/"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '22px',
              color: '#C4B5FD',
              textDecoration: 'none',
              fontWeight: '600',
              marginTop: '80px',
              display: 'inline-block'
            }}
            className="hover:text-white transition-colors"
          >
            ← Back to Home
          </Link>
        </motion.div>
        </section>

        {/* Footer Section */}
        <FooterWithSpotlight />
      </main>
    </div>
  );
}

export default PropelCaseStudy;
