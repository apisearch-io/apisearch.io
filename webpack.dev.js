const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');

/**
 * Development configuration
 */
const browserConfig = merge(baseConfig, {
    devtool: 'source-map',
    target: 'web',
    mode: 'development',
    output: {
        path: path.resolve(__dirname, 'assets/js'),
        filename: 'app.js'
    }
});

module.exports = browserConfig;