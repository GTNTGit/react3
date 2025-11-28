import React, { useState } from 'react';
import { X, AlertCircle, ChevronDown, Check } from 'lucide-react';
import { ThemeColors } from '../../types';

interface WithdrawModalProps {
  isOpen: boolean;
  onClose: () => void;
  colors: ThemeColors;
}

interface Network {
  id: string;
  name: string;
  fullName: string;
  minWithdraw: number;
  fee: number;
  arrivalTime: string;
}

const networks: Network[] = [
  { id: 'TRC20', name: 'TRC20', fullName: 'Tron (TRC20)', minWithdraw: 10, fee: 1, arrivalTime: '1-3分钟' },
  { id: 'ERC20', name: 'ERC20', fullName: 'Ethereum (ERC20)', minWithdraw: 20, fee: 5, arrivalTime: '5-10分钟' },
  { id: 'BEP20', name: 'BEP20', fullName: 'BSC (BEP20)', minWithdraw: 10, fee: 0.8, arrivalTime: '2-5分钟' },
  { id: 'POLYGON', name: 'Polygon', fullName: 'Polygon Network', minWithdraw: 10, fee: 0.5, arrivalTime: '3-5分钟' },
];

export function WithdrawModal({ isOpen, onClose, colors }: WithdrawModalProps) {
  const [selectedNetwork, setSelectedNetwork] = useState<Network>(networks[0]);
  const [showNetworkMenu, setShowNetworkMenu] = useState(false);
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');

  const availableBalance = 100000; // 可用余额

  const handleAmountChange = (value: string) => {
    setAmount(value);
    setError('');
    
    const numValue = parseFloat(value);
    if (numValue < selectedNetwork.minWithdraw) {
      setError(`最小提现金额为 ${selectedNetwork.minWithdraw} USDT`);
    } else if (numValue + selectedNetwork.fee > availableBalance) {
      setError('余额不足');
    }
  };

  const handleMaxClick = () => {
    const maxAmount = Math.max(0, availableBalance - selectedNetwork.fee);
    setAmount(maxAmount.toFixed(2));
    setError('');
  };

  const handleWithdraw = () => {
    if (!address) {
      setError('请输入提现地址');
      return;
    }
    if (!amount) {
      setError('请输入提现数量');
      return;
    }
    const numValue = parseFloat(amount);
    if (numValue < selectedNetwork.minWithdraw) {
      setError(`最小提现金额为 ${selectedNetwork.minWithdraw} USDT`);
      return;
    }
    if (numValue + selectedNetwork.fee > availableBalance) {
      setError('余额不足');
      return;
    }

    // 这里执行提现逻辑
    alert(`提现成功！\n网络: ${selectedNetwork.name}\n地址: ${address}\n数量: ${amount} USDT\n手续费: ${selectedNetwork.fee} USDT`);
    onClose();
  };

  if (!isOpen) return null;

  const receiveAmount = amount ? Math.max(0, parseFloat(amount) - selectedNetwork.fee) : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      {/* 背景遮罩 */}
      <div 
        className="absolute inset-0 backdrop-blur-sm"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
      />

      {/* 弹窗内容 */}
      <div 
        className="relative w-full max-w-md rounded-3xl overflow-hidden"
        style={{ 
          backgroundColor: colors.cardBg,
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 头部 */}
        <div 
          className="px-6 py-5 border-b"
          style={{ borderColor: colors.border }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold mb-1" style={{ color: colors.text }}>
                提现 USDT
              </h3>
              <p className="text-xs" style={{ color: colors.textSecondary }}>
                可用余额: {availableBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })} USDT
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-xl flex items-center justify-center transition-all active:scale-90"
              style={{ backgroundColor: `${colors.primary}15` }}
            >
              <X className="w-5 h-5" style={{ color: colors.primary }} />
            </button>
          </div>
        </div>

        {/* 内容区 */}
        <div className="px-6 py-5 max-h-[70vh] overflow-y-auto">
          {/* 网络选择 */}
          <div className="mb-5">
            <label className="block text-sm font-semibold mb-3" style={{ color: colors.text }}>
              选择网络
            </label>
            <div className="relative">
              <button
                onClick={() => setShowNetworkMenu(!showNetworkMenu)}
                className="w-full px-4 py-3 rounded-xl flex items-center justify-between transition-all"
                style={{ 
                  backgroundColor: colors.isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
                  border: `1px solid ${colors.border}`,
                }}
              >
                <div className="flex items-center gap-3">
                  <div 
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold"
                    style={{ 
                      backgroundColor: `${colors.primary}20`,
                      color: colors.primary,
                    }}
                  >
                    {selectedNetwork.name.slice(0, 2)}
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-semibold" style={{ color: colors.text }}>
                      {selectedNetwork.name}
                    </div>
                    <div className="text-xs" style={{ color: colors.textSecondary }}>
                      手续费: {selectedNetwork.fee} USDT
                    </div>
                  </div>
                </div>
                <ChevronDown 
                  className={`w-5 h-5 transition-transform ${showNetworkMenu ? 'rotate-180' : ''}`}
                  style={{ color: colors.textSecondary }} 
                />
              </button>

              {/* 网络下拉菜单 */}
              {showNetworkMenu && (
                <div 
                  className="absolute top-full left-0 right-0 mt-2 rounded-xl overflow-hidden z-10"
                  style={{ 
                    backgroundColor: colors.cardBg,
                    border: `1px solid ${colors.border}`,
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
                  }}
                >
                  {networks.map((network) => (
                    <button
                      key={network.id}
                      onClick={() => {
                        setSelectedNetwork(network);
                        setShowNetworkMenu(false);
                        setError('');
                      }}
                      className="w-full px-4 py-3 flex items-center gap-3 transition-all"
                      style={{ 
                        backgroundColor: selectedNetwork.id === network.id ? `${colors.primary}15` : 'transparent',
                      }}
                    >
                      <div 
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0"
                        style={{ 
                          backgroundColor: `${colors.primary}20`,
                          color: colors.primary,
                        }}
                      >
                        {network.name.slice(0, 2)}
                      </div>
                      <div className="text-left flex-1">
                        <div className="text-sm font-semibold" style={{ color: colors.text }}>
                          {network.name}
                        </div>
                        <div className="text-xs" style={{ color: colors.textSecondary }}>
                          手续费: {network.fee} USDT
                        </div>
                      </div>
                      {selectedNetwork.id === network.id && (
                        <Check className="w-4 h-4" style={{ color: colors.primary }} />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* 提现地址 */}
          <div className="mb-5">
            <label className="block text-sm font-semibold mb-3" style={{ color: colors.text }}>
              提现地址
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
                setError('');
              }}
              placeholder="请输入或粘贴提现地址"
              className="w-full px-4 py-3 rounded-xl text-sm transition-all outline-none"
              style={{ 
                backgroundColor: colors.isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
                border: `1px solid ${error && !address ? colors.danger : colors.border}`,
                color: colors.text,
              }}
            />
          </div>

          {/* 提现数量 */}
          <div className="mb-5">
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-semibold" style={{ color: colors.text }}>
                提现数量
              </label>
              <button
                onClick={handleMaxClick}
                className="text-xs font-semibold px-2 py-1 rounded transition-all active:scale-90"
                style={{ 
                  color: colors.primary,
                  backgroundColor: `${colors.primary}15`,
                }}
              >
                全部
              </button>
            </div>
            <div 
              className="px-4 py-3 rounded-xl flex items-center gap-3 transition-all"
              style={{ 
                backgroundColor: colors.isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
                border: `1px solid ${error && amount ? colors.danger : colors.border}`,
              }}
            >
              <input
                type="number"
                value={amount}
                onChange={(e) => handleAmountChange(e.target.value)}
                placeholder="0.00"
                className="flex-1 bg-transparent outline-none text-sm"
                style={{ color: colors.text }}
              />
              <span className="text-sm font-semibold" style={{ color: colors.textSecondary }}>
                USDT
              </span>
            </div>
          </div>

          {/* 错误提示 */}
          {error && (
            <div 
              className="mb-5 px-4 py-3 rounded-xl flex items-start gap-3"
              style={{ 
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.2)',
              }}
            >
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#ef4444' }} />
              <p className="text-sm" style={{ color: '#ef4444' }}>
                {error}
              </p>
            </div>
          )}

          {/* 提现信息 */}
          <div 
            className="mb-5 p-4 rounded-xl space-y-3"
            style={{ 
              backgroundColor: colors.isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
              border: `1px solid ${colors.border}`,
            }}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm" style={{ color: colors.textSecondary }}>
                手续费
              </span>
              <span className="text-sm font-semibold" style={{ color: colors.text }}>
                {selectedNetwork.fee} USDT
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm" style={{ color: colors.textSecondary }}>
                实际到账
              </span>
              <span className="text-sm font-bold" style={{ color: colors.primary }}>
                {receiveAmount.toFixed(2)} USDT
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm" style={{ color: colors.textSecondary }}>
                预计到账时间
              </span>
              <span className="text-sm" style={{ color: colors.textSecondary }}>
                {selectedNetwork.arrivalTime}
              </span>
            </div>
          </div>

          {/* 提现须知 */}
          <div 
            className="mb-5 p-4 rounded-xl"
            style={{ 
              backgroundColor: colors.isDark ? 'rgba(245, 158, 11, 0.1)' : 'rgba(245, 158, 11, 0.05)',
              border: `1px solid ${colors.primary}30`,
            }}
          >
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: colors.primary }} />
              <div>
                <div className="text-sm font-semibold mb-2" style={{ color: colors.text }}>
                  提现须知
                </div>
                <div className="space-y-1.5">
                  <p className="text-xs" style={{ color: colors.textSecondary }}>
                    • 最小提现金额: {selectedNetwork.minWithdraw} USDT
                  </p>
                  <p className="text-xs" style={{ color: colors.textSecondary }}>
                    • 提现手续费: {selectedNetwork.fee} USDT
                  </p>
                  <p className="text-xs" style={{ color: colors.textSecondary }}>
                    • 请确保提现地址正确，资产一旦转出无法撤回
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 提现按钮 */}
          <button
            onClick={handleWithdraw}
            disabled={!!error || !address || !amount}
            className="w-full py-4 rounded-xl font-bold text-white transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ 
              background: `linear-gradient(135deg, ${colors.primary} 0%, #D97706 100%)`,
            }}
          >
            确认提现
          </button>
        </div>
      </div>
    </div>
  );
}
