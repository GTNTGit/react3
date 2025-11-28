import { motion } from 'motion/react';
import { Zap } from 'lucide-react';

export function Header() {
  const navItems = ['首页', '市场行情', '钱包资产', '行情分析', 'AI研究'];

  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-white/5"
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-xl" />
      <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
      
      <div className="relative max-w-[1440px] mx-auto px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-600 blur-lg opacity-60" />
            <div className="relative w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-black" fill="currentColor" />
            </div>
          </div>
          <span className="text-xl tracking-tight bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            NEXUS
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex items-center gap-8">
          {navItems.map((item, index) => (
            <motion.a
              key={item}
              href="#"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="relative text-sm text-gray-400 hover:text-white transition-colors group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-cyan-400 to-blue-500 group-hover:w-full transition-all duration-300" />
            </motion.a>
          ))}
        </nav>

        {/* Auth Buttons */}
        <div className="flex items-center gap-4">
          <button className="px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors">
            登录
          </button>
          <button className="relative px-6 py-2 text-sm overflow-hidden rounded-lg group">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 opacity-100 group-hover:opacity-90 transition-opacity" />
            <div className="absolute inset-[1px] bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 rounded-lg backdrop-blur-xl" />
            <span className="relative z-10 bg-gradient-to-r from-cyan-200 to-white bg-clip-text text-transparent">
              注册账户
            </span>
          </button>
        </div>
      </div>
    </motion.header>
  );
}
