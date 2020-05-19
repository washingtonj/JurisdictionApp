const webpack = require('webpack')

module.exports = {
    mode: 'production',
    entry: './src/main.js',
    output: {
        filename: 'bundle.js',
        path: __dirname + '/public'
    }
}