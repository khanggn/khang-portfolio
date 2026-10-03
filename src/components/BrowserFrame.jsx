function BrowserFrame({ children, compact = false, noControls = false }) {
  const barHeight = compact ? 20 : 32;
  const dotSize = compact ? 5 : 8;
  const dotGap = compact ? 3 : 6;
  const sidePad = compact ? 8 : 14;
  const radius = compact ? '8px' : '12px';

  if (noControls) {
    return (
      <div className="browser-frame-no-controls" style={{ lineHeight: 0 }}>
        {children}
      </div>
    );
  }

  return (
    <div
      style={{
        borderRadius: radius,
        overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.1)',
        boxShadow: '0 12px 40px rgba(0,0,0,0.5), 0 4px 16px rgba(0,0,0,0.35)',
      }}
    >
      {/* Browser bar */}
      <div
        style={{
          height: barHeight,
          background: '#3a3a3a',
          display: 'flex',
          alignItems: 'center',
          paddingLeft: sidePad,
          gap: dotGap,
        }}
      >
        <div style={{ width: dotSize, height: dotSize, borderRadius: '50%', background: '#FF5F57' }} />
        <div style={{ width: dotSize, height: dotSize, borderRadius: '50%', background: '#FEBC2E' }} />
        <div style={{ width: dotSize, height: dotSize, borderRadius: '50%', background: '#28C840' }} />
      </div>
      {/* Content */}
      <div style={{ lineHeight: 0 }}>
        {children}
      </div>
    </div>
  );
}

export default BrowserFrame;
