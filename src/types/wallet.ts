// 钱包/资产相关类型定义

// 币种资产类型
export interface CoinAsset {
  symbol: string;
  name: string;
  amount: number;
  price: number; // 当前单价（USDT）
  imageUrl: string;
  change24h: number; // 24小时涨跌幅
}

// 账户类型
export type AccountType = 'spot' | 'futures' | 'options';

