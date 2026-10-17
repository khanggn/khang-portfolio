function ShowcasePanel({ children, equalPadding = false }) {
  return (
    <div
      style={{
        background: '#303030',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '24px',
        padding: equalPadding ? '48px' : '32px 48px 48px',
        overflow: 'hidden',
      }}
    >
      {children}
    </div>
  );
}

export default ShowcasePanel;
