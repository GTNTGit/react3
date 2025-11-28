import { ArrowLeft, CheckCircle2, Globe } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../contexts/ThemeContext';

interface LanguagePageProps {
  theme: 'dark' | 'light';
}

export function LanguagePage({ theme }: LanguagePageProps) {
  const { colors } = useTheme();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  
  // 获取当前语言，只支持 zh 和 en
  const currentLanguage = i18n.language || 'zh';
  // 规范化语言代码（处理 'zh-CN' -> 'zh', 'en-US' -> 'en'）
  const normalizedLanguage = currentLanguage.startsWith('zh') ? 'zh' : currentLanguage.startsWith('en') ? 'en' : 'zh';
  const [selected, setSelected] = React.useState(normalizedLanguage);
  
  // 同步当前语言状态
  React.useEffect(() => {
    const normalized = i18n.language?.startsWith('zh') ? 'zh' : i18n.language?.startsWith('en') ? 'en' : 'zh';
    setSelected(normalized);
  }, [i18n.language]);
  
  // 只显示支持的语言
  const languages = [
    { code: 'zh', name: '简体中文', nativeName: 'Simplified Chinese', region: '中国大陆' },
    { code: 'en', name: 'English', nativeName: 'English', region: 'United States' },
  ];

  // 处理语言切换
  const handleLanguageChange = (code: string) => {
    setSelected(code);
    i18n.changeLanguage(code);
  };

  // 保存设置（实际上切换时已经生效，这里可以添加额外的保存逻辑）
  const handleSave = () => {
    // 语言切换已经在 handleLanguageChange 中完成
    // 这里可以添加其他保存逻辑，比如通知服务器等
    navigate(-1); // 返回上一页
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: colors.bg }}>
      <div className="sticky top-0 z-10 px-4 py-3 flex items-center gap-3 border-b" style={{ backgroundColor: colors.cardBg, borderColor: colors.border }}>
        <button onClick={() => navigate('/')} className="w-9 h-9 rounded-lg flex items-center justify-center transition-all active:opacity-70" style={{ backgroundColor: colors.bg }}>
          <ArrowLeft className="w-5 h-5" style={{ color: colors.text }} />
        </button>
        <h1 style={{ color: colors.text }}>{t('language.title')}</h1>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="rounded-2xl p-6" style={{ background: theme === 'light' ? `linear-gradient(135deg, ${colors.cardBg} 0%, ${colors.primary}08 100%)` : `linear-gradient(135deg, ${colors.cardBg} 0%, ${colors.primary}15 100%)`, border: `1.5px solid ${colors.border}` }}>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${colors.primary}20 0%, ${colors.primary}40 100%)`, border: `2px solid ${colors.primary}` }}>
              <Globe className="w-8 h-8" style={{ color: colors.primary }} />
            </div>
            <div className="flex-1">
              <div className="text-sm mb-1" style={{ color: colors.textSecondary }}>{t('language.current_language')}</div>
              <div className="text-lg" style={{ color: colors.text }}>{languages.find(lang => lang.code === selected)?.name || '简体中文'}</div>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-sm mb-3 px-1" style={{ color: colors.text }}>{t('language.select_language')}</h2>
          <div className="space-y-2">
            {languages.map((lang) => (
              <button 
                key={lang.code} 
                onClick={() => handleLanguageChange(lang.code)} 
                className="w-full rounded-xl p-4 flex items-center justify-between transition-all active:opacity-70" 
                style={{ 
                  backgroundColor: selected === lang.code ? `${colors.primary}15` : colors.cardBg, 
                  border: `1.5px solid ${selected === lang.code ? colors.primary : colors.border}` 
                }}
              >
                <div className="flex-1 text-left">
                  <div className="flex items-center gap-2 mb-1">
                    <span style={{ color: selected === lang.code ? colors.primary : colors.text, fontSize: '15px' }}>{lang.name}</span>
                    {selected === lang.code && (
                      <span className="text-xs px-2 py-0.5 rounded" style={{ backgroundColor: colors.primary, color: 'white' }}>
                        {t('language.in_use')}
                      </span>
                    )}
                  </div>
                  <div className="text-xs" style={{ color: colors.textSecondary }}>{lang.nativeName} · {lang.region}</div>
                </div>
                {selected === lang.code && <CheckCircle2 className="w-6 h-6 flex-shrink-0" style={{ color: colors.primary }} />}
              </button>
            ))}
          </div>
        </div>
        <div className="rounded-xl p-4" style={{ backgroundColor: theme === 'light' ? '#DBEAFE' : '#3B82F620', border: `1px solid ${theme === 'light' ? '#BFDBFE' : '#3B82F640'}` }}>
          <div className="flex items-start gap-3">
            <Globe className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#3B82F6' }} />
            <div>
              <div className="text-sm mb-1" style={{ color: colors.text }}>{t('language.description_title')}</div>
              <div className="text-xs leading-relaxed" style={{ color: colors.textSecondary }}>{t('language.description')}</div>
            </div>
          </div>
        </div>
        <button 
          onClick={handleSave}
          className="w-full py-3.5 rounded-xl transition-all active:opacity-70" 
          style={{ backgroundColor: colors.primary, color: 'white' }}
        >
          {t('language.save_settings')}
        </button>
      </div>
    </div>
  );
}
