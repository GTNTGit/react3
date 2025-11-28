import React, { useState } from 'react';
import { ArrowLeft, TrendingUp, Clock, Users, Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { useTranslation } from 'react-i18next';

export default function IEO() {
  const navigate = useNavigate();
  const { colors } = useTheme();
  const { t } = useTranslation();
  const [selectedProject, setSelectedProject] = useState<any>(null);
  
  const ongoingProjects = [
    {
      name: 'MetaChain',
      symbol: 'META',
      price: '0.1 USDT',
      total: '10,000,000',
      sold: 7500000,
      progress: 75,
      startDate: '2024-11-20',
      endDate: '2024-11-30',
      minBuy: '100 USDT',
      maxBuy: '10,000 USDT',
      status: t('ieo.status_ongoing'),
      roi: '+350%',
      desc: 'MetaChain是新一代区块链基础设施，专注于元宇宙应用开发',
    },
    {
      name: 'DeFiSwap',
      symbol: 'DFS',
      price: '0.05 USDT',
      total: '20,000,000',
      sold: 15000000,
      progress: 75,
      startDate: '2024-11-22',
      endDate: '2024-12-02',
      minBuy: '50 USDT',
      maxBuy: '5,000 USDT',
      status: t('ieo.status_ongoing'),
      roi: '+280%',
      desc: 'DeFiSwap是去中心化交易协议，提供低滑点高效率的交易体验',
    },
  ];
  
  const upcomingProjects = [
    {
      name: 'GameFi Pro',
      symbol: 'GFP',
      price: '0.08 USDT',
      total: '15,000,000',
      startDate: '2024-12-05',
      status: t('ieo.status_upcoming'),
      desc: 'GameFi Pro是区块链游戏聚合平台',
    },
    {
      name: 'AI Network',
      symbol: 'AIN',
      price: '0.12 USDT',
      total: '8,000,000',
      startDate: '2024-12-10',
      status: t('ieo.status_upcoming'),
      desc: 'AI Network是AI驱动的去中心化计算网络',
    },
  ];
  
  const completedProjects = [
    {
      name: 'ChainLink 2.0',
      symbol: 'LINK2',
      price: '0.15 USDT',
      listingPrice: '0.68 USDT',
      roi: '+353%',
      status: t('ieo.status_completed'),
    },
    {
      name: 'Web3 Storage',
      symbol: 'W3S',
      price: '0.06 USDT',
      listingPrice: '0.23 USDT',
      roi: '+283%',
      status: t('ieo.status_completed'),
    },
  ];

  const myParticipations = [
    {
      project: 'MetaChain',
      symbol: 'META',
      amount: '1,000 USDT',
      tokens: '10,000 META',
      value: '1,420 USDT',
      profit: '+420 USDT',
      profitPercent: '+42%',
      status: t('ieo.status_holding'),
    },
  ];

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
        <span style={{ color: colors.text }}>{t('ieo.title')}</span>
        <div className="w-8" />
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* IEO 统计 - 深色版本 */}
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
                <pattern id="grid-ieo" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid-ieo)" style={{ color: colors.text }} />
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
                  <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill={colors.primary} fillOpacity="0.9"/>
                </svg>
              </div>
              
              <div>
                <div className="text-xs mb-0.5" style={{ color: colors.text }}>{t('ieo.my_participations')}</div>
                <div 
                  className="px-2 py-0.5 rounded text-xs"
                  style={{ 
                    backgroundColor: `${colors.primary}20`,
                    color: colors.primary,
                  }}
                >
                  {t('ieo.title')} {t('invest.total_earnings')}
                </div>
              </div>
            </div>
            
            {/* 金额展示 */}
            <div className="mb-4">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl tracking-tight" style={{ color: colors.text }}>
                  1,000.00
                </span>
                <span className="text-lg" style={{ color: colors.textSecondary }}>USDT</span>
              </div>
              <div className="flex items-center gap-1.5 mt-1.5">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 2V14M5 5L8 2L11 5" stroke={colors.success} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="text-xs" style={{ color: colors.success }}>{t('invest.total_earnings')} +42%</span>
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
                  <div className="text-xs mb-1" style={{ color: colors.textSecondary }}>{t('ieo.total_projects')}</div>
                  <div style={{ color: colors.text }}>1</div>
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
                  <div className="text-xs mb-1" style={{ color: colors.textSecondary }}>{t('ieo.current_value')}</div>
                  <div style={{ color: colors.text }}>1,420</div>
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
                  <div className="text-xs mb-1" style={{ color: colors.textSecondary }}>{t('invest.total_earnings')}</div>
                  <div style={{ color: colors.success }}>+42%</div>
                </div>
                <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full opacity-5" style={{ backgroundColor: colors.primary }} />
              </div>
            </div>
          </div>
        </div>

        {/* 进行中的项目 */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <span style={{ color: colors.text }}>{t('ieo.status_ongoing')}</span>
            <span className="text-sm" style={{ color: colors.textSecondary }}>{ongoingProjects.length} {t('ieo.total_projects')}</span>
          </div>
          
          <div className="space-y-4">
            {ongoingProjects.map((project, index) => (
              <div
                key={index}
                className="rounded-xl p-5"
                style={{ 
                  backgroundColor: colors.cardBg,
                  border: `1px solid ${colors.border}`,
                }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: `${colors.primary}20` }}
                    >
                      <span style={{ color: colors.primary }}>{project.symbol}</span>
                    </div>
                    <div>
                      <div className="mb-1" style={{ color: colors.text }}>{project.name}</div>
                      <div className="text-sm" style={{ color: colors.textSecondary }}>{project.symbol}</div>
                    </div>
                  </div>
                  <div
                    className="px-3 py-1 rounded-full text-xs"
                    style={{ 
                      backgroundColor: `${colors.success}20`,
                      color: colors.success,
                    }}
                  >
                    {project.status}
                  </div>
                </div>
                
                <div className="text-sm mb-3" style={{ color: colors.textSecondary }}>
                  {project.desc}
                </div>
                
                <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                  <div>
                    <div style={{ color: colors.textSecondary }}>{t('ieo.listing_price')}</div>
                    <div style={{ color: colors.text }}>{project.price}</div>
                  </div>
                  <div>
                    <div style={{ color: colors.textSecondary }}>{t('invest.expected_maturity_yield')}</div>
                    <div style={{ color: colors.success }}>{project.roi}</div>
                  </div>
                  <div>
                    <div style={{ color: colors.textSecondary }}>{t('ieo.min_buy')} - {t('ieo.max_buy')}</div>
                    <div style={{ color: colors.text }}>{project.minBuy} - {project.maxBuy}</div>
                  </div>
                  <div>
                    <div style={{ color: colors.textSecondary }}>{t('invest.end_time')}</div>
                    <div style={{ color: colors.text }}>{project.endDate}</div>
                  </div>
                </div>
                
                {/* 进度条 */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs mb-2">
                    <span style={{ color: colors.textSecondary }}>{t('ieo.sold')}</span>
                    <span style={{ color: colors.text }}>{project.progress}%</span>
                  </div>
                  <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: colors.bg }}>
                    <div 
                      className="h-full rounded-full transition-all"
                      style={{ 
                        width: `${project.progress}%`,
                        backgroundColor: colors.primary,
                      }}
                    />
                  </div>
                  <div className="flex justify-between text-xs mt-1" style={{ color: colors.textSecondary }}>
                    <span>{project.sold.toLocaleString()} {project.symbol}</span>
                    <span>{parseInt(project.total).toLocaleString()} {project.symbol}</span>
                  </div>
                </div>
                
                <button
                  className="w-full py-3 rounded-xl transition-opacity active:opacity-70"
                  style={{ backgroundColor: colors.primary }}
                  onClick={() => setSelectedProject(project)}
                >
                  <span className="text-white">{t('ieo.buy_now')}</span>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* 即将开始 */}
        <div>
          <div className="mb-4" style={{ color: colors.text }}>{t('ieo.status_upcoming')}</div>
          <div className="space-y-3">
            {upcomingProjects.map((project, index) => (
              <div
                key={index}
                className="rounded-xl p-4"
                style={{ 
                  backgroundColor: colors.cardBg,
                  border: `1px solid ${colors.border}`,
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: `${colors.primary}20` }}
                    >
                      <span className="text-sm" style={{ color: colors.primary }}>{project.symbol}</span>
                    </div>
                    <div>
                      <div style={{ color: colors.text }}>{project.name}</div>
                      <div className="text-sm" style={{ color: colors.textSecondary }}>{project.symbol}</div>
                    </div>
                  </div>
                  <div
                    className="px-3 py-1 rounded-full text-xs"
                    style={{ 
                      backgroundColor: `${colors.warning}20`,
                      color: colors.warning,
                    }}
                  >
                    {project.status}
                  </div>
                </div>
                <div className="text-sm mb-2" style={{ color: colors.textSecondary }}>
                  {project.desc}
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock size={14} style={{ color: colors.textSecondary }} />
                  <span style={{ color: colors.textSecondary }}>{t('invest.start_time')}: {project.startDate}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 已完成项目 */}
        <div>
          <div className="mb-4" style={{ color: colors.text }}>{t('ieo.status_completed')}</div>
          <div className="space-y-3">
            {completedProjects.map((project, index) => (
              <div
                key={index}
                className="rounded-xl p-4"
                style={{ 
                  backgroundColor: colors.cardBg,
                  border: `1px solid ${colors.border}`,
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: `${colors.textSecondary}20` }}
                    >
                      <span className="text-sm" style={{ color: colors.textSecondary }}>{project.symbol}</span>
                    </div>
                    <div>
                      <div style={{ color: colors.text }}>{project.name}</div>
                      <div className="text-sm" style={{ color: colors.textSecondary }}>
                        {project.price} → {project.listingPrice}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div style={{ color: colors.success }}>{project.roi}</div>
                    <div className="text-xs" style={{ color: colors.textSecondary }}>{project.status}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 我的参与 */}
        <div>
          <div className="mb-4" style={{ color: colors.text }}>{t('ieo.my_participations')}</div>
          {myParticipations.length > 0 ? (
            <div className="space-y-3">
              {myParticipations.map((item, index) => (
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
                      <div className="mb-1" style={{ color: colors.text }}>{item.project}</div>
                      <div className="text-sm" style={{ color: colors.textSecondary }}>{item.symbol}</div>
                    </div>
                    <div
                      className="px-3 py-1 rounded-full text-xs"
                      style={{ 
                        backgroundColor: `${colors.success}20`,
                        color: colors.success,
                      }}
                    >
                      {item.status}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <div style={{ color: colors.textSecondary }}>{t('invest.investment_amount')}</div>
                      <div style={{ color: colors.text }}>{item.amount}</div>
                    </div>
                    <div>
                      <div style={{ color: colors.textSecondary }}>{t('ieo.my_tokens')}</div>
                      <div style={{ color: colors.text }}>{item.tokens}</div>
                    </div>
                    <div>
                      <div style={{ color: colors.textSecondary }}>{t('ieo.current_value')}</div>
                      <div style={{ color: colors.text }}>{item.value}</div>
                    </div>
                    <div>
                      <div style={{ color: colors.textSecondary }}>{t('ieo.profit_loss')}</div>
                      <div style={{ color: colors.success }}>{item.profit} ({item.profitPercent})</div>
                    </div>
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
              <Target size={48} style={{ color: colors.textSecondary, margin: '0 auto 16px' }} />
              <div style={{ color: colors.textSecondary }}>{t('ieo.no_participations')}</div>
            </div>
          )}
        </div>

        {/* IEO 说明 */}
        <div 
          className="rounded-xl p-4"
          style={{ 
            backgroundColor: colors.cardBg,
            border: `1px solid ${colors.border}`,
          }}
        >
          <div className="mb-3" style={{ color: colors.text }}>{t('ieo.what_is_ieo')}</div>
          <div className="space-y-2 text-sm" style={{ color: colors.textSecondary }}>
            <div>{t('ieo.ieo_description')}</div>
            <div className="mt-3" style={{ color: colors.text }}>{t('ieo.participation_advantages')}</div>
            <div>• {t('ieo.advantage_1')}</div>
            <div>• {t('ieo.advantage_2')}</div>
            <div>• {t('ieo.advantage_3')}</div>
            <div>• {t('ieo.advantage_4')}</div>
          </div>
        </div>
      </div>
    </div>
  );
}