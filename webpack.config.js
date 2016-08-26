var webpack = require('webpack');
var path = require('path');
module.exports = {
  // entry: './test',
  entry:'./js/common/Router',
  output: {
    path: './src/js/',
    filename: 'bundle.js'
  },
  resolve:{
    extensions:["",".js",".jsx"]
  },
  module:{
    loaders:[
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test:/\.css$/,
        loader:'style-loader!css-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: "url-loader",
        query: { mimetype: "image/png" },
        exclude: /node_modules/
      }
    ]
  },
  plugins:[
    // new webpack.ProvidePlugin({
    //   $:'jquery'
    // }),
    new webpack.optimize.DedupePlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production") 
      }
    })
  ],
  externals:{
    
  }
};
