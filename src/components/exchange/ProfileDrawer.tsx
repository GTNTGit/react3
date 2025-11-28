import { X, Moon, Sun, User, Crown, Share2, ShieldCheck, Wallet, Lock, Globe, Info, ChevronRight, Mail, Sparkles, Star, Zap, TrendingUp, Copy, Shield, CheckCircle2, AlertTriangle, Edit2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { useTranslation } from 'react-i18next';

interface ProfileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  theme: 'dark' | 'light';
  onThemeChange: (theme: 'dark' | 'light') => void;
  selectedAvatar: string;
  nickname: string;
  onNicknameChange: (nickname: string) => void;
  showVIPBadge: boolean;
}

export function ProfileDrawer({ isOpen, onClose, theme, onThemeChange, selectedAvatar, nickname, showVIPBadge }: ProfileDrawerProps) {
  const { colors } = useTheme();
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  const routeMap: Record<string, string> = {
    'avatar-settings': '/avatar-settings',
    'vip': '/vip',
    'kyc': '/kyc',
    'security': '/security',
    'language': '/language',
  };
  
  const handleNavigate = (page: string) => {
    const route = routeMap[page] || `/${page}`;
    navigate(route);
    onClose();
  };
  const [copySuccess, setCopySuccess] = React.useState(false);
  const [showCreditModal, setShowCreditModal] = React.useState(false);
  const [showInviteModal, setShowInviteModal] = React.useState(false);
  const [showSupportModal, setShowSupportModal] = React.useState(false);
  const [showAboutModal, setShowAboutModal] = React.useState(false);
  const [showLogoutModal, setShowLogoutModal] = React.useState(false);
  const [inviteCopied, setInviteCopied] = React.useState(false);

  // 预设头像列表
  const presetAvatars = [
    { id: 'avatar-1', emoji: '🦍', color: '#F59E0B' },
    { id: 'avatar-2', emoji: '🤖', color: '#3B82F6' },
    { id: 'avatar-3', emoji: '🐵', color: '#10B981' },
    { id: 'avatar-4', emoji: '🦁', color: '#6B7280' },
    { id: 'avatar-5', emoji: '🐼', color: '#EF4444' },
    { id: 'avatar-6', emoji: '🐉', color: '#06B6D4' },
    { id: 'avatar-7', emoji: '🦈', color: '#6B7280' },
    { id: 'avatar-8', emoji: '🌍', color: '#3B82F6' },
    { id: 'avatar-9', emoji: '🦅', color: '#1F2937' },
    { id: 'avatar-10', emoji: '🦊', color: '#F97316' },
    { id: 'avatar-11', emoji: '⚡', color: '#F59E0B' },
    { id: 'avatar-12', emoji: '🗡️', color: '#3B82F6' },
    { id: 'avatar-13', emoji: '🌙', color: '#34D399' },
    { id: 'avatar-14', emoji: '⚫', color: '#1F2937' },
    { id: 'avatar-15', emoji: '🌕', color: '#D1D5DB' },
    { id: 'avatar-16', emoji: '🐺', color: '#6B7280' },
    { id: 'avatar-17', emoji: '🦇', color: '#4C1D95' },
    { id: 'avatar-18', emoji: '💼', color: '#34D399' },
    { id: 'avatar-19', emoji: '🎩', color: '#F97316' },
    { id: 'avatar-20', emoji: '🎭', color: '#6B7280' },
  ];

  const currentAvatarData = presetAvatars.find(a => a.id === selectedAvatar) || presetAvatars[0];

  const handleAvatarClick = () => {
    handleNavigate('avatar-settings');
  };

  const handleCopyId = () => {
    // 使用传统方法兼容性更好
    const textArea = document.createElement('textarea');
    textArea.value = '1086188';
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      document.execCommand('copy');
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('复制失败:', err);
    }
    
    document.body.removeChild(textArea);
  };

  const handleCopyInvite = () => {
    // 使用传统方法兼容性更好
    const textArea = document.createElement('textarea');
    textArea.value = 'https://example.com/invite/1086188';
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      document.execCommand('copy');
      setInviteCopied(true);
      setTimeout(() => setInviteCopied(false), 2000);
    } catch (err) {
      console.error('复制失败:', err);
    }
    
    document.body.removeChild(textArea);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed left-0 top-0 bottom-0 w-80 z-50 shadow-2xl flex flex-col"
            style={{ backgroundColor: colors.bg }}
          >
            <div className="flex-1 overflow-y-auto">
              <div className="p-5 pt-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg" style={{ color: colors.text }}>{nickname}</h2>
                  <button 
                    onClick={onClose} 
                    className="w-9 h-9 rounded-lg flex items-center justify-center transition-all active:opacity-70"
                    style={{ backgroundColor: colors.cardBg }}
                  >
                    <X className="w-5 h-5" style={{ color: colors.textSecondary }} />
                  </button>
                </div>

                {/* User Card with VIP Badge - Premium Design with Progress */}
                <div 
                  className="relative rounded-2xl mb-4 border overflow-visible"
                  style={{ 
                    background: theme === 'light' 
                      ? `linear-gradient(135deg, ${colors.cardBg} 0%, ${colors.primary}08 100%)`
                      : `linear-gradient(135deg, ${colors.cardBg} 0%, ${colors.primary}15 100%)`,
                    borderColor: `${colors.primary}30`,
                    borderWidth: '1.5px'
                  }}
                >
                  {/* Decorative Corner Elements */}
                  <div 
                    className="absolute top-0 left-0 w-20 h-20 rounded-tl-2xl opacity-30"
                    style={{
                      background: `radial-gradient(circle at top left, ${colors.primary}40 0%, transparent 70%)`
                    }}
                  />
                  <div 
                    className="absolute bottom-0 right-0 w-24 h-24 rounded-br-2xl opacity-20"
                    style={{
                      background: `radial-gradient(circle at bottom right, ${colors.primary}40 0%, transparent 70%)`
                    }}
                  />

                  {/* VIP Badge - Premium Purple/Royal Style */}
                  {showVIPBadge && (
                    <div className="absolute -top-2 -right-2 z-10">
                      <button
                        onClick={() => handleNavigate('vip')}
                        className="relative rounded-lg px-2.5 py-1 flex items-center gap-1.5 shadow-lg active:scale-95 transition-transform"
                        style={{ 
                          background: 'linear-gradient(135deg, #7C3AED 0%, #A855F7 50%, #C026D3 100%)',
                          boxShadow: '0 4px 12px rgba(124, 58, 237, 0.4)'
                        }}
                      >
                        <Crown className="w-3.5 h-3.5 text-white" />
                        <span className="text-xs text-white">VIP 9</span>
                      </button>
                      {/* Small sparkle decoration */}
                      <div 
                        className="absolute -top-1 -right-1 w-3 h-3 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: '#F0ABFC' }}
                      >
                        <Sparkles className="w-2 h-2 text-white" />
                      </div>
                    </div>
                  )}

                  <div className="relative">
                    {/* User Info Section */}
                    <div className="p-5 pb-4">
                      <div className="flex items-center gap-4">
                        {/* Enhanced Avatar */}
                        <div className="relative">
                          <button
                            onClick={handleAvatarClick}
                            className="w-16 h-16 rounded-full flex items-center justify-center text-2xl relative transition-all active:scale-95 overflow-hidden"
                            style={{ 
                              backgroundColor: currentAvatarData.color,
                              border: showVIPBadge 
                                ? '3px solid #000000' 
                                : `3px solid ${colors.primary}`,
                              outline: showVIPBadge ? '2px solid #FFD700' : 'none',
                              outlineOffset: showVIPBadge ? '2px' : '0',
                              boxShadow: showVIPBadge 
                                ? '0 0 16px rgba(255, 215, 0, 0.5), 0 0 32px rgba(255, 215, 0, 0.3), 0 0 48px rgba(255, 215, 0, 0.1)' 
                                : `0 4px 12px ${colors.primary}40`
                            }}
                          >
                            {currentAvatarData.emoji}
                          </button>
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1.5">
                            <span style={{ color: colors.text }}>
                              {nickname}
                            </span>
                            <button
                              onClick={handleAvatarClick}
                              className="w-6 h-6 rounded-full flex items-center justify-center transition-all active:scale-95"
                              style={{ 
                                backgroundColor: theme === 'light' ? '#F3F4F6' : '#1F2937'
                              }}
                            >
                              <Edit2 className="w-3.5 h-3.5" style={{ color: colors.textSecondary }} />
                            </button>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs" style={{ color: colors.textSecondary }}>
                              {t('profile.user_id')}: 1086188
                            </span>
                            <button
                              onClick={handleCopyId}
                              className="p-1 rounded transition-all active:scale-90"
                              style={{ 
                                backgroundColor: copySuccess ? `${colors.primary}20` : 'transparent',
                                color: copySuccess ? colors.primary : colors.textSecondary
                              }}
                            >
                              {copySuccess ? (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  className="flex items-center gap-1"
                                >
                                  <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none">
                                    <path d="M2 6L5 9L10 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                  </svg>
                                </motion.div>
                              ) : (
                                <Copy className="w-3 h-3" />
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Divider */}
                    <div 
                      className="mx-5 h-px"
                      style={{ 
                        background: `linear-gradient(90deg, transparent 0%, ${colors.border} 50%, transparent 100%)`
                      }}
                    />

                    {/* Credit Score Section */}
                    <div className="p-5 pt-4">
                      {/* Credit Score */}
                      <button
                        onClick={() => setShowCreditModal(true)}
                        className="w-full transition-all active:opacity-70"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div 
                              className="w-6 h-6 rounded-lg flex items-center justify-center"
                              style={{ 
                                background: `linear-gradient(135deg, ${colors.primary} 0%, #FBBF24 100%)`,
                                boxShadow: `0 2px 8px ${colors.primary}40`
                              }}
                            >
                              <Star className="w-3.5 h-3.5 text-white fill-white" />
                            </div>
                            <span className="text-xs" style={{ color: colors.text }}>
                              {t('profile.credit_score')}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs" style={{ color: colors.textSecondary }}>
                              75/100
                            </span>
                            <ChevronRight className="w-3.5 h-3.5" style={{ color: colors.textSecondary }} />
                          </div>
                        </div>
                        {/* Progress Bar */}
                        <div 
                          className="h-2 rounded-full overflow-hidden"
                          style={{ backgroundColor: theme === 'light' ? '#F3F4F6' : '#1F2937' }}
                        >
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: '75%' }}
                            transition={{ duration: 1, ease: 'easeOut' }}
                            className="h-full rounded-full relative overflow-hidden"
                            style={{ 
                              background: `linear-gradient(90deg, ${colors.primary} 0%, #FBBF24 100%)`,
                              boxShadow: `0 0 8px ${colors.primary}60`
                            }}
                          >
                            {/* Shimmer Effect */}
                            <div 
                              className="absolute inset-0 w-1/2"
                              style={{
                                background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)',
                                animation: 'shimmer 2s infinite linear'
                              }}
                            />
                          </motion.div>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Quick Actions - Unified Design with Dividers */}
                <div 
                  className="rounded-xl overflow-hidden mb-5 flex items-stretch border"
                  style={{ 
                    backgroundColor: colors.cardBg,
                    borderColor: colors.border
                  }}
                >
                  {[
                    { icon: Share2, label: t('profile.invite_share'), color: '#F59E0B', onClick: () => setShowInviteModal(true) },
                    { icon: ShieldCheck, label: t('profile.kyc_verification'), color: '#3B82F6', onClick: () => handleNavigate('kyc') },
                    { icon: Wallet, label: t('profile.wallet_management'), color: '#10B981', onClick: () => {} },
                  ].map((item, index) => (
                    <div key={index} className="flex-1 flex items-center">
                      <button
                        onClick={item.onClick}
                        className="w-full py-4 px-3 flex flex-col items-center justify-center gap-2.5 transition-all active:opacity-70"
                      >
                        <div 
                          className="w-11 h-11 rounded-xl flex items-center justify-center"
                          style={{ 
                            backgroundColor: theme === 'light' ? `${item.color}15` : `${item.color}20`,
                            border: `1.5px solid ${theme === 'light' ? `${item.color}30` : `${item.color}40`}`
                          }}
                        >
                          <item.icon className="w-5 h-5" style={{ color: item.color }} />
                        </div>
                        <span className="text-xs text-center leading-tight" style={{ color: colors.text }}>
                          {item.label}
                        </span>
                      </button>
                      {index < 2 && (
                        <div 
                          className="w-px h-12 flex-shrink-0"
                          style={{ backgroundColor: colors.border }}
                        />
                      )}
                    </div>
                  ))}
                </div>

                {/* Settings List */}
                <div 
                  className="rounded-xl overflow-hidden mb-5"
                  style={{ backgroundColor: colors.cardBg }}
                >
                  {[
                    { icon: Lock, label: t('profile.security_center'), onClick: () => handleNavigate('security') },
                    { type: 'toggle', icon: theme === 'light' ? Sun : Moon, label: t('profile.dark_mode') },
                    { icon: Globe, label: t('profile.language_settings'), value: t('profile.simplified_chinese'), onClick: () => handleNavigate('language') },
                    { icon: Mail, label: t('profile.customer_support'), onClick: () => setShowSupportModal(true) },
                    { icon: Info, label: t('profile.about_us'), value: 'v1.0.0', onClick: () => setShowAboutModal(true) },
                  ].map((item, index) => (
                    item.type === 'toggle' ? (
                      <div
                        key={index}
                        className="w-full h-14 flex items-center justify-between px-4"
                        style={{ 
                          borderBottom: `1px solid ${colors.border}`
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <item.icon className="w-5 h-5" style={{ color: colors.textSecondary }} />
                          <span style={{ color: colors.text }}>{item.label}</span>
                        </div>
                        <button
                          onClick={() => onThemeChange(theme === 'light' ? 'dark' : 'light')}
                          className="relative w-12 h-7 rounded-full transition-all"
                          style={{ 
                            backgroundColor: theme === 'dark' ? colors.primary : '#D1D5DB'
                          }}
                        >
                          <motion.div
                            className="absolute top-1 w-5 h-5 rounded-full bg-white shadow-md"
                            animate={{ left: theme === 'dark' ? '26px' : '4px' }}
                            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                          />
                        </button>
                      </div>
                    ) : (
                      <button
                        key={index}
                        onClick={item.onClick}
                        className="w-full h-14 flex items-center justify-between px-4 transition-all active:opacity-70"
                        style={{ 
                          borderBottom: index < 5 ? `1px solid ${colors.border}` : 'none'
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <item.icon className="w-5 h-5" style={{ color: colors.textSecondary }} />
                          <span style={{ color: colors.text }}>{item.label}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {item.value && (
                            <span className="text-sm" style={{ color: colors.textSecondary }}>
                              {item.value}
                            </span>
                          )}
                          <ChevronRight className="w-4 h-4" style={{ color: colors.textSecondary }} />
                        </div>
                      </button>
                    )
                  ))}
                </div>

                {/* Logout Button */}
                <button 
                  onClick={() => setShowLogoutModal(true)}
                  className="w-full h-12 rounded-xl transition-all active:opacity-70"
                  style={{ 
                    backgroundColor: colors.cardBg,
                    color: colors.text
                  }}
                >
                  {t('profile.logout')}
                </button>
              </div>
            </div>
          </motion.div>

          {/* All Modals */}
          {showCreditModal && (
            <CreditModal 
              isOpen={showCreditModal}
              onClose={() => setShowCreditModal(false)}
              theme={theme}
            />
          )}
          
          {showInviteModal && (
            <InviteModal 
              isOpen={showInviteModal}
              onClose={() => setShowInviteModal(false)}
              theme={theme}
              inviteCode="1086188"
              onCopy={handleCopyInvite}
              copied={inviteCopied}
            />
          )}
          
          {showSupportModal && (
            <SupportModal 
              isOpen={showSupportModal}
              onClose={() => setShowSupportModal(false)}
              theme={theme}
            />
          )}
          
          {showAboutModal && (
            <AboutModal 
              isOpen={showAboutModal}
              onClose={() => setShowAboutModal(false)}
              theme={theme}
            />
          )}
          
          {showLogoutModal && (
            <LogoutModal 
              isOpen={showLogoutModal}
              onClose={() => setShowLogoutModal(false)}
              theme={theme}
            />
          )}
        </>
      )}
    </AnimatePresence>
  );
}

// Modal Components
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: 'dark' | 'light';
}

// Credit Modal
function CreditModal({ isOpen, onClose, theme }: ModalProps) {
  const { colors } = useTheme();
  const { t } = useTranslation();
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 z-[60]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-80 rounded-2xl p-6 z-[60]"
            style={{ backgroundColor: colors.cardBg }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 style={{ color: colors.text }}>{t('profile.credit_score_detail')}</h3>
              <button onClick={onClose} className="p-1">
                <X className="w-5 h-5" style={{ color: colors.textSecondary }} />
              </button>
            </div>
            <div className="text-center mb-6">
              <div className="text-4xl mb-2" style={{ color: colors.primary }}>75</div>
              <div className="text-xs" style={{ color: colors.textSecondary }}>{t('profile.good')}</div>
            </div>
            <div className="space-y-2 text-xs" style={{ color: colors.textSecondary }}>
              <div>• {t('profile.credit_points_kyc')}</div>
              <div>• {t('profile.credit_points_phone')}</div>
              <div>• {t('profile.credit_points_trade')}</div>
              <div>• {t('profile.credit_points_security')}</div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// Invite Modal
function InviteModal({ isOpen, onClose, theme, inviteCode, onCopy, copied }: ModalProps & { inviteCode: string; onCopy: () => void; copied: boolean }) {
  const { colors } = useTheme();
  const { t } = useTranslation();
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 z-[60]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-80 rounded-2xl p-6 z-[60]"
            style={{ backgroundColor: colors.cardBg }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 style={{ color: colors.text }}>{t('invite.title')}</h3>
              <button onClick={onClose} className="p-1">
                <X className="w-5 h-5" style={{ color: colors.textSecondary }} />
              </button>
            </div>
            <div className="text-center mb-4">
              <div className="text-sm mb-2" style={{ color: colors.textSecondary }}>{t('profile.invite_code')}</div>
              <div className="text-2xl mb-4" style={{ color: colors.text }}>{inviteCode}</div>
              <div className="p-3 rounded-lg mb-4 text-xs break-all" style={{ backgroundColor: theme === 'light' ? '#F9FAFB' : '#1F2937', color: colors.textSecondary }}>
                https://example.com/invite/{inviteCode}
              </div>
              <button
                onClick={onCopy}
                className="w-full py-3 rounded-lg transition-all active:opacity-70"
                style={{ backgroundColor: colors.primary, color: 'white' }}
              >
                {copied ? t('common.copied') : t('profile.copy_invite_link')}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// Support Modal
function SupportModal({ isOpen, onClose, theme }: ModalProps) {
  const { colors } = useTheme();
  const { t } = useTranslation();
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 z-[60]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-80 rounded-2xl p-6 z-[60]"
            style={{ backgroundColor: colors.cardBg }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 style={{ color: colors.text }}>{t('profile.customer_support')}</h3>
              <button onClick={onClose} className="p-1">
                <X className="w-5 h-5" style={{ color: colors.textSecondary }} />
              </button>
            </div>
            <div className="space-y-3">
              <button className="w-full p-4 rounded-lg transition-all active:opacity-70" style={{ backgroundColor: theme === 'light' ? '#F9FAFB' : '#1F2937' }}>
                <div className="flex items-center gap-3 mb-2">
                  <Mail className="w-5 h-5" style={{ color: colors.primary }} />
                  <span className="text-sm" style={{ color: colors.text }}>{t('profile.online_service')}</span>
                </div>
                <div className="text-xs text-left" style={{ color: colors.textSecondary }}>{t('profile.service_hours')}</div>
              </button>
              <div className="p-4 rounded-lg" style={{ backgroundColor: theme === 'light' ? '#F9FAFB' : '#1F2937' }}>
                <div className="text-xs mb-2" style={{ color: colors.textSecondary }}>{t('profile.contact')}</div>
                <div className="text-sm" style={{ color: colors.text }}>support@example.com</div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// About Modal
function AboutModal({ isOpen, onClose, theme }: ModalProps) {
  const { colors } = useTheme();
  const { t } = useTranslation();
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 z-[60]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-80 rounded-2xl p-6 z-[60]"
            style={{ backgroundColor: colors.cardBg }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 style={{ color: colors.text }}>{t('profile.about_us')}</h3>
              <button onClick={onClose} className="p-1">
                <X className="w-5 h-5" style={{ color: colors.textSecondary }} />
              </button>
            </div>
            <div className="text-center mb-6">
              <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${colors.primary}20 0%, ${colors.primary}40 100%)` }}>
                <TrendingUp className="w-8 h-8" style={{ color: colors.primary }} />
              </div>
              <div style={{ color: colors.text }}>{t('profile.digital_asset_platform')}</div>
              <div className="text-xs mt-2" style={{ color: colors.textSecondary }}>Version 1.0.0</div>
            </div>
            <div className="text-xs space-y-2" style={{ color: colors.textSecondary }}>
              <div>© 2024 Exchange Platform</div>
              <div>{t('profile.professional_safe_trusted')}</div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// Logout Modal
function LogoutModal({ isOpen, onClose, theme }: ModalProps) {
  const { colors } = useTheme();
  const { t } = useTranslation();
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 z-[60]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-80 rounded-2xl p-6 z-[60]"
            style={{ backgroundColor: colors.cardBg }}
          >
            <div className="text-center mb-6">
              <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: `${colors.primary}20` }}>
                <AlertTriangle className="w-8 h-8" style={{ color: colors.primary }} />
              </div>
              <h3 className="mb-2" style={{ color: colors.text }}>{t('profile.confirm_logout')}</h3>
              <div className="text-sm" style={{ color: colors.textSecondary }}>{t('profile.logout_message')}</div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={onClose}
                className="py-3 rounded-lg transition-all active:opacity-70"
                style={{ backgroundColor: theme === 'light' ? '#F3F4F6' : '#1F2937', color: colors.text }}
              >
                {t('common.cancel')}
              </button>
              <button
                onClick={() => {
                  // Handle logout
                  onClose();
                }}
                className="py-3 rounded-lg transition-all active:opacity-70"
                style={{ backgroundColor: colors.primary, color: 'white' }}
              >
                {t('profile.logout')}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}