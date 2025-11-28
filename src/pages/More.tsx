import { ArrowLeft, Boxes } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { useTranslation } from 'react-i18next';
// ⚠️ 核心改造 1: 导入 nativeService
import { postNativeMessage } from '../services/nativeService';
// ⚠️ 核心改造 2: 导入 Button 组件
import { Button } from '../components/ui/button';

export default function More() {
  const navigate = useNavigate();
  const { colors } = useTheme();
  const { t } = useTranslation();

  // ⚠️ 核心改造 3: 添加一个测试按钮
  const handleNativeAlert = () => {
      postNativeMessage({
          type: 'SHOW_TOAST',
          payload: {
              message: '这是来自 Web App 的原生 App 弹窗！',
          }
      });
  };

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
        
        <div className="text-center mb-6" style={{ color: colors.textSecondary }}>
          {t('more.more_features_coming')}
        </div>

        {/* ⚠️ 在页面底部添加测试按钮 */}
        <div className="p-4 flex flex-col gap-4 w-full max-w-md">
          <Button onClick={handleNativeAlert}>
            点击调用 App 原生弹窗 (测试通信)
          </Button>

          <Button 
            onClick={() => postNativeMessage({ type: 'OPEN_URL_EXTERNAL', payload: { url: 'https://www.google.com' } })}
            variant="outline"
          >
            点击调用 App 原生浏览器打开 Google
          </Button>
        </div>
      </div>
    </div>
  );
}
