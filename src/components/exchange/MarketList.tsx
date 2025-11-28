import React, { useState, useRef } from 'react';
import { Star } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../contexts/ThemeContext';
import { MarketCoin } from '../../types';

interface MarketListProps {
  onCoinClick?: (coin: { symbol: string; name: string; price: string; change: number }) => void;
}

// 加密货币列表（热门）
const cryptoList = [
  {
    name: 'BTC',
    fullName: 'Bitcoin',
    price: '43,287.50',
    changePercent: '+2.96%',
    volume: '24.5B',
    isUp: true,
    chartPath: 'M0,30 L10,28 L20,25 L30,27 L40,20 L50,18 L60,15 L70,12 L80,10',
    isFavorite: true,
  },
  {
    name: 'ETH',
    fullName: 'Ethereum',
    price: '2,285.80',
    changePercent: '+2.04%',
    volume: '12.8B',
    isUp: true,
    chartPath: 'M0,28 L10,26 L20,24 L30,22 L40,25 L50,20 L60,18 L70,15 L80,12',
    isFavorite: true,
  },
  {
    name: 'BNB',
    fullName: 'Binance',
    price: '312.45',
    changePercent: '-2.57%',
    volume: '1.2B',
    isUp: false,
    chartPath: 'M0,15 L10,18 L20,20 L30,22 L40,25 L50,28 L60,30 L70,32 L80,35',
    isFavorite: false,
  },
  {
    name: 'SOL',
    fullName: 'Solana',
    price: '98.42',
    changePercent: '+5.56%',
    volume: '2.4B',
    isUp: true,
    chartPath: 'M0,35 L10,32 L20,28 L30,25 L40,20 L50,18 L60,14 L70,10 L80,8',
    isFavorite: true,
  },
  {
    name: 'XRP',
    fullName: 'Ripple',
    price: '0.6234',
    changePercent: '+2.57%',
    volume: '1.8B',
    isUp: true,
    chartPath: 'M0,32 L10,30 L20,28 L30,26 L40,24 L50,22 L60,20 L70,18 L80,15',
    isFavorite: false,
  },
  {
    name: 'ADA',
    fullName: 'Cardano',
    price: '0.4521',
    changePercent: '-1.23%',
    volume: '890M',
    isUp: false,
    chartPath: 'M0,20 L10,22 L20,24 L30,26 L40,28 L50,30 L60,32 L70,34 L80,36',
    isFavorite: false,
  },
];

// Web3列表
const web3List = [
  {
    name: 'LINK',
    fullName: 'Chainlink',
    price: '14.52',
    changePercent: '+3.24%',
    volume: '890M',
    isUp: true,
    chartPath: 'M0,32 L10,28 L20,25 L30,22 L40,20 L50,18 L60,16 L70,14 L80,12',
    isFavorite: false,
  },
  {
    name: 'UNI',
    fullName: 'Uniswap',
    price: '6.78',
    changePercent: '+1.85%',
    volume: '560M',
    isUp: true,
    chartPath: 'M0,30 L10,28 L20,26 L30,24 L40,22 L50,20 L60,18 L70,16 L80,14',
    isFavorite: true,
  },
  {
    name: 'MATIC',
    fullName: 'Polygon',
    price: '0.8234',
    changePercent: '+4.12%',
    volume: '420M',
    isUp: true,
    chartPath: 'M0,34 L10,30 L20,26 L30,22 L40,18 L50,16 L60,14 L70,12 L80,10',
    isFavorite: false,
  },
  {
    name: 'AAVE',
    fullName: 'Aave',
    price: '92.35',
    changePercent: '-1.56%',
    volume: '280M',
    isUp: false,
    chartPath: 'M0,18 L10,20 L20,22 L30,24 L40,26 L50,28 L60,30 L70,32 L80,34',
    isFavorite: false,
  },
];

// 贵金属列表
const metalsList = [
  {
    name: 'XAUUSD',
    fullName: '黄金/美元',
    price: '2,045.80',
    changePercent: '+0.45%',
    volume: '8.5B',
    isUp: true,
    chartPath: 'M0,28 L10,27 L20,26 L30,25 L40,24 L50,23 L60,22 L70,21 L80,20',
    isFavorite: true,
  },
  {
    name: 'XAGUSD',
    fullName: '白银/美元',
    price: '23.45',
    changePercent: '+0.82%',
    volume: '1.2B',
    isUp: true,
    chartPath: 'M0,30 L10,28 L20,26 L30,24 L40,22 L50,20 L60,18 L70,16 L80,14',
    isFavorite: false,
  },
  {
    name: 'XPTUSD',
    fullName: '铂金/美元',
    price: '925.60',
    changePercent: '-0.35%',
    volume: '450M',
    isUp: false,
    chartPath: 'M0,22 L10,23 L20,24 L30,25 L40,26 L50,27 L60,28 L70,29 L80,30',
    isFavorite: false,
  },
  {
    name: 'XPDUSD',
    fullName: '钯金/美元',
    price: '1,025.30',
    changePercent: '+1.15%',
    volume: '380M',
    isUp: true,
    chartPath: 'M0,32 L10,30 L20,28 L30,26 L40,24 L50,22 L60,20 L70,18 L80,16',
    isFavorite: false,
  },
];

// 期货列表
const futuresList = [
  {
    name: 'CL',
    fullName: '原油期货',
    price: '78.45',
    changePercent: '+2.15%',
    volume: '5.2B',
    isUp: true,
    chartPath: 'M0,34 L10,32 L20,30 L30,28 L40,26 L50,24 L60,22 L70,20 L80,18',
    isFavorite: true,
  },
  {
    name: 'NG',
    fullName: '天然气期货',
    price: '2.85',
    changePercent: '-1.45%',
    volume: '1.8B',
    isUp: false,
    chartPath: 'M0,20 L10,22 L20,24 L30,26 L40,28 L50,30 L60,32 L70,34 L80,36',
    isFavorite: false,
  },
  {
    name: 'GC',
    fullName: '黄金期货',
    price: '2,048.90',
    changePercent: '+0.55%',
    volume: '3.5B',
    isUp: true,
    chartPath: 'M0,30 L10,29 L20,28 L30,27 L40,26 L50,25 L60,24 L70,23 L80,22',
    isFavorite: false,
  },
  {
    name: 'SI',
    fullName: '白银期货',
    price: '23.52',
    changePercent: '+0.92%',
    volume: '980M',
    isUp: true,
    chartPath: 'M0,32 L10,30 L20,28 L30,26 L40,24 L50,22 L60,20 L70,18 L80,16',
    isFavorite: false,
  },
];

// 外汇列表
const forexList = [
  {
    name: 'EURUSD',
    fullName: '欧元/美元',
    price: '1.0850',
    changePercent: '+0.25%',
    volume: '45.2B',
    isUp: true,
    chartPath: 'M0,28 L10,27 L20,26 L30,25 L40,24 L50,23 L60,22 L70,21 L80,20',
    isFavorite: true,
  },
  {
    name: 'GBPUSD',
    fullName: '英镑/美元',
    price: '1.2685',
    changePercent: '+0.18%',
    volume: '32.8B',
    isUp: true,
    chartPath: 'M0,30 L10,29 L20,28 L30,27 L40,26 L50,25 L60,24 L70,23 L80,22',
    isFavorite: false,
  },
  {
    name: 'USDJPY',
    fullName: '美元/日元',
    price: '149.85',
    changePercent: '-0.12%',
    volume: '38.5B',
    isUp: false,
    chartPath: 'M0,22 L10,23 L20,24 L30,25 L40,26 L50,27 L60,28 L70,29 L80,30',
    isFavorite: true,
  },
  {
    name: 'AUDUSD',
    fullName: '澳元/美元',
    price: '0.6520',
    changePercent: '+0.35%',
    volume: '18.2B',
    isUp: true,
    chartPath: 'M0,32 L10,30 L20,28 L30,26 L40,24 L50,22 L60,20 L70,18 L80,16',
    isFavorite: false,
  },
];

// 股票列表
const stocksList = [
  {
    name: 'AAPL',
    fullName: 'Apple Inc.',
    price: '185.64',
    changePercent: '+1.25%',
    volume: '52.3M',
    isUp: true,
    chartPath: 'M0,32 L10,30 L20,28 L30,26 L40,24 L50,22 L60,20 L70,18 L80,16',
    isFavorite: true,
  },
  {
    name: 'MSFT',
    fullName: 'Microsoft Corp.',
    price: '378.91',
    changePercent: '+0.85%',
    volume: '28.5M',
    isUp: true,
    chartPath: 'M0,30 L10,28 L20,26 L30,24 L40,22 L50,20 L60,18 L70,16 L80,14',
    isFavorite: true,
  },
  {
    name: 'TSLA',
    fullName: 'Tesla Inc.',
    price: '238.45',
    changePercent: '-2.15%',
    volume: '125.8M',
    isUp: false,
    chartPath: 'M0,18 L10,20 L20,22 L30,24 L40,26 L50,28 L60,30 L70,32 L80,34',
    isFavorite: false,
  },
  {
    name: 'GOOGL',
    fullName: 'Alphabet Inc.',
    price: '142.38',
    changePercent: '+1.52%',
    volume: '32.4M',
    isUp: true,
    chartPath: 'M0,34 L10,32 L20,30 L30,28 L40,26 L50,24 L60,22 L70,20 L80,18',
    isFavorite: false,
  },
];

export function MarketList({ onCoinClick }: MarketListProps) {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('hot');
  const [favorites, setFavorites] = useState<Set<string>>(new Set(['BTC', 'ETH', 'SOL', 'XAUUSD', 'CL', 'EURUSD', 'USDJPY', 'AAPL', 'MSFT']));
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const tabs = [
    { id: 'favorites', key: 'market.favorites' },
    { id: 'hot', key: 'market.hot' },
    { id: 'web3', key: 'market.web3' },
    { id: 'precious_metals', key: 'market.precious_metals' },
    { id: 'futures', key: 'market.futures' },
    { id: 'forex', key: 'market.forex' },
    { id: 'stocks', key: 'market.stocks' },
  ];

  // 点击箭头滚动
  const handleScrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 200, // 滚动200px
        behavior: 'smooth'
      });
    }
  };

  // 根据当前Tab获取对应的列表
  const getDisplayList = () => {
    if (activeTab === 'favorites') {
      // 从所有列表中筛选出收藏的项目
      return [...cryptoList, ...web3List, ...metalsList, ...futuresList, ...forexList, ...stocksList]
        .filter(item => favorites.has(item.name));
    } else if (activeTab === 'hot') {
      return cryptoList;
    } else if (activeTab === 'web3') {
      return web3List;
    } else if (activeTab === 'precious_metals') {
      return metalsList;
    } else if (activeTab === 'futures') {
      return futuresList;
    } else if (activeTab === 'forex') {
      return forexList;
    } else if (activeTab === 'stocks') {
      return stocksList;
    }
    return cryptoList;
  };

  const toggleFavorite = (name: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newFavorites = new Set(favorites);
    if (favorites.has(name)) {
      newFavorites.delete(name);
    } else {
      newFavorites.add(name);
    }
    setFavorites(newFavorites);
  };

  const displayList = getDisplayList();

  return (
    <div className="pb-3">
      {/* Tabs */}
      <div className="px-3 mb-3 flex items-center gap-3 relative">
        <div className="flex gap-3 overflow-x-auto scrollbar-hide flex-1" ref={scrollContainerRef}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition-all flex-shrink-0"
              style={{
                backgroundColor: activeTab === tab.id 
                  ? colors.isDark 
                    ? 'rgba(34, 197, 94, 0.15)'  // 暗色：15% 绿色
                    : 'rgba(34, 197, 94, 0.1)'   // 亮色：10% 绿色
                  : 'transparent',
                color: activeTab === tab.id ? colors.primary : colors.textSecondary,
                fontWeight: activeTab === tab.id ? 500 : 400,
              }}
            >
              {t(tab.key)}
            </button>
          ))}
        </div>
        
        {/* 滑动提示箭头 */}
        <div 
          className="flex-shrink-0 w-6 flex items-center justify-center cursor-pointer active:opacity-50 transition-opacity"
          style={{ color: colors.textSecondary, opacity: 0.8 }}
          onClick={handleScrollRight}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path 
              d="M4.5 2L8.5 6L4.5 10" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* Table Header */}
      <div 
        className="px-4 py-2 flex items-center text-xs"
        style={{ 
          color: colors.textSecondary,
        }}
      >
        <div className="flex-1">{t('common.name')}</div>
        <div className="w-16 text-center">{t('market.trend')}</div>
        <div className="w-24 text-right">{t('market.latest_price')}</div>
        <div className="w-20 text-right">{t('market.change_percent')}</div>
      </div>

      {/* List */}
      <div className="px-4">
        {displayList.length === 0 ? (
          <div className="py-12 text-center">
            <Star className="w-12 h-12 mx-auto mb-2" style={{ color: colors.textSecondary, opacity: 0.3 }} />
            <div className="text-sm" style={{ color: colors.textSecondary }}>{t('market.no_favorites')}</div>
          </div>
        ) : (
          displayList.map((item, index) => (
            <button
              key={index}
              className="w-full flex items-center py-3 active:opacity-70 transition-opacity"
              style={{ 
                borderTop: index === 0 ? 'none' : `1px solid ${colors.border}`
              }}
              onClick={() => onCoinClick && onCoinClick({
                symbol: item.name,
                name: `${item.name}`,
                price: item.price.replace(/,/g, ''),
                change: parseFloat(item.changePercent.replace(/[+%]/g, '')),
              })}
            >
              {/* Left: Star + Name */}
              <div className="flex-1 flex items-center gap-3">
                <button
                  onClick={(e) => toggleFavorite(item.name, e)}
                  className="flex-shrink-0"
                >
                  <Star 
                    className="w-4 h-4" 
                    style={{ 
                      color: favorites.has(item.name) ? colors.warning : colors.textSecondary, 
                      opacity: favorites.has(item.name) ? 1 : 0.4,
                      fill: favorites.has(item.name) ? colors.warning : 'none'
                    }} 
                  />
                </button>
                
                <div className="text-left">
                  <div className="text-sm font-medium" style={{ color: colors.text }}>
                    {item.name}
                  </div>
                  <div className="text-xs" style={{ color: colors.textSecondary }}>
                    {item.fullName}
                  </div>
                </div>
              </div>

              {/* Mini Chart */}
              <div className="w-16 flex justify-center">
                <svg width="50" height="24" viewBox="0 0 80 40">
                  <path
                    d={item.chartPath}
                    fill="none"
                    stroke={item.isUp ? colors.success : colors.danger}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              {/* Middle: Price */}
              <div className="w-24 text-right">
                <div className="text-sm font-medium" style={{ color: colors.text }}>
                  {item.price}
                </div>
                <div className="text-xs" style={{ color: colors.textSecondary }}>
                  {t('common.vol')} {item.volume}
                </div>
              </div>

              {/* Right: Change */}
              <div className="w-20 text-right">
                <div 
                  className="text-sm font-medium"
                  style={{ color: item.isUp ? colors.success : colors.danger }}
                >
                  {item.changePercent}
                </div>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
}