import { motion } from 'motion/react';
import { Star } from 'lucide-react';
import { useState } from 'react';

const tabs = [
  { id: 'favorite', label: '自选', icon: Star },
  { id: 'main', label: '主流币' },
  { id: 'rising', label: '涨幅榜' },
  { id: 'falling', label: '跌幅榜' },
  { id: 'new', label: '新币榜' },
];

export function MarketTabs() {
  const [activeTab, setActiveTab] = useState('favorite');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="pt-4"
    >
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg text-white">跟单</h2>
        <button className="text-sm text-gray-500 hover:text-gray-400 transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-gray-900 mb-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative px-4 py-3 text-sm transition-colors ${
              activeTab === tab.id
                ? 'text-white'
                : 'text-gray-500 hover:text-gray-400'
            }`}
          >
            <div className="flex items-center gap-1.5">
              {tab.icon && <tab.icon className="w-4 h-4" />}
              <span>{tab.label}</span>
            </div>
            
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>
    </motion.div>
  );
}
