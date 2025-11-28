import React from 'react';
import { TradingPageLayout } from './TradingPageLayout';

interface SpotPageProps {
}

export function SpotPage({}: SpotPageProps) {
  return (
    <TradingPageLayout 
      mode="spot"
    />
  );
}
