const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'eval-source-map',
    devServer: {
        static: {
            directory: './dist',
        },
        historyApiFallback: true,
        compress: true,
        hot: true,
        open: true,
        port: 3000,
        client: {
            overlay: {
                errors: true,
                warnings: false,
            },
            progress: true,
        },
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
    },
    cache: {
        type: 'filesystem',
    },
    stats: 'minimal',
});
