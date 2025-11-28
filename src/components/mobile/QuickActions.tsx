import { 
  ArrowDownToLine, 
  ArrowUpFromLine, 
  Repeat, 
  Coins,
  TrendingUp,
  ShieldCheck,
  Wallet,
  Gift,
  History,
  BarChart3,
  Users,
  Sparkles
} from 'lucide-react';

const actions = [
  { icon: ArrowDownToLine, label: '买币', color: 'from-blue-500 to-blue-600' },
  { icon: ArrowUpFromLine, label: '卖币', color: 'from-purple-500 to-purple-600' },
  { icon: Repeat, label: '闪兑', color: 'from-cyan-500 to-cyan-600' },
  { icon: Coins, label: '现货', color: 'from-orange-500 to-orange-600' },
  { icon: TrendingUp, label: '合约', color: 'from-pink-500 to-pink-600' },
  { icon: ShieldCheck, label: '理财', color: 'from-green-500 to-green-600' },
  { icon: Wallet, label: '钱包', color: 'from-indigo-500 to-indigo-600' },
  { icon: Gift, label: '活动', color: 'from-red-500 to-red-600' },
];

export function QuickActions() {
  return (
    <div className="px-4 py-4">
      <div className="grid grid-cols-4 gap-4">
        {actions.map((action, index) => (
          <button
            key={index}
            className="flex flex-col items-center gap-2 active:opacity-70"
          >
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center shadow-lg`}>
              <action.icon className="w-6 h-6 text-white" strokeWidth={2} />
            </div>
            <span className="text-xs text-gray-300">{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
