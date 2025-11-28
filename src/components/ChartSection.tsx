import { motion } from 'motion/react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, BarChart3, Activity } from 'lucide-react';

const chartData = [
  { time: '00:00', price: 42500, volume: 1200 },
  { time: '04:00', price: 42800, volume: 1450 },
  { time: '08:00', price: 42200, volume: 1100 },
  { time: '12:00', price: 43100, volume: 1800 },
  { time: '16:00', price: 43500, volume: 2100 },
  { time: '20:00', price: 43250, volume: 1650 },
  { time: '24:00', price: 43800, volume: 1900 },
];

interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    payload: { time: string };
  }>;
}

const CustomTooltip = ({ active, payload }: TooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="px-4 py-3 rounded-lg border border-cyan-500/30 bg-black/90 backdrop-blur-xl">
        <p className="text-cyan-400 mb-1">${payload[0].value.toLocaleString()}</p>
        <p className="text-xs text-gray-400">{payload[0].payload.time}</p>
      </div>
    );
  }
  return null;
};

export function ChartSection() {
  return (
    <section className="relative py-24 px-8">
      <div className="max-w-[1440px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <h2 className="text-5xl mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            市场洞察
          </h2>
          <p className="text-xl text-gray-400">实时数据，精准分析</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Chart */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-2 relative group"
          >
            {/* Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Card */}
            <div className="relative p-8 rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-2xl mb-1 text-white">BTC/USDT</h3>
                  <p className="text-gray-400">Bitcoin 24小时价格走势</p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400">+2.45%</span>
                </div>
              </div>

              {/* Chart */}
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis 
                      dataKey="time" 
                      stroke="rgba(156,163,175,0.5)" 
                      style={{ fontSize: '12px' }}
                    />
                    <YAxis 
                      stroke="rgba(156,163,175,0.5)" 
                      style={{ fontSize: '12px' }}
                      domain={['dataMin - 500', 'dataMax + 500']}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Area 
                      type="monotone" 
                      dataKey="price" 
                      stroke="#06b6d4" 
                      strokeWidth={2}
                      fill="url(#colorPrice)" 
                      dot={{ fill: '#06b6d4', r: 4 }}
                      activeDot={{ r: 6, fill: '#06b6d4', stroke: '#fff', strokeWidth: 2 }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Grid Lines Decoration */}
              <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
                <div className="absolute top-1/3 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
                <div className="absolute top-2/3 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
              </div>
            </div>
          </motion.div>

          {/* Side Stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-6"
          >
            {/* Volume Chart */}
            <div className="relative group flex-1">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative h-full p-6 rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl">
                <div className="flex items-center gap-3 mb-4">
                  <BarChart3 className="w-5 h-5 text-blue-400" />
                  <h4 className="text-white">交易量</h4>
                </div>
                <div className="h-32">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <Line 
                        type="monotone" 
                        dataKey="volume" 
                        stroke="#3b82f6" 
                        strokeWidth={2}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Market Stats */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative p-6 rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl">
                <div className="flex items-center gap-3 mb-6">
                  <Activity className="w-5 h-5 text-purple-400" />
                  <h4 className="text-white">市场数据</h4>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-400 mb-1">24h 最高</p>
                    <p className="text-xl text-white">$43,850.00</p>
                  </div>
                  <div className="h-[1px] bg-white/5" />
                  <div>
                    <p className="text-sm text-gray-400 mb-1">24h 最低</p>
                    <p className="text-xl text-white">$42,120.00</p>
                  </div>
                  <div className="h-[1px] bg-white/5" />
                  <div>
                    <p className="text-sm text-gray-400 mb-1">市值</p>
                    <p className="text-xl text-white">$845.2B</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
