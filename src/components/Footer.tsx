import { Zap } from 'lucide-react';

const footerLinks = {
  '关于我们': ['公司简介', '团队成员', '加入我们', '联系方式'],
  '市场 & 资产': ['现货交易', '合约交易', 'NFT 市场', '资产管理'],
  '研究 & AI': ['市场分析', 'AI 策略', '研究报告', '学习中心'],
  '权益说明': ['用户协议', '隐私政策', '风险提示', '合规声明']
};

export function Footer() {
  return (
    <footer className="relative border-t border-white/5 mt-24">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
      
      <div className="relative max-w-[1440px] mx-auto px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
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
            <p className="text-sm text-gray-400 leading-relaxed">
              下一代数字资产交易平台，专业、安全、高效。
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-white mb-4">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a 
                      href="#" 
                      className="text-sm text-gray-400 hover:text-cyan-400 transition-colors inline-block hover:translate-x-1 duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-400">
              © 2025 NEXUS. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                隐私政策
              </a>
              <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                服务条款
              </a>
              <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                Cookie 设置
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
