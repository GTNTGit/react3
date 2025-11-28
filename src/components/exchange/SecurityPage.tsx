import React, { useState } from 'react';
import { ArrowLeft, Lock, Shield, Mail, ShieldCheck, Smartphone, Key, CheckCircle2, AlertTriangle, ChevronRight, Eye, EyeOff, Copy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { useTranslation } from 'react-i18next';

interface SecurityPageProps {
  theme: 'dark' | 'light';
}

export function SecurityPage({ theme }: SecurityPageProps) {
  const { colors } = useTheme();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [currentView, setCurrentView] = useState<'main' | 'password' | '2fa' | 'email' | 'antiphishing' | 'phone'>('main');
  const [showPassword, setShowPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [antiPhishingCode, setAntiPhishingCode] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);
  const [twoFactorCode, setTwoFactorCode] = useState(['', '', '', '', '', '']);

  const securityItems = [
    { enabled: true, points: 25 },
    { enabled: true, points: 30 },
    { enabled: true, points: 20 },
    { enabled: false, points: 15 },
    { enabled: true, points: 10 },
  ];
  const currentScore = securityItems.reduce((sum, item) => sum + (item.enabled ? item.points : 0), 0);
  const maxScore = securityItems.reduce((sum, item) => sum + item.points, 0);

  const handleCopy2FASecret = () => {
    navigator.clipboard.writeText('JBSWY3DPEHPK3PXP');
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const handlePasswordChange = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      alert(t('security.fill_all_fields'));
      return;
    }
    if (newPassword !== confirmPassword) {
      alert(t('security.password_mismatch'));
      return;
    }
    if (newPassword.length < 8) {
      alert(t('security.password_too_short'));
      return;
    }
    alert(t('security.password_changed'));
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setCurrentView('main');
  };

  const handleSaveAntiPhishing = () => {
    if (!antiPhishingCode || antiPhishingCode.length < 4) {
      alert(t('security.anti_phishing_min'));
      return;
    }
    alert(t('security.anti_phishing_saved'));
    setCurrentView('main');
  };

  // 主页面
  if (currentView === 'main') {
    return (
      <div className="min-h-screen flex flex-col" style={{ backgroundColor: colors.bg }}>
        <div className="sticky top-0 z-10 px-4 py-3 flex items-center gap-3 border-b" style={{ backgroundColor: colors.cardBg, borderColor: colors.border }}>
          <button onClick={() => navigate('/')} className="w-9 h-9 rounded-lg flex items-center justify-center transition-all active:opacity-70" style={{ backgroundColor: colors.bg }}>
            <ArrowLeft className="w-5 h-5" style={{ color: colors.text }} />
          </button>
          <h1 style={{ color: colors.text }}>{t('security.title')}</h1>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* 安全评分 */}
          <div className="rounded-2xl p-6" style={{ background: theme === 'light' ? `linear-gradient(135deg, ${colors.cardBg} 0%, ${colors.primary}08 100%)` : `linear-gradient(135deg, ${colors.cardBg} 0%, ${colors.primary}15 100%)`, border: `1.5px solid ${colors.border}` }}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-sm mb-1" style={{ color: colors.textSecondary }}>{t('security.security_score')}</div>
                <div className="flex items-center gap-2">
                  <span className="text-3xl" style={{ color: colors.primary }}>{currentScore}</span>
                  <span className="text-lg" style={{ color: colors.textSecondary }}>/ {maxScore}</span>
                </div>
              </div>
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${colors.primary}20 0%, ${colors.primary}40 100%)`, border: `2px solid ${colors.primary}` }}>
                <Shield className="w-8 h-8" style={{ color: colors.primary }} />
              </div>
            </div>
            <div className="h-2 rounded-full overflow-hidden mb-2" style={{ backgroundColor: theme === 'light' ? '#F3F4F6' : '#1F2937' }}>
              <div className="h-full rounded-full transition-all duration-500" style={{ width: `${(currentScore / maxScore) * 100}%`, background: `linear-gradient(90deg, ${colors.primary} 0%, #10B981 100%)` }} />
            </div>
            <div className="flex items-center justify-between text-xs">
              <span style={{ color: colors.textSecondary }}>{currentScore >= 80 ? t('security.advanced') : currentScore >= 50 ? t('security.intermediate') : t('security.beginner')}</span>
              <span style={{ color: colors.primary }}>{currentScore >= maxScore ? t('security.perfect') : t('security.points_to_full', { count: maxScore - currentScore })}</span>
            </div>
          </div>

          {/* 安全设置列表 */}
          <div>
            <h2 className="text-sm mb-3 px-1" style={{ color: colors.text }}>{t('security.security_settings')}</h2>
            <div className="space-y-3">
              {[
                { icon: Lock, title: t('security.login_password'), desc: t('security.login_password_desc'), enabled: true, color: '#10B981', points: '+25', view: 'password' },
                { icon: Shield, title: t('security.two_factor_auth'), desc: t('security.two_factor_auth_desc'), enabled: true, color: '#10B981', points: '+30', view: '2fa' },
                { icon: Mail, title: t('security.email_verification'), desc: t('security.email_verification_desc'), enabled: true, color: '#10B981', points: '+20', view: 'email' },
                { icon: ShieldCheck, title: t('security.anti_phishing'), desc: t('security.anti_phishing_desc'), enabled: false, color: '#F59E0B', points: '+15', view: 'antiphishing' },
                { icon: Smartphone, title: t('security.phone_binding'), desc: t('security.phone_binding_desc'), enabled: true, color: '#10B981', points: '+10', view: 'phone' },
              ].map((item, index) => (
                <button 
                  key={index} 
                  onClick={() => setCurrentView(item.view as any)}
                  className="w-full rounded-xl p-4 flex items-center gap-4 transition-all active:opacity-70" 
                  style={{ backgroundColor: colors.cardBg, border: `1px solid ${colors.border}` }}
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: theme === 'light' ? `${item.color}15` : `${item.color}20`, border: `1.5px solid ${item.color}40` }}>
                    <item.icon className="w-6 h-6" style={{ color: item.color }} />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="flex items-center gap-2 mb-1">
                      <span style={{ color: colors.text }}>{item.title}</span>
                      {item.enabled && <span className="text-xs px-1.5 py-0.5 rounded" style={{ backgroundColor: theme === 'light' ? '#DCFCE7' : '#10B98120', color: '#10B981' }}>{item.points}</span>}
                    </div>
                    <div className="text-xs" style={{ color: colors.textSecondary }}>{item.desc}</div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {item.enabled ? <CheckCircle2 className="w-5 h-5" style={{ color: '#10B981' }} /> : <AlertTriangle className="w-5 h-5" style={{ color: '#F59E0B' }} />}
                    <ChevronRight className="w-4 h-4" style={{ color: colors.textSecondary }} />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 修改密码页面
  if (currentView === 'password') {
    return (
      <div className="min-h-screen flex flex-col" style={{ backgroundColor: colors.bg }}>
        <div className="sticky top-0 z-10 px-4 py-3 flex items-center gap-3 border-b" style={{ backgroundColor: colors.cardBg, borderColor: colors.border }}>
          <button onClick={() => setCurrentView('main')} className="w-9 h-9 rounded-lg flex items-center justify-center transition-all active:opacity-70" style={{ backgroundColor: colors.bg }}>
            <ArrowLeft className="w-5 h-5" style={{ color: colors.text }} />
          </button>
          <h1 style={{ color: colors.text }}>{t('security.change_password')}</h1>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-4">
            {/* 当前密码 */}
            <div>
              <label className="text-sm mb-2 block" style={{ color: colors.text }}>{t('security.current_password')}</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder={t('security.enter_current_password')}
                  className="w-full px-4 py-3 pr-12 rounded-xl border transition-all focus:outline-none"
                  style={{ 
                    backgroundColor: colors.cardBg, 
                    borderColor: colors.border,
                    color: colors.text
                  }}
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                  style={{ color: colors.textSecondary }}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* 新密码 */}
            <div>
              <label className="text-sm mb-2 block" style={{ color: colors.text }}>{t('security.new_password')}</label>
              <input
                type={showPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder={t('security.enter_new_password')}
                className="w-full px-4 py-3 rounded-xl border transition-all focus:outline-none"
                style={{ 
                  backgroundColor: colors.cardBg, 
                  borderColor: colors.border,
                  color: colors.text
                }}
              />
            </div>

            {/* 确认新密码 */}
            <div>
              <label className="text-sm mb-2 block" style={{ color: colors.text }}>{t('security.confirm_new_password')}</label>
              <input
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder={t('security.enter_confirm_password')}
                className="w-full px-4 py-3 rounded-xl border transition-all focus:outline-none"
                style={{ 
                  backgroundColor: colors.cardBg, 
                  borderColor: colors.border,
                  color: colors.text
                }}
              />
            </div>

            {/* 密码强度提示 */}
            <div className="rounded-xl p-4" style={{ backgroundColor: theme === 'light' ? '#FEF3C7' : '#F59E0B15', border: `1px solid #F59E0B` }}>
              <div className="text-xs mb-2" style={{ color: colors.text }}>{t('security.password_tips')}</div>
              <ul className="text-xs space-y-1" style={{ color: colors.textSecondary }}>
                <li>• {t('security.password_tip_1')}</li>
                <li>• {t('security.password_tip_2')}</li>
                <li>• {t('security.password_tip_3')}</li>
              </ul>
            </div>

            {/* 提交按钮 */}
            <button
              onClick={handlePasswordChange}
              className="w-full py-4 rounded-xl transition-all active:scale-98"
              style={{ 
                background: colors.primaryGradient,
                color: 'white'
              }}
            >
              {t('security.confirm_change')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 双因素认证页面
  if (currentView === '2fa') {
    return (
      <div className="min-h-screen flex flex-col" style={{ backgroundColor: colors.bg }}>
        <div className="sticky top-0 z-10 px-4 py-3 flex items-center gap-3 border-b" style={{ backgroundColor: colors.cardBg, borderColor: colors.border }}>
          <button onClick={() => setCurrentView('main')} className="w-9 h-9 rounded-lg flex items-center justify-center transition-all active:opacity-70" style={{ backgroundColor: colors.bg }}>
            <ArrowLeft className="w-5 h-5" style={{ color: colors.text }} />
          </button>
          <h1 style={{ color: colors.text }}>{t('security.two_factor_auth')}</h1>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-4">
            {/* 状态卡片 */}
            <div className="rounded-xl p-4 flex items-center gap-3" style={{ backgroundColor: theme === 'light' ? '#DCFCE7' : '#10B98120', border: `1px solid #10B981` }}>
              <CheckCircle2 className="w-6 h-6 flex-shrink-0" style={{ color: '#10B981' }} />
              <div>
                <div className="text-sm mb-0.5" style={{ color: colors.text }}>{t('security.two_factor_enabled')}</div>
                <div className="text-xs" style={{ color: colors.textSecondary }}>{t('security.two_factor_protected')}</div>
              </div>
            </div>

            {/* 二维码区域 */}
            <div className="rounded-xl p-6 text-center" style={{ backgroundColor: colors.cardBg, border: `1px solid ${colors.border}` }}>
              <div className="text-sm mb-4" style={{ color: colors.text }}>{t('security.scan_qr_code')}</div>
              <div className="w-48 h-48 mx-auto rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: theme === 'light' ? '#F3F4F6' : '#1F2937' }}>
                <div className="text-center">
                  <Shield className="w-16 h-16 mx-auto mb-2" style={{ color: colors.textSecondary }} />
                  <div className="text-xs" style={{ color: colors.textSecondary }}>{t('security.qr_placeholder')}</div>
                </div>
              </div>
              
              {/* 密钥 */}
              <div className="text-xs mb-2" style={{ color: colors.textSecondary }}>{t('security.manual_key')}</div>
              <div className="flex items-center gap-2 justify-center">
                <code className="px-3 py-2 rounded-lg text-sm" style={{ backgroundColor: theme === 'light' ? '#F3F4F6' : '#1F2937', color: colors.primary }}>
                  JBSWY3DPEHPK3PXP
                </code>
                <button
                  onClick={handleCopy2FASecret}
                  className="p-2 rounded-lg transition-all active:scale-95"
                  style={{ 
                    backgroundColor: copySuccess ? `${colors.primary}20` : (theme === 'light' ? '#F3F4F6' : '#374151'),
                    color: copySuccess ? colors.primary : colors.textSecondary
                  }}
                >
                  {copySuccess ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* 验证码输入 */}
            <div>
              <label className="text-sm mb-2 block" style={{ color: colors.text }}>{t('security.enter_6_digit_code')}</label>
              <div className="flex gap-2 justify-center">
                {twoFactorCode.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => {
                      const newCode = [...twoFactorCode];
                      newCode[index] = e.target.value;
                      setTwoFactorCode(newCode);
                      // 自动跳到下一个输入框
                      if (e.target.value && index < 5) {
                        const nextInput = document.getElementById(`2fa-input-${index + 1}`);
                        nextInput?.focus();
                      }
                    }}
                    id={`2fa-input-${index}`}
                    className="w-12 h-14 text-center text-xl rounded-xl border transition-all focus:outline-none"
                    style={{ 
                      backgroundColor: colors.cardBg, 
                      borderColor: digit ? colors.primary : colors.border,
                      color: colors.text
                    }}
                  />
                ))}
              </div>
            </div>

            {/* 备份码提示 */}
            <div className="rounded-xl p-4" style={{ backgroundColor: theme === 'light' ? '#FEF3C7' : '#F59E0B15', border: `1px solid #F59E0B` }}>
              <div className="text-xs mb-2" style={{ color: colors.text }}>重要提示：</div>
              <ul className="text-xs space-y-1" style={{ color: colors.textSecondary }}>
                <li>• 请妥善保管您的备份码</li>
                <li>• 如果丢失设备，可以使用备份码恢复</li>
                <li>• 不要将备份码分享给任何人</li>
              </ul>
            </div>

            {/* 操作按钮 */}
            <div className="flex gap-3">
              <button
                onClick={() => alert(t('security.verify_success'))}
                className="flex-1 py-4 rounded-xl transition-all active:scale-98"
                style={{ 
                  background: colors.primaryGradient,
                  color: 'white'
                }}
              >
                {t('common.confirm')}
              </button>
              <button
                onClick={() => {
                  if (confirm(t('security.disable_2fa_confirm'))) {
                    alert('2FA 已禁用');
                    setCurrentView('main');
                  }
                }}
                className="flex-1 py-4 rounded-xl transition-all active:scale-98"
                style={{ 
                  backgroundColor: colors.cardBg,
                  border: `1px solid ${colors.border}`,
                  color: colors.text
                }}
              >
                {t('common.disable')} 2FA
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 邮箱验证页面
  if (currentView === 'email') {
    return (
      <div className="min-h-screen flex flex-col" style={{ backgroundColor: colors.bg }}>
        <div className="sticky top-0 z-10 px-4 py-3 flex items-center gap-3 border-b" style={{ backgroundColor: colors.cardBg, borderColor: colors.border }}>
          <button onClick={() => setCurrentView('main')} className="w-9 h-9 rounded-lg flex items-center justify-center transition-all active:opacity-70" style={{ backgroundColor: colors.bg }}>
            <ArrowLeft className="w-5 h-5" style={{ color: colors.text }} />
          </button>
          <h1 style={{ color: colors.text }}>{t('security.email_verification')}</h1>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-4">
            {/* 当前邮箱 */}
            <div className="rounded-xl p-4" style={{ backgroundColor: colors.cardBg, border: `1px solid ${colors.border}` }}>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: theme === 'light' ? '#DCFCE7' : '#10B98120' }}>
                  <Mail className="w-6 h-6" style={{ color: '#10B981' }} />
                </div>
                <div className="flex-1">
                  <div className="text-sm mb-1" style={{ color: colors.text }}>{t('common.current')}</div>
                  <div className="text-xs" style={{ color: colors.textSecondary }}>user@*****.com</div>
                </div>
                <CheckCircle2 className="w-5 h-5" style={{ color: '#10B981' }} />
              </div>
            </div>

            {/* 更改邮箱 */}
            <div>
              <label className="text-sm mb-2 block" style={{ color: colors.text }}>{t('security.enter_email')}</label>
              <input
                type="email"
                placeholder={t('security.enter_email')}
                className="w-full px-4 py-3 rounded-xl border transition-all focus:outline-none"
                style={{ 
                  backgroundColor: colors.cardBg, 
                  borderColor: colors.border,
                  color: colors.text
                }}
              />
            </div>

            {/* 验证码 */}
            <div>
              <label className="text-sm mb-2 block" style={{ color: colors.text }}>{t('security.enter_6_digit_verification')}</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder={t('security.enter_6_digit_verification')}
                  maxLength={6}
                  className="flex-1 px-4 py-3 rounded-xl border transition-all focus:outline-none"
                  style={{ 
                    backgroundColor: colors.cardBg, 
                    borderColor: colors.border,
                    color: colors.text
                  }}
                />
                <button
                  onClick={() => alert(t('security.verification_sent'))}
                  className="px-6 py-3 rounded-xl transition-all active:scale-95"
                  style={{ 
                    backgroundColor: theme === 'light' ? '#F3F4F6' : '#374151',
                    color: colors.text
                  }}
                >
                  获取验证码
                </button>
              </div>
            </div>

            {/* 提示 */}
            <div className="rounded-xl p-4" style={{ backgroundColor: theme === 'light' ? '#FEF3C7' : '#F59E0B15', border: `1px solid #F59E0B` }}>
              <div className="text-xs" style={{ color: colors.text }}>
                • 更改邮箱后，系统将向新邮箱发送确认邮件<br/>
                • 请在24小时内完成验证，否则更改将失效<br/>
                • 重要通知将发送至新邮箱
              </div>
            </div>

            {/* 提交按钮 */}
            <button
              onClick={() => {
                alert(t('security.email_verification_sent'));
                setCurrentView('main');
              }}
              className="w-full py-4 rounded-xl transition-all active:scale-98"
              style={{ 
                background: colors.primaryGradient,
                color: 'white'
              }}
            >
              {t('common.confirm')} {t('common.change')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 防钓鱼码页面
  if (currentView === 'antiphishing') {
    return (
      <div className="min-h-screen flex flex-col" style={{ backgroundColor: colors.bg }}>
        <div className="sticky top-0 z-10 px-4 py-3 flex items-center gap-3 border-b" style={{ backgroundColor: colors.cardBg, borderColor: colors.border }}>
          <button onClick={() => setCurrentView('main')} className="w-9 h-9 rounded-lg flex items-center justify-center transition-all active:opacity-70" style={{ backgroundColor: colors.bg }}>
            <ArrowLeft className="w-5 h-5" style={{ color: colors.text }} />
          </button>
          <h1 style={{ color: colors.text }}>{t('security.anti_phishing')}</h1>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-4">
            {/* 说明卡片 */}
            <div className="rounded-xl p-4" style={{ backgroundColor: theme === 'light' ? '#FEF3C7' : '#F59E0B15', border: `1px solid #F59E0B` }}>
              <div className="flex gap-3">
                <ShieldCheck className="w-5 h-5 flex-shrink-0" style={{ color: '#F59E0B' }} />
                <div>
                  <div className="text-sm mb-2" style={{ color: colors.text }}>什么是防钓鱼码？</div>
                  <div className="text-xs leading-relaxed" style={{ color: colors.textSecondary }}>
                    防钓鱼码是您设置的个性化标识，将出现在我们发送给您的所有官方邮件中。如果邮件中没有显示您的防钓鱼码，请勿点击邮件中的任何链接。
                  </div>
                </div>
              </div>
            </div>

            {/* 设置防钓鱼码 */}
            <div>
              <label className="text-sm mb-2 block" style={{ color: colors.text }}>{t('security.anti_phishing')}</label>
              <input
                type="text"
                value={antiPhishingCode}
                onChange={(e) => setAntiPhishingCode(e.target.value)}
                placeholder={t('security.enter_anti_phishing')}
                maxLength={20}
                className="w-full px-4 py-3 rounded-xl border transition-all focus:outline-none"
                style={{ 
                  backgroundColor: colors.cardBg, 
                  borderColor: colors.border,
                  color: colors.text
                }}
              />
              <div className="text-xs mt-2" style={{ color: colors.textSecondary }}>
                {antiPhishingCode.length}/20 字符
              </div>
            </div>

            {/* 示例 */}
            <div>
              <div className="text-sm mb-2" style={{ color: colors.text }}>邮件示例</div>
              <div className="rounded-xl p-4 space-y-2" style={{ backgroundColor: colors.cardBg, border: `1px solid ${colors.border}` }}>
                <div className="text-xs" style={{ color: colors.textSecondary }}>尊敬的用户，</div>
                <div className="text-xs" style={{ color: colors.textSecondary }}>您的提币申请已提交，请在邮件中确认。</div>
                <div className="mt-3 p-2 rounded-lg text-center" style={{ backgroundColor: theme === 'light' ? '#FEF3C7' : '#F59E0B15', border: `1px solid #F59E0B` }}>
                  <div className="text-xs mb-1" style={{ color: colors.textSecondary }}>您的防钓鱼码：</div>
                  <div className="text-sm" style={{ color: colors.primary }}>
                    {antiPhishingCode || '(未设置)'}
                  </div>
                </div>
              </div>
            </div>

            {/* 提交按钮 */}
            <button
              onClick={handleSaveAntiPhishing}
              className="w-full py-4 rounded-xl transition-all active:scale-98"
              style={{ 
                background: colors.primaryGradient,
                color: 'white'
              }}
            >
              {t('common.save_settings')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 手机绑定页面
  if (currentView === 'phone') {
    return (
      <div className="min-h-screen flex flex-col" style={{ backgroundColor: colors.bg }}>
        <div className="sticky top-0 z-10 px-4 py-3 flex items-center gap-3 border-b" style={{ backgroundColor: colors.cardBg, borderColor: colors.border }}>
          <button onClick={() => setCurrentView('main')} className="w-9 h-9 rounded-lg flex items-center justify-center transition-all active:opacity-70" style={{ backgroundColor: colors.bg }}>
            <ArrowLeft className="w-5 h-5" style={{ color: colors.text }} />
          </button>
          <h1 style={{ color: colors.text }}>{t('security.phone_binding')}</h1>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-4">
            {/* 当前手机 */}
            <div className="rounded-xl p-4" style={{ backgroundColor: colors.cardBg, border: `1px solid ${colors.border}` }}>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: theme === 'light' ? '#DCFCE7' : '#10B98120' }}>
                  <Smartphone className="w-6 h-6" style={{ color: '#10B981' }} />
                </div>
                <div className="flex-1">
                  <div className="text-sm mb-1" style={{ color: colors.text }}>{t('common.current')} {t('security.phone_binding')}</div>
                  <div className="text-xs" style={{ color: colors.textSecondary }}>+86 138****8888</div>
                </div>
                <CheckCircle2 className="w-5 h-5" style={{ color: '#10B981' }} />
              </div>
            </div>

            {/* 更换手机号 */}
            <div>
              <label className="text-sm mb-2 block" style={{ color: colors.text }}>{t('common.new')} {t('security.phone_binding')}</label>
              <div className="flex gap-2">
                <select
                  className="px-3 py-3 rounded-xl border transition-all focus:outline-none"
                  style={{ 
                    backgroundColor: colors.cardBg, 
                    borderColor: colors.border,
                    color: colors.text
                  }}
                >
                  <option>+86</option>
                  <option>+1</option>
                  <option>+44</option>
                  <option>+81</option>
                </select>
                <input
                  type="tel"
                  placeholder={t('security.enter_phone')}
                  className="flex-1 px-4 py-3 rounded-xl border transition-all focus:outline-none"
                  style={{ 
                    backgroundColor: colors.cardBg, 
                    borderColor: colors.border,
                    color: colors.text
                  }}
                />
              </div>
            </div>

            {/* 短信验证码 */}
            <div>
              <label className="text-sm mb-2 block" style={{ color: colors.text }}>{t('security.enter_6_digit_verification')}</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder={t('security.enter_6_digit_verification')}
                  maxLength={6}
                  className="flex-1 px-4 py-3 rounded-xl border transition-all focus:outline-none"
                  style={{ 
                    backgroundColor: colors.cardBg, 
                    borderColor: colors.border,
                    color: colors.text
                  }}
                />
                <button
                  onClick={() => alert(t('security.verification_code_sent'))}
                  className="px-6 py-3 rounded-xl transition-all active:scale-95"
                  style={{ 
                    backgroundColor: theme === 'light' ? '#F3F4F6' : '#374151',
                    color: colors.text
                  }}
                >
                  获取验证码
                </button>
              </div>
            </div>

            {/* 提示 */}
            <div className="rounded-xl p-4" style={{ backgroundColor: theme === 'light' ? '#FEF3C7' : '#F59E0B15', border: `1px solid #F59E0B` }}>
              <div className="text-xs" style={{ color: colors.text }}>
                • 更换手机号后，原手机号将无法接收验证码<br/>
                • 请确保新手机号可以正常接收短信<br/>
                • 提币操作需要使用新手机号验证
              </div>
            </div>

            {/* 提交按钮 */}
            <button
              onClick={() => {
                alert(t('security.phone_changed'));
                setCurrentView('main');
              }}
              className="w-full py-4 rounded-xl transition-all active:scale-98"
              style={{ 
                background: colors.primaryGradient,
                color: 'white'
              }}
            >
              {t('common.confirm')} {t('common.change')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}