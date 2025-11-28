import { motion } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { ParticleField } from './ParticleField';

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Effects */}
      <ParticleField />
      
      {/* Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      
      {/* Diagonal Light Slash */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-br from-cyan-500/5 via-transparent to-transparent transform rotate-12 translate-x-1/4" />

      {/* Content */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="flex items-center justify-center gap-2 mb-6"
        >
          <Sparkles className="w-5 h-5 text-cyan-400" />
          <span className="text-sm text-cyan-400 tracking-wider uppercase">Next-Gen Trading Platform</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
          className="mb-6 tracking-tight"
        >
          <span className="block text-6xl md:text-8xl bg-gradient-to-b from-white via-white to-gray-400 bg-clip-text text-transparent mb-4">
            开启数字资产
          </span>
          <span className="block text-6xl md:text-8xl bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            的未来
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: 'easeOut' }}
          className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto"
        >
          AI 级策略与量化级交易体验
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: 'easeOut' }}
          className="flex items-center justify-center gap-6"
        >
          <button className="group relative px-8 py-4 overflow-hidden rounded-xl">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500" />
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300" />
            <span className="relative z-10 flex items-center gap-2 text-white">
              立即创建账户
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>

          <button className="group relative px-8 py-4 overflow-hidden rounded-xl border border-white/10 hover:border-white/20 transition-colors">
            <div className="absolute inset-0 bg-white/5 backdrop-blur-xl" />
            <span className="relative z-10 text-white">
              探索市场
            </span>
          </button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: 'easeOut' }}
          className="mt-20 grid grid-cols-3 gap-8 max-w-3xl mx-auto"
        >
          {[
            { label: '24h 交易量', value: '$2.4B+' },
            { label: '活跃用户', value: '500K+' },
            { label: '支持资产', value: '150+' }
          ].map((stat, index) => (
            <div key={index} className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative p-6 rounded-2xl border border-white/5 bg-white/5 backdrop-blur-xl">
                <div className="text-3xl bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
