import React, { useState } from 'react';
import { ArrowLeft, Copy, Check, AlertCircle, ChevronDown } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface Network {
  id: string;
  name: string;
  fullName: string;
  fee: number;
  minDeposit: number;
  confirmations: number;
}

export default function Deposit() {
  const { colors } = useTheme();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [selectedNetwork, setSelectedNetwork] = useState<Network>({
    id: 'trc20',
    name: 'TRC20',
    fullName: 'Tron (TRC20)',
    fee: 0,
    minDeposit: 10,
    confirmations: 19,
  });
  const [copied, setCopied] = useState(false);
  const [showNetworkSelect, setShowNetworkSelect] = useState(false);

  const networks: Network[] = [
    {
      id: 'trc20',
      name: 'TRC20',
      fullName: 'Tron (TRC20)',
      fee: 0,
      minDeposit: 10,
      confirmations: 19,
    },
    {
      id: 'erc20',
      name: 'ERC20',
      fullName: 'Ethereum (ERC20)',
      fee: 0,
      minDeposit: 50,
      confirmations: 12,
    },
    {
      id: 'bep20',
      name: 'BEP20',
      fullName: 'BSC (BEP20)',
      fee: 0,
      minDeposit: 10,
      confirmations: 15,
    },
  ];

  const depositAddress = 'TXhZn3kLHsKjDWGJfJKHKGHkjhKJHGhjKH3456789';

  const handleCopy = () => {
    navigator.clipboard.writeText(depositAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleBack = () => {
    navigate('/wallet');
  };

  return (
    <div 
      className="h-screen flex flex-col"
      style={{ backgroundColor: colors.bg }}
    >
      {/* 顶部导航栏 */}
      <div 
        className="flex-shrink-0 px-4 h-14 flex items-center border-b"
        style={{ borderColor: colors.border }}
      >
        <button onClick={handleBack} className="mr-4">
          <ArrowLeft className="w-5 h-5" style={{ color: colors.text }} />
        </button>
        <h1 className="font-semibold" style={{ color: colors.text, fontSize: '17px' }}>
          {t('deposit.title')}
        </h1>
      </div>

      {/* 主内容区 */}
      <div className="flex-1 overflow-y-auto px-4 pt-4">
        {/* 网络选择 */}
        <div className="mb-4">
          <div className="text-xs mb-3" style={{ color: colors.textSecondary }}>
            {t('deposit.select_network')}
          </div>
          <button
            onClick={() => setShowNetworkSelect(true)}
            className="w-full p-4 border flex items-center justify-between"
            style={{ 
              borderColor: colors.border,
              borderRadius: '8px',
              backgroundColor: colors.cardBg,
            }}
          >
            <div className="flex items-center gap-3">
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center font-bold"
                style={{ 
                  backgroundColor: colors.bg,
                  border: `1.5px solid ${colors.border}`,
                  color: colors.text,
                  fontSize: '14px',
                }}
              >
                {selectedNetwork.name}
              </div>
              <div className="text-left">
                <div className="font-medium mb-1" style={{ color: colors.text, fontSize: '15px' }}>
                  {selectedNetwork.fullName}
                </div>
                <div className="text-xs" style={{ color: colors.textSecondary }}>
                  {t('deposit.confirmations')}: {selectedNetwork.confirmations}
                </div>
              </div>
            </div>
            <ChevronDown className="w-5 h-5" style={{ color: colors.textSecondary }} />
          </button>
        </div>

        {/* 充值地址 */}
        <div className="mb-4">
          <div className="text-xs mb-3" style={{ color: colors.textSecondary }}>
            {t('deposit.deposit_address')}
          </div>
          <div 
            className="p-4 border"
            style={{ 
              borderColor: colors.border,
              borderRadius: '8px',
              backgroundColor: colors.cardBg,
            }}
          >
            <div 
              className="font-mono text-sm break-all mb-3"
              style={{ color: colors.text }}
            >
              {depositAddress}
            </div>
            <button
              onClick={handleCopy}
              className="w-full py-2.5 rounded-lg font-medium flex items-center justify-center gap-2"
              style={{ 
                backgroundColor: copied ? `${colors.success}20` : colors.bg,
                color: copied ? colors.success : colors.textSecondary,
                border: `1px solid ${colors.border}`,
              }}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>{t('common.copied')}</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>{t('deposit.copy_address')}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* 二维码 */}
        <div className="mb-4">
          <div className="text-xs mb-3" style={{ color: colors.textSecondary }}>
            {t('deposit.scan_qr')}
          </div>
          <div 
            className="p-6 border flex flex-col items-center"
            style={{ 
              borderColor: colors.border,
              borderRadius: '8px',
              backgroundColor: colors.cardBg,
            }}
          >
            <div 
              className="w-48 h-48 rounded-lg flex items-center justify-center mb-3"
              style={{ backgroundColor: colors.bg }}
            >
              <div className="text-center">
                <div 
                  className="w-32 h-32 mx-auto mb-2"
                  style={{ 
                    backgroundColor: '#ffffff',
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='white'/%3E%3Cg fill='%23000'%3E%3Crect x='0' y='0' width='10' height='10'/%3E%3Crect x='20' y='0' width='10' height='10'/%3E%3Crect x='60' y='0' width='10' height='10'/%3E%3Crect x='90' y='0' width='10' height='10'/%3E%3Crect x='0' y='10' width='10' height='10'/%3E%3Crect x='60' y='10' width='10' height='10'/%3E%3Crect x='90' y='10' width='10' height='10'/%3E%3Crect x='0' y='20' width='10' height='10'/%3E%3Crect x='20' y='20' width='10' height='10'/%3E%3Crect x='40' y='20' width='10' height='10'/%3E%3Crect x='60' y='20' width='10' height='10'/%3E%3Crect x='90' y='20' width='10' height='10'/%3E%3C/g%3E%3C/svg%3E")`,
                    backgroundSize: 'contain',
                  }}
                />
              </div>
            </div>
            <p className="text-xs text-center" style={{ color: colors.textSecondary }}>
              {t('deposit.scan_qr_desc')}
            </p>
          </div>
        </div>

        {/* 充值须知 */}
        <div 
          className="p-4 border"
          style={{ 
            backgroundColor: '#FFFBEB',
            borderColor: '#FEF3C7',
            borderRadius: '8px',
          }}
        >
          <div className="flex items-start gap-2">
            <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#F59E0B' }} />
            <div className="space-y-1">
              <p className="text-xs font-semibold mb-2" style={{ color: '#92400E' }}>
                {t('deposit.deposit_tips')}
              </p>
              <p className="text-xs" style={{ color: '#92400E' }}>
                • {t('deposit.tip_3', { amount: selectedNetwork.minDeposit })}
              </p>
              <p className="text-xs" style={{ color: '#92400E' }}>
                • {t('deposit.tip_2')}
              </p>
              <p className="text-xs" style={{ color: '#92400E' }}>
                • {t('deposit.network_fee')}: {selectedNetwork.fee} USDT
              </p>
              <p className="text-xs" style={{ color: '#92400E' }}>
                • {t('deposit.tip_4')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 网络选择弹窗 */}
      {showNetworkSelect && (
        <div 
          className="fixed inset-0 z-50 flex items-end"
          onClick={() => setShowNetworkSelect(false)}
        >
          <div 
            className="absolute inset-0"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          />
          
          <div 
            className="relative w-full"
            style={{ 
              backgroundColor: colors.cardBg,
              borderTopLeftRadius: '16px',
              borderTopRightRadius: '16px',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b" style={{ borderColor: colors.border }}>
              <h2 className="font-semibold text-center" style={{ color: colors.text, fontSize: '16px' }}>
                {t('deposit.select_network')}
              </h2>
            </div>

            <div className="p-4">
              {networks.map((network) => {
                const isSelected = network.id === selectedNetwork.id;
                
                return (
                  <button
                    key={network.id}
                    onClick={() => {
                      setSelectedNetwork(network);
                      setShowNetworkSelect(false);
                    }}
                    className="w-full p-4 mb-2 border flex items-center justify-between"
                    style={{ 
                      borderColor: isSelected ? colors.primary : colors.border,
                      borderRadius: '8px',
                      backgroundColor: isSelected ? `${colors.primary}15` : colors.bg,
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-10 h-10 rounded-full flex items-center justify-center font-bold"
                        style={{ 
                          backgroundColor: isSelected ? colors.primary : colors.bg,
                          border: isSelected ? 'none' : `1.5px solid ${colors.border}`,
                          color: isSelected ? '#ffffff' : colors.textSecondary,
                          fontSize: '14px',
                        }}
                      >
                        {network.name}
                      </div>
                      <div className="text-left">
                        <div className="font-medium" style={{ color: isSelected ? colors.primary : colors.text, fontSize: '15px' }}>
                          {network.fullName}
                        </div>
                        <div className="text-xs" style={{ color: colors.textSecondary }}>
                          {t('deposit.network_fee')} {network.fee} USDT
                        </div>
                      </div>
                    </div>
                    {isSelected && (
                      <div 
                        className="w-5 h-5 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: colors.primary }}
                      >
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="p-4 pt-0">
              <button
                onClick={() => setShowNetworkSelect(false)}
                className="w-full py-3.5 rounded-lg font-medium"
                style={{ 
                  backgroundColor: colors.bg,
                  color: colors.textSecondary,
                  fontSize: '15px',
                  border: `1px solid ${colors.border}`,
                }}
              >
                {t('common.cancel')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
