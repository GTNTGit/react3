import { Star, TrendingUp, TrendingDown } from 'lucide-react';
import { useState } from 'react';

const tabs = ['自选', 'USDT', 'BTC', 'ETH', '涨幅榜', '新币'];

const cryptoList = [
  {
    name: 'BTC',
    fullName: 'Bitcoin',
    price: '43,287.50',
    priceChange: '+1,245.30',
    changePercent: '+2.96%',
    volume: '24.5B',
    isUp: true,
    chartPath: 'M0,30 L10,28 L20,25 L30,27 L40,20 L50,18 L60,15 L70,12 L80,10'
  },
  {
    name: 'ETH',
    fullName: 'Ethereum',
    price: '2,285.80',
    priceChange: '+45.60',
    changePercent: '+2.04%',
    volume: '12.8B',
    isUp: true,
    chartPath: 'M0,28 L10,26 L20,24 L30,22 L40,25 L50,20 L60,18 L70,15 L80,12'
  },
  {
    name: 'BNB',
    fullName: 'Binance Coin',
    price: '312.45',
    priceChange: '-8.25',
    changePercent: '-2.57%',
    volume: '1.2B',
    isUp: false,
    chartPath: 'M0,15 L10,18 L20,20 L30,22 L40,25 L50,28 L60,30 L70,32 L80,35'
  },
  {
    name: 'SOL',
    fullName: 'Solana',
    price: '98.42',
    priceChange: '+5.18',
    changePercent: '+5.56%',
    volume: '2.4B',
    isUp: true,
    chartPath: 'M0,35 L10,32 L20,28 L30,25 L40,20 L50,18 L60,14 L70,10 L80,8'
  },
  {
    name: 'XRP',
    fullName: 'Ripple',
    price: '0.6234',
    priceChange: '+0.0156',
    changePercent: '+2.57%',
    volume: '1.8B',
    isUp: true,
    chartPath: 'M0,32 L10,30 L20,28 L30,26 L40,24 L50,22 L60,20 L70,18 L80,15'
  },
];

export function MarketSection() {
  const [activeTab, setActiveTab] = useState('自选');

  return (
    <div className="px-4">
      {/* Tabs */}
      <div className="flex items-center gap-1 mb-4 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-colors ${
              activeTab === tab
                ? 'bg-gray-800 text-white'
                : 'text-gray-500 active:text-gray-400'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Table Header */}
      <div className="flex items-center px-3 py-2 text-xs text-gray-500 border-b border-gray-800">
        <div className="flex-1">名称</div>
        <div className="w-24 text-right">最新价</div>
        <div className="w-20 text-right">涨跌幅</div>
      </div>

      {/* Crypto List */}
      <div className="divide-y divide-gray-800">
        {cryptoList.map((crypto, index) => (
          <button
            key={index}
            className="w-full flex items-center px-3 py-3 active:bg-gray-900/50 transition-colors"
          >
            {/* Left: Name & Chart */}
            <div className="flex-1 flex items-center gap-3">
              <Star className="w-4 h-4 text-gray-600" />
              <div className="text-left">
                <div className="text-white mb-0.5">{crypto.name}</div>
                <div className="text-xs text-gray-500">{crypto.fullName}</div>
              </div>
              
              {/* Mini Chart */}
              <div className="ml-2">
                <svg width="60" height="30" viewBox="0 0 80 40" className="opacity-60">
                  <path
                    d={crypto.chartPath}
                    fill="none"
                    stroke={crypto.isUp ? '#10b981' : '#ef4444'}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            {/* Middle: Price */}
            <div className="w-24 text-right">
              <div className="text-white mb-0.5">{crypto.price}</div>
              <div className="text-xs text-gray-500">Vol {crypto.volume}</div>
            </div>

            {/* Right: Change */}
            <div className="w-20 text-right">
              <div className={`mb-0.5 ${crypto.isUp ? 'text-emerald-400' : 'text-red-400'}`}>
                {crypto.changePercent}
              </div>
              <div className={`text-xs ${crypto.isUp ? 'text-emerald-400/70' : 'text-red-400/70'}`}>
                {crypto.priceChange}
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Load More */}
      <button className="w-full py-4 text-sm text-gray-500 active:text-gray-400">
        查看更多
      </button>
    </div>
  );
}