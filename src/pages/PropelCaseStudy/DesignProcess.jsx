export default function DesignProcess() {
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
        Design Process
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontFamily: "'Inter', sans-serif", fontSize: '22px', color: '#E8E8E3', lineHeight: '1.6' }}>
        <p>
          Our research forced us to rethink the feature from the ground up. We had sketched a traditional meal planner: pick meals for the week, generate a list, shop from it. But Ann showed us that nobody in her household plans that way. She opens the fridge first. So we redesigned the flow around that behavior: the app lets you mark what you already have, and only adds what's missing to your shopping list.
        </p>
        <p>
          Lydia's interview changed our recipe detail screen. She didn't know sushi was EBT-eligible. We realized the eligibility gap was something the app could close, so we added an EBT Eligible column to every ingredient list. The warning banner on the home screen came from noticing that by the time Lydia checked her balance, she already had $4 left and no plan. We wanted the app to surface that signal earlier, not after the damage is done.
        </p>
      </div>
    </div>
  );
}
