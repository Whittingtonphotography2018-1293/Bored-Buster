import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AppRegistry } from 'react-native-web';
import App from './App';
import 'react-native-url-polyfill/auto';

AppRegistry.registerComponent('App', () => App);

AppRegistry.runApplication('App', {
  rootTag: document.getElementById('root'),
});
