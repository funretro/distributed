module.exports = {
  extends: '../.eslintrc.js',
  plugins: ['mocha'],
  rules: {
    'no-unused-expressions': [0],
    'mocha/no-exclusive-tests': 'warn',
  },
  env: {
    mocha: true,
  },
  globals: {
    describe: true,
    expect: true,
    inject: true,
    it: true,
    sinon: true,
  },
};
