import { ArrowLeft, TrendingUp, Wallet, Clock, Shield, Zap, X, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { useState, useEffect } from 'react';
import { useBalance } from '../contexts/BalanceContext';
import { toast } from 'sonner@2.0.3';
import { useTranslation } from 'react-i18next';
import { InvestPlan, InvestmentRecord } from '../types/invest';
import { fetchInvestPlans, fetchMyInvestments } from '../services/investService';

export default function Invest() {
  const navigate = useNavigate();
  const { colors } = useTheme();
  const { t } = useTranslation();
  const { balance, updateBalance } = useBalance();
  const [selectedPlan, setSelectedPlan] = useState<InvestPlan | null>(null);
  const [investAmount, setInvestAmount] = useState('');
  const [showInvestModal, setShowInvestModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedInvestment, setSelectedInvestment] = useState<InvestmentRecord | null>(null);
  const [calculatorAmount, setCalculatorAmount] = useState('');
  
  // 数据加载状态
  const [isLoading, setIsLoading] = useState(true);
  const [investPlans, setInvestPlans] = useState<InvestPlan[]>([]);
  const [myInvestments, setMyInvestments] = useState<InvestmentRecord[]>([]);
  
  // 加载数据
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const [plansData, investmentsData] = await Promise.all([
          fetchInvestPlans(),
          fetchMyInvestments(),
        ]);
        
        // 将服务返回的数据转换为 InvestPlan 格式（在页面中翻译）
        // Service 返回的数据包含 Translation Key，这里进行翻译组装
        const plans: InvestPlan[] = plansData.map((plan) => {
          // 根据 type 确定图标和颜色
          const iconMap = {
            stable: Shield,
            fixed: Clock,
            high: TrendingUp,
          };
          const colorMap = {
            stable: colors.success,
            fixed: colors.primary,
            high: colors.warning,
          };
          
          return {
            name: t(plan.nameKey), // 使用 Service 返回的 nameKey 进行翻译
            type: plan.type,
            rate: plan.rate,
            avgRate: plan.avgRate,
            period: t('invest.period_day', { count: plan.period }), // 将数字转换为翻译文本
            minAmount: plan.minAmount,
            risk: t(plan.riskKey), // 使用 Service 返回的 riskKey 进行翻译
            desc: t(plan.descKey), // 使用 Service 返回的 descKey 进行翻译
            features: plan.featuresKeys.map(key => t(key)), // 使用 Service 返回的 featuresKeys 数组进行翻译
            icon: iconMap[plan.type],
            color: colorMap[plan.type],
          };
        });
        
        // 将服务返回的数据转换为 InvestmentRecord 格式（在页面中翻译）
        // Service 返回的数据包含 Translation Key，这里进行翻译组装
        const investments: InvestmentRecord[] = investmentsData.map((inv) => {
          return {
            plan: t(inv.planKey), // 使用 Service 返回的 planKey 进行翻译
            amount: inv.amount,
            rate: inv.rate,
            earned: inv.earned,
            days: inv.days,
            totalDays: inv.totalDays,
            status: t(inv.statusKey), // 使用 Service 返回的 statusKey 进行翻译
            startDate: inv.startDate,
            endDate: inv.endDate,
          };
        });
        
        setInvestPlans(plans);
        setMyInvestments(investments);
      } catch (error) {
        console.error('Failed to load investment data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, [colors, t]);
  

  const totalInvested = myInvestments.reduce((sum, inv) => sum + parseFloat(inv.amount.replace(/,/g, '')), 0);
  const totalEarned = myInvestments.reduce((sum, inv) => sum + parseFloat(inv.earned.replace(/,/g, '')), 0);

  const handleInvest = () => {
    if (!selectedPlan) {
      toast.error(t('invest.select_plan_error'));
      return;
    }
    if (parseFloat(investAmount) < selectedPlan.minAmount) {
      toast.error(t('invest.min_amount_error', { amount: selectedPlan.minAmount }));
      return;
    }
    if (parseFloat(investAmount) > balance) {
      toast.error(t('invest.insufficient_balance'));
      return;
    }
    // 模拟投资操作
    updateBalance(balance - parseFloat(investAmount));
    toast.success(t('invest.invest_success'));
    setShowInvestModal(false);
  };

  // Loading 骨架屏
  if (isLoading) {
    return (
      <div className="min-h-screen pb-20 flex flex-col items-center justify-center" style={{ backgroundColor: colors.bg }}>
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 rounded-full animate-spin" style={{ borderColor: `${colors.primary}30`, borderTopColor: colors.primary }}></div>
          <div className="text-sm" style={{ color: colors.textSecondary }}>{t('common.loading') || 'Loading...'}</div>
        </div>
      </div>
    );
  }

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
        <span style={{ color: colors.text }}>{t('invest.title')}</span>
        <button 
          onClick={() => navigate('/invest-earnings')}
          className="p-2 -mr-2 transition-opacity active:opacity-70"
        >
          <FileText size={22} style={{ color: colors.text }} />
        </button>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* 投资统计 - 深色版本 */}
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
                <pattern id="grid-invest" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid-invest)" style={{ color: colors.text }} />
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
                <div className="text-xs mb-0.5" style={{ color: colors.text }}>{t('invest.total_invested')}</div>
                <div 
                  className="px-2 py-0.5 rounded text-xs"
                  style={{ 
                    backgroundColor: `${colors.primary}20`,
                    color: colors.primary,
                  }}
                >
                  {t('invest.earning')}
                </div>
              </div>
            </div>
            
            {/* 金额展示 */}
            <div className="mb-4">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl tracking-tight" style={{ color: colors.text }}>
                  {totalInvested.toLocaleString()}
                </span>
                <span className="text-lg" style={{ color: colors.textSecondary }}>USDT</span>
              </div>
              <div className="flex items-center gap-1.5 mt-1.5">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 2V14M5 5L8 2L11 5" stroke={colors.success} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="text-xs" style={{ color: colors.success }}>{t('invest.total_earned')} +{totalEarned.toFixed(2)} USDT</span>
              </div>
            </div>
            
            {/* 统计卡片组 */}
            <div className="grid grid-cols-3 gap-2.5">
              <div 
                className="rounded-xl p-3 relative overflow-hidden"
                style={{ 
                  backgroundColor: `${colors.primary}10`,
                  border: `1px solid ${colors.primary}20`,
                }}
              >
                <div className="absolute inset-0" style={{ 
                  background: `linear-gradient(135deg, ${colors.primary}05 0%, transparent 100%)`,
                }} />
                <div className="relative z-10">
                  <div className="text-xs mb-1" style={{ color: colors.textSecondary }}>{t('invest.total_earned')}</div>
                  <div className="font-semibold" style={{ color: colors.text }}>{totalEarned.toFixed(2)}</div>
                </div>
              </div>
              
              <div 
                className="rounded-xl p-3 relative overflow-hidden"
                style={{ 
                  backgroundColor: `${colors.primary}10`,
                  border: `1px solid ${colors.primary}20`,
                }}
              >
                <div className="absolute inset-0" style={{ 
                  background: `linear-gradient(135deg, ${colors.primary}05 0%, transparent 100%)`,
                }} />
                <div className="relative z-10">
                  <div className="text-xs mb-1" style={{ color: colors.textSecondary }}>{t('invest.investment_plans')}</div>
                  <div className="font-semibold" style={{ color: colors.text }}>{myInvestments.length}</div>
                </div>
              </div>
              
              <div 
                className="rounded-xl p-3 relative overflow-hidden"
                style={{ 
                  backgroundColor: `${colors.primary}10`,
                  border: `1px solid ${colors.primary}20`,
                }}
              >
                <div className="absolute inset-0" style={{ 
                  background: `linear-gradient(135deg, ${colors.primary}05 0%, transparent 100%)`,
                }} />
                <div className="relative z-10">
                  <div className="text-xs mb-1" style={{ color: colors.textSecondary }}>{t('invest.avg_apr')}</div>
                  <div className="font-semibold" style={{ color: colors.text }}>15.2%</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 理财产品 */}
        <div>
          <div className="mb-4" style={{ color: colors.text }}>{t('invest.investment_plans')}</div>
          <div className="space-y-4">
            {investPlans.map((plan, index) => {
              const IconComponent = plan.icon;
              return (
                <div
                  key={index}
                  className="rounded-xl p-5 relative overflow-hidden"
                  style={{ 
                    backgroundColor: colors.cardBg,
                    border: `2px solid ${colors.border}`,
                  }}
                >
                  {/* 背景装饰 */}
                  <div 
                    className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-10"
                    style={{ 
                      background: plan.color,
                      transform: 'translate(40%, -40%)',
                    }}
                  />
                  
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-12 h-12 rounded-xl flex items-center justify-center"
                          style={{ backgroundColor: `${plan.color}20` }}
                        >
                          <IconComponent size={24} style={{ color: plan.color }} />
                        </div>
                        <div>
                          <div className="mb-1" style={{ color: colors.text }}>{plan.name}</div>
                          <div className="text-sm" style={{ color: colors.textSecondary }}>{plan.desc}</div>
                        </div>
                      </div>
                      <div
                        className="px-3 py-1 rounded-full text-xs"
                        style={{ 
                          backgroundColor: `${plan.color}20`,
                          color: plan.color,
                        }}
                      >
                        {plan.risk}
                      </div>
                    </div>
                    
                    {/* 年化收益 */}
                    <div className="mb-4">
                      <div className="text-sm mb-1" style={{ color: colors.textSecondary }}>{t('invest.apr')}</div>
                      <div className="text-3xl" style={{ color: plan.color }}>{plan.rate}</div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                      <div>
                        <div style={{ color: colors.textSecondary }}>{t('invest.period')}</div>
                        <div style={{ color: colors.text }}>{plan.period}</div>
                      </div>
                      <div>
                        <div style={{ color: colors.textSecondary }}>{t('invest.min_invest')}</div>
                        <div style={{ color: colors.text }}>{plan.minAmount} USDT</div>
                      </div>
                    </div>
                    
                    {/* 产品特点 */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {plan.features.map((feature, idx) => (
                        <div
                          key={idx}
                          className="px-3 py-1 rounded-full text-xs"
                          style={{ 
                            backgroundColor: colors.bg,
                            color: colors.text,
                          }}
                        >
                          {feature}
                        </div>
                      ))}
                    </div>
                    
                    <button
                      className="w-full py-3 rounded-xl transition-opacity active:opacity-70"
                      style={{ backgroundColor: plan.color }}
                      onClick={() => {
                        setSelectedPlan(plan);
                        setShowInvestModal(true);
                      }}
                    >
                      <span className="text-white">{t('invest.invest_now')}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 我的投资 */}
        <div>
          <div className="mb-4" style={{ color: colors.text }}>{t('invest.my_investments')}</div>
          {myInvestments.length > 0 ? (
            <div className="space-y-3">
              {myInvestments.map((investment, index) => (
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
                      <div className="mb-1" style={{ color: colors.text }}>{investment.plan}</div>
                      <div className="text-sm" style={{ color: colors.textSecondary }}>{t('invest.investment_amount')}: {investment.amount}</div>
                    </div>
                    <div
                      className="px-3 py-1 rounded-full text-xs"
                      style={{ 
                        backgroundColor: `${colors.success}20`,
                        color: colors.success,
                      }}
                    >
                      {investment.status}
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm mb-3">
                    <div className="flex justify-between">
                      <span style={{ color: colors.textSecondary }}>{t('invest.annual_rate')}</span>
                      <span style={{ color: colors.text }}>{investment.rate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span style={{ color: colors.textSecondary }}>{t('invest.earned_profit')}</span>
                      <span style={{ color: colors.success }}>+{investment.earned}</span>
                    </div>
                    <div className="flex justify-between">
                      <span style={{ color: colors.textSecondary }}>{t('invest.maturity_time')}</span>
                      <span style={{ color: colors.text }}>{investment.endDate}</span>
                    </div>
                  </div>
                  
                  {/* 进度条 */}
                  <div>
                    <div className="flex justify-between text-xs mb-2">
                      <span style={{ color: colors.textSecondary }}>{t('invest.investment_progress')}</span>
                      <span style={{ color: colors.text }}>{investment.days}/{investment.totalDays} {t('invest.days')}</span>
                    </div>
                    <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: colors.bg }}>
                      <div 
                        className="h-full rounded-full transition-all"
                        style={{ 
                          width: `${(investment.days / investment.totalDays) * 100}%`,
                          backgroundColor: colors.primary,
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
                      onClick={() => {
                        setSelectedInvestment(investment);
                        setShowDetailModal(true);
                      }}
                    >
                      {t('common.view_details')}
                    </button>
                    {investment.plan === t('invest.stable_plan') && (
                      <button
                        className="flex-1 py-2 rounded-lg text-sm transition-opacity active:opacity-70"
                        style={{ 
                          backgroundColor: colors.primary,
                          color: '#ffffff',
                        }}
                      >
                        {t('invest.early_redemption')}
                      </button>
                    )}
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
              <Wallet size={48} style={{ color: colors.textSecondary, margin: '0 auto 16px' }} />
              <div style={{ color: colors.textSecondary }}>{t('invest.no_records')}</div>
            </div>
          )}
        </div>

        {/* 收益计算器 */}
        <div 
          className="rounded-xl p-5"
          style={{ 
            backgroundColor: colors.cardBg,
            border: `1px solid ${colors.border}`,
          }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Zap size={20} style={{ color: colors.primary }} />
            <span style={{ color: colors.text }}>{t('invest.earnings_calculator')}</span>
          </div>
          
          <div className="space-y-3">
            <div>
              <div className="text-sm mb-2" style={{ color: colors.textSecondary }}>{t('invest.investment_amount')}</div>
              <div 
                className="rounded-lg p-4 flex items-center justify-between"
                style={{ backgroundColor: colors.bg }}
              >
                <input
                  type="number"
                  placeholder="1000"
                  className="flex-1 bg-transparent outline-none"
                  style={{ color: colors.text }}
                  value={calculatorAmount}
                  onChange={(e) => setCalculatorAmount(e.target.value)}
                />
                <span style={{ color: colors.textSecondary }}>USDT</span>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-2">
              {['1000', '5000', '10000'].map((amount) => (
                <button
                  key={amount}
                  className="py-2 rounded-lg text-sm transition-opacity active:opacity-70"
                  style={{ 
                    backgroundColor: colors.bg,
                    color: colors.text,
                    border: `1px solid ${colors.border}`,
                  }}
                  onClick={() => setCalculatorAmount(amount)}
                >
                  {amount}
                </button>
              ))}
            </div>
            
            <div 
              className="rounded-lg p-4"
              style={{ backgroundColor: `${colors.primary}10` }}
            >
              <div className="text-sm mb-2" style={{ color: colors.textSecondary }}>{t('invest.expected_30d_return')}</div>
              <div className="text-2xl" style={{ color: colors.primary }}>+{calculatorAmount ? (parseFloat(calculatorAmount) * 0.1 * 30 / 365).toFixed(2) : '0.00'} USDT</div>
            </div>
          </div>
        </div>

        {/* 投资优势 */}
        <div 
          className="rounded-xl p-4"
          style={{ 
            backgroundColor: colors.cardBg,
            border: `1px solid ${colors.border}`,
          }}
        >
          <div className="mb-3" style={{ color: colors.text }}>{t('invest.advantages')}</div>
          <div className="space-y-3 text-sm" style={{ color: colors.textSecondary }}>
            <div className="flex gap-3">
              <Shield size={18} style={{ color: colors.primary, flexShrink: 0, marginTop: 2 }} />
              <div>
                <div style={{ color: colors.text }}>{t('invest.advantage_1_title')}</div>
                <div>{t('invest.advantage_1_desc')}</div>
              </div>
            </div>
            <div className="flex gap-3">
              <TrendingUp size={18} style={{ color: colors.primary, flexShrink: 0, marginTop: 2 }} />
              <div>
                <div style={{ color: colors.text }}>{t('invest.advantage_2_title')}</div>
                <div>{t('invest.advantage_2_desc')}</div>
              </div>
            </div>
            <div className="flex gap-3">
              <Zap size={18} style={{ color: colors.primary, flexShrink: 0, marginTop: 2 }} />
              <div>
                <div style={{ color: colors.text }}>{t('invest.advantage_3_title')}</div>
                <div>{t('invest.advantage_3_desc')}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 投资确认模态框 */}
      {showInvestModal && selectedPlan && (
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center px-4"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
          onClick={() => setShowInvestModal(false)}
        >
          <div 
            className="rounded-2xl p-5 w-full max-w-sm shadow-2xl"
            style={{ backgroundColor: colors.cardBg }}
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <div style={{ color: colors.text }}>{t('invest.confirm_invest')}</div>
              <button
                className="p-1 -mr-1 rounded-lg transition-opacity active:opacity-70"
                style={{ color: colors.textSecondary }}
                onClick={() => setShowInvestModal(false)}
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div 
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${selectedPlan.color}20` }}
                >
                  <selectedPlan.icon size={20} style={{ color: selectedPlan.color }} />
                </div>
                <div>
                  <div className="text-sm mb-0.5" style={{ color: colors.text }}>{selectedPlan.name}</div>
                  <div className="text-xs" style={{ color: colors.textSecondary }}>{selectedPlan.desc}</div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <div className="text-xs mb-0.5" style={{ color: colors.textSecondary }}>{t('invest.period')}</div>
                  <div style={{ color: colors.text }}>{selectedPlan.period}</div>
                </div>
                <div>
                  <div className="text-xs mb-0.5" style={{ color: colors.textSecondary }}>{t('invest.min_invest')}</div>
                  <div style={{ color: colors.text }}>{selectedPlan.minAmount} USDT</div>
                </div>
              </div>
              
              <div className="space-y-1">
                <div className="text-xs" style={{ color: colors.textSecondary }}>{t('invest.apr')}</div>
                <div className="text-2xl" style={{ color: selectedPlan.color }}>{selectedPlan.rate}</div>
              </div>
              
              <div className="space-y-1.5">
                <div className="text-xs" style={{ color: colors.textSecondary }}>{t('invest.investment_amount')}</div>
                <div 
                  className="rounded-lg p-3 flex items-center justify-between"
                  style={{ backgroundColor: colors.bg }}
                >
                  <input
                    type="number"
                    placeholder="1000"
                    className="flex-1 bg-transparent outline-none text-sm"
                    style={{ color: colors.text }}
                    value={investAmount}
                    onChange={(e) => setInvestAmount(e.target.value)}
                  />
                  <span className="text-sm" style={{ color: colors.textSecondary }}>USDT</span>
                </div>
              </div>
              
              <div className="flex gap-2 pt-1">
                <button
                  className="flex-1 py-2.5 rounded-lg text-sm transition-opacity active:opacity-70"
                  style={{ 
                    backgroundColor: `${colors.primary}20`,
                    color: colors.primary,
                  }}
                  onClick={() => setShowInvestModal(false)}
                >
                  {t('common.cancel')}
                </button>
                <button
                  className="flex-1 py-2.5 rounded-lg text-sm transition-opacity active:opacity-70"
                  style={{ 
                    backgroundColor: selectedPlan.color,
                    color: '#ffffff',
                  }}
                  onClick={handleInvest}
                >
                  {t('invest.confirm_invest')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 投资详情模态框 */}
      {showDetailModal && selectedInvestment && (
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center px-4"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
          onClick={() => setShowDetailModal(false)}
        >
          <div 
            className="rounded-2xl p-4 w-full max-w-sm shadow-2xl max-h-[85vh] overflow-y-auto"
            style={{ backgroundColor: colors.cardBg }}
            onClick={e => e.stopPropagation()}
          >
            {/* 头部 */}
            <div className="flex items-center justify-between mb-3">
              <div style={{ color: colors.text }}>{selectedInvestment.plan}</div>
              <button
                className="p-1 rounded-lg transition-opacity active:opacity-70"
                style={{ color: colors.textSecondary }}
                onClick={() => setShowDetailModal(false)}
              >
                <X size={18} />
              </button>
            </div>
            
            {/* 金额和收益 */}
            <div 
              className="rounded-xl p-3 mb-3"
              style={{ 
                backgroundColor: colors.bg,
                border: `1px solid ${colors.border}`,
              }}
            >
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-2xl" style={{ color: colors.text }}>{selectedInvestment.amount}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span style={{ color: colors.textSecondary }}>{t('invest.total_earned')}</span>
                <span style={{ color: colors.success }}>+{selectedInvestment.earned}</span>
              </div>
            </div>
            
            {/* 进度条 */}
            <div className="mb-3">
              <div className="flex justify-between text-xs mb-1.5" style={{ color: colors.textSecondary }}>
                <span>{t('invest.held_days', { days: selectedInvestment.days, total: selectedInvestment.totalDays })}</span>
                <span>{((selectedInvestment.days / selectedInvestment.totalDays) * 100).toFixed(0)}%</span>
              </div>
              <div className="h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: colors.bg }}>
                <div 
                  className="h-full rounded-full transition-all"
                  style={{ 
                    width: `${(selectedInvestment.days / selectedInvestment.totalDays) * 100}%`,
                    backgroundColor: colors.primary,
                  }}
                />
              </div>
            </div>
            
            {/* 详细信息 */}
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span style={{ color: colors.textSecondary }}>{t('invest.annual_rate')}</span>
                <span style={{ color: colors.text }}>{selectedInvestment.rate}</span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: colors.textSecondary }}>{t('invest.daily_rate')}</span>
                <span style={{ color: colors.text }}>{(parseFloat(selectedInvestment.rate) / 365).toFixed(4)}%</span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: colors.textSecondary }}>{t('invest.start_time')}</span>
                <span style={{ color: colors.text }}>{selectedInvestment.startDate}</span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: colors.textSecondary }}>{t('invest.maturity_time')}</span>
                <span style={{ color: colors.text }}>{selectedInvestment.endDate}</span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: colors.textSecondary }}>{t('invest.expected_return')}</span>
                <span style={{ color: colors.success }}>+{(parseFloat(selectedInvestment.amount.replace(',', '')) * parseFloat(selectedInvestment.rate) / 100 * selectedInvestment.totalDays / 365).toFixed(2)} USDT</span>
              </div>
            </div>
            
            {/* 操作按钮 */}
            <div className="flex gap-2 pt-3">
              {selectedInvestment.plan === t('invest.stable_plan') && (
                <button
                  className="flex-1 py-2.5 rounded-lg text-xs transition-opacity active:opacity-70"
                  style={{ 
                    backgroundColor: `${colors.danger}20`,
                    color: colors.danger,
                  }}
                  onClick={() => {
                    toast.success(t('invest.early_redemption_submitted'));
                    setShowDetailModal(false);
                  }}
                >
                  {t('invest.early_redemption')}
                </button>
              )}
              <button
                className="flex-1 py-2.5 rounded-lg text-xs transition-opacity active:opacity-70"
                style={{ 
                  backgroundColor: colors.primary,
                  color: '#ffffff',
                }}
                onClick={() => setShowDetailModal(false)}
              >
                {t('common.close')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}