// polyfill.js
import { Platform } from 'react-native';

// Ensure process exists
if (!global.process) {
  global.process = {};
}

// Ensure process.env exists
if (!global.process.env) {
  global.process.env = {};
}

// Set EXPO_OS before any other imports
if (!global.process.env.EXPO_OS) {
  global.process.env.EXPO_OS = Platform.OS; // 'android' or 'ios'
}
