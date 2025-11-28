interface IconProps {
  className?: string;
  primaryColor?: string;
  accentColor?: string;
}

// 邀请好友图标
export function InviteIcon({ className = "w-6 h-6", primaryColor = "#ffffff", accentColor = "#22C55E" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke={primaryColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="8.5" cy="7" r="4" stroke={primaryColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M20 8V14M23 11H17" stroke={accentColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

// 借贷图标
export function LoanIcon({ className = "w-6 h-6", primaryColor = "#ffffff", accentColor = "#22C55E" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="5" width="20" height="14" rx="2" stroke={primaryColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="12" cy="12" r="3" stroke={accentColor} strokeWidth="2.5" fill={accentColor} opacity="0.2"/>
      <circle cx="12" cy="12" r="1.5" fill={accentColor}/>
      <path d="M2 10H22" stroke={primaryColor} strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

// IEO图标
export function IEOIcon({ className = "w-6 h-6", primaryColor = "#ffffff", accentColor = "#22C55E" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke={primaryColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M2 17L12 22L22 17" stroke={primaryColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M2 12L12 17L22 12" stroke={accentColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

// 投资理财图标
export function InvestIcon({ className = "w-6 h-6", primaryColor = "#ffffff", accentColor = "#22C55E" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 17L9 11L13 15L21 7" stroke={accentColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M21 7H16M21 7V12" stroke={primaryColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="9" cy="11" r="1.5" fill={accentColor}/>
      <circle cx="13" cy="15" r="1.5" fill={accentColor}/>
    </svg>
  );
}

// 更多图标
export function MoreIcon({ className = "w-6 h-6", primaryColor = "#ffffff", accentColor = "#22C55E" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width="8" height="8" rx="1.5" stroke={primaryColor} strokeWidth="2"/>
      <rect x="3" y="13" width="8" height="8" rx="1.5" stroke={primaryColor} strokeWidth="2"/>
      <rect x="13" y="3" width="8" height="8" rx="1.5" stroke={primaryColor} strokeWidth="2"/>
      <rect x="13" y="13" width="8" height="8" rx="1.5" stroke={accentColor} strokeWidth="2.5" fill={accentColor} opacity="0.2"/>
    </svg>
  );
}
