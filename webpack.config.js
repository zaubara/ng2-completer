/* eslint global-require: 0 */
'use strict';

const path = require('path');
const webpack = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const nodeExternals = require('webpack-node-externals');


const ENV = process.env.NODE_ENV ? process.env.NODE_ENV : "development";
const isProduction = (process.env.NODE_ENV || 'development') === 'production';
const isBuildDemo = ((process.env.NG2_AUTOCOMPLETE_DEMO || 'n') === 'y');
const devtool = process.env.NODE_ENV === 'test' ? 'inline-source-map' : 'source-map';
const dest = './bundles';
const absDest = root(dest);

const entryLib = 'src/ng2-autocomplete.ts';
const entryDemo = {
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
        '@angular/router',
        '@angular/forms',
        'rxjs'
    ],
    'ng2-autocomplete': ['src/ng2-autocomplete.ts'],
    'ng2-autocomplete-demo': 'demo/boot.ts'
};

const outputLib = {
    path: absDest,
    filename: isProduction ? 'ng2-autocomplete.min.js' : 'ng2-autocomplete.js',
    sourceMapFilename: isProduction ? 'ng2-autocomplete.min.js.map' : 'ng2-autocomplete.js.map',
    chunkFilename: '[id].chunk.js',
    library: 'ng2-autocomplete',
    libraryTarget: 'umd',
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
    debug: false,

    metadata: {
        ENV: ENV
    },

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

    // entry: 'src/ng2-autocomplete.ts',

    entry: isBuildDemo ? entryDemo : entryLib,

    output: isBuildDemo ? outputDemo : outputLib,

    externals: isBuildDemo ? [] : [nodeExternals()],


    // our Development Server configs
    devServer: {
        inline: true,
        colors: true,
        historyApiFallback: true,
        contentBase: dest,
        //publicPath: dest,
        outputPath: dest,
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000
        }
    },
    module: {
        loaders: [
            // Support for *.json files.
            {
                test: /\.json$/,
                loader: 'json',
                // exclude: /(node_modules|demo)/
            },
            // Support for CSS as raw text
            {
                test: /\.css$/,
                loader: 'raw',
                // exclude: /(node_modules|demo)/
            },
            // support for .html as raw text
            {
                test: /\.html$/,
                loader: 'raw',
                exclude: [root('demo/index.html')]
                // exclude: [root('demo/index.html'), /(node_modules|demo)/]
            },
            // Support for .ts files.
            {
                test: /\.ts$/,
                loader: 'awesome-typescript-loader',
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
        }),
        new webpack.optimize.OccurenceOrderPlugin(true),
        // static assets
        new CopyWebpackPlugin([{
            from: "demo/res/**/*"
        }, {
                from: 'demo/favicon.ico',
                to: 'favicon.ico'
            }])
    ],
    pushPlugins() {
        if (!isProduction && !isBuildDemo) {
            return;
        }
        const plugins = [];
        if (isBuildDemo) {
            plugins.push(
                // generating html
                new HtmlWebpackPlugin({
                    template: 'demo/index.html'
                }),
                new webpack.optimize.CommonsChunkPlugin({
                    name: 'angular2',
                    minChunks: Infinity,
                    filename: 'angular2.js'
                })
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
                        //warnings: false,
                        //drop_debugger: false
                    }
                    //verbose: true,
                    //beautify: false,
                    //quote_style: 3
                }),
                new CompressionPlugin({
                    asset: '[file].gz',
                    algorithm: 'gzip',
                    regExp: /\.js$|\.html|\.css|.map$/,
                    threshold: 10240,
                    minRatio: 0.8
                })
            );
        }
        this
            .plugins
            .push
            .apply(this.plugins, plugins);
    }
};

config.pushPlugins();

console.log(config);

module.exports = config;

function root(partialPath) {
    return path.join(__dirname, partialPath);
}