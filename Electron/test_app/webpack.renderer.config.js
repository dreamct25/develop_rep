const rules = require('./webpack.rules');
const plugins = require('./webpack.plugins');

rules.push({
  test: /\.(scss)$/, // all scss files will be handled
    // Use loaders in that specific reverse order
    use: [
      {
        loader: 'style-loader',
      },
      {
        loader: 'css-loader',
      },
      {
        loader: 'sass-loader'
      }
    ]
});

rules.push({
  test: /\.(png|jpe?g|gif|ico|svg)$/, // We will handle of these file extensions
  use: [
    {
      loader: "file-loader",
    }
  ]
})

module.exports = {
  module: {
    rules,
  },
  plugins: plugins,
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css','.scss']
  },
  target:'electron-main'
};
