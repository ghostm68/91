import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.lovable.inkrealm',
  appName: 'InkRealm',
  webDir: 'dist',
  // Commented out for production builds - use built files instead of dev server
  // server: {
  //   url: 'https://04c29243-e6b8-4494-a980-bd97615ec68d.lovableproject.com?forceHideBadge=true',
  //   cleartext: true
  // },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#000000',
      showSpinner: false
    }
  },
  android: {
    icon: {
      iconPath: 'src/assets/app-icon.jpeg'
    }
  },
  ios: {
    icon: {
      iconPath: 'src/assets/app-icon.jpeg'
    }
  }
};

export default config;