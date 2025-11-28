// 理财服务 - 模拟 API

// 模拟延迟
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * 获取理财产品列表
 * 返回原始数据，包含 Translation Key，页面负责翻译
 */
export async function fetchInvestPlans(): Promise<Array<{
  type: 'stable' | 'fixed' | 'high';
  nameKey: string; // Translation key，如 'invest.stable_plan'
  descKey: string; // Translation key，如 'invest.stable_plan_desc'
  riskKey: string; // Translation key，如 'invest.low_risk'
  featuresKeys: string[]; // Translation keys 数组
  rate: string;
  avgRate: number;
  period: number; // 天数，页面使用 t('invest.period_day', { count: period })
  minAmount: number;
}>> {
  await delay(800);
  return [
    {
      type: 'stable',
      nameKey: 'invest.stable_plan',
      descKey: 'invest.stable_plan_desc',
      riskKey: 'invest.low_risk',
      featuresKeys: ['invest.stable_features_1', 'invest.stable_features_2', 'invest.stable_features_3'],
      rate: '8-12%',
      avgRate: 10,
      period: 30,
      minAmount: 100,
    },
    {
      type: 'fixed',
      nameKey: 'invest.fixed_plan',
      descKey: 'invest.fixed_plan_desc',
      riskKey: 'invest.medium_low_risk',
      featuresKeys: ['invest.fixed_features_1', 'invest.fixed_features_2', 'invest.fixed_features_3'],
      rate: '15-20%',
      avgRate: 18,
      period: 90,
      minAmount: 500,
    },
    {
      type: 'high',
      nameKey: 'invest.high_plan',
      descKey: 'invest.high_plan_desc',
      riskKey: 'invest.medium_risk',
      featuresKeys: ['invest.high_features_1', 'invest.high_features_2', 'invest.high_features_3'],
      rate: '25-40%',
      avgRate: 32,
      period: 180,
      minAmount: 1000,
    },
  ];
}

/**
 * 获取我的投资记录
 * 返回原始数据，包含 Translation Key，页面负责翻译
 */
export async function fetchMyInvestments(): Promise<Array<{
  planKey: string; // Translation key，如 'invest.fixed_plan'
  statusKey: string; // Translation key，如 'invest.status_ongoing'
  amount: string;
  rate: string;
  earned: string;
  days: number;
  totalDays: number;
  startDate: string;
  endDate: string;
}>> {
  await delay(800);
  return [
    {
      planKey: 'invest.fixed_plan',
      statusKey: 'invest.status_ongoing',
      amount: '5,000 USDT',
      rate: '18%',
      earned: '450 USDT',
      days: 45,
      totalDays: 90,
      startDate: '2024-10-11',
      endDate: '2024-01-09',
    },
    {
      planKey: 'invest.stable_plan',
      statusKey: 'invest.status_ongoing',
      amount: '2,000 USDT',
      rate: '10%',
      earned: '120 USDT',
      days: 18,
      totalDays: 30,
      startDate: '2024-11-07',
      endDate: '2024-12-07',
    },
  ];
}

