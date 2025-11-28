import { ArrowLeft, Crown, TrendingUp, Zap, Star, Gift, Award, Shield, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { useTranslation } from 'react-i18next';

interface VIPPageProps {
  theme: 'dark' | 'light';
}

export function VIPPage({ theme }: VIPPageProps) {
  const { colors } = useTheme();
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: colors.bg }}>
      <div className="sticky top-0 z-10 px-4 py-3 flex items-center gap-3 border-b" style={{ backgroundColor: colors.cardBg, borderColor: colors.border }}>
        <button onClick={() => navigate('/')} className="w-9 h-9 rounded-lg flex items-center justify-center transition-all active:opacity-70" style={{ backgroundColor: colors.bg }}>
          <ArrowLeft className="w-5 h-5" style={{ color: colors.text }} />
        </button>
        <h1 style={{ color: colors.text }}>{t('vip.title')}</h1>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="rounded-2xl p-6 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #7C3AED 0%, #A855F7 50%, #C026D3 100%)' }}>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Crown className="w-8 h-8 text-white" />
                <div>
                  <div className="text-white text-xl">VIP 9</div>
                  <div className="text-white/70 text-xs">{t('vip.current_level')}</div>
                </div>
              </div>
              <div className="px-3 py-1.5 rounded-lg bg-white/20 backdrop-blur-sm">
                <span className="text-white text-xs">{t('vip.lifetime_member')}</span>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: t('vip.fee'), value: '0%' },
                { label: t('vip.withdraw_limit'), value: t('vip.unlimited') },
                { label: t('vip.exclusive_service'), value: '7x24' },
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="text-white text-lg">{item.value}</div>
                  <div className="text-white/70 text-xs mt-1">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/10 -translate-y-16 translate-x-16" />
          <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full bg-white/10 translate-y-12 -translate-x-12" />
        </div>
        <div>
          <h2 className="text-sm mb-3 px-1" style={{ color: colors.text }}>{t('vip.exclusive_privileges')}</h2>
          <div className="space-y-3">
            {[
              { icon: TrendingUp, title: t('vip.zero_fee_trading'), desc: t('vip.zero_fee_desc'), color: '#10B981' },
              { icon: Zap, title: t('vip.priority_service'), desc: t('vip.priority_service_desc'), color: '#F59E0B' },
              { icon: Star, title: t('vip.exclusive_activities'), desc: t('vip.exclusive_activities_desc'), color: '#3B82F6' },
              { icon: Gift, title: t('vip.birthday_gift'), desc: t('vip.birthday_gift_desc'), color: '#EC4899' },
              { icon: Award, title: t('vip.priority_listing'), desc: t('vip.priority_listing_desc'), color: '#8B5CF6' },
              { icon: Shield, title: t('vip.asset_protection'), desc: t('vip.asset_protection_desc'), color: '#06B6D4' },
            ].map((item, index) => (
              <div key={index} className="rounded-xl p-4 flex items-center gap-4" style={{ backgroundColor: colors.cardBg, border: `1px solid ${colors.border}` }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: theme === 'light' ? `${item.color}15` : `${item.color}20`, border: `1.5px solid ${item.color}40` }}>
                  <item.icon className="w-6 h-6" style={{ color: item.color }} />
                </div>
                <div className="flex-1">
                  <div className="mb-1" style={{ color: colors.text }}>{item.title}</div>
                  <div className="text-xs" style={{ color: colors.textSecondary }}>{item.desc}</div>
                </div>
                <Check className="w-5 h-5 flex-shrink-0" style={{ color: '#10B981' }} />
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-sm mb-3 px-1" style={{ color: colors.text }}>{t('vip.level_description')}</h2>
          <div className="rounded-xl p-4 space-y-3" style={{ backgroundColor: colors.cardBg, border: `1px solid ${colors.border}` }}>
            {[
              { level: t('vip.level_1_3'), requirement: t('vip.requirement_10k'), fee: '0.08%' },
              { level: t('vip.level_4_6'), requirement: t('vip.requirement_100k'), fee: '0.05%' },
              { level: t('vip.level_7_9'), requirement: t('vip.requirement_1m'), fee: '0.00%' },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <div className="text-sm mb-1" style={{ color: colors.text }}>{item.level}</div>
                  <div className="text-xs" style={{ color: colors.textSecondary }}>{item.requirement}</div>
                </div>
                <div className="px-3 py-1 rounded-lg" style={{ backgroundColor: theme === 'light' ? '#F3F4F6' : '#1F2937', color: colors.text }}>
                  <span className="text-xs">{t('vip.fee_rate')} {item.fee}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
