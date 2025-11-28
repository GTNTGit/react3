import React, { useState } from 'react';
import { Eye, EyeOff, Plus, Minus, RefreshCw, History, ChevronRight, TrendingUp, Wallet, Lock, Zap } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

interface WalletPageProps {
}

const assetTypes = ['现货', '合约', '理财', 'C2C'];

const assets = [
  { symbol: 'BTC', name: 'Bitcoin', amount: '0.5234', usdValue: '22,650.50', change: '+2.45', locked: '0.0000' },
  { symbol: 'ETH', name: 'Ethereum', amount: '5.8932', usdValue: '13,438.20', change: '+3.12', locked: '0.0000' },
  { symbol: 'USDT', name: 'Tether', amount: '10,234.50', usdValue: '10,234.50', change: '0.00', locked: '0.0000' },
  { symbol: 'BNB', name: 'BNB', amount: '12.3456', usdValue: '3,862.40', change: '-1.23', locked: '0.0000' },
];

export function WalletPage({}: WalletPageProps) {
  const { colors } = useTheme();
  const [showBalance, setShowBalance] = useState(true);
  const [activeType, setActiveType] = useState('现货');

  return (
    <div className="min-h-screen pb-4">
      {/* Total Assets Card */}
      <div className="px-4 py-3">
        <div
          className="p-5 rounded-2xl relative overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${colors.primary}15 0%, ${colors.primary}08 50%, transparent 100%)`,
            border: `1px solid ${colors.primary}30`,
          }}
        >
          {/* Decorative Elements */}
          <div
            className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-20"
            style={{
              background: `radial-gradient(circle, ${colors.primary} 0%, transparent 70%)`,
              transform: 'translate(30%, -30%)',
            }}
          />

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Wallet className="w-5 h-5" style={{ color: colors.primary }} />
                <span className="text-sm" style={{ color: colors.textSecondary }}>
                  总资产折合 (USDT)
                </span>
              </div>
              <button
                onClick={() => setShowBalance(!showBalance)}
                className="w-8 h-8 rounded-lg flex items-center justify-center active:scale-90 transition-all"
                style={{ backgroundColor: `${colors.primary}20` }}
              >
                {showBalance ? (
                  <Eye className="w-4 h-4" style={{ color: colors.primary }} />
                ) : (
                  <EyeOff className="w-4 h-4" style={{ color: colors.primary }} />
                )}
              </button>
            </div>

            <div className="mb-3">
              {showBalance ? (
                <>
                  <div className="text-3xl mb-1" style={{ color: colors.text }}>
                    50,185.60
                  </div>
                  <div className="text-sm" style={{ color: colors.textSecondary }}>
                    ≈ ¥362,340.00
                  </div>
                </>
              ) : (
                <div className="text-3xl" style={{ color: colors.text }}>
                  ********
                </div>
              )}
            </div>

            {showBalance && (
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" style={{ color: colors.success }} />
                <span className="text-sm" style={{ color: colors.success }}>
                  今日收益 +1,234.50 (+2.52%)
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-4 pb-3">
        <div className="grid grid-cols-4 gap-2">
          {[
            { icon: Plus, label: '充币', color: colors.success },
            { icon: Minus, label: '提币', color: colors.danger },
            { icon: RefreshCw, label: '划转', color: colors.primary },
            { icon: History, label: '记录', color: colors.textSecondary },
          ].map((action) => (
            <button
              key={action.label}
              className="p-3 rounded-xl active:scale-95 transition-all"
              style={{
                backgroundColor: colors.cardBg,
                border: `1px solid ${colors.border}`,
              }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-2"
                style={{
                  background: `linear-gradient(135deg, ${action.color}20 0%, ${action.color}10 100%)`,
                }}
              >
                <action.icon className="w-5 h-5" style={{ color: action.color }} />
              </div>
              <div className="text-xs text-center" style={{ color: colors.text }}>
                {action.label}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Asset Type Tabs */}
      <div className="px-4 pb-3">
        <div className="flex gap-2 overflow-x-auto">
          {assetTypes.map((type) => (
            <button
              key={type}
              onClick={() => setActiveType(type)}
              className="px-4 py-1.5 rounded-lg whitespace-nowrap text-sm transition-all active:scale-95"
              style={{
                backgroundColor: activeType === type ? `${colors.primary}20` : colors.cardBg,
                color: activeType === type ? colors.primary : colors.textSecondary,
                border: `1px solid ${activeType === type ? colors.primary : colors.border}`,
              }}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Assets Overview Cards */}
      <div className="px-4 pb-3">
        <div className="grid grid-cols-2 gap-2">
          <div
            className="p-3 rounded-xl"
            style={{
              backgroundColor: colors.cardBg,
              border: `1px solid ${colors.border}`,
            }}
          >
            <div className="text-xs mb-1" style={{ color: colors.textSecondary }}>
              可用资产
            </div>
            <div style={{ color: colors.text }}>
              {showBalance ? '48,950.00' : '****'}
            </div>
          </div>
          <div
            className="p-3 rounded-xl"
            style={{
              backgroundColor: colors.cardBg,
              border: `1px solid ${colors.border}`,
            }}
          >
            <div className="text-xs mb-1" style={{ color: colors.textSecondary }}>
              冻结资产
            </div>
            <div style={{ color: colors.text }}>
              {showBalance ? '1,235.60' : '****'}
            </div>
          </div>
        </div>
      </div>

      {/* Hide Small Balances */}
      <div className="px-4 pb-3">
        <div className="flex items-center justify-between">
          <span className="text-sm" style={{ color: colors.text }}>隐藏小额资产</span>
          <button
            className="w-11 h-6 rounded-full transition-all relative"
            style={{
              backgroundColor: `${colors.primary}30`,
            }}
          >
            <div
              className="w-5 h-5 rounded-full absolute top-0.5 left-0.5 transition-all"
              style={{
                backgroundColor: colors.primary,
              }}
            />
          </button>
        </div>
      </div>

      {/* Asset List */}
      <div className="px-4 space-y-2">
        {assets.map((asset) => {
          const isPositive = asset.change.startsWith('+');
          return (
            <div
              key={asset.symbol}
              className="p-4 rounded-xl"
              style={{
                backgroundColor: colors.cardBg,
                border: `1px solid ${colors.border}`,
              }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg, ${colors.primary}20 0%, ${colors.primary}10 100%)`,
                    }}
                  >
                    <span style={{ color: colors.primary }}>
                      {asset.symbol.slice(0, 1)}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <span style={{ color: colors.text }}>{asset.symbol}</span>
                      <span
                        className="text-xs px-1.5 py-0.5 rounded"
                        style={{
                          backgroundColor: isPositive ? `${colors.success}20` : `${colors.danger}20`,
                          color: isPositive ? colors.success : colors.danger,
                        }}
                      >
                        {asset.change}%
                      </span>
                    </div>
                    <div className="text-xs" style={{ color: colors.textSecondary }}>
                      {asset.name}
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5" style={{ color: colors.textSecondary }} />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="text-xs mb-1" style={{ color: colors.textSecondary }}>
                    可用
                  </div>
                  <div className="text-sm" style={{ color: colors.text }}>
                    {showBalance ? asset.amount : '****'}
                  </div>
                  <div className="text-xs mt-0.5" style={{ color: colors.textSecondary }}>
                    ≈ ${showBalance ? asset.usdValue : '****'}
                  </div>
                </div>
                <div>
                  <div className="text-xs mb-1" style={{ color: colors.textSecondary }}>
                    冻结
                  </div>
                  <div className="text-sm" style={{ color: colors.text }}>
                    {showBalance ? asset.locked : '****'}
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex gap-2 mt-3 pt-3" style={{ borderTop: `1px solid ${colors.border}` }}>
                <button
                  className="flex-1 py-1.5 rounded-lg text-xs transition-all active:scale-95"
                  style={{
                    backgroundColor: `${colors.success}15`,
                    color: colors.success,
                  }}
                >
                  充币
                </button>
                <button
                  className="flex-1 py-1.5 rounded-lg text-xs transition-all active:scale-95"
                  style={{
                    backgroundColor: `${colors.danger}15`,
                    color: colors.danger,
                  }}
                >
                  提币
                </button>
                <button
                  className="flex-1 py-1.5 rounded-lg text-xs transition-all active:scale-95"
                  style={{
                    backgroundColor: `${colors.primary}15`,
                    color: colors.primary,
                  }}
                >
                  交易
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Financial Products */}
      <div className="px-4 pt-4">
        <div className="text-sm mb-2" style={{ color: colors.text }}>💰 理财产品</div>
        <div className="grid grid-cols-2 gap-2">
          <div
            className="p-3 rounded-xl"
            style={{
              background: `linear-gradient(135deg, ${colors.cardBg} 0%, ${colors.primary}08 100%)`,
              border: `1px solid ${colors.border}`,
            }}
          >
            <Lock className="w-5 h-5 mb-2" style={{ color: colors.primary }} />
            <div className="text-xs mb-1" style={{ color: colors.textSecondary }}>
              定期理财
            </div>
            <div className="text-sm" style={{ color: colors.text }}>
              最高年化 <span style={{ color: colors.primary }}>12%</span>
            </div>
          </div>
          <div
            className="p-3 rounded-xl"
            style={{
              background: `linear-gradient(135deg, ${colors.cardBg} 0%, ${colors.success}08 100%)`,
              border: `1px solid ${colors.border}`,
            }}
          >
            <Zap className="w-5 h-5 mb-2" style={{ color: colors.success }} />
            <div className="text-xs mb-1" style={{ color: colors.textSecondary }}>
              活期理财
            </div>
            <div className="text-sm" style={{ color: colors.text }}>
              随存随取 <span style={{ color: colors.success }}>8%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}