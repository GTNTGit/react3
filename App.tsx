// App.tsx (加载本地静态文件)

import React, { useRef, useState } from 'react';

import { WebView, WebViewMessageEvent } from 'react-native-webview';

// ⚠️ 核心改造 1: 导入 Platform 和 requireNativeComponent

import { StyleSheet, SafeAreaView, Platform, View, Text, StatusBar, TouchableOpacity, Alert, Linking } from 'react-native';

// ⚠️ 核心改造 2: 导入图标 (需要安装 Expo 默认支持的图标库)

import { MaterialCommunityIcons } from '@expo/vector-icons'; 





// 导航 Tab 列表 (基于您原有的 BottomTabs.tsx 定义)

const tabs = [

    { name: '首页', path: '/', icon: 'home' },

    { name: '交易', path: '/trade', icon: 'chart-bar' },

    { name: '市场', path: '/market', icon: 'flag' },

    { name: '合约', path: '/contract', icon: 'trending-up' },

    { name: '钱包', path: '/wallet', icon: 'wallet' },

];



// ⚠️ 核心改造 3: 定义本地 Web 资源的 URI
// 假设您将 Web App 的 'build' 文件夹复制到了 AppShellV2 的根目录
const WEB_APP_URI = Platform.select({
  ios: require('./build/index.html'), 
  android: { uri: 'file:///android_asset/build/index.html' }, // Android 打包后的特殊路径
  web: 'http://localhost:3000', // Web 模式仍然使用开发服务器
});



// ----------------------------------------------------

// 核心改造 3: 原生底部 Tab Bar 组件

// ----------------------------------------------------

interface NativeTabBarProps {

    onNavigate: (path: string) => void;

    currentPath: string; // 当前活动的路径

}



const NativeTabBar: React.FC<NativeTabBarProps> = ({ onNavigate, currentPath }) => {

    return (

        <View style={styles.tabBarContainer}>

            {tabs.map((tab) => {

                const isActive = currentPath === tab.path;

                return (

                    <TouchableOpacity

                        key={tab.name}

                        onPress={() => onNavigate(tab.path)}

                        style={styles.tabItem}

                    >

                        <MaterialCommunityIcons 

                            name={tab.icon as any} 

                            size={24} 

                            color={isActive ? '#22C55E' : '#717182'} // 绿/灰

                        />

                        <Text style={{ 

                            ...styles.tabLabel, 

                            color: isActive ? '#22C55E' : '#717182' 

                        }}>

                            {tab.name}

                        </Text>

                    </TouchableOpacity>

                );

            })}

        </View>

    );

};





export default function App() {

    const webViewRef = useRef<WebView>(null);

    const [currentPath, setCurrentPath] = useState('/'); // 跟踪 Web App 内部的当前路由



    if (Platform.OS === 'web') {

        return (

            <View style={styles.container}>

                <Text>Web 应用运行于：{typeof WEB_APP_URI === 'string' ? WEB_APP_URI : '本地文件'}</Text>

            </View>

        ); 

    }



    // 核心改造 4: App -> Web 导航函数

    const handleNavigate = (path: string) => {

        // 更新原生 Tab Bar 的选中状态

        setCurrentPath(path); 

        

        if (webViewRef.current) {

            // 向 Webview 发送 JSON 格式消息

            webViewRef.current.postMessage(JSON.stringify({

                type: 'NAVIGATE',

                path: path,

            }));

            

            // ⚠️ 也可以使用 runJavaScript 调用 Web 暴露的全局函数 (二选一)

            // webViewRef.current.injectJavaScript(`window.navigateTo('${path}'); true;`);

        }

    };

    

    // 核心改造 2: 监听 Web -> App 通信，处理所有指令

    const handleWebViewMessage = (event: WebViewMessageEvent) => {

        const dataString = event.nativeEvent.data;

        

        try {

            const data = JSON.parse(dataString);

            

            // --- 路由同步 (Phase C 逻辑) ---

            if (data.type === 'ROUTE_CHANGE' && data.path) {

                setCurrentPath(data.path);

                return;

            }

            

            // --- 原生功能调用 (Phase D 逻辑) ---

            switch (data.type) {

                case 'SHOW_TOAST':

                    // 调用 App 原生 Alert 替代 Toast

                    Alert.alert("来自 Web App 的通知", data.payload?.message || "无内容");

                    break;

                case 'SHARE_CONTENT':

                    // 这里可以调用原生 Sharing API，但 Alert 仅作演示

                    Alert.alert("分享指令", `分享内容: ${data.payload?.content}`);

                    break;

                case 'OPEN_URL_EXTERNAL':

                    // 打开外部链接 (例如：客服链接)

                    if (data.payload?.url) {

                        Linking.openURL(data.payload.url);

                    }

                    break;

                // 添加更多原生功能...

            }

        } catch (e) {

            console.error("Error processing message from Webview:", e, dataString);

        }

    };





    return (

        <SafeAreaView style={styles.container}> 

            <StatusBar barStyle="default" /> 

            <View style={{ flex: 1 }}>

                <WebView

                    ref={webViewRef}

                    // ⚠️ 核心改造 4: source 中直接使用本地文件路径

                    source={WEB_APP_URI} 

                    javaScriptEnabled={true}

                    domStorageEnabled={true}

                    style={styles.webView} 

                    onMessage={handleWebViewMessage}

                    // 必须允许所有内部导航，因为它是本地文件

                    onShouldStartLoadWithRequest={() => true} 

                />

            </View>

            <NativeTabBar onNavigate={handleNavigate} currentPath={currentPath} />

        </SafeAreaView>

    );

}



const styles = StyleSheet.create({

    container: {

        flex: 1, 

        backgroundColor: '#fff',

    },

    webView: {

        flex: 1, 

    },

    tabBarContainer: {

        flexDirection: 'row',

        justifyContent: 'space-around',

        alignItems: 'center',

        backgroundColor: '#fff', // 底部导航栏的背景色

        height: 60, // 固定高度

        borderTopWidth: 1,

        borderTopColor: '#e0e0e0',

    },

    tabItem: {

        flex: 1,

        alignItems: 'center',

        justifyContent: 'center',

        paddingVertical: 5,

    },

    tabLabel: {

        fontSize: 10,

        marginTop: 2,

    },

});
