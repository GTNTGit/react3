import React, { useState } from 'react';
import { X, TrendingUp, TrendingDown, Clock, Wallet, DollarSign, Zap, ArrowRight, Percent } from 'lucide-react';
import { useLockBodyScroll } from '../../hooks/useLockBodyScroll';
import { useTheme } from '../../contexts/ThemeContext';
import { TradingPair } from '../../types';

interface OrderConfirmModalProps {
  onClose: () => void;
  orderType: 'buy' | 'sell'; // 'buy' = 买涨, 'sell' = 买跌
  coin: TradingPair;
}

const timeOptions = [
  { value: 40, label: '40s', profit: 85 },
  { value: 80, label: '80s', profit: 90 },
  { value: 180, label: '3min', profit: 92 },
  { value: 300, label: '5min', profit: 95 },
  { value: 420, label: '7min', profit: 98 },
  { value: 600, label: '10min', profit: 102 },
];

const quickAmounts = [100, 500, 1000, 5000];

export function OrderConfirmModal({ 
  onClose, 
  orderType, 
  coin
}: OrderConfirmModalProps) {
  const { colors } = useTheme();
  const [selectedTime, setSelectedTime] = useState(40);
  const [amount, setAmount] = useState('');
  
  // 锁定 body 滚动
  useLockBodyScroll(true);
  
  const isBuy = orderType === 'buy';
  const themeColor = isBuy ? colors.success : colors.danger;
  const directionText = isBuy ? '买涨' : '买跌';
  const directionIcon = isBuy ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />;

  // 计算预计收益
  const selectedOption = timeOptions.find(opt => opt.value === selectedTime);
  const profitRate = selectedOption?.profit || 85;
  const investAmount = parseFloat(amount) || 0;
  const estimatedProfit = investAmount > 0 ? (investAmount * profitRate / 100).toFixed(2) : '0.00';
  const totalReturn = investAmount > 0 ? (investAmount + parseFloat(estimatedProfit)).toFixed(2) : '0.00';

  // 模拟余额
  const balance = 8654.00000000;

  return (
    <div 
      className="fixed inset-0 z-[200] flex items-end"
      style={{ 
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        touchAction: 'none', // 禁止触摸操作
        overflowY: 'hidden', // 禁止滚动
      }}
      onClick={onClose}
      onTouchStart={(e) => e.preventDefault()} // 阻止触摸开始
      onTouchMove={(e) => e.preventDefault()} // 阻止触摸滑动
      onTouchEnd={(e) => e.preventDefault()} // 阻止触摸结束
      onWheel={(e) => e.preventDefault()} // 阻止鼠标滚轮
    >
      <div 
        className="w-full max-w-md rounded-t-[28px] overflow-hidden relative"
        style={{ 
          backgroundColor: colors.cardBg,
          maxHeight: 'calc(100vh - 80px)', // 动态计算，总是留出80px显示底部按钮
          touchAction: 'pan-y', // 只允许垂直滚动
        }}
        onClick={(e) => e.stopPropagation()}
        onTouchStart={(e) => e.stopPropagation()} // 允许弹窗内触摸
        onTouchMove={(e) => e.stopPropagation()} // 允许弹窗内滚动
        onTouchEnd={(e) => e.stopPropagation()} // 允许弹窗内触摸结束
        onWheel={(e) => e.stopPropagation()} // 允许弹窗内鼠标滚轮
      >
        {/* 顶部拖动指示器 */}
        <div className="flex justify-center pt-3 pb-2">
          <div 
            className="w-10 h-1 rounded-full"
            style={{ backgroundColor: colors.border }}
          />
        </div>

        {/* 精简头部 - 只显示币种和方向 */}
        <div className="px-5 pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              {/* 方向图标 */}
              <div 
                className="w-11 h-11 rounded-xl flex items-center justify-center relative overflow-hidden"
                style={{ 
                  background: `linear-gradient(135deg, ${themeColor} 0%, ${themeColor}dd 100%)`,
                  boxShadow: `0 4px 12px ${themeColor}40`,
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent" />
                <div className="text-white relative z-10">
                  {directionIcon}
                </div>
              </div>
              
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-lg" style={{ color: colors.text }}>{coin.symbol}</span>
                  <div 
                    className="px-2 py-0.5 rounded-md text-xs text-white"
                    style={{ backgroundColor: themeColor }}
                  >
                    {directionText}
                  </div>
                </div>
                <div className="text-xs mt-0.5" style={{ color: colors.textSecondary }}>
                  期权交易
                </div>
              </div>
            </div>
            
            <button 
              onClick={onClose}
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-all active:scale-90"
              style={{ 
                backgroundColor: colors.bg,
              }}
            >
              <X className="w-4 h-4" style={{ color: colors.textSecondary }} />
            </button>
          </div>
        </div>

        {/* 分隔线 */}
        <div className="h-px mx-5" style={{ backgroundColor: colors.border }} />

        {/* 内容区域 - 可滚动 */}
        <div className="px-5 pt-4 pb-4 space-y-4 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 190px)' }}>
          {/* 到期时间选择 */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" style={{ color: colors.primary }} />
                <span className="text-sm" style={{ color: colors.text }}>到期时间</span>
              </div>
              <div className="flex items-center gap-1 text-xs" style={{ color: themeColor }}>
                <Zap className="w-3 h-3" />
                <span>{profitRate}% 收益</span>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {timeOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setSelectedTime(option.value)}
                  className="relative py-2.5 rounded-lg transition-all active:scale-95 overflow-hidden"
                  style={{
                    backgroundColor: selectedTime === option.value 
                      ? themeColor
                      : colors.bg,
                    border: `1.5px solid ${selectedTime === option.value ? themeColor : colors.border}`,
                  }}
                >
                  {selectedTime === option.value && (
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
                  )}
                  <div className="relative z-10">
                    <div 
                      className="text-sm"
                      style={{ 
                        color: selectedTime === option.value ? '#ffffff' : colors.text 
                      }}
                    >
                      {option.label}
                    </div>
                    <div 
                      className="text-xs mt-0.5"
                      style={{ 
                        color: selectedTime === option.value 
                          ? 'rgba(255, 255, 255, 0.8)' 
                          : colors.textSecondary 
                      }}
                    >
                      {option.profit}%
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* 交易金额 */}
          <div>
            <div className="flex items-center gap-1.5 mb-2.5">
              <DollarSign className="w-3.5 h-3.5" style={{ color: colors.primary }} />
              <span className="text-sm" style={{ color: colors.text }}>投资金额</span>
            </div>
            
            {/* 快捷金额按钮 */}
            <div className="grid grid-cols-4 gap-2 mb-2">
              {quickAmounts.map((amt) => (
                <button
                  key={amt}
                  onClick={() => setAmount(amt.toString())}
                  className="py-1.5 rounded-lg text-xs transition-all active:scale-95"
                  style={{
                    backgroundColor: amount === amt.toString() 
                      ? `${themeColor}20` 
                      : colors.bg,
                    border: `1px solid ${amount === amt.toString() ? themeColor : colors.border}`,
                    color: amount === amt.toString() ? themeColor : colors.textSecondary,
                  }}
                >
                  {amt}
                </button>
              ))}
            </div>
            
            {/* 输入框 */}
            <div 
              className="rounded-lg overflow-hidden flex items-center gap-2"
              style={{ 
                border: `1.5px solid ${colors.border}`,
                backgroundColor: colors.bg,
              }}
            >
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="输入自定义金额"
                className="flex-1 px-3 py-2.5 outline-none bg-transparent text-sm"
                style={{ color: colors.text }}
              />
              <div className="pr-3 text-xs" style={{ color: colors.textSecondary }}>
                USDT
              </div>
            </div>
            <div className="mt-1.5 text-xs flex items-center justify-between">
              <span style={{ color: colors.textSecondary }}>最低 10.00 USDT</span>
              <div className="flex items-center gap-1">
                <Wallet className="w-3 h-3" style={{ color: colors.textSecondary }} />
                <span style={{ color: colors.textSecondary }}>
                  余额: {balance.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* 收益信息 - 精简列表 */}
          <div 
            className="rounded-xl p-3 space-y-2"
            style={{ 
              backgroundColor: colors.bg,
              border: `1px solid ${colors.border}`,
            }}
          >
            {/* 投资金额 */}
            <div className="flex items-center justify-between text-sm">
              <span style={{ color: colors.textSecondary }}>投资金额</span>
              <span style={{ color: colors.text }}>
                {investAmount.toFixed(2)} USDT
              </span>
            </div>
            
            {/* 预计收益 */}
            <div className="flex items-center justify-between text-sm">
              <span style={{ color: colors.textSecondary }}>预计收益</span>
              <span style={{ color: themeColor }}>
                +{estimatedProfit} USDT
              </span>
            </div>
            
            {/* 分隔线 */}
            <div className="h-px" style={{ backgroundColor: colors.border }} />
            
            {/* 总计返还 */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Zap className="w-4 h-4" style={{ color: themeColor }} />
                <span style={{ color: colors.text }}>总计返还</span>
              </div>
              <span className="text-lg" style={{ color: themeColor }}>
                {totalReturn} USDT
              </span>
            </div>
          </div>

          {/* 底部按钮 */}
          <div className="flex gap-2.5 pt-1">
            <button
              onClick={onClose}
              className="px-5 py-3 rounded-xl transition-all active:scale-95"
              style={{
                backgroundColor: colors.bg,
                border: `1.5px solid ${colors.border}`,
                color: colors.textSecondary,
              }}
            >
              取消
            </button>
            <button
              className="flex-1 py-3 rounded-xl text-white transition-all active:scale-95 relative overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${themeColor} 0%, ${isBuy ? '#059669' : '#dc2626'} 100%)`,
                boxShadow: `0 6px 20px ${themeColor}40`,
              }}
            >
              <span className="relative z-10">确认{directionText}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}