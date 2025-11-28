// 交易相关类型定义

// K线数据点
export interface KlineData {
  open: number;
  close: number;
  high: number;
  low: number;
  isGreen: boolean;
}

// 图表数据
export interface ChartData {
  klines: KlineData[];
  timeLabels: string[];
  priceLabels: string[];
}

// 交易对选择器中的交易对
export interface SelectedPair {
  symbol: string;
  name: string;
  fullName: string;
  currentPrice: number;
  change24h: number;
}

// 订单类型
export interface Order {
  symbol: string;
  type: 'buy' | 'sell' | 'long' | 'short';
  orderType: 'market' | 'limit';
  amount: string;
  price?: string;
  avgPrice?: string;
  filled?: string;
  total?: string;
  time: string;
  status: 'pending' | 'partial' | 'completed' | 'cancelled' | 'failed';
  pnl?: string;
}

// 持仓类型（合约）
export interface ContractPosition {
  symbol: string;
  direction: 'long' | 'short';
  amount: string;
  entryPrice: string;
  currentPrice: string;
  margin: string;
  leverage: number;
  pnl: string;
  pnlPercent: string;
  totalValue: string;
}

// 持仓类型（现货）
export interface SpotPosition {
  symbol: string;
  type: 'buy' | 'sell';
  amount: string;
  avgPrice: string;
  currentPrice: string;
  total: string;
  pnl: string;
  pnlPercent: string;
}

