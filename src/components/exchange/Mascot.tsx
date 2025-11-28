import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '../../contexts/ThemeContext';

interface MascotProps {
}

export function Mascot({}: MascotProps) {
  const { colors } = useTheme();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="fixed bottom-24 right-4 z-40"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: 'spring', stiffness: 200 }}
    >
      <motion.button
        className="relative"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Glow Effect */}
        <motion.div
          className="absolute inset-0 rounded-full blur-xl"
          animate={{
            opacity: isHovered ? 0.6 : 0.3,
            scale: isHovered ? 1.2 : 1,
          }}
          style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
        />

        {/* Mascot Character - Crypto Rocket */}
        <div className="relative w-16 h-16">
          <svg viewBox="0 0 64 64" className="w-full h-full">
            {/* Rocket Body */}
            <defs>
              <linearGradient id="rocketGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#667eea" />
                <stop offset="100%" stopColor="#764ba2" />
              </linearGradient>
              <linearGradient id="fireGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#f5576c" />
                <stop offset="100%" stopColor="#f093fb" />
              </linearGradient>
            </defs>

            {/* Fire Trail */}
            <motion.ellipse
              cx="32"
              cy="50"
              rx="6"
              ry="10"
              fill="url(#fireGradient)"
              animate={{
                ry: isHovered ? [10, 14, 10] : 10,
                opacity: [0.8, 1, 0.8],
              }}
              transition={{ duration: 0.5, repeat: Infinity }}
            />

            {/* Rocket Body */}
            <motion.path
              d="M 32 8 L 42 38 L 38 38 L 38 48 L 26 48 L 26 38 L 22 38 Z"
              fill="url(#rocketGradient)"
              animate={{
                y: isHovered ? [-2, 0, -2] : 0,
              }}
              transition={{ duration: 0.5, repeat: Infinity }}
            />

            {/* Window */}
            <circle cx="32" cy="22" r="5" fill="#fff" opacity="0.9" />
            <circle cx="32" cy="22" r="3" fill="#4facfe" />

            {/* Wings */}
            <path d="M 22 32 L 16 42 L 22 38 Z" fill="#f5576c" opacity="0.8" />
            <path d="M 42 32 L 48 42 L 42 38 Z" fill="#f5576c" opacity="0.8" />

            {/* Stars */}
            <motion.circle
              cx="12"
              cy="16"
              r="1.5"
              fill="#ffd700"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <motion.circle
              cx="52"
              cy="24"
              r="1.5"
              fill="#ffd700"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{ duration: 1.5, delay: 0.5, repeat: Infinity }}
            />
          </svg>
        </div>

        {/* Speech Bubble */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: 10 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.8, x: 10 }}
              className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-2 rounded-lg shadow-lg whitespace-nowrap text-sm"
              style={{ backgroundColor: colors.cardBg, color: colors.text, border: `1px solid ${colors.border}` }}
            >
              嗨！需要帮助吗？🚀
              <div 
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-2 h-2 rotate-45"
                style={{ backgroundColor: colors.cardBg, borderRight: `1px solid ${colors.border}`, borderBottom: `1px solid ${colors.border}` }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </motion.div>
  );
}