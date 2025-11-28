import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';

interface TradingPair {
  symbol: string;
  name: string;
  fullName: string;
  currentPrice: number;
  change24h: number;
  category: string;
  color: string;
  icon: string;
}

interface PairSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPair: TradingPair;
  onSelectPair: (pair: TradingPair) => void;
  tradingPairs: TradingPair[];
  favorites: string[];
  onToggleFavorite: (symbol: string) => void;
  isDark: boolean;
}

export function PairSelectorModal({
  isOpen,
  onClose,
  selectedPair,
  onSelectPair,
  tradingPairs,
  favorites,
  onToggleFavorite,
  isDark,
}: PairSelectorModalProps) {
  const { colors } = useTheme();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [pairCategory, setPairCategory] = React.useState<'favorites' | 'web3' | 'precious' | 'futures' | 'forex' | 'stock'>('web3');
  const [showSortMenu, setShowSortMenu] = React.useState(false);
  const [sortBy, setSortBy] = React.useState<'default' | 'change' | 'price' | 'volume'>('default');
  const [sortDirection, setSortDirection] = React.useState<'asc' | 'desc'>('desc');

  if (!isOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 z-[100]"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
        onClick={() => {
          onClose();
          setSearchQuery('');
        }}
      />
      <div 
        className="fixed top-0 left-0 right-0 z-[101] shadow-2xl"
        style={{ 
          backgroundColor: colors.bg,
          maxHeight: '80vh',
          borderRadius: '0 0 24px 24px',
          border: isDark ? `2px solid ${colors.border}` : 'none',
          borderTop: 'none',
          boxShadow: isDark
            ? `0 0 0 1px rgba(245, 158, 11, 0.15), 0 12px 48px rgba(0, 0, 0, 0.6), 0 0 80px rgba(245, 158, 11, 0.1)`
            : '0 12px 48px rgba(0, 0, 0, 0.2)',
          backdropFilter: isDark ? 'blur(24px)' : 'none',
          animation: 'slideDownFromTop 0.3s ease-out',
        }}
      >
        {/* 搜索框 */}
        <div 
          className="px-4 pt-4 pb-3 flex items-center gap-2"
          style={{ 
            backgroundColor: colors.bg,
            borderBottom: `1px solid ${colors.border}`,
          }}
        >
          <div 
            className="flex-1 flex items-center gap-2 px-3 py-2.5 rounded-xl"
            style={{ 
              backgroundColor: colors.cardBg,
              border: `1px solid ${searchQuery ? colors.primary : colors.border}`,
            }}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <circle 
                cx="8" 
                cy="8" 
                r="6" 
                stroke={searchQuery ? colors.primary : colors.textSecondary}
                strokeWidth="1.5"
              />
              <path 
                d="M12.5 12.5L16 16" 
                stroke={searchQuery ? colors.primary : colors.textSecondary}
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜索币种..."
              className="flex-1 bg-transparent outline-none text-sm"
              style={{ color: colors.text }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="w-5 h-5 flex items-center justify-center rounded-full transition-all active:scale-90"
                style={{ backgroundColor: colors.border }}
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 2L10 10M2 10L10 2" stroke={colors.textSecondary} strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>
            )}
          </div>
          
          {/* 筛选按钮 */}
          <button
            onClick={() => setShowSortMenu(!showSortMenu)}
            className="w-10 h-10 flex items-center justify-center rounded-xl transition-all active:opacity-70"
            style={{ 
              backgroundColor: showSortMenu ? `${colors.primary}20` : colors.cardBg,
            }}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path 
                d="M2 4.5h14M4 9h10M6 13.5h6" 
                stroke={showSortMenu ? colors.primary : colors.textSecondary}
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <circle cx="13" cy="4.5" r="1.5" fill={showSortMenu ? colors.primary : colors.textSecondary} />
              <circle cx="7" cy="9" r="1.5" fill={showSortMenu ? colors.primary : colors.textSecondary} />
              <circle cx="11" cy="13.5" r="1.5" fill={showSortMenu ? colors.primary : colors.textSecondary} />
            </svg>
          </button>
        </div>

        {/* 排序选项 */}
        {showSortMenu && (
          <div 
            className="px-4 py-3"
            style={{ 
              backgroundColor: colors.bg,
              borderBottom: `1px solid ${colors.border}`,
            }}
          >
            <div className="flex items-center gap-2">
              <span className="text-xs" style={{ color: colors.textSecondary }}>排序:</span>
              <div className="flex-1">
                <div 
                  className="inline-flex items-center gap-0.5 p-0.5 rounded-full overflow-x-auto"
                  style={{ 
                    backgroundColor: colors.cardBg,
                  }}
                >
                  {[
                    { id: 'default', label: '默认' },
                    { id: 'change', label: '涨跌幅' },
                    { id: 'price', label: '价格' },
                    { id: 'volume', label: '成交量' },
                  ].map((sort) => (
                    <button
                      key={sort.id}
                      onClick={() => {
                        if (sortBy === sort.id) {
                          setSortDirection(prev => prev === 'desc' ? 'asc' : 'desc');
                        } else {
                          setSortBy(sort.id as any);
                          setSortDirection('desc');
                        }
                      }}
                      className="px-3 py-1 rounded-full whitespace-nowrap text-xs font-medium transition-all"
                      style={{
                        backgroundColor: sortBy === sort.id ? `${colors.primary}25` : 'transparent',
                        color: sortBy === sort.id ? colors.primary : colors.textSecondary,
                      }}
                    >
                      {sort.label}
                      {sortBy === sort.id && (
                        <span className="ml-1">{sortDirection === 'desc' ? '↓' : '↑'}</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 分类标签 */}
        <div 
          className="px-4 py-2.5"
          style={{ 
            borderBottom: `1px solid ${colors.border}`,
            backgroundColor: colors.bg,
          }}
        >
          <div 
            className="inline-flex items-center gap-0.5 p-0.5 rounded-full overflow-x-auto"
            style={{ 
              backgroundColor: colors.cardBg,
            }}
          >
            {[
              { id: 'favorites', label: '收藏' },
              { id: 'web3', label: 'Web3' },
              { id: 'precious', label: '贵金属' },
              { id: 'futures', label: '期货' },
              { id: 'forex', label: '外汇' },
              { id: 'stock', label: '股票' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setPairCategory(cat.id as any)}
                className="px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all"
                style={{
                  backgroundColor: pairCategory === cat.id ? `${colors.success}25` : 'transparent',
                  color: pairCategory === cat.id ? colors.success : colors.textSecondary,
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* 24h统计数据 */}
        <div 
          className="px-4 py-3"
          style={{ 
            backgroundColor: colors.bg,
            borderBottom: `1px solid ${colors.border}`,
          }}
        >
          <div className="grid grid-cols-3 gap-2.5">
            <div 
              className="relative overflow-hidden rounded-lg p-2.5"
              style={{ 
                backgroundColor: colors.cardBg,
                border: isDark ? `1.5px solid ${colors.border}` : `1px solid ${colors.border}`,
                boxShadow: isDark ? `0 0 0 0.5px rgba(34, 197, 94, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.05)` : 'none',
              }}
            >
              <div 
                className="absolute top-0 right-0 w-12 h-12 rounded-full blur-xl opacity-20"
                style={{ background: colors.success }}
              />
              <div className="relative">
                <div className="flex items-center gap-1 mb-1">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M5 1L9 7H1L5 1Z" fill={colors.success} />
                  </svg>
                  <span className="text-xs" style={{ color: colors.textSecondary }}>24h上涨</span>
                </div>
                <div className="text-base" style={{ color: colors.success }}>247</div>
              </div>
            </div>

            <div 
              className="relative overflow-hidden rounded-lg p-2.5"
              style={{ 
                backgroundColor: colors.cardBg,
                border: isDark ? `1.5px solid ${colors.border}` : `1px solid ${colors.border}`,
                boxShadow: isDark ? `0 0 0 0.5px rgba(239, 68, 68, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.05)` : 'none',
              }}
            >
              <div 
                className="absolute top-0 right-0 w-12 h-12 rounded-full blur-xl opacity-20"
                style={{ background: colors.danger }}
              />
              <div className="relative">
                <div className="flex items-center gap-1 mb-1">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M5 9L1 3H9L5 9Z" fill={colors.danger} />
                  </svg>
                  <span className="text-xs" style={{ color: colors.textSecondary }}>24h下跌</span>
                </div>
                <div className="text-base" style={{ color: colors.danger }}>183</div>
              </div>
            </div>

            <div 
              className="relative overflow-hidden rounded-lg p-2.5"
              style={{ 
                backgroundColor: colors.cardBg,
                border: isDark ? `1.5px solid ${colors.border}` : `1px solid ${colors.border}`,
                boxShadow: isDark ? `0 0 0 0.5px rgba(245, 158, 11, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.05)` : 'none',
              }}
            >
              <div 
                className="absolute top-0 right-0 w-12 h-12 rounded-full blur-xl opacity-20"
                style={{ background: colors.primary }}
              />
              <div className="relative">
                <div className="flex items-center gap-1 mb-1">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <rect x="1" y="1" width="3.5" height="3.5" rx="0.5" fill={colors.primary} opacity="0.5" />
                    <rect x="5.5" y="1" width="3.5" height="3.5" rx="0.5" fill={colors.primary} opacity="0.7" />
                    <rect x="1" y="5.5" width="3.5" height="3.5" rx="0.5" fill={colors.primary} opacity="0.7" />
                    <rect x="5.5" y="5.5" width="3.5" height="3.5" rx="0.5" fill={colors.primary} />
                  </svg>
                  <span className="text-xs" style={{ color: colors.textSecondary }}>种类数</span>
                </div>
                <div className="text-base" style={{ color: colors.primary }}>
                  {pairCategory === 'favorites' 
                    ? tradingPairs.filter(p => favorites.includes(p.symbol)).length
                    : tradingPairs.filter(p => p.category === pairCategory).length
                  }
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 列表表头 */}
        <div 
          className="px-4 py-2 flex items-center text-xs"
          style={{ 
            color: colors.textSecondary,
            backgroundColor: colors.bg,
            borderBottom: `1px solid ${colors.border}`,
          }}
        >
          <div style={{ width: '40px' }}></div>
          <div style={{ flex: 1 }}>名称</div>
          <div style={{ width: '90px', textAlign: 'right' }}>最新价</div>
          <div style={{ width: '70px', textAlign: 'right' }}>涨跌幅</div>
          <div style={{ width: '32px' }}></div>
        </div>

        {/* 交易对列表 */}
        <div className="overflow-y-auto" style={{ maxHeight: 'calc(80vh - 280px)' }}>
          {(() => {
            const filteredPairs = tradingPairs.filter((pair) => {
              const categoryMatch = pairCategory === 'favorites' 
                ? favorites.includes(pair.symbol)
                : pair.category === pairCategory;
              
              if (searchQuery) {
                const query = searchQuery.toLowerCase();
                const symbolMatch = pair.symbol.toLowerCase().includes(query);
                const nameMatch = pair.name.toLowerCase().includes(query);
                const fullNameMatch = pair.fullName.toLowerCase().includes(query);
                return categoryMatch && (symbolMatch || nameMatch || fullNameMatch);
              }
              
              return categoryMatch;
            });
            
            const sortedPairs = [...filteredPairs].sort((a, b) => {
              let comparison = 0;
              
              switch (sortBy) {
                case 'change':
                  comparison = a.change24h - b.change24h;
                  break;
                case 'price':
                  comparison = a.currentPrice - b.currentPrice;
                  break;
                case 'volume':
                  const volumeA = a.currentPrice * Math.abs(a.change24h);
                  const volumeB = b.currentPrice * Math.abs(b.change24h);
                  comparison = volumeA - volumeB;
                  break;
                default:
                  return 0;
              }
              
              return sortDirection === 'desc' ? -comparison : comparison;
            });
            
            const displayPairs = sortedPairs.slice(0, 8);
            const hasMore = sortedPairs.length > 8;
            
            return (
              <>
                {displayPairs.map((pair) => (
                  <div
                    key={pair.symbol}
                    className="w-full px-4 py-3 flex items-center"
                    style={{
                      backgroundColor: selectedPair.symbol === pair.symbol ? `${colors.primary}10` : 'transparent',
                      borderBottom: isDark ? `1px solid ${colors.border}` : `1px solid ${colors.border}`,
                      borderLeft: selectedPair.symbol === pair.symbol && isDark ? `3px solid ${colors.primary}` : '3px solid transparent',
                    }}
                  >
                    {/* 收藏按钮 */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite(pair.symbol);
                      }}
                      className="w-10 h-10 flex items-center justify-center transition-all active:scale-90"
                    >
                      {favorites.includes(pair.symbol) ? (
                        <svg width="18" height="18" viewBox="0 0 20 20" fill={colors.primary}>
                          <path d="M10 15.27L16.18 19l-1.64-7.03L20 7.24l-7.19-.61L10 0 7.19 6.63 0 7.24l5.46 4.73L3.82 19z"/>
                        </svg>
                      ) : (
                        <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke={colors.textSecondary} strokeWidth="1.5">
                          <path d="M10 15.27L16.18 19l-1.64-7.03L20 7.24l-7.19-.61L10 0 7.19 6.63 0 7.24l5.46 4.73L3.82 19z"/>
                        </svg>
                      )}
                    </button>

                    <button
                      onClick={() => {
                        onSelectPair(pair);
                        onClose();
                        setSearchQuery('');
                      }}
                      className="flex-1 flex items-center transition-all active:opacity-70"
                    >
                      {/* 币种图标 */}
                      <div className="w-7 h-7 rounded-full flex items-center justify-center mr-2.5 flex-shrink-0 overflow-hidden">
                        <img 
                          src={pair.icon} 
                          alt={pair.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            e.currentTarget.parentElement!.innerHTML = `
                              <div style="
                                width: 28px;
                                height: 28px;
                                border-radius: 50%;
                                background-color: ${pair.color}20;
                                border: 1.5px solid ${pair.color}40;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                font-size: 10px;
                                color: ${pair.color};
                                font-weight: 600;
                              ">
                                ${pair.name.split('/')[0].slice(0, 3).toUpperCase()}
                              </div>
                            `;
                          }}
                        />
                      </div>

                      {/* 币种信息 */}
                      <div className="text-left flex-1">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span style={{ color: colors.text }}>{pair.name.split('/')[0]}</span>
                          <span className="text-xs" style={{ color: colors.textSecondary }}>/USDT</span>
                        </div>
                        <div className="text-xs" style={{ color: colors.textSecondary }}>
                          Vol {(Math.random() * 10).toFixed(1)}B
                        </div>
                      </div>

                      {/* 价格 */}
                      <div className="text-right" style={{ width: '90px' }}>
                        <div style={{ color: colors.text }}>
                          ${pair.currentPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </div>
                      </div>

                      {/* 涨跌幅 */}
                      <div className="text-right" style={{ width: '70px' }}>
                        <div 
                          className="text-xs font-medium px-2 py-0.5 rounded inline-block"
                          style={{ 
                            backgroundColor: pair.change24h >= 0 ? `${colors.success}20` : `${colors.danger}20`,
                            color: pair.change24h >= 0 ? colors.success : colors.danger,
                          }}
                        >
                          {pair.change24h >= 0 ? '+' : ''}{pair.change24h.toFixed(2)}%
                        </div>
                      </div>
                    </button>
                  </div>
                ))}
                
                {displayPairs.length === 0 && (
                  <div className="py-12 text-center">
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="mx-auto mb-3" opacity="0.3">
                      <circle cx="20" cy="20" r="14" stroke={colors.textSecondary} strokeWidth="2"/>
                      <path d="M30 30L42 42" stroke={colors.textSecondary} strokeWidth="2" strokeLinecap="round"/>
                      <path d="M16 20H24M20 16V24" stroke={colors.textSecondary} strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    <div className="text-sm mb-1" style={{ color: colors.text }}>未找到相关币种</div>
                    <div className="text-xs" style={{ color: colors.textSecondary }}>
                      {searchQuery ? '尝试使用其他关键词搜索' : '该分类暂无币种'}
                    </div>
                  </div>
                )}
                
                {hasMore && (
                  <div 
                    className="py-4 text-center"
                    style={{ borderBottom: `1px solid ${colors.border}` }}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path 
                          d="M10 4V16M10 16L6 12M10 16L14 12" 
                          stroke={colors.textSecondary}
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span className="text-xs" style={{ color: colors.textSecondary }}>
                        下拉获取更多 ({filteredPairs.length - 8}+)
                      </span>
                    </div>
                  </div>
                )}
              </>
            );
          })()}
        </div>
      </div>
    </>
  );
}