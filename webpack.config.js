const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    mode: 'production',
    entry: './src/main.js',
    output: {
        filename: 'bundle.js',
        path: __dirname + '/public'
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "styles.css"
        })
    ],
    module: {
        rules: [{
            test: /\.css$/i,
            use: [
                MiniCssExtractPlugin.loader, 
                'css-loader'
            ]
        }]
    }
}