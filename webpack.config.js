const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

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
    }),
    new CopyWebpackPlugin([{
      from: './src/web-worker.js',
      to: 'web-worker.js'
    }])
  ]
};

module.exports = config;
