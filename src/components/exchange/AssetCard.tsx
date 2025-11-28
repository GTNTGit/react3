import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../contexts/ThemeContext';

interface AssetCardProps {
}

export function AssetCard({}: AssetCardProps) {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const [hideBalance, setHideBalance] = useState(false);

  return (
    <div 
      className="px-3 py-4 relative overflow-hidden"
      style={{
        backgroundColor: 'transparent',
      }}
    >
      <div className="flex items-center justify-between gap-4 relative z-10">
        {/* Left: Balance Info */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs" style={{ color: colors.textSecondary }}>{t('asset_card.net_worth')}</span>
            <button 
              onClick={() => setHideBalance(!hideBalance)}
              className="transition-all active:opacity-70"
            >
              {hideBalance ? (
                <EyeOff className="w-3.5 h-3.5" style={{ color: colors.textSecondary, opacity: 0.6 }} />
              ) : (
                <Eye className="w-3.5 h-3.5" style={{ color: colors.textSecondary, opacity: 0.6 }} />
              )}
            </button>
          </div>
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-2xl" style={{ color: colors.text }}>
              {hideBalance ? '****' : '100,000.00'}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-xs" style={{ color: colors.success }}>
              {t('asset_card.today_profit')} {hideBalance ? '****' : '+$0.00'}
            </span>
            <span className="text-xs" style={{ color: colors.success }}>
              {hideBalance ? '' : '(+0.00%)'}
            </span>
          </div>
        </div>

        {/* Right: Add Funds Button */}
        <button 
          className="px-5 h-9 rounded-full active:scale-95 transition-all shrink-0"
          style={{ 
            backgroundColor: colors.primary,
            color: '#fff',
          }}
        >
          <span className="text-sm font-medium">{t('asset_card.add_funds')}</span>
        </button>
      </div>
    </div>
  );
}