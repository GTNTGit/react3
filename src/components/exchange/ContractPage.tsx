import React from 'react';
import { TradingPageLayout } from './TradingPageLayout';

interface ContractPageProps {
}

export function ContractPage({}: ContractPageProps) {
  return (
    <TradingPageLayout 
      mode="contract"
    />
  );
}
