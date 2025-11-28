import React, { useState } from 'react';
import { ArrowLeft, TrendingDown, Clock, AlertCircle, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { useTranslation } from 'react-i18next';

export default function Loan() {
  const navigate = useNavigate();
  const { colors } = useTheme();
  const { t } = useTranslation();
  const [loanAmount, setLoanAmount] = useState('');
  const [collateralCoin, setCollateralCoin] = useState('BTC');
  const [loanDays, setLoanDays] = useState(30);
  
  // 不同期限的利率配置
  const loanTerms = [
    { days: 7, rate: 0.0002, label: t('loan.term_7d'), rateText: '0.02%' },
    { days: 30, rate: 0.0001, label: t('loan.term_30d'), rateText: '0.01%' },
    { days: 90, rate: 0.00008, label: t('loan.term_90d'), rateText: '0.008%' },
    { days: 180, rate: 0.00006, label: t('loan.term_180d'), rateText: '0.006%' },
    { days: 365, rate: 0.00005, label: t('loan.term_365d'), rateText: '0.005%' },
  ];
  
  const currentTerm = loanTerms.find(t => t.days === loanDays) || loanTerms[1];
  
  const myLoans = [
    { 
      amount: '10,000 USDT',
      collateral: '0.5 BTC',
      rate: '0.01%',
      dueDate: '2024-12-25',
      status: t('loan.status_ongoing'),
      health: 85
    },
    { 
      amount: '5,000 USDT',
      collateral: '3 ETH',
      rate: '0.01%',
      dueDate: '2024-12-20',
      status: t('loan.status_ongoing'),
      health: 92
    },
  ];
  
  const calculateCollateral = () => {
    const amount = parseFloat(loanAmount) || 0;
    const required = amount * 1.2; // 120% collateral
    return required.toFixed(2);
  };
  
  const calculateDailyInterest = () => {
    const amount = parseFloat(loanAmount) || 0;
    const rate = currentTerm.rate; // 0.01%
    return (amount * rate).toFixed(4);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.bg }}>
      {/* Header */}
      <div 
        className="sticky top-0 z-50 px-4 py-4 flex items-center justify-between"
        style={{ 
          backgroundColor: colors.bg,
          borderBottom: `1px solid ${colors.border}`,
        }}
      >
        <button onClick={() => navigate('/')} className="p-2 -ml-2">
          <ArrowLeft size={24} style={{ color: colors.text }} />
        </button>
        <span style={{ color: colors.text }}>{t('loan.title')}</span>
        <div className="w-8" />
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* 借贷统计 - 深色版本 */}
        <div 
          className="rounded-2xl p-5 relative overflow-hidden"
          style={{
            backgroundColor: colors.cardBg,
            border: `1px solid ${colors.border}`,
          }}
        >
          {/* 背景图案 - 网格和圆形 */}
          <div className="absolute inset-0 opacity-5">
            {/* 网格线 */}
            <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" style={{ color: colors.text }} />
            </svg>
            
            {/* 装饰圆形 */}
            <div className="absolute -top-20 -right-20 w-48 h-48 rounded-full border-4" style={{ borderColor: colors.primary }} />
            <div className="absolute -bottom-16 -left-16 w-40 h-40 rounded-full border-4" style={{ borderColor: colors.primary }} />
            <div className="absolute top-1/2 right-1/4 w-24 h-24 rounded-full border-2" style={{ borderColor: colors.primary }} />
          </div>
          
          {/* 内容区域 */}
          <div className="relative z-10">
            {/* 顶部 - 图标 + 标题 */}
            <div className="flex items-center gap-2.5 mb-3">
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center relative"
                style={{ 
                  background: `linear-gradient(135deg, ${colors.primary}40 0%, ${colors.primary}20 100%)`,
                  border: `1px solid ${colors.primary}30`,
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" fill={colors.primary} fillOpacity="0.9"/>
                  <path d="M2 17L12 22L22 17" stroke={colors.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 12L12 17L22 12" stroke={colors.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              
              <div>
                <div className="text-xs mb-0.5" style={{ color: colors.text }}>{t('loan.available_loan_amount')}</div>
                <div 
                  className="px-2 py-0.5 rounded text-xs"
                  style={{ 
                    backgroundColor: `${colors.primary}20`,
                    color: colors.primary,
                  }}
                >
                  {t('loan.realtime_update')}
                </div>
              </div>
            </div>
            
            {/* 金额展示 */}
            <div className="mb-4">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl tracking-tight" style={{ color: colors.text }}>
                  100,000.00
                </span>
                <span className="text-lg" style={{ color: colors.textSecondary }}>USDT</span>
              </div>
              <div className="flex items-center gap-1.5 mt-1.5">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 2V14M5 5L8 2L11 5" stroke={colors.success} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="text-xs" style={{ color: colors.success }}>{t('loan.increased_yesterday', { amount: '5,000' })}</span>
              </div>
            </div>
            
            {/* 统计卡片组 */}
            <div className="grid grid-cols-3 gap-2.5">
              <div 
                className="rounded-xl p-3 relative overflow-hidden"
                style={{ 
                  backgroundColor: colors.bg,
                  border: `1px solid ${colors.border}`,
                }}
              >
                <div className="relative z-10">
                  <div className="text-xs mb-1" style={{ color: colors.textSecondary }}>{t('loan.borrowed_amount')}</div>
                  <div style={{ color: colors.text }}>15,000</div>
                </div>
                {/* 小装饰 */}
                <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full opacity-5" style={{ backgroundColor: colors.primary }} />
              </div>
              
              <div 
                className="rounded-xl p-3 relative overflow-hidden"
                style={{ 
                  backgroundColor: colors.bg,
                  border: `1px solid ${colors.border}`,
                }}
              >
                <div className="relative z-10">
                  <div className="text-xs mb-1" style={{ color: colors.textSecondary }}>{t('loan.daily_interest_rate')}</div>
                  <div style={{ color: colors.text }}>0.01%</div>
                </div>
                <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full opacity-5" style={{ backgroundColor: colors.primary }} />
              </div>
              
              <div 
                className="rounded-xl p-3 relative overflow-hidden"
                style={{ 
                  backgroundColor: colors.bg,
                  border: `1px solid ${colors.border}`,
                }}
              >
                <div className="relative z-10">
                  <div className="text-xs mb-1" style={{ color: colors.textSecondary }}>{t('loan.collateral_rate')}</div>
                  <div style={{ color: colors.text }}>120%</div>
                </div>
                <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full opacity-5" style={{ backgroundColor: colors.primary }} />
              </div>
            </div>
          </div>
        </div>

        {/* 借贷表单 */}
        <div 
          className="rounded-2xl p-5 relative overflow-hidden"
          style={{ 
            backgroundColor: colors.cardBg,
            border: `1px solid ${colors.border}`,
          }}
        >
          <div className="mb-5 flex items-center justify-between">
            <div>
              <div className="mb-1" style={{ color: colors.text }}>{t('loan.loan_application')}</div>
              <div className="text-xs" style={{ color: colors.textSecondary }}>{t('loan.loan_application_desc')}</div>
            </div>
            <div 
              className="px-3 py-1.5 rounded-lg text-xs"
              style={{ 
                backgroundColor: `${colors.primary}15`,
                color: colors.primary,
              }}
            >
              {t('loan.low_interest_rate')}
            </div>
          </div>
          
          {/* 借贷金额 */}
          <div className="mb-4">
            <div className="text-sm mb-2" style={{ color: colors.textSecondary }}>{t('loan.loan_amount')}</div>
            <div 
              className="rounded-lg p-4 flex items-center justify-between"
              style={{ backgroundColor: colors.bg }}
            >
              <input
                type="number"
                placeholder="0.00"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
                className="flex-1 bg-transparent outline-none text-lg"
                style={{ color: colors.text }}
              />
              <span style={{ color: colors.textSecondary }}>USDT</span>
            </div>
            <div className="flex justify-between mt-2 text-xs" style={{ color: colors.textSecondary }}>
              <span>{t('loan.min_loan_amount', { amount: '100' })}</span>
              <span>{t('loan.available', { amount: '100,000' })}</span>
            </div>
          </div>
          
          {/* 抵押币种 */}
          <div className="mb-4">
            <div className="text-sm mb-2" style={{ color: colors.textSecondary }}>{t('loan.collateral_currency')}</div>
            <div className="flex gap-2">
              {['BTC', 'ETH', 'BNB'].map((coin) => (
                <button
                  key={coin}
                  onClick={() => setCollateralCoin(coin)}
                  className="flex-1 py-3 rounded-lg transition-all"
                  style={{
                    backgroundColor: collateralCoin === coin ? `${colors.primary}20` : colors.bg,
                    border: `1px solid ${collateralCoin === coin ? colors.primary : colors.border}`,
                    color: collateralCoin === coin ? colors.primary : colors.text,
                  }}
                >
                  {coin}
                </button>
              ))}
            </div>
          </div>
          
          {/* 借贷期限 */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm" style={{ color: colors.textSecondary }}>{t('loan.loan_term')}</div>
              <div className="text-xs" style={{ color: colors.primary }}>
                {t('loan.daily_rate', { rate: currentTerm.rateText })}
              </div>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {loanTerms.map((term) => (
                <button
                  key={term.days}
                  onClick={() => setLoanDays(term.days)}
                  className="py-3 rounded-lg transition-all relative"
                  style={{
                    backgroundColor: loanDays === term.days ? colors.primary : colors.bg,
                    border: `1px solid ${loanDays === term.days ? colors.primary : colors.border}`,
                    color: loanDays === term.days ? '#ffffff' : colors.text,
                  }}
                >
                  {term.label}
                </button>
              ))}
            </div>
            <div 
              className="mt-2 text-xs flex items-center gap-1"
              style={{ color: colors.textSecondary }}
            >
              <Clock size={12} />
              <span>{t('loan.longer_term_lower_rate')}</span>
            </div>
          </div>
          
          {loanAmount && (
            <div 
              className="rounded-lg p-4 space-y-2 mb-4"
              style={{ backgroundColor: colors.bg }}
            >
              <div className="flex justify-between text-sm">
                <span style={{ color: colors.textSecondary }}>{t('loan.required_collateral')}</span>
                <span style={{ color: colors.text }}>{calculateCollateral()} {collateralCoin}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span style={{ color: colors.textSecondary }}>{t('loan.daily_interest')}</span>
                <span style={{ color: colors.success }}>+{calculateDailyInterest()} USDT</span>
              </div>
              <div className="flex justify-between text-sm">
                <span style={{ color: colors.textSecondary }}>{t('loan.collateral_rate')}</span>
                <span style={{ color: colors.text }}>120%</span>
              </div>
            </div>
          )}
          
          <button
            className="w-full py-4 rounded-xl transition-opacity active:opacity-70"
            style={{ backgroundColor: colors.primary }}
          >
            <span className="text-white">{t('loan.confirm_loan')}</span>
          </button>
        </div>

        {/* USDT借贷产品介绍 */}
        <div 
          className="rounded-xl p-5"
          style={{ 
            backgroundColor: colors.cardBg,
            border: `1px solid ${colors.border}`,
          }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ backgroundColor: `${colors.primary}20` }}
            >
              <Shield size={24} style={{ color: colors.primary }} />
            </div>
            <div>
              <div className="mb-1" style={{ color: colors.text }}>{t('loan.product_title')}</div>
              <div className="text-sm" style={{ color: colors.textSecondary }}>{t('loan.product_desc')}</div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div 
              className="rounded-lg p-3"
              style={{ backgroundColor: colors.bg }}
            >
              <div className="text-xs mb-1" style={{ color: colors.textSecondary }}>{t('loan.daily_interest_rate')}</div>
              <div style={{ color: colors.success }}>0.01%</div>
            </div>
            <div 
              className="rounded-lg p-3"
              style={{ backgroundColor: colors.bg }}
            >
              <div className="text-xs mb-1" style={{ color: colors.textSecondary }}>{t('loan.collateral_rate')}</div>
              <div style={{ color: colors.text }}>120%</div>
            </div>
            <div 
              className="rounded-lg p-3"
              style={{ backgroundColor: colors.bg }}
            >
              <div className="text-xs mb-1" style={{ color: colors.textSecondary }}>{t('loan.available_loan_amount')}</div>
              <div style={{ color: colors.text }}>100,000</div>
            </div>
            <div 
              className="rounded-lg p-3"
              style={{ backgroundColor: colors.bg }}
            >
              <div className="text-xs mb-1" style={{ color: colors.textSecondary }}>{t('loan.min_amount')}</div>
              <div style={{ color: colors.text }}>100 USDT</div>
            </div>
          </div>
          
          <div className="text-xs space-y-2" style={{ color: colors.textSecondary }}>
            <div>• {t('loan.support_multiple_collateral')}</div>
            <div>• {t('loan.flexible_repayment')}</div>
            <div>• {t('loan.realtime_risk_control')}</div>
          </div>
        </div>

        {/* 我的借贷 */}
        <div>
          <div className="mb-4" style={{ color: colors.text }}>{t('loan.my_loans')}</div>
          {myLoans.length > 0 ? (
            <div className="space-y-3">
              {myLoans.map((loan, index) => (
                <div
                  key={index}
                  className="rounded-xl p-4"
                  style={{ 
                    backgroundColor: colors.cardBg,
                    border: `1px solid ${colors.border}`,
                  }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="mb-1" style={{ color: colors.text }}>{t('loan.title')}</div>
                      <div className="text-sm" style={{ color: colors.textSecondary }}>{t('loan.loan_amount_display', { amount: loan.amount })}</div>
                    </div>
                    <div
                      className="px-3 py-1 rounded-full text-xs"
                      style={{ 
                        backgroundColor: `${colors.success}20`,
                        color: colors.success,
                      }}
                    >
                      {loan.status}
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm mb-3">
                    <div className="flex justify-between">
                      <span style={{ color: colors.textSecondary }}>{t('loan.collateral')}</span>
                      <span style={{ color: colors.text }}>{loan.collateral}</span>
                    </div>
                    <div className="flex justify-between">
                      <span style={{ color: colors.textSecondary }}>{t('loan.daily_interest_rate')}</span>
                      <span style={{ color: colors.text }}>{loan.rate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span style={{ color: colors.textSecondary }}>{t('loan.due_date')}</span>
                      <span style={{ color: colors.text }}>{loan.dueDate}</span>
                    </div>
                  </div>
                  
                  {/* 健康度 */}
                  <div>
                    <div className="flex justify-between text-xs mb-2">
                      <span style={{ color: colors.textSecondary }}>{t('loan.health_score')}</span>
                      <span style={{ color: loan.health > 80 ? colors.success : colors.warning }}>{loan.health}%</span>
                    </div>
                    <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: colors.bg }}>
                      <div 
                        className="h-full rounded-full transition-all"
                        style={{ 
                          width: `${loan.health}%`,
                          backgroundColor: loan.health > 80 ? colors.success : colors.warning,
                        }}
                      />
                    </div>
                  </div>
                  
                  <div className="flex gap-2 mt-4">
                    <button
                      className="flex-1 py-2 rounded-lg text-sm transition-opacity active:opacity-70"
                      style={{ 
                        backgroundColor: `${colors.primary}20`,
                        color: colors.primary,
                      }}
                    >
                      {t('loan.add_collateral')}
                    </button>
                    <button
                      className="flex-1 py-2 rounded-lg text-sm transition-opacity active:opacity-70"
                      style={{ 
                        backgroundColor: colors.primary,
                        color: '#ffffff',
                      }}
                    >
                      {t('loan.repay_now')}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div 
              className="rounded-xl p-8 text-center"
              style={{ 
                backgroundColor: colors.cardBg,
                border: `1px solid ${colors.border}`,
              }}
            >
              <Clock size={48} style={{ color: colors.textSecondary, margin: '0 auto 16px' }} />
              <div style={{ color: colors.textSecondary }}>{t('loan.no_loan_records')}</div>
            </div>
          )}
        </div>

        {/* 风险提示 */}
        <div 
          className="rounded-xl p-4"
          style={{ 
            backgroundColor: `${colors.warning}10`,
            border: `1px solid ${colors.warning}`,
          }}
        >
          <div className="flex gap-3">
            <AlertCircle size={20} style={{ color: colors.warning, flexShrink: 0 }} />
            <div className="text-sm" style={{ color: colors.text }}>
              <div className="mb-2">{t('loan.risk_warning_title')}</div>
              <div style={{ color: colors.textSecondary }}>
                {t('loan.risk_warning_content')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}