export default function HandDrawnBox({ children, style }) {
  // Single continuous path tracing a wobbly rounded rectangle
  const boxPath =
    // start just after top-left corner
    'M35,6 ' +
    // top edge (left to right, with wobbles)
    'C65,3 95,8 130,5 C165,8 195,3 230,6 C265,3 295,8 330,5 C365,8 395,3 425,6 C445,4 458,7 465,6 ' +
    // top-right rounded corner
    'C480,5 496,5 497,20 ' +
    // right edge (top to bottom, with wobbles)
    'C498,55 494,90 497,130 C494,170 498,210 495,250 C498,290 494,330 497,370 C494,410 498,450 495,490 C498,530 496,565 495,580 ' +
    // bottom-right rounded corner
    'C496,598 497,606 480,606 ' +
    // bottom edge (right to left, with wobbles)
    'C455,608 425,603 395,607 C365,603 335,608 305,605 C275,608 245,603 215,607 C185,603 155,608 125,605 C95,608 65,603 45,606 ' +
    // bottom-left rounded corner
    'C22,607 4,607 5,588 ' +
    // left edge (bottom to top, with wobbles)
    'C3,560 7,530 4,495 C7,460 3,425 6,390 C3,355 7,320 4,285 C7,250 3,215 6,180 C3,145 7,110 4,75 C7,45 5,30 6,22 ' +
    // top-left rounded corner (back to start)
    'C5,8 20,7 35,6 Z';

  return (
    <div style={{ position: 'relative', padding: '16px 14px', ...style }}>
      <svg
        viewBox="0 0 500 610"
        preserveAspectRatio="none"
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          display: 'block',
          pointerEvents: 'none',
        }}
      >
        <path
          d={boxPath}
          fill="none"
          stroke="#4E4A5C"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {children}
    </div>
  );
}
