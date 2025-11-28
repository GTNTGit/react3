import { motion } from 'motion/react';
import { Flame } from 'lucide-react';

const tabs = ['HOT', '绿色能源'];

export function MarketOverview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="relative"
    >
      {/* Tabs */}
      <div className="flex items-center gap-2 mb-3">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`px-4 py-2 rounded-lg text-sm transition-all ${
              index === 0
                ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/30'
                : 'bg-white/5 text-gray-400 hover:bg-white/10'
            }`}
          >
            {index === 0 && <Flame className="inline w-4 h-4 mr-1" />}
            {tab}
          </button>
        ))}
      </div>

      {/* Market Cards */}
      <div className="grid grid-cols-2 gap-3">
        {[
          { name: 'DOGE', fullName: 'Dogecoin', price: '0.3825', change: '+8.45%', isUp: true },
          { name: 'SOL', fullName: 'Solana', price: '98.40', change: '+5.12%', isUp: true },
          { name: 'MATIC', fullName: 'Polygon', price: '0.8945', change: '+3.78%', isUp: true },
          { name: 'AVAX', fullName: 'Avalanche', price: '36.82', change: '+2.91%', isUp: true },
        ].map((asset, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
            whileTap={{ scale: 0.98 }}
            className="relative group"
          >
            {/* Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-xl blur-lg opacity-0 group-active:opacity-100 transition-opacity" />
            
            {/* Card */}
            <div className="relative p-4 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-colors">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="text-white mb-1">{asset.name}</div>
                  <div className="text-xs text-gray-400">{asset.fullName}</div>
                </div>
                <div className={`px-2 py-1 rounded-md text-xs ${
                  asset.isUp ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
                }`}>
                  {asset.change}
                </div>
              </div>
              
              <div className="text-xl text-white">${asset.price}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
