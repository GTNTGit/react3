import { ArrowLeft, MessageCircle, Phone, Mail, Clock, Send, Paperclip, Smile, Bot, User } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { useTranslation } from 'react-i18next';

interface CustomerServicePageProps {
  theme: 'dark' | 'light';
}

export function CustomerServicePage({ theme }: CustomerServicePageProps) {
  const { colors } = useTheme();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, type: 'bot', text: t('customer_service.greeting'), time: '14:30' },
    { id: 2, type: 'bot', text: t('customer_service.how_can_help'), time: '14:30' },
  ]);

  const quickReplies = [
    t('customer_service.how_to_deposit'),
    t('customer_service.withdraw_fee'),
    t('customer_service.how_to_enable_2fa'),
    t('customer_service.forgot_password'),
  ];

  const handleSend = () => {
    if (!message.trim()) return;
    
    const newMessage = {
      id: messages.length + 1,
      type: 'user',
      text: message,
      time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages([...messages, newMessage]);
    setMessage('');
    
    // 模拟客服回复
    setTimeout(() => {
      const botReply = {
        id: messages.length + 2,
        type: 'bot',
        text: t('customer_service.thanks_consultation'),
        time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botReply]);
    }, 1000);
  };

  const handleQuickReply = (text: string) => {
    const newMessage = {
      id: messages.length + 1,
      type: 'user',
      text: text,
      time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages([...messages, newMessage]);
    
    // 模拟客服回复
    setTimeout(() => {
      let replyText = '';
      if (text.includes(t('assets.deposit')) || text.includes(t('customer_service.deposit_keyword'))) {
        replyText = t('customer_service.deposit_reply');
      } else if (text.includes(t('assets.withdraw')) || text.includes(t('customer_service.withdraw_keyword'))) {
        replyText = t('customer_service.withdraw_reply');
      } else if (text.includes('2FA') || text.includes(t('customer_service.two_factor_keyword'))) {
        replyText = t('customer_service.2fa_reply');
      } else if (text.includes(t('security.login_password')) || text.includes(t('customer_service.password_keyword'))) {
        replyText = t('customer_service.password_reply');
      } else {
        replyText = t('customer_service.default_reply');
      }
      
      const botReply = {
        id: messages.length + 2,
        type: 'bot',
        text: replyText,
        time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botReply]);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: colors.bg }}>
      {/* Header */}
      <div className="sticky top-0 z-10 px-4 py-3 border-b" style={{ backgroundColor: colors.cardBg, borderColor: colors.border }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/')} className="w-9 h-9 rounded-lg flex items-center justify-center transition-all active:opacity-70" style={{ backgroundColor: colors.bg }}>
              <ArrowLeft className="w-5 h-5" style={{ color: colors.text }} />
            </button>
            <div>
              <h1 style={{ color: colors.text }}>{t('customer_service.title')}</h1>
              <div className="flex items-center gap-1 text-xs" style={{ color: colors.success }}>
                <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: colors.success }} />
                <span>{t('profile.online')}</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="w-9 h-9 rounded-lg flex items-center justify-center transition-all active:opacity-70" style={{ backgroundColor: colors.bg }}>
              <Phone className="w-4 h-4" style={{ color: colors.textSecondary }} />
            </button>
          </div>
        </div>
      </div>

      {/* 联系方式快捷栏 */}
      <div className="px-4 py-3 border-b" style={{ backgroundColor: colors.cardBg, borderColor: colors.border }}>
        <div className="flex gap-2 overflow-x-auto">
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all active:scale-95 whitespace-nowrap" style={{ backgroundColor: theme === 'light' ? '#F3F4F6' : '#374151' }}>
            <Phone className="w-4 h-4" style={{ color: colors.primary }} />
            <span className="text-xs" style={{ color: colors.text }}>{t('customer_service.phone_service')}</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all active:scale-95 whitespace-nowrap" style={{ backgroundColor: theme === 'light' ? '#F3F4F6' : '#374151' }}>
            <Mail className="w-4 h-4" style={{ color: colors.primary }} />
            <span className="text-xs" style={{ color: colors.text }}>{t('customer_service.email_support')}</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all active:scale-95 whitespace-nowrap" style={{ backgroundColor: theme === 'light' ? '#F3F4F6' : '#374151' }}>
            <Clock className="w-4 h-4" style={{ color: colors.primary }} />
            <span className="text-xs" style={{ color: colors.text }}>{t('customer_service.service_hours')}</span>
          </button>
        </div>
      </div>

      {/* 消息列表 */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-2 ${msg.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
            {/* 头像 */}
            <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: msg.type === 'bot' ? `${colors.primary}20` : theme === 'light' ? '#F3F4F6' : '#374151' }}>
              {msg.type === 'bot' ? (
                <Bot className="w-4 h-4" style={{ color: colors.primary }} />
              ) : (
                <User className="w-4 h-4" style={{ color: colors.text }} />
              )}
            </div>
            
            {/* 消息气泡 */}
            <div className={`max-w-[70%] ${msg.type === 'user' ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
              <div 
                className="px-4 py-2.5 rounded-2xl"
                style={{ 
                  backgroundColor: msg.type === 'user' ? colors.primary : (theme === 'light' ? '#F3F4F6' : '#374151'),
                  color: msg.type === 'user' ? '#FFFFFF' : colors.text,
                  borderRadius: msg.type === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px'
                }}
              >
                <p className="text-sm leading-relaxed">{msg.text}</p>
              </div>
              <span className="text-xs px-2" style={{ color: colors.textSecondary }}>{msg.time}</span>
            </div>
          </div>
        ))}
      </div>

      {/* 快捷回复 */}
      {messages.length <= 2 && (
        <div className="px-4 py-3 border-t" style={{ borderColor: colors.border }}>
          <div className="text-xs mb-2" style={{ color: colors.textSecondary }}>{t('customer_service.common_questions')}</div>
          <div className="flex flex-wrap gap-2">
            {quickReplies.map((reply, index) => (
              <button
                key={index}
                onClick={() => handleQuickReply(reply)}
                className="px-3 py-1.5 rounded-full text-xs transition-all active:scale-95"
                style={{ 
                  backgroundColor: theme === 'light' ? '#F3F4F6' : '#374151',
                  color: colors.text,
                  border: `1px solid ${colors.border}`
                }}
              >
                {reply}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 输入框 */}
      <div className="sticky bottom-0 px-4 py-3 border-t" style={{ backgroundColor: colors.cardBg, borderColor: colors.border }}>
        <div className="flex items-end gap-2">
          <button className="w-9 h-9 rounded-lg flex items-center justify-center transition-all active:opacity-70" style={{ backgroundColor: theme === 'light' ? '#F3F4F6' : '#374151' }}>
            <Paperclip className="w-4 h-4" style={{ color: colors.textSecondary }} />
          </button>
          
          <div className="flex-1 relative">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={t('customer_service.input_message')}
              rows={1}
              className="w-full px-4 py-2.5 rounded-xl resize-none transition-all focus:outline-none"
              style={{ 
                backgroundColor: theme === 'light' ? '#F3F4F6' : '#374151',
                borderColor: colors.border,
                color: colors.text,
                maxHeight: '80px'
              }}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
            />
          </div>

          <button className="w-9 h-9 rounded-lg flex items-center justify-center transition-all active:opacity-70" style={{ backgroundColor: theme === 'light' ? '#F3F4F6' : '#374151' }}>
            <Smile className="w-4 h-4" style={{ color: colors.textSecondary }} />
          </button>
          
          <button 
            onClick={handleSend}
            className="w-9 h-9 rounded-lg flex items-center justify-center transition-all active:scale-95"
            style={{ 
              background: message.trim() ? colors.primaryGradient : (theme === 'light' ? '#F3F4F6' : '#374151')
            }}
          >
            <Send className="w-4 h-4" style={{ color: message.trim() ? '#FFFFFF' : colors.textSecondary }} />
          </button>
        </div>
      </div>
    </div>
  );
}
