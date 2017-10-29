const path = require('path');

module.exports = {
    entry: {
        index: ['babel-polyfill','./resources/js/index.js'],
    },
    output: {
        path: path.resolve(__dirname + '/assets/js'),
        filename: '[name].js'
    },
    module: {
        loaders: [{
            test: path.join(__dirname),
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015', 'stage-0'],
                plugins: ['transform-runtime']
            }
        }]
    }
};
