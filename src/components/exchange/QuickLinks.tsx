import React from 'react';
import { 
  InviteIcon,
  LoanIcon,
  IEOIcon,
  InvestIcon,
  MoreIcon
} from './QuickLinkIcons';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../contexts/ThemeContext';

interface QuickLinksProps {
}

export function QuickLinks({}: QuickLinksProps) {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const links = [
    { icon: InviteIcon, labelKey: 'home.invite_friends', path: '/invite' },
    { icon: LoanIcon, labelKey: 'home.loan', path: '/loan' },
    { icon: IEOIcon, labelKey: 'home.ieo', path: '/ieo' },
    { icon: InvestIcon, labelKey: 'home.invest', path: '/invest' },
    { icon: MoreIcon, labelKey: 'home.more', path: '/more' },
  ];
  
  return (
    <div className="py-3 px-3">
      {/* Quick Action Grid - 5列 */}
      <div className="grid grid-cols-5 gap-4">
        {links.map((link, index) => {
          const IconComponent = link.icon;
          return (
            <button
              key={index}
              className="flex flex-col items-center gap-2 active:opacity-60 transition-opacity"
              onClick={() => navigate(link.path)}
            >
              {/* Icon - 圆形边框，透明白底 */}
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{
                  backgroundColor: colors.isDark ? 'rgba(255, 255, 255, 0.05)' : '#ffffff',
                  border: `1px solid ${colors.isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)'}`,
                }}
              >
                <IconComponent 
                  className="w-6 h-6"
                  primaryColor={colors.isDark ? '#ffffff' : '#1a1a1a'}
                  accentColor={colors.primary}
                />
              </div>
              
              {/* Label */}
              <span className="text-xs" style={{ color: colors.text }}>
                {t(link.labelKey)}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}