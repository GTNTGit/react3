import React from 'react';
import { Search, QrCode, Headphones, Bell, User } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

interface TopBarProps {
  onProfileClick: () => void;
  selectedAvatar?: string;
  showVIPBadge?: boolean;
  theme?: 'dark' | 'light';
  onCustomerServiceClick?: () => void;
  onNotificationClick?: () => void;
}

export function TopBar({ onProfileClick, selectedAvatar, showVIPBadge, theme, onCustomerServiceClick, onNotificationClick }: TopBarProps) {
  const { colors } = useTheme();
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
  
  return (
    <header 
      className="sticky top-0 z-50 transition-colors duration-300" 
      style={{ 
        backgroundColor: colors.bg,
      }}
    >
      <div className="px-4 py-2.5">
        <div className="flex items-center gap-2">
          {/* Avatar - With VIP border support */}
          <button 
            onClick={onProfileClick}
            className="w-9 h-9 rounded-full flex items-center justify-center active:opacity-70 transition-all text-base relative overflow-hidden"
            style={{ 
              backgroundColor: selectedAvatar ? currentAvatarData.color : colors.primary,
              border: showVIPBadge 
                ? '2px solid #000000' 
                : (theme === 'light' ? '2px solid #E5E7EB' : '2px solid #374151'),
              outline: showVIPBadge ? '1.5px solid #FFD700' : 'none',
              outlineOffset: showVIPBadge ? '1px' : '0',
              boxShadow: showVIPBadge 
                ? '0 0 12px rgba(255, 215, 0, 0.5), 0 0 24px rgba(255, 215, 0, 0.3)' 
                : 'none'
            }}
          >
            {selectedAvatar ? currentAvatarData.emoji : <User className="w-4 h-4 text-white" strokeWidth={2} />}
          </button>

          {/* Search - Flat gray background */}
          <div className="flex-1 relative">
            <Search 
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" 
              style={{ color: colors.textSecondary, opacity: 0.5 }} 
              strokeWidth={2}
            />
            
            <input
              type="text"
              placeholder="BTC, ETH, USDT..."
              className="w-full h-9 pl-9 pr-3 rounded-full text-sm transition-all focus:outline-none"
              style={{ 
                backgroundColor: colors.isDark 
                  ? 'rgba(255, 255, 255, 0.06)' 
                  : 'rgba(0, 0, 0, 0.04)',
                color: colors.text,
                border: 'none',
              }}
            />
          </div>

          {/* Icon Buttons - Flat transparent */}
          <div className="flex items-center gap-1">
            <button 
              className="w-9 h-9 rounded-full flex items-center justify-center active:opacity-70 transition-opacity"
              style={{ backgroundColor: 'transparent' }}
            >
              <QrCode 
                className="w-4.5 h-4.5" 
                style={{ color: colors.textSecondary, opacity: 0.7 }} 
                strokeWidth={2}
              />
            </button>

            <button 
              className="w-9 h-9 rounded-full flex items-center justify-center active:opacity-70 transition-opacity"
              style={{ backgroundColor: 'transparent' }}
              onClick={onCustomerServiceClick}
            >
              <Headphones 
                className="w-4.5 h-4.5" 
                style={{ color: colors.textSecondary, opacity: 0.7 }} 
                strokeWidth={2}
              />
            </button>

            <button 
              className="w-9 h-9 rounded-full flex items-center justify-center active:opacity-70 transition-opacity relative"
              style={{ backgroundColor: 'transparent' }}
              onClick={onNotificationClick}
            >
              <Bell 
                className="w-4.5 h-4.5" 
                style={{ color: colors.textSecondary, opacity: 0.7 }} 
                strokeWidth={2}
              />
              
              {/* Notification dot - minimal */}
              <span 
                className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full"
                style={{ 
                  backgroundColor: colors.primary,
                }}
              />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}