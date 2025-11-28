import { motion } from 'motion/react';
import { TrendingUp, Star } from 'lucide-react';

const trendingAssets = [
  { name: 'Bitcoin', symbol: 'BTC', price: '90,170.43', change: '+2.45%', marketCap: '1.8T', isUp: true },
  { name: 'Ethereum', symbol: 'ETH', price: '2,985.59', change: '+1.82%', marketCap: '358B', isUp: true },
  { name: 'Solana', symbol: 'SOL', price: '98.40', change: '+5.12%', marketCap: '45B', isUp: true },
];

export function TrendingAssets() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="relative pb-4"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-cyan-400" />
          <h3 className="text-white">热门资产</h3>
        </div>
        <button className="text-sm text-cyan-400">查看全部 →</button>
      </div>

      {/* List */}
      <div className="space-y-3">
        {trendingAssets.map((asset, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
            whileTap={{ scale: 0.98 }}
            className="relative group"
          >
            {/* Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-xl blur-lg opacity-0 group-active:opacity-100 transition-opacity" />
            
            {/* Card */}
            <div className="relative p-4 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  {/* Icon */}
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white">
                    {asset.symbol.substring(0, 1)}
                  </div>
                  
                  {/* Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-white">{asset.name}</span>
                      <span className="text-xs text-gray-500">{asset.symbol}</span>
                    </div>
                    <div className="text-xs text-gray-400">市值 ${asset.marketCap}</div>
                  </div>
                </div>

                {/* Price */}
                <div className="text-right">
                  <div className="text-white mb-1">${asset.price}</div>
                  <div className={`text-sm ${asset.isUp ? 'text-emerald-400' : 'text-red-400'}`}>
                    {asset.change}
                  </div>
                </div>

                {/* Favorite */}
                <button className="ml-3 w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                  <Star className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
