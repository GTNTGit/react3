import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

export function AssetOverview() {
  const [hideBalance, setHideBalance] = useState(false);

  return (
    <div className="px-4 pt-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-400">总资产 (USDT)</span>
          <button 
            onClick={() => setHideBalance(!hideBalance)}
            className="active:opacity-70"
          >
            {hideBalance ? (
              <EyeOff className="w-4 h-4 text-gray-500" />
            ) : (
              <Eye className="w-4 h-4 text-gray-500" />
            )}
          </button>
        </div>
      </div>

      <div className="flex items-end justify-between mb-4">
        <div>
          <div className="text-3xl text-white mb-1">
            {hideBalance ? '****' : '0.00'}
          </div>
          <div className="text-sm text-gray-500">
            ≈ $0.00
          </div>
        </div>

        <button className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-lg text-sm text-white active:opacity-90">
          充值
        </button>
      </div>

      {/* Quick Stats */}
      <div className="flex items-center gap-6 pb-4 border-b border-gray-800">
        <div>
          <div className="text-xs text-gray-500 mb-1">今日收益</div>
          <div className="text-sm text-emerald-400">+0.00 (0.00%)</div>
        </div>
        <div>
          <div className="text-xs text-gray-500 mb-1">累计收益</div>
          <div className="text-sm text-white">0.00</div>
        </div>
      </div>
    </div>
  );
}
