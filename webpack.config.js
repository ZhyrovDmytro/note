const path = require('path');
const BUILD_DIR = path.resolve(__dirname, './dist');
const APP_DIR = path.resolve(__dirname, './client');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: "development",
    entry: APP_DIR + '/src/index.tsx',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, BUILD_DIR),
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test   : /\.js|.jsx|.tsx|.ts$/,
                exclude: /node-modules/,
                loader : "babel-loader",
            }
        ]
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js', '.ts' ],
    },
    devServer: {
        historyApiFallback: true,
        proxy: {
            '/api': {
                target: 'http://localhost:5001',
                changeOrigin: true
            }
        }
    },
    plugins: [
        new HtmlWebpackPlugin({template: './public/index.html', filename: "./index.html",})
    ]
};
