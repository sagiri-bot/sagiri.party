const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

const sourcePath = path.join(__dirname, './src');
const outPath = path.join(__dirname, './build');
const dev = process.env.NODE_ENV !== 'production';
const hash = '[hash]';
const chunkHash = 'assets/[contenthash]';

let cssUse = [
    dev ? 'style-loader' : MiniCssExtractPlugin.loader,
    {
        loader: 'postcss-loader',
        options: {
            sourceMap: dev
        }
    }
];

let config = {
    context: sourcePath,
    entry: {
        index: ['./App.jsx']
    },
    output: {
        filename: `${hash}.js`,
        chunkFilename: `${chunkHash}.js`,
        path: outPath,
        publicPath: '/'
    },
    target: 'web',
    resolve: {
        extensions: ['.js', '.jsx', '.json'],
        mainFields: ['module', 'browser', 'main']
    },
    mode: dev ? 'development' : 'production',
    module: {
        rules:  [
            {
                test: /\.jsx?$/,
                loaders: ['babel-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [...cssUse, 'css-loader']
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [...cssUse, 'sass-loader']
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff2?|eot|ttf|otf|wav)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: `${hash}.[ext]`
                    }
                }]
            }
        ]
    },
    devServer: {
        quiet: true,
        historyApiFallback: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: 'index.html',
            inject: 'body'
        })
    ]
};

if (!dev) {
    config.plugins.push(new CleanWebpackPlugin([path.resolve(__dirname, 'dist')]));
    config.plugins.push(new webpack.optimize.OccurrenceOrderPlugin());
} else {
    config.plugins.push(new FriendlyErrorsWebpackPlugin());
}

module.exports = config;