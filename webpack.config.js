const path = require('path');

const config = {
  context: __dirname,
  entry: {
    'worker-pool': [
      './src/pool.js',
      './src/worker-pool.js'
    ]
  },
  output: {
    path: path.join(__dirname, '/dist'),
    filename: '[name].js'
  }
};

module.exports = config;
