import { ChevronRight, Sparkles, Gift, TrendingUp, Users, Trophy } from 'lucide-react';
import { useState, useEffect } from 'react';

interface PromoBannerProps {
  colors: any;
}

const activities = [
  {
    id: 1,
    icon: Trophy,
    tag: '热门活动',
    title: '热门隐私币交易大赛',
    subtitle: '分享 10,000 USDT 奖品！',
    color: '#F59E0B'
  },
  {
    id: 2,
    icon: Gift,
    tag: '新人专享',
    title: '注册送神秘大礼包',
    subtitle: '最高可得 100 USDT',
    color: '#D97706'
  },
  {
    id: 3,
    icon: TrendingUp,
    tag: '交易返佣',
    title: '合约交易手续费返还',
    subtitle: '交易越多返还越多',
    color: '#F59E0B'
  },
  {
    id: 4,
    icon: Users,
    tag: '邀请有奖',
    title: '邀请好友瓜分百万',
    subtitle: '每邀1人奖励50U',
    color: '#D97706'
  }
];

export function PromoBanner({ colors }: PromoBannerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  // Auto play
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activities.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      // Swipe left
      setCurrentIndex((prev) => (prev + 1) % activities.length);
    }
    if (touchStart - touchEnd < -50) {
      // Swipe right
      setCurrentIndex((prev) => (prev - 1 + activities.length) % activities.length);
    }
  };

  const activity = activities[currentIndex];
  const IconComponent = activity.icon;

  return (
    <div className="py-1">
      <div 
        className="relative overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <button className="w-full rounded-2xl border p-3 active:opacity-90 overflow-hidden relative group transition-all"
          style={{ 
            backgroundColor: colors.cardBg,
            borderColor: colors.border,
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
          }}
        >
          {/* Background Decorative Elements */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Primary Gradient Overlay */}
            <div 
              className="absolute inset-0 opacity-15 group-active:opacity-20 transition-opacity"
              style={{ 
                background: `linear-gradient(135deg, ${activity.color}40 0%, transparent 50%, ${activity.color}20 100%)` 
              }}
            />
            
            {/* Secondary Gradient Layer */}
            <div 
              className="absolute inset-0 opacity-20"
              style={{ 
                background: `linear-gradient(to right, ${activity.color}26 0%, ${activity.color}14 50%, transparent 100%)` 
              }}
            />
            
            {/* Top Edge Highlight */}
            <div 
              className="absolute top-0 left-0 right-0 h-px opacity-50"
              style={{ 
                background: `linear-gradient(90deg, transparent 0%, ${activity.color}99 50%, transparent 100%)` 
              }}
            />
            
            {/* Accent Glow - top right */}
            <div 
              className="absolute -top-8 -right-8 w-48 h-48 rounded-full blur-3xl opacity-30"
              style={{ 
                background: `radial-gradient(circle, ${activity.color} 0%, transparent 70%)` 
              }}
            />
            
            {/* Bottom left glow */}
            <div 
              className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full blur-3xl opacity-20"
              style={{ 
                background: `radial-gradient(circle, ${activity.color} 0%, transparent 70%)` 
              }}
            />
            
            {/* Icon watermark - large background */}
            <div className="absolute -right-4 top-1/2 -translate-y-1/2 opacity-8">
              <IconComponent className="w-32 h-32" style={{ color: activity.color, strokeWidth: 1 }} />
            </div>
            
            {/* Sparkle particles */}
            <div className="absolute top-2 left-1/4 w-2 h-2 rounded-full opacity-40 blur-sm" style={{ background: activity.color, boxShadow: `0 0 8px ${activity.color}` }} />
            <div className="absolute bottom-3 right-1/4 w-1.5 h-1.5 rounded-full opacity-35 blur-sm" style={{ background: activity.color, boxShadow: `0 0 6px ${activity.color}` }} />
            
            {/* Diagonal shine effect */}
            <div 
              className="absolute -top-1/2 -right-1/2 w-full h-full opacity-10 rotate-12"
              style={{ 
                background: 'linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%)' 
              }}
            />
          </div>
          
          <div className="relative flex items-center gap-3 z-10">
            {/* Left: Icon */}
            <div 
              className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 relative overflow-hidden"
              style={{ 
                backgroundColor: `${activity.color}20`,
                border: `1px solid ${activity.color}40`,
                boxShadow: `0 4px 12px ${activity.color}30`
              }}
            >
              {/* Icon glow effect */}
              <div 
                className="absolute inset-0 opacity-50 blur-md"
                style={{ background: `radial-gradient(circle, ${activity.color}40 0%, transparent 70%)` }}
              />
              <IconComponent className="w-6 h-6 relative z-10" style={{ color: activity.color }} />
            </div>
            
            {/* Center: Text Content */}
            <div className="flex-1 text-left">
              <div className="flex items-center gap-2 mb-0.5">
                <Sparkles className="w-3 h-3" style={{ color: activity.color }} />
                <span className="text-xs" style={{ color: activity.color }}>{activity.tag}</span>
              </div>
              <div className="mb-0.5 text-sm" style={{ color: colors.text }}>{activity.title}</div>
              <div className="text-xs" style={{ color: colors.textSecondary }}>{activity.subtitle}</div>
            </div>
            
            {/* Right: Arrow Button */}
            <div 
              className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
              style={{ backgroundColor: `${activity.color}15` }}
            >
              <ChevronRight className="w-4 h-4" style={{ color: activity.color }} />
            </div>
          </div>
        </button>
      </div>
      
      {/* Dots Indicator */}
      <div className="flex items-center justify-center gap-1.5 mt-2">
        {activities.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className="transition-all"
            style={{
              width: currentIndex === index ? '20px' : '6px',
              height: '6px',
              borderRadius: currentIndex === index ? '3px' : '50%',
              backgroundColor: currentIndex === index ? colors.primary : colors.textSecondary,
              opacity: currentIndex === index ? 1 : 0.3,
            }}
          />
        ))}
      </div>
    </div>
  );
}