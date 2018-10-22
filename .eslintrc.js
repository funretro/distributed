module.exports = {
  env: {
    browser: true,
    es6: true,
    mocha: true,
    jquery: true,
  },
  globals: {
    angular: true,
    Papa: true,
    Clipboard: true,
    jsPDF: true,
    EmojiPicker: true,
  },
  extends: [
    'airbnb-base',
    'plugin:prettier/recommended',
    'plugin:angular/johnpapa',
  ],
  parserOptions: {
    sourceType: 'module',
  },
  rules: {
    'angular/di': ['warn', '$inject'],
    'angular/controller-as': ['warn'],
    'angular/file-name': [0],
    'angular/no-service-method': ['warn'],
    'no-unused-expressions': [0],
    semi: [2, 'always'],
  },
};
