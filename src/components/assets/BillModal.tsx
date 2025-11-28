import React, { useState } from 'react';
import { X, ArrowDownToLine, ArrowUpFromLine, ArrowLeftRight, Filter, Calendar } from 'lucide-react';
import { ThemeColors } from '../../types';

interface BillModalProps {
  isOpen: boolean;
  onClose: () => void;
  colors: ThemeColors;
}

type BillType = 'all' | 'deposit' | 'withdraw' | 'transfer' | 'trade';
type TimeRange = '7d' | '30d' | '90d' | 'all';

interface Bill {
  id: string;
  type: BillType;
  amount: number;
  currency: string;
  time: string;
  status: 'completed' | 'pending' | 'failed';
  description: string;
}

const mockBills: Bill[] = [
  {
    id: '1',
    type: 'deposit',
    amount: 5000,
    currency: 'USDT',
    time: '2024-01-15 14:32:18',
    status: 'completed',
    description: 'TRC20 充值',
  },
  {
    id: '2',
    type: 'transfer',
    amount: -2000,
    currency: 'USDT',
    time: '2024-01-15 10:18:45',
    status: 'completed',
    description: '现货 → 合约',
  },
  {
    id: '3',
    type: 'trade',
    amount: 1250.50,
    currency: 'USDT',
    time: '2024-01-14 16:22:33',
    status: 'completed',
    description: 'BTC/USDT 交易收益',
  },
  {
    id: '4',
    type: 'withdraw',
    amount: -1000,
    currency: 'USDT',
    time: '2024-01-14 09:15:20',
    status: 'completed',
    description: 'TRC20 提现',
  },
  {
    id: '5',
    type: 'transfer',
    amount: 3000,
    currency: 'USDT',
    time: '2024-01-13 18:45:12',
    status: 'completed',
    description: '合约 → 现货',
  },
  {
    id: '6',
    type: 'deposit',
    amount: 10000,
    currency: 'USDT',
    time: '2024-01-12 12:30:00',
    status: 'completed',
    description: 'ERC20 充值',
  },
  {
    id: '7',
    type: 'trade',
    amount: -450.25,
    currency: 'USDT',
    time: '2024-01-12 08:20:15',
    status: 'completed',
    description: 'ETH/USDT 交易亏损',
  },
  {
    id: '8',
    type: 'withdraw',
    amount: -500,
    currency: 'USDT',
    time: '2024-01-11 15:10:30',
    status: 'pending',
    description: 'BEP20 提现（处理中）',
  },
];

export function BillModal({ isOpen, onClose, colors }: BillModalProps) {
  const [billType, setBillType] = useState<BillType>('all');
  const [timeRange, setTimeRange] = useState<TimeRange>('30d');
  const [showFilters, setShowFilters] = useState(false);

  const filteredBills = mockBills.filter(bill => {
    if (billType !== 'all' && bill.type !== billType) return false;
    // 这里可以添加时间范围过滤逻辑
    return true;
  });

  const getTypeIcon = (type: BillType) => {
    switch (type) {
      case 'deposit':
        return <ArrowDownToLine className="w-4 h-4" />;
      case 'withdraw':
        return <ArrowUpFromLine className="w-4 h-4" />;
      case 'transfer':
        return <ArrowLeftRight className="w-4 h-4" />;
      default:
        return <ArrowLeftRight className="w-4 h-4" />;
    }
  };

  const getTypeName = (type: BillType) => {
    switch (type) {
      case 'deposit':
        return '充值';
      case 'withdraw':
        return '提现';
      case 'transfer':
        return '划转';
      case 'trade':
        return '交易';
      default:
        return '其他';
    }
  };

  const getTypeColor = (type: BillType) => {
    switch (type) {
      case 'deposit':
        return colors.success;
      case 'withdraw':
        return colors.danger;
      case 'transfer':
        return colors.primary;
      case 'trade':
        return '#8B5CF6';
      default:
        return colors.textSecondary;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return '已完成';
      case 'pending':
        return '处理中';
      case 'failed':
        return '失败';
      default:
        return '';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return colors.success;
      case 'pending':
        return colors.primary;
      case 'failed':
        return colors.danger;
      default:
        return colors.textSecondary;
    }
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
        className="relative w-full max-w-md rounded-3xl overflow-hidden flex flex-col"
        style={{ 
          backgroundColor: colors.cardBg,
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
          maxHeight: '90vh',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 头部 */}
        <div 
          className="px-6 py-5 border-b flex-shrink-0"
          style={{ borderColor: colors.border }}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xl font-bold mb-1" style={{ color: colors.text }}>
                资金账单
              </h3>
              <p className="text-xs" style={{ color: colors.textSecondary }}>
                查看所有资金流水记录
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

          {/* 快捷筛选 */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-3 py-2 rounded-lg flex items-center gap-2 text-xs font-semibold transition-all active:scale-95"
              style={{ 
                backgroundColor: `${colors.primary}15`,
                color: colors.primary,
              }}
            >
              <Filter className="w-3.5 h-3.5" />
              筛选
            </button>
            {['all', 'deposit', 'withdraw', 'transfer', 'trade'].map((type) => (
              <button
                key={type}
                onClick={() => setBillType(type as BillType)}
                className="px-3 py-2 rounded-lg text-xs font-semibold transition-all active:scale-95"
                style={{ 
                  backgroundColor: billType === type ? `${colors.primary}20` : 'transparent',
                  color: billType === type ? colors.primary : colors.textSecondary,
                  border: `1px solid ${billType === type ? colors.primary : colors.border}`,
                }}
              >
                {type === 'all' ? '全部' : getTypeName(type as BillType)}
              </button>
            ))}
          </div>

          {/* 时间范围筛选 */}
          {showFilters && (
            <div className="mt-3 pt-3 border-t" style={{ borderColor: colors.border }}>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" style={{ color: colors.textSecondary }} />
                {['7d', '30d', '90d', 'all'].map((range) => (
                  <button
                    key={range}
                    onClick={() => setTimeRange(range as TimeRange)}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all active:scale-95"
                    style={{ 
                      backgroundColor: timeRange === range ? `${colors.primary}20` : 'transparent',
                      color: timeRange === range ? colors.primary : colors.textSecondary,
                    }}
                  >
                    {range === '7d' && '7天'}
                    {range === '30d' && '30天'}
                    {range === '90d' && '90天'}
                    {range === 'all' && '全部'}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 账单列表 */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {filteredBills.length > 0 ? (
            <div className="space-y-3">
              {filteredBills.map((bill) => (
                <div
                  key={bill.id}
                  className="p-4 rounded-xl transition-all active:opacity-70"
                  style={{ 
                    backgroundColor: colors.isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
                    border: `1px solid ${colors.border}`,
                  }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{ 
                          backgroundColor: `${getTypeColor(bill.type)}15`,
                          color: getTypeColor(bill.type),
                        }}
                      >
                        {getTypeIcon(bill.type)}
                      </div>
                      <div>
                        <div className="font-semibold mb-0.5" style={{ color: colors.text, fontSize: '15px' }}>
                          {getTypeName(bill.type)}
                        </div>
                        <div className="text-xs" style={{ color: colors.textSecondary }}>
                          {bill.description}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div 
                        className="font-bold mb-0.5"
                        style={{ 
                          color: bill.amount > 0 ? colors.success : colors.danger,
                          fontSize: '16px',
                        }}
                      >
                        {bill.amount > 0 ? '+' : ''}{bill.amount.toFixed(2)}
                      </div>
                      <div className="text-xs" style={{ color: colors.textSecondary }}>
                        {bill.currency}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-2 mt-2 border-t" style={{ borderColor: colors.border }}>
                    <span className="text-xs" style={{ color: colors.textSecondary }}>
                      {bill.time}
                    </span>
                    <span 
                      className="text-xs font-semibold px-2 py-0.5 rounded"
                      style={{ 
                        backgroundColor: `${getStatusColor(bill.status)}15`,
                        color: getStatusColor(bill.status),
                      }}
                    >
                      {getStatusText(bill.status)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-16 text-center">
              <div 
                className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center"
                style={{ 
                  backgroundColor: `${colors.primary}15`,
                  color: colors.primary,
                }}
              >
                <Calendar className="w-8 h-8" />
              </div>
              <p className="text-sm font-medium" style={{ color: colors.textSecondary }}>
                暂无账单记录
              </p>
            </div>
          )}
        </div>

        {/* 底部统计 */}
        {filteredBills.length > 0 && (
          <div 
            className="px-6 py-4 border-t flex-shrink-0"
            style={{ borderColor: colors.border }}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm" style={{ color: colors.textSecondary }}>
                共 {filteredBills.length} 条记录
              </span>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-xs mb-0.5" style={{ color: colors.textSecondary }}>
                    收入
                  </div>
                  <div className="text-sm font-bold" style={{ color: colors.success }}>
                    +{filteredBills.filter(b => b.amount > 0).reduce((sum, b) => sum + b.amount, 0).toFixed(2)}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs mb-0.5" style={{ color: colors.textSecondary }}>
                    支出
                  </div>
                  <div className="text-sm font-bold" style={{ color: colors.danger }}>
                    {filteredBills.filter(b => b.amount < 0).reduce((sum, b) => sum + b.amount, 0).toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
