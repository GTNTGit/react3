import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, TrendingUp, TrendingDown, ChevronDown } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { CandlestickChart } from './CandlestickChart';

interface TradeDetailPageProps {
  isDark: boolean;
}

export function TradeDetailPage({ isDark }: TradeDetailPageProps) {
  const { colors } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const initialCoin = location.state?.coin;
  const [activeInterval, setActiveInterval] = useState('5min');
  const [activeTab, setActiveTab] = useState('book');
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const [chartWidth, setChartWidth] = useState(0);

  // 当前币种数据
  const coin = initialCoin || {
    symbol: 'BTC',
    name: 'BTC 期权',
    price: '43256.82',
    change: 2.97,
  };

  // 价格统计数据
  const priceStats = {
    high: '43829.50',
    low: '41926.30',
    volume24h: '284734',
  };

  // 图表时间周期
  const intervals = [
    { label: '1min', value: '1min' },
    { label: '5min', value: '5min' },
    { label: '15min', value: '15min' },
    { label: '30min', value: '30min' },
    { label: '1hour', value: '1hour' },
    { label: '4hour', value: '4hour' },
    { label: '1day', value: '1day' },
  ];

  // OHLC 数据
  const ohlcData = {
    open: '2753.66',
    high: '2753.66',
    low: '2749.78',
    close: '2751.97',
    change: '-17.48',
    changePercent: '-0.63',
  };

  // 买卖盘口数据
  const buyOrders = [
    { price: '43180.20', amount: '0.5234', total: '22601.23' },
    { price: '43150.75', amount: '0.8967', total: '38685.64' },
    { price: '43120.30', amount: '0.6543', total: '28228.66' },
    { price: '43100.50', amount: '1.2345', total: '53220.57' },
    { price: '43080.90', amount: '0.4521', total: '19487.29' },
  ];

  const sellOrders = [
    { price: '43210.90', amount: '0.7234', total: '31259.82' },
    { price: '43240.20', amount: '0.9876', total: '42698.95' },
    { price: '43270.85', amount: '1.1234', total: '48614.29' },
    { price: '43300.45', amount: '0.6789', total: '29392.72' },
    { price: '43330.10', amount: '1.4567', total: '63111.28' },
  ];

  // 计算最大量能（用于背景条）
  const maxBuyAmount = Math.max(...buyOrders.map(o => parseFloat(o.amount)));
  const maxSellAmount = Math.max(...sellOrders.map(o => parseFloat(o.amount)));

  // 即时成交数据
  const recentTrades = [
    { price: '43256.82', amount: '0.234', time: '14:32:45', type: 'buy' },
    { price: '43250.10', amount: '0.567', time: '14:32:43', type: 'sell' },
    { price: '43255.50', amount: '0.123', time: '14:32:41', type: 'buy' },
    { price: '43248.90', amount: '0.891', time: '14:32:38', type: 'sell' },
    { price: '43260.20', amount: '0.456', time: '14:32:35', type: 'buy' },
  ];

  // 监听容器尺寸变化
  useEffect(() => {
    const updateSize = () => {
      if (chartContainerRef.current) {
        setChartWidth(chartContainerRef.current.offsetWidth);
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const isPositive = coin.change >= 0;
  const priceColor = isPositive ? colors.success : colors.danger;

  return (
    <div 
      className="min-h-screen flex flex-col"
      style={{ 
        backgroundColor: colors.bg,
        paddingBottom: '140px', // 为底部按钮和导航留出空间
      }}
    >
      {/* 顶部导航栏 */}
      <div 
        className="sticky top-0 z-50 px-4 py-3 flex items-center justify-between"
        style={{ 
          backgroundColor: colors.cardBg,
          borderBottom: `1px solid ${colors.border}`,
        }}
      >
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate('/')}
            className="w-8 h-8 rounded-lg flex items-center justify-center transition-all active:scale-90"
            style={{ backgroundColor: colors.bg }}
          >
            <ArrowLeft className="w-5 h-5" style={{ color: colors.text }} />
          </button>
          
          <button className="flex items-center gap-1.5 active:scale-95 transition-all">
            <span style={{ color: colors.text, fontWeight: 600 }}>{coin.name}</span>
            <ChevronDown className="w-4 h-4" style={{ color: colors.textSecondary }} />
          </button>
        </div>

        {/* 涨跌幅标签 */}
        <div 
          className="px-2.5 py-1 rounded-md text-sm"
          style={{
            backgroundColor: isPositive ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
            color: priceColor,
            fontWeight: 600,
          }}
        >
          {isPositive ? '+' : ''}{coin.change}%
        </div>
      </div>

      {/* 价格信息区 */}
      <div className="px-4 py-4" style={{ borderBottom: `1px solid ${colors.border}` }}>
        <div className="flex items-start justify-between">
          {/* 左侧：当前价格 */}
          <div>
            <div 
              className="text-3xl mb-1"
              style={{ 
                color: priceColor,
                fontWeight: 700,
                letterSpacing: '-0.5px',
              }}
            >
              {coin.price}
            </div>
            <div className="text-sm" style={{ color: colors.textSecondary }}>
              ≈ ${coin.price} USD
            </div>
          </div>

          {/* 右侧：统计数据 */}
          <div className="text-right space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs" style={{ color: colors.textSecondary }}>高</span>
              <span className="text-sm" style={{ color: colors.text }}>{priceStats.high}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs" style={{ color: colors.textSecondary }}>低</span>
              <span className="text-sm" style={{ color: colors.text }}>{priceStats.low}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs" style={{ color: colors.textSecondary }}>24h量</span>
              <span className="text-sm" style={{ color: colors.text }}>{priceStats.volume24h}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 图表区域 */}
      <div style={{ backgroundColor: colors.cardBg }}>
        {/* 时间周期选择 */}
        <div className="px-3 pt-3 pb-2">
          <div className="flex items-center gap-2 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
            {intervals.map((interval) => (
              <button
                key={interval.value}
                onClick={() => setActiveInterval(interval.value)}
                className="px-3 py-1.5 rounded-lg text-xs whitespace-nowrap transition-all active:scale-95"
                style={{
                  backgroundColor: activeInterval === interval.value 
                    ? colors.success
                    : colors.bg,
                  color: activeInterval === interval.value 
                    ? '#ffffff' 
                    : colors.textSecondary,
                  border: `1px solid ${activeInterval === interval.value ? colors.success : colors.border}`,
                }}
              >
                {interval.label}
              </button>
            ))}
          </div>
        </div>

        {/* OHLC 信息栏 */}
        <div 
          className="px-3 py-2 text-xs overflow-x-auto"
          style={{ 
            borderTop: `1px solid ${colors.border}`,
            borderBottom: `1px solid ${colors.border}`,
          }}
        >
          <div className="flex items-center gap-4 whitespace-nowrap">
            <span style={{ color: colors.textSecondary }}>DMETH/USDT</span>
            <span style={{ color: colors.text }}>开: {ohlcData.open}</span>
            <span style={{ color: colors.success }}>高: {ohlcData.high}</span>
            <span style={{ color: colors.danger }}>低: {ohlcData.low}</span>
            <span style={{ color: colors.text }}>收: {ohlcData.close}</span>
            <span style={{ color: colors.danger }}>
              {ohlcData.change} ({ohlcData.changePercent}%)
            </span>
          </div>
        </div>

        {/* K线图 */}
        <div ref={chartContainerRef} style={{ height: '280px', backgroundColor: colors.bg }}>
          {chartWidth > 0 && (
            <CandlestickChart
              width={chartWidth}
              height={280}
            />
          )}
        </div>

        {/* TradingView 标识 */}
        <div className="px-3 pb-2 flex items-center justify-center gap-1.5">
          <svg width="14" height="14" viewBox="0 0 24 24" fill={colors.textSecondary}>
            <path d="M4 4h16v16H4V4z"/>
          </svg>
          <span className="text-xs" style={{ color: colors.textSecondary }}>
            Chart by TradingView
          </span>
        </div>
      </div>

      {/* Tab切换 */}
      <div className="px-4 py-3" style={{ borderBottom: `1px solid ${colors.border}` }}>
        <div className="flex gap-6">
          <button
            onClick={() => setActiveTab('book')}
            className="pb-2 text-sm transition-all relative"
            style={{
              color: activeTab === 'book' ? colors.text : colors.textSecondary,
              fontWeight: activeTab === 'book' ? 600 : 400,
            }}
          >
            盘口
            {activeTab === 'book' && (
              <div 
                className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                style={{ backgroundColor: colors.primary }}
              />
            )}
          </button>
          <button
            onClick={() => setActiveTab('trades')}
            className="pb-2 text-sm transition-all relative"
            style={{
              color: activeTab === 'trades' ? colors.text : colors.textSecondary,
              fontWeight: activeTab === 'trades' ? 600 : 400,
            }}
          >
            即时成交
            {activeTab === 'trades' && (
              <div 
                className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                style={{ backgroundColor: colors.primary }}
              />
            )}
          </button>
        </div>
      </div>

      {/* 数据内容区 */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'book' ? (
          /* 盘口数据 */
          <div>
            {/* 表头 */}
            <div 
              className="px-4 py-2 flex text-xs"
              style={{ 
                backgroundColor: colors.cardBg,
                color: colors.textSecondary,
              }}
            >
              <div className="flex-1 text-left">数量(ETH)</div>
              <div className="flex-1 text-center">买价(USDT)</div>
              <div className="flex-1 text-center">卖价(USDT)</div>
              <div className="flex-1 text-right">数量(ETH)</div>
            </div>

            {/* 盘口列表 */}
            <div>
              {[0, 1, 2, 3, 4].map((index) => (
                <div key={index} className="flex">
                  {/* 左侧：买盘 */}
                  <div className="flex-1 flex relative overflow-hidden">
                    {buyOrders[index] && (
                      <>
                        {/* 量能条 */}
                        <div 
                          className="absolute top-0 right-0 bottom-0 transition-all"
                          style={{ 
                            width: `${(parseFloat(buyOrders[index].amount) / maxBuyAmount) * 100}%`,
                            backgroundColor: `${colors.success}15`,
                          }}
                        />
                        {/* 数据 */}
                        <div className="flex-1 text-left text-sm relative z-10 py-2.5 px-4" style={{ color: colors.text }}>
                          {buyOrders[index].amount}
                        </div>
                        <div className="flex-1 text-center relative z-10 py-2.5" style={{ color: colors.success, fontWeight: 600 }}>
                          {buyOrders[index].price}
                        </div>
                      </>
                    )}
                  </div>

                  {/* 中间分隔线 */}
                  <div className="w-px" style={{ backgroundColor: colors.border }}></div>

                  {/* 右侧：卖盘 */}
                  <div className="flex-1 flex relative overflow-hidden">
                    {sellOrders[index] && (
                      <>
                        {/* 量能条 */}
                        <div 
                          className="absolute top-0 left-0 bottom-0 transition-all"
                          style={{ 
                            width: `${(parseFloat(sellOrders[index].amount) / maxSellAmount) * 100}%`,
                            backgroundColor: `${colors.danger}15`,
                          }}
                        />
                        {/* 数据 */}
                        <div className="flex-1 text-center relative z-10 py-2.5" style={{ color: colors.danger, fontWeight: 600 }}>
                          {sellOrders[index].price}
                        </div>
                        <div className="flex-1 text-right text-sm relative z-10 py-2.5 px-4" style={{ color: colors.text }}>
                          {sellOrders[index].amount}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* 即时成交 */
          <div>
            {/* 表头 */}
            <div 
              className="px-4 py-2 flex text-xs"
              style={{ 
                backgroundColor: colors.cardBg,
                color: colors.textSecondary,
              }}
            >
              <div className="flex-1 text-left">价格(USDT)</div>
              <div className="flex-1 text-center">数量(ETH)</div>
              <div className="flex-1 text-right">时间</div>
            </div>

            {/* 成交列表 */}
            <div>
              {recentTrades.map((trade, index) => (
                <div 
                  key={index}
                  className="px-4 py-2.5 flex text-sm"
                  style={{ 
                    borderBottom: `1px solid ${colors.border}`,
                  }}
                >
                  <div 
                    className="flex-1 text-left"
                    style={{ 
                      color: trade.type === 'buy' ? colors.success : colors.danger,
                      fontWeight: 600,
                    }}
                  >
                    {trade.price}
                  </div>
                  <div className="flex-1 text-center" style={{ color: colors.text }}>
                    {trade.amount}
                  </div>
                  <div className="flex-1 text-right" style={{ color: colors.textSecondary }}>
                    {trade.time}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 底部交易按钮 */}
      <div 
        className="fixed left-0 right-0 px-4 py-3 flex gap-3"
        style={{ 
          bottom: '60px', // 在底部导航上方
          backgroundColor: colors.bg,
          borderTop: `1px solid ${colors.border}`,
          zIndex: 40,
        }}
      >
        <button
          className="flex-1 py-3.5 rounded-xl text-white transition-all active:scale-98"
          style={{
            background: `linear-gradient(135deg, ${colors.danger} 0%, #dc2626 100%)`,
            boxShadow: `0 8px 20px ${colors.danger}40`,
            fontWeight: 600,
          }}
        >
          卖出
        </button>
        <button
          className="flex-1 py-3.5 rounded-xl text-white transition-all active:scale-98"
          style={{
            background: `linear-gradient(135deg, ${colors.success} 0%, #059669 100%)`,
            boxShadow: `0 8px 20px ${colors.success}40`,
            fontWeight: 600,
          }}
        >
          买入
        </button>
      </div>

    </div>
  );
}
