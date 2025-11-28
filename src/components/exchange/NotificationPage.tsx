import { ArrowLeft, Bell, TrendingUp, Gift, Shield, Zap, AlertCircle, CheckCircle2, Clock, Trash2, LucideIcon } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { useTranslation } from 'react-i18next';

interface NotificationPageProps {
  theme: 'dark' | 'light';
}

interface Notification {
  id: number;
  type: 'system' | 'trade' | 'promotion' | 'security';
  title: string;
  content: string;
  time: string;
  read: boolean;
  icon: LucideIcon;
  color: string;
}

export function NotificationPage({ theme }: NotificationPageProps) {
  const { colors } = useTheme();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'all' | 'unread'>('all');
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: 'system',
      title: t('notification.system_upgrade'),
      content: t('notification.system_upgrade_content'),
      time: t('notification.time_5min_ago'),
      read: false,
      icon: Bell,
      color: '#3B82F6'
    },
    {
      id: 2,
      type: 'trade',
      title: t('notification.trade_reminder'),
      content: t('notification.trade_reminder_content'),
      time: t('notification.time_1hour_ago'),
      read: false,
      icon: TrendingUp,
      color: '#10B981'
    },
    {
      id: 3,
      type: 'promotion',
      title: t('notification.new_user_bonus'),
      content: t('notification.new_user_bonus_content'),
      time: t('notification.time_3hours_ago'),
      read: true,
      icon: Gift,
      color: '#F59E0B'
    },
    {
      id: 4,
      type: 'security',
      title: t('notification.security_alert'),
      content: t('notification.security_alert_content'),
      time: t('notification.time_yesterday_18_30'),
      read: true,
      icon: Shield,
      color: '#EF4444'
    },
    {
      id: 5,
      type: 'promotion',
      title: t('notification.vip_exclusive'),
      content: t('notification.vip_exclusive_content'),
      time: t('notification.time_yesterday_14_20'),
      read: true,
      icon: Zap,
      color: '#8B5CF6'
    },
    {
      id: 6,
      type: 'trade',
      title: t('notification.withdraw_success'),
      content: t('notification.withdraw_success_content'),
      time: t('notification.time_2days_ago'),
      read: true,
      icon: CheckCircle2,
      color: '#10B981'
    },
    {
      id: 7,
      type: 'system',
      title: t('notification.new_coin_listing'),
      content: t('notification.new_coin_listing_content'),
      time: t('notification.time_3days_ago'),
      read: true,
      icon: AlertCircle,
      color: '#06B6D4'
    },
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;
  const displayNotifications = activeTab === 'all' ? notifications : notifications.filter(n => !n.read);

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: colors.bg }}>
      {/* Header */}
      <div className="sticky top-0 z-10 px-4 py-3 border-b" style={{ backgroundColor: colors.cardBg, borderColor: colors.border }}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/')} className="w-9 h-9 rounded-lg flex items-center justify-center transition-all active:opacity-70" style={{ backgroundColor: colors.bg }}>
              <ArrowLeft className="w-5 h-5" style={{ color: colors.text }} />
            </button>
            <div>
              <h1 style={{ color: colors.text }}>{t('notification.title')}</h1>
              {unreadCount > 0 && (
                <div className="text-xs" style={{ color: colors.textSecondary }}>
                  {unreadCount} {t('notification.unread')}
                </div>
              )}
            </div>
          </div>
          {unreadCount > 0 && (
            <button 
              onClick={markAllAsRead}
              className="text-xs px-3 py-1.5 rounded-lg transition-all active:scale-95"
              style={{ 
                backgroundColor: theme === 'light' ? '#F3F4F6' : '#374151',
                color: colors.primary
              }}
            >
              {t('common.mark_all_read')}
            </button>
          )}
        </div>

        {/* Tabs */}
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('all')}
            className="flex-1 py-2 rounded-lg text-sm transition-all active:scale-95"
            style={{
              backgroundColor: activeTab === 'all' ? `${colors.primary}15` : 'transparent',
              color: activeTab === 'all' ? colors.primary : colors.textSecondary,
              border: `1px solid ${activeTab === 'all' ? colors.primary : 'transparent'}`
            }}
          >
            {t('notification.all')}
          </button>
          <button
            onClick={() => setActiveTab('unread')}
            className="flex-1 py-2 rounded-lg text-sm transition-all active:scale-95 relative"
            style={{
              backgroundColor: activeTab === 'unread' ? `${colors.primary}15` : 'transparent',
              color: activeTab === 'unread' ? colors.primary : colors.textSecondary,
              border: `1px solid ${activeTab === 'unread' ? colors.primary : 'transparent'}`
            }}
          >
            {t('notification.unread')}
            {unreadCount > 0 && (
              <span 
                className="absolute -top-1 -right-1 min-w-[18px] h-[18px] rounded-full flex items-center justify-center text-[10px] px-1"
                style={{ backgroundColor: colors.primary, color: '#FFFFFF' }}
              >
                {unreadCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* 消息列表 */}
      <div className="flex-1 overflow-y-auto">
        {displayNotifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Bell className="w-16 h-16 mb-4" style={{ color: colors.textSecondary, opacity: 0.3 }} />
            <div className="text-sm" style={{ color: colors.textSecondary }}>{activeTab === 'unread' ? t('notification.no_unread') : t('notification.no_messages')}</div>
          </div>
        ) : (
          <div className="p-4 space-y-3">
            {displayNotifications.map((notification) => {
              const Icon = notification.icon;
              return (
                <div
                  key={notification.id}
                  onClick={() => markAsRead(notification.id)}
                  className="rounded-xl p-4 transition-all active:opacity-70 relative"
                  style={{
                    backgroundColor: notification.read ? colors.cardBg : (theme === 'light' ? `${colors.primary}05` : `${colors.primary}10`),
                    border: `1px solid ${notification.read ? colors.border : `${colors.primary}30`}`
                  }}
                >
                  {/* 未读标识 */}
                  {!notification.read && (
                    <div 
                      className="absolute top-4 right-4 w-2 h-2 rounded-full"
                      style={{ backgroundColor: colors.primary }}
                    />
                  )}

                  <div className="flex gap-3">
                    {/* 图标 */}
                    <div 
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ 
                        backgroundColor: theme === 'light' ? `${notification.color}15` : `${notification.color}20`,
                        border: `1.5px solid ${notification.color}40`
                      }}
                    >
                      <Icon className="w-5 h-5" style={{ color: notification.color }} />
                    </div>

                    {/* 内容 */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <h3 
                          className="text-sm truncate"
                          style={{ 
                            color: colors.text,
                            fontWeight: notification.read ? 'normal' : '600'
                          }}
                        >
                          {notification.title}
                        </h3>
                      </div>
                      
                      <p 
                        className="text-xs leading-relaxed mb-2 line-clamp-2"
                        style={{ color: colors.textSecondary }}
                      >
                        {notification.content}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-xs" style={{ color: colors.textSecondary }}>
                          <Clock className="w-3 h-3" />
                          <span>{notification.time}</span>
                        </div>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (confirm(t('notification.delete_confirm'))) {
                              deleteNotification(notification.id);
                            }
                          }}
                          className="p-1.5 rounded-lg transition-all active:scale-95"
                          style={{ 
                            backgroundColor: theme === 'light' ? '#FEE2E2' : '#EF444420',
                          }}
                        >
                          <Trash2 className="w-3.5 h-3.5" style={{ color: '#EF4444' }} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 底部操作栏 */}
      {displayNotifications.length > 0 && (
        <div className="sticky bottom-0 px-4 py-3 border-t" style={{ backgroundColor: colors.cardBg, borderColor: colors.border }}>
          <div className="flex gap-2">
            <button
              onClick={() => {
                if (confirm(t('notification.clear_read_confirm'))) {
                  setNotifications(notifications.filter(n => !n.read));
                }
              }}
              className="flex-1 py-3 rounded-xl transition-all active:scale-95"
              style={{ 
                backgroundColor: theme === 'light' ? '#F3F4F6' : '#374151',
                color: colors.text
              }}
            >
              {t('common.clear_read')}
            </button>
            <button
              onClick={() => {
                if (confirm(t('notification.delete_all_confirm'))) {
                  setNotifications([]);
                }
              }}
              className="flex-1 py-3 rounded-xl transition-all active:scale-95"
              style={{ 
                backgroundColor: theme === 'light' ? '#FEE2E2' : '#EF444420',
                color: '#EF4444'
              }}
            >
              {t('common.delete_all')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
