// 交易服务 - 模拟 API

// 币种数据类型
export interface CoinData {
  symbol: string;
  name: string;
  currentPrice: number;
  change24h: number;
  changePercent: number;
  high24h: number;
  low24h: number;
  volume24h: number;
  buyOrders: { price: string; amount: string }[];
  sellOrders: { price: string; amount: string }[];
}

// 分类币种数据
export interface CoinCategory {
  id: string;
  name: string;
  coins: CoinData[];
}

// 时间周期选项
export interface TimeInterval {
  value: string;
  label: string;
}

// 模拟延迟
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// 币种数据（从 TradePage.tsx 中提取）
const coinCategoriesData: CoinCategory[] = [
  {
    id: 'favorites',
    name: '自选',
    coins: [
      {
        symbol: 'BTC/USDT',
        name: 'BTC 期权',
        currentPrice: 43256.82,
        change24h: 1245.67,
        changePercent: 2.97,
        high24h: 43890.50,
        low24h: 41920.30,
        volume24h: 2847.3421,
        buyOrders: [
          { price: '43200.50', amount: '0.5234' },
          { price: '43180.20', amount: '1.2345' },
          { price: '43150.75', amount: '0.8967' },
          { price: '43120.30', amount: '0.6543' },
          { price: '43090.15', amount: '1.5678' },
          { price: '43050.80', amount: '0.4321' },
        ],
        sellOrders: [
          { price: '43280.90', amount: '0.7234' },
          { price: '43310.45', amount: '1.4567' },
          { price: '43340.20', amount: '0.9876' },
          { price: '43370.85', amount: '1.1234' },
          { price: '43400.50', amount: '0.5678' },
          { price: '43430.25', amount: '0.8901' },
        ],
      },
      {
        symbol: 'ETH/USDT',
        name: 'ETH 期权',
        currentPrice: 2762.69,
        change24h: -247.82,
        changePercent: -8.94,
        high24h: 3008.52,
        low24h: 2624.28,
        volume24h: 5928.68,
        buyOrders: [
          { price: '2750.23', amount: '3.1069' },
          { price: '2750.41', amount: '8.0992' },
          { price: '2750.50', amount: '3.8568' },
          { price: '2750.66', amount: '4.6621' },
          { price: '2749.89', amount: '5.2341' },
          { price: '2749.56', amount: '2.8764' },
        ],
        sellOrders: [
          { price: '2753.74', amount: '5.2125' },
          { price: '2753.90', amount: '8.3143' },
          { price: '2754.05', amount: '7.7230' },
          { price: '2754.18', amount: '6.8518' },
          { price: '2754.45', amount: '4.1234' },
          { price: '2754.78', amount: '3.5678' },
        ],
      },
    ],
  },
  {
    id: 'web3',
    name: 'Web3',
    coins: [
      {
        symbol: 'ETH/USDT',
        name: 'Ethereum',
        currentPrice: 2762.69,
        change24h: -247.82,
        changePercent: -8.94,
        high24h: 3008.52,
        low24h: 2624.28,
        volume24h: 5928.68,
        buyOrders: [
          { price: '2750.23', amount: '3.1069' },
          { price: '2750.41', amount: '8.0992' },
          { price: '2750.50', amount: '3.8568' },
          { price: '2750.66', amount: '4.6621' },
          { price: '2749.89', amount: '5.2341' },
          { price: '2749.56', amount: '2.8764' },
        ],
        sellOrders: [
          { price: '2753.74', amount: '5.2125' },
          { price: '2753.90', amount: '8.3143' },
          { price: '2754.05', amount: '7.7230' },
          { price: '2754.18', amount: '6.8518' },
          { price: '2754.45', amount: '4.1234' },
          { price: '2754.78', amount: '3.5678' },
        ],
      },
      {
        symbol: 'BTC/USDT',
        name: 'Bitcoin',
        currentPrice: 43256.82,
        change24h: 1245.67,
        changePercent: 2.97,
        high24h: 43890.50,
        low24h: 41920.30,
        volume24h: 2847.34,
        buyOrders: [
          { price: '43200.50', amount: '0.5234' },
          { price: '43180.20', amount: '1.2345' },
          { price: '43150.75', amount: '0.8967' },
          { price: '43120.30', amount: '0.6543' },
          { price: '43090.15', amount: '1.5678' },
          { price: '43050.80', amount: '0.4321' },
        ],
        sellOrders: [
          { price: '43280.90', amount: '0.7234' },
          { price: '43310.45', amount: '1.4567' },
          { price: '43340.20', amount: '0.9876' },
          { price: '43370.85', amount: '1.1234' },
          { price: '43400.50', amount: '0.5678' },
          { price: '43430.25', amount: '0.8901' },
        ],
      },
      {
        symbol: 'SOL/USDT',
        name: 'Solana',
        currentPrice: 98.67,
        change24h: 5.42,
        changePercent: 5.81,
        high24h: 102.30,
        low24h: 92.15,
        volume24h: 42156.89,
        buyOrders: [
          { price: '98.50', amount: '45.234' },
          { price: '98.35', amount: '78.567' },
          { price: '98.20', amount: '52.876' },
          { price: '98.05', amount: '61.345' },
          { price: '97.90', amount: '83.678' },
          { price: '97.75', amount: '38.901' },
        ],
        sellOrders: [
          { price: '98.85', amount: '56.456' },
          { price: '99.00', amount: '72.789' },
          { price: '99.15', amount: '64.234' },
          { price: '99.30', amount: '49.567' },
          { price: '99.45', amount: '81.890' },
          { price: '99.60', amount: '42.123' },
        ],
      },
      {
        symbol: 'MATIC/USDT',
        name: 'Polygon',
        currentPrice: 0.8234,
        change24h: 0.0534,
        changePercent: 6.93,
        high24h: 0.8890,
        low24h: 0.7620,
        volume24h: 3245678.12,
        buyOrders: [
          { price: '0.8220', amount: '2345.67' },
          { price: '0.8210', amount: '4567.89' },
          { price: '0.8200', amount: '3456.78' },
          { price: '0.8190', amount: '5678.90' },
          { price: '0.8180', amount: '6789.01' },
          { price: '0.8170', amount: '3901.23' },
        ],
        sellOrders: [
          { price: '0.8250', amount: '3456.78' },
          { price: '0.8260', amount: '5678.90' },
          { price: '0.8270', amount: '4567.89' },
          { price: '0.8280', amount: '3456.78' },
          { price: '0.8290', amount: '5678.90' },
          { price: '0.8300', amount: '2345.67' },
        ],
      },
      {
        symbol: 'AVAX/USDT',
        name: 'Avalanche',
        currentPrice: 35.42,
        change24h: -1.28,
        changePercent: -3.49,
        high24h: 37.80,
        low24h: 34.90,
        volume24h: 12345.67,
        buyOrders: [
          { price: '35.30', amount: '123.45' },
          { price: '35.20', amount: '234.56' },
          { price: '35.10', amount: '345.67' },
          { price: '35.00', amount: '456.78' },
          { price: '34.90', amount: '567.89' },
          { price: '34.80', amount: '678.90' },
        ],
        sellOrders: [
          { price: '35.55', amount: '234.56' },
          { price: '35.65', amount: '345.67' },
          { price: '35.75', amount: '456.78' },
          { price: '35.85', amount: '567.89' },
          { price: '35.95', amount: '678.90' },
          { price: '36.05', amount: '789.01' },
        ],
      },
    ],
  },
  {
    id: 'futures',
    name: '期货',
    coins: [
      {
        symbol: 'BTC/USDT',
        name: 'BTC 永续',
        currentPrice: 43280.50,
        change24h: 1268.90,
        changePercent: 3.02,
        high24h: 43920.80,
        low24h: 41950.20,
        volume24h: 3245.67,
        buyOrders: [
          { price: '43250.20', amount: '0.6234' },
          { price: '43220.50', amount: '1.3456' },
          { price: '43190.80', amount: '0.9876' },
          { price: '43160.30', amount: '0.7543' },
          { price: '43130.60', amount: '1.6789' },
          { price: '43100.90', amount: '0.5321' },
        ],
        sellOrders: [
          { price: '43310.80', amount: '0.8234' },
          { price: '43340.20', amount: '1.5678' },
          { price: '43370.60', amount: '1.0987' },
          { price: '43400.90', amount: '1.2345' },
          { price: '43430.30', amount: '0.6789' },
          { price: '43460.70', amount: '0.9012' },
        ],
      },
      {
        symbol: 'ETH/USDT',
        name: 'ETH 永续',
        currentPrice: 2768.34,
        change24h: -242.16,
        changePercent: -8.74,
        high24h: 3015.60,
        low24h: 2630.40,
        volume24h: 6234.56,
        buyOrders: [
          { price: '2760.50', amount: '3.5678' },
          { price: '2758.30', amount: '8.9012' },
          { price: '2756.10', amount: '4.3456' },
          { price: '2753.90', amount: '5.1234' },
          { price: '2751.70', amount: '6.7890' },
          { price: '2749.50', amount: '3.2345' },
        ],
        sellOrders: [
          { price: '2770.20', amount: '5.6789' },
          { price: '2772.40', amount: '8.9012' },
          { price: '2774.60', amount: '7.3456' },
          { price: '2776.80', amount: '6.1234' },
          { price: '2779.00', amount: '4.5678' },
          { price: '2781.20', amount: '3.9012' },
        ],
      },
      {
        symbol: 'XAU/USD',
        name: '黄金期货',
        currentPrice: 2034.50,
        change24h: 12.30,
        changePercent: 0.61,
        high24h: 2042.80,
        low24h: 2018.90,
        volume24h: 1234.56,
        buyOrders: [
          { price: '2033.20', amount: '12.34' },
          { price: '2032.50', amount: '23.45' },
          { price: '2031.80', amount: '34.56' },
          { price: '2031.10', amount: '45.67' },
          { price: '2030.40', amount: '56.78' },
          { price: '2029.70', amount: '67.89' },
        ],
        sellOrders: [
          { price: '2035.80', amount: '23.45' },
          { price: '2036.50', amount: '34.56' },
          { price: '2037.20', amount: '45.67' },
          { price: '2037.90', amount: '56.78' },
          { price: '2038.60', amount: '67.89' },
          { price: '2039.30', amount: '78.90' },
        ],
      },
    ],
  },
  {
    id: 'metals',
    name: '金属',
    coins: [
      {
        symbol: 'XAU/USD',
        name: '黄金',
        currentPrice: 2034.50,
        change24h: 12.30,
        changePercent: 0.61,
        high24h: 2042.80,
        low24h: 2018.90,
        volume24h: 1234.56,
        buyOrders: [
          { price: '2033.20', amount: '12.34' },
          { price: '2032.50', amount: '23.45' },
          { price: '2031.80', amount: '34.56' },
          { price: '2031.10', amount: '45.67' },
          { price: '2030.40', amount: '56.78' },
          { price: '2029.70', amount: '67.89' },
        ],
        sellOrders: [
          { price: '2035.80', amount: '23.45' },
          { price: '2036.50', amount: '34.56' },
          { price: '2037.20', amount: '45.67' },
          { price: '2037.90', amount: '56.78' },
          { price: '2038.60', amount: '67.89' },
          { price: '2039.30', amount: '78.90' },
        ],
      },
      {
        symbol: 'XAG/USD',
        name: '白银',
        currentPrice: 24.56,
        change24h: -0.34,
        changePercent: -1.37,
        high24h: 25.12,
        low24h: 24.32,
        volume24h: 5678.90,
        buyOrders: [
          { price: '24.52', amount: '234.56' },
          { price: '24.48', amount: '345.67' },
          { price: '24.44', amount: '456.78' },
          { price: '24.40', amount: '567.89' },
          { price: '24.36', amount: '678.90' },
          { price: '24.32', amount: '789.01' },
        ],
        sellOrders: [
          { price: '24.60', amount: '345.67' },
          { price: '24.64', amount: '456.78' },
          { price: '24.68', amount: '567.89' },
          { price: '24.72', amount: '678.90' },
          { price: '24.76', amount: '789.01' },
          { price: '24.80', amount: '890.12' },
        ],
      },
      {
        symbol: 'XPT/USD',
        name: '铂金',
        currentPrice: 956.80,
        change24h: 8.40,
        changePercent: 0.89,
        high24h: 968.50,
        low24h: 942.30,
        volume24h: 234.56,
        buyOrders: [
          { price: '955.20', amount: '5.67' },
          { price: '953.60', amount: '8.90' },
          { price: '952.00', amount: '12.34' },
          { price: '950.40', amount: '15.67' },
          { price: '948.80', amount: '18.90' },
          { price: '947.20', amount: '22.34' },
        ],
        sellOrders: [
          { price: '958.40', amount: '8.90' },
          { price: '960.00', amount: '12.34' },
          { price: '961.60', amount: '15.67' },
          { price: '963.20', amount: '18.90' },
          { price: '964.80', amount: '22.34' },
          { price: '966.40', amount: '25.67' },
        ],
      },
      {
        symbol: 'XCU/USD',
        name: '铜',
        currentPrice: 3.84,
        change24h: 0.12,
        changePercent: 3.23,
        high24h: 3.92,
        low24h: 3.68,
        volume24h: 12345.67,
        buyOrders: [
          { price: '3.82', amount: '567.89' },
          { price: '3.80', amount: '678.90' },
          { price: '3.78', amount: '789.01' },
          { price: '3.76', amount: '890.12' },
          { price: '3.74', amount: '901.23' },
          { price: '3.72', amount: '1012.34' },
        ],
        sellOrders: [
          { price: '3.86', amount: '678.90' },
          { price: '3.88', amount: '789.01' },
          { price: '3.90', amount: '890.12' },
          { price: '3.92', amount: '901.23' },
          { price: '3.94', amount: '1012.34' },
          { price: '3.96', amount: '1123.45' },
        ],
      },
    ],
  },
  {
    id: 'forex',
    name: '外汇',
    coins: [
      {
        symbol: 'EUR/USD',
        name: '欧元/美元',
        currentPrice: 1.0876,
        change24h: 0.0034,
        changePercent: 0.31,
        high24h: 1.0912,
        low24h: 1.0842,
        volume24h: 234567.89,
        buyOrders: [
          { price: '1.0874', amount: '12345.67' },
          { price: '1.0872', amount: '23456.78' },
          { price: '1.0870', amount: '34567.89' },
          { price: '1.0868', amount: '45678.90' },
          { price: '1.0866', amount: '56789.01' },
          { price: '1.0864', amount: '67890.12' },
        ],
        sellOrders: [
          { price: '1.0878', amount: '23456.78' },
          { price: '1.0880', amount: '34567.89' },
          { price: '1.0882', amount: '45678.90' },
          { price: '1.0884', amount: '56789.01' },
          { price: '1.0886', amount: '67890.12' },
          { price: '1.0888', amount: '78901.23' },
        ],
      },
      {
        symbol: 'GBP/USD',
        name: '英镑/美元',
        currentPrice: 1.2634,
        change24h: -0.0078,
        changePercent: -0.61,
        high24h: 1.2712,
        low24h: 1.2598,
        volume24h: 156789.01,
        buyOrders: [
          { price: '1.2630', amount: '8901.23' },
          { price: '1.2628', amount: '9012.34' },
          { price: '1.2626', amount: '10123.45' },
          { price: '1.2624', amount: '11234.56' },
          { price: '1.2622', amount: '12345.67' },
          { price: '1.2620', amount: '13456.78' },
        ],
        sellOrders: [
          { price: '1.2638', amount: '9012.34' },
          { price: '1.2640', amount: '10123.45' },
          { price: '1.2642', amount: '11234.56' },
          { price: '1.2644', amount: '12345.67' },
          { price: '1.2646', amount: '13456.78' },
          { price: '1.2648', amount: '14567.89' },
        ],
      },
      {
        symbol: 'USD/JPY',
        name: '美元/日元',
        currentPrice: 149.56,
        change24h: 0.78,
        changePercent: 0.52,
        high24h: 150.24,
        low24h: 148.32,
        volume24h: 345678.90,
        buyOrders: [
          { price: '149.52', amount: '15678.90' },
          { price: '149.48', amount: '16789.01' },
          { price: '149.44', amount: '17890.12' },
          { price: '149.40', amount: '18901.23' },
          { price: '149.36', amount: '19012.34' },
          { price: '149.32', amount: '20123.45' },
        ],
        sellOrders: [
          { price: '149.60', amount: '16789.01' },
          { price: '149.64', amount: '17890.12' },
          { price: '149.68', amount: '18901.23' },
          { price: '149.72', amount: '19012.34' },
          { price: '149.76', amount: '20123.45' },
          { price: '149.80', amount: '21234.56' },
        ],
      },
      {
        symbol: 'AUD/USD',
        name: '澳元/美元',
        currentPrice: 0.6523,
        change24h: 0.0045,
        changePercent: 0.69,
        high24h: 0.6578,
        low24h: 0.6498,
        volume24h: 123456.78,
        buyOrders: [
          { price: '0.6520', amount: '7890.12' },
          { price: '0.6518', amount: '8901.23' },
          { price: '0.6516', amount: '9012.34' },
          { price: '0.6514', amount: '10123.45' },
          { price: '0.6512', amount: '11234.56' },
          { price: '0.6510', amount: '12345.67' },
        ],
        sellOrders: [
          { price: '0.6526', amount: '8901.23' },
          { price: '0.6528', amount: '9012.34' },
          { price: '0.6530', amount: '10123.45' },
          { price: '0.6532', amount: '11234.56' },
          { price: '0.6534', amount: '12345.67' },
          { price: '0.6536', amount: '13456.78' },
        ],
      },
    ],
  },
];

// 时间周期选项
const timeIntervalsData: TimeInterval[] = [
  { value: '1m', label: '1min' },
  { value: '5m', label: '5min' },
  { value: '15m', label: '15min' },
  { value: '30m', label: '30min' },
  { value: '1h', label: '1hour' },
  { value: '4h', label: '4hour' },
  { value: '1d', label: '1day' },
  { value: '1w', label: '1week' },
];

/**
 * 获取交易对分类列表
 */
export async function fetchTradingPairs(): Promise<CoinCategory[]> {
  await delay(800);
  return coinCategoriesData;
}

/**
 * 获取时间周期选项
 */
export async function fetchTimeIntervals(): Promise<TimeInterval[]> {
  await delay(300);
  return timeIntervalsData;
}

/**
 * 获取 K 线数据（模拟）
 */
export async function fetchKLineData(symbol: string, interval: string): Promise<any> {
  await delay(800);
  // 这里返回模拟的 K 线数据
  // 实际实现中应该从真实 API 获取
  return {
    symbol,
    interval,
    data: [],
  };
}

/**
 * 获取订单簿数据（买卖盘）
 */
export async function fetchOrderBook(symbol: string): Promise<{ buyOrders: { price: string; amount: string }[]; sellOrders: { price: string; amount: string }[] }> {
  await delay(800);
  // 从分类数据中找到对应的币种
  for (const category of coinCategoriesData) {
    const coin = category.coins.find(c => c.symbol === symbol);
    if (coin) {
      return {
        buyOrders: coin.buyOrders,
        sellOrders: coin.sellOrders,
      };
    }
  }
  return { buyOrders: [], sellOrders: [] };
}

/**
 * 获取历史订单
 */
export async function fetchOrders(params?: { symbol?: string; status?: string }): Promise<any[]> {
  await delay(800);
  // 返回模拟订单数据
  return [];
}

