import { ArrowLeft, ShieldCheck, User, FileText, Camera, CheckCircle2, Clock, ChevronRight, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { useTranslation } from 'react-i18next';

interface KYCPageProps {
  theme: 'dark' | 'light';
}

export function KYCPage({ theme }: KYCPageProps) {
  const { colors } = useTheme();
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: colors.bg }}>
      <div className="sticky top-0 z-10 px-4 py-3 flex items-center gap-3 border-b" style={{ backgroundColor: colors.cardBg, borderColor: colors.border }}>
        <button onClick={() => navigate('/')} className="w-9 h-9 rounded-lg flex items-center justify-center transition-all active:opacity-70" style={{ backgroundColor: colors.bg }}>
          <ArrowLeft className="w-5 h-5" style={{ color: colors.text }} />
        </button>
        <h1 style={{ color: colors.text }}>{t('kyc.title')}</h1>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="rounded-2xl p-6" style={{ background: theme === 'light' ? `linear-gradient(135deg, ${colors.cardBg} 0%, ${colors.primary}08 100%)` : `linear-gradient(135deg, ${colors.cardBg} 0%, ${colors.primary}15 100%)`, border: `1.5px solid ${colors.border}` }}>
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <ShieldCheck className="w-5 h-5" style={{ color: colors.primary }} />
                <span className="text-lg" style={{ color: colors.text }}>{t('kyc.verification_level')}</span>
              </div>
              <div className="text-sm" style={{ color: colors.textSecondary }}>{t('kyc.complete_verification')}</div>
            </div>
            <div className="px-3 py-1 rounded-lg" style={{ background: `linear-gradient(135deg, ${colors.primary}20 0%, ${colors.primary}40 100%)`, border: `1px solid ${colors.primary}` }}>
              <span className="text-sm" style={{ color: colors.primary }}>L1</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ backgroundColor: theme === 'light' ? '#F3F4F6' : '#1F2937' }}>
              <div className="h-full rounded-full transition-all duration-500" style={{ width: '50%', background: `linear-gradient(90deg, ${colors.primary} 0%, #10B981 100%)` }} />
            </div>
            <span className="text-xs" style={{ color: colors.textSecondary }}>50%</span>
          </div>
        </div>
        <div>
          <h2 className="text-sm mb-3 px-1" style={{ color: colors.text }}>{t('kyc.verification_types')}</h2>
          <div className="space-y-3">
            <button className="w-full rounded-2xl p-5 transition-all active:opacity-70" style={{ background: theme === 'light' ? `linear-gradient(135deg, ${colors.cardBg} 0%, #10B98108 100%)` : `linear-gradient(135deg, ${colors.cardBg} 0%, #10B98115 100%)`, border: `1.5px solid #10B981` }}>
              <div className="flex items-start gap-4 mb-4">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: `linear-gradient(135deg, #10B98120 0%, #10B98140 100%)`, border: `2px solid #10B981` }}>
                  <User className="w-7 h-7" style={{ color: '#10B981' }} />
                </div>
                <div className="flex-1 text-left">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg" style={{ color: colors.text }}>{t('kyc.personal_l1')}</span>
                    <div className="flex items-center gap-1 px-2 py-0.5 rounded-full" style={{ backgroundColor: theme === 'light' ? '#DCFCE7' : '#10B98120' }}>
                      <CheckCircle2 className="w-3.5 h-3.5" style={{ color: '#10B981' }} />
                      <span className="text-xs" style={{ color: '#10B981' }}>{t('kyc.verified')}</span>
                    </div>
                  </div>
                  <div className="text-sm mb-3" style={{ color: colors.textSecondary }}>{t('kyc.l1_desc')}</div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: '#10B981' }} />
                      <span className="text-xs" style={{ color: colors.textSecondary }}>{t('kyc.daily_withdraw_limit')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: '#10B981' }} />
                      <span className="text-xs" style={{ color: colors.textSecondary }}>{t('kyc.fiat_deposit_limit')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: '#10B981' }} />
                      <span className="text-xs" style={{ color: colors.textSecondary }}>{t('kyc.spot_option_trading')}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between pt-3" style={{ borderTop: `1px solid ${theme === 'light' ? '#10B98120' : '#10B98130'}` }}>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" style={{ color: '#10B981' }} />
                  <span className="text-xs" style={{ color: '#10B981' }}>{t('kyc.verified_on')}</span>
                </div>
                <ChevronRight className="w-4 h-4" style={{ color: colors.textSecondary }} />
              </div>
            </button>
            <button onClick={() => navigate('/kyc-l2')} className="w-full rounded-2xl p-5 transition-all active:opacity-70" style={{ backgroundColor: colors.cardBg, border: `1.5px solid ${colors.border}` }}>
              <div className="flex items-start gap-4 mb-4">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: theme === 'light' ? '#F59E0B15' : '#F59E0B20', border: `2px solid #F59E0B` }}>
                  <FileText className="w-7 h-7" style={{ color: '#F59E0B' }} />
                </div>
                <div className="flex-1 text-left">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg" style={{ color: colors.text }}>{t('kyc.advanced_l2')}</span>
                    <div className="flex items-center gap-1 px-2 py-0.5 rounded-full" style={{ backgroundColor: theme === 'light' ? '#FEF3C7' : '#F59E0B20' }}>
                      <Clock className="w-3.5 h-3.5" style={{ color: '#F59E0B' }} />
                      <span className="text-xs" style={{ color: '#F59E0B' }}>{t('kyc.not_verified')}</span>
                    </div>
                  </div>
                  <div className="text-sm mb-3" style={{ color: colors.textSecondary }}>{t('kyc.l2_desc')}</div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0" style={{ border: `1.5px solid ${colors.textSecondary}` }}>
                        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: colors.textSecondary }} />
                      </div>
                      <span className="text-xs" style={{ color: colors.textSecondary }}>{t('kyc.daily_withdraw_limit_l2')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0" style={{ border: `1.5px solid ${colors.textSecondary}` }}>
                        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: colors.textSecondary }} />
                      </div>
                      <span className="text-xs" style={{ color: colors.textSecondary }}>{t('kyc.fiat_deposit_limit_l2')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0" style={{ border: `1.5px solid ${colors.textSecondary}` }}>
                        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: colors.textSecondary }} />
                      </div>
                      <span className="text-xs" style={{ color: colors.textSecondary }}>{t('kyc.all_features')}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between pt-3" style={{ borderTop: `1px solid ${colors.border}` }}>
                <div className="flex items-center gap-2">
                  <Camera className="w-4 h-4" style={{ color: colors.textSecondary }} />
                  <span className="text-xs" style={{ color: colors.textSecondary }}>{t('kyc.need_upload')}</span>
                </div>
                <ChevronRight className="w-4 h-4" style={{ color: colors.textSecondary }} />
              </div>
            </button>
          </div>
        </div>
        <div className="rounded-xl p-4 flex items-start gap-3" style={{ backgroundColor: theme === 'light' ? '#EFF6FF' : '#1E3A8A15', border: `1px solid ${theme === 'light' ? '#BFDBFE' : '#1E3A8A'}` }}>
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#3B82F6' }} />
          <div className="flex-1">
            <div className="text-sm mb-1" style={{ color: colors.text }}>{t('kyc.verification_tip')}</div>
            <div className="text-xs leading-relaxed" style={{ color: colors.textSecondary }}>{t('kyc.verification_tip_content')}</div>
          </div>
        </div>
      </div>
    </div>
  );
}