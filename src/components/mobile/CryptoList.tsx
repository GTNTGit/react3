import { motion } from 'motion/react';
import { Star } from 'lucide-react';

const cryptos = [
  {
    name: 'Homelander',
    symbol: 'HOME',
    icon: '🦸',
    price: '0.00000234',
    change: '+3,338.31%',
    changeValue: '+3,338.31',
    isUp: true,
    period: '近30天收益率',
    color: 'from-red-500 to-orange-500'
  },
  {
    name: 'Lemniscap',
    symbol: 'LEM',
    icon: '🌙',
    price: '0.00156',
    change: '+413.24%',
    changeValue: '+413.24',
    isUp: true,
    period: '近30天收益率',
    color: 'from-yellow-500 to-amber-500'
  },
  {
    name: 'Bitcoin',
    symbol: 'BTC',
    icon: '₿',
    price: '91700.91',
    change: '+0.05%',
    changeValue: '+0.05',
    isUp: true,
    period: '24h',
    color: 'from-orange-500 to-yellow-500'
  },
];

export function CryptoList() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.4 }}
      className="space-y-3 pb-6"
    >
      {cryptos.map((crypto, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
          whileTap={{ scale: 0.98 }}
          className="relative rounded-2xl bg-gradient-to-br from-gray-900 to-black border border-gray-800 p-4 overflow-hidden active:border-gray-700 transition-colors"
        >
          {/* Background Glow */}
          <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${crypto.color} opacity-5 rounded-full blur-2xl`} />
          
          <div className="relative z-10">
            <div className="flex items-start justify-between mb-4">
              {/* Left: Icon and Name */}
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${crypto.color} flex items-center justify-center text-xl shadow-lg`}>
                  {crypto.icon}
                </div>
                <div>
                  <div className="text-white mb-1">{crypto.name}</div>
                  <div className="text-xs text-gray-500">{crypto.symbol}</div>
                </div>
              </div>

              {/* Right: Star */}
              <button className="w-8 h-8 rounded-lg bg-gray-800/50 flex items-center justify-center hover:bg-gray-800 transition-colors active:scale-95">
                <Star className="w-4 h-4 text-gray-600" />
              </button>
            </div>

            {/* Bottom: Stats and Chart */}
            <div className="flex items-end justify-between">
              {/* Stats */}
              <div>
                <div className="text-xs text-gray-500 mb-1">{crypto.period}</div>
                <div className={`text-2xl mb-1 ${crypto.isUp ? 'text-emerald-400' : 'text-red-400'}`}>
                  {crypto.change}
                </div>
              </div>

              {/* Mini Chart */}
              <div className="w-32 h-12">
                <svg viewBox="0 0 128 48" className="w-full h-full">
                  <defs>
                    <linearGradient id={`chart-gradient-${index}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={crypto.isUp ? '#10b981' : '#ef4444'} stopOpacity="0.3" />
                      <stop offset="100%" stopColor={crypto.isUp ? '#10b981' : '#ef4444'} stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  
                  {/* Area */}
                  <path
                    d="M 0 40 Q 32 35 64 25 T 128 15 L 128 48 L 0 48 Z"
                    fill={`url(#chart-gradient-${index})`}
                  />
                  
                  {/* Line */}
                  <path
                    d="M 0 40 Q 32 35 64 25 T 128 15"
                    fill="none"
                    stroke={crypto.isUp ? '#10b981' : '#ef4444'}
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  
                  {/* Dots */}
                  <circle cx="64" cy="25" r="3" fill={crypto.isUp ? '#10b981' : '#ef4444'} />
                  <circle cx="128" cy="15" r="3" fill={crypto.isUp ? '#10b981' : '#ef4444'} />
                </svg>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
