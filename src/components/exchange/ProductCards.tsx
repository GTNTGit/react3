import React from 'react';
import { Coins, Rocket, Zap } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const products = [
  {
    icon: Coins,
    name: 'USDT 定期',
    apr: '100.00%',
    period: '7天',
    type: '理财',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  },
  {
    icon: Rocket,
    name: 'COMMON',
    label: '新币上线',
    change: '+234.5%',
    type: '新币',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
  },
];

interface ProductCardsProps {
}

export function ProductCards({}: ProductCardsProps) {
  const { colors } = useTheme();
  return (
    <div className="py-2">
      <div className="flex items-center justify-between mb-3">
        <h3 style={{ color: colors.text }}>热门产品</h3>
        <button className="text-sm active:opacity-70" style={{ color: colors.textSecondary }}>
          查看全部 →
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {products.map((product, index) => (
          <button
            key={index}
            className="rounded-2xl border p-4 text-left active:opacity-90 relative overflow-hidden group transition-all"
            style={{ 
              backgroundColor: colors.cardBg,
              borderColor: colors.border
            }}
          >
            {/* Gradient Glow */}
            <div 
              className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-3xl opacity-0 group-active:opacity-30 transition-opacity"
              style={{ background: product.gradient }}
            />

            <div className="relative">
              <div className="flex items-center gap-2 mb-3">
                <div 
                  className="w-10 h-10 rounded-xl flex items-center justify-center relative"
                  style={{ background: product.gradient }}
                >
                  <product.icon className="w-6 h-6 text-white" strokeWidth={1.5} />
                </div>
                <span className="text-xs px-2 py-1 rounded-md" style={{ 
                  color: colors.primary,
                  backgroundColor: `${colors.primary}15`
                }}>
                  {product.type}
                </span>
              </div>

              <div className="mb-2" style={{ color: colors.text }}>{product.name}</div>

              {product.apr && (
                <div className="mb-1">
                  <span className="text-xs" style={{ color: colors.textSecondary }}>APR </span>
                  <span className="text-lg" style={{ color: colors.primary }}>{product.apr}</span>
                </div>
              )}

              {product.change && (
                <div className="text-lg mb-1" style={{ color: '#10b981' }}>{product.change}</div>
              )}

              {product.period && (
                <div className="text-xs" style={{ color: colors.textSecondary }}>周期：{product.period}</div>
              )}

              {product.label && (
                <div className="text-xs" style={{ color: colors.textSecondary }}>{product.label}</div>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
