module.exports = {
  presets: [
    '@babel/react',
    ['@babel/preset-env', { targets: { node: 'current' } }],
  ],
  plugins: ['@babel/plugin-transform-runtime'],
};
