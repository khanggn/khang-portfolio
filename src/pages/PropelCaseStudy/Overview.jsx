export default function Overview() {
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
        Overview
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontFamily: "'Inter', sans-serif", fontSize: '22px', color: '#E8E8E3', lineHeight: '1.6' }}>
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
  );
}
