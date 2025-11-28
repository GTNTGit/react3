import { motion } from 'motion/react';
import { TrendingUp, TrendingDown } from 'lucide-react';

const prices = [
  { symbol: 'BTC/USDT', price: '90170.4300', change: '+0.26%', isUp: true },
  { symbol: 'ETH/USDT', price: '2985.5900', change: '+0.44%', isUp: true },
  { symbol: 'XRP/USDT', price: '2.09229', change: '+0.28%', isUp: true },
];

export function LivePrices() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="relative overflow-hidden rounded-2xl"
    >
      {/* Card */}
      <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
        <div className="space-y-3">
          {prices.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
              className="flex items-center justify-between"
            >
              <div className="flex-1">
                <div className="text-sm text-gray-400 mb-1">{item.symbol}</div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl text-white">{item.price}</span>
                  <div className={`flex items-center gap-1 ${item.isUp ? 'text-emerald-400' : 'text-red-400'}`}>
                    {item.isUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    <span className="text-sm">{item.change}</span>
                  </div>
                </div>
              </div>

              {/* Mini Sparkline */}
              <div className="w-20 h-12">
                <svg viewBox="0 0 80 48" className="w-full h-full">
                  <defs>
                    <linearGradient id={`gradient-${index}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={item.isUp ? '#10b981' : '#ef4444'} stopOpacity="0.3" />
                      <stop offset="100%" stopColor={item.isUp ? '#10b981' : '#ef4444'} stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M 0 40 Q 20 30 40 35 T 80 25 L 80 48 L 0 48 Z"
                    fill={`url(#gradient-${index})`}
                  />
                  <path
                    d="M 0 40 Q 20 30 40 35 T 80 25"
                    fill="none"
                    stroke={item.isUp ? '#10b981' : '#ef4444'}
                    strokeWidth="2"
                  />
                </svg>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
