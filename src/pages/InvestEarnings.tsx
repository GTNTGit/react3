import { ArrowLeft, TrendingUp, Calendar, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function InvestEarnings() {
  const navigate = useNavigate();
  const { colors } = useTheme();
  const { t } = useTranslation();
  const [selectedPeriod, setSelectedPeriod] = useState('7d');
  const [selectedType, setSelectedType] = useState('all');

  // 模拟收益走势数据
  const earningsData = [
    { date: '11/19', earnings: 15.2 },
    { date: '11/20', earnings: 32.5 },
    { date: '11/21', earnings: 48.8 },
    { date: '11/22', earnings: 67.3 },
    { date: '11/23', earnings: 89.5 },
    { date: '11/24', earnings: 112.8 },
    { date: '11/25', earnings: 138.4 },
  ];

  // 将 earningsRecords 数组移入组件内部，以便使用 t() 翻译
  const earningsRecords = [
    {
      date: '2024-11-25',
      time: '00:00',
      type: t('invest_earnings.type_fixed'),
      amount: '+25.60',
      principal: '5,000',
      rate: '18%',
      status: t('invest_earnings.status_received'),
    },
    {
      date: '2024-11-24',
      time: '00:00',
      type: t('invest_earnings.type_stable'),
      amount: '+5.48',
      principal: '2,000',
      rate: '10%',
      status: t('invest_earnings.status_received'),
    },
    {
      date: '2024-11-23',
      time: '00:00',
      type: t('invest_earnings.type_fixed'),
      amount: '+24.66',
      principal: '5,000',
      rate: '18%',
      status: t('invest_earnings.status_received'),
    },
    {
      date: '2024-11-23',
      time: '00:00',
      type: t('invest_earnings.type_stable'),
      amount: '+5.48',
      principal: '2,000',
      rate: '10%',
      status: t('invest_earnings.status_received'),
    },
    {
      date: '2024-11-22',
      time: '00:00',
      type: t('invest_earnings.type_fixed'),
      amount: '+24.66',
      principal: '5,000',
      rate: '18%',
      status: t('invest_earnings.status_received'),
    },
    {
      date: '2024-11-22',
      time: '00:00',
      type: t('invest_earnings.type_stable'),
      amount: '+5.48',
      principal: '2,000',
      rate: '10%',
      status: t('invest_earnings.status_received'),
    },
    {
      date: '2024-11-21',
      time: '00:00',
      type: t('invest_earnings.type_fixed'),
      amount: '+24.66',
      principal: '5,000',
      rate: '18%',
      status: t('invest_earnings.status_received'),
    },
    {
      date: '2024-11-21',
      time: '00:00',
      type: t('invest_earnings.type_stable'),
      amount: '+5.48',
      principal: '2,000',
      rate: '10%',
      status: t('invest_earnings.status_received'),
    },
  ];

  // 将 periods 和 types 数组移入组件内部，以便使用 t() 翻译
  const periods = [
    { label: t('invest_earnings.period_7d'), value: '7d' },
    { label: t('invest_earnings.period_30d'), value: '30d' },
    { label: t('invest_earnings.period_90d'), value: '90d' },
    { label: t('invest_earnings.period_all'), value: 'all' },
  ];

  const types = [
    { label: t('invest_earnings.period_all'), value: 'all' },
    { label: t('invest_earnings.type_stable'), value: 'stable' },
    { label: t('invest_earnings.type_fixed'), value: 'fixed' },
    { label: t('invest_earnings.type_high'), value: 'high' },
  ];

  return (
    <div className="min-h-screen pb-20" style={{ backgroundColor: colors.bg }}>
      {/* Header */}
      <div 
        className="sticky top-0 z-50 px-4 py-4 flex items-center justify-between"
        style={{ 
          backgroundColor: colors.bg,
          borderBottom: `1px solid ${colors.border}`,
        }}
      >
        <button onClick={() => navigate('/invest')} className="p-2 -ml-2">
          <ArrowLeft size={24} style={{ color: colors.text }} />
        </button>
        <span style={{ color: colors.text }}>{t('invest_earnings.title')}</span>
        <div className="w-10" />
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* 累计收益统计 */}
        <div 
          className="rounded-2xl p-5 relative overflow-hidden"
          style={{ 
            backgroundColor: colors.cardBg,
            border: `1px solid ${colors.border}`,
          }}
        >
          {/* 背景装饰 */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 right-0 w-40 h-40 rounded-full" style={{ background: colors.success, transform: 'translate(30%, -30%)' }} />
            <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full" style={{ background: colors.success, transform: 'translate(-30%, 30%)' }} />
          </div>

          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp size={20} style={{ color: colors.success }} />
              <span className="text-sm" style={{ color: colors.textSecondary }}>{t('invest_earnings.total_earnings')}</span>
            </div>
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-4xl" style={{ color: colors.success }}>570.00</span>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="text-center">
                <div className="text-xs mb-1" style={{ color: colors.textSecondary }}>{t('invest_earnings.today_earnings')}</div>
                <div style={{ color: colors.success }}>+31.08</div>
              </div>
              <div className="text-center">
                <div className="text-xs mb-1" style={{ color: colors.textSecondary }}>{t('invest_earnings.week_earnings')}</div>
                <div style={{ color: colors.success }}>+217.56</div>
              </div>
              <div className="text-center">
                <div className="text-xs mb-1" style={{ color: colors.textSecondary }}>{t('invest_earnings.month_earnings')}</div>
                <div style={{ color: colors.success }}>+570.00</div>
              </div>
            </div>
          </div>
        </div>

        {/* 收益走势图 */}
        <div 
          className="rounded-2xl p-4"
          style={{ 
            backgroundColor: colors.cardBg,
            border: `1px solid ${colors.border}`,
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <span style={{ color: colors.text }}>{t('invest_earnings.earnings_trend')}</span>
            <div className="flex gap-1">
              {periods.map((period) => (
                <button
                  key={period.value}
                  className="px-3 py-1.5 rounded-lg text-xs transition-all"
                  style={{
                    backgroundColor: selectedPeriod === period.value ? colors.primary : colors.bg,
                    color: selectedPeriod === period.value ? '#ffffff' : colors.textSecondary,
                  }}
                  onClick={() => setSelectedPeriod(period.value)}
                >
                  {period.label}
                </button>
              ))}
            </div>
          </div>

          <div style={{ width: '100%', height: 200 }}>
            <ResponsiveContainer>
              <LineChart data={earningsData}>
                <defs>
                  <linearGradient id="earningsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={colors.success} stopOpacity={0.3}/>
                    <stop offset="95%" stopColor={colors.success} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={colors.border} opacity={0.3} />
                <XAxis 
                  dataKey="date" 
                  stroke={colors.textSecondary}
                  style={{ fontSize: '12px' }}
                />
                <YAxis 
                  stroke={colors.textSecondary}
                  style={{ fontSize: '12px' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: colors.cardBg, 
                    border: `1px solid ${colors.border}`,
                    borderRadius: '8px',
                    color: colors.text,
                  }}
                  formatter={(value: number | string) => [`${value} USDT`, t('invest_earnings.accumulated_earnings')]}
                />
                <Line 
                  type="monotone" 
                  dataKey="earnings" 
                  stroke={colors.success}
                  strokeWidth={2}
                  dot={{ fill: colors.success, r: 4 }}
                  activeDot={{ r: 6 }}
                  fill="url(#earningsGradient)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 筛选 */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
          {types.map((type) => (
            <button
              key={type.value}
              className="px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-all"
              style={{
                backgroundColor: selectedType === type.value ? `${colors.primary}20` : colors.cardBg,
                color: selectedType === type.value ? colors.primary : colors.text,
                border: `1px solid ${selectedType === type.value ? colors.primary : colors.border}`,
              }}
              onClick={() => setSelectedType(type.value)}
            >
              {type.label}
            </button>
          ))}
        </div>

        {/* 收益记录列表 */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <span style={{ color: colors.text }}>{t('invest_earnings.earnings_detail')}</span>
            <span className="text-sm" style={{ color: colors.textSecondary }}>{t('invest_earnings.records_count', { count: earningsRecords.length })}</span>
          </div>

          <div className="space-y-3">
            {earningsRecords.map((record, index) => (
              <div
                key={index}
                className="rounded-xl p-4"
                style={{ 
                  backgroundColor: colors.cardBg,
                  border: `1px solid ${colors.border}`,
                }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="mb-1" style={{ color: colors.text }}>{record.type}</div>
                    <div className="flex items-center gap-2 text-xs" style={{ color: colors.textSecondary }}>
                      <Calendar size={12} />
                      <span>{record.date} {record.time}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="mb-1" style={{ color: colors.success }}>{record.amount}</div>
                    <div 
                      className="text-xs px-2 py-0.5 rounded inline-block"
                      style={{ 
                        backgroundColor: `${colors.success}20`,
                        color: colors.success,
                      }}
                    >
                      {record.status}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs pt-3" style={{ borderTop: `1px solid ${colors.border}` }}>
                  <div className="flex items-center gap-4">
                    <div>
                      <span style={{ color: colors.textSecondary }}>{t('invest_earnings.principal')}: </span>
                      <span style={{ color: colors.text }}>{record.principal} USDT</span>
                    </div>
                    <div>
                      <span style={{ color: colors.textSecondary }}>{t('invest_earnings.apr')}: </span>
                      <span style={{ color: colors.text }}>{record.rate}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}