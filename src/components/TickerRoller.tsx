import { motion } from 'motion/react';
import { TrendingUp, TrendingDown } from 'lucide-react';

const tickerData = [
  { symbol: 'BTC', name: 'Bitcoin', price: '43,250.80', change: '+2.45%', isUp: true },
  { symbol: 'ETH', name: 'Ethereum', price: '2,280.50', change: '+1.82%', isUp: true },
  { symbol: 'BNB', name: 'Binance Coin', price: '312.75', change: '-0.65%', isUp: false },
  { symbol: 'SOL', name: 'Solana', price: '98.40', change: '+5.12%', isUp: true },
  { symbol: 'XRP', name: 'Ripple', price: '0.5840', change: '+0.95%', isUp: true },
  { symbol: 'ADA', name: 'Cardano', price: '0.4520', change: '-1.20%', isUp: false },
];

export function TickerRoller() {
  return (
    <section className="relative py-6 border-y border-white/5 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50" />
      
      <div className="relative flex gap-12 animate-scroll">
        {[...tickerData, ...tickerData, ...tickerData].map((item, index) => (
          <motion.div
            key={index}
            className="flex items-center gap-3 min-w-fit px-6 py-3 rounded-lg border border-white/5 bg-white/5 backdrop-blur-xl"
            whileHover={{ scale: 1.05, borderColor: 'rgba(255,255,255,0.2)' }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center gap-2">
              <span className="text-white">{item.symbol}</span>
              <span className="text-xs text-gray-500">{item.name}</span>
            </div>
            <div className="h-4 w-[1px] bg-white/10" />
            <span className="text-white">${item.price}</span>
            <div className={`flex items-center gap-1 ${item.isUp ? 'text-emerald-400' : 'text-red-400'}`}>
              {item.isUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              <span className="text-sm">{item.change}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
