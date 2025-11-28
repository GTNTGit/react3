// AppShellV2/App.tsx (修正端口到 3000)

import React from 'react';

import { WebView } from 'react-native-webview';

import { StyleSheet, SafeAreaView, Platform, View, Text, StatusBar } from 'react-native';

// ⚠️ 核心修正：端口改为 3000
const WEB_APP_URL = Platform.select({
  ios: 'http://localhost:3000', 
  web: 'http://localhost:3000', 
  default: 'http://192.168.110.168:3000', // 使用您提供的 IP 和正确的端口
});

export default function App() {

  if (Platform.OS === 'web') {
    return (
      <View style={styles.container}>
        <Text>Web 应用运行于：{WEB_APP_URL}</Text>
      </View>
    ); 
  }

  return (
    <SafeAreaView style={styles.container}> 
      <StatusBar barStyle="default" /> 
      <WebView
        source={{ uri: WEB_APP_URL }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        style={styles.webView} 
        onShouldStartLoadWithRequest={(request) => {
          return true;
        }}
      />
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
  }
});

