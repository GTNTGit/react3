import { ArrowLeft, Copy, Share2, Gift, Users, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function InviteFriends() {
  const navigate = useNavigate();
  const { colors } = useTheme();
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);
  
  const inviteCode = "CRYPTO2024";
  const inviteLink = "https://exchange.com/invite/CRYPTO2024";
  
  const rewards = [
    { icon: Gift, title: t('invite.newbie_reward'), amount: '10 USDT', desc: t('invite.newbie_reward_desc') },
    { icon: TrendingUp, title: t('invite.trading_rebate'), amount: '20%', desc: t('invite.trading_rebate_desc') },
    { icon: Users, title: t('invite.team_reward'), amount: '500 USDT', desc: t('invite.team_reward_desc') },
  ];
  
  const inviteHistory = [
    { name: 'User****123', date: '2024-11-25', reward: '+10 USDT', status: t('invite.status_issued') },
    { name: 'User****456', date: '2024-11-24', reward: '+10 USDT', status: t('invite.status_issued') },
    { name: 'User****789', date: '2024-11-23', reward: '+10 USDT', status: t('invite.status_issued') },
  ];
  
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
        <span style={{ color: colors.text }}>{t('invite.title')}</span>
        <div className="w-8" />
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* 邀请卡片 */}
        <div 
          className="rounded-2xl p-6 relative overflow-hidden"
          style={{
            background: colors.primaryGradient,
          }}
        >
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                <Gift size={24} color="#ffffff" />
              </div>
              <div>
                <div className="text-white text-lg font-semibold">{t('invite.invite_reward')}</div>
                <div className="text-white/80 text-sm">{t('invite.invite_description')}</div>
              </div>
            </div>
            
            {/* 邀请码 */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-3">
              <div className="text-white/70 text-xs mb-2">{t('invite.my_invite_code')}</div>
              <div className="flex items-center justify-between">
                <span className="text-white text-2xl font-mono tracking-wider">{inviteCode}</span>
                <button 
                  onClick={() => handleCopy(inviteCode)}
                  className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg flex items-center gap-2 transition-colors"
                >
                  <Copy size={16} color="#ffffff" />
                  <span className="text-white text-sm">{copied ? t('common.copied') : t('common.copy')}</span>
                </button>
              </div>
            </div>
            
            {/* 邀请链接 */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="text-white/70 text-xs mb-2">{t('invite.invite_link')}</div>
              <div className="flex items-center justify-between gap-3">
                <span className="text-white text-sm truncate flex-1">{inviteLink}</span>
                <button 
                  onClick={() => handleCopy(inviteLink)}
                  className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg flex items-center gap-2 transition-colors shrink-0"
                >
                  <Copy size={16} color="#ffffff" />
                  <span className="text-white text-sm">{copied ? t('common.copied') : t('common.copy')}</span>
                </button>
              </div>
            </div>
          </div>
          
          {/* 背景装饰 */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
        </div>

        {/* 分享按钮 */}
        <button 
          className="w-full py-4 rounded-xl flex items-center justify-center gap-2 transition-opacity active:opacity-70"
          style={{ backgroundColor: colors.primary }}
        >
          <Share2 size={20} color="#ffffff" />
          <span className="text-white">{t('invite.title')}</span>
        </button>

        {/* 奖励说明 */}
        <div>
          <div className="mb-4" style={{ color: colors.text }}>{t('invite.rewards')}</div>
          <div className="grid grid-cols-3 gap-3">
            {rewards.map((reward, index) => {
              const IconComponent = reward.icon;
              return (
                <div 
                  key={index}
                  className="rounded-xl p-4 text-center"
                  style={{ 
                    backgroundColor: colors.cardBg,
                    border: `1px solid ${colors.border}`,
                  }}
                >
                  <div className="w-10 h-10 rounded-full mx-auto mb-3 flex items-center justify-center" style={{ backgroundColor: `${colors.primary}20` }}>
                    <IconComponent size={20} style={{ color: colors.primary }} />
                  </div>
                  <div className="mb-1" style={{ color: colors.primary }}>{reward.amount}</div>
                  <div className="text-xs mb-1" style={{ color: colors.text }}>{reward.title}</div>
                  <div className="text-xs" style={{ color: colors.textSecondary }}>{reward.desc}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 我的邀请 */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <span style={{ color: colors.text }}>{t('invite.invite_history')}</span>
            <span className="text-sm" style={{ color: colors.textSecondary }}>{inviteHistory.length} {t('common.all')}</span>
          </div>
          <div 
            className="rounded-xl overflow-hidden"
            style={{ 
              backgroundColor: colors.cardBg,
              border: `1px solid ${colors.border}`,
            }}
          >
            {inviteHistory.map((item, index) => (
              <div 
                key={index}
                className="p-4 flex items-center justify-between"
                style={{ borderBottom: index < inviteHistory.length - 1 ? `1px solid ${colors.border}` : 'none' }}
              >
                <div>
                  <div className="mb-1" style={{ color: colors.text }}>{item.name}</div>
                  <div className="text-xs" style={{ color: colors.textSecondary }}>{item.date}</div>
                </div>
                <div className="text-right">
                  <div className="mb-1" style={{ color: colors.success }}>{item.reward}</div>
                  <div className="text-xs" style={{ color: colors.textSecondary }}>{item.status}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 规则说明 */}
        <div 
          className="rounded-xl p-4"
          style={{ 
            backgroundColor: colors.cardBg,
            border: `1px solid ${colors.border}`,
          }}
        >
          <div className="mb-3" style={{ color: colors.text }}>{t('invite.rewards')}</div>
          <div className="space-y-2 text-sm" style={{ color: colors.textSecondary }}>
            <div>• {t('invite.invite_description')}</div>
            <div>• {t('invite.newbie_reward_desc')}</div>
            <div>• {t('invite.trading_rebate_desc')}</div>
            <div>• {t('invite.team_reward_desc')}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
