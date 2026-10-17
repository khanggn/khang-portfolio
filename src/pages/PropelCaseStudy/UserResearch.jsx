import * as propelStyles from './styles';

export default function UserResearch() {
  return (
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
      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '22px', color: 'rgba(255,255,255,0.5)', lineHeight: '1.6', marginBottom: '16px' }}>
        We talked to three people. We went in expecting to hear that people just needed a better way to check their balance but walked out with learning new problems EBT users experience.
      </p>
      <ul style={{ fontFamily: "'Inter', sans-serif", fontSize: '22px', color: '#E8E8E3', lineHeight: '1.6', marginBottom: '40px', paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <li><strong style={{ color: '#C4B5FD' }}>Ann</strong> - 16-year-old whose family uses SNAP EBT and SUN Bucks</li>
        <li><strong style={{ color: '#C4B5FD' }}>Lydia</strong> - 24-year-old therapist who shares an EBT account with her parents</li>
        <li><strong style={{ color: '#C4B5FD' }}>Jaden</strong> - 21-year-old UCSD student who handles most of the grocery shopping for his household</li>
      </ul>

      {/* Ann */}
      <div style={{ marginBottom: '40px' }}>
        <h3 style={propelStyles.subheading}>
          Ann doesn't plan meals. She opens the fridge.
        </h3>
        <div style={propelStyles.bodyText}>
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
        <h3 style={propelStyles.subheading}>
          Lydia had $4 left and had no idea she could buy sushi.
        </h3>
        <div style={propelStyles.bodyText}>
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
        <h3 style={propelStyles.subheading}>
          Jaden's family passes one EBT card between two cities.
        </h3>
        <div style={propelStyles.bodyText}>
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
        <h3 style={propelStyles.calloutHeading}>
          What changed for us
        </h3>
        <div style={propelStyles.calloutBodyText}>
          <p>
            We came in thinking: give people a clean way to track their budget and pick out meals. What we actually heard was that people cook from what they already have, a lot of them don't know what their benefits cover, and the card itself isn't always in the same person's hands.
          </p>
          <p>
            So we stopped trying to build something fixed and started thinking about something that fits around how people already live, not how we assumed they did.
          </p>
        </div>
      </div>
    </div>
  );
}
