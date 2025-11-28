// gtntgit/.../src/main.tsx (App 通信桥接)

  import './i18n'; // 初始化 i18n 配置

import React from 'react';

  import { createRoot } from "react-dom/client";

// ⚠️ 核心改造 1: 导入 useNavigate

import { BrowserRouter, useNavigate } from "react-router-dom"; 

  import App from "./App.tsx";

  import "./index.css";



// 定义 WebView 通信接口 (用于 TypeScript 识别)

declare global {

  interface Window {

    ReactNativeWebView?: {

      postMessage: (message: string) => void;

    };

  }

}



// ----------------------------------------------------

// 核心改造 2: 创建路由控制组件 (包裹您的 App)

// ----------------------------------------------------

function RouterWrapper() {

    const navigate = useNavigate();



    React.useEffect(() => {

        // ⚠️ 核心改造 3: 检查 Webview 环境，并暴露全局函数

        if (window.ReactNativeWebView) {

            

            // 暴露全局函数，供 App 壳直接调用（通过注入 JS 字符串）

            (window as any).navigateTo = (path: string) => {

                console.log("Webview received native command to navigate to:", path);

                navigate(path);

            };



            // 通知 App 壳 Web App 已准备就绪 (可选，用于更复杂的初始化)

            // window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'READY' }));

        }



        // ⚠️ 核心改造 4: 监听 App 壳通过 postMessage 发送过来的消息

        const receiveMessage = (event: MessageEvent) => {

            // 针对 iOS 模拟器/真机，消息通常在 event.data 中

            const data = event.data;



            try {

                // 尝试解析数据

                const parsedData = JSON.parse(data);

                

                if (parsedData.type === 'NAVIGATE' && parsedData.path) {

                    console.log("Webview received NAVIGATE command:", parsedData.path);

                    navigate(parsedData.path);

                }

            } catch (e) {

                // 非 JSON 格式消息或解析错误

                console.log("Received non-JSON message or error:", data);

            }

        };



        // 确保使用正确的方式监听消息

        if (window.addEventListener) {

            window.addEventListener('message', receiveMessage, false);

        } else {

            // 兼容旧浏览器

            (window as any).attachEvent('onmessage', receiveMessage);

        }



        return () => {

             if (window.removeEventListener) {

                window.removeEventListener('message', receiveMessage, false);

             } else {

                (window as any).detachEvent('onmessage', receiveMessage);

             }

        };



    }, [navigate]);



    return <App />;

}



// ----------------------------------------------------

// 核心改造 5: 渲染 RouterWrapper

// ----------------------------------------------------

createRoot(document.getElementById("root")!).render(

  <BrowserRouter>

    <RouterWrapper /> 

  </BrowserRouter>

);