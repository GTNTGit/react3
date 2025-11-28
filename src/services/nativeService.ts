// gtntgit/.../src/services/nativeService.ts (Web -> App 消息发送封装)

// 定义 WebView 通信接口 (用于 TypeScript 识别)
declare global {
  interface Window {
    ReactNativeWebView?: {
      postMessage: (message: string) => void;
    };
  }
}

// 定义 App 壳可以执行的原生操作类型

export type NativeActionType = 

    | 'SHOW_TOAST' 

    | 'SHARE_CONTENT' 

    | 'CALL_HAPTICS'

    | 'OPEN_URL_EXTERNAL';



interface NativeMessage {

    type: NativeActionType;

    // 携带的参数，如 Toast 的内容或要分享的链接

    payload?: Record<string, any>; 

}



/**

 * 将消息发送到 App 壳的 WebView 监听器

 * @param message 要发送的消息对象

 */

export function postNativeMessage(message: NativeMessage): void {

    // 确保我们在 WebView 环境中

    if (window.ReactNativeWebView) {

        try {

            const jsonMessage = JSON.stringify(message);

            window.ReactNativeWebView.postMessage(jsonMessage);

            console.log(`[NativeService] Message sent: ${jsonMessage}`);

        } catch (error) {

            console.error("[NativeService] Failed to post message:", error);

        }

    } else {

        // H5 (Web) 环境下的调试输出

        console.warn(`[NativeService] Not in WebView. Faking call for type: ${message.type}`);

        console.log("Faked Payload:", message.payload);

        

        // 可以在这里模拟 Web 行为，例如在 Web 上调用原生 Toast 对应的方法

        if (message.type === 'SHOW_TOAST' && message.payload?.message) {

             alert(`Web 模拟 Toast: ${message.payload.message}`);

        }

    }

}

