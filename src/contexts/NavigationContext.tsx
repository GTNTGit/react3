import { createContext, useContext } from 'react';

type PageType = 'home' | 'market' | 'trade' | 'contract' | 'wallet' | 'detail' | 'transfer' | 'assets' | 'deposit' | 'withdraw' | 'bill';

interface NavigationContextType {
  activePage: PageType;
  navigate: (page: PageType) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within NavigationProvider');
  }
  return context;
};

export const NavigationProvider = NavigationContext.Provider;