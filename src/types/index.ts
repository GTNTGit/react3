// 通用类型定义

// 用户类型
export interface User {
  id: string;
  nickname: string;
  email?: string;
  phone?: string;
  avatar?: string;
  creditScore?: number;
}

// 交易对类型（已在 data/tradingPairs.ts 中定义，这里重新导出）
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

// 市场列表中的币种类型
export interface MarketCoin {
  name: string;
  fullName: string;
  price: string;
  changePercent: string;
  volume: string;
  isUp: boolean;
  chartPath: string;
  isFavorite: boolean;
}

// 主题颜色类型
export interface ThemeColors {
  bg: string;
  cardBg: string;
  text: string;
  textSecondary: string;
  primary: string;
  success: string;
  danger: string;
  warning: string;
  border: string;
  isDark?: boolean;
}

