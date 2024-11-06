const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const devMode = process.env.NODE_ENV !== "production"

module.exports = {
    entry: './src/index.tsx',
    // entry: {
    //     index: {import: "./src/index.ts"}
    // },
    devtool: 'source-map', // Optional: for better debugging
    mode: devMode ? "development" : 'production',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        // path: __dirname + '/dist',
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.css'],
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: "babel-loader",
            },
            {
                test: /\.(ts|tsx)?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/, // For CSS files
                include: path.resolve(__dirname, 'src'),
                use: [
                    devMode ? "style-loader" : MiniCssExtractPlugin.loader,
                    // 'style-loader', // Injects styles into the DOM
                    'css-loader', // Translates CSS into CommonJS
                    'postcss-loader'
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
        }),
        new MiniCssExtractPlugin()
        // concat(devMode ? [] : [new MiniCssExtractPlugin()]),
    ],
    devServer: {
        static: {directory: path.join(__dirname, 'build')},
        port: 3069, // Change this to your desired port
        compress: true,
        open: true,
        hot: true,
        historyApiFallback: true,
    },
};