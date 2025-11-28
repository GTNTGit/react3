import React, { useState } from 'react';
import { ArrowLeft, AlertCircle, ChevronDown, Check } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface Network {
  id: string;
  name: string;
  fullName: string;
  fee: number;
  minWithdraw: number;
  confirmations: number;
}

export default function Withdraw() {
  const { colors } = useTheme();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [selectedNetwork, setSelectedNetwork] = useState<Network>({
    id: 'trc20',
    name: 'TRC20',
    fullName: 'Tron (TRC20)',
    fee: 1,
    minWithdraw: 10,
    confirmations: 19,
  });
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const [showNetworkSelect, setShowNetworkSelect] = useState(false);

  const networks: Network[] = [
    {
      id: 'trc20',
      name: 'TRC20',
      fullName: 'Tron (TRC20)',
      fee: 1,
      minWithdraw: 10,
      confirmations: 19,
    },
    {
      id: 'erc20',
      name: 'ERC20',
      fullName: 'Ethereum (ERC20)',
      fee: 5,
      minWithdraw: 50,
      confirmations: 12,
    },
    {
      id: 'bep20',
      name: 'BEP20',
      fullName: 'BSC (BEP20)',
      fee: 0.5,
      minWithdraw: 10,
      confirmations: 15,
    },
  ];

  const availableBalance = 100000;

  const handleAmountChange = (value: string) => {
    setAmount(value);
    setError('');
    
    const numValue = parseFloat(value);
    // 超过最大值时自动限制为最大值
    if (numValue > availableBalance - selectedNetwork.fee) {
      setAmount((availableBalance - selectedNetwork.fee).toString());
    } else if (numValue < selectedNetwork.minWithdraw && value) {
      setError(t('withdraw.min_withdraw_error', { amount: selectedNetwork.minWithdraw }));
    }
  };

  const handleMaxClick = () => {
    const maxAmount = availableBalance - selectedNetwork.fee;
    setAmount(maxAmount.toString());
    setError('');
  };

  const handleWithdraw = () => {
    if (!address) {
      setError(t('withdraw.enter_address_error'));
      return;
    }
    if (!amount) {
      setError(t('withdraw.enter_amount_error'));
      return;
    }
    const numValue = parseFloat(amount);
    if (numValue < selectedNetwork.minWithdraw) {
      setError(t('withdraw.min_withdraw_error', { amount: selectedNetwork.minWithdraw }));
      return;
    }
    if (numValue + selectedNetwork.fee > availableBalance) {
      setError(t('withdraw.insufficient_balance'));
      return;
    }

    alert(t('withdraw.withdraw_success_alert', { networkName: selectedNetwork.name, address, amount, fee: selectedNetwork.fee }));
    
    setAddress('');
    setAmount('');
    setError('');
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
          {t('withdraw.title')}
        </h1>
      </div>

      {/* 主内容区 */}
      <div className="flex-1 overflow-y-auto px-4 pt-4">
        {/* 网络选择 */}
        <div className="mb-4">
          <div className="text-xs mb-3" style={{ color: colors.textSecondary }}>
            {t('withdraw.select_network')}
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
                  {t('withdraw.network_fee')} {selectedNetwork.fee} USDT
                </div>
              </div>
            </div>
            <ChevronDown className="w-5 h-5" style={{ color: colors.textSecondary }} />
          </button>
        </div>

        {/* 提现地址 */}
        <div className="mb-4">
          <div className="text-xs mb-3" style={{ color: colors.textSecondary }}>
            {t('withdraw.withdraw_address')}
          </div>
          <div 
            className="p-4 border"
            style={{ 
              borderColor: error && !amount ? colors.error : colors.border,
              borderRadius: '8px',
              backgroundColor: colors.cardBg,
            }}
          >
            <input
              type="text"
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
                setError('');
              }}
              placeholder={t('withdraw.enter_address')}
              className="w-full bg-transparent outline-none font-mono text-sm"
              style={{ color: colors.text }}
            />
          </div>
        </div>

        {/* 提现数量 */}
        <div 
          className="mb-4 p-4 border"
          style={{ 
            borderColor: error && amount ? colors.error : colors.border,
            borderRadius: '8px',
            backgroundColor: colors.cardBg,
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="text-xs" style={{ color: colors.textSecondary }}>
              {t('withdraw.withdraw_amount')}
            </div>
            <button
              onClick={handleMaxClick}
              className="text-xs font-medium px-3 py-1.5 rounded-full"
              style={{ 
                color: colors.primary,
                backgroundColor: `${colors.primary}15`,
              }}
            >
              {t('common.all')}
            </button>
          </div>
          <div className="flex items-baseline gap-2 mb-2">
            <input
              type="number"
              value={amount}
              onChange={(e) => handleAmountChange(e.target.value)}
              placeholder="0"
              className="flex-1 bg-transparent outline-none font-semibold"
              style={{ 
                color: colors.text,
                fontSize: '32px',
              }}
            />
            <span className="font-medium pb-1" style={{ color: colors.textSecondary, fontSize: '18px' }}>
              USDT
            </span>
          </div>
          <div className="text-xs" style={{ color: colors.textSecondary }}>
            {t('withdraw.available_balance')} {availableBalance.toLocaleString()} USDT
          </div>
        </div>

        {/* 错误提示 */}
        {error && (
          <div 
            className="mb-4 px-4 py-3 flex items-center gap-2 border"
            style={{ 
              backgroundColor: '#FEF2F2',
              borderColor: '#FEE2E2',
              borderRadius: '8px',
            }}
          >
            <AlertCircle className="w-4 h-4" style={{ color: '#EF4444' }} />
            <span className="text-sm" style={{ color: '#EF4444' }}>
              {error}
            </span>
          </div>
        )}

        {/* 提现信息 */}
        {amount && parseFloat(amount) >= selectedNetwork.minWithdraw && (
          <div 
            className="mb-4 p-4 border"
            style={{ 
              borderColor: colors.border,
              borderRadius: '8px',
              backgroundColor: colors.cardBg,
            }}
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm" style={{ color: colors.textSecondary }}>
                  {t('withdraw.withdraw_amount')}
                </span>
                <span className="font-medium" style={{ color: colors.text, fontSize: '15px' }}>
                  {parseFloat(amount).toLocaleString()} USDT
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm" style={{ color: colors.textSecondary }}>
                  {t('withdraw.network_fee')}
                </span>
                <span className="font-medium" style={{ color: colors.text, fontSize: '15px' }}>
                  {selectedNetwork.fee} USDT
                </span>
              </div>
              <div 
                className="pt-2 border-t flex items-center justify-between"
                style={{ borderColor: colors.border }}
              >
                <span className="text-sm font-semibold" style={{ color: colors.text }}>
                  {t('withdraw.actual_received')}
                </span>
                <span className="font-semibold" style={{ color: colors.success, fontSize: '16px' }}>
                  {(parseFloat(amount) - selectedNetwork.fee).toLocaleString()} USDT
                </span>
              </div>
            </div>
          </div>
        )}

        {/* 提现须知 */}
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
                {t('withdraw.withdraw_tips')}
              </p>
              <p className="text-xs" style={{ color: '#92400E' }}>
                • {t('withdraw.min_withdraw')}: {selectedNetwork.minWithdraw} USDT
              </p>
              <p className="text-xs" style={{ color: '#92400E' }}>
                • {t('withdraw.network_fee')}: {selectedNetwork.fee} USDT
              </p>
              <p className="text-xs" style={{ color: '#92400E' }}>
                • {t('withdraw.confirmations_required', { count: selectedNetwork.confirmations })}
              </p>
              <p className="text-xs" style={{ color: '#92400E' }}>
                • {t('withdraw.address_warning')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 底部按钮 */}
      <div 
        className="flex-shrink-0 p-4 border-t"
        style={{ borderColor: colors.border }}
      >
        <button
          onClick={handleWithdraw}
          disabled={!!error || !amount || !address}
          className="w-full py-3.5 rounded-lg font-semibold text-white transition-all disabled:opacity-40"
          style={{ 
            background: 'linear-gradient(135deg, #4ADE80 0%, #22C55E 100%)',
            fontSize: '16px',
          }}
        >
          {t('withdraw.confirm_withdraw')}
        </button>
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
                {t('withdraw.select_network')}
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
                      setAmount('');
                      setError('');
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
                          {t('withdraw.network_fee')} {network.fee} USDT
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
