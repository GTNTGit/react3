import { useEffect } from 'react';

/**
 * 锁定 body 滚动的 Hook
 * 用于弹窗打开时阻止底层页面滚动
 */
export function useLockBodyScroll(lock: boolean = true) {
  useEffect(() => {
    if (!lock) return;

    // 保存原始样式
    const originalStyle = {
      overflow: document.body.style.overflow,
      position: document.body.style.position,
      top: document.body.style.top,
      width: document.body.style.width,
    };

    // 保存当前滚动位置
    const scrollY = window.scrollY;

    // 锁定滚动
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';

    // 清理函数：恢复原始样式和滚动位置
    return () => {
      document.body.style.overflow = originalStyle.overflow;
      document.body.style.position = originalStyle.position;
      document.body.style.top = originalStyle.top;
      document.body.style.width = originalStyle.width;

      // 恢复滚动位置
      window.scrollTo(0, scrollY);
    };
  }, [lock]);
}
