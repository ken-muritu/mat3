import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import * as WebBrowser from 'expo-web-browser';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CurrencyProvider } from './context/CurrencyContext';
import RootNavigator, { AuthNavigator } from './navigation/RootNavigator';
import ErrorBoundary from './components/ErrorBoundary';
import SplashScreenComponent from './screens/SplashScreen';

WebBrowser.maybeCompleteAuthSession();

// Keep splash screen visible while loading
SplashScreen.preventAutoHideAsync();

function AppContent() {
  const { isAuthenticated, isLoading } = useAuth();
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Show custom splash for 2.5 seconds
    const timer = setTimeout(() => {
      setShowSplash(false);
      SplashScreen.hideAsync();
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return <SplashScreenComponent />;
  }

  // Show auth screens if not authenticated
  if (!isAuthenticated && !isLoading) {
    return <AuthNavigator />;
  }

  return <RootNavigator />;
}

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make API calls, etc.
        await new Promise(resolve => setTimeout(resolve, 500));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  if (!appIsReady) {
    return null;
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#006B3F' }}>
      <ErrorBoundary>
        <SafeAreaProvider>
          <ThemeProvider>
            <AuthProvider>
              <CurrencyProvider>
                <NavigationContainer>
                  <StatusBar style="light" backgroundColor="#006B3F" />
                  <AppContent />
                </NavigationContainer>
              </CurrencyProvider>
            </AuthProvider>
          </ThemeProvider>
        </SafeAreaProvider>
      </ErrorBoundary>
    </View>
  );
}
