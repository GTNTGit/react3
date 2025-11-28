import React, { useState, useEffect } from 'react';
import { TrendingUp, Gift, Zap, DollarSign, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../contexts/ThemeContext';

interface PromoCardsProps {
}

// 币种涨跌数据
const coinTrends = [
  {
    symbol: 'BTC',
    name: 'Bitcoin',
    price: '43,256.80',
    change: '+2.48%',
    change24h: '+1,034.20',
    isUp: true,
    sparkline: [35, 38, 36, 40, 38, 42, 40, 45, 43, 48, 46, 50],
    color: '#22c55e', // 绿色（涨）
  },
  {
    symbol: 'ETH',
    name: 'Ethereum',
    price: '2,284.50',
    change: '+3.82%',
    change24h: '+84.20',
    isUp: true,
    sparkline: [30, 32, 35, 33, 38, 36, 40, 42, 45, 43, 48, 50],
    color: '#22c55e', // 绿色（涨）
  },
  {
    symbol: 'BNB',
    name: 'BNB',
    price: '312.45',
    change: '-1.23%',
    change24h: '-3.89',
    isUp: false,
    sparkline: [50, 48, 45, 43, 40, 42, 38, 36, 35, 33, 32, 30],
    color: '#ef4444', // 红色（跌）
  },
  {
    symbol: 'SOL',
    name: 'Solana',
    price: '98.76',
    change: '+5.67%',
    change24h: '+5.30',
    isUp: true,
    sparkline: [28, 30, 35, 32, 38, 40, 42, 45, 48, 46, 50, 52],
    color: '#22c55e', // 绿色（涨）
  },
];

export function PromoCards({}: PromoCardsProps) {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [coinIndex, setCoinIndex] = useState(0);

  // 轮播卡片数据 - 真实运营内容（纯扁平化）
  const carouselItems = [
    {
      title: t('promo.new_user_bonus'),
      subtitle: t('promo.register_bonus'),
      description: t('promo.kyc_description'),
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      icon: Gift,
      tag: t('promo.limited_time'),
      tagColor: '#f59e0b',
      decorativeIcon: '🎁',
    },
    {
      title: t('promo.contract_contest'),
      subtitle: t('promo.contest_prize'),
      description: t('promo.contest_description'),
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      icon: TrendingUp,
      tag: t('promo.hot'),
      tagColor: '#ef4444',
      decorativeIcon: '📈',
    },
    {
      title: t('promo.zero_fee_swap'),
      subtitle: t('promo.swap_subtitle'),
      description: t('promo.swap_description'),
      gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      icon: Zap,
      tag: t('promo.zero_fee'),
      tagColor: '#f59e0b',
      decorativeIcon: '⚡',
    },
    {
      title: t('promo.fixed_deposit'),
      subtitle: t('promo.apr'),
      description: t('promo.deposit_description'),
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      icon: DollarSign,
      tag: t('promo.stable'),
      tagColor: '#22c55e',
      decorativeIcon: '💰',
    },
  ];

  // 自动轮播 - 推广卡片
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carouselItems.length);
    }, 5000); // 每5秒切换

    return () => clearInterval(interval);
  }, []);

  // 自动轮播 - 币种卡片
  useEffect(() => {
    const interval = setInterval(() => {
      setCoinIndex((prev) => (prev + 1) % coinTrends.length);
    }, 5000); // 改成每5秒切换，与左侧卡片同步

    return () => clearInterval(interval);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + carouselItems.length) % carouselItems.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % carouselItems.length);
  };

  return (
    <div className="px-3 py-3">
      <div className="grid grid-cols-2 gap-3">
        {/* 左侧：轮播图卡片 */}
        <div className="relative" style={{ height: '191px' }}>
          <div 
            className="rounded-2xl overflow-hidden w-full h-full active:opacity-90 transition-all relative"
            style={{
              background: carouselItems[currentIndex].gradient,
              border: `1px solid ${colors.border}`,
            }}
          >
            {/* 扁平化装饰元素 */}
            <div className="absolute inset-0 overflow-hidden">
              {/* 大圆圈装饰 */}
              <div 
                className="absolute -right-8 -top-8 w-32 h-32 rounded-full transition-all duration-500"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                }}
              />
              {/* 小圆圈装饰 */}
              <div 
                className="absolute -left-4 -bottom-4 w-24 h-24 rounded-full transition-all duration-500"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                }}
              />
              {/* 大emoji装饰 */}
              <div 
                className="absolute right-2 bottom-2 text-6xl opacity-20 transition-all duration-500"
                style={{
                  transform: 'rotate(-15deg)',
                }}
              >
                {carouselItems[currentIndex].decorativeIcon}
              </div>
            </div>

            {/* 内容区域 */}
            <div className="relative z-10 p-4 h-full flex flex-col justify-between">
              {/* 顶部：标签 */}
              <div className="flex items-start justify-between">
                <div
                  className="px-2.5 py-1 rounded-full text-[10px] font-medium"
                  style={{
                    backgroundColor: carouselItems[currentIndex].tagColor,
                    color: '#fff',
                  }}
                >
                  {carouselItems[currentIndex].tag}
                </div>
                
                {/* 图标 */}
                <div 
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.25)',
                  }}
                >
                  {(() => {
                    const IconComponent = carouselItems[currentIndex].icon;
                    return <IconComponent className="w-5 h-5 text-white" strokeWidth={2.5} />;
                  })()}
                </div>
              </div>

              {/* 中间：文字内容 */}
              <div className="flex-1 flex flex-col justify-center">
                <h3 className="text-base mb-1.5 text-white font-semibold">
                  {carouselItems[currentIndex].title}
                </h3>
                <p className="text-lg mb-1 text-white font-bold">
                  {carouselItems[currentIndex].subtitle}
                </p>
                <p className="text-xs text-white/90">
                  {carouselItems[currentIndex].description}
                </p>
              </div>

              {/* 底部：指示器 */}
              <div className="flex items-center gap-1.5">
                {carouselItems.map((_, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentIndex(index);
                    }}
                    className="transition-all"
                    style={{
                      width: currentIndex === index ? '20px' : '6px',
                      height: '6px',
                      borderRadius: '3px',
                      backgroundColor: currentIndex === index 
                        ? '#ffffff'
                        : 'rgba(255, 255, 255, 0.4)',
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 右侧：两个卡片 */}
        <div className="flex flex-col gap-3">
          {/* 币种涨跌势图轮播卡片 - 透底色 */}
          <div 
            className="rounded-2xl overflow-hidden flex flex-col active:opacity-80 transition-all relative"
            style={{
              backgroundColor: colors.isDark ? 'rgba(255, 255, 255, 0.03)' : '#ffffff',
              border: `1px solid ${colors.border}`,
              height: '141px',
            }}
          >
            {/* 内容区域 */}
            <div className="relative z-10 flex flex-col h-full p-3">
              {/* 顶部行：币种 + 涨跌幅 */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5">
                  {/* 币种符号 */}
                  <div 
                    className="w-7 h-7 rounded-full flex items-center justify-center text-sm"
                    style={{ 
                      backgroundColor: `${coinTrends[coinIndex].color}20`,
                    }}
                  >
                    <span style={{ color: coinTrends[coinIndex].color, fontWeight: 700 }}>
                      {coinTrends[coinIndex].symbol === 'BTC' && '₿'}
                      {coinTrends[coinIndex].symbol === 'ETH' && '◆'}
                      {coinTrends[coinIndex].symbol === 'BNB' && '◆'}
                      {coinTrends[coinIndex].symbol === 'SOL' && '◎'}
                    </span>
                  </div>
                  <div className="text-left leading-tight">
                    <div style={{ color: colors.text, fontWeight: 700, fontSize: '13px', lineHeight: '1.2' }}>
                      {coinTrends[coinIndex].symbol}
                    </div>
                    <div style={{ color: colors.textSecondary, fontSize: '9px', lineHeight: '1.2' }}>
                      {coinTrends[coinIndex].name}
                    </div>
                  </div>
                </div>
                
                {/* 涨跌幅标签 */}
                <div 
                  className="px-2 py-0.5 rounded text-[10px] font-bold"
                  style={{
                    backgroundColor: coinTrends[coinIndex].isUp 
                      ? 'rgba(34, 197, 94, 0.1)' 
                      : 'rgba(239, 68, 68, 0.1)',
                    color: coinTrends[coinIndex].color,
                  }}
                >
                  {coinTrends[coinIndex].change}
                </div>
              </div>

              {/* 中间：走势图 - 占满剩余空间 */}
              <div className="flex-1 flex items-center justify-center">
                <svg width="100%" height="100%" viewBox="0 0 160 70" preserveAspectRatio="none" className="transition-all duration-500">
                  <defs>
                    <linearGradient id={`flat-gradient-${coinIndex}`} x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" style={{ stopColor: coinTrends[coinIndex].color, stopOpacity: 0.15 }} />
                      <stop offset="100%" style={{ stopColor: coinTrends[coinIndex].color, stopOpacity: 0 }} />
                    </linearGradient>
                  </defs>
                  
                  {/* 生成路径 */}
                  {(() => {
                    const data = coinTrends[coinIndex].sparkline;
                    const width = 160;
                    const height = 70;
                    const padding = 8;
                    const max = Math.max(...data);
                    const min = Math.min(...data);
                    const range = max - min || 1;
                    
                    const points = data.map((value, index) => {
                      const x = (index / (data.length - 1)) * width;
                      const y = padding + ((max - value) / range) * (height - padding * 2);
                      return `${x},${y}`;
                    });
                    
                    const linePath = `M ${points.join(' L ')}`;
                    const areaPath = `${linePath} L ${width},${height - padding} L 0,${height - padding} Z`;
                    
                    return (
                      <>
                        {/* 填充区域 */}
                        <path
                          d={areaPath}
                          fill={`url(#flat-gradient-${coinIndex})`}
                          className="transition-all duration-500"
                        />
                        
                        {/* 趋势线 */}
                        <path
                          d={linePath}
                          fill="none"
                          stroke={coinTrends[coinIndex].color}
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="transition-all duration-500"
                        />
                        
                        {/* 终点圆点 */}
                        <circle
                          cx={parseFloat(points[points.length - 1].split(',')[0])}
                          cy={parseFloat(points[points.length - 1].split(',')[1])}
                          r="3"
                          fill={coinTrends[coinIndex].color}
                          className="transition-all duration-500"
                        />
                      </>
                    );
                  })()}
                </svg>
              </div>
            </div>
          </div>

          {/* 邀请好友卡片 - 透底色 */}
          <button 
            className="rounded-2xl px-4 py-3 flex items-center justify-between active:opacity-80 transition-opacity"
            style={{
              backgroundColor: colors.isDark ? 'rgba(255, 255, 255, 0.03)' : '#ffffff',
              border: `1px solid ${colors.border}`,
              height: '47px',
            }}
          >
            <div className="text-left">
              <div className="text-xl mb-0.5" style={{ color: colors.text, fontWeight: 700 }}>
                {t('promo.invite_friends')}
              </div>
              <div className="text-xs" style={{ color: colors.textSecondary, opacity: 0.6 }}>
                {t('promo.invite_friends')}
              </div>
            </div>
            
            {/* 右侧箭头 */}
            <ChevronRight 
              className="w-6 h-6" 
              style={{ color: colors.textSecondary, opacity: 0.4 }}
              strokeWidth={2}
            />
          </button>
        </div>
      </div>
    </div>
  );
}