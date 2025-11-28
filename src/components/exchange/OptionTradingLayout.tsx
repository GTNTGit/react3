import React, { useState, useEffect } from 'react';
import { Clock, TrendingUp, TrendingDown, X, Zap, Wallet, RotateCw, ChevronDown, ChevronUp, Star, BarChart2, Plus } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { PairSelectorModal } from './PairSelectorModal';
import { ChartData, SelectedPair } from '../../types/trade';

// 交易对数据
const tradingPairs = [
  {
    symbol: 'BTCUSDT',
    name: 'BTC/USDT',
    fullName: 'Bitcoin',
    currentPrice: 43250.00,
    change24h: 2.87,
    category: 'web3',
    color: '#F7931A',
    icon: '₿',
  },
  {
    symbol: 'ETHUSDT',
    name: 'ETH/USDT',
    fullName: 'Ethereum',
    currentPrice: 2762.69,
    change24h: -8.94,
    category: 'web3',
    color: '#627EEA',
    icon: 'Ξ',
  },
  {
    symbol: 'BNBUSDT',
    name: 'BNB/USDT',
    fullName: 'Binance Coin',
    currentPrice: 312.45,
    change24h: -2.59,
    category: 'web3',
    color: '#F3BA2F',
    icon: 'B',
  },
  {
    symbol: 'SOLUSDT',
    name: 'SOL/USDT',
    fullName: 'Solana',
    currentPrice: 98.23,
    change24h: 5.67,
    category: 'web3',
    color: '#14F195',
    icon: 'S',
  },
  {
    symbol: 'XRPUSDT',
    name: 'XRP/USDT',
    fullName: 'Ripple',
    currentPrice: 0.6234,
    change24h: -1.23,
    category: 'web3',
    color: '#23292F',
    icon: 'X',
  },
];

interface OptionTradingLayoutProps {
}

export function OptionTradingLayout({}: OptionTradingLayoutProps) {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const isDark = colors.bg === '#0A0E17' || colors.bg.startsWith('#0') || colors.bg.startsWith('#1');
  
  const [duration, setDuration] = useState('1min');
  const [amount, setAmount] = useState('');
  const [activeTab, setActiveTab] = useState<'positions' | 'history'>('positions');
  const [showPairMenu, setShowPairMenu] = useState(false);
  const [showTradeModal, setShowTradeModal] = useState(false);
  const [tradeType, setTradeType] = useState<'call' | 'put'>('call');
  const [favorites, setFavorites] = useState<string[]>(['ETHUSDT', 'BTCUSDT']);
  const [selectedPair, setSelectedPair] = useState<SelectedPair>({
    symbol: 'BTCUSDT',
    name: 'BTC/USDT',
    fullName: 'Bitcoin',
    currentPrice: 43250.00,
    change24h: 2.87,
  });
  const [chartExpanded, setChartExpanded] = useState(true);
  const [chartTimeframe, setChartTimeframe] = useState('15m');
  const [chartLoading, setChartLoading] = useState(false);
  const [chartData, setChartData] = useState<ChartData | null>(null);
  
  const [balance, setBalance] = useState(100000);

  // 将 durationOptions 移入组件内部，以便使用 t() 翻译
  const durationOptions = [
    { id: '40s', label: t('option.duration_40s'), profit: 80 },
    { id: '1min', label: t('option.duration_1min'), profit: 60 },
    { id: '3min', label: t('option.duration_3min'), profit: 42 },
    { id: '5min', label: t('option.duration_5min'), profit: 95 },
    { id: '7min', label: t('option.duration_7min'), profit: 80 },
    { id: '10min', label: t('option.duration_10min'), profit: 80 },
  ];

  const quickAmounts = [500, 1000, 5000];

  const getCurrentProfitRate = () => {
    const option = durationOptions.find(d => d.id === duration);
    return option ? option.profit : 0;
  };

  const calculateProfit = () => {
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) return '0.00';
    
    const profitRate = getCurrentProfitRate() / 100;
    const profit = numAmount * profitRate;
    return profit.toFixed(2);
  };

  const calculateTotal = () => {
    const numAmount = parseFloat(amount);
    const profit = parseFloat(calculateProfit());
    
    if (isNaN(numAmount) || numAmount <= 0) return '0.00';
    
    return (numAmount + profit).toFixed(2);
  };
  
  const validateAmount = (value: string) => {
    if (!value || value === '') return true;
    
    const numValue = parseFloat(value);
    if (isNaN(numValue) || numValue < 0) return false;
    
    return numValue <= balance;
  };
  
  const handleAmountChange = (value: string) => {
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      const numValue = parseFloat(value);
      if (!isNaN(numValue) && numValue > balance) {
        setAmount(balance.toFixed(2));
      } else {
        setAmount(value);
      }
    }
  };

  const handleOpenTradeModal = (type: 'call' | 'put') => {
    setTradeType(type);
    setAmount('');
    setDuration('1min');
    setShowTradeModal(true);
  };

  const handleConfirmTrade = () => {
    // 交易逻辑
    setShowTradeModal(false);
    setAmount('');
  };

  const toggleFavorite = (symbol: string) => {
    setFavorites(prev => 
      prev.includes(symbol) 
        ? prev.filter(s => s !== symbol)
        : [...prev, symbol]
    );
  };

  useEffect(() => {
    if (chartExpanded) {
      loadChartData();
    }
  }, [chartExpanded, chartTimeframe, selectedPair.symbol]);

  const loadChartData = async () => {
    setChartLoading(true);
    setChartData(null);

    const loadTime = Math.random() * 1000 + 500;
    await new Promise(resolve => setTimeout(resolve, loadTime));

    const mockData: ChartData = {
      klines: [
        { open: 100, close: 120, high: 130, low: 95, isGreen: true },
        { open: 120, close: 110, high: 125, low: 105, isGreen: false },
        { open: 110, close: 130, high: 135, low: 108, isGreen: true },
        { open: 130, close: 125, high: 135, low: 120, isGreen: false },
        { open: 125, close: 140, high: 145, low: 123, isGreen: true },
        { open: 140, close: 135, high: 142, low: 130, isGreen: false },
        { open: 135, close: 150, high: 155, low: 133, isGreen: true },
        { open: 150, close: 145, high: 152, low: 140, isGreen: false },
        { open: 145, close: 160, high: 165, low: 143, isGreen: true },
        { open: 160, close: 155, high: 163, low: 150, isGreen: false },
        { open: 155, close: 165, high: 170, low: 153, isGreen: true },
        { open: 165, close: 160, high: 168, low: 155, isGreen: false },
        { open: 160, close: 170, high: 175, low: 158, isGreen: true },
        { open: 170, close: 165, high: 172, low: 160, isGreen: false },
        { open: 165, close: 175, high: 180, low: 163, isGreen: true },
      ],
      timeLabels: ['09:00', '12:00', '15:00', '18:00', '21:00'],
      priceLabels: ['$44000', '$43500', '$43000', '$42500', '$42000'],
    };

    setChartData(mockData);
    setChartLoading(false);
  };

  return (
    <div className="min-h-screen pb-20" style={{ backgroundColor: colors.bg }}>
      {/* 顶部币种信息 */}
      <div className="flex items-center justify-between px-4 py-3">
        <button 
          className="flex items-center gap-2 transition-all active:opacity-70"
          onClick={() => setShowPairMenu(true)}
        >
          <span style={{ color: colors.text }}>{selectedPair.name}</span>
          <span 
            className="text-xs px-1.5 py-0.5 rounded font-medium"
            style={{ 
              backgroundColor: `${colors.warning}20`,
              color: colors.warning 
            }}
          >
            {t('option.option')}
          </span>
          <ChevronDown className="w-4 h-4" style={{ color: colors.textSecondary }} />
        </button>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <div style={{ color: colors.text }}>${selectedPair.currentPrice.toFixed(2)}</div>
            <div className="text-xs" style={{ color: selectedPair.change24h >= 0 ? colors.success : colors.danger }}>
              {selectedPair.change24h >= 0 ? '+' : ''}{selectedPair.change24h.toFixed(2)}%
            </div>
          </div>
          <button
            onClick={() => setChartExpanded(!chartExpanded)}
            className="w-8 h-8 flex items-center justify-center rounded-lg transition-all active:opacity-70"
            style={{ backgroundColor: colors.cardBg }}
          >
            {chartExpanded ? (
              <ChevronUp className="w-4 h-4" style={{ color: colors.textSecondary }} />
            ) : (
              <BarChart2 className="w-4 h-4" style={{ color: colors.textSecondary }} />
            )}
          </button>
        </div>
      </div>

      {/* 图表区域 */}
      {chartExpanded && (
        <div className="mb-3">
          {/* 扁平化选项卡 */}
          <div className="px-4 py-2">
            <div 
              className="inline-flex items-center gap-0.5 p-0.5 rounded-full overflow-x-auto"
              style={{ 
                backgroundColor: colors.cardBg,
              }}
            >
              {[
                { id: '1m', key: 'trading.timeframe_1m' },
                { id: '5m', key: 'trading.timeframe_5m' },
                { id: '15m', key: 'trading.timeframe_15m' },
                { id: '30m', key: 'trading.timeframe_30m' },
                { id: '1h', key: 'trading.timeframe_1h' },
                { id: '4h', key: 'trading.timeframe_4h' },
                { id: '1d', key: 'trading.timeframe_1d' },
                { id: '1w', key: 'trading.timeframe_1w' },
              ].map((tf) => (
                <button
                  key={tf.id}
                  onClick={() => setChartTimeframe(tf.id)}
                  className="px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all"
                  style={{
                    backgroundColor: chartTimeframe === tf.id ? `${colors.success}25` : 'transparent',
                    color: chartTimeframe === tf.id ? colors.success : colors.textSecondary,
                  }}
                >
                  {t(tf.key)}
                </button>
              ))}
            </div>
          </div>

          <div className="px-4 pb-3" style={{ height: '200px' }}>
            {chartLoading ? (
              <div className="w-full h-full flex flex-col items-center justify-center">
                <div className="relative w-12 h-12 mb-3">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="absolute inset-0 rounded-full animate-ping"
                      style={{
                        backgroundColor: colors.primary,
                        opacity: 0.3,
                        animationDelay: `${i * 0.15}s`,
                        animationDuration: '1.2s',
                      }}
                    />
                  ))}
                  <div
                    className="absolute inset-0 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: colors.primary }}
                  >
                    <BarChart2 className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="text-sm mb-1" style={{ color: colors.text }}>
                  {t('trading.loading_chart')}
                </div>
              </div>
            ) : chartData ? (
              <div className="w-full h-full relative">
                <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-xs" style={{ color: colors.textSecondary }}>
                  {chartData.priceLabels.map((label: string, idx: number) => (
                    <span key={idx}>{label}</span>
                  ))}
                </div>

                <div className="ml-12 h-full relative">
                  <svg width="100%" height="100%" viewBox="0 0 300 200" preserveAspectRatio="none">
                    {[0, 50, 100, 150, 200].map((y) => (
                      <line
                        key={y}
                        x1="0"
                        y1={y}
                        x2="300"
                        y2={y}
                        stroke={colors.border}
                        strokeWidth="0.5"
                        opacity="0.3"
                      />
                    ))}

                    {chartData.klines.map((kline, idx) => {
                      const x = (idx * 300) / chartData.klines.length + 5;
                      const width = 300 / chartData.klines.length - 6;
                      const color = kline.isGreen ? colors.success : colors.danger;

                      return (
                        <g key={idx}>
                          <line
                            x1={x + width / 2}
                            y1={kline.high}
                            x2={x + width / 2}
                            y2={kline.low}
                            stroke={color}
                            strokeWidth="1"
                          />
                          <rect
                            x={x}
                            y={Math.min(kline.open, kline.close)}
                            width={width}
                            height={Math.abs(kline.close - kline.open) || 1}
                            fill={color}
                          />
                        </g>
                      );
                    })}

                    <polyline
                      points="15,120 35,110 55,130 75,125 95,140 115,135 135,150 155,145 175,160 195,155 215,165 235,160 255,170 275,165 295,175"
                      fill="none"
                      stroke={colors.primary}
                      strokeWidth="2"
                      opacity="0.5"
                    />
                  </svg>

                  <div className="flex justify-between mt-2 text-xs" style={{ color: colors.textSecondary }}>
                    {chartData.timeLabels.map((label: string, idx: number) => (
                      <span key={idx}>{label}</span>
                    ))}
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      )}

      {/* 买涨/买跌按钮 */}
      <div className="px-4 mb-4">
        {/* 货量列表 */}
        <div 
          className="rounded-lg mb-3 overflow-hidden"
          style={{ backgroundColor: colors.cardBg }}
        >
          {/* 表头 */}
          <div className="flex items-center justify-between px-3 py-2 border-b" style={{ borderColor: colors.border }}>
            <span className="text-xs flex-1" style={{ color: colors.textSecondary }}>{t('option.buy_btc')}</span>
            <div className="flex items-center gap-1">
              <span className="text-xs" style={{ color: colors.textSecondary }}>100</span>
              <ChevronDown className="w-3 h-3" style={{ color: colors.textSecondary }} />
            </div>
            <span className="text-xs flex-1 text-right" style={{ color: colors.textSecondary }}>{t('option.sell_btc')}</span>
          </div>
          
          {/* 货量数据 */}
          <div>
            {[
              { buyVol: '0.08766', buyPrice: '84,700', sellPrice: '84,800', sellVol: '49.59280' },
              { buyVol: '33.02482', buyPrice: '84,600', sellPrice: '84,900', sellVol: '46.19004' },
              { buyVol: '42.61727', buyPrice: '84,500', sellPrice: '85,000', sellVol: '9.56581' },
              { buyVol: '6.58925', buyPrice: '84,400', sellPrice: '85,100', sellVol: '4.19159' },
              { buyVol: '24.23163', buyPrice: '84,300', sellPrice: '85,200', sellVol: '7.24171' },
              { buyVol: '3.68066', buyPrice: '84,200', sellPrice: '85,300', sellVol: '3.48063' },
              { buyVol: '3.67348', buyPrice: '84,100', sellPrice: '85,400', sellVol: '2.06195' },
              { buyVol: '2.55559', buyPrice: '84,000', sellPrice: '85,500', sellVol: '6.83860' },
            ].map((item, idx) => (
              <div 
                key={idx} 
                className="flex items-center px-3 py-1.5 text-xs"
              >
                {/* 左侧：买单数量 */}
                <div className="flex-1" style={{ color: colors.text }}>
                  {item.buyVol}
                </div>
                
                {/* 中间：买单价格 + 卖单价格 */}
                <div className="flex items-center gap-3 px-2">
                  <span className="font-medium" style={{ color: colors.success }}>
                    {item.buyPrice}
                  </span>
                  <span className="font-medium" style={{ color: colors.danger }}>
                    {item.sellPrice}
                  </span>
                </div>
                
                {/* 右侧数 */}
                <div className="flex-1 text-right" style={{ color: colors.text }}>
                  {item.sellVol}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {/* 买涨按钮 */}
          <button
            onClick={() => handleOpenTradeModal('call')}
            className="relative py-3.5 rounded-xl transition-all active:scale-95 flex items-center justify-center gap-2 overflow-hidden group"
            style={{
              backgroundColor: colors.success,
              color: '#fff',
              boxShadow: `0 4px 12px ${colors.success}40`,
            }}
          >
            {/* 渐变光泽层 */}
            <div 
              className="absolute inset-0 opacity-20"
              style={{
                background: 'linear-gradient(180deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 50%, rgba(0,0,0,0.1) 100%)'
              }}
            />
            
            {/* 悬停动画层 */}
            <div 
              className="absolute inset-0 opacity-0 group-active:opacity-20 transition-opacity"
              style={{
                background: 'radial-gradient(circle at center, rgba(255,255,255,0.3) 0%, transparent 70%)'
              }}
            />
            
            {/* 内容 */}
            <TrendingUp className="w-4 h-4 relative z-10" strokeWidth={2.5} />
            <span className="font-bold text-base relative z-10">{t('option.buy_up')}</span>
            
            {/* 右上角装饰 */}
            <div 
              className="absolute top-0 right-0 w-16 h-16 opacity-10"
              style={{
                background: 'radial-gradient(circle at top right, rgba(255,255,255,0.6) 0%, transparent 60%)'
              }}
            />
          </button>

          {/* 买跌按钮 */}
          <button
            onClick={() => handleOpenTradeModal('put')}
            className="relative py-3.5 rounded-xl transition-all active:scale-95 flex items-center justify-center gap-2 overflow-hidden group"
            style={{
              backgroundColor: colors.danger,
              color: '#fff',
              boxShadow: `0 4px 12px ${colors.danger}40`,
            }}
          >
            {/* 渐变光泽层 */}
            <div 
              className="absolute inset-0 opacity-20"
              style={{
                background: 'linear-gradient(180deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 50%, rgba(0,0,0,0.1) 100%)'
              }}
            />
            
            {/* 悬停动画层 */}
            <div 
              className="absolute inset-0 opacity-0 group-active:opacity-20 transition-opacity"
              style={{
                background: 'radial-gradient(circle at center, rgba(255,255,255,0.3) 0%, transparent 70%)'
              }}
            />
            
            {/* 内容 */}
            <TrendingUp className="w-4 h-4 rotate-180 relative z-10" strokeWidth={2.5} />
            <span className="font-bold text-base relative z-10">{t('option.buy_down')}</span>
            
            {/* 右上角装饰 */}
            <div 
              className="absolute top-0 right-0 w-16 h-16 opacity-10"
              style={{
                background: 'radial-gradient(circle at top right, rgba(255,255,255,0.6) 0%, transparent 60%)'
              }}
            />
          </button>
        </div>
      </div>

      {/* Tab区域 */}
      <div className="px-4 pb-2 pt-2 border-t" style={{ borderColor: colors.border }}>
        <div className="flex items-center gap-4">
          {[
              { id: 'positions', key: 'option.current_positions' },
              { id: 'history', key: 'option.history' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as 'positions' | 'history')}
              className="pb-2 text-xs relative transition-all"
              style={{
                color: activeTab === tab.id ? colors.primary : colors.textSecondary,
              }}
            >
              {t(tab.key)}
              {activeTab === tab.id && (
                <div
                  className="absolute bottom-0 left-0 right-0 h-0.5"
                  style={{ backgroundColor: colors.primary }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tab内容 */}
      <div className="px-4 pb-4">
        {activeTab === 'positions' && (
          <div className="space-y-2">
            {[
              {
                symbol: 'ETHUSDT',
                type: 'call',
                amount: '500.00',
                entryPrice: '2733.50',
                targetPrice: '2756.80',
                duration: t('option.duration_5min'),
                profit: '+475.00',
                timeLeft: '3分12秒',
              },
              {
                symbol: 'BTCUSDT',
                type: 'put',
                amount: '1000.00',
                entryPrice: '43280.00',
                targetPrice: '43250.00',
                duration: t('option.duration_1min'),
                profit: '+600.00',
                timeLeft: '28秒',
              },
            ].map((position, idx) => {
              const isCall = position.type === 'call';
              const isWinning = (isCall && parseFloat(position.targetPrice) > parseFloat(position.entryPrice)) ||
                               (!isCall && parseFloat(position.targetPrice) < parseFloat(position.entryPrice));
              
              return (
                <div 
                  key={idx}
                  className="rounded-lg p-3"
                  style={{ 
                    backgroundColor: colors.cardBg,
                    border: `1px solid ${colors.border}`,
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm" style={{ color: colors.text }}>{position.symbol}</span>
                      <span 
                        className="text-xs px-1.5 py-0.5 rounded font-medium"
                        style={{ 
                          backgroundColor: isCall ? `${colors.success}20` : `${colors.danger}20`,
                          color: isCall ? colors.success : colors.danger,
                        }}
                      >
                        {isCall ? t('option.buy_up') : t('option.buy_down')}
                      </span>
                      <span 
                        className="text-xs px-1.5 py-0.5 rounded"
                        style={{ 
                          backgroundColor: `${colors.primary}15`,
                          color: colors.primary,
                        }}
                      >
                        {position.timeLeft}
                      </span>
                    </div>
                    <span 
                      className="text-sm font-medium"
                      style={{ color: isWinning ? colors.success : colors.danger }}
                    >
                      {position.profit}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span style={{ color: colors.textSecondary }}>{t('option.investment')}: </span>
                      <span style={{ color: colors.text }}>{position.amount} USDT</span>
                    </div>
                    <div>
                      <span style={{ color: colors.textSecondary }}>{t('option.duration')}: </span>
                      <span style={{ color: colors.text }}>{position.duration}</span>
                    </div>
                    <div>
                      <span style={{ color: colors.textSecondary }}>{t('option.entry_price')}: </span>
                      <span style={{ color: colors.text }}>${position.entryPrice}</span>
                    </div>
                    <div>
                      <span style={{ color: colors.textSecondary }}>{t('trading.current_price_label')}: </span>
                      <span style={{ color: isWinning ? colors.success : colors.danger }}>
                        ${position.targetPrice}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {activeTab === 'history' && (
          <div className="space-y-2">
            {[
              {
                symbol: 'BTCUSDT',
                type: 'call',
                amount: '500.00',
                entryPrice: '43100.00',
                exitPrice: '43250.00',
                duration: t('option.duration_3min'),
                profit: '+210.00',
                result: 'win',
                time: '10:25:30',
              },
            ].map((record, idx) => {
              const isCall = record.type === 'call';
              const isWin = record.result === 'win';
              
              return (
                <div 
                  key={idx}
                  className="rounded-lg p-3"
                  style={{ 
                    backgroundColor: colors.cardBg,
                    border: `1px solid ${colors.border}`,
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm" style={{ color: colors.text }}>{record.symbol}</span>
                      <span 
                        className="text-xs px-1.5 py-0.5 rounded font-medium"
                        style={{ 
                          backgroundColor: isCall ? `${colors.success}20` : `${colors.danger}20`,
                          color: isCall ? colors.success : colors.danger,
                        }}
                      >
                        {isCall ? t('option.buy_up') : t('option.buy_down')}
                      </span>
                      <span 
                        className="text-xs px-1.5 py-0.5 rounded font-medium"
                        style={{ 
                          backgroundColor: isWin ? `${colors.success}20` : `${colors.danger}20`,
                          color: isWin ? colors.success : colors.danger,
                        }}
                      >
                        {isWin ? t('option.profit') : t('option.loss')}
                      </span>
                    </div>
                    <span 
                      className="text-sm font-medium"
                      style={{ color: isWin ? colors.success : colors.danger }}
                    >
                      {record.profit}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span style={{ color: colors.textSecondary }}>{t('option.investment')}: </span>
                      <span style={{ color: colors.text }}>{record.amount} USDT</span>
                    </div>
                    <div>
                      <span style={{ color: colors.textSecondary }}>{t('option.duration')}: </span>
                      <span style={{ color: colors.text }}>{record.duration}</span>
                    </div>
                    <div>
                      <span style={{ color: colors.textSecondary }}>{t('option.entry_price')}: </span>
                      <span style={{ color: colors.text }}>${record.entryPrice}</span>
                    </div>
                    <div>
                      <span style={{ color: colors.textSecondary }}>{t('option.exit_price')}: </span>
                      <span style={{ color: colors.text }}>${record.exitPrice}</span>
                    </div>
                    <div className="col-span-2">
                      <span style={{ color: colors.textSecondary }}>{t('option.time')}: </span>
                      <span style={{ color: colors.text }}>{record.time}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 交易弹窗 */}
      {showTradeModal && (
        <>
          <div 
            className="fixed inset-0 bg-black/60 z-40"
            onClick={() => setShowTradeModal(false)}
          />
          <div 
            className="fixed inset-x-0 bottom-0 z-50 rounded-t-3xl overflow-hidden max-h-[85vh] flex flex-col animate-slide-up"
            style={{ 
              backgroundColor: colors.bg,
              boxShadow: '0 -10px 40px rgba(0, 0, 0, 0.3)',
            }}
          >
            {/* 顶部拖动条 */}
            <div className="flex justify-center py-2">
              <div 
                className="w-10 h-1 rounded-full"
                style={{ backgroundColor: colors.border }}
              />
            </div>
            
            {/* 可滚动内容区域 */}
            <div className="flex-1 overflow-y-auto px-4 pb-4"
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
              }}
            >
              {/* 顶部标题 */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{ 
                      backgroundColor: tradeType === 'call' ? colors.danger : colors.danger,
                      boxShadow: `0 4px 12px ${tradeType === 'call' ? colors.danger : colors.danger}40`,
                    }}
                  >
                    <span className="text-white font-bold text-sm">
                      {selectedPair.symbol.substring(0, 1)}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-sm" style={{ color: colors.text }}>
                        {selectedPair.symbol}
                      </span>
                      <span 
                        className="text-xs px-1.5 py-0.5 rounded font-medium"
                        style={{ 
                          backgroundColor: tradeType === 'call' ? colors.danger : colors.danger,
                          color: '#fff',
                        }}
                      >
                        BTC
                      </span>
                    </div>
                    <div className="text-xs" style={{ color: colors.textSecondary }}>
                      {t('option.long_trade')}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setShowTradeModal(false)}
                  className="w-6 h-6 flex items-center justify-center rounded-lg transition-all active:opacity-70"
                  style={{ backgroundColor: `${colors.textSecondary}10` }}
                >
                  <X className="w-3.5 h-3.5" style={{ color: colors.textSecondary }} />
                </button>
              </div>

              {/* 到期时间 */}
              <div className="mb-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" style={{ color: colors.text }} />
                    <span className="text-xs" style={{ color: colors.text }}>{t('option.expiry_time')}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5" style={{ color: colors.danger }} />
                    <span className="text-xs" style={{ color: colors.danger }}>
                      {t('option.max_profit')}
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {durationOptions.map((option) => {
                    const isSelected = duration === option.id;
                    return (
                      <button
                        key={option.id}
                        onClick={() => setDuration(option.id)}
                        className="p-2 rounded-xl transition-all active:scale-95"
                        style={{
                          backgroundColor: isSelected 
                            ? (tradeType === 'call' ? colors.danger : colors.danger)
                            : colors.cardBg,
                          boxShadow: isSelected 
                            ? `0 4px 12px ${tradeType === 'call' ? colors.danger : colors.danger}30`
                            : '0 2px 8px rgba(0, 0, 0, 0.05)',
                          border: isSelected ? 'none' : `1px solid ${colors.border}`,
                        }}
                      >
                        <div className="text-xs font-medium" style={{ 
                          color: isSelected ? '#fff' : colors.text 
                        }}>
                          {option.label}
                        </div>
                        <div className="text-xs font-bold" style={{ 
                          color: isSelected ? '#fff' : colors.textSecondary 
                        }}>
                          {option.profit}%
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 投资金额 */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2.5">
                  <div className="flex items-center gap-1.5">
                    <Wallet className="w-3.5 h-3.5" style={{ color: colors.text }} />
                    <span className="text-xs" style={{ color: colors.text }}>{t('option.investment_amount')}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Zap className="w-3 h-3" style={{ color: colors.textSecondary }} />
                    <span className="text-xs" style={{ color: colors.textSecondary }}>
                      {t('option.quick_select')}
                    </span>
                  </div>
                </div>
                
                {/* 快捷金额 - 简洁设计（不显示预期收益） */}
                <div className="grid grid-cols-4 gap-2 mb-3">
                  {[100, 500, 1000, 5000].map((quickAmount) => {
                    const isSelected = amount === quickAmount.toString();
                    
                    return (
                      <button
                        key={quickAmount}
                        onClick={() => setAmount(quickAmount.toString())}
                        className="relative py-2 px-2 rounded-lg transition-all active:scale-95 overflow-hidden"
                        style={{
                          backgroundColor: isSelected 
                            ? `${tradeType === 'call' ? colors.danger : colors.danger}15`
                            : colors.cardBg,
                          border: isSelected 
                            ? `1.5px solid ${tradeType === 'call' ? colors.danger : colors.danger}`
                            : `1px solid ${colors.border}`,
                          boxShadow: isSelected 
                            ? `0 0 12px ${tradeType === 'call' ? colors.danger : colors.danger}30`
                            : 'none',
                        }}
                      >
                        {/* 背景渐变效果 */}
                        {isSelected && (
                          <div 
                            className="absolute inset-0 opacity-10"
                            style={{
                              background: `linear-gradient(135deg, ${tradeType === 'call' ? colors.danger : colors.danger} 0%, transparent 100%)`
                            }}
                          />
                        )}
                        
                        {/* 金额 */}
                        <div 
                          className="relative text-sm font-bold"
                          style={{ 
                            color: isSelected 
                              ? (tradeType === 'call' ? colors.danger : colors.danger)
                              : colors.text 
                          }}
                        >
                          {quickAmount}
                        </div>
                        
                        {/* 角标装饰 */}
                        {isSelected && (
                          <div 
                            className="absolute top-0.5 right-0.5 w-1.5 h-1.5 rounded-full"
                            style={{ backgroundColor: tradeType === 'call' ? colors.danger : colors.danger }}
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
                
                {/* 输入框 */}
                <div 
                  className="flex items-center rounded-xl overflow-hidden px-4 py-3 mb-2"
                  style={{
                    backgroundColor: colors.cardBg,
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
                    border: `1px solid ${colors.border}`,
                  }}
                >
                  <input
                    type="text"
                    value={amount}
                    onChange={(e) => handleAmountChange(e.target.value)}
                    placeholder={t('option.input_custom_amount')}
                    className="flex-1 bg-transparent outline-none text-base font-medium"
                    style={{ color: colors.text }}
                  />
                  <span className="text-xs font-bold ml-2 px-2.5 py-1 rounded-lg" style={{ 
                    color: colors.textSecondary,
                    backgroundColor: `${colors.textSecondary}10`,
                  }}>
                    USDT
                  </span>
                </div>
                
                {/* 最低金额提示和余额 */}
                <div className="flex items-center justify-between text-xs px-1">
                  <span style={{ color: colors.textSecondary }}>
                    {t('option.min_amount')}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span style={{ color: colors.text }}>
                      {t('option.balance')}: {balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </span>
                    <button
                      onClick={() => navigate('/assets/transfer')}
                      className="w-4 h-4 flex items-center justify-center rounded transition-all active:opacity-70"
                      style={{ 
                        backgroundColor: `${colors.primary}20`,
                        color: colors.primary,
                      }}
                    >
                      <Plus size={12} strokeWidth={3} />
                    </button>
                  </div>
                </div>
              </div>

              {/* 收益信息 */}
              <div className="mb-4 space-y-2.5 text-sm px-1">
                <div className="flex items-center justify-between">
                  <span style={{ color: colors.textSecondary }}>{t('option.expected_pnl')}</span>
                  <span style={{ color: colors.text }}>
                    {amount || '0.00'} USDT
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span style={{ color: colors.textSecondary }}>{t('option.expected_profit')}</span>
                  <span style={{ color: colors.danger }}>
                    {calculateProfit()} USDT
                  </span>
                </div>
                
                <div 
                  className="flex items-center justify-between pt-2 border-t"
                  style={{ borderColor: colors.border }}
                >
                  <div className="flex items-center gap-1.5">
                    <RotateCw className="w-4 h-4" style={{ color: colors.text }} />
                    <span className="font-medium" style={{ color: colors.text }}>{t('option.total_return')}</span>
                  </div>
                  <div className="flex items-baseline">
                    <span className="text-xl font-black tracking-wide" style={{ 
                      color: tradeType === 'call' ? colors.danger : colors.danger,
                    }}>
                      {calculateTotal()} USDT
                    </span>
                  </div>
                </div>
              </div>

              {/* 底部按钮 */}
              <div className="flex gap-2.5">
                <button
                  onClick={() => setShowTradeModal(false)}
                  className="flex-1 py-2.5 rounded-xl text-sm font-medium transition-all active:scale-95"
                  style={{
                    backgroundColor: colors.cardBg,
                    color: colors.textSecondary,
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
                    border: `1px solid ${colors.border}`,
                  }}
                >
                  {t('option.cancel')}
                </button>
                <button
                  disabled={!amount || parseFloat(amount) < 10 || !validateAmount(amount)}
                  onClick={handleConfirmTrade}
                  className="flex-[2] py-2.5 rounded-xl text-sm font-bold transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    backgroundColor: tradeType === 'call' ? colors.danger : colors.danger,
                    color: '#fff',
                    boxShadow: `0 4px 16px ${tradeType === 'call' ? colors.danger : colors.danger}40`,
                  }}
                >
                  {t('option.confirm_buy_up')}
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* 币对选择弹窗 */}
      {showPairMenu && (
        <PairSelectorModal
          isOpen={showPairMenu}
          isDark={isDark}
          selectedPair={tradingPairs.find(p => p.symbol === selectedPair.symbol) || tradingPairs[0]}
          tradingPairs={tradingPairs}
          favorites={favorites}
          onClose={() => setShowPairMenu(false)}
          onSelectPair={(pair) => {
            setSelectedPair({
              symbol: pair.symbol,
              name: pair.name,
              fullName: pair.fullName,
              currentPrice: pair.currentPrice,
              change24h: pair.change24h,
            });
            setShowPairMenu(false);
          }}
          onToggleFavorite={toggleFavorite}
        />
      )}
    </div>
  );
}