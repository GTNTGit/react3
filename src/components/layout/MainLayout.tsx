import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { TopBar } from '../exchange/TopBar';
import { BottomTabs } from '../exchange/BottomTabs';

interface MainLayoutProps {
  onProfileClick: () => void;
  selectedAvatar?: string;
  showVIPBadge?: boolean;
  theme?: 'dark' | 'light';
  onCustomerServiceClick?: () => void;
  onNotificationClick?: () => void;
}

// 滚动到顶部组件
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export function MainLayout({ 
  onProfileClick, 
  selectedAvatar, 
  showVIPBadge, 
  theme,
  onCustomerServiceClick,
  onNotificationClick 
}: MainLayoutProps) {
  const location = useLocation();
  
  // 主级页面列表
  const mainPages = ['/', '/market', '/trade', '/contract', '/wallet'];
  const isMainPage = mainPages.includes(location.pathname);
  
  // 只在首页显示 TopBar
  const showTopBar = location.pathname === '/';

  return (
    <>
      <ScrollToTop />
      {showTopBar && (
        <TopBar 
          onProfileClick={onProfileClick} 
          selectedAvatar={selectedAvatar} 
          showVIPBadge={showVIPBadge} 
          theme={theme}
          onCustomerServiceClick={onCustomerServiceClick}
          onNotificationClick={onNotificationClick}
        />
      )}
      <Outlet />
      {isMainPage && <BottomTabs />}
    </>
  );
}

