// // babel.config.js
// module.exports = {
//   presets: ['module:@react-native/babel-preset', 'nativewind/babel'],
//   plugins: [
//     ['transform-inline-environment-variables', { include: ['EXPO_OS'] }],
//   ],
// };

// module.exports = {
//   presets: ['module:@react-native/babel-preset', 'nativewind/babel'],
//   plugins: [
//     'react-native-worklets/plugin',
//   ],
// };

module.exports = {
  presets: ['module:@react-native/babel-preset', 'nativewind/babel'],
  plugins: [
    // 'react-native-reanimated/plugin',
    'react-native-worklets/plugin',
  ],
};

