module.exports = {
  root: true,
  extends: '@react-native',
  parserOptions: {
    requireConfigFile: false,
  },
  rules: {
    'jsx-quotes': ['error', 'prefer-double','prefer-single'], 
    'semi': 'off',
  },
};
