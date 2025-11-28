import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AssetCard } from '../components/exchange/AssetCard';
import { QuickLinks } from '../components/exchange/QuickLinks';
import { PromoCards } from '../components/exchange/PromoCards';
import { AnnouncementBar } from '../components/exchange/AnnouncementBar';
import { MarketList } from '../components/exchange/MarketList';

interface HomePageProps {
}

export function HomePage({}: HomePageProps) {
  const navigate = useNavigate();

  return (
    <div className="pt-3 space-y-3">
      <AssetCard />
      <QuickLinks />
      <PromoCards />
      <AnnouncementBar />
      <MarketList 
        onCoinClick={(coin) => {
          navigate('/detail', { state: { coin } });
        }}
      />
    </div>
  );
}

