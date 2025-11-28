import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

export function PromoBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-2xl"
    >
      {/* Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 blur-xl" />
      
      {/* Card */}
      <div className="relative bg-gradient-to-br from-gray-900 via-blue-950 to-purple-950 border border-white/10 p-6 rounded-2xl overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl" />
        
        {/* Content */}
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-xs text-cyan-400 tracking-wide">新用户专享福利</span>
          </div>
          
          <div className="mb-1">
            <span className="text-sm text-gray-300">领取高达</span>
          </div>
          
          <div className="mb-3">
            <span className="text-5xl bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              $1000
            </span>
          </div>
          
          <div className="mb-4">
            <span className="text-sm text-gray-300">合约交易奖励</span>
          </div>
          
          <button className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg text-sm text-white hover:shadow-lg hover:shadow-cyan-500/50 transition-all">
            立即领取
          </button>
        </div>

        {/* Illustration */}
        <div className="absolute right-4 bottom-4 opacity-30">
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-2xl rotate-12 opacity-50 blur-sm" />
            <div className="absolute top-2 left-2 w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-600 rounded-2xl -rotate-6" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
