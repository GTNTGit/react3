import { ArrowLeft, Camera, Image as ImageIcon, Check, Crown } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { useTranslation } from 'react-i18next';

interface AvatarSettingsPageProps {
  theme: 'dark' | 'light';
  selectedAvatar: string;
  onAvatarChange: (avatarId: string) => void;
  nickname: string;
  onNicknameChange: (nickname: string) => void;
  showVIPBadge: boolean;
  onVIPBadgeChange: (show: boolean) => void;
}

export function AvatarSettingsPage({ theme, selectedAvatar: currentAvatar, onAvatarChange, nickname: currentNickname, onNicknameChange, showVIPBadge: currentShowVIPBadge, onVIPBadgeChange }: AvatarSettingsPageProps) {
  const { colors } = useTheme();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [selectedAvatar, setSelectedAvatar] = useState(currentAvatar);
  const [nickname, setNickname] = useState(currentNickname);
  const [showVIPBadge, setShowVIPBadge] = useState(currentShowVIPBadge);

  // 预设头像列表 - 使用emoji作为占位符
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

  const handleConfirm = () => {
    onAvatarChange(selectedAvatar);
    onNicknameChange(nickname);
    onVIPBadgeChange(showVIPBadge);
    navigate('/');
  };

  const handleTakePhoto = () => {
    alert(t('avatar.photo_feature'));
  };

  const handleChooseFromAlbum = () => {
    alert(t('avatar.album_feature'));
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: colors.bg }}>
      {/* Header */}
      <div className="sticky top-0 z-10 px-4 py-3 flex items-center gap-3 border-b" style={{ backgroundColor: colors.cardBg, borderColor: colors.border }}>
        <button onClick={() => navigate('/')} className="w-9 h-9 rounded-lg flex items-center justify-center transition-all active:opacity-70" style={{ backgroundColor: colors.bg }}>
          <ArrowLeft className="w-5 h-5" style={{ color: colors.text }} />
        </button>
        <h1 style={{ color: colors.text }}>{t('avatar.title')}</h1>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Avatar Preview */}
        <div className="py-8 px-4 flex flex-col items-center" style={{ backgroundColor: colors.cardBg }}>
          <div className="relative mb-6">
            {/* Main Avatar Circle with Black-Gold Border */}
            <div 
              className="w-32 h-32 rounded-full flex items-center justify-center text-5xl relative overflow-hidden"
              style={{ 
                backgroundColor: currentAvatarData.color,
                border: showVIPBadge 
                  ? '4px solid #000000' 
                  : (theme === 'light' ? '4px solid #E5E7EB' : '4px solid #374151'),
                outline: showVIPBadge ? '3px solid #FFD700' : 'none',
                outlineOffset: showVIPBadge ? '2px' : '0',
                boxShadow: showVIPBadge 
                  ? '0 0 20px rgba(255, 215, 0, 0.5), 0 0 40px rgba(255, 215, 0, 0.3), 0 0 60px rgba(255, 215, 0, 0.1)' 
                  : (theme === 'light' ? '0 4px 16px rgba(0,0,0,0.1)' : '0 4px 16px rgba(0,0,0,0.3)')
              }}
            >
              {currentAvatarData.emoji}
            </div>
            
            {/* VIP Badge - Only show when toggle is on */}
            {showVIPBadge && (
              <div 
                className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full flex items-center gap-1"
                style={{ 
                  backgroundColor: '#1F2937',
                  border: `2px solid ${colors.cardBg}`
                }}
              >
                <span className="text-xs text-yellow-400">VIP</span>
              </div>
            )}
          </div>

          {/* Upload Buttons */}
          <div className="flex gap-3 w-full max-w-xs">
            <button
              onClick={handleTakePhoto}
              className="flex-1 py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95"
              style={{ 
                backgroundColor: theme === 'light' ? '#F3F4F6' : '#374151',
                color: colors.text
              }}
            >
              <Camera className="w-4 h-4" />
              <span className="text-sm">{t('avatar.take_photo')}</span>
            </button>
            <button
              onClick={handleChooseFromAlbum}
              className="flex-1 py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95"
              style={{ 
                backgroundColor: theme === 'light' ? '#F3F4F6' : '#374151',
                color: colors.text
              }}
            >
              <ImageIcon className="w-4 h-4" />
              <span className="text-sm">{t('avatar.choose_album')}</span>
            </button>
          </div>
        </div>

        {/* Nickname Input - 移到这里 */}
        <div className="px-4 pb-4">
          <h2 className="text-sm mb-3" style={{ color: colors.text }}>{t('avatar.nickname')}</h2>
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder={t('avatar.enter_nickname')}
            maxLength={20}
            className="w-full px-4 py-3 rounded-xl border transition-all focus:outline-none"
            style={{ 
              backgroundColor: colors.cardBg, 
              borderColor: colors.border,
              color: colors.text
            }}
          />
          <div className="text-xs mt-2" style={{ color: colors.textSecondary }}>
            {nickname.length}/20 {t('avatar.characters')}
          </div>
        </div>

        {/* Preset Avatars */}
        <div className="p-4 pt-0">
          <h2 className="text-sm mb-3" style={{ color: colors.text }}>{t('common.select')} {t('avatar.title')}</h2>
          
          <div className="grid grid-cols-5 gap-3 mb-6">
            {presetAvatars.map(avatar => (
              <button
                key={avatar.id}
                onClick={() => setSelectedAvatar(avatar.id)}
                className="relative w-full aspect-square rounded-full flex items-center justify-center text-2xl transition-all active:scale-95"
                style={{ 
                  backgroundColor: avatar.color,
                  border: selectedAvatar === avatar.id ? `3px solid ${colors.primary}` : '3px solid transparent',
                  boxShadow: selectedAvatar === avatar.id ? `0 4px 12px ${colors.primary}60` : 'none'
                }}
              >
                {avatar.emoji}
                {selectedAvatar === avatar.id && (
                  <div 
                    className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: colors.primary }}
                  >
                    <Check className="w-3 h-3 text-white" />
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* VIP Badge Toggle */}
          <div 
            className="rounded-xl p-4 flex items-center justify-between mb-4"
            style={{ backgroundColor: colors.cardBg, border: `1px solid ${colors.border}` }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm" style={{ backgroundColor: '#1F2937' }}>
                VIP
              </div>
              <div>
                <div className="text-sm mb-0.5" style={{ color: colors.text }}>{t('avatar.vip_badge')}</div>
                <div className="text-xs" style={{ color: colors.textSecondary }}>
                  {t('avatar.upload_limit', { count: 9 })}
                </div>
              </div>
            </div>
            <button
              onClick={() => setShowVIPBadge(!showVIPBadge)}
              className="relative w-12 h-7 rounded-full transition-all flex-shrink-0"
              style={{ 
                backgroundColor: showVIPBadge ? colors.primary : (theme === 'light' ? '#D1D5DB' : '#374151')
              }}
            >
              <div
                className="absolute top-1 w-5 h-5 rounded-full bg-white shadow-md transition-all"
                style={{ left: showVIPBadge ? '26px' : '4px' }}
              />
            </button>
          </div>

          {/* Upload Info */}
          <div 
            className="rounded-xl p-3 text-xs text-center mb-4"
            style={{ 
              backgroundColor: theme === 'light' ? '#FEF3C7' : '#F59E0B15',
              border: `1px solid #F59E0B`,
              color: colors.text
            }}
          >
            {t('avatar.upload_review')}
          </div>
        </div>
      </div>

      {/* Confirm Button */}
      <div className="p-4 border-t" style={{ backgroundColor: colors.cardBg, borderColor: colors.border }}>
        <button
          onClick={handleConfirm}
          className="w-full py-4 rounded-xl transition-all active:scale-98"
          style={{ 
            background: colors.primaryGradient,
            color: 'white'
          }}
        >
          {t('common.confirm')}
        </button>
      </div>
    </div>
  );
}