import { ArrowLeft, Boxes } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { useTranslation } from 'react-i18next';

export default function More() {
  const navigate = useNavigate();
  const { colors } = useTheme();
  const { t } = useTranslation();

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.bg }}>
      {/* Header */}
      <div 
        className="sticky top-0 z-50 px-4 py-4 flex items-center justify-between"
        style={{ 
          backgroundColor: colors.bg,
          borderBottom: `1px solid ${colors.border}`,
        }}
      >
        <button onClick={() => navigate('/')} className="p-2 -ml-2">
          <ArrowLeft size={24} style={{ color: colors.text }} />
        </button>
        <span style={{ color: colors.text }}>{t('more.title')}</span>
        <div className="w-8" />
      </div>

      {/* 空状态 */}
      <div className="flex flex-col items-center justify-center px-4" style={{ minHeight: 'calc(100vh - 60px)' }}>
        <div 
          className="w-24 h-24 rounded-full flex items-center justify-center mb-6"
          style={{ backgroundColor: `${colors.primary}15` }}
        >
          <Boxes size={48} style={{ color: colors.primary, opacity: 0.5 }} />
        </div>
        
        <div className="text-xl mb-2" style={{ color: colors.text }}>
          {t('more.coming_soon')}
        </div>
        
        <div className="text-center" style={{ color: colors.textSecondary }}>
          {t('more.more_features_coming')}
        </div>
      </div>
    </div>
  );
}
