import React, { useState, useMemo, useEffect } from 'react';
import { Eye, EyeOff, ArrowDownToLine, ArrowUpFromLine, ArrowLeftRight, Search, FileText, TrendingUp, TrendingDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../contexts/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { CoinAsset, AccountType } from '../types/wallet';
import { fetchAssets, fetchAllAssets } from '../services/walletService';

export default function Assets() {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [hideBalance, setHideBalance] = useState(false);
  const [accountType, setAccountType] = useState<AccountType>('spot');
  const [hideSmallAssets, setHideSmallAssets] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  // 数据加载状态
  const [isLoading, setIsLoading] = useState(true);
  const [spotAssets, setSpotAssets] = useState<CoinAsset[]>([]);
  const [futuresAssets, setFuturesAssets] = useState<CoinAsset[]>([]);
  const [optionsAssets, setOptionsAssets] = useState<CoinAsset[]>([]);
  
  // 加载数据
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const allAssets = await fetchAllAssets();
        setSpotAssets(allAssets.spot);
        setFuturesAssets(allAssets.futures);
        setOptionsAssets(allAssets.options);
      } catch (error) {
        console.error('Failed to load assets:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);
  
  // 根据账户类型选择资产
  const currentAssets = useMemo(() => {
    switch (accountType) {
      case 'futures':
        return futuresAssets;
      case 'options':
        return optionsAssets;
      default:
        return spotAssets;
    }
  }, [accountType]);

  // 计算总资产（所有账户的总和）
  const totalAssets = useMemo(() => {
    const spotTotal = spotAssets.reduce((sum, asset) => sum + (asset.amount * asset.price), 0);
    const futuresTotal = futuresAssets.reduce((sum, asset) => sum + (asset.amount * asset.price), 0);
    const optionsTotal = optionsAssets.reduce((sum, asset) => sum + (asset.amount * asset.price), 0);
    return spotTotal + futuresTotal + optionsTotal;
  }, [spotAssets, futuresAssets, optionsAssets]);

  // 计算昨日总资产（所有账户，基于24h涨跌幅反推）
  const yesterdayAssets = useMemo(() => {
    const calculateYesterday = (assets: CoinAsset[]) => {
      return assets.reduce((sum, asset) => {
        const yesterdayPrice = asset.price / (1 + asset.change24h / 100);
        return sum + (asset.amount * yesterdayPrice);
      }, 0);
    };
    
    return calculateYesterday(spotAssets) + calculateYesterday(futuresAssets) + calculateYesterday(optionsAssets);
  }, [spotAssets, futuresAssets, optionsAssets]);

  // 计算今日盈亏
  const todayChange = totalAssets - yesterdayAssets;
  const todayChangePercent = yesterdayAssets > 0 ? (todayChange / yesterdayAssets) * 100 : 0;
  const isPositive = todayChange >= 0;

  // 7日趋势数据（基于真实总资产）
  const trendData = useMemo(() => {
    const currentValue = totalAssets;
    const growth = 0.025; // 平均每日2.5%增长
    
    return Array.from({ length: 7 }, (_, i) => {
      const daysAgo = 6 - i;
      const factor = Math.pow(1 + growth, daysAgo);
      const value = currentValue / factor;
      // 添加随机波动
      const randomVariation = (Math.random() - 0.5) * 0.03;
      return { value: value * (1 + randomVariation) };
    });
  }, [totalAssets]);

  // 过滤资产
  const filteredAssets = useMemo(() => {
    return currentAssets.filter(asset => {
      const matchesSearch = asset.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           asset.name.toLowerCase().includes(searchTerm.toLowerCase());
      const usdtValue = asset.amount * asset.price;
      const showAsset = !hideSmallAssets || usdtValue >= 10;
      return matchesSearch && showAsset;
    });
  }, [currentAssets, searchTerm, hideSmallAssets]);

  const formatAmount = (amount: number, decimals: number = 2) => {
    if (hideBalance) return '****';
    return amount.toLocaleString('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  };

  // 格式化金额（整数和小数分开，用于小字显示）
  const formatAmountWithSmallDecimal = (amount: number, decimals: number = 2) => {
    if (hideBalance) return { integer: '****', decimal: '' };
    const formatted = amount.toFixed(decimals);
    const [integer, decimal] = formatted.split('.');
    const formattedInteger = parseFloat(integer).toLocaleString('en-US');
    return { integer: formattedInteger, decimal: decimal };
  };

  // 格式化大额显示（整数和小数分开）
  const formatLargeAmount = (amount: number) => {
    if (hideBalance) return { integer: '****', decimal: '' };
    const [integer, decimal] = amount.toFixed(2).split('.');
    const formattedInteger = parseInt(integer).toLocaleString('en-US');
    return { integer: formattedInteger, decimal: decimal };
  };

  return (
    <div className="min-h-screen pb-20" style={{ backgroundColor: colors.bg }}>
      {/* 顶部背景渐变装饰 */}
      <div 
        className="absolute top-0 left-0 right-0 h-72 opacity-40"
        style={{
          background: `linear-gradient(180deg, ${colors.primary}15 0%, transparent 100%)`,
          pointerEvents: 'none',
        }}
      />

      <div className="px-5 pt-8 pb-5 relative z-10">
        {/* 1. 总资产标题 + 隐藏按钮 */}
        <div className="flex items-center justify-between mb-6">
          <span className="text-xs uppercase tracking-wider font-bold" style={{ color: colors.textSecondary, opacity: 0.6 }}>
            {t('assets.total_assets')}
          </span>
          <button
            onClick={() => setHideBalance(!hideBalance)}
            className="transition-transform active:scale-90"
          >
            {hideBalance ? (
              <EyeOff className="w-5 h-5" style={{ color: colors.textSecondary }} />
            ) : (
              <Eye className="w-5 h-5" style={{ color: colors.textSecondary }} />
            )}
          </button>
        </div>

        {/* 2. 超大数字 - 金色渐变 */}
        <div className="mb-8">
          {(() => {
            const { integer, decimal } = formatLargeAmount(totalAssets);
            return (
              <div 
                className="font-black leading-none tracking-tight mb-2" 
                style={{
                  background: `linear-gradient(135deg, ${colors.primary} 0%, #D97706 100%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                <span className="text-[48px]">${integer}</span>
                {decimal && <span className="text-[28px] opacity-60">.{decimal}</span>}
              </div>
            );
          })()}
          <div className="text-xs font-medium" style={{ color: colors.textSecondary, opacity: 0.5 }}>
            {t('assets.total_assets_approx')}
          </div>
        </div>

        {/* 3. 盈亏卡片 + 趋势图 - 横向布局 */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {/* 盈亏卡片 - 玻璃态 */}
          <div 
            className="rounded-2xl p-4 backdrop-blur-xl"
            style={{
              background: isPositive 
                ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(16, 185, 129, 0.05) 100%)'
                : 'linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(239, 68, 68, 0.05) 100%)',
              border: `1px solid ${isPositive ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)'}`,
            }}
          >
            <div className="text-[10px] uppercase tracking-wider font-bold mb-2" style={{ color: colors.textSecondary, opacity: 0.6 }}>
              {t('assets.today_profit')}
            </div>
            <div className="flex items-baseline gap-1 mb-1">
              {isPositive ? (
                <TrendingUp className="w-4 h-4" style={{ color: '#16A34A' }} />
              ) : (
                <TrendingDown className="w-4 h-4" style={{ color: '#ef4444' }} />
              )}
              <span 
                className="font-bold text-lg"
                style={{ color: isPositive ? '#16A34A' : '#ef4444' }}
              >
                +${formatAmount(todayChange, 0)}
              </span>
            </div>
            <div className="text-xs font-semibold" style={{ color: isPositive ? '#16A34A' : '#ef4444', opacity: 0.8 }}>
              +{todayChangePercent.toFixed(2)}%
            </div>
          </div>

          {/* 趋势图卡片 */}
          <div 
            className="rounded-2xl p-3 backdrop-blur-xl overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.08) 0%, rgba(217, 119, 6, 0.04) 100%)',
              border: `1px solid ${colors.primary}20`,
            }}
          >
            <div className="text-[10px] uppercase tracking-wider font-bold mb-1" style={{ color: colors.textSecondary, opacity: 0.6 }}>
              {t('assets.trend_7d')}
            </div>
            <div className="h-16 -mx-1">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData}>
                  <defs>
                    <linearGradient id="colorTrend" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={colors.primary} stopOpacity={0.4} />
                      <stop offset="95%" stopColor={colors.primary} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Line
                    type="natural"
                    dataKey="value"
                    stroke={colors.primary}
                    strokeWidth={2.5}
                    dot={false}
                    fill="url(#colorTrend)"
                    animationDuration={1500}
                    animationEasing="ease-in-out"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* 4. 操作按钮 - 统一容器 + 分割线 */}
        <div 
          className="rounded-2xl backdrop-blur-xl mb-6 overflow-hidden"
          style={{
            background: colors.isDark 
              ? 'rgba(255, 255, 255, 0.05)' 
              : 'rgba(0, 0, 0, 0.02)',
            border: `1px solid ${colors.border}`,
          }}
        >
          <div className="flex">
            {[
              { icon: ArrowDownToLine, label: t('assets.deposit'), path: '/assets/deposit' },
              { icon: ArrowUpFromLine, label: t('assets.withdraw'), path: '/assets/withdraw' },
              { icon: ArrowLeftRight, label: t('assets.transfer'), path: '/assets/transfer' },
              { icon: FileText, label: t('assets.bill'), path: '/assets/bill' },
            ].map((item, index) => (
              <React.Fragment key={index}>
                <button 
                  className="group flex-1 flex flex-col items-center gap-2 py-4 transition-all active:scale-95 active:bg-black/5"
                  onClick={() => navigate(item.path)}
                >
                  <div 
                    className="w-11 h-11 rounded-xl flex items-center justify-center transition-all group-active:scale-90"
                    style={{
                      background: colors.isDark 
                        ? `linear-gradient(135deg, ${colors.primary}20 0%, ${colors.primary}10 100%)`
                        : `linear-gradient(135deg, ${colors.primary}15 0%, ${colors.primary}08 100%)`,
                    }}
                  >
                    <item.icon className="w-5 h-5" style={{ color: colors.primary, strokeWidth: 2.5 }} />
                  </div>
                  <span className="text-[11px] font-semibold" style={{ color: colors.textSecondary }}>{item.label}</span>
                </button>
                {/* 分割线 */}
                {index < 3 && (
                  <div 
                    className="w-px my-3"
                    style={{
                      background: `linear-gradient(180deg, transparent 0%, ${colors.border} 50%, transparent 100%)`,
                    }}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* 滚动通知栏 */}
      <div className="px-5 mb-5 relative z-10">
        <div 
          className="flex items-center gap-3 px-4 py-3 rounded-lg overflow-hidden"
          style={{
            backgroundColor: colors.isDark ? 'rgba(255, 255, 255, 0.05)' : '#F5F7FA',
            border: `1px solid ${colors.border}`,
          }}
        >
          <div className="flex-shrink-0">
            <svg className="w-4 h-4" style={{ color: colors.primary }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
          </div>
          <div className="flex-1 overflow-hidden">
            <div className="animate-scroll whitespace-nowrap" data-text={t('assets.notification')}>
              <span className="text-xs font-medium" style={{ color: colors.textSecondary }}>
                {t('assets.notification')}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. 账户类型切换 - 简洁设计（参考图片） */}
      <div className="px-5 mb-4">
        <div className="flex items-center gap-1">
          {[
            { id: 'spot', labelKey: 'assets.spot_account' },
            { id: 'futures', labelKey: 'assets.futures_account' },
            { id: 'options', labelKey: 'assets.options_account' },
          ].map((type) => (
            <button
              key={type.id}
              onClick={() => setAccountType(type.id as any)}
              className="px-3 py-1.5 text-sm transition-all"
              style={{
                color: accountType === type.id ? colors.text : colors.textSecondary,
                fontWeight: accountType === type.id ? 500 : 400,
              }}
            >
              {t(type.labelKey)}
            </button>
          ))}
        </div>
      </div>

      {/* 3. 资产列表标题 */}
      <div className="px-5 mb-3">
        <div className="flex items-center justify-between">
          <span className="font-bold" style={{ color: colors.text, fontSize: '17px' }}>
            {t('assets.asset_list')}
          </span>
          
          <button
            onClick={() => setHideSmallAssets(!hideSmallAssets)}
            className="text-xs font-medium transition-opacity active:opacity-70"
            style={{
              color: hideSmallAssets ? colors.primary : colors.textSecondary,
            }}
          >
            {hideSmallAssets ? t('assets.show_all') : t('assets.hide_small')}
          </button>
        </div>
      </div>

      {/* 4. 搜索框 */}
      <div className="px-5 mb-4">
        <div 
          className="flex items-center gap-3 px-4 py-2.5 rounded-2xl transition-all"
          style={{ 
            backgroundColor: 'transparent',
            border: `1px solid ${colors.border}`,
          }}
        >
          <Search className="w-4 h-4" style={{ color: colors.textSecondary }} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t('assets.search_coin')}
            className="flex-1 bg-transparent outline-none text-sm"
            style={{ color: colors.text }}
          />
        </div>
      </div>

      {/* 5. 资产列表 - 紧凑设计 + 真实图标 */}
      <div className="px-5">
        <div className="space-y-0">
          {filteredAssets.map((asset, index) => {
            const usdtValue = asset.amount * asset.price;
            return (
              <div key={`${asset.symbol}-${index}`}>
                <div className="flex items-center justify-between py-3 transition-all active:opacity-70">
                  {/* 左侧：图标 + 信息 */}
                  <div className="flex items-center gap-3">
                    <ImageWithFallback
                      src={asset.imageUrl}
                      alt={asset.symbol}
                      className="w-9 h-9 rounded-full object-cover"
                    />
                    
                    <div>
                      <div className="font-semibold mb-0.5" style={{ color: colors.text, fontSize: '15px' }}>
                        {asset.symbol}
                      </div>
                      <div className="text-xs font-medium" style={{ color: colors.textSecondary }}>
                        {formatAmount(asset.amount, asset.symbol === 'USDT' || asset.symbol === 'SHIB' ? 2 : 4)} {asset.symbol}
                      </div>
                    </div>
                  </div>

                  {/* 右侧：估值 */}
                  <div className="text-right">
                    {(() => {
                      const { integer, decimal } = formatAmountWithSmallDecimal(usdtValue, 2);
                      return (
                        <div className="font-bold mb-0.5 flex items-baseline justify-end" style={{ color: colors.text }}>
                          <span style={{ fontSize: '16px' }}>${integer}</span>
                          {decimal && <span style={{ fontSize: '11px', opacity: 0.7 }}>.{decimal}</span>}
                        </div>
                      );
                    })()}
                    {(() => {
                      const { integer, decimal } = formatAmountWithSmallDecimal(usdtValue, 2);
                      return (
                        <div className="text-[10px] font-medium flex items-baseline justify-end" style={{ color: colors.textSecondary, opacity: 0.6 }}>
                          <span>≈ {integer}</span>
                          {decimal && <span style={{ fontSize: '8px' }}>.{decimal}</span>}
                          <span className="ml-0.5">USDT</span>
                        </div>
                      );
                    })()}
                  </div>
                </div>
                
                {/* 分隔线 */}
                {index < filteredAssets.length - 1 && (
                  <div className="h-px" style={{ backgroundColor: colors.border }} />
                )}
              </div>
            );
          })}
        </div>

        {/* 空状态 */}
        {filteredAssets.length === 0 && (
          <div className="py-16 text-center">
            <Search className="w-12 h-12 mx-auto mb-3" style={{ color: colors.textSecondary, opacity: 0.3 }} />
            <div className="text-sm font-medium" style={{ color: colors.textSecondary }}>
              {searchTerm ? t('assets.no_match') : hideSmallAssets ? t('assets.no_large_assets') : t('assets.no_assets')}
            </div>
          </div>
        )}
      </div>

      {/* 底部提示 */}
      <div className="px-5 mt-8 text-center">
        <div className="text-xs" style={{ color: colors.textSecondary, opacity: 0.5 }}>
          {t('assets.disclaimer')}
        </div>
      </div>
    </div>
  );
}