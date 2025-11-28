import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Routes, Route } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';
import { HomePage } from './pages/HomePage';
import { SpotPage } from './components/exchange/SpotPage';
import { OptionPage } from './components/exchange/OptionPage';
import { ContractPage } from './components/exchange/ContractPage';
import { TradeDetailPage } from './components/exchange/TradeDetailPage';
import { VIPPage } from './components/exchange/VIPPage';
import { SecurityPage } from './components/exchange/SecurityPage';
import { KYCPage } from './components/exchange/KYCPage';
import { KYCL2Page } from './components/exchange/KYCL2Page';
import { LanguagePage } from './components/exchange/LanguagePage';
import { AvatarSettingsPage } from './components/exchange/AvatarSettingsPage';
import { CustomerServicePage } from './components/exchange/CustomerServicePage';
import { NotificationPage } from './components/exchange/NotificationPage';
import Assets from './pages/Assets';
import Transfer from './pages/Transfer';
import Deposit from './pages/Deposit';
import Withdraw from './pages/Withdraw';
import Bills from './pages/Bills';
import InviteFriends from './pages/InviteFriends';
import Loan from './pages/Loan';
import IEO from './pages/IEO';
import Invest from './pages/Invest';
import InvestEarnings from './pages/InvestEarnings';
import More from './pages/More';
import { ThemeProvider } from './contexts/ThemeContext';
import { BalanceProvider } from './contexts/BalanceContext';
import { ProfileDrawer } from './components/exchange/ProfileDrawer';
import { useNavigate } from 'react-router-dom';
import { useTheme } from './contexts/ThemeContext';

const themes = {
  dark: {
    bg: '#1a1d29',
    cardBg: '#252938',
    border: 'rgba(255, 255, 255, 0.12)',
    text: '#ffffff',
    textSecondary: '#9ca3af',
    primary: '#22C55E',
    primaryGradient: 'linear-gradient(135deg, #4ADE80 0%, #22C55E 100%)',
    success: '#16A34A',
    danger: '#ef4444',
    warning: '#22C55E',
    isDark: true,
  },
  light: {
    bg: '#ffffff',
    cardBg: '#ffffff',
    border: 'rgba(0, 0, 0, 0.08)',
    text: '#1a1a1a',
    textSecondary: '#6b7280',
    primary: '#22C55E',
    primaryGradient: 'linear-gradient(135deg, #4ADE80 0%, #22C55E 100%)',
    success: '#16A34A',
    danger: '#ef4444',
    warning: '#22C55E',
    isDark: false,
  },
  gold: {
    bg: '#f8f9fa',
    cardBg: '#ffffff',
    border: 'rgba(0, 0, 0, 0.08)',
    text: '#1a1a1a',
    textSecondary: '#6b7280',
    primary: '#D97706',
    primaryGradient: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
    success: '#10b981',
    danger: '#ef4444',
    warning: '#F59E0B',
  },
  tiffany: {
    bg: '#f8f9fa',
    cardBg: '#ffffff',
    border: 'rgba(0, 0, 0, 0.08)',
    text: '#1a1a1a',
    textSecondary: '#6b7280',
    primary: '#0ABAB5',
    primaryGradient: 'linear-gradient(135deg, #5FD4D0 0%, #0ABAB5 100%)',
    success: '#10b981',
    danger: '#ef4444',
    warning: '#0ABAB5',
  }
};

// 404 页面组件
function NotFoundPage() {
  const { colors } = useTheme();
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4" style={{ backgroundColor: colors.bg }}>
      <h1 className="text-2xl font-bold mb-4" style={{ color: colors.text }}>404 Not Found</h1>
      <p className="mb-6" style={{ color: colors.textSecondary }}>页面不存在</p>
      <button
        onClick={() => navigate('/')}
        className="px-6 py-3 rounded-lg transition-all active:opacity-70"
        style={{ backgroundColor: colors.primary, color: '#ffffff' }}
      >
        返回首页
      </button>
    </div>
  );
}

function AppContent() {
  const { t } = useTranslation();
  const [theme, setTheme] = useState<'dark' | 'light' | 'gold' | 'tiffany'>('light');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState<string>('avatar-1');
  const [nickname, setNickname] = useState<string>(t('user.default_nickname'));
  const [showVIPBadge, setShowVIPBadge] = useState<boolean>(true);
  const colors = themes[theme];
  const navigate = useNavigate();

  const handleCustomerServiceClick = () => {
    navigate('/customer-service');
  };

  const handleNotificationClick = () => {
    navigate('/notification');
  };

  return (
    <ThemeProvider value={{ theme, setTheme, colors }}>
      <BalanceProvider>
        <div className="min-h-screen transition-colors duration-300" style={{ backgroundColor: colors.bg }}>
          <Routes>
            {/* 嵌套路由 - 使用 MainLayout */}
            <Route 
              element={
                <MainLayout 
                  onProfileClick={() => setDrawerOpen(true)}
                  selectedAvatar={selectedAvatar}
                  showVIPBadge={showVIPBadge}
                  theme={theme === 'dark' ? 'dark' : 'light'}
                  onCustomerServiceClick={handleCustomerServiceClick}
                  onNotificationClick={handleNotificationClick}
                />
              }
            >
              <Route path="/" element={<HomePage />} />
              <Route path="/trade" element={<SpotPage />} />
              <Route path="/market" element={<OptionPage />} />
              <Route path="/contract" element={<ContractPage />} />
              <Route path="/wallet" element={<Assets />} />
            </Route>

            {/* 独立路由 - 全屏显示 */}
            <Route path="/assets/deposit" element={<Deposit />} />
            <Route path="/assets/withdraw" element={<Withdraw />} />
            <Route path="/assets/transfer" element={<Transfer />} />
            <Route path="/assets/bill" element={<Bills />} />
            <Route path="/invite" element={<InviteFriends />} />
            <Route path="/loan" element={<Loan />} />
            <Route path="/ieo" element={<IEO />} />
            <Route path="/invest" element={<Invest />} />
            <Route path="/invest-earnings" element={<InvestEarnings />} />
            <Route path="/more" element={<More />} />
            <Route path="/detail" element={<TradeDetailPage isDark={theme === 'dark'} />} />
            
            {/* 个人中心相关页面 */}
            <Route path="/vip" element={<VIPPage theme={theme} />} />
            <Route path="/security" element={<SecurityPage theme={theme} />} />
            <Route path="/kyc" element={<KYCPage theme={theme} />} />
            <Route path="/kyc-l2" element={<KYCL2Page theme={theme} />} />
            <Route path="/language" element={<LanguagePage theme={theme} />} />
            <Route 
              path="/avatar-settings" 
              element={
                <AvatarSettingsPage 
                  theme={theme} 
                  selectedAvatar={selectedAvatar} 
                  onAvatarChange={setSelectedAvatar} 
                  nickname={nickname} 
                  onNicknameChange={setNickname} 
                  showVIPBadge={showVIPBadge} 
                  onVIPBadgeChange={setShowVIPBadge} 
                />
              } 
            />
            <Route path="/customer-service" element={<CustomerServicePage theme={theme} />} />
            <Route path="/notification" element={<NotificationPage theme={theme} />} />

            {/* 404 页面 */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>

          <ProfileDrawer 
            isOpen={drawerOpen} 
            onClose={() => setDrawerOpen(false)}
            theme={theme}
            onThemeChange={setTheme}
            selectedAvatar={selectedAvatar}
            nickname={nickname}
            onNicknameChange={setNickname}
            showVIPBadge={showVIPBadge}
          />
        </div>
      </BalanceProvider>
    </ThemeProvider>
  );
}

export default function App() {
  return <AppContent />;
}
