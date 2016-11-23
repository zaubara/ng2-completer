/* eslint global-require: 0 */
'use strict';

const path = require('path');
const webpack = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UnminifiedWebpackPlugin = require('unminified-webpack-plugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const nodeExternals = require('webpack-node-externals');



const ENV = process.env.NODE_ENV ? process.env.NODE_ENV : "development";
const isProduction = (process.env.NODE_ENV || 'development') === 'production';
const isBuildDemo = ((process.env.NG2_COMPLETER_DEMO || 'n') === 'y');
const devtool = process.env.NODE_ENV === 'test' ? 'inline-source-map' : 'source-map';
const dest = './bundles';
const absDest = root(dest);

const entryLib = 'src/index.ts';
const entryDemo = {
    'angular2': [
        // Angular 2 Deps
        'core-js',
        'zone.js',
        'reflect-metadata',
        '@angular/core',
        '@angular/common',
        '@angular/compiler',
        '@angular/http',
        '@angular/material',
        '@angular/platform-browser',
        '@angular/platform-browser-dynamic',
        '@angular/router',
        '@angular/forms',
        'rxjs',
        'object.assign'
    ],
    'ng2-completer': ['src/index.ts'],
    'ng2-completer-demo': 'demo/boot.ts'
};

const outputLib = {
    path: absDest,
    filename: isProduction ? 'ng2-completer.min.js' : 'ng2-completer.js',
    sourceMapFilename: isProduction ? 'ng2-completer.min.js.map' : 'ng2-completer.js.map',
    chunkFilename: '[id].chunk.js',
    library: 'ng2-completer',
    libraryTarget: 'commonjs2',
    umdNamedDefine: true
};

const outputDemo = {
    path: absDest,
    filename: isProduction ? '[name].min.js' : '[name].js',
    sourceMapFilename: isProduction ? '[name].min.js.map' : '[name].js.map',
    chunkFilename: '[id].chunk.js'
};

console.log("build demo", isBuildDemo);

const config = {
    devtool,
    context: __dirname,
    stats: {
        colors: true,
        reasons: true
    },

    resolve: {
        modules: [
            '.',
            'node_modules'
        ],
        extensions: ['.ts', '.js', '.json']
    },

    // entry: 'src/ng2-completer.ts',

    entry: isBuildDemo ? entryDemo : entryLib,

    output: isBuildDemo ? outputDemo : outputLib,

    externals: isBuildDemo ? [] : [nodeExternals()],


    // our Development Server configs
    devServer: {
        inline: true,
        //colors: true,
        historyApiFallback: true,
        contentBase: dest,
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000
        }
    },
    module: {
        exprContextCritical: false,
        loaders: [
            // Support for *.json files.
            {
                test: /\.json$/,
                loader: 'json-loader',
                // exclude: /(node_modules|demo)/
            },
            // Support for CSS as raw text
            {
                test: /\.css$/,
                loader: 'raw-loader',
                // exclude: /(node_modules|demo)/
            },
            // support for .html as raw text
            {
                test: /\.html$/,
                loader: 'raw-loader',
                exclude: [root('demo/index.html')]
                    // exclude: [root('demo/index.html'), /(node_modules|demo)/]
            },
            // Support for .ts files.
            {
                test: /\.ts$/,
                loaders: ['angular2-template-loader', 'awesome-typescript-loader'],
                // exclude: /(node_modules|demo)/
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
        })
    ]
};

function pushPlugins() {
    if (!isProduction && !isBuildDemo) {
        return;
    }
    const plugins = [];
    if (isBuildDemo) {
        plugins.push(
            // generating html
            new HtmlWebpackPlugin({
                template: `demo/index.html?ENV=${ENV}`
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'angular2',
                minChunks: Infinity,
                filename: 'angular2.js'
            }),
            // static assets
            new CopyWebpackPlugin([{
                from: "demo/res/**/*"
            }, {
                from: 'demo/favicon.ico',
                to: 'favicon.ico'
            }])
        );
    }
    if (isProduction) {
        console.log("build production");
        //production only
        plugins.push(
            new webpack.optimize.UglifyJsPlugin({
                beautify: false,
                mangle: false,
                comments: false,
                compress: {
                    screw_ie8: true
                }
            }),
            new UnminifiedWebpackPlugin(),
            new CompressionPlugin({
                asset: '[file].gz',
                algorithm: 'gzip',
                regExp: /\.js$|\.html|\.css|.map$/,
                threshold: 10240,
                minRatio: 0.8
            })
        );
    }
    config
        .plugins
        .push
        .apply(config.plugins, plugins);
};

pushPlugins();

module.exports = config;

function root(partialPath) {
    return path.join(__dirname, partialPath);
}