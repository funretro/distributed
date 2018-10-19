module.exports = api => {
  const presets = ['@babel/env'];
  const plugins = [];

  api.cache(true);
  return {
    presets,
    plugins,
  };
};
