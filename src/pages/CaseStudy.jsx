import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import FooterWithSpotlight from '../components/FooterWithSpotlight';

function CaseStudy() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setIsMobileMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-[#262626] text-white flex flex-col">
      {/* Navbar */}
      <nav
        className="sticky top-0 z-50 bg-[#262626] border-b border-white/10"
        style={{
          height: '72px',
          padding: '22px var(--page-padding)',
          boxShadow: '0 8px 24px rgba(255, 255, 255, 0.08)'
        }}
      >
        <div className="flex justify-between items-center h-full">
          <Link
            to="/"
            className="font-bold"
            style={{ fontFamily: "'Clash Display', sans-serif", fontSize: 'clamp(20px, 2.5vw, 27px)' }}
          >
            Khang's Wrapped
          </Link>

          {/* Desktop nav */}
          <div
            className="nav-links-desktop items-center"
            style={{ fontFamily: "'Inter', sans-serif", gap: '29px', fontSize: '14px' }}
          >
            <Link to="/" className="hover:text-[#C4B5FD] transition-colors">
              Home
            </Link>
            <Link to="/about" className="hover:text-[#C4B5FD] transition-colors">
              About
            </Link>
            <Link to="/playlist" className="hover:text-[#C4B5FD] transition-colors">
              My Playlists
            </Link>
            <a
              href="/resume/khangresume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#C4B5FD] transition-colors"
            >
              Resume
            </a>
          </div>

          {/* Hamburger (mobile) */}
          <button
            className="nav-hamburger"
            onClick={() => setIsMobileMenuOpen(true)}
            style={{
              background: 'none',
              border: 'none',
              color: '#E8E8E3',
              cursor: 'pointer',
              padding: '8px',
              minWidth: '44px',
              minHeight: '44px',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="mobile-menu-overlay"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
          >
            <button
              className="mobile-menu-close"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <X size={28} />
            </button>
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
              Home
            </Link>
            <Link to="/about" onClick={() => setIsMobileMenuOpen(false)}>
              About
            </Link>
            <Link to="/playlist" onClick={() => setIsMobileMenuOpen(false)}>
              My Playlists
            </Link>
            <a
              href="/resume/khangresume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Resume
            </a>
          </motion.div>
        )}
      </AnimatePresence>

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

            {/* Overview */}
            <div>
              <h2
                style={{
                  fontFamily: "'Clash Display', sans-serif",
                  fontSize: 'clamp(24px, 3.5vw, 32px)',
                  fontWeight: '600',
                  marginBottom: '24px',
                  color: '#C4B5FD'
                }}
              >
                Overview
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontFamily: "'Inter', sans-serif", fontSize: '16px', color: '#E8E8E3', lineHeight: '1.6' }}>
                <p>
                  47 million Americans face food insecurity. 40 million of them get SNAP benefits. And a lot of them still run out before the month is over.
                </p>
                <p>
                  Two out of three on our team use EBT. So when we decided to build something for EBT users, we thought we had a head start on understanding the problem. We didn't. Most of what we assumed about how people shop and cook turned out to be wrong.
                </p>
                <p>
                  We're extending <strong style={{ color: '#C4B5FD' }}>Propel</strong>, an app that lets you check your EBT balance and see recent transactions. We're adding a meal planning feature so users can find recipes, see what a week of groceries might cost, and plan around what they actually have left on their card. One of our research participants was already using Propel to track her balance, which helped us decided which app to extend.
                </p>
              </div>
            </div>

            {/* Problem Statement */}
            <div>
              <h2
                style={{
                  fontFamily: "'Clash Display', sans-serif",
                  fontSize: 'clamp(24px, 3.5vw, 32px)',
                  fontWeight: '600',
                  marginBottom: '24px',
                  color: '#C4B5FD'
                }}
              >
                Problem Statement
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontFamily: "'Inter', sans-serif", fontSize: '16px', color: '#E8E8E3', lineHeight: '1.6' }}>
                <p>
                  People using EBT run out of money before the month ends. Not from being careless. But rather, they just don't have a clear picture of what they've spent, what they can still afford to buy, or what they can even make with what's in the fridge. And by the time they're figuring that out, they're usually already standing at the store.
                </p>
              </div>

              <div
                style={{
                  marginTop: '24px',
                  padding: '24px',
                  backgroundColor: '#4E4A5C',
                  borderRadius: '12px',
                  borderLeft: '4px solid #C4B5FD'
                }}
              >
                <h3
                  style={{
                    fontFamily: "'Clash Display', sans-serif",
                    fontSize: '20px',
                    fontWeight: '600',
                    marginBottom: '12px',
                    color: '#C4B5FD'
                  }}
                >
                  What We're Building
                </h3>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '16px', color: '#E8E8E3', lineHeight: '1.6' }}>
                  A meal planning feature inside Propel. You put in your budget, how many people you're feeding, and how many servings you want to make. The app suggests recipes with estimated costs so you can actually see if the week adds up before you go shopping.
                </p>
              </div>
            </div>

            {/* User Research */}
            <div>
              <h2
                style={{
                  fontFamily: "'Clash Display', sans-serif",
                  fontSize: 'clamp(24px, 3.5vw, 32px)',
                  fontWeight: '600',
                  marginBottom: '16px',
                  color: '#C4B5FD'
                }}
              >
                User Research
              </h2>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '16px', color: 'rgba(255,255,255,0.5)', lineHeight: '1.6', marginBottom: '16px' }}>
                We talked to three people. We went in expecting to hear that people just needed a better way to check their balance but walked out with learning new problems EBT users experience.
              </p>
              <ul style={{ fontFamily: "'Inter', sans-serif", fontSize: '16px', color: '#E8E8E3', lineHeight: '1.6', marginBottom: '40px', paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <li><strong style={{ color: '#C4B5FD' }}>Ann</strong> - 16-year-old whose family uses SNAP EBT and SUN Bucks</li>
                <li><strong style={{ color: '#C4B5FD' }}>Lydia</strong> - 24-year-old therapist who shares an EBT account with her parents</li>
                <li><strong style={{ color: '#C4B5FD' }}>Jaden</strong> - 21-year-old UCSD student who handles most of the grocery shopping for his household</li>
              </ul>

              {/* Ann */}
              <div style={{ marginBottom: '40px' }}>
                <h3
                  style={{
                    fontFamily: "'Clash Display', sans-serif",
                    fontSize: '20px',
                    fontWeight: '600',
                    marginBottom: '16px',
                    color: '#E8E8E3'
                  }}
                >
                  Ann doesn't plan meals. She opens the fridge.
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontFamily: "'Inter', sans-serif", fontSize: '16px', color: '#E8E8E3', lineHeight: '1.6' }}>
                  <p>
                    We asked Ann how she figures out what to cook. She opens the fridge, looks at what's in there, and goes from there. That's it. No list, no plan, no thinking about it before she's hungry.
                  </p>
                  <p>
                    We had been ideating with the mindset that someone would sit down, pick out meals for the week, and shop from a list. Ann does none of that. She works backwards from whatever she already had in the house. Any feature that asks her to plan before she even opens the fridge is probably going to get skipped.
                  </p>
                  <p>
                    She also finds recipes on TikTok, not Google. Short videos, she can see exactly what the dish looks like without reading anything. That's worth keeping in mind for how recipes show up in the app.
                  </p>
                  <p style={{ color: 'rgba(255,255,255,0.5)' }}>
                    One thing we almost missed: Ann doesn't use the EBT card. Her mom does. Ann tags along grocery trips but her mom handles the card the whole time. So whoever we're actually designing for here, it's the parent.
                  </p>
                </div>
              </div>

              {/* Lydia */}
              <div style={{ marginBottom: '40px' }}>
                <h3
                  style={{
                    fontFamily: "'Clash Display', sans-serif",
                    fontSize: '20px',
                    fontWeight: '600',
                    marginBottom: '16px',
                    color: '#E8E8E3'
                  }}
                >
                  Lydia had $4 left and had no idea she could buy sushi.
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontFamily: "'Inter', sans-serif", fontSize: '16px', color: '#E8E8E3', lineHeight: '1.6' }}>
                  <p>
                    Partway through our interview, we asked Lydia to check her balance. She opened Propel and showed us: <strong style={{ color: '#C4B5FD' }}>$4 remaining</strong> for the rest of the month. When she runs out, she said, the family just goes to fast food places until the deposit comes in on the 2nd.
                  </p>
                  <p>
                    Then we mentioned that cold pre made food, like sushi or deli items, is covered by EBT. She let out a little laugh. She had no idea. She'd been spending her own money on fast food when she could have been buying ready made stuff at the grocery store using her benefits.
                  </p>
                  <p>
                    There's a real gap between what EBT actually covers and what people think it covers, and nobody tells you. That gap has real consequences for how people eat and spend at the end of the month.
                  </p>
                </div>
              </div>

              {/* Jaden */}
              <div style={{ marginBottom: '40px' }}>
                <h3
                  style={{
                    fontFamily: "'Clash Display', sans-serif",
                    fontSize: '20px',
                    fontWeight: '600',
                    marginBottom: '16px',
                    color: '#E8E8E3'
                  }}
                >
                  Jaden's family passes one EBT card between two cities.
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontFamily: "'Inter', sans-serif", fontSize: '16px', color: '#E8E8E3', lineHeight: '1.6' }}>
                  <p>
                    Jaden's dad takes the card to the Bay Area every week for work. His mom uses it in San Diego. Neither of them knows the balance without stopping to check.
                  </p>
                  <p>
                    Jaden wasn't complaining about it. It was just how things work for them. But it made us realize how many of our assumptions about one person, one card, one household don't actually hold up. For a lot of families the card moves around in ways a typical budgeting app doesn't account for.
                  </p>
                </div>
              </div>

              {/* What changed */}
              <div
                style={{
                  padding: '24px',
                  backgroundColor: '#4E4A5C',
                  borderRadius: '12px',
                  borderLeft: '4px solid #C4B5FD'
                }}
              >
                <h3
                  style={{
                    fontFamily: "'Clash Display', sans-serif",
                    fontSize: '20px',
                    fontWeight: '600',
                    marginBottom: '12px',
                    color: '#C4B5FD'
                  }}
                >
                  What changed for us
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontFamily: "'Inter', sans-serif", fontSize: '16px', color: '#E8E8E3', lineHeight: '1.6' }}>
                  <p>
                    We came in thinking: give people a clean way to track their budget and pick out meals. What we actually heard was that people cook from what they already have, a lot of them don't know what their benefits cover, and the card itself isn't always in the same person's hands.
                  </p>
                  <p>
                    So we stopped trying to build something fixed and started thinking about something that fits around how people already live, not how we assumed they did.
                  </p>
                </div>
              </div>
            </div>

            {/* Design Process */}
            <div>
              <h2
                style={{
                  fontFamily: "'Clash Display', sans-serif",
                  fontSize: 'clamp(24px, 3.5vw, 32px)',
                  fontWeight: '600',
                  marginBottom: '24px',
                  color: '#C4B5FD'
                }}
              >
                Design Process
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontFamily: "'Inter', sans-serif", fontSize: '16px', color: '#E8E8E3', lineHeight: '1.6' }}>
                <p>
                  Our research forced us to rethink the feature from the ground up. We had sketched a traditional meal planner: pick meals for the week, generate a list, shop from it. But Ann showed us that nobody in her household plans that way. She opens the fridge first. So we redesigned the flow around that behavior: the app lets you mark what you already have, and only adds what's missing to your shopping list.
                </p>
                <p>
                  Lydia's interview changed our recipe detail screen. She didn't know sushi was EBT-eligible. We realized the eligibility gap was something the app could close, so we added an EBT Eligible column to every ingredient list. The warning banner on the home screen came from noticing that by the time Lydia checked her balance, she already had $4 left and no plan. We wanted the app to surface that signal earlier, not after the damage is done.
                </p>
              </div>
            </div>

            {/* Final Solution */}
            <div>
              <h2
                style={{
                  fontFamily: "'Clash Display', sans-serif",
                  fontSize: 'clamp(24px, 3.5vw, 32px)',
                  fontWeight: '600',
                  marginBottom: '24px',
                  color: '#C4B5FD'
                }}
              >
                Final Solution
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '64px' }}>
                {/* Pair 1 */}
                <div style={{ display: 'flex', gap: '0px', flexWrap: 'wrap' }}>
                  <div style={{ flex: '1 1 50%', minWidth: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 16px' }}>
                    <h3 style={{ fontFamily: "'Clash Display', sans-serif", fontSize: '20px', fontWeight: '600', marginBottom: '12px', color: '#E8E8E3', textAlign: 'center' }}>
                      Your Shopping List
                    </h3>
                    <img
                      src="/images/projects/shoppingListScreen.png"
                      alt="Shopping List Screen"
                      style={{ width: '100%', maxWidth: '320px', borderRadius: '40px', boxShadow: '0 8px 32px rgba(0,0,0,0.4)', marginBottom: '16px' }}
                    />
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '16px', color: '#E8E8E3', lineHeight: '1.6', maxWidth: '420px' }}>
                      The shopping list is the payoff of the whole feature. For the first time, users can see their EBT balance before and after a planned week of meals, before ever stepping into a store. This directly solves the core problem: people run out not from carelessness, but because they had no way to see the month's trajectory in advance.
                    </p>
                  </div>
                  <div style={{ flex: '1 1 50%', minWidth: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 16px' }}>
                    <h3 style={{ fontFamily: "'Clash Display', sans-serif", fontSize: '20px', fontWeight: '600', marginBottom: '12px', color: '#E8E8E3', textAlign: 'center' }}>
                      Home Screen
                    </h3>
                    <img
                      src="/images/projects/Landing_Page.png"
                      alt="Home Screen"
                      style={{ width: '100%', maxWidth: '320px', borderRadius: '40px', boxShadow: '0 8px 32px rgba(0,0,0,0.4)', marginBottom: '16px' }}
                    />
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '16px', color: '#E8E8E3', lineHeight: '1.6', maxWidth: '420px' }}>
                      We integrated the meal planning entry point into Propel's existing home screen rather than creating a new tab. Propel users already open the app to check their balance, so the "Plan your week" prompt meets them at the exact moment they're thinking about money. The spending-pace warning banner also lives here, alerting users before the problem becomes critical, not after.
                    </p>
                  </div>
                </div>

                {/* Pair 2 */}
                <div style={{ display: 'flex', gap: '0px', flexWrap: 'wrap' }}>
                  <div style={{ flex: '1 1 50%', minWidth: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 16px' }}>
                    <h3 style={{ fontFamily: "'Clash Display', sans-serif", fontSize: '20px', fontWeight: '600', marginBottom: '12px', color: '#E8E8E3', textAlign: 'center' }}>
                      Find Recipes
                    </h3>
                    <img
                      src="/images/projects/recipeScreen.png"
                      alt="Find Recipes Screen"
                      style={{ width: '100%', maxWidth: '320px', borderRadius: '40px', boxShadow: '0 8px 32px rgba(0,0,0,0.4)', marginBottom: '16px' }}
                    />
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '16px', color: '#E8E8E3', lineHeight: '1.6', maxWidth: '420px' }}>
                      Before showing any recipes, the app surfaces the user's current plan: budget, people, and servings, so every suggestion is already filtered to what's actually affordable. The grid layout with food photography and price tags up front lets users evaluate options at a glance, without reading through ingredient lists first.
                    </p>
                  </div>
                  <div style={{ flex: '1 1 50%', minWidth: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 16px' }}>
                    <h3 style={{ fontFamily: "'Clash Display', sans-serif", fontSize: '20px', fontWeight: '600', marginBottom: '12px', color: '#E8E8E3', textAlign: 'center' }}>
                      Recipe Detail
                    </h3>
                    <img
                      src="/images/projects/expandedRecipe.png"
                      alt="Recipe Detail Screen"
                      style={{ width: '100%', maxWidth: '320px', borderRadius: '40px', boxShadow: '0 8px 32px rgba(0,0,0,0.4)', marginBottom: '16px' }}
                    />
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '16px', color: '#E8E8E3', lineHeight: '1.6', maxWidth: '420px' }}>
                      The EBT Eligible column in the ingredient list was designed around Lydia's moment in our interview. She had $4 left and didn't know she could buy sushi because she assumed pre-made food wasn't covered. By surfacing eligibility at the ingredient level, users can shop with confidence rather than anxiety at checkout.
                    </p>
                  </div>
                </div>

                {/* Pair 3 */}
                <div style={{ display: 'flex', gap: '0px', flexWrap: 'wrap' }}>
                  <div style={{ flex: '1 1 50%', minWidth: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 16px' }}>
                    <h3 style={{ fontFamily: "'Clash Display', sans-serif", fontSize: '20px', fontWeight: '600', marginBottom: '12px', color: '#E8E8E3', textAlign: 'center' }}>
                      Plan This Recipe
                    </h3>
                    <img
                      src="/images/projects/planningRecipeWithoutItems.png"
                      alt="Plan This Recipe Screen"
                      style={{ width: '100%', maxWidth: '320px', borderRadius: '40px', boxShadow: '0 8px 32px rgba(0,0,0,0.4)', marginBottom: '16px' }}
                    />
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '16px', color: '#E8E8E3', lineHeight: '1.6', maxWidth: '420px' }}>
                      The "Have it?" checkboxes respond to Ann's actual behavior: she starts from the fridge, not from a recipe list. Checking off ingredients she already owns drops them from the estimated total in real time. The design respects how EBT families actually cook, resourcefully, from what's already there.
                    </p>
                  </div>
                  <div style={{ flex: '1 1 50%', minWidth: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 16px' }}>
                    <h3 style={{ fontFamily: "'Clash Display', sans-serif", fontSize: '20px', fontWeight: '600', marginBottom: '12px', color: '#E8E8E3', textAlign: 'center' }}>
                      Your EBT / Digital Envelope
                    </h3>
                    <img
                      src="/images/projects/Your_EBT.png"
                      alt="Your EBT Digital Envelope Screen"
                      style={{ width: '100%', maxWidth: '320px', borderRadius: '40px', boxShadow: '0 8px 32px rgba(0,0,0,0.4)', marginBottom: '16px' }}
                    />
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '16px', color: '#E8E8E3', lineHeight: '1.6', maxWidth: '420px' }}>
                      The Digital Envelope feature extends Propel's existing analytics view with proactive spending pacing. It shows users how quickly they're burning through their balance relative to days left in the month, and suggests a weekly spending split to make benefits last.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Outcomes & Reflection */}
            <div>
              <h2
                style={{
                  fontFamily: "'Clash Display', sans-serif",
                  fontSize: 'clamp(24px, 3.5vw, 32px)',
                  fontWeight: '600',
                  marginBottom: '24px',
                  color: '#C4B5FD'
                }}
              >
                Outcomes & Reflection
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontFamily: "'Inter', sans-serif", fontSize: '16px', color: '#E8E8E3', lineHeight: '1.6' }}>
                <p>
                  Our biggest assumption going in was that EBT users needed a better interface for something they were already doing. What we found was that most of them weren't doing it at all, not because they lacked motivation, but because no tool had ever fit around the way they actually live. Ann cooks from the fridge. Lydia doesn't know what's covered. Jaden's card is in two cities at once. A rigid meal planner wouldn't have helped any of them.
                </p>
                <p>
                  If we had more time, we'd test whether the "Have it?" pantry check-in is actually used in practice. Our instinct says yes, since it fits Ann's behavior, but we haven't validated it against the hi-fi prototype with a real user session. We'd also want to explore what happens when the estimated cost exceeds the remaining balance, and how to handle that gracefully without shaming the user.
                </p>
                <p>
                  The tradeoff we're most uncertain about is the recipe cost estimates. We used rough approximations based on average grocery prices, but actual costs vary by store and region. Being slightly wrong could erode trust fast, especially for users who are already anxious about money. A future version would need a more robust pricing data source, or at minimum, clearer framing that these are estimates.
                </p>
              </div>
            </div>
          </div>

          <Link
            to="/"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '16px',
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

export default CaseStudy;
