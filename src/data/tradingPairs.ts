// 共享的交易对数据
export interface TradingPair {
  symbol: string;
  name: string;
  fullName: string;
  currentPrice: number;
  change24h: number;
  category: 'web3' | 'futures' | 'precious' | 'forex' | 'stock';
  color: string;
  icon: string;
}

export const tradingPairs: TradingPair[] = [
  // Web3 加密货币
  { 
    symbol: 'ETHUSDT', 
    name: 'ETH/USDT', 
    fullName: 'Ethereum', 
    currentPrice: 2762.69, 
    change24h: -0.37, 
    category: 'web3', 
    color: '#627EEA', 
    icon: 'https://assets.coincap.io/assets/icons/eth@2x.png' 
  },
  { 
    symbol: 'BTCUSDT', 
    name: 'BTC/USDT', 
    fullName: 'Bitcoin', 
    currentPrice: 43256.82, 
    change24h: 2.87, 
    category: 'web3', 
    color: '#F7931A', 
    icon: 'https://assets.coincap.io/assets/icons/btc@2x.png' 
  },
  { 
    symbol: 'SOLUSDT', 
    name: 'SOL/USDT', 
    fullName: 'Solana', 
    currentPrice: 98.67, 
    change24h: 5.97, 
    category: 'web3', 
    color: '#14F195', 
    icon: 'https://assets.coincap.io/assets/icons/sol@2x.png' 
  },
  { 
    symbol: 'BNBUSDT', 
    name: 'BNB/USDT', 
    fullName: 'BNB', 
    currentPrice: 612.45, 
    change24h: 1.23, 
    category: 'web3', 
    color: '#F3BA2F', 
    icon: 'https://assets.coincap.io/assets/icons/bnb@2x.png' 
  },
  { 
    symbol: 'ADAUSDT', 
    name: 'ADA/USDT', 
    fullName: 'Cardano', 
    currentPrice: 0.4521, 
    change24h: -1.67, 
    category: 'web3', 
    color: '#0033AD', 
    icon: 'https://assets.coincap.io/assets/icons/ada@2x.png' 
  },
  { 
    symbol: 'MATICUSDT', 
    name: 'MATIC/USDT', 
    fullName: 'Polygon', 
    currentPrice: 0.8234, 
    change24h: 6.03, 
    category: 'web3', 
    color: '#8247E5', 
    icon: 'https://assets.coincap.io/assets/icons/matic@2x.png' 
  },
  { 
    symbol: 'AVAXUSDT', 
    name: 'AVAX/USDT', 
    fullName: 'Avalanche', 
    currentPrice: 35.42, 
    change24h: -2.49, 
    category: 'web3', 
    color: '#E84142', 
    icon: 'https://assets.coincap.io/assets/icons/avax@2x.png' 
  },
  { 
    symbol: 'UNIUSDT', 
    name: 'UNI/USDT', 
    fullName: 'Uniswap', 
    currentPrice: 7.85, 
    change24h: 3.21, 
    category: 'web3', 
    color: '#FF007A', 
    icon: 'https://assets.coincap.io/assets/icons/uni@2x.png' 
  },
  
  // 期货指数
  { 
    symbol: 'NQ100', 
    name: 'NQ/USD', 
    fullName: '纳斯达克100', 
    currentPrice: 16523.45, 
    change24h: 0.87, 
    category: 'futures', 
    color: '#1E90FF', 
    icon: 'https://cdn-icons-png.flaticon.com/128/584/584808.png' 
  },
  { 
    symbol: 'ES500', 
    name: 'ES/USD', 
    fullName: '标普500', 
    currentPrice: 4789.32, 
    change24h: 0.54, 
    category: 'futures', 
    color: '#4169E1', 
    icon: 'https://cdn-icons-png.flaticon.com/128/2922/2922719.png' 
  },
  
  // 贵金属
  { 
    symbol: 'XAUUSD', 
    name: 'XAU/USD', 
    fullName: '黄金', 
    currentPrice: 2048.75, 
    change24h: 1.23, 
    category: 'precious', 
    color: '#FFD700', 
    icon: 'https://cdn-icons-png.flaticon.com/128/7396/7396388.png' 
  },
  { 
    symbol: 'XAGUSD', 
    name: 'XAG/USD', 
    fullName: '白银', 
    currentPrice: 24.68, 
    change24h: 2.15, 
    category: 'precious', 
    color: '#C0C0C0', 
    icon: 'https://cdn-icons-png.flaticon.com/128/2553/2553639.png' 
  },
  { 
    symbol: 'XPTUSD', 
    name: 'XPT/USD', 
    fullName: '铂金', 
    currentPrice: 956.23, 
    change24h: -0.87, 
    category: 'precious', 
    color: '#E5E4E2', 
    icon: 'https://cdn-icons-png.flaticon.com/128/9672/9672031.png' 
  },
  
  // 外汇
  { 
    symbol: 'EURUSD', 
    name: 'EUR/USD', 
    fullName: '欧元/美元', 
    currentPrice: 1.0876, 
    change24h: 0.12, 
    category: 'forex', 
    color: '#003399', 
    icon: 'https://cdn-icons-png.flaticon.com/128/197/197615.png' 
  },
  { 
    symbol: 'GBPUSD', 
    name: 'GBP/USD', 
    fullName: '英镑/美元', 
    currentPrice: 1.2654, 
    change24h: -0.23, 
    category: 'forex', 
    color: '#C8102E', 
    icon: 'https://cdn-icons-png.flaticon.com/128/197/197374.png' 
  },
  { 
    symbol: 'USDJPY', 
    name: 'USD/JPY', 
    fullName: '美元/日元', 
    currentPrice: 149.82, 
    change24h: 0.45, 
    category: 'forex', 
    color: '#BC002D', 
    icon: 'https://cdn-icons-png.flaticon.com/128/197/197604.png' 
  },
  { 
    symbol: 'AUDUSD', 
    name: 'AUD/USD', 
    fullName: '澳元/美元', 
    currentPrice: 0.6523, 
    change24h: 0.34, 
    category: 'forex', 
    color: '#00008B', 
    icon: 'https://cdn-icons-png.flaticon.com/128/197/197507.png' 
  },
  { 
    symbol: 'USDCAD', 
    name: 'USD/CAD', 
    fullName: '美元/加元', 
    currentPrice: 1.3542, 
    change24h: -0.18, 
    category: 'forex', 
    color: '#FF0000', 
    icon: 'https://cdn-icons-png.flaticon.com/128/197/197430.png' 
  },
  { 
    symbol: 'USDCHF', 
    name: 'USD/CHF', 
    fullName: '美元/瑞郎', 
    currentPrice: 0.8765, 
    change24h: 0.21, 
    category: 'forex', 
    color: '#DA291C', 
    icon: 'https://cdn-icons-png.flaticon.com/128/197/197540.png' 
  },
  { 
    symbol: 'NZDUSD', 
    name: 'NZD/USD', 
    fullName: '纽元/美元', 
    currentPrice: 0.6123, 
    change24h: -0.42, 
    category: 'forex', 
    color: '#00247D', 
    icon: 'https://cdn-icons-png.flaticon.com/128/197/197589.png' 
  },
  { 
    symbol: 'EURGBP', 
    name: 'EUR/GBP', 
    fullName: '欧元/英镑', 
    currentPrice: 0.8598, 
    change24h: 0.15, 
    category: 'forex', 
    color: '#003399', 
    icon: 'https://cdn-icons-png.flaticon.com/128/197/197615.png' 
  },
  { 
    symbol: 'EURJPY', 
    name: 'EUR/JPY', 
    fullName: '欧元/日元', 
    currentPrice: 162.87, 
    change24h: 0.67, 
    category: 'forex', 
    color: '#003399', 
    icon: 'https://cdn-icons-png.flaticon.com/128/197/197615.png' 
  },
  { 
    symbol: 'GBPJPY', 
    name: 'GBP/JPY', 
    fullName: '英镑/日元', 
    currentPrice: 189.54, 
    change24h: -0.31, 
    category: 'forex', 
    color: '#C8102E', 
    icon: 'https://cdn-icons-png.flaticon.com/128/197/197374.png' 
  },
  { 
    symbol: 'AUDJPY', 
    name: 'AUD/JPY', 
    fullName: '澳元/日元', 
    currentPrice: 97.68, 
    change24h: 0.52, 
    category: 'forex', 
    color: '#00008B', 
    icon: 'https://cdn-icons-png.flaticon.com/128/197/197507.png' 
  },
  { 
    symbol: 'USDCNY', 
    name: 'USD/CNY', 
    fullName: '美元/人民币', 
    currentPrice: 7.2345, 
    change24h: 0.08, 
    category: 'forex', 
    color: '#DE2910', 
    icon: 'https://cdn-icons-png.flaticon.com/128/197/197375.png' 
  },
  { 
    symbol: 'USDHKD', 
    name: 'USD/HKD', 
    fullName: '美元/港币', 
    currentPrice: 7.8123, 
    change24h: -0.05, 
    category: 'forex', 
    color: '#DE2910', 
    icon: 'https://cdn-icons-png.flaticon.com/128/197/197570.png' 
  },
  { 
    symbol: 'EURCHF', 
    name: 'EUR/CHF', 
    fullName: '欧元/瑞郎', 
    currentPrice: 0.9532, 
    change24h: 0.19, 
    category: 'forex', 
    color: '#003399', 
    icon: 'https://cdn-icons-png.flaticon.com/128/197/197615.png' 
  },
  { 
    symbol: 'EURAUD', 
    name: 'EUR/AUD', 
    fullName: '欧元/澳元', 
    currentPrice: 1.6678, 
    change24h: -0.28, 
    category: 'forex', 
    color: '#003399', 
    icon: 'https://cdn-icons-png.flaticon.com/128/197/197615.png' 
  },
  { 
    symbol: 'GBPAUD', 
    name: 'GBP/AUD', 
    fullName: '英镑/澳元', 
    currentPrice: 1.9401, 
    change24h: 0.44, 
    category: 'forex', 
    color: '#C8102E', 
    icon: 'https://cdn-icons-png.flaticon.com/128/197/197374.png' 
  },
  
  // 股票
  { 
    symbol: 'AAPL', 
    name: 'AAPL', 
    fullName: '苹果公司', 
    currentPrice: 189.43, 
    change24h: 1.87, 
    category: 'stock', 
    color: '#A3AAAE', 
    icon: 'https://cdn-icons-png.flaticon.com/128/731/731985.png' 
  },
  { 
    symbol: 'TSLA', 
    name: 'TSLA', 
    fullName: '特斯拉', 
    currentPrice: 242.84, 
    change24h: -2.34, 
    category: 'stock', 
    color: '#E82127', 
    icon: 'https://cdn-icons-png.flaticon.com/128/564/564451.png' 
  },
  { 
    symbol: 'NVDA', 
    name: 'NVDA', 
    fullName: '英伟达', 
    currentPrice: 495.22, 
    change24h: 3.65, 
    category: 'stock', 
    color: '#76B900', 
    icon: 'https://cdn-icons-png.flaticon.com/128/7880/7880943.png' 
  },
];

// 分类标签
export const categories = [
  { id: 'favorites', label: '收藏' },
  { id: 'web3', label: 'Web3' },
  { id: 'precious', label: '贵金属' },
  { id: 'futures', label: '期货' },
  { id: 'forex', label: '外汇' },
  { id: 'stock', label: '股票' },
] as const;
