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
    indent: ['error', 2],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'angular/di': ['error', '$inject'],
  },
};
