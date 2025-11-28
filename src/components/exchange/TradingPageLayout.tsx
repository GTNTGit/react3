import React, { useState, useEffect } from 'react';
import { ChevronDown, BarChart2, ChevronUp, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../contexts/ThemeContext';
import { PairSelectorModal } from './PairSelectorModal';
import { tradingPairs } from '../../data/tradingPairs';
import { ChartData, SelectedPair } from '../../types/trade';

interface TradingPageLayoutProps {
  mode: 'spot' | 'contract'; // 现货或合约模式
}

export function TradingPageLayout({ mode }: TradingPageLayoutProps) {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  // 判断是否为深色模式
  const isDark = colors.bg === '#0A0E17' || colors.bg.startsWith('#0') || colors.bg.startsWith('#1');
  
  // 交易类型：现货是 buy/sell，合约是 long/short
  const [orderType, setOrderType] = useState<'buy' | 'sell' | 'long' | 'short'>(mode === 'spot' ? 'buy' : 'long');
  const [leverage, setLeverage] = useState(10); // 仅合约模式使用
  const [amount, setAmount] = useState('');
  const [price, setPrice] = useState('43250.00');
  const [amountType, setAmountType] = useState<'BTC' | 'USDT'>('USDT');
  const [sliderValue, setSliderValue] = useState(0);
  const [activeTab, setActiveTab] = useState<'positions' | 'pending' | 'history'>('positions');
  const [orderMode, setOrderMode] = useState<'market' | 'limit'>('limit');
  const [showOrderModeMenu, setShowOrderModeMenu] = useState(false);
  const [showPairMenu, setShowPairMenu] = useState(false);
  const [showLeverageMenu, setShowLeverageMenu] = useState(false); // 仅合约模式使用
  const [favorites, setFavorites] = useState<string[]>(['ETHUSDT', 'BTCUSDT']);
  const [selectedPair, setSelectedPair] = useState<SelectedPair>({
    symbol: 'BTCUSDT',
    name: 'BTC/USDT',
    fullName: 'Bitcoin',
    currentPrice: 43250.00,
    change24h: 2.87,
  });
  const [chartExpanded, setChartExpanded] = useState(false);
  const [chartTimeframe, setChartTimeframe] = useState('15m');
  const [chartLoading, setChartLoading] = useState(false);
  const [chartData, setChartData] = useState<ChartData | null>(null);
  
  // 余额管理
  const [balance, setBalance] = useState(100000); // 默认 100000 USDT

  const leverageOptions = [5, 10, 20, 30, 50, 100];

  // 计算交易量或交易额
  const calculateTradeValue = () => {
    const numAmount = parseFloat(amount);
    const numPrice = parseFloat(price);
    
    if (isNaN(numAmount) || isNaN(numPrice) || numAmount <= 0 || numPrice <= 0) {
      return '0.00';
    }
    
    if (amountType === 'USDT') {
      const btcAmount = numAmount / numPrice;
      return btcAmount.toFixed(8);
    } else {
      const usdtAmount = numAmount * numPrice;
      return usdtAmount.toFixed(2);
    }
  };
  
  // 验证输入
  const validateAmount = (value: string) => {
    if (!value || value === '') return true;
    
    const numValue = parseFloat(value);
    if (isNaN(numValue) || numValue < 0) return false;
    
    if (amountType === 'USDT') {
      return numValue <= balance;
    } else {
      const requiredUsdt = numValue * parseFloat(price);
      return requiredUsdt <= balance;
    }
  };
  
  // 处理数量输入 - 自动限制为最大可用
  const handleAmountChange = (value: string) => {
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      // 先设置输入值
      const numValue = parseFloat(value);
      
      // 如果输入有效，检查是否超出最大值
      if (!isNaN(numValue) && numValue > 0) {
        const numPrice = parseFloat(price);
        
        if (!isNaN(numPrice) && numPrice > 0) {
          if (amountType === 'USDT') {
            // USDT模式：直接比较余额
            if (numValue > balance) {
              setAmount(balance.toFixed(2));
              return;
            }
          } else {
            // BTC模式：计算需要的USDT
            const requiredUsdt = numValue * numPrice;
            if (requiredUsdt > balance) {
              const maxBTC = balance / numPrice;
              setAmount(maxBTC.toFixed(8));
              return;
            }
          }
        }
      }
      
      setAmount(value);
    }
  };
  
  // 切换货币单位并自动换算数量
  const handleAmountTypeToggle = () => {
    const newAmountType = amountType === 'BTC' ? 'USDT' : 'BTC';
    
    if (amount && amount !== '') {
      const numAmount = parseFloat(amount);
      const numPrice = parseFloat(price);
      
      if (!isNaN(numAmount) && !isNaN(numPrice) && numPrice > 0) {
        if (newAmountType === 'USDT') {
          const newValue = numAmount * numPrice;
          setAmount(newValue.toFixed(2));
        } else {
          const newValue = numAmount / numPrice;
          setAmount(newValue.toFixed(8));
        }
      }
    }
    
    setAmountType(newAmountType);
  };

  const toggleFavorite = (symbol: string) => {
    setFavorites(prev => 
      prev.includes(symbol) 
        ? prev.filter(s => s !== symbol)
        : [...prev, symbol]
    );
  };

  // 滑动条吸附到刻度
  const handleSliderChange = (value: number) => {
    const snapPoints = [0, 25, 50, 75, 100];
    const threshold = 3;
    
    const nearestSnap = snapPoints.find(point => Math.abs(value - point) <= threshold);
    const finalValue = nearestSnap !== undefined ? nearestSnap : value;
    setSliderValue(finalValue);
    
    if (finalValue === 0) {
      setAmount('');
    } else {
      if (amountType === 'USDT') {
        const calculatedAmount = (balance * finalValue) / 100;
        setAmount(calculatedAmount.toFixed(2));
      } else {
        const numPrice = parseFloat(price);
        if (!isNaN(numPrice) && numPrice > 0) {
          const maxBTC = balance / numPrice;
          const calculatedAmount = (maxBTC * finalValue) / 100;
          setAmount(calculatedAmount.toFixed(8));
        }
      }
    }
  };

  // 监听图表展开状态
  useEffect(() => {
    if (chartExpanded) {
      loadChartData();
    }
  }, [chartExpanded, chartTimeframe, selectedPair.symbol]);

  // 模拟加载图表数据
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

  // 获取交易操作标签
  const getOrderTypeLabels = () => {
    if (mode === 'spot') {
      return {
        buy: t('trading.buy'),
        sell: t('trading.sell'),
        buyLabel: t('trading.buy'),
        sellLabel: t('trading.sell'),
        badge: t('trading.spot'),
      };
    } else {
      return {
        buy: t('trading.long'),
        sell: t('trading.short'),
        buyLabel: t('trading.open_long'),
        sellLabel: t('trading.open_short'),
        badge: t('trading.contract'),
      };
    }
  };

  const labels = getOrderTypeLabels();
  const isBuyType = orderType === 'buy' || orderType === 'long';

  return (
    <div className="min-h-screen pb-20" style={{ backgroundColor: colors.bg }}>
      {/* 1. 顶部币种信息 */}
      <div className="flex items-center justify-between px-4 py-3">
        <button 
          className="flex items-center gap-2 transition-all active:opacity-70"
          onClick={() => setShowPairMenu(true)}
        >
          <span style={{ color: colors.text }}>{selectedPair.name}</span>
          <span 
            className="text-xs px-1.5 py-0.5 rounded font-medium"
            style={{ 
              backgroundColor: `${colors.primary}20`,
              color: colors.primary 
            }}
          >
            {labels.badge}
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

      {/* 2. 图表区域 - 可展开/收起 */}
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

          {/* K线图区域 */}
          <div className="px-4 pb-3" style={{ height: '240px' }}>
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
                <div className="text-xs" style={{ color: colors.textSecondary }}>
                  {selectedPair.name} · {chartTimeframe}
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

      {/* 3. 左右分栏布局 */}
      <div className="px-4 pb-3">
        <div className="grid grid-cols-2 gap-3">
          {/* 左侧：操作表单 */}
          <div className="space-y-3">
            {/* 买入/卖出 或 做多/做空 切换 */}
            <div className="relative flex items-center" style={{ 
              border: `1px solid ${colors.border}`,
              borderRadius: '8px',
              overflow: 'visible',
              height: '36px',
              backgroundColor: colors.cardBg,
            }}>
              <div
                className="absolute top-0 bottom-0 transition-all duration-300 ease-out"
                style={{
                  left: isBuyType ? '0' : '50%',
                  width: '50%',
                  backgroundColor: isBuyType ? colors.success : colors.danger,
                  clipPath: isBuyType 
                    ? 'polygon(0 0, calc(100% - 14px) 0, 100% 50%, calc(100% - 14px) 100%, 0 100%, 0 0)'
                    : 'polygon(14px 0, 100% 0, 100% 100%, 14px 100%, 0 50%)',
                  borderRadius: isBuyType ? '7px 0 0 7px' : '0 7px 7px 0',
                  zIndex: 1,
                }}
              />
              
              <button
                onClick={() => setOrderType(mode === 'spot' ? 'buy' : 'long')}
                className="flex-1 py-2.5 text-xs transition-all duration-300 active:opacity-80 relative z-10"
                style={{
                  color: isBuyType ? '#fff' : colors.text,
                }}
              >
                {labels.buy}
              </button>

              <button
                onClick={() => setOrderType(mode === 'spot' ? 'sell' : 'short')}
                className="flex-1 py-2.5 text-xs transition-all duration-300 active:opacity-80 relative z-10"
                style={{
                  color: !isBuyType ? '#fff' : colors.text,
                }}
              >
                {labels.sell}
              </button>
            </div>

            {/* 合约模式：杠杆和交易类型并排 */}
            {mode === 'contract' ? (
              <div className="grid grid-cols-2 gap-2">
                {/* 杠杆选择 */}
                <div className="relative">
                  <button
                    className="w-full flex items-center justify-between px-3 py-2 rounded-lg transition-all active:opacity-70"
                    style={{
                      backgroundColor: colors.cardBg,
                      border: `1.5px solid ${colors.border}`,
                    }}
                    onClick={() => setShowLeverageMenu(!showLeverageMenu)}
                  >
                    <span className="text-xs" style={{ color: colors.text }}>{leverage}X</span>
                    <ChevronDown className="w-3 h-3" style={{ color: colors.textSecondary }} />
                  </button>
                </div>

                {/* 交易类型选择 */}
                <div className="relative">
                  <button
                    className="w-full flex items-center justify-between px-3 py-2 rounded-lg transition-all active:opacity-70"
                    style={{
                      backgroundColor: colors.cardBg,
                      border: `1.5px solid ${colors.border}`,
                    }}
                    onClick={() => setShowOrderModeMenu(!showOrderModeMenu)}
                  >
                    <span className="text-xs" style={{ color: colors.text }}>{orderMode === 'market' ? t('trading.market_price') : t('trading.limit_price')}</span>
                    <ChevronDown className="w-3 h-3" style={{ color: colors.textSecondary }} />
                  </button>
                  
                  {showOrderModeMenu && (
                    <>
                      <div 
                        className="fixed inset-0 z-40" 
                        onClick={() => setShowOrderModeMenu(false)}
                      />
                      <div 
                        className="absolute top-full left-0 right-0 mt-1 rounded-lg overflow-hidden z-50 shadow-lg"
                        style={{ 
                          backgroundColor: colors.cardBg,
                          border: `1px solid ${colors.border}`,
                        }}
                      >
                        {[
                          { id: 'limit', label: t('trading.limit_price') },
                          { id: 'market', label: t('trading.market_price') },
                        ].map((mode) => (
                          <button
                            key={mode.id}
                            onClick={() => {
                              setOrderMode(mode.id as 'limit' | 'market');
                              setShowOrderModeMenu(false);
                            }}
                            className="w-full px-3 py-2 text-xs text-left transition-all active:opacity-70"
                            style={{
                              backgroundColor: orderMode === mode.id ? `${colors.primary}15` : 'transparent',
                              color: orderMode === mode.id ? colors.primary : colors.text,
                            }}
                          >
                            {mode.label}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            ) : (
              /* 现货模式：只显示交易类型 */
              <div className="relative">
                <button
                  className="w-full flex items-center justify-between px-3 py-2 rounded-lg transition-all active:opacity-70"
                  style={{
                    backgroundColor: colors.cardBg,
                    border: `1.5px solid ${colors.border}`,
                  }}
                  onClick={() => setShowOrderModeMenu(!showOrderModeMenu)}
                >
                  <span className="text-xs" style={{ color: colors.text }}>{orderMode === 'market' ? t('trading.market_price') : t('trading.limit_price')}</span>
                  <ChevronDown className="w-3 h-3" style={{ color: colors.textSecondary }} />
                </button>
                
                {showOrderModeMenu && (
                  <>
                    <div 
                      className="fixed inset-0 z-40" 
                      onClick={() => setShowOrderModeMenu(false)}
                    />
                    <div 
                      className="absolute top-full left-0 right-0 mt-1 rounded-lg overflow-hidden z-50 shadow-lg"
                      style={{ 
                        backgroundColor: colors.cardBg,
                        border: `1px solid ${colors.border}`,
                      }}
                    >
                      {[
                        { id: 'limit', label: t('trading.limit_price') },
                        { id: 'market', label: t('trading.market_price') },
                      ].map((mode) => (
                        <button
                          key={mode.id}
                          onClick={() => {
                            setOrderMode(mode.id as 'limit' | 'market');
                            setShowOrderModeMenu(false);
                          }}
                          className="w-full px-3 py-2 text-xs text-left transition-all active:opacity-70"
                          style={{
                            backgroundColor: orderMode === mode.id ? `${colors.primary}15` : 'transparent',
                            color: orderMode === mode.id ? colors.primary : colors.text,
                          }}
                        >
                          {mode.label}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}

            {/* 投入价格 */}
            <div className="space-y-1.5">
              <div className="text-xs" style={{ color: colors.textSecondary }}>{t('trading.input_price')}</div>
              <div 
                className="flex items-center justify-between gap-2 px-3 py-2 rounded-lg"
                style={{
                  backgroundColor: orderMode === 'market' ? colors.border : colors.cardBg,
                  border: `1.5px solid ${colors.border}`,
                  opacity: orderMode === 'market' ? 0.6 : 1,
                }}
              >
                <input
                  type="text"
                  value={orderMode === 'market' ? t('trading.market_price') : price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder={t('trading.current_price')}
                  disabled={orderMode === 'market'}
                  className="flex-1 bg-transparent outline-none text-xs min-w-0"
                  style={{ 
                    color: colors.text,
                    cursor: orderMode === 'market' ? 'not-allowed' : 'text',
                  }}
                />
                <span className="text-xs flex-shrink-0" style={{ color: colors.textSecondary }}>USDT</span>
              </div>
            </div>

            {/* 数量输入 */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <div className="text-xs" style={{ color: colors.textSecondary }}>
                  {mode === 'spot' ? t('trading.buy_amount') : t('trading.open_amount')}
                </div>
                <button
                  onClick={() => handleSliderChange(100)}
                  className="text-xs transition-all active:opacity-70"
                  style={{ color: colors.primary }}
                >
                  {t('trading.max')}
                </button>
              </div>
              
              <div 
                className="flex items-center rounded-lg overflow-hidden"
                style={{
                  backgroundColor: colors.cardBg,
                  border: `1.5px solid ${colors.border}`,
                }}
              >
                <div className="flex-1 px-3 py-2">
                  <input
                    type="text"
                    value={amount}
                    onChange={(e) => handleAmountChange(e.target.value)}
                    placeholder={t('trading.input_amount')}
                    className="w-full bg-transparent outline-none text-xs"
                    style={{ color: colors.text }}
                  />
                </div>
                
                <div style={{ width: '1px', height: '24px', backgroundColor: colors.border }} />
                
                <button 
                  onClick={handleAmountTypeToggle}
                  className="px-4 py-2 text-xs font-medium transition-all active:opacity-70 flex items-center gap-1"
                  style={{ 
                    backgroundColor: `${colors.primary}15`,
                    color: colors.primary,
                  }}
                >
                  <span>{amountType}</span>
                  <ChevronDown className="w-3 h-3" />
                </button>
              </div>

              {/* 滑动条 */}
              <div className="pt-1">
                <div className="relative w-full mb-1.5">
                  <div className="flex justify-between px-0.5">
                    {[0, 25, 50, 75, 100].map((val) => (
                      <div
                        key={val}
                        className="flex flex-col items-center"
                        style={{ width: '2px' }}
                      >
                        <div
                          style={{
                            width: '3px',
                            height: '6px',
                            backgroundColor: colors.border,
                            borderRadius: '1px',
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
                
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sliderValue}
                  onChange={(e) => handleSliderChange(Number(e.target.value))}
                  className="w-full"
                  style={{
                    height: '4px',
                    borderRadius: '2px',
                    background: `linear-gradient(to right, ${colors.primary} 0%, ${colors.primary} ${sliderValue}%, ${colors.border} ${sliderValue}%, ${colors.border} 100%)`,
                    outline: 'none',
                    appearance: 'none',
                    WebkitAppearance: 'none',
                  }}
                />
                <div className="flex justify-between mt-1">
                  {[0, 25, 50, 75, 100].map((val) => (
                    <button
                      key={val}
                      onClick={() => handleSliderChange(val)}
                      className="text-xs active:opacity-70 transition-opacity"
                      style={{ color: sliderValue === val ? colors.primary : colors.textSecondary }}
                    >
                      {val}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 交易信息 */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs" style={{ color: colors.textSecondary }}>{t('trading.available')}</span>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs" style={{ color: colors.text }}>{balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USDT</span>
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
              <div className="flex items-center justify-between">
                <span className="text-xs" style={{ color: colors.textSecondary }}>
                  {amountType === 'USDT' ? t('trading.trade_volume') : t('trading.trade_value')}
                </span>
                <span className="text-xs" style={{ color: colors.text }}>
                  {calculateTradeValue()} {amountType === 'USDT' ? 'BTC' : 'USDT'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs" style={{ color: colors.textSecondary }}>{t('trading.fee')}</span>
                <span className="text-xs" style={{ color: colors.text }}>0.00</span>
              </div>
            </div>

            {/* 确认按钮 */}
            <button
              className="w-full py-2.5 rounded-lg text-white text-sm transition-all active:opacity-80"
              style={{
                backgroundColor: isBuyType ? colors.success : colors.danger,
              }}
              disabled={!validateAmount(amount)}
            >
              {t('trading.confirm')}{isBuyType ? labels.buyLabel : labels.sellLabel}
            </button>
          </div>

          {/* 右侧：最新报价 */}
          <div className="flex flex-col">
            <div className="text-xs mb-2" style={{ color: colors.textSecondary }}>{t('trading.latest_quotes')}</div>
            
            <div className="flex-1 flex flex-col">
              {/* 卖单（红色） */}
              <div className="space-y-0.5 mb-1">
                {(() => {
                  const sellOrders = [
                    { price: '43254.4541', amount: '0.6508' },
                    { price: '43253.3034', amount: '0.8848' },
                    { price: '43252.2785', amount: '0.0047' },
                    { price: '43251.1234', amount: '0.2156' },
                    { price: '43250.9876', amount: '0.7421' },
                    { price: '43250.8765', amount: '0.1234' },
                  ];
                  const maxAmount = Math.max(...sellOrders.map(o => parseFloat(o.amount)));
                  
                  return sellOrders.map((order, idx) => {
                    const percentage = (parseFloat(order.amount) / maxAmount) * 100;
                    return (
                      <div key={idx} className="relative flex justify-between items-center">
                        <div 
                          className="absolute right-0 top-0 bottom-0 transition-all duration-300"
                          style={{ 
                            width: `${percentage}%`,
                            backgroundColor: colors.danger,
                            opacity: 0.08,
                          }}
                        />
                        <span className="text-xs relative z-10" style={{ color: colors.danger }}>{order.price}</span>
                        <span className="text-xs relative z-10" style={{ color: colors.textSecondary }}>{order.amount}</span>
                      </div>
                    );
                  });
                })()}
              </div>

              {/* 当前价格 */}
              <div className="py-1.5 text-center my-0.5">
                <span className="text-xs font-medium" style={{ color: colors.success }}>43250.6672</span>
              </div>

              {/* 买单（绿色） */}
              <div className="space-y-0.5 mt-1">
                {(() => {
                  const buyOrders = [
                    { price: '43249.6091', amount: '0.2659' },
                    { price: '43248.5421', amount: '0.8543' },
                    { price: '43247.4567', amount: '0.4321' },
                    { price: '43246.3891', amount: '0.7654' },
                    { price: '43245.3015', amount: '0.1820' },
                    { price: '43244.2443', amount: '0.9700' },
                    { price: '43243.1543', amount: '0.8765' },
                  ];
                  const maxAmount = Math.max(...buyOrders.map(o => parseFloat(o.amount)));
                  
                  return buyOrders.map((order, idx) => {
                    const percentage = (parseFloat(order.amount) / maxAmount) * 100;
                    return (
                      <div key={idx} className="relative flex justify-between items-center">
                        <div 
                          className="absolute right-0 top-0 bottom-0 transition-all duration-300"
                          style={{ 
                            width: `${percentage}%`,
                            backgroundColor: colors.success,
                            opacity: 0.08,
                          }}
                        />
                        <span className="text-xs relative z-10" style={{ color: colors.success }}>{order.price}</span>
                        <span className="text-xs relative z-10" style={{ color: colors.textSecondary }}>{order.amount}</span>
                      </div>
                    );
                  });
                })()}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. 底部Tab切换 */}
      <div className="px-4 pb-2 pt-2">
        <div className="flex items-center gap-4 border-b" style={{ borderColor: colors.border }}>
          {(mode === 'spot' ? [
            { id: 'positions', label: t('trading.positions') },
            { id: 'pending', label: t('trading.pending') },
            { id: 'history', label: t('trading.history') },
          ] : [
            { id: 'positions', label: t('trading.current_positions') },
            { id: 'pending', label: t('trading.pending_orders') },
            { id: 'history', label: t('trading.history') },
          ]).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as 'positions' | 'pending' | 'history')}
              className="pb-2 text-xs relative transition-all"
              style={{
                color: activeTab === tab.id ? colors.primary : colors.textSecondary,
              }}
            >
              {tab.label}
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

      {/* 5. Tab内容区域 - 简化版示例 */}
      <div className="px-4 pb-4">
        {/* 持仓记录/当前仓位 */}
        {activeTab === 'positions' && (
          <div className="space-y-2">
            {mode === 'contract' ? (
              /* 合约模式：当前仓位 */
              <>
                {[
                  {
                    symbol: 'ETHUSDT',
                    direction: 'long',
                    amount: '2.5',
                    entryPrice: '2733.67',
                    currentPrice: '2756.80',
                    margin: '540.00',
                    leverage: 10,
                    pnl: '+58.33',
                    pnlPercent: '+10.80%',
                    totalValue: '6891.00',
                  },
                  {
                    symbol: 'BTCUSDT',
                    direction: 'short',
                    amount: '0.12',
                    entryPrice: '43210.00',
                    currentPrice: '43250.00',
                    margin: '520.00',
                    leverage: 10,
                    pnl: '-4.80',
                    pnlPercent: '-0.92%',
                    totalValue: '5190.00',
                  },
                ].map((position, idx) => {
                  const isProfit = position.pnl.startsWith('+');
                  return (
                    <div 
                      key={idx}
                      className="rounded-lg p-3"
                      style={{ 
                        backgroundColor: colors.cardBg,
                        border: `1px solid ${colors.border}`,
                      }}
                    >
                      {/* 头部：币种 + 盈亏 */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="font-medium" style={{ color: colors.text }}>
                            {position.symbol}
                          </span>
                          <span 
                            className="text-xs px-2 py-0.5 rounded font-medium"
                            style={{ 
                              backgroundColor: position.direction === 'long' ? `${colors.success}20` : `${colors.danger}20`,
                              color: position.direction === 'long' ? colors.success : colors.danger,
                            }}
                          >
                            {position.direction === 'long' ? t('trading.long') : t('trading.short')}
                          </span>
                        </div>
                        <span 
                          className="font-medium"
                          style={{ color: isProfit ? colors.success : colors.danger }}
                        >
                          {position.pnl}
                        </span>
                      </div>

                      {/* 详细信息 - 3列布局 */}
                      <div className="grid grid-cols-3 gap-x-4 gap-y-2 mb-3 text-xs">
                        <div>
                          <div className="mb-1" style={{ color: colors.textSecondary }}>{t('trading.position_amount')}</div>
                          <div style={{ color: colors.text }}>{position.amount}</div>
                        </div>
                        <div>
                          <div className="mb-1" style={{ color: colors.textSecondary }}>{t('trading.avg_price')}</div>
                          <div style={{ color: colors.text }}>{position.entryPrice}</div>
                        </div>
                        <div>
                          <div className="mb-1" style={{ color: colors.textSecondary }}>{t('trading.current_price_label')}</div>
                          <div style={{ color: colors.text }}>{position.currentPrice}</div>
                        </div>
                        <div>
                          <div className="mb-1" style={{ color: colors.textSecondary }}>{t('trading.total_value')}</div>
                          <div style={{ color: colors.text }}>{position.totalValue}</div>
                        </div>
                        <div>
                          <div className="mb-1" style={{ color: colors.textSecondary }}>{t('trading.margin')}</div>
                          <div style={{ color: colors.text }}>{position.margin}</div>
                        </div>
                        <div>
                          <div className="mb-1" style={{ color: colors.textSecondary }}>{t('trading.yield_rate')}</div>
                          <div style={{ color: isProfit ? colors.success : colors.danger }}>
                            {position.pnlPercent}
                          </div>
                        </div>
                      </div>

                      {/* 底部：杠杆 + 平仓按钮 */}
                      <div className="flex items-center justify-between pt-2" style={{ borderTop: `1px solid ${colors.border}` }}>
                        <span 
                          className="text-xs px-2 py-1 rounded font-medium"
                          style={{ 
                            backgroundColor: `${colors.primary}15`,
                            color: colors.primary,
                          }}
                        >
                          {position.leverage}X {t('trading.leverage')}
                        </span>
                        <button 
                          className="text-xs px-4 py-1.5 rounded transition-all active:opacity-70 font-medium"
                          style={{ 
                            backgroundColor: colors.danger,
                            color: '#fff',
                          }}
                        >
                          {t('trading.close_position')}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </>
            ) : (
              /* 现货模式：持仓记录 */
              <>
                {[
                  {
                    symbol: 'ETHUSDT',
                    type: 'buy',
                    amount: '5.2',
                    avgPrice: '2680.50',
                    currentPrice: '2756.80',
                    total: '13938.60',
                    pnl: '+396.76',
                    pnlPercent: '+2.93%',
                  },
                  {
                    symbol: 'BTCUSDT',
                    type: 'buy',
                    amount: '0.5',
                    avgPrice: '43500.00',
                    currentPrice: '43250.00',
                    total: '21750.00',
                    pnl: '-125.00',
                    pnlPercent: '-0.57%',
                  },
                ].map((position, idx) => {
                  const isProfit = position.pnl.startsWith('+');
                  return (
                    <div 
                      key={idx}
                      className="rounded-lg p-3"
                      style={{ 
                        backgroundColor: colors.cardBg,
                        border: `1px solid ${colors.border}`,
                      }}
                    >
                      {/* 头部：币种 + 盈亏 */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="font-medium" style={{ color: colors.text }}>
                            {position.symbol}
                          </span>
                          <span 
                            className="text-xs px-2 py-0.5 rounded font-medium"
                            style={{ 
                              backgroundColor: `${colors.success}20`,
                              color: colors.success,
                            }}
                          >
                            {t('trading.buy')}
                          </span>
                        </div>
                        <span 
                          className="font-medium"
                          style={{ color: isProfit ? colors.success : colors.danger }}
                        >
                          {position.pnl}
                        </span>
                      </div>

                      {/* 详细信息 - 3列布局 */}
                      <div className="grid grid-cols-3 gap-x-4 gap-y-2 mb-3 text-xs">
                        <div>
                          <div className="mb-1" style={{ color: colors.textSecondary }}>{t('trading.position_amount')}</div>
                          <div style={{ color: colors.text }}>{position.amount}</div>
                        </div>
                        <div>
                          <div className="mb-1" style={{ color: colors.textSecondary }}>{t('trading.avg_price')}</div>
                          <div style={{ color: colors.text }}>{position.avgPrice}</div>
                        </div>
                        <div>
                          <div className="mb-1" style={{ color: colors.textSecondary }}>{t('trading.current_price_label')}</div>
                          <div style={{ color: colors.text }}>{position.currentPrice}</div>
                        </div>
                        <div>
                          <div className="mb-1" style={{ color: colors.textSecondary }}>{t('trading.total_value')}</div>
                          <div style={{ color: colors.text }}>{position.total}</div>
                        </div>
                        <div className="col-span-2">
                          <div className="mb-1" style={{ color: colors.textSecondary }}>{t('trading.yield_rate')}</div>
                          <div style={{ color: isProfit ? colors.success : colors.danger }}>
                            {position.pnlPercent}
                          </div>
                        </div>
                      </div>

                      {/* 底部：卖出按钮 */}
                      <div className="flex items-center justify-end pt-2" style={{ borderTop: `1px solid ${colors.border}` }}>
                        <button 
                          className="text-xs px-4 py-1.5 rounded transition-all active:opacity-70 font-medium"
                          style={{ 
                            backgroundColor: colors.danger,
                            color: '#fff',
                          }}
                        >
                          {t('trading.sell')}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        )}

        {/* 当前委托/正在委托 */}
        {activeTab === 'pending' && (
          <div className="space-y-2">
            {[
              {
                symbol: 'ETHUSDT',
                type: mode === 'contract' ? 'long' : 'buy',
                orderType: 'limit',
                amount: '1.5',
                price: '2700.00',
                filled: '0.0',
                total: '4050.00',
                time: '2024-11-21 14:32:15',
                status: 'pending',
              },
              {
                symbol: 'BTCUSDT',
                type: mode === 'contract' ? 'short' : 'sell',
                orderType: 'limit',
                amount: '0.08',
                price: '43500.00',
                filled: '0.03',
                total: '3480.00',
                time: '2024-11-21 13:25:40',
                status: 'partial',
              },
            ].map((order, idx) => (
              <div 
                key={idx}
                className="rounded-lg p-3"
                style={{ 
                  backgroundColor: colors.cardBg,
                  border: `1px solid ${colors.border}`,
                }}
              >
                {/* 头部 */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm" style={{ color: colors.text }}>
                      {order.symbol}
                    </span>
                    <span 
                      className="text-xs px-2 py-0.5 rounded font-medium"
                      style={{ 
                        backgroundColor: 
                          (order.type === 'buy' || order.type === 'long') 
                            ? `${colors.success}20` 
                            : `${colors.danger}20`,
                        color: 
                          (order.type === 'buy' || order.type === 'long') 
                            ? colors.success 
                            : colors.danger,
                      }}
                    >
                      {order.type === 'long' ? t('trading.long') : order.type === 'short' ? t('trading.short') : order.type === 'buy' ? t('trading.buy') : t('trading.sell')}
                    </span>
                    <span 
                      className="text-xs px-1.5 py-0.5 rounded"
                      style={{ 
                        backgroundColor: `${colors.textSecondary}15`,
                        color: colors.textSecondary,
                      }}
                    >
                      {order.orderType === 'limit' ? t('trading.limit_price') : t('trading.market_price')}
                    </span>
                  </div>
                  <button 
                    className="text-xs px-3 py-1 rounded transition-all active:opacity-70"
                    style={{ 
                      backgroundColor: `${colors.danger}20`,
                      color: colors.danger,
                    }}
                  >
                    {t('trading.cancel_order')}
                  </button>
                </div>

                {/* 详细信息 */}
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div>
                    <div style={{ color: colors.textSecondary }}>{t('trading.order_price')}</div>
                    <div style={{ color: colors.text }}>{order.price}</div>
                  </div>
                  <div>
                    <div style={{ color: colors.textSecondary }}>{t('trading.order_amount')}</div>
                    <div style={{ color: colors.text }}>{order.amount}</div>
                  </div>
                  <div>
                    <div style={{ color: colors.textSecondary }}>{t('trading.filled')}</div>
                    <div style={{ color: colors.text }}>{order.filled}</div>
                  </div>
                  <div className="col-span-2">
                    <div style={{ color: colors.textSecondary }}>{t('trading.order_time')}</div>
                    <div style={{ color: colors.text }}>{order.time}</div>
                  </div>
                  <div>
                    <div style={{ color: colors.textSecondary }}>{t('trading.status')}</div>
                    <div style={{ 
                      color: order.status === 'pending' ? colors.primary : colors.textSecondary 
                    }}>
                      {order.status === 'pending' ? t('trading.pending_status') : t('trading.partial_filled')}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 历史订单 */}
        {activeTab === 'history' && (
          <div className="space-y-2">
            {[
              {
                symbol: 'ETHUSDT',
                type: mode === 'contract' ? 'long' : 'buy',
                orderType: 'market',
                amount: '2.0',
                avgPrice: '2680.50',
                total: '5361.00',
                time: '2024-11-21 10:15:30',
                status: 'completed',
                pnl: mode === 'contract' ? '+152.40' : undefined,
              },
              {
                symbol: 'BTCUSDT',
                type: mode === 'contract' ? 'short' : 'sell',
                orderType: 'limit',
                amount: '0.15',
                avgPrice: '43180.00',
                total: '6477.00',
                time: '2024-11-20 16:42:18',
                status: 'completed',
                pnl: mode === 'contract' ? '-45.00' : undefined,
              },
              {
                symbol: 'ETHUSDT',
                type: mode === 'contract' ? 'long' : 'buy',
                orderType: 'limit',
                amount: '1.5',
                avgPrice: '2695.00',
                total: '4042.50',
                time: '2024-11-20 09:23:45',
                status: 'cancelled',
              },
            ].map((order, idx) => (
              <div 
                key={idx}
                className="rounded-lg p-3"
                style={{ 
                  backgroundColor: colors.cardBg,
                  border: `1px solid ${colors.border}`,
                }}
              >
                {/* 头部 */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm" style={{ color: colors.text }}>
                      {order.symbol}
                    </span>
                    <span 
                      className="text-xs px-2 py-0.5 rounded font-medium"
                      style={{ 
                        backgroundColor: 
                          (order.type === 'buy' || order.type === 'long') 
                            ? `${colors.success}20` 
                            : `${colors.danger}20`,
                        color: 
                          (order.type === 'buy' || order.type === 'long') 
                            ? colors.success 
                            : colors.danger,
                      }}
                    >
                      {order.type === 'long' ? t('trading.long') : order.type === 'short' ? t('trading.short') : order.type === 'buy' ? t('trading.buy') : t('trading.sell')}
                    </span>
                    <span 
                      className="text-xs px-1.5 py-0.5 rounded"
                      style={{ 
                        backgroundColor: `${colors.textSecondary}15`,
                        color: colors.textSecondary,
                      }}
                    >
                      {order.orderType === 'limit' ? t('trading.limit_price') : t('trading.market_price')}
                    </span>
                  </div>
                  {order.pnl && (
                    <span 
                      className="text-sm font-medium"
                      style={{ 
                        color: order.pnl.startsWith('+') ? colors.success : colors.danger 
                      }}
                    >
                      {order.pnl}
                    </span>
                  )}
                </div>

                {/* 详细信息 */}
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div>
                    <div style={{ color: colors.textSecondary }}>{t('trading.trade_price')}</div>
                    <div style={{ color: colors.text }}>{order.avgPrice}</div>
                  </div>
                  <div>
                    <div style={{ color: colors.textSecondary }}>{t('trading.trade_amount')}</div>
                    <div style={{ color: colors.text }}>{order.amount}</div>
                  </div>
                  <div>
                    <div style={{ color: colors.textSecondary }}>{t('trading.trade_total')}</div>
                    <div style={{ color: colors.text }}>{order.total}</div>
                  </div>
                  <div className="col-span-2">
                    <div style={{ color: colors.textSecondary }}>{t('trading.trade_time')}</div>
                    <div style={{ color: colors.text }}>{order.time}</div>
                  </div>
                  <div>
                    <div style={{ color: colors.textSecondary }}>{t('trading.status')}</div>
                    <div style={{ 
                      color: order.status === 'completed' 
                        ? colors.success 
                        : order.status === 'cancelled' 
                          ? colors.textSecondary 
                          : colors.danger 
                    }}>
                      {order.status === 'completed' ? t('status.completed') : order.status === 'cancelled' ? t('status.cancelled') : t('status.failed')}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 杠杆选择下拉菜单 (仅合约模式) */}
      {mode === 'contract' && showLeverageMenu && (
        <>
          <div 
            className="fixed inset-0 z-[100]"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
            onClick={() => setShowLeverageMenu(false)}
          />
          <div 
            className="fixed left-1/2 top-1/2 z-[101] rounded-2xl shadow-2xl"
            style={{ 
              backgroundColor: colors.cardBg,
              transform: 'translate(-50%, -50%)',
              width: 'calc(100% - 48px)',
              maxWidth: '320px',
              border: isDark 
                ? `2px solid ${colors.border}` 
                : `1px solid ${colors.border}`,
              boxShadow: isDark
                ? `0 0 0 1px rgba(245, 158, 11, 0.15), 0 8px 32px rgba(0, 0, 0, 0.5), 0 0 64px rgba(245, 158, 11, 0.08)`
                : '0 8px 32px rgba(0, 0, 0, 0.15)',
              backdropFilter: isDark ? 'blur(20px)' : 'none',
            }}
          >
            <div 
              className="flex items-center justify-between px-4 py-3 border-b"
              style={{ borderColor: colors.border }}
            >
              <span className="font-medium" style={{ color: colors.text }}>{t('trading.select_leverage')}</span>
              <button
                onClick={() => setShowLeverageMenu(false)}
                className="w-6 h-6 flex items-center justify-center rounded-full transition-all active:opacity-70"
                style={{ backgroundColor: colors.bg }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 1L13 13M1 13L13 1" stroke={colors.textSecondary} strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            </div>

            <div className="p-4">
              <div className="grid grid-cols-3 gap-2">
                {leverageOptions.map((lev) => (
                  <button
                    key={lev}
                    onClick={() => {
                      setLeverage(lev);
                      setShowLeverageMenu(false);
                    }}
                    className="py-3 rounded-lg text-sm font-medium transition-all active:scale-95"
                    style={{
                      backgroundColor: leverage === lev ? colors.primary : colors.bg,
                      color: leverage === lev ? '#fff' : colors.text,
                      border: leverage === lev ? 'none' : `1px solid ${colors.border}`,
                      boxShadow: leverage === lev ? `0 4px 12px ${colors.primary}40` : 'none',
                    }}
                  >
                    {lev}X
                  </button>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {/* 币种选择器弹窗 */}
      <PairSelectorModal
        isOpen={showPairMenu}
        onClose={() => setShowPairMenu(false)}
        selectedPair={selectedPair}
        onSelectPair={(pair) => {
          setSelectedPair(pair);
          setPrice(pair.currentPrice.toFixed(2));
        }}
        tradingPairs={tradingPairs}
        favorites={favorites}
        onToggleFavorite={toggleFavorite}
        isDark={isDark}
      />

    </div>
  );
}