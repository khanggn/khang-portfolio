export default function ProblemStatement() {
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
        Problem Statement
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontFamily: "'Inter', sans-serif", fontSize: '22px', color: '#E8E8E3', lineHeight: '1.6' }}>
        <p>
          EBT SNAP otherwise known as Electronic Benefit Transfer of Supplemental Nutrition Assistance Program which is described to provide monthly food assistance to individuals in need. The EBT card that is given out to these people work as debit cards for the government's funding provisions. <b>A primary EBT cardholder supporting multiple family members needs clear, real-time visibility into their remaining balance and spending patterns in order to make their monthly benefit last without running out before the next refill.</b>
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
            fontSize: '22px',
            fontWeight: '600',
            marginBottom: '12px',
            color: '#C4B5FD'
          }}
        >
          What We're Building
        </h3>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '22px', color: '#E8E8E3', lineHeight: '1.6' }}>
          A meal planning feature inside Propel. You put in your budget, how many people you're feeding, and how many servings you want to make. The app suggests recipes with estimated costs so you can actually see if the week adds up before you go shopping.
        </p>
      </div>
    </div>
  );
}
