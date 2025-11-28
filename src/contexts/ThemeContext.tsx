import React, { createContext, useContext, ReactNode } from 'react';

interface ThemeColors {
  bg: string;
  cardBg: string;
  border: string;
  text: string;
  textSecondary: string;
  primary: string;
  primaryGradient: string;
  success: string;
  danger: string;
  warning: string;
}

interface ThemeContextType {
  theme: 'dark' | 'light' | 'gold' | 'tiffany';
  setTheme: (theme: 'dark' | 'light' | 'gold' | 'tiffany') => void;
  colors?: ThemeColors;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  setTheme: () => {},
});

export const useTheme = () => {
  const context = useContext(ThemeContext);
  
  // 如果没有在 ThemeProvider 中，返回默认的亮色主题
  if (!context.colors) {
    return {
      ...context,
      colors: {
        bg: '#f8f9fa',
        cardBg: '#ffffff',
        border: 'rgba(0, 0, 0, 0.08)',
        text: '#1a1a1a',
        textSecondary: '#6b7280',
        primary: '#22C55E',
        primaryGradient: 'linear-gradient(135deg, #4ADE80 0%, #22C55E 100%)',
        success: '#16A34A',
        danger: '#ef4444',
        warning: '#22C55E',
      }
    };
  }
  
  return context;
};

interface ThemeProviderProps {
  children?: ReactNode;
  value: ThemeContextType;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children, value }) => {
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};