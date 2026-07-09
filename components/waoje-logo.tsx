export function WaojeLogo({ className = "", stroke = "#000000", dot = "#E4342A" }: { className?: string; stroke?: string; dot?: string }) {
  return (
    <svg viewBox="0 0 200 240" className={className} fill="none">
      <path d="M 100 20 L 30 160 L 170 160 Z" stroke={stroke} strokeWidth="6" strokeLinejoin="round" />
      <path d="M 100 50 L 55 140 L 145 140 Z" stroke={stroke} strokeWidth="6" strokeLinejoin="round" />
      <circle cx="100" cy="100" r="12" fill={dot} />
    </svg>
  );
}

export function WaojeWordmark({ className = "", fill = "#000000" }: { className?: string; fill?: string }) {
  return (
    <svg viewBox="0 0 200 240" className={className} fill="none">
      <path d="M 100 20 L 30 160 L 170 160 Z" stroke={fill} strokeWidth="6" strokeLinejoin="round" />
      <path d="M 100 50 L 55 140 L 145 140 Z" stroke={fill} strokeWidth="6" strokeLinejoin="round" />
      <circle cx="100" cy="100" r="12" fill="#E4342A" />
      <text x="100" y="200" fontFamily="Arial, sans-serif" fontSize="34" fontWeight="800" textAnchor="middle" fill={fill} letterSpacing="3">
        WAOJE
      </text>
    </svg>
  );
}
