module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: ['plugin:prettier/recommended', 'plugin:angular/johnpapa'],
  parserOptions: {
    sourceType: 'module',
  },
  rules: {
    'linebreak-style': ['error', 'unix'],
    'angular/di': ['warn', '$inject'],
    'angular/controller-as': ['warn'],
    'angular/file-name': ['warn'],
    'angular/no-service-method': ['warn'],
  },
};
