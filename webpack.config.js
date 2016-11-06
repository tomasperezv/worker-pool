const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  context: __dirname,
  entry: {
    'worker-pool.js': [
      './src/pool.js',
      './src/worker-pool.js'
    ]
  },
  output: {
    path: path.join(__dirname, '/dist'),
    filename: '[name]'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './example/worker-pool-example.html',
      filename: 'example.html'
    })
  ]
};

module.exports = config;
