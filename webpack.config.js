/* eslint global-require: 0 */
'use strict';

const path = require('path');
const webpack = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');

const ENV = process.env.NODE_ENV ? process.env.NODE_ENV : "development";
const isProduction = (process.env.NODE_ENV || 'development') === 'production';
const devtool = process.env.NODE_ENV === 'test' ? 'inline-source-map' : 'source-map';
const dest = './bundles';
const absDest = root(dest);

const config = {
  devtool,
  debug: false,

  metadata: { ENV: ENV },

  verbose: true,
  displayErrorDetails: true,
  context: __dirname,
  stats: {
    colors: true,
    reasons: true
  },

  resolve: {
    cache: false,
    root: __dirname,
    extensions: ['', '.ts', '.js', '.json']
  },

  entry: {
    'angular2': [
      // Angular 2 Deps
      'es6-shim',
      'zone.js',
      'reflect-metadata',
      '@angular/core',
      '@angular/common',
      '@angular/compiler',
      '@angular/http',
      '@angular/platform-browser',
      '@angular/platform-browser-dynamic',
      '@angular/router-deprecated'
    ],
    'ng2-autocomplete': ['src/component/ng2-autocomplete/autocomplete.ts'],
    'ng2-autocomplete-demo': 'demo/boot.ts'
  },

  output: {
    path: absDest,
    filename: '[name].js',
    sourceMapFilename: '[name].js.map',
    chunkFilename: '[id].chunk.js'
  },

  // our Development Server configs
  devServer: {
    inline: true,
    colors: true,
    historyApiFallback: true,
    contentBase: dest,
    //publicPath: dest,
    outputPath: dest,
    watchOptions: {aggregateTimeout: 300, poll: 1000}
  },
  module: {
    loaders: [
      // Support for *.json files.
      {test: /\.json$/, loader: 'json'},
      // Support for CSS as raw text
      {test: /\.css$/, loader: 'raw'},
      // support for .html as raw text
      {test: /\.html$/, loader: 'raw', exclude: [root('demo/index.html')]},
      // Support for .ts files.
      {
        test: /\.ts$/,
        loader: 'awesome-typescript-loader'
      }
    ],
    noParse: [
      /reflect-metadata/,
      /zone\.js\/dist\/zone-microtask/
    ]
  },

  plugins: [
    //new Clean([dest]),
    new DefinePlugin({
        "ENV": JSON.stringify(ENV)
    }),
    new webpack.optimize.OccurenceOrderPlugin(true),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'angular2',
      minChunks: Infinity,
      filename: 'angular2.js'
    }),
    // static assets
    new CopyWebpackPlugin([{from: 'demo/favicon.ico', to: 'favicon.ico'}]),
    new CopyWebpackPlugin([{from: 'demo/assets', to: 'assets'}]),
    // generating html
    new HtmlWebpackPlugin({template: 'demo/index.html'})
  ],
  pushPlugins() {
    if (!isProduction) {
      return;
    }
    const plugins = [
      //production only
      new webpack.optimize.UglifyJsPlugin({
        beautify: false,
        mangle: false,
        comments: false,
        compress: {
          screw_ie8: true
          //warnings: false,
          //drop_debugger: false
        }
        //verbose: true,
        //beautify: false,
        //quote_style: 3
      }),
      new CompressionPlugin({
        asset: '{file}.gz',
        algorithm: 'gzip',
        regExp: /\.js$|\.html|\.css|.map$/,
        threshold: 10240,
        minRatio: 0.8
      })
    ];

    this
      .plugins
      .push
      .apply(plugins);
  }
};

config.pushPlugins();

module.exports = config;

function root(partialPath) {
  return path.join(__dirname, partialPath);
}
