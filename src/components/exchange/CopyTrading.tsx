import { TrendingUp } from 'lucide-react';

const traders = [
  {
    name: 'Homelander',
    avatar: 'H',
    return: '+3,159%',
    period: '近30日收益率',
    followers: '2.3K'
  },
  {
    name: 'Snipers Scalp',
    avatar: 'S',
    return: '+274%',
    period: '近30日收益率',
    followers: '1.8K'
  },
  {
    name: 'Crypto King',
    avatar: 'C',
    return: '+156%',
    period: '近30日收益率',
    followers: '3.1K'
  },
];

export function CopyTrading() {
  return (
    <div className="py-2 pb-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-[#63FF4A]" />
          <h3 className="text-white">跟单交易</h3>
        </div>
        <button className="text-sm text-[#9B9BA5] active:text-[#63FF4A]">
          查看全部 →
        </button>
      </div>

      <div className="space-y-3">
        {traders.map((trader, index) => (
          <button
            key={index}
            className="w-full rounded-2xl bg-[#1C1C1E] border border-[#373737] p-4 active:opacity-90"
          >
            <div className="flex items-center justify-between">
              {/* Left: Avatar & Name */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#63FF4A]/10 border border-[#63FF4A]/20 flex items-center justify-center">
                  <span className="text-[#63FF4A] text-lg">{trader.avatar}</span>
                </div>
                <div className="text-left">
                  <div className="text-white mb-1">{trader.name}</div>
                  <div className="text-xs text-[#9B9BA5]">{trader.followers} 关注者</div>
                </div>
              </div>

              {/* Right: Return */}
              <div className="text-right">
                <div className="text-[#63FF4A] text-xl mb-1">{trader.return}</div>
                <div className="text-xs text-[#9B9BA5]">{trader.period}</div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
