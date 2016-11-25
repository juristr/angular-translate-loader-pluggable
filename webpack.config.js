var webpack = require('webpack');
var path = require('path');
var ngAnnotatePlugin = require('ng-annotate-webpack-plugin');

const ROOT = path.resolve(__dirname, 'src');
const DEST = path.resolve(__dirname, 'dist');

module.exports = {

  entry: {
    main: path.resolve(ROOT, 'angular-translate-loader-pluggable.ts')
  },

  output: {
    path: DEST,

    filename: 'angular-translate-loader-pluggable.js',
    library: 'angular-translate-loader-pluggable',
    libraryTarget: 'umd',
    sourceMapFilename: '[name].map',
    chunkFilename: '[id].chunk.js'
  },

  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.ts$/,
        loader: 'tslint-loader',
        exclude: [/node_modules/]
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader'
      },
      {
        test: /\.ts$/,
        exclude: [/node_modules/],
        loader: 'awesome-typescript-loader'
      }
    ],

  },

  resolve: {

    extensions: ['.ts', '.js'],

    modules: [
      ROOT,
      'node_modules'
    ]
  },

  externals: {
        angular: 'angular'
  },

  plugins: [
    new webpack.LoaderOptionsPlugin({
      debug: true
    }),

    new webpack.NoErrorsPlugin(),

    new ngAnnotatePlugin({
      add: true
    }),
    // ,

    // Reference: http://webpack.github.io/docs/list-of-plugins.html#dedupeplugin
    // Dedupe modules in the output
    new webpack.optimize.DedupePlugin(),

    // Reference: http://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
    // Minify all javascript, switch loaders to minimizing mode
    new webpack.optimize.UglifyJsPlugin( {
        // compress: {
        //     warnings: false
        // }
    })
  ]

}
