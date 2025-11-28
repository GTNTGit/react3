import React, { useState } from 'react';
import { ArrowLeft, ArrowUpDown, AlertCircle, FileText, ArrowRight } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

type AccountType = 'spot' | 'futures' | 'options';

interface AccountBalance {
  spot: number;
  futures: number;
  options: number;
}

export default function Transfer() {
  const { colors } = useTheme();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [fromAccount, setFromAccount] = useState<AccountType>('spot');
  const [toAccount, setToAccount] = useState<AccountType>('futures');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const [showRecords, setShowRecords] = useState(false);
  const [showAccountSelect, setShowAccountSelect] = useState<'from' | 'to' | null>(null);

  // 各账户余额（USDT）
  const balances: AccountBalance = {
    spot: 100000,
    futures: 15000,
    options: 8500,
  };

  const accountNames = {
    spot: t('transfer.spot_account'),
    futures: t('transfer.futures_account'),
    options: t('transfer.options_account'),
  };

  // 模拟划转记录
  const transferRecords = [
    {
      id: '1',
      from: 'spot',
      to: 'futures',
      amount: 10000,
      time: '2025-11-23 14:32:15',
      status: 'completed',
    },
    {
      id: '2',
      from: 'futures',
      to: 'options',
      amount: 5000,
      time: '2025-11-23 10:15:22',
      status: 'completed',
    },
    {
      id: '3',
      from: 'spot',
      to: 'options',
      amount: 3500,
      time: '2025-11-22 18:45:30',
      status: 'completed',
    },
    {
      id: '4',
      from: 'options',
      to: 'spot',
      amount: 2000,
      time: '2025-11-22 09:20:18',
      status: 'completed',
    },
    {
      id: '5',
      from: 'futures',
      to: 'spot',
      amount: 8000,
      time: '2025-11-21 16:10:45',
      status: 'completed',
    },
  ];

  const availableBalance = balances[fromAccount];

  const handleAmountChange = (value: string) => {
    setAmount(value);
    setError('');
    
    const numValue = parseFloat(value);
    // 超过最大值时自动限制为最大值
    if (numValue > availableBalance) {
      setAmount(availableBalance.toString());
    } else if (numValue <= 0 && value) {
      setError(t('transfer.enter_valid_amount'));
    }
  };

  const handleMaxClick = () => {
    setAmount(availableBalance.toString());
    setError('');
  };

  const handleSwapAccounts = () => {
    const temp = fromAccount;
    setFromAccount(toAccount);
    setToAccount(temp);
    setAmount('');
    setError('');
  };

  const handleTransfer = () => {
    if (!amount) {
      setError(t('transfer.enter_transfer_amount'));
      return;
    }
    const numValue = parseFloat(amount);
    if (numValue <= 0) {
      setError(t('transfer.enter_valid_amount'));
      return;
    }
    if (numValue > availableBalance) {
      setError(t('transfer.insufficient_balance'));
      return;
    }
    if (fromAccount === toAccount) {
      setError(t('transfer.same_account_error'));
      return;
    }

    alert(`${t('transfer.transfer_success')}\n${t('transfer.from_account')}: ${accountNames[fromAccount]}\n${t('transfer.to_account')}: ${accountNames[toAccount]}\n${t('transfer.transfer_amount')}: ${amount} USDT`);
    
    setAmount('');
    setError('');
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
        className="flex-shrink-0 px-4 h-14 flex items-center justify-between border-b"
        style={{ 
          borderColor: colors.border,
        }}
      >
        <div className="flex items-center">
          <button onClick={handleBack} className="mr-4">
            <ArrowLeft className="w-5 h-5" style={{ color: colors.text }} />
          </button>
          <h1 className="font-semibold" style={{ color: colors.text, fontSize: '17px' }}>
            {t('transfer.title')}
          </h1>
        </div>
        <button
          onClick={() => setShowRecords(true)}
          className="w-9 h-9 flex items-center justify-center rounded-full transition-transform active:scale-90"
          style={{ 
            backgroundColor: colors.cardBg,
          }}
        >
          <FileText className="w-5 h-5" style={{ color: colors.textSecondary }} />
        </button>
      </div>

      {/* 主内容区 */}
      <div className="flex-1 overflow-y-auto px-4 pt-4">
        {/* 币种选择 */}
        <div 
          className="mb-4 p-4 border"
          style={{ 
            borderColor: colors.border,
            borderRadius: '8px',
            backgroundColor: colors.cardBg,
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center font-bold"
                style={{ 
                  backgroundColor: colors.bg,
                  border: `1.5px solid ${colors.border}`,
                  color: colors.text,
                  fontSize: '16px',
                }}
              >
                U
              </div>
              <div>
                <div className="font-semibold" style={{ color: colors.text, fontSize: '16px' }}>
                  USDT
                </div>
                <div className="text-xs" style={{ color: colors.textSecondary }}>
                  Tether
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 从账户 */}
        <button
          onClick={() => setShowAccountSelect('from')}
          className="p-4 border w-full text-left"
          style={{ 
            borderColor: colors.border,
            borderRadius: '8px',
            backgroundColor: colors.cardBg,
          }}
        >
          <div className="text-xs mb-3" style={{ color: colors.textSecondary }}>
            {t('transfer.from_account')}
          </div>
          <div className="font-medium" style={{ color: colors.text, fontSize: '15px' }}>
            {accountNames[fromAccount]}
          </div>
        </button>

        {/* 交换按钮 */}
        <div className="flex justify-center -my-3 relative z-10">
          <div 
            className="py-2"
            style={{ backgroundColor: colors.bg }}
          >
            <button
              onClick={handleSwapAccounts}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-transform active:scale-90"
              style={{ 
                backgroundColor: colors.primary,
              }}
            >
              <ArrowUpDown className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* 到账户 */}
        <button
          onClick={() => setShowAccountSelect('to')}
          className="mb-4 p-4 border w-full text-left"
          style={{ 
            borderColor: colors.border,
            borderRadius: '8px',
            backgroundColor: colors.cardBg,
          }}
        >
          <div className="text-xs mb-3" style={{ color: colors.textSecondary }}>
            {t('transfer.to_account')}
          </div>
          <div className="font-medium" style={{ color: colors.text, fontSize: '15px' }}>
            {accountNames[toAccount]}
          </div>
        </button>

        {/* 数量输入 */}
        <div 
          className="mb-4 p-4 border"
          style={{ 
            borderColor: error && amount ? colors.error : colors.border,
            borderRadius: '8px',
            backgroundColor: colors.cardBg,
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="text-xs" style={{ color: colors.textSecondary }}>
              {t('transfer.transfer_amount')}
            </div>
            <button
              onClick={handleMaxClick}
              className="text-xs font-medium px-3 py-1.5 rounded-full"
              style={{ 
                color: colors.primary,
                backgroundColor: `${colors.primary}15`,
              }}
            >
              {t('common.all')}
            </button>
          </div>
          <div className="flex items-baseline gap-2 mb-2">
            <input
              type="number"
              value={amount}
              onChange={(e) => handleAmountChange(e.target.value)}
              placeholder="0"
              className="flex-1 bg-transparent outline-none font-semibold"
              style={{ 
                color: colors.text,
                fontSize: '32px',
              }}
            />
            <span className="font-medium pb-1" style={{ color: colors.textSecondary, fontSize: '18px' }}>
              USDT
            </span>
          </div>
          <div className="text-xs" style={{ color: colors.textSecondary }}>
            {t('transfer.available')} {availableBalance.toLocaleString()} USDT
          </div>
        </div>

        {/* 错误提示 */}
        {error && (
          <div 
            className="mb-4 px-4 py-3 flex items-center gap-2 border"
            style={{ 
              backgroundColor: '#FEF2F2',
              borderColor: '#FEE2E2',
              borderRadius: '8px',
            }}
          >
            <AlertCircle className="w-4 h-4" style={{ color: '#EF4444' }} />
            <span className="text-sm" style={{ color: '#EF4444' }}>
              {error}
            </span>
          </div>
        )}

        {/* 提示信息 */}
        <div 
          className="px-4 py-3 border"
          style={{ 
            backgroundColor: '#FFFBEB',
            borderColor: '#FEF3C7',
            borderRadius: '8px',
          }}
        >
          <div className="flex items-start gap-2">
            <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#F59E0B' }} />
            <div className="space-y-1">
              <p className="text-xs" style={{ color: '#92400E' }}>
                • {t('transfer.no_fee_realtime')}
              </p>
              <p className="text-xs" style={{ color: '#92400E' }}>
                • {t('transfer.no_impact_positions')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 底部按钮 */}
      <div 
        className="flex-shrink-0 p-4 border-t"
        style={{ 
          borderColor: colors.border,
        }}
      >
        <button
          onClick={handleTransfer}
          disabled={!!error || !amount || fromAccount === toAccount}
          className="w-full py-3.5 rounded-lg font-semibold text-white transition-all disabled:opacity-40"
          style={{ 
            background: 'linear-gradient(135deg, #4ADE80 0%, #22C55E 100%)',
            fontSize: '16px',
          }}
        >
          {t('transfer.confirm_transfer')}
        </button>
      </div>

      {/* 划转记录模态框 */}
      {showRecords && (
        <div 
          className="fixed inset-0 z-50 flex flex-col"
          style={{ backgroundColor: colors.bg }}
        >
          {/* 记录页面导航栏 */}
          <div 
            className="flex-shrink-0 px-4 h-14 flex items-center border-b"
            style={{ 
              borderColor: colors.border,
            }}
          >
            <button onClick={() => setShowRecords(false)} className="mr-4">
              <ArrowLeft className="w-5 h-5" style={{ color: colors.text }} />
            </button>
            <h1 className="font-semibold" style={{ color: colors.text, fontSize: '17px' }}>
              {t('transfer.transfer_records')}
            </h1>
          </div>

          {/* 记录列表 */}
          <div className="flex-1 overflow-y-auto">
            {transferRecords.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full">
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                  style={{ backgroundColor: colors.cardBg }}
                >
                  <AlertCircle className="w-8 h-8" style={{ color: colors.textSecondary }} />
                </div>
                <p className="text-sm" style={{ color: colors.textSecondary }}>
                  {t('transfer.no_records')}
                </p>
              </div>
            ) : (
              <div className="p-4 space-y-3">
                {transferRecords.map((record) => (
                  <div
                    key={record.id}
                    className="p-4 border"
                    style={{
                      borderColor: colors.border,
                      borderRadius: '8px',
                      backgroundColor: colors.cardBg,
                    }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium" style={{ color: colors.text, fontSize: '15px' }}>
                            {accountNames[record.from as AccountType]}
                          </span>
                          <ArrowRight className="w-4 h-4" style={{ color: colors.textSecondary }} />
                          <span className="font-medium" style={{ color: colors.text, fontSize: '15px' }}>
                            {accountNames[record.to as AccountType]}
                          </span>
                        </div>
                        <div className="text-xs" style={{ color: colors.textSecondary }}>
                          {record.time}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold mb-1" style={{ color: colors.text, fontSize: '16px' }}>
                          {record.amount.toLocaleString()} USDT
                        </div>
                        <div 
                          className="text-xs px-2 py-0.5 rounded inline-block"
                          style={{ 
                            backgroundColor: `${colors.success}20`,
                            color: colors.success,
                          }}
                        >
                          {t('bills.completed')}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* 账户选择弹窗 */}
      {showAccountSelect && (
        <div 
          className="fixed inset-0 z-50 flex items-end"
          onClick={() => setShowAccountSelect(null)}
        >
          {/* 半透明遮罩 */}
          <div 
            className="absolute inset-0"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          />
          
          {/* 底部弹出内容 */}
          <div 
            className="relative w-full"
            style={{ 
              backgroundColor: colors.cardBg,
              borderTopLeftRadius: '16px',
              borderTopRightRadius: '16px',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* 标题 */}
            <div className="p-4 border-b" style={{ borderColor: colors.border }}>
              <h2 className="font-semibold text-center" style={{ color: colors.text, fontSize: '16px' }}>
                {showAccountSelect === 'from' ? t('transfer.from_account') : t('transfer.to_account')}
              </h2>
            </div>

            {/* 账户列表 */}
            <div className="p-4">
              {(['spot', 'futures', 'options'] as AccountType[]).map((account) => {
                const isSelected = showAccountSelect === 'from' 
                  ? account === fromAccount 
                  : account === toAccount;
                
                return (
                  <button
                    key={account}
                    onClick={() => {
                      if (showAccountSelect === 'from') {
                        setFromAccount(account);
                        setAmount('');
                        setError('');
                      } else {
                        setToAccount(account);
                      }
                      setShowAccountSelect(null);
                    }}
                    className="w-full p-4 mb-2 border flex items-center justify-between transition-all active:scale-98"
                    style={{ 
                      borderColor: isSelected ? colors.primary : colors.border,
                      borderRadius: '8px',
                      backgroundColor: isSelected ? `${colors.primary}15` : colors.bg,
                    }}
                  >
                    <span 
                      className="font-medium"
                      style={{ 
                        color: isSelected ? colors.primary : colors.text,
                        fontSize: '15px',
                      }}
                    >
                      {accountNames[account]}
                    </span>
                    {isSelected && (
                      <div 
                        className="w-5 h-5 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: colors.primary }}
                      >
                        <svg 
                          className="w-3 h-3" 
                          fill="none" 
                          stroke="white" 
                          viewBox="0 0 24 24"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={3} 
                            d="M5 13l4 4L19 7" 
                          />
                        </svg>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* 取消按钮 */}
            <div className="p-4 pt-0">
              <button
                onClick={() => setShowAccountSelect(null)}
                className="w-full py-3.5 rounded-lg font-medium"
                style={{ 
                  backgroundColor: colors.bg,
                  color: colors.textSecondary,
                  fontSize: '15px',
                  border: `1px solid ${colors.border}`,
                }}
              >
                {t('common.cancel')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}