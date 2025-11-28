import React, { useState } from 'react';
import { ArrowLeft, TrendingUp, TrendingDown, ArrowLeftRight, AlertCircle } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

type BillType = 'all' | 'deposit' | 'withdraw' | 'transfer' | 'trade';

interface Bill {
  id: string;
  type: 'deposit' | 'withdraw' | 'transfer' | 'trade';
  amount: number;
  currency: string;
  time: string;
  status: 'completed' | 'pending' | 'failed';
  description: string;
}

export default function Bills() {
  const { colors } = useTheme();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [selectedType, setSelectedType] = useState<BillType>('all');

  const bills: Bill[] = [
    {
      id: '1',
      type: 'deposit',
      amount: 10000,
      currency: 'USDT',
      time: '2025-11-23 14:32:18',
      status: 'completed',
      description: t('bills.trc20_deposit'),
    },
    {
      id: '2',
      type: 'trade',
      amount: -350.5,
      currency: 'USDT',
      time: '2025-11-23 13:15:42',
      status: 'completed',
      description: t('bills.btc_usdt_contract_loss'),
    },
    {
      id: '3',
      type: 'trade',
      amount: 520.8,
      currency: 'USDT',
      time: '2025-11-23 11:28:30',
      status: 'completed',
      description: t('bills.eth_usdt_contract_profit'),
    },
    {
      id: '4',
      type: 'transfer',
      amount: -5000,
      currency: 'USDT',
      time: '2025-11-23 10:05:15',
      status: 'completed',
      description: `${t('transfer.spot_account')} → ${t('transfer.futures_account')}`,
    },
    {
      id: '5',
      type: 'withdraw',
      amount: -2000,
      currency: 'USDT',
      time: '2025-11-22 18:45:30',
      status: 'completed',
      description: t('bills.trc20_withdraw'),
    },
    {
      id: '6',
      type: 'trade',
      amount: 1250.3,
      currency: 'USDT',
      time: '2025-11-22 16:20:18',
      status: 'completed',
      description: t('bills.btc_usdt_option_profit'),
    },
    {
      id: '7',
      type: 'transfer',
      amount: 3000,
      currency: 'USDT',
      time: '2025-11-22 14:10:45',
      status: 'completed',
      description: `${t('transfer.futures_account')} → ${t('transfer.options_account')}`,
    },
    {
      id: '8',
      type: 'deposit',
      amount: 5000,
      currency: 'USDT',
      time: '2025-11-22 09:15:20',
      status: 'completed',
      description: t('bills.erc20_deposit'),
    },
    {
      id: '9',
      type: 'trade',
      amount: -180.5,
      currency: 'USDT',
      time: '2025-11-21 20:30:00',
      status: 'completed',
      description: t('bills.eth_usdt_option_loss'),
    },
    {
      id: '10',
      type: 'withdraw',
      amount: -1500,
      currency: 'USDT',
      time: '2025-11-21 15:10:30',
      status: 'pending',
      description: t('bills.bep20_withdraw_pending'),
    },
  ];

  const typeLabels: Record<BillType, string> = {
    all: t('bills.all'),
    deposit: t('bills.deposit'),
    withdraw: t('bills.withdraw'),
    transfer: t('bills.transfer'),
    trade: t('bills.trade'),
  };

  const filteredBills = selectedType === 'all' 
    ? bills 
    : bills.filter(bill => bill.type === selectedType);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'deposit':
        return <TrendingDown className="w-5 h-5" style={{ color: '#22C55E' }} />;
      case 'withdraw':
        return <TrendingUp className="w-5 h-5" style={{ color: '#EF4444' }} />;
      case 'transfer':
        return <ArrowLeftRight className="w-5 h-5" style={{ color: '#3B82F6' }} />;
      case 'trade':
        return <TrendingUp className="w-5 h-5" style={{ color: '#F59E0B' }} />;
      default:
        return <AlertCircle className="w-5 h-5" style={{ color: '#6B7280' }} />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'deposit':
        return { bg: '#DCFCE7', border: '#22C55E' };
      case 'withdraw':
        return { bg: '#FEE2E2', border: '#EF4444' };
      case 'transfer':
        return { bg: '#DBEAFE', border: '#3B82F6' };
      case 'trade':
        return { bg: '#FEF3C7', border: '#F59E0B' };
      default:
        return { bg: '#F3F4F6', border: '#9CA3AF' };
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return t('bills.completed');
      case 'pending':
        return t('bills.processing');
      case 'failed':
        return t('bills.failed');
      default:
        return t('common.unknown');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return { bg: '#DCFCE7', color: '#22C55E' };
      case 'pending':
        return { bg: '#FEF3C7', color: '#F59E0B' };
      case 'failed':
        return { bg: '#FEE2E2', color: '#EF4444' };
      default:
        return { bg: '#F3F4F6', color: '#6B7280' };
    }
  };

  const handleBack = () => {
    navigate('/wallet');
  };

  return (
    <div 
      className="h-screen flex flex-col"
      style={{ backgroundColor: colors.bg }}
    >
      {/* 顶部导航栏 */}
      <div 
        className="flex-shrink-0 px-4 h-14 flex items-center border-b"
        style={{ borderColor: colors.border }}
      >
        <button onClick={handleBack} className="mr-4">
          <ArrowLeft className="w-5 h-5" style={{ color: colors.text }} />
        </button>
        <h1 className="font-semibold" style={{ color: colors.text, fontSize: '17px' }}>
          {t('bills.title')}
        </h1>
      </div>

      {/* 类型筛选 */}
      <div 
        className="flex-shrink-0 px-4 py-3 border-b flex gap-2 overflow-x-auto"
        style={{ borderColor: colors.border }}
      >
        {(['all', 'deposit', 'withdraw', 'transfer', 'trade'] as BillType[]).map((type) => (
          <button
            key={type}
            onClick={() => setSelectedType(type)}
            className="px-4 py-2 rounded-full whitespace-nowrap font-medium"
            style={{
              backgroundColor: selectedType === type ? `${colors.primary}20` : colors.cardBg,
              color: selectedType === type ? colors.primary : colors.textSecondary,
              fontSize: '14px',
              border: `1px solid ${selectedType === type ? colors.primary : colors.border}`,
            }}
          >
            {typeLabels[type]}
          </button>
        ))}
      </div>

      {/* 账单列表 */}
      <div className="flex-1 overflow-y-auto">
        {filteredBills.length > 0 ? (
          <div className="p-4 space-y-2">
            {filteredBills.map((bill) => {
              const statusColor = getStatusColor(bill.status);
              
              return (
                <div
                  key={bill.id}
                  className="py-3 px-4 border"
                  style={{
                    borderColor: colors.border,
                    borderRadius: '8px',
                    backgroundColor: colors.cardBg,
                  }}
                >
                  <div className="flex items-center justify-between">
                    {/* 内容 */}
                    <div className="flex-1 min-w-0 mr-3">
                      <div className="font-medium mb-0.5" style={{ color: colors.text, fontSize: '14px' }}>
                        {bill.description}
                      </div>
                      <div className="text-xs" style={{ color: colors.textSecondary }}>
                        {bill.time}
                      </div>
                    </div>
                    
                    {/* 金额和状态 */}
                    <div className="text-right flex-shrink-0">
                      <div 
                        className="font-semibold mb-0.5"
                        style={{ 
                          color: bill.amount > 0 ? colors.success : colors.text,
                          fontSize: '15px',
                        }}
                      >
                        {bill.amount > 0 ? '+' : ''}{bill.amount.toLocaleString()} {bill.currency}
                      </div>
                      <div 
                        className="text-xs px-2 py-0.5 rounded inline-block"
                        style={{ 
                          backgroundColor: statusColor.bg,
                          color: statusColor.color,
                        }}
                      >
                        {getStatusText(bill.status)}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            <div 
              className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
              style={{ backgroundColor: colors.cardBg }}
            >
              <AlertCircle className="w-8 h-8" style={{ color: colors.textSecondary }} />
            </div>
            <p className="text-sm" style={{ color: colors.textSecondary }}>
              {t('bills.no_records', { type: typeLabels[selectedType] })}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
