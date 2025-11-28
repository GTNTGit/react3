import { Home, TrendingUp, ArrowLeftRight, Flag, Wallet } from 'lucide-react';

const navItems = [
  { icon: Home, label: '首页', active: true },
  { icon: TrendingUp, label: '现货', active: false },
  { icon: ArrowLeftRight, label: '交易', active: false },
  { icon: Flag, label: '期权', active: false },
  { icon: Wallet, label: '资产', active: false },
];

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#0B0E11] border-t border-gray-800">
      <div className="flex items-center justify-around px-2">
        {navItems.map((item, index) => (
          <button
            key={index}
            className={`flex flex-col items-center gap-1 py-2.5 px-3 min-w-[60px] transition-all ${
              item.active ? '' : 'opacity-50'
            }`}
          >
            <item.icon 
              className={`w-6 h-6 ${item.active ? 'text-emerald-500' : 'text-gray-400'}`}
              strokeWidth={item.active ? 2.5 : 2}
            />
            <span className={`text-xs ${item.active ? 'text-emerald-500' : 'text-gray-400'}`}>
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </nav>
  );
}