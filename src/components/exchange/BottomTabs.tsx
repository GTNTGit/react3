import React from 'react';
import { Home, BarChart2, Flag, TrendingUp, Wallet } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../contexts/ThemeContext';

interface BottomTabsProps {
}

export function BottomTabs({}: BottomTabsProps) {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

const tabs = [
    { id: 'home', path: '/', icon: Home, labelKey: 'navigation.home' },
    { id: 'trade', path: '/trade', icon: BarChart2, labelKey: 'navigation.spot' },
    { id: 'market', path: '/market', icon: Flag, labelKey: 'navigation.option', isCenter: true },
    { id: 'contract', path: '/contract', icon: TrendingUp, labelKey: 'navigation.contract' },
    { id: 'wallet', path: '/wallet', icon: Wallet, labelKey: 'navigation.wallet' },
  ];

  return (
    <nav 
      className="fixed bottom-0 left-0 right-0 z-50 transition-colors duration-300" 
      style={{ 
        backgroundColor: colors.bg,
        borderTop: `1px solid ${colors.border}`,
      }}
    >
      <div className="flex items-center justify-around px-2 py-2 safe-area-bottom">
        {tabs.map((tab, index) => {
          const isActive = location.pathname === tab.path;
          
          // Center button - flat design
          if (tab.isCenter) {
            return (
              <button
                key={index}
                onClick={() => navigate(tab.path)}
                className="flex flex-col items-center gap-0.5 px-4 active:opacity-70 transition-opacity"
              >
                <tab.icon 
                  className="w-6 h-6"
                  style={{ 
                    color: isActive ? colors.primary : colors.textSecondary,
                  }}
                  strokeWidth={isActive ? 2 : 1.5}
                />
                
                <span 
                  className="text-xs"
                  style={{ 
                    color: isActive ? colors.primary : colors.textSecondary,
                  }}
                >
                  {t(tab.labelKey)}
                </span>
              </button>
            );
          }
          
          // Regular tabs - flat design
          return (
            <button
              key={index}
              onClick={() => navigate(tab.path)}
              className="flex flex-col items-center gap-0.5 px-4 active:opacity-70 transition-opacity"
            >
              <tab.icon 
                className="w-6 h-6"
                style={{ 
                  color: isActive ? colors.primary : colors.textSecondary,
                }}
                strokeWidth={isActive ? 2 : 1.5}
              />
              
              <span 
                className="text-xs"
                style={{ 
                  color: isActive ? colors.primary : colors.textSecondary,
                }}
              >
                {t(tab.labelKey)}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
