/**
 * @format
 */
// Must be first
import './polyfill';
import { AppRegistry } from 'react-native';
import App from './src';
import { name as appName } from './app.json';
import './global.css';



AppRegistry.registerComponent(appName, () => App);
