module.exports = {
  entry: __dirname + '/client/src/index.js',
  output: {
    path: __dirname + '/client/public',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
	include: __dirname + '/client/src',
	loader: 'babel-loader'
      }
    ]
  },
  watchOptions: {
    poll: true
  }
};
