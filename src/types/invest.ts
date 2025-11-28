// 理财产品类型定义

import { LucideIcon } from 'lucide-react';

// 投资计划类型
export interface InvestPlan {
  name: string;
  type: 'stable' | 'fixed' | 'high';
  rate: string;
  avgRate: number;
  period: string;
  minAmount: number;
  risk: string;
  desc: string;
  features: string[];
  icon: LucideIcon;
  color: string;
}

// 投资记录类型
export interface InvestmentRecord {
  plan: string;
  amount: string;
  rate: string;
  earned: string;
  days: number;
  totalDays: number;
  status: string;
  startDate: string;
  endDate: string;
}

