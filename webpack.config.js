const webpack = require('webpack');
const path = require('path');

// variables
const isProduction = process.argv.indexOf('-p') >= 0 || process.env.NODE_ENV === 'production';
const sourcePath = path.join(__dirname, './src');
const publicPath = path.join(__dirname, './public');
const outPath = path.join(__dirname, './build');

// plugins
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    context: sourcePath,
    entry: './index.js',
    output: {
        path: outPath,
        filename: '[name].bundle.js',
        chunkFilename: '[chunkhash].js'
    },
    target: 'web',
    resolve: {
        extensions: ['.js', '.jsx'],
        // Fix webpack's default behavior to not load packages with jsnext:main module
        // (jsnext:main directs not usually distributable es6 format, but es6 sources)
        mainFields: ['module', 'browser', 'main'],
        alias: {
            app: path.resolve(__dirname, 'src/app/')
        }
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loaders: ['babel-loader'],
                exclude: /node_modules/
            },
            // scss
            {
                test: /\.scss$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader"
                ]
            },
            // css
            {
                test: /\.css$/,
                use: [
                    isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
                    {
                        loader: 'typings-for-css-modules-loader',
                        query: {
                            camelCase: true,
                            modules: true,
                            namedExport: true,
                            sourceMap: !isProduction,
                            importLoaders: 1,
                            localIdentName: isProduction ? '[hash:base64:5]' : '[local]__[hash:base64:5]'
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: [
                                require('postcss-import')({addDependencyTo: webpack}),
                                require('postcss-url')(),
                                require('postcss-preset-env')({
                                    /* use stage 2 features (defaults) */
                                    stage: 2,
                                }),
                                require('postcss-reporter')(),
                                require('postcss-browser-reporter')({
                                    disabled: isProduction
                                })
                            ]
                        }
                    }
                ]
            },
            // static assets
            {test: /\.html$/, use: 'html-loader'},
            {test: /\.(a?png|svg)$/, use: 'url-loader?limit=10000'},
            {test: /\.(jpe?g|gif|bmp|mp3|mp4|ogg|wav|eot|ttf|woff|woff2)$/, use: 'file-loader'}
        ]
    },
    optimization: {
        splitChunks: {
            name: true,
            cacheGroups: {
                commons: {
                    chunks: 'initial',
                    minChunks: 2
                },
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    chunks: 'all',
                    priority: -10
                }
            }
        },
        runtimeChunk: true
    },
    plugins: [
        new webpack.EnvironmentPlugin({
            NODE_ENV: 'development', // use 'development' unless process.env.NODE_ENV is defined
            DEBUG: false
        }),
        new WebpackCleanupPlugin(),
        new MiniCssExtractPlugin({
            filename: '[contenthash].css',
            disable: !isProduction
        }),
        new HtmlWebpackPlugin({
            template: '../public/index.html',
            filename: 'index.html',
            inject: 'body'
        })
    ],
    devServer: {
        contentBase: publicPath,
        hot: true,
        inline: true,
        historyApiFallback: {
            disableDotRule: true
        },
        stats: 'minimal',
        clientLogLevel: 'warning'
    },
    // https://webpack.js.org/configuration/devtool/
    devtool: isProduction ? 'hidden-source-map' : 'cheap-module-eval-source-map',
    node: {
        // workaround for webpack-dev-server issue
        // https://github.com/webpack/webpack-dev-server/issues/60#issuecomment-103411179
        fs: 'empty',
        net: 'empty'
    }
};
