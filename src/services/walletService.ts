// 钱包服务 - 模拟 API

import { CoinAsset, AccountType } from '../types/wallet';

// 模拟延迟
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// 现货账户资产数据
const spotAssetsData: CoinAsset[] = [
  {
    symbol: 'USDT',
    name: 'Tether',
    amount: 100000.00,
    price: 1.00,
    change24h: 0.00,
    imageUrl: 'https://images.unsplash.com/photo-1651054558996-03455fe2702f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZXRoZXIlMjBjcnlwdG9jdXJyZW5jeXxlbnwxfHx8fDE3NjM4NDQ5MjJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    symbol: 'BTC',
    name: 'Bitcoin',
    amount: 0.5234,
    price: 43247.50,
    change24h: 2.48,
    imageUrl: 'https://images.unsplash.com/photo-1707075891517-c23d276feef7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiaXRjb2luJTIwbG9nb3xlbnwxfHx8fDE3NjM3ODM4NTJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    symbol: 'ETH',
    name: 'Ethereum',
    amount: 3.8567,
    price: 2284.50,
    change24h: 3.82,
    imageUrl: 'https://images.unsplash.com/photo-1625563098358-5a5d8cfa4de8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxldGhlcmV1bSUyMGxvZ298ZW58MXx8fHwxNzYzNzk3NTU0fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    symbol: 'BNB',
    name: 'BNB',
    amount: 15.2340,
    price: 312.45,
    change24h: -1.23,
    imageUrl: 'https://images.unsplash.com/photo-1622630998477-20aa696ecb05?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibmIlMjBjcnlwdG98ZW58MXx8fHwxNzYzODQ0OTI0fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    symbol: 'SOL',
    name: 'Solana',
    amount: 45.8920,
    price: 98.42,
    change24h: 5.67,
    imageUrl: 'https://images.unsplash.com/photo-1659012708916-4e7222db5110?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2xhbmElMjBjcnlwdG9jdXJyZW5jeXxlbnwxfHx8fDE3NjM4NDQ5MjN8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    symbol: 'XRP',
    name: 'Ripple',
    amount: 2500.00,
    price: 0.6234,
    change24h: 2.34,
    imageUrl: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyaXBwbGUlMjBjcnlwdG98ZW58MXx8fHwxNzYzODQ0OTI0fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    symbol: 'ADA',
    name: 'Cardano',
    amount: 1200.00,
    price: 0.4521,
    change24h: -0.89,
    imageUrl: 'https://images.unsplash.com/photo-1622630998477-20aa696ecb05?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxjYXJkYW5vJTIwY3J5cHRvfGVufDF8fHx8MTc2Mzg0NDkyNHww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    symbol: 'DOGE',
    name: 'Dogecoin',
    amount: 8500.00,
    price: 0.0856,
    change24h: 4.12,
    imageUrl: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxkb2dlJTIwY3J5cHRvfGVufDF8fHx8MTc2Mzg0NDkyNXww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    symbol: 'DOT',
    name: 'Polkadot',
    amount: 120.50,
    price: 7.89,
    change24h: 1.56,
    imageUrl: 'https://images.unsplash.com/photo-1622630998477-20aa696ecb05?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxwb2xrYWRvdCUyMGNyeXB0b3xlbnwxfHx8fDE3NjM4NDQ5MjV8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    symbol: 'MATIC',
    name: 'Polygon',
    amount: 850.00,
    price: 0.9123,
    change24h: 3.45,
    imageUrl: 'https://images.unsplash.com/photo-1622630998477-20aa696ecb05?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxwb2x5Z29uJTIwY3J5cHRvfGVufDF8fHx8MTc2Mzg0NDkyNXww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    symbol: 'SHIB',
    name: 'Shiba Inu',
    amount: 50000000,
    price: 0.00001234,
    change24h: -2.10,
    imageUrl: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw1fHxzaGliYSUyMGNyeXB0b3xlbnwxfHx8fDE3NjM4NDQ5MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    symbol: 'AVAX',
    name: 'Avalanche',
    amount: 25.50,
    price: 38.67,
    change24h: 6.23,
    imageUrl: 'https://images.unsplash.com/photo-1622630998477-20aa696ecb05?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw2fHxhdmFsYW5jaGUlMjBjcnlwdG98ZW58MXx8fHwxNzYzODQ0OTI2fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
];

// 合约账户资产数据
const futuresAssetsData: CoinAsset[] = [
  {
    symbol: 'USDT',
    name: 'Tether (保证金)',
    amount: 15000.00,
    price: 1.00,
    change24h: 0.00,
    imageUrl: 'https://images.unsplash.com/photo-1651054558996-03455fe2702f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZXRoZXIlMjBjcnlwdG9jdXJyZW5jeXxlbnwxfHx8fDE3NjM4NDQ5MjJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    symbol: 'BTC',
    name: 'Bitcoin (仓位)',
    amount: 0.1250,
    price: 43247.50,
    change24h: 2.48,
    imageUrl: 'https://images.unsplash.com/photo-1707075891517-c23d276feef7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiaXRjb2luJTIwbG9nb3xlbnwxfHx8fDE3NjM3ODM4NTJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    symbol: 'ETH',
    name: 'Ethereum (仓位)',
    amount: 1.5000,
    price: 2284.50,
    change24h: 3.82,
    imageUrl: 'https://images.unsplash.com/photo-1625563098358-5a5d8cfa4de8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxldGhlcmV1bSUyMGxvZ298ZW58MXx8fHwxNzYzNzk3NTU0fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
];

// 期权账户资产数据
const optionsAssetsData: CoinAsset[] = [
  {
    symbol: 'USDT',
    name: 'Tether (保证金)',
    amount: 8500.00,
    price: 1.00,
    change24h: 0.00,
    imageUrl: 'https://images.unsplash.com/photo-1651054558996-03455fe2702f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZXRoZXIlMjBjcnlwdG9jdXJyZW5jeXxlbnwxfHx8fDE3NjM4NDQ5MjJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    symbol: 'BTC',
    name: 'Bitcoin (期权)',
    amount: 0.0500,
    price: 43247.50,
    change24h: 2.48,
    imageUrl: 'https://images.unsplash.com/photo-1707075891517-c23d276feef7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiaXRjb2luJTIwbG9nb3xlbnwxfHx8fDE3NjM3ODM4NTJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
];

/**
 * 获取资产列表
 * @param type 账户类型：'spot' | 'futures' | 'options'
 */
export async function fetchAssets(type: AccountType): Promise<CoinAsset[]> {
  await delay(800);
  switch (type) {
    case 'futures':
      return futuresAssetsData;
    case 'options':
      return optionsAssetsData;
    default:
      return spotAssetsData;
  }
}

/**
 * 获取所有账户的资产（用于计算总资产）
 */
export async function fetchAllAssets(): Promise<{
  spot: CoinAsset[];
  futures: CoinAsset[];
  options: CoinAsset[];
}> {
  await delay(800);
  return {
    spot: spotAssetsData,
    futures: futuresAssetsData,
    options: optionsAssetsData,
  };
}

