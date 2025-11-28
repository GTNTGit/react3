import React, { useState, useEffect } from 'react';
import { Bell, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../contexts/ThemeContext';

interface AnnouncementBarProps {
}

export function AnnouncementBar({}: AnnouncementBarProps) {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const announcements = [
    t('announcement.announcement_1'),
    t('announcement.announcement_2'),
    t('announcement.announcement_3'),
    t('announcement.announcement_4'),
    t('announcement.announcement_5'),
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % announcements.length);
        setIsAnimating(false);
      }, 300);
    }, 4000); // 每4秒切换一次

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="px-3 py-2">
      <button 
        className="w-full flex items-center gap-2 px-3 py-2 active:opacity-70 transition-opacity"
        style={{
          backgroundColor: 'transparent',
        }}
      >
        {/* Bell Icon */}
        <Bell 
          className="w-4 h-4 shrink-0" 
          style={{ color: colors.textSecondary, opacity: 0.6 }}
          strokeWidth={2}
        />
        
        {/* Announcement Text - Scrolling */}
        <div className="flex-1 text-left overflow-hidden relative h-5">
          <div 
            className="absolute left-0 top-0 text-xs whitespace-nowrap transition-all duration-300"
            style={{ 
              color: colors.textSecondary,
              transform: isAnimating ? 'translateX(-100%)' : 'translateX(0)',
              opacity: isAnimating ? 0 : 1,
            }}
          >
            {announcements[currentIndex]}
          </div>
          
          {/* Next announcement (pre-load for smooth transition) */}
          <div 
            className="absolute left-0 top-0 text-xs whitespace-nowrap transition-all duration-300"
            style={{ 
              color: colors.textSecondary,
              transform: isAnimating ? 'translateX(0)' : 'translateX(100%)',
              opacity: isAnimating ? 1 : 0,
            }}
          >
            {announcements[(currentIndex + 1) % announcements.length]}
          </div>
        </div>

        {/* Right Arrow */}
        <ChevronRight 
          className="w-3.5 h-3.5 shrink-0" 
          style={{ color: colors.textSecondary, opacity: 0.4 }}
          strokeWidth={2}
        />
      </button>
    </div>
  );
}