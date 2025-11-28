// App.tsx (引入原生 Tab Bar 和导航逻辑)

import React, { useRef, useState } from 'react';

// ⚠️ 核心改造 1: 导入 WebView 组件和类型

import { WebView, WebViewMessageEvent } from 'react-native-webview';

import { StyleSheet, SafeAreaView, Platform, View, Text, StatusBar, TouchableOpacity } from 'react-native';

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



const WEB_APP_URL = Platform.select({

  ios: 'http://localhost:3000', 

  web: 'http://localhost:3000', 

  default: 'http://192.168.110.168:3000', 

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

                <Text>Web 应用运行于：{WEB_APP_URL}</Text>

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

    

    // 核心改造 5: 监听 Web -> App 通信

    const handleWebViewMessage = (event: WebViewMessageEvent) => {

        const data = JSON.parse(event.nativeEvent.data);

        

        if (data.type === 'ROUTE_CHANGE' && data.path) {

            // Web App 告诉 App 壳它内部发生了路由变化 (例如：点击 Web App 内部链接)

            setCurrentPath(data.path);

        }

        

        // 可以在这里处理 Web App 发送的其他原生指令，例如：

        // if (data.type === 'SHARE') { /* 调用原生分享 API */ }

    };





    return (

        <SafeAreaView style={styles.container}> 

            <StatusBar barStyle="default" /> 

            <View style={{ flex: 1 }}>

                <WebView

                    ref={webViewRef} // 绑定 Ref

                    source={{ uri: WEB_APP_URL }}

                    javaScriptEnabled={true}

                    domStorageEnabled={true}

                    style={styles.webView} 

                    onMessage={handleWebViewMessage} // 接收 Webview 消息

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
