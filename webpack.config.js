const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  context: __dirname,
  entry: {
    'worker-pool.js': [
      './src/worker-pool.js'
    ]
  },
  output: {
    path: path.join(__dirname, '/dist'),
    filename: '[name]',
    libraryTarget: 'var',
    library: 'WorkerPool'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './example/worker-pool-example.html',
      filename: 'index.html',
      inject: 'head'
    })
  ]
};

module.exports = config;
