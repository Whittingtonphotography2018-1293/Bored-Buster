import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App as CapacitorApp } from '@capacitor/app';
import { StatusBar, Style } from '@capacitor/status-bar';
import { SplashScreen } from '@capacitor/splash-screen';
import { Capacitor } from '@capacitor/core';
import AppWrapper from './AppWrapper.tsx';
import ErrorBoundary from './components/ErrorBoundary.tsx';
import './index.css';

if (Capacitor.isNativePlatform()) {
  try {
    StatusBar.setStyle({ style: Style.Dark }).catch(err => {
      console.error('Error setting status bar style:', err);
    });

    if (Capacitor.getPlatform() === 'android') {
      StatusBar.setBackgroundColor({ color: '#ffffff' }).catch(err => {
        console.error('Error setting status bar background:', err);
      });
    }

    SplashScreen.hide().catch(err => {
      console.error('Error hiding splash screen:', err);
    });
  } catch (error) {
    console.error('Error initializing Capacitor plugins:', error);
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <AppWrapper />
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>
);
