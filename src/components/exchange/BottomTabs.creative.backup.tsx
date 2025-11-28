import { Home, BarChart2, ArrowLeftRight, TrendingUp, Wallet } from 'lucide-react';

const tabs = [
  { icon: Home, label: '首页', active: true },
  { icon: BarChart2, label: '行情', active: false },
  { icon: ArrowLeftRight, label: '交易', active: false },
  { icon: TrendingUp, label: '合约', active: false },
  { icon: Wallet, label: '资产', active: false },
];

interface BottomTabsProps {
  colors: any;
}

export function BottomTabs({ colors }: BottomTabsProps) {
  return (
    <nav 
      className="fixed bottom-0 left-0 right-0 z-50 transition-colors duration-300 backdrop-blur-xl" 
      style={{ 
        backgroundColor: `${colors.bg}f0`,
        borderTop: `1px solid ${colors.border}`,
        boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
      }}
    >
      {/* Top edge glow */}
      <div 
        className="absolute top-0 left-0 right-0 h-px opacity-40"
        style={{ 
          background: 'linear-gradient(90deg, transparent 0%, #F59E0B 50%, transparent 100%)' 
        }}
      />
      
      <div className="flex items-center justify-around px-2 pb-2 pt-1 safe-area-inset-bottom">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className="flex flex-col items-center gap-1.5 py-2 px-3 min-w-[60px] active:scale-95 transition-all relative group"
          >
            {/* Active background with glassmorphism */}
            {tab.active && (
              <div 
                className="absolute inset-0 rounded-2xl transition-all"
                style={{ 
                  background: `linear-gradient(135deg, ${colors.primary}20 0%, ${colors.primary}10 100%)`,
                  border: `1px solid ${colors.primary}30`,
                  boxShadow: `0 0 20px ${colors.primary}20, inset 0 1px 0 rgba(255,255,255,0.1)`
                }}
              >
                {/* Inner glow */}
                <div 
                  className="absolute inset-0 rounded-2xl blur-md opacity-50"
                  style={{ background: `radial-gradient(circle at 50% 0%, ${colors.primary}40 0%, transparent 70%)` }}
                />
              </div>
            )}
            
            {/* Icon Container */}
            <div className="relative z-10">
              {/* Active icon glow effect */}
              {tab.active && (
                <div 
                  className="absolute inset-0 blur-lg opacity-60 animate-pulse"
                  style={{ 
                    background: `radial-gradient(circle, ${colors.primary} 0%, transparent 70%)`,
                    animation: 'pulse 2s ease-in-out infinite'
                  }}
                />
              )}
              
              {/* Icon with decorative ring for active state */}
              <div className="relative">
                {tab.active && (
                  <div 
                    className="absolute -inset-2 rounded-full opacity-30 animate-ping"
                    style={{ 
                      border: `1px solid ${colors.primary}`,
                      animationDuration: '3s'
                    }}
                  />
                )}
                
                <tab.icon 
                  className="w-6 h-6 relative z-10 transition-all"
                  style={{ 
                    color: tab.active ? colors.primary : colors.textSecondary,
                    filter: tab.active ? `drop-shadow(0 0 6px ${colors.primary}80)` : 'none'
                  }}
                  strokeWidth={tab.active ? 2.5 : 1.5}
                />
              </div>
            </div>
            
            {/* Label with gradient for active */}
            <span 
              className="text-xs relative z-10 transition-all"
              style={{ 
                color: tab.active ? colors.primary : colors.textSecondary,
                fontWeight: tab.active ? 600 : 400,
                textShadow: tab.active ? `0 0 10px ${colors.primary}60` : 'none'
              }}
            >
              {tab.label}
            </span>
            
            {/* Top indicator dot - modern minimal design */}
            {tab.active && (
              <div 
                className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full animate-pulse"
                style={{ 
                  background: colors.primary,
                  boxShadow: `0 0 8px ${colors.primary}`
                }}
              />
            )}
          </button>
        ))}
      </div>
      
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }
        .safe-area-inset-bottom {
          padding-bottom: max(0.5rem, env(safe-area-inset-bottom));
        }
      `}</style>
    </nav>
  );
}
