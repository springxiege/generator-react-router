var webpack = require('webpack');
module.exports = {
  entry: './js/common/Router.js',
  output: {
    path: './dist/app',
    filename: 'app.min.js'
  },
  resolve:{
    extensions:["",".js",".jsx"]
  },
  module:{
    loaders:[
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader!babel?presets[]=es2015&presets[]=react',

      }
    ]
  },
  plugins:[
    new webpack.optimize.DedupePlugin()
  ]
};