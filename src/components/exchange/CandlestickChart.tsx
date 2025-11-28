import React, { useEffect, useRef } from 'react';
import { useTheme } from '../../contexts/ThemeContext';

interface CandlestickData {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
}

interface CandlestickChartProps {
  width: number;
  height: number;
}

// 模拟K线数据
const generateMockData = (): CandlestickData[] => {
  const data: CandlestickData[] = [];
  let basePrice = 2750;
  
  for (let i = 0; i < 50; i++) {
    const change = (Math.random() - 0.5) * 20;
    const open = basePrice;
    const close = basePrice + change;
    const high = Math.max(open, close) + Math.random() * 10;
    const low = Math.min(open, close) - Math.random() * 10;
    
    data.push({
      time: `${i}`,
      open,
      high,
      low,
      close,
    });
    
    basePrice = close;
  }
  
  return data;
};

export function CandlestickChart({ width, height }: CandlestickChartProps) {
  const { colors } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // 设置canvas分辨率
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);
    
    // 清空画布
    ctx.fillStyle = colors.bg;
    ctx.fillRect(0, 0, width, height);
    
    // 获取数据
    const data = generateMockData();
    
    // 计算价格范围
    let minPrice = Infinity;
    let maxPrice = -Infinity;
    
    data.forEach(candle => {
      minPrice = Math.min(minPrice, candle.low);
      maxPrice = Math.max(maxPrice, candle.high);
    });
    
    const priceRange = maxPrice - minPrice;
    const padding = 40;
    const chartHeight = height - padding * 2;
    const chartWidth = width - padding * 2;
    const candleWidth = chartWidth / data.length;
    
    // 绘制网格线
    ctx.strokeStyle = colors.border;
    ctx.lineWidth = 0.5;
    
    // 水平网格线
    for (let i = 0; i <= 5; i++) {
      const y = padding + (chartHeight / 5) * i;
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      ctx.stroke();
      
      // 价格标签
      const price = maxPrice - (priceRange / 5) * i;
      ctx.fillStyle = colors.textSecondary;
      ctx.font = '10px sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(price.toFixed(2), padding - 5, y + 3);
    }
    
    // 垂直网格线
    for (let i = 0; i <= 6; i++) {
      const x = padding + (chartWidth / 6) * i;
      ctx.beginPath();
      ctx.moveTo(x, padding);
      ctx.lineTo(x, height - padding);
      ctx.stroke();
    }
    
    // 绘制K线
    data.forEach((candle, index) => {
      const x = padding + index * candleWidth + candleWidth / 2;
      
      // 计算Y坐标
      const openY = padding + ((maxPrice - candle.open) / priceRange) * chartHeight;
      const closeY = padding + ((maxPrice - candle.close) / priceRange) * chartHeight;
      const highY = padding + ((maxPrice - candle.high) / priceRange) * chartHeight;
      const lowY = padding + ((maxPrice - candle.low) / priceRange) * chartHeight;
      
      const isGreen = candle.close >= candle.open;
      const color = isGreen ? colors.success : colors.danger;
      
      // 绘制影线（细线）
      ctx.strokeStyle = color;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x, highY);
      ctx.lineTo(x, lowY);
      ctx.stroke();
      
      // 绘制实体（矩形）
      const bodyTop = Math.min(openY, closeY);
      const bodyHeight = Math.abs(closeY - openY) || 1;
      const bodyWidth = candleWidth * 0.6;
      
      ctx.fillStyle = color;
      ctx.fillRect(x - bodyWidth / 2, bodyTop, bodyWidth, bodyHeight);
    });
    
  }, [colors, width, height]);
  
  return (
    <canvas
      ref={canvasRef}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        display: 'block',
      }}
    />
  );
}
