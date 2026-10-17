export default function FinalSolution() {
  return (
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
            <h3 style={{ fontFamily: "'Clash Display', sans-serif", fontSize: '22px', fontWeight: '600', marginBottom: '12px', color: '#E8E8E3', textAlign: 'center' }}>
              Your Shopping List
            </h3>
            <img
              src="/images/propel/shopping-list-screen.png"
              alt="Shopping List Screen"
              style={{ width: '100%', maxWidth: '320px', borderRadius: '40px', boxShadow: '0 8px 32px rgba(0,0,0,0.4)', marginBottom: '16px' }}
            />
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '22px', color: '#E8E8E3', lineHeight: '1.6', maxWidth: '420px' }}>
              The shopping list is the payoff of the whole feature. For the first time, users can see their EBT balance before and after a planned week of meals, before ever stepping into a store. This directly solves the core problem: people run out not from carelessness, but because they had no way to see the month's trajectory in advance.
            </p>
          </div>
          <div style={{ flex: '1 1 50%', minWidth: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 16px' }}>
            <h3 style={{ fontFamily: "'Clash Display', sans-serif", fontSize: '22px', fontWeight: '600', marginBottom: '12px', color: '#E8E8E3', textAlign: 'center' }}>
              Home Screen
            </h3>
            <img
              src="/images/propel/landing-page.png"
              alt="Home Screen"
              style={{ width: '100%', maxWidth: '320px', borderRadius: '40px', boxShadow: '0 8px 32px rgba(0,0,0,0.4)', marginBottom: '16px' }}
            />
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '22px', color: '#E8E8E3', lineHeight: '1.6', maxWidth: '420px' }}>
              We integrated the meal planning entry point into Propel's existing home screen rather than creating a new tab. Propel users already open the app to check their balance, so the "Plan your week" prompt meets them at the exact moment they're thinking about money. The spending-pace warning banner also lives here, alerting users before the problem becomes critical, not after.
            </p>
          </div>
        </div>

        {/* Pair 2 */}
        <div style={{ display: 'flex', gap: '0px', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 50%', minWidth: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 16px' }}>
            <h3 style={{ fontFamily: "'Clash Display', sans-serif", fontSize: '22px', fontWeight: '600', marginBottom: '12px', color: '#E8E8E3', textAlign: 'center' }}>
              Find Recipes
            </h3>
            <img
              src="/images/propel/recipe-screen.png"
              alt="Find Recipes Screen"
              style={{ width: '100%', maxWidth: '320px', borderRadius: '40px', boxShadow: '0 8px 32px rgba(0,0,0,0.4)', marginBottom: '16px' }}
            />
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '22px', color: '#E8E8E3', lineHeight: '1.6', maxWidth: '420px' }}>
              Before showing any recipes, the app surfaces the user's current plan: budget, people, and servings, so every suggestion is already filtered to what's actually affordable. The grid layout with food photography and price tags up front lets users evaluate options at a glance, without reading through ingredient lists first.
            </p>
          </div>
          <div style={{ flex: '1 1 50%', minWidth: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 16px' }}>
            <h3 style={{ fontFamily: "'Clash Display', sans-serif", fontSize: '22px', fontWeight: '600', marginBottom: '12px', color: '#E8E8E3', textAlign: 'center' }}>
              Recipe Detail
            </h3>
            <img
              src="/images/propel/expanded-recipe.png"
              alt="Recipe Detail Screen"
              style={{ width: '100%', maxWidth: '320px', borderRadius: '40px', boxShadow: '0 8px 32px rgba(0,0,0,0.4)', marginBottom: '16px' }}
            />
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '22px', color: '#E8E8E3', lineHeight: '1.6', maxWidth: '420px' }}>
              The EBT Eligible column in the ingredient list was designed around Lydia's moment in our interview. She had $4 left and didn't know she could buy sushi because she assumed pre-made food wasn't covered. By surfacing eligibility at the ingredient level, users can shop with confidence rather than anxiety at checkout.
            </p>
          </div>
        </div>

        {/* Pair 3 */}
        <div style={{ display: 'flex', gap: '0px', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 50%', minWidth: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 16px' }}>
            <h3 style={{ fontFamily: "'Clash Display', sans-serif", fontSize: '22px', fontWeight: '600', marginBottom: '12px', color: '#E8E8E3', textAlign: 'center' }}>
              Plan This Recipe
            </h3>
            <img
              src="/images/propel/planning-recipe-without-items.png"
              alt="Plan This Recipe Screen"
              style={{ width: '100%', maxWidth: '320px', borderRadius: '40px', boxShadow: '0 8px 32px rgba(0,0,0,0.4)', marginBottom: '16px' }}
            />
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '22px', color: '#E8E8E3', lineHeight: '1.6', maxWidth: '420px' }}>
              The "Have it?" checkboxes respond to Ann's actual behavior: she starts from the fridge, not from a recipe list. Checking off ingredients she already owns drops them from the estimated total in real time. The design respects how EBT families actually cook, resourcefully, from what's already there.
            </p>
          </div>
          <div style={{ flex: '1 1 50%', minWidth: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 16px' }}>
            <h3 style={{ fontFamily: "'Clash Display', sans-serif", fontSize: '22px', fontWeight: '600', marginBottom: '12px', color: '#E8E8E3', textAlign: 'center' }}>
              Your EBT / Digital Envelope
            </h3>
            <img
              src="/images/propel/your-ebt.png"
              alt="Your EBT Digital Envelope Screen"
              style={{ width: '100%', maxWidth: '320px', borderRadius: '40px', boxShadow: '0 8px 32px rgba(0,0,0,0.4)', marginBottom: '16px' }}
            />
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '22px', color: '#E8E8E3', lineHeight: '1.6', maxWidth: '420px' }}>
              The Digital Envelope feature extends Propel's existing analytics view with proactive spending pacing. It shows users how quickly they're burning through their balance relative to days left in the month, and suggests a weekly spending split to make benefits last.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
