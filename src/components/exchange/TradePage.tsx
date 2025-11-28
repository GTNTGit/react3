import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, ChevronDown, TrendingUp, TrendingDown, ChevronUp, Star } from 'lucide-react';
import { OrderConfirmModal } from './OrderConfirmModal';
import { CandlestickChart } from './CandlestickChart';
import { useLockBodyScroll } from '../../hooks/useLockBodyScroll';
import { PairSelectorModal } from './PairSelectorModal';
import { useTheme } from '../../contexts/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { fetchTradingPairs, fetchTimeIntervals, type CoinData, type CoinCategory, type TimeInterval } from '../../services/tradeService';

interface TradePageProps {
  onBack?: () => void; // 新增返回回调
}

// 多个币种数据（已移至 tradeService）
const coinsData: CoinData[] = [
  {
    symbol: 'ETH/USDT',
    name: 'ETH 现货',
    currentPrice: 2762.6901,
    change24h: -247.82,
    changePercent: -8.94,
    high24h: 3008.5200,
    low24h: 2624.2800,
    volume24h: 5928.6877,
    buyOrders: [
      { price: '2750.2346', amount: '3.1069' },
      { price: '2750.4162', amount: '8.0992' },
      { price: '2750.5000', amount: '3.8568' },
      { price: '2750.6605', amount: '4.6621' },
      { price: '2749.8923', amount: '5.2341' },
      { price: '2749.5612', amount: '2.8764' },
    ],
    sellOrders: [
      { price: '2753.7454', amount: '5.2125' },
      { price: '2753.9069', amount: '8.3143' },
      { price: '2754.0532', amount: '7.7230' },
      { price: '2754.1865', amount: '6.8518' },
      { price: '2754.4521', amount: '4.1234' },
      { price: '2754.7890', amount: '3.5678' },
    ],
  },
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
    symbol: 'BNB/USDT',
    name: 'BNB 期权',
    currentPrice: 312.45,
    change24h: -8.32,
    changePercent: -2.59,
    high24h: 325.80,
    low24h: 308.20,
    volume24h: 18934.5621,
    buyOrders: [
      { price: '312.20', amount: '15.234' },
      { price: '312.05', amount: '28.567' },
      { price: '311.90', amount: '19.876' },
      { price: '311.75', amount: '22.345' },
      { price: '311.60', amount: '31.678' },
      { price: '311.45', amount: '12.901' },
    ],
    sellOrders: [
      { price: '312.70', amount: '18.456' },
      { price: '312.85', amount: '25.789' },
      { price: '313.00', amount: '21.234' },
      { price: '313.15', amount: '17.567' },
      { price: '313.30', amount: '29.890' },
      { price: '313.45', amount: '14.123' },
    ],
  },
  {
    symbol: 'SOL/USDT',
    name: 'SOL 期权',
    currentPrice: 98.67,
    change24h: 5.42,
    changePercent: 5.81,
    high24h: 102.30,
    low24h: 92.15,
    volume24h: 42156.8934,
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
    symbol: 'XRP/USDT',
    name: 'XRP 期权',
    currentPrice: 0.5834,
    change24h: 0.0234,
    changePercent: 4.18,
    high24h: 0.6120,
    low24h: 0.5520,
    volume24h: 9845672.34,
    buyOrders: [
      { price: '0.5820', amount: '1234.56' },
      { price: '0.5810', amount: '2567.89' },
      { price: '0.5800', amount: '1876.54' },
      { price: '0.5790', amount: '2345.67' },
      { price: '0.5780', amount: '3678.90' },
      { price: '0.5770', amount: '1901.23' },
    ],
    sellOrders: [
      { price: '0.5850', amount: '1456.78' },
      { price: '0.5860', amount: '2789.01' },
      { price: '0.5870', amount: '2234.56' },
      { price: '0.5880', amount: '1567.89' },
      { price: '0.5890', amount: '2890.12' },
      { price: '0.5900', amount: '1123.45' },
    ],
  },
];

// 分类币种数据（已移至 tradeService）
const coinCategories: CoinCategory[] = [
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

// 时间周期选项（已移至 tradeService）
const timeIntervals: TimeInterval[] = [];

export function TradePage({ onBack }: TradePageProps) {
  const { colors } = useTheme();
  const navigate = useNavigate();
  const isDark = colors.bg === '#0A0E17' || colors.bg.startsWith('#0') || colors.bg.startsWith('#1');
  
  // 数据加载状态
  const [isLoading, setIsLoading] = useState(true);
  const [coinCategories, setCoinCategories] = useState<CoinCategory[]>([]);
  const [timeIntervals, setTimeIntervals] = useState<TimeInterval[]>([]);
  
  const [activeInterval, setActiveInterval] = useState('5m');
  const [activeTab, setActiveTab] = useState<'book' | 'trades'>('book');
  
  // 主页面显示的币种 - 独立状态
  const [currentDisplayCoin, setCurrentDisplayCoin] = useState<CoinData | null>(null);
  
  // 选择器相关状态
  const [selectedCategoryId, setSelectedCategoryId] = useState('favorites'); // 选中的分类
  const [showCoinSelector, setShowCoinSelector] = useState(false); // 币种选择器显示状态
  const [favorites, setFavorites] = useState<string[]>(['BTC/USDT', 'ETH/USDT']); // 收藏列表
  
  const [showOrderModal, setShowOrderModal] = useState(false); // 订单确认弹窗显示状态
  const [orderType, setOrderType] = useState<'buy' | 'sell'>('buy'); // 订单类型
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const [chartWidth, setChartWidth] = useState(0);

  // 锁定 body 滚动
  useLockBodyScroll(showCoinSelector || showOrderModal);

  // 加载数据
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const [categories, intervals] = await Promise.all([
          fetchTradingPairs(),
          fetchTimeIntervals(),
        ]);
        setCoinCategories(categories);
        setTimeIntervals(intervals);
        // 设置默认显示的币种
        if (categories.length > 0 && categories[0].coins.length > 0) {
          setCurrentDisplayCoin(categories[0].coins[0]);
        }
      } catch (error) {
        console.error('Failed to load trading data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  // 获取当前选中的分类（仅用于弹窗显示）
  const currentCategory = coinCategories.find(cat => cat.id === selectedCategoryId) || coinCategories[0];
  
  // 使用独立的币种数据
  const currentCoin = currentDisplayCoin;
  const buyOrders = currentCoin?.buyOrders || [];
  const sellOrders = currentCoin?.sellOrders || [];
  
  // 计算最大数量用于量能条百分比
  const maxBuyAmount = buyOrders.length > 0 ? Math.max(...buyOrders.map(o => parseFloat(o.amount))) : 1;
  const maxSellAmount = sellOrders.length > 0 ? Math.max(...sellOrders.map(o => parseFloat(o.amount))) : 1;

  // 转换数据格式以适配统一的 PairSelectorModal
  // 使用 Map 去重，确保每个币种只出现一次
  const tradingPairsMap = new Map();
  
  coinCategories.forEach(category => {
    category.coins.forEach(coin => {
      const symbol = coin.symbol.replace('/', '');
      // 如果已经存在，跳过（避免重复）
      if (!tradingPairsMap.has(symbol)) {
        tradingPairsMap.set(symbol, {
          symbol: symbol,
          name: coin.symbol,
          fullName: coin.name,
          currentPrice: coin.currentPrice,
          change24h: coin.changePercent,
          category: category.id === 'favorites' ? 'web3' : category.id,
          color: coin.symbol.includes('BTC') ? '#F7931A' : 
                 coin.symbol.includes('ETH') ? '#627EEA' :
                 coin.symbol.includes('SOL') ? '#14F195' :
                 coin.symbol.includes('BNB') ? '#F3BA2F' :
                 coin.symbol.includes('XRP') ? '#23292F' :
                 coin.symbol.includes('XAU') ? '#FFD700' :
                 coin.symbol.includes('XAG') ? '#C0C0C0' :
                 coin.symbol.includes('EUR') ? '#003399' :
                 coin.symbol.includes('GBP') ? '#C8102E' :
                 coin.symbol.includes('JPY') ? '#BC002D' :
                 coin.symbol.includes('MATIC') ? '#8247E5' :
                 coin.symbol.includes('AVAX') ? '#E84142' :
                 coin.symbol.includes('XPT') ? '#E5E4E2' :
                 coin.symbol.includes('XCU') ? '#B87333' :
                 coin.symbol.includes('AUD') ? '#00008B' : '#6366F1',
          icon: coin.symbol.includes('BTC') ? 'https://assets.coincap.io/assets/icons/btc@2x.png' :
                coin.symbol.includes('ETH') ? 'https://assets.coincap.io/assets/icons/eth@2x.png' :
                coin.symbol.includes('SOL') ? 'https://assets.coincap.io/assets/icons/sol@2x.png' :
                coin.symbol.includes('BNB') ? 'https://assets.coincap.io/assets/icons/bnb@2x.png' :
                coin.symbol.includes('XRP') ? 'https://assets.coincap.io/assets/icons/xrp@2x.png' :
                coin.symbol.includes('MATIC') ? 'https://assets.coincap.io/assets/icons/matic@2x.png' :
                coin.symbol.includes('AVAX') ? 'https://assets.coincap.io/assets/icons/avax@2x.png' :
                coin.symbol.includes('XAU') ? 'https://cdn-icons-png.flaticon.com/128/7396/7396388.png' :
                coin.symbol.includes('XAG') ? 'https://cdn-icons-png.flaticon.com/128/2553/2553639.png' :
                coin.symbol.includes('XPT') ? 'https://cdn-icons-png.flaticon.com/128/2553/2553639.png' :
                coin.symbol.includes('XCU') ? 'https://cdn-icons-png.flaticon.com/128/2917/2917995.png' :
                coin.symbol.includes('EUR') ? 'https://cdn-icons-png.flaticon.com/128/197/197615.png' :
                coin.symbol.includes('GBP') ? 'https://cdn-icons-png.flaticon.com/128/197/197374.png' :
                coin.symbol.includes('JPY') ? 'https://cdn-icons-png.flaticon.com/128/197/197604.png' :
                coin.symbol.includes('AUD') ? 'https://cdn-icons-png.flaticon.com/128/197/197507.png' :
                'https://cdn-icons-png.flaticon.com/128/2922/2922719.png',
        });
      }
    });
  });
  
  const tradingPairs = Array.from(tradingPairsMap.values());

  const toggleFavorite = (symbol: string) => {
    setFavorites(prev => 
      prev.includes(symbol) 
        ? prev.filter(s => s !== symbol)
        : [...prev, symbol]
    );
  };

  // 当前选中的交易对（用于弹窗）
  const selectedPair = currentCoin ? {
    symbol: currentCoin.symbol.replace('/', ''),
    name: currentCoin.symbol,
    fullName: currentCoin.name,
    currentPrice: currentCoin.currentPrice,
    change24h: currentCoin.changePercent,
    category: 'web3' as const,
    color: currentCoin.symbol.includes('BTC') ? '#F7931A' : '#627EEA',
    icon: currentCoin.symbol.includes('BTC') ? 'https://assets.coincap.io/assets/icons/btc@2x.png' : 'https://assets.coincap.io/assets/icons/eth@2x.png',
  } : null;

  // 获取容器宽度
  useEffect(() => {
    if (chartContainerRef.current) {
      setChartWidth(chartContainerRef.current.clientWidth);
    }
  }, []);

  // Loading 骨架屏
  if (isLoading || !currentCoin) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center" style={{ backgroundColor: colors.bg }}>
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 rounded-full animate-spin" style={{ borderColor: `${colors.primary}30`, borderTopColor: colors.primary }}></div>
          <div className="text-sm" style={{ color: colors.textSecondary }}>加载中...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: colors.bg }}>
      {/* 顶部导航栏 */}
      <div 
        className="sticky top-0 z-50 px-4 py-3 flex items-center justify-between"
        style={{ 
          backgroundColor: colors.cardBg,
          borderBottom: `1px solid ${colors.border}`,
        }}
      >
        <div className="flex items-center gap-3">
          <button 
            className="w-8 h-8 flex items-center justify-center active:scale-90 transition-all"
            onClick={onBack || (() => navigate(-1))}
          >
            <ArrowLeft className="w-5 h-5" style={{ color: colors.text }} />
          </button>
          <button 
            onClick={() => setShowCoinSelector(true)}
            className="flex items-center gap-1.5 active:scale-95 transition-all"
          >
            <span style={{ color: colors.text }}>{currentCoin.name}</span>
            <ChevronDown className="w-4 h-4" style={{ color: colors.textSecondary }} />
          </button>
        </div>
        <div 
          className="px-2 py-1 rounded"
          style={{ 
            backgroundColor: currentCoin.changePercent >= 0 ? `${colors.success}20` : `${colors.danger}20`,
            color: currentCoin.changePercent >= 0 ? colors.success : colors.danger,
          }}
        >
          <span className="text-sm">{currentCoin.changePercent >= 0 ? '+' : ''}{currentCoin.changePercent.toFixed(2)} %</span>
        </div>
      </div>

      {/* 价格信息区 - 有底部间隔 */}
      <div className="px-4 py-3 mb-3" style={{ borderBottom: `1px solid ${colors.border}` }}>
        <div className="flex items-start justify-between">
          {/* 当前价格 */}
          <div>
            <div 
              className="text-3xl mb-1"
              style={{ color: currentCoin.changePercent >= 0 ? colors.success : colors.danger }}
            >
              {currentCoin.currentPrice.toFixed(currentCoin.currentPrice < 1 ? 4 : 2)}
            </div>
          </div>
          
          {/* 右侧价格信息 */}
          <div className="text-right space-y-0.5">
            <div className="flex items-center justify-end gap-2">
              <span className="text-xs" style={{ color: colors.textSecondary }}>高</span>
              <span className="text-xs" style={{ color: colors.text }}>{currentCoin.high24h.toFixed(currentCoin.high24h < 1 ? 4 : 2)}</span>
            </div>
            <div className="flex items-center justify-end gap-2">
              <span className="text-xs" style={{ color: colors.textSecondary }}>低</span>
              <span className="text-xs" style={{ color: colors.text }}>{currentCoin.low24h.toFixed(currentCoin.low24h < 1 ? 4 : 2)}</span>
            </div>
            <div className="flex items-center justify-end gap-2">
              <span className="text-xs" style={{ color: colors.textSecondary }}>24h量</span>
              <span className="text-xs" style={{ color: colors.text }}>{currentCoin.volume24h.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* K线图表区域（融合时间选项）- 无左右padding铺满屏幕 */}
      <div className="mb-3">
        <div 
          style={{
            backgroundColor: colors.cardBg,
          }}
        >
          {/* 时间周期选择器 - 在图表内部 */}
          <div className="px-3 pt-3 pb-2">
            <div className="flex gap-1.5 overflow-x-auto">
              {timeIntervals.map((interval) => (
                <button
                  key={interval.value}
                  onClick={() => setActiveInterval(interval.value)}
                  className="px-3 py-1.5 rounded-lg text-xs whitespace-nowrap transition-all active:scale-95"
                  style={{
                    backgroundColor: activeInterval === interval.value 
                      ? `${colors.success}` 
                      : colors.bg,
                    color: activeInterval === interval.value 
                      ? '#ffffff' 
                      : colors.textSecondary,
                    border: `1px solid ${activeInterval === interval.value ? colors.success : colors.border}`,
                  }}
                >
                  {interval.label}
                </button>
              ))}
            </div>
          </div>

          {/* 图表信息栏 */}
          <div className="px-3 py-2 flex items-center justify-between text-xs" style={{ borderTop: `1px solid ${colors.border}`, borderBottom: `1px solid ${colors.border}` }}>
            <div className="flex items-center gap-2">
              <span style={{ color: colors.textSecondary }}>DMETH/USDT, 5</span>
            </div>
            <div className="flex items-center gap-3">
              <span style={{ color: colors.text }}>开: 2753.66</span>
              <span style={{ color: colors.success }}>高: 2753.66</span>
              <span style={{ color: colors.danger }}>低: 2749.78</span>
              <span style={{ color: colors.text }}>收: 2751.97</span>
              <span style={{ color: colors.danger }}>-17.48 (-0.63%)</span>
            </div>
          </div>
          
          {/* 图表主体区域 - Canvas K线图 */}
          <div ref={chartContainerRef} style={{ height: '280px', backgroundColor: colors.bg }}>
            {chartWidth > 0 && (
              <CandlestickChart
                width={chartWidth}
                height={280}
              />
            )}
          </div>
          
          {/* TradingView 标识 */}
          <div className="px-3 pb-2 flex items-center justify-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill={colors.textSecondary}>
              <path d="M4 4h16v16H4V4z"/>
            </svg>
            <span className="text-xs" style={{ color: colors.textSecondary }}>
              Chart by TradingView
            </span>
          </div>
        </div>
      </div>

      {/* 底部交易面板 - 无左右padding铺满屏幕 */}
      <div className="flex-1 flex flex-col pb-20">
        {/* Tab切换 */}
        <div className="px-4 pb-2">
          <div className="flex gap-4 border-b" style={{ borderColor: colors.border }}>
            <button
              onClick={() => setActiveTab('book')}
              className="pb-2 text-sm transition-all relative"
              style={{
                color: activeTab === 'book' ? colors.text : colors.textSecondary,
              }}
            >
              盘口
              {activeTab === 'book' && (
                <div 
                  className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                  style={{ backgroundColor: colors.primary }}
                />
              )}
            </button>
            <button
              onClick={() => setActiveTab('trades')}
              className="pb-2 text-sm transition-all relative"
              style={{
                color: activeTab === 'trades' ? colors.text : colors.textSecondary,
              }}
            >
              即时成交
              {activeTab === 'trades' && (
                <div 
                  className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                  style={{ backgroundColor: colors.primary }}
                />
              )}
            </button>
          </div>
        </div>

        {/* 盘口数据表格 - 左右分栏，无padding铺满屏幕 */}
        {activeTab === 'book' && (
          <div className="flex-1 overflow-y-auto pb-24">
            {/* 表头 */}
            <div className="flex gap-0 text-xs mb-2 px-4" style={{ color: colors.textSecondary }}>
              {/* 左侧买盘表头 */}
              <div className="flex-1 flex">
                <div className="flex-1 text-left">数量(ETH)</div>
                <div className="flex-1 text-right">价格(USDT)</div>
              </div>
              {/* 中间分隔 */}
              <div className="w-px mx-2" style={{ backgroundColor: colors.border }}></div>
              {/* 右侧卖盘表头 */}
              <div className="flex-1 flex">
                <div className="flex-1 text-left">价格(USDT)</div>
                <div className="flex-1 text-right">数量(ETH)</div>
              </div>
            </div>

            {/* 数据行 - 左右并排 */}
            <div className="space-y-1 pb-4">
              {Array.from({ length: Math.max(buyOrders.length, sellOrders.length) }).map((_, index) => (
                <div key={index} className="flex gap-0">
                  {/* 左侧：买盘（绿色）带量能条背景 */}
                  <div className="flex-1 flex relative overflow-hidden">
                    {buyOrders[index] && (
                      <>
                        {/* 量能条背景 */}
                        <div 
                          className="absolute top-0 right-0 bottom-0 transition-all"
                          style={{ 
                            width: `${(parseFloat(buyOrders[index].amount) / maxBuyAmount) * 100}%`,
                            backgroundColor: `${colors.success}15`,
                          }}
                        />
                        {/* 数据内容 */}
                        <div className="flex-1 text-left text-sm relative z-10 py-2 pl-4" style={{ color: colors.text }}>
                          {buyOrders[index].amount}
                        </div>
                        <div className="flex-1 text-right relative z-10 py-2 pr-2" style={{ color: colors.success }}>
                          {buyOrders[index].price}
                        </div>
                      </>
                    )}
                    {!buyOrders[index] && (
                      <>
                        <div className="flex-1"></div>
                        <div className="flex-1"></div>
                      </>
                    )}
                  </div>
                  
                  {/* 中间分隔线 */}
                  <div className="w-px" style={{ backgroundColor: colors.border }}></div>
                  
                  {/* 右侧：卖盘（红色）带量能条背景 */}
                  <div className="flex-1 flex relative overflow-hidden">
                    {sellOrders[index] && (
                      <>
                        {/* 量能条背景 */}
                        <div 
                          className="absolute top-0 left-0 bottom-0 transition-all"
                          style={{ 
                            width: `${(parseFloat(sellOrders[index].amount) / maxSellAmount) * 100}%`,
                            backgroundColor: `${colors.danger}15`,
                          }}
                        />
                        {/* 数据内容 */}
                        <div className="flex-1 text-left relative z-10 py-2 pl-2" style={{ color: colors.danger }}>
                          {sellOrders[index].price}
                        </div>
                        <div className="flex-1 text-right text-sm relative z-10 py-2 pr-4" style={{ color: colors.text }}>
                          {sellOrders[index].amount}
                        </div>
                      </>
                    )}
                    {!sellOrders[index] && (
                      <>
                        <div className="flex-1"></div>
                        <div className="flex-1"></div>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 即时成交（占位） */}
        {activeTab === 'trades' && (
          <div className="flex-1 flex items-center justify-center overflow-y-auto">
            <div className="text-center">
              <div className="text-4xl mb-2">💹</div>
              <div className="text-sm" style={{ color: colors.textSecondary }}>
                即时成交数据
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 底部买卖按钮 - 浮空效果带背景 */}
      <div 
        className="fixed bottom-0 left-0 right-0 px-4 py-3 flex gap-3 z-50" 
        style={{ 
          backgroundColor: colors.bg,
          borderTop: `1px solid ${colors.border}`,
        }}
      >
        <button
          className="flex-1 py-3.5 rounded-xl text-white transition-all active:scale-98"
          style={{
            background: `linear-gradient(135deg, ${colors.danger} 0%, #dc2626 100%)`,
            boxShadow: `0 8px 20px ${colors.danger}60`,
          }}
          onClick={() => {
            setOrderType('sell');
            setShowOrderModal(true);
          }}
        >
          卖出
        </button>
        <button
          className="flex-1 py-3.5 rounded-xl text-white transition-all active:scale-98"
          style={{
            background: `linear-gradient(135deg, ${colors.success} 0%, #059669 100%)`,
            boxShadow: `0 8px 20px ${colors.success}60`,
          }}
          onClick={() => {
            setOrderType('buy');
            setShowOrderModal(true);
          }}
        >
          买入
        </button>
      </div>

      {/* 币种选择弹窗 - 使用统一的 PairSelectorModal 组件 */}
      {selectedPair && (
        <PairSelectorModal
          isOpen={showCoinSelector}
          onClose={() => setShowCoinSelector(false)}
          selectedPair={selectedPair}
          onSelectPair={(pair) => {
            // 根据选中的交易对找到对应的 CoinData
            const matchedCoin = coinCategories
              .flatMap(cat => cat.coins)
              .find(coin => coin.symbol.replace('/', '') === pair.symbol);
            
            if (matchedCoin) {
              setCurrentDisplayCoin(matchedCoin);
            }
          }}
          tradingPairs={tradingPairs}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
          isDark={isDark}
        />
      )}

      {/* 订单确认弹窗 */}
      {showOrderModal && currentCoin && selectedPair && (
        <OrderConfirmModal
          coin={selectedPair}
          orderType={orderType}
          onClose={() => setShowOrderModal(false)}
        />
      )}
    </div>
  );
}