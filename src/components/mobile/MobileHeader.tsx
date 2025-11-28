import { Search, Bell, Menu, QrCode } from 'lucide-react';

export function MobileHeader() {
  return (
    <header className="sticky top-0 z-50 bg-[#0B0E11] border-b border-gray-800">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Left: Menu */}
        <button className="p-2 -ml-2 active:opacity-70">
          <Menu className="w-5 h-5 text-gray-400" />
        </button>

        {/* Center: Logo/Title */}
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-gradient-to-br from-emerald-400 to-green-600 flex items-center justify-center">
            <span className="text-white text-xs">X</span>
          </div>
          <span className="text-white">XT.COM</span>
        </div>

        {/* Right: Icons */}
        <div className="flex items-center gap-2">
          <button className="p-2 active:opacity-70">
            <QrCode className="w-5 h-5 text-gray-400" />
          </button>
          <button className="p-2 -mr-2 active:opacity-70 relative">
            <Bell className="w-5 h-5 text-gray-400" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="px-4 pb-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="BTC ETH"
            className="w-full h-10 pl-10 pr-4 bg-[#1a1d23] rounded-lg text-sm text-white placeholder:text-gray-600 border border-gray-800 focus:outline-none focus:border-gray-700"
          />
        </div>
      </div>
    </header>
  );
}
