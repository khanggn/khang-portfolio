export default function UserTesting() {
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
        User Testing
      </h2>

      {/* Methodology */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontFamily: "'Inter', sans-serif", fontSize: '22px', color: '#E8E8E3', lineHeight: '1.6' }}>
        <p>
          Our team conducted in-person user testing sessions with two participants from our target user population. We walked each participant through our Figma prototypes and asked them to think out loud as they navigated through the screens. Sessions lasted about 60 minutes and included three tasks: checking their EBT balance, creating a meal plan, and exploring the budgeting suggestions feature.
        </p>
      </div>


      {/* Key Findings */}
      <div style={{ marginTop: '40px' }}>
        <h3
          style={{
            fontFamily: "'Clash Display', sans-serif",
            fontSize: '22px',
            fontWeight: '600',
            marginBottom: '16px',
            color: '#E8E8E3'
          }}
        >
          Key Findings
        </h3>
        <ul style={{ fontFamily: "'Inter', sans-serif", fontSize: '22px', color: '#E8E8E3', lineHeight: '1.6', paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <li>Both participants navigated the app quickly because nothing felt unfamiliar. Ann compared the recipe cards to scrolling TikTok, which is where she actually finds recipes in real life.</li>
          <li>The flat recipe list in the original shopping list screen felt hard to act on. Neither participant had a clear sense of when they would cook the meals they were adding.</li>
          <li>The "People" and "Servings" filters on the Find Recipes screen confused Jaden. He said adjusting them did not change what recipes appeared, so they felt pointless on that screen.</li>
          <li>Both participants responded most positively to the version of the app where the budgeting and meal planning features felt connected to each other rather than sitting on separate screens.</li>
        </ul>
      </div>

      {/* Point of View Statement */}
      <div
        style={{
          marginTop: '40px',
          padding: '24px',
          backgroundColor: '#4E4A5C',
          borderRadius: '12px',
          borderLeft: '4px solid #C4B5FD'
        }}
      >
        <h3
          style={{
            fontFamily: "'Clash Display', sans-serif",
            fontSize: '22px',
            fontWeight: '600',
            marginBottom: '12px',
            color: '#C4B5FD'
          }}
        >
          Point of View
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontFamily: "'Inter', sans-serif", fontSize: '22px', color: '#E8E8E3', lineHeight: '1.6' }}>
          <p>
            We believe that EBT users are more likely to use a feature if it feels like something they already do and if all the features feel like they belong together. Our participants picked up every part of the app quickly because nothing felt foreign. At the same time, the clearest signal from testing was that participants preferred the version where budgeting felt tied to meal planning rather than sitting on its own.
          </p>
        </div>
      </div>

      {/* Before & After — Shopping List to Meal Plan */}
      <div style={{ marginTop: '64px' }}>
        <h3
          style={{
            fontFamily: "'Clash Display', sans-serif",
            fontSize: 'clamp(20px, 3vw, 24px)',
            fontWeight: '600',
            marginBottom: '16px',
            color: '#E8E8E3'
          }}
        >
          Before & After: Shopping List to Meal Plan
        </h3>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '22px', color: '#E8E8E3', lineHeight: '1.6', fontStyle: 'italic', marginBottom: '32px' }}>
          The shopping list screen was redesigned into a meal plan view after both user testing participants said the recipe list felt disconnected from how they actually think about meals. The new screen organizes meals by day and meal type under a weekly calendar, making it immediately clear what to cook and when. The estimated post shopping balance got moved to the top since that is the number users care about most while planning.
        </p>

        {/* Screenshot */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '40px'
          }}
        >
          <img
            src="/images/propel/shopping-list-redesign.png"
            alt="Shopping List Redesign"
            style={{
              width: '100%',
              maxWidth: '700px',
              borderRadius: '24px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.4)'
            }}
          />
        </div>

        {/* What Changed */}
        <h4
          style={{
            fontFamily: "'Clash Display', sans-serif",
            fontSize: '20px',
            fontWeight: '600',
            marginBottom: '16px',
            color: '#C4B5FD'
          }}
        >
          What Changed
        </h4>
        <ol style={{ fontFamily: "'Inter', sans-serif", fontSize: '22px', color: '#E8E8E3', lineHeight: '1.6', paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px', listStyleType: 'decimal', listStylePosition: 'outside'}}>
          <li>Changing the title helps reframe the screen from just a passive list to an active weekly planning tool.</li>
          <li>When planning meals, users care about what they will have left after shopping. They are not really focusing on their current balance. Moving the estimated number up answers the most important question first.</li>
          <li>Recipes had no time context. The new week view lets users see and manage meals day by day. This change directly addresses Jaden's feedback that the plan should be "mapped out across the week."</li>
          <li>Lunch and Dinner headers give each recipe a time of day slot. Both participants thought about meals in terms of when to eat them.</li>
        </ol>

        {/* Why We Made These Changes */}
        <h4
          style={{
            fontFamily: "'Clash Display', sans-serif",
            fontSize: '20px',
            fontWeight: '600',
            marginBottom: '16px',
            color: '#C4B5FD'
          }}
        >
          Why We Made These Changes
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontFamily: "'Inter', sans-serif", fontSize: '22px', color: '#E8E8E3', lineHeight: '1.6' }}>
          <p>
            During user testing, Jaden said he wanted recipes "mapped out across the week more explicitly" and that the original list as designed did not help him act on a plan. Ann compared the recipe cards to scrolling TikTok. It was familiar to look at, but she did not really have a sense of when or how she would actually cook anything. Both participants also preferred the version of the app where budgeting and meal planning felt like one rather than two separate screens.
          </p>
          <p>
            The redesigned meal plan screen addresses these issues directly. Adding a weekly calendar lets users see their meals organized by day, giving them the time based context that was not there before. Grouping recipes under Lunch and Dinner headers also helps because both participants described planning in terms of when they would eat something, not just what ingredients to buy. Moving the estimated balance to the top of the screen means users can immediately see how much they will have left after shopping without having to scroll. Together, these changes make the plan feel like something users can actually follow rather than just a list of recipes.
          </p>
        </div>
      </div>

      {/* Before & After — Find Recipes Screen */}
      <div style={{ marginTop: '64px' }}>
        <h3
          style={{
            fontFamily: "'Clash Display', sans-serif",
            fontSize: 'clamp(20px, 3vw, 24px)',
            fontWeight: '600',
            marginBottom: '16px',
            color: '#E8E8E3'
          }}
        >
          Before & After: Find Recipes Screen
        </h3>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '22px', color: '#E8E8E3', lineHeight: '1.6', fontStyle: 'italic', marginBottom: '32px' }}>
          The Find Recipes screen was simplified and better connected to the meal plan based on user testing feedback. The People and Servings filters were removed because they did not change what recipes showed up and only made the screen feel cluttered. "Your Current Plan" was renamed "Your Next Week" to make it clear the budget is for that week. A "View Current Meal Plan" button was also added so users can quickly check what they have already planned without leaving the screen.
        </p>

        {/* Screenshot */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '40px'
          }}
        >
          <img
            src="/images/propel/find-recipes-screen.png"
            alt="Shopping List Redesign"
            style={{
              width: '100%',
              maxWidth: '700px',
              borderRadius: '24px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.4)'
            }}
          />
        </div>

        {/* What Changed */}
        <h4
          style={{
            fontFamily: "'Clash Display', sans-serif",
            fontSize: '20px',
            fontWeight: '600',
            marginBottom: '16px',
            color: '#C4B5FD'
          }}
        >
          What Changed
        </h4>
        <ol style={{ fontFamily: "'Inter', sans-serif", fontSize: '22px', color: '#E8E8E3', lineHeight: '1.6', paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px', listStyleType: 'decimal', listStylePosition: 'outside'}}>
          <li>Changing the subheading is an important change because "Your Current Plan" was confusing to both participants. Saying "Your Next Week" supports the two components of budget and the current meal plan being confined to that week the user is in.</li>
          <li>During user testing, Jaden talked about how the "people" and especially "servings" filter did not make sense to show on this screen. The filters did not change the screen in any significant way, and these numbers can be placed within the specific recipe view.</li>
          <li>In the original flow, recipes and the meal plan were separated. Jaden noted during testing that the features felt a little disconnected. He wanted to be able to see his plan while browsing. The new button creates a direct link between the two screens, making the app feel like one tool rather than separate features.</li>
        </ol>

        {/* Why We Made These Changes */}
        <h4
          style={{
            fontFamily: "'Clash Display', sans-serif",
            fontSize: '20px',
            fontWeight: '600',
            marginBottom: '16px',
            color: '#C4B5FD'
          }}
        >
          Why We Made These Changes
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontFamily: "'Inter', sans-serif", fontSize: '22px', color: '#E8E8E3', lineHeight: '1.6' }}>
          <p>
            During user testing, Jaden pointed out that the People and Servings filters on the Find Recipes screen did not make sense there. Adjusting them did not change which recipes appeared, and those numbers fit better on the individual recipe page where they can actually affect ingredient amounts. The subheading "Your Current Plan" also confused both participants. Neither of them was sure if it referred to a weekly budget, a saved list, or something else, and they did not feel confident about how it connected to the rest of the app.
          </p>
          <p>
            The redesigned screen removes the clutter and makes each element easier to understand. Renaming the section "Your Next Week" ties the budget to a weekly timeframe, which matches how both participants naturally thought about their EBT spending. Keeping only the Budget filter makes sense because this screen is for browsing recipes. The "View Current Meal Plan" button was the most important addition because both participants felt that the recipe browsing and meal planning features felt disconnected from each other. Adding a shortcut between the two screens makes the app feel like one tool instead of separate features.
          </p>
        </div>
      </div>

      {/* Personal Reflection */}
      <div style={{ marginTop: '64px' }}>
        <h3
          style={{
            fontFamily: "'Clash Display', sans-serif",
            fontSize: '22px',
            fontWeight: '600',
            marginBottom: '16px',
            color: '#E8E8E3'
          }}
        >
          Personal Reflection
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontFamily: "'Inter', sans-serif", fontSize: '22px', color: '#E8E8E3', lineHeight: '1.6' }}>
          <p>
            This project felt personal to me because I use EBT myself to buy groceries each month. I know firsthand how stressful it can be to watch your balance get low before the next deposit. Working on Propel gave me a chance to design something I would actually want to use. The biggest thing I took away from user testing is that people do not want to be told how to budget in abstract terms. They want to see their money connected to real meals on real days.
          </p>
        </div>
      </div>
    </div>
  );
}
