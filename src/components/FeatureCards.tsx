import { motion } from 'motion/react';
import { Activity, Shield, Sparkles } from 'lucide-react';

const features = [
  {
    icon: Activity,
    title: '实时行情',
    description: '毫秒级数据更新，捕捉每一个市场机会，专业级行情深度展示',
    gradient: 'from-cyan-500 to-blue-500',
    glowColor: 'rgba(6, 182, 212, 0.3)'
  },
  {
    icon: Sparkles,
    title: '专业交易体验',
    description: '量化级交易工具，AI 智能策略辅助，机构级执行效率',
    gradient: 'from-blue-500 to-purple-500',
    glowColor: 'rgba(59, 130, 246, 0.3)'
  },
  {
    icon: Shield,
    title: '安全透明资产管理',
    description: '银行级安全架构，多重加密保护，全流程透明可追溯',
    gradient: 'from-purple-500 to-pink-500',
    glowColor: 'rgba(168, 85, 247, 0.3)'
  }
];

export function FeatureCards() {
  return (
    <section className="relative py-24 px-8">
      <div className="max-w-[1440px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            为什么选择 NEXUS
          </h2>
          <p className="text-xl text-gray-400">专业、安全、高效的数字资产交易平台</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              whileHover={{ y: -8 }}
              className="group relative"
            >
              {/* Glow Effect */}
              <div 
                className="absolute inset-0 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: feature.glowColor }}
              />

              {/* Card */}
              <div className="relative h-full p-8 rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl overflow-hidden">
                {/* Animated Border */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className={`absolute inset-[1px] rounded-2xl bg-gradient-to-br ${feature.gradient} opacity-20`} />
                </div>

                {/* Corner Accent */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${feature.gradient} opacity-10 blur-3xl`} />

                {/* Icon */}
                <div className="relative mb-6">
                  <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${feature.gradient} bg-opacity-10 border border-white/10`}>
                    <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${feature.gradient} blur-xl opacity-50`} />
                    </div>
                    <feature.icon className={`relative w-8 h-8 bg-gradient-to-br ${feature.gradient} bg-clip-text text-transparent`} style={{ 
                      stroke: `url(#gradient-${index})`,
                      fill: 'none'
                    }} />
                    <svg width="0" height="0">
                      <defs>
                        <linearGradient id={`gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor={index === 0 ? '#06b6d4' : index === 1 ? '#3b82f6' : '#a855f7'} />
                          <stop offset="100%" stopColor={index === 0 ? '#3b82f6' : index === 1 ? '#a855f7' : '#ec4899'} />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-2xl mb-3 text-white group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>

                {/* Bottom Line Accent */}
                <div className="absolute bottom-0 left-0 right-0 h-[1px]">
                  <div className={`h-full bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-50 transition-opacity duration-500`} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
