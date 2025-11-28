import React, { useState } from 'react';
import { X, Copy, Check, AlertCircle, ChevronDown } from 'lucide-react';
import { ThemeColors } from '../../types';

interface DepositModalProps {
  isOpen: boolean;
  onClose: () => void;
  colors: ThemeColors;
}

interface Network {
  id: string;
  name: string;
  fullName: string;
  minDeposit: number;
  confirmations: number;
  arrivalTime: string;
}

const networks: Network[] = [
  { id: 'TRC20', name: 'TRC20', fullName: 'Tron (TRC20)', minDeposit: 1, confirmations: 19, arrivalTime: '1-3分钟' },
  { id: 'ERC20', name: 'ERC20', fullName: 'Ethereum (ERC20)', minDeposit: 10, confirmations: 12, arrivalTime: '5-10分钟' },
  { id: 'BEP20', name: 'BEP20', fullName: 'BSC (BEP20)', minDeposit: 1, confirmations: 15, arrivalTime: '2-5分钟' },
  { id: 'POLYGON', name: 'Polygon', fullName: 'Polygon Network', minDeposit: 1, confirmations: 128, arrivalTime: '3-5分钟' },
];

export function DepositModal({ isOpen, onClose, colors }: DepositModalProps) {
  const [selectedNetwork, setSelectedNetwork] = useState<Network>(networks[0]);
  const [copied, setCopied] = useState(false);
  const [showNetworkMenu, setShowNetworkMenu] = useState(false);

  // 模拟充值地址
  const depositAddress = 'TXhZn3kLHsKjDWGJfJKHKGHkjhKJHGhjKH3456789';

  const handleCopy = () => {
    // 使用更兼容的复制方法
    const textArea = document.createElement('textarea');
    textArea.value = depositAddress;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      document.execCommand('copy');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('复制失败:', err);
    }
    
    document.body.removeChild(textArea);
  };

  if (!isOpen) return null;

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
                充值 USDT
              </h3>
              <p className="text-xs" style={{ color: colors.textSecondary }}>
                选择网络并发送资产到以下地址
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
          <div className="mb-6">
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
                      {selectedNetwork.fullName}
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
                          到账: {network.arrivalTime}
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

          {/* 充值地址 */}
          <div className="mb-6">
            <label className="block text-sm font-semibold mb-3" style={{ color: colors.text }}>
              充值地址
            </label>
            <div 
              className="p-4 rounded-xl"
              style={{ 
                backgroundColor: colors.isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
                border: `1px solid ${colors.border}`,
              }}
            >
              <div className="text-sm font-mono break-all mb-3" style={{ color: colors.text }}>
                {depositAddress}
              </div>
              <button
                onClick={handleCopy}
                className="w-full py-2.5 rounded-lg flex items-center justify-center gap-2 transition-all active:scale-95"
                style={{ 
                  backgroundColor: `${colors.primary}20`,
                  color: colors.primary,
                }}
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span className="text-sm font-semibold">已复制</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span className="text-sm font-semibold">复制地址</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* 二维码 */}
          <div className="mb-6">
            <label className="block text-sm font-semibold mb-3" style={{ color: colors.text }}>
              扫码充值
            </label>
            <div 
              className="p-6 rounded-xl flex flex-col items-center"
              style={{ 
                backgroundColor: colors.isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
                border: `1px solid ${colors.border}`,
              }}
            >
              {/* 模拟二维码 */}
              <div 
                className="w-48 h-48 rounded-xl mb-3 flex items-center justify-center"
                style={{ 
                  backgroundColor: '#FFFFFF',
                  backgroundImage: 'linear-gradient(45deg, #f0f0f0 25%, transparent 25%, transparent 75%, #f0f0f0 75%, #f0f0f0), linear-gradient(45deg, #f0f0f0 25%, transparent 25%, transparent 75%, #f0f0f0 75%, #f0f0f0)',
                  backgroundSize: '20px 20px',
                  backgroundPosition: '0 0, 10px 10px',
                }}
              >
                <span className="text-4xl font-black" style={{ color: colors.primary }}>
                  QR
                </span>
              </div>
              <p className="text-xs text-center" style={{ color: colors.textSecondary }}>
                使用钱包App扫描二维码充值
              </p>
            </div>
          </div>

          {/* 网络信息 */}
          <div 
            className="p-4 rounded-xl"
            style={{ 
              backgroundColor: colors.isDark ? 'rgba(245, 158, 11, 0.1)' : 'rgba(245, 158, 11, 0.05)',
              border: `1px solid ${colors.primary}30`,
            }}
          >
            <div className="flex items-start gap-3 mb-3">
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: colors.primary }} />
              <div>
                <div className="text-sm font-semibold mb-2" style={{ color: colors.text }}>
                  充值须知
                </div>
                <div className="space-y-1.5">
                  <p className="text-xs" style={{ color: colors.textSecondary }}>
                    • 最小充值金额: {selectedNetwork.minDeposit} USDT
                  </p>
                  <p className="text-xs" style={{ color: colors.textSecondary }}>
                    • 网络确认数: {selectedNetwork.confirmations} 个区块
                  </p>
                  <p className="text-xs" style={{ color: colors.textSecondary }}>
                    • 预计到账: {selectedNetwork.arrivalTime}
                  </p>
                  <p className="text-xs" style={{ color: colors.textSecondary }}>
                    • 请勿充值非 USDT 资产到此地址
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}