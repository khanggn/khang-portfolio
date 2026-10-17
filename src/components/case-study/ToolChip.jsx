import { useEffect, useRef } from 'react';
import sharedStyles from './CaseStudy.module.css';

export default function ToolChip({ icon, label, tooltip, id, isOpen, onToggle, prefersReduced, tooltipAlign = 'left', styles }) {
  const chipRef = useRef(null);
  const tooltipId = `tooltip-${id}`;

  useEffect(() => {
    if (!isOpen) return;
    const handleOutside = (e) => {
      if (chipRef.current && !chipRef.current.contains(e.target)) onToggle(null);
    };
    document.addEventListener('pointerdown', handleOutside);
    return () => document.removeEventListener('pointerdown', handleOutside);
  }, [isOpen, onToggle]);

  return (
    <span
      ref={chipRef}
      tabIndex={0}
      role="group"
      aria-describedby={isOpen ? tooltipId : undefined}
      onMouseEnter={() => onToggle(id)}
      onMouseLeave={() => onToggle(null)}
      onFocus={() => onToggle(id)}
      onBlur={() => onToggle(null)}
      onClick={(e) => { e.stopPropagation(); }}
      className={sharedStyles.toolChip}
      style={{
        border: isOpen ? '1px solid #C4B5FD' : '1px solid #4E4A5C',
        boxShadow: isOpen ? '0 0 11px rgba(196, 181, 253, 0.4)' : 'none',
      }}
      onKeyDown={(e) => { if (e.key === 'Escape') onToggle(null); }}
    >
      {icon}
      <span className={styles.toolChipLabel}>{label}</span>
      <span
        id={tooltipId}
        role="tooltip"
        className={styles.toolChipTooltip}
        style={{
          ...(tooltipAlign === 'right' ? { right: 0 } : { left: 0 }),
          opacity: isOpen ? 1 : 0,
          transform: isOpen
            ? 'translateY(0)'
            : (prefersReduced ? 'translateY(0)' : 'translateY(4px)'),
          transition: prefersReduced
            ? 'opacity 0.01s'
            : 'opacity 0.15s ease, transform 0.15s ease',
        }}
      >
        {tooltip}
      </span>
    </span>
  );
}
