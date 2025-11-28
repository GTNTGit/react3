import React, { useState } from 'react';
import { ArrowLeft, Upload, Camera, FileText, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { useTranslation } from 'react-i18next';

interface KYCL2PageProps {
  theme: 'dark' | 'light';
}

export function KYCL2Page({ theme }: KYCL2PageProps) {
  const { colors } = useTheme();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [idFront, setIdFront] = useState<string | null>(null);
  const [idBack, setIdBack] = useState<string | null>(null);
  const [idHold, setIdHold] = useState<string | null>(null);

  const handleFileSelect = (type: 'front' | 'back' | 'hold') => {
    const fakeImageUrl = 'https://via.placeholder.com/400x250/1a1d29/22C55E?text=ID+Photo';
    if (type === 'front') setIdFront(fakeImageUrl);
    if (type === 'back') setIdBack(fakeImageUrl);
    if (type === 'hold') setIdHold(fakeImageUrl);
  };

  const handleSubmit = () => {
    if (!idFront || !idBack || !idHold) {
      alert(t('kyc.upload_all_photos'));
      return;
    }
    alert(t('kyc.application_submitted'));
    navigate('/kyc');
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: colors.bg }}>
      <div className="sticky top-0 z-10 px-4 py-3 flex items-center gap-3 border-b" style={{ backgroundColor: colors.cardBg, borderColor: colors.border }}>
        <button onClick={() => navigate('/kyc')} className="w-9 h-9 rounded-lg flex items-center justify-center transition-all active:opacity-70" style={{ backgroundColor: colors.bg }}>
          <ArrowLeft className="w-5 h-5" style={{ color: colors.text }} />
        </button>
        <h1 style={{ color: colors.text }}>{t('kyc.l2_title')}</h1>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="rounded-xl p-4 flex items-start gap-3" style={{ backgroundColor: theme === 'light' ? '#FEF3C7' : '#F59E0B15', border: `1px solid #F59E0B` }}>
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#F59E0B' }} />
          <div className="flex-1">
            <div className="text-sm mb-1" style={{ color: colors.text }}>{t('kyc.warm_tips')}</div>
            <ul className="text-xs space-y-1" style={{ color: colors.textSecondary }}>
              <li>• {t('kyc.tip_1')}</li>
              <li>• {t('kyc.tip_2')}</li>
              <li>• {t('kyc.tip_3')}</li>
              <li>• {t('kyc.tip_4')}</li>
            </ul>
          </div>
        </div>

        <div className="rounded-xl p-4" style={{ backgroundColor: colors.cardBg, border: `1px solid ${colors.border}` }}>
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle2 className="w-5 h-5" style={{ color: colors.primary }} />
            <div>
              <div className="text-sm" style={{ color: colors.text }}>{t('kyc.l1_completed')}</div>
              <div className="text-xs" style={{ color: colors.textSecondary }}>{t('kyc.name_id_verified')}</div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-sm mb-3 px-1" style={{ color: colors.text }}>{t('kyc.id_photos')}</h2>
          <div className="space-y-3">
            <div>
              <label className="block text-xs mb-2 px-1" style={{ color: colors.textSecondary }}>{t('kyc.id_front')}</label>
              <button
                onClick={() => handleFileSelect('front')}
                className="w-full rounded-xl p-6 flex flex-col items-center justify-center gap-3 transition-all active:opacity-70 relative overflow-hidden"
                style={{ 
                  backgroundColor: colors.cardBg,
                  border: `2px dashed ${idFront ? colors.primary : colors.border}`,
                  minHeight: '180px'
                }}
              >
                {idFront ? (
                  <>
                    <img src={idFront} alt="ID Front" className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <div className="flex items-center gap-2 px-3 py-2 rounded-lg" style={{ backgroundColor: colors.primary }}>
                        <CheckCircle2 className="w-4 h-4 text-white" />
                        <span className="text-xs text-white">{t('kyc.uploaded')}</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ backgroundColor: theme === 'light' ? '#F3F4F6' : '#1F2937' }}>
                      <Upload className="w-7 h-7" style={{ color: colors.textSecondary }} />
                    </div>
                    <div className="text-center">
                      <div className="text-sm mb-1" style={{ color: colors.text }}>{t('kyc.click_upload_front')}</div>
                      <div className="text-xs" style={{ color: colors.textSecondary }}>{t('kyc.must_include_emblem')}</div>
                    </div>
                  </>
                )}
              </button>
            </div>

            <div>
              <label className="block text-xs mb-2 px-1" style={{ color: colors.textSecondary }}>{t('kyc.id_back')}</label>
              <button
                onClick={() => handleFileSelect('back')}
                className="w-full rounded-xl p-6 flex flex-col items-center justify-center gap-3 transition-all active:opacity-70 relative overflow-hidden"
                style={{ 
                  backgroundColor: colors.cardBg,
                  border: `2px dashed ${idBack ? colors.primary : colors.border}`,
                  minHeight: '180px'
                }}
              >
                {idBack ? (
                  <>
                    <img src={idBack} alt="ID Back" className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <div className="flex items-center gap-2 px-3 py-2 rounded-lg" style={{ backgroundColor: colors.primary }}>
                        <CheckCircle2 className="w-4 h-4 text-white" />
                        <span className="text-xs text-white">{t('kyc.uploaded')}</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ backgroundColor: theme === 'light' ? '#F3F4F6' : '#1F2937' }}>
                      <Upload className="w-7 h-7" style={{ color: colors.textSecondary }} />
                    </div>
                    <div className="text-center">
                      <div className="text-sm mb-1" style={{ color: colors.text }}>{t('kyc.click_upload_back')}</div>
                      <div className="text-xs" style={{ color: colors.textSecondary }}>{t('kyc.must_include_info')}</div>
                    </div>
                  </>
                )}
              </button>
            </div>

            <div>
              <label className="block text-xs mb-2 px-1" style={{ color: colors.textSecondary }}>{t('kyc.id_hold')}</label>
              <button
                onClick={() => handleFileSelect('hold')}
                className="w-full rounded-xl p-6 flex flex-col items-center justify-center gap-3 transition-all active:opacity-70 relative overflow-hidden"
                style={{ 
                  backgroundColor: colors.cardBg,
                  border: `2px dashed ${idHold ? colors.primary : colors.border}`,
                  minHeight: '180px'
                }}
              >
                {idHold ? (
                  <>
                    <img src={idHold} alt="ID Hold" className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <div className="flex items-center gap-2 px-3 py-2 rounded-lg" style={{ backgroundColor: colors.primary }}>
                        <CheckCircle2 className="w-4 h-4 text-white" />
                        <span className="text-xs text-white">{t('kyc.uploaded')}</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ backgroundColor: theme === 'light' ? '#F3F4F6' : '#1F2937' }}>
                      <Camera className="w-7 h-7" style={{ color: colors.textSecondary }} />
                    </div>
                    <div className="text-center">
                      <div className="text-sm mb-1" style={{ color: colors.text }}>{t('kyc.click_upload_hold')}</div>
                      <div className="text-xs" style={{ color: colors.textSecondary }}>{t('kyc.must_show_face')}</div>
                    </div>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="rounded-xl p-4 flex items-start gap-3" style={{ backgroundColor: theme === 'light' ? '#EFF6FF' : '#1E3A8A15', border: `1px solid ${theme === 'light' ? '#BFDBFE' : '#1E3A8A'}` }}>
          <FileText className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#3B82F6' }} />
          <div className="flex-1">
            <div className="text-sm mb-1" style={{ color: colors.text }}>{t('kyc.privacy_protection')}</div>
            <div className="text-xs leading-relaxed" style={{ color: colors.textSecondary }}>{t('kyc.privacy_content')}</div>
          </div>
        </div>

        <div className="pb-4">
          <button
            onClick={handleSubmit}
            className="w-full py-4 rounded-xl transition-all active:scale-98"
            style={{ 
              background: colors.primaryGradient,
              color: 'white',
              opacity: (idFront && idBack && idHold) ? 1 : 0.5
            }}
          >
            <span>{t('kyc.submit_application')}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
