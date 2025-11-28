import { motion } from 'motion/react';
import { TrendingUp, Coins } from 'lucide-react';

export function PromoSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="grid grid-cols-2 gap-3"
    >
      {/* Left Card - Hot Event */}
      <div className="relative rounded-2xl bg-gradient-to-br from-red-950/50 to-orange-950/50 border border-red-900/30 p-4 overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-red-500/20 rounded-full blur-2xl" />
        
        <div className="relative z-10">
          <h3 className="text-lg mb-1 text-white">
            人气热币全面引爆！
          </h3>
          <p className="text-xs text-gray-400 mb-3 leading-relaxed">
            交易 DOGE、COMMON、$ECAI 抽 $100,000 合约奖励！
          </p>

          {/* Coin Stack Illustration */}
          <div className="flex justify-center mb-2">
            <div className="relative w-20 h-20">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-xl">
                  <Coins className="w-8 h-8 text-yellow-900" />
                </div>
              </div>
              <div className="absolute top-2 right-0 w-6 h-6 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 shadow-lg" />
              <div className="absolute bottom-2 left-1 w-5 h-5 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 shadow-lg" />
            </div>
          </div>

          <div className="text-xs text-gray-500 text-center">4/5</div>
        </div>
      </div>

      {/* Right Card - APR */}
      <div className="relative rounded-2xl bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 p-4 overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute bottom-0 left-0 w-20 h-20 bg-emerald-500/10 rounded-full blur-2xl" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
              <span className="text-xs text-white">U</span>
            </div>
            <span className="text-sm text-gray-400">USDT</span>
          </div>

          <div className="mb-1">
            <span className="text-sm text-yellow-500">APR</span>
          </div>
          
          <div className="mb-3">
            <span className="text-3xl text-yellow-400">100.00%</span>
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-500">定期</span>
            <span className="text-gray-400">2/4</span>
          </div>
        </div>
      </div>

      {/* Bottom Card - AxCNH */}
      <div className="col-span-2 relative rounded-2xl bg-gradient-to-r from-gray-900 to-gray-950 border border-gray-800 p-4 overflow-hidden">
        <div className="absolute right-4 top-1/2 -translate-y-1/2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <span className="text-white">▲</span>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <h3 className="text-lg text-white mb-1">AxCNH</h3>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">新币上线</span>
              <span className="text-xs text-gray-600">2/3</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
