const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = merge(common, {
    mode: 'production',
    devtool: 'source-map',
    performance: {
        hints: 'warning',
        maxEntrypointSize: 512000,
        maxAssetSize: 512000,
    },
    optimization: {
        minimize: true,
        usedExports: true,
        sideEffects: true,
    },
    plugins: [
        new ImageMinimizerPlugin({
            minimizer: {
                implementation: ImageMinimizerPlugin.imageminMinify,
                options: {
                    plugins: [
                        ['imagemin-gifsicle', { interlaced: true }],
                        ['imagemin-mozjpeg', { quality: 80, progressive: true }],
                        ['imagemin-optipng', { optimizationLevel: 5 }],
                        ['imagemin-svgo', {
                            plugins: [
                                {
                                    name: 'preset-default',
                                    params: {
                                        overrides: {
                                            removeViewBox: false,
                                            addAttributesToSVGElement: {
                                                params: {
                                                    attributes: [
                                                        { xmlns: 'http://www.w3.org/2000/svg' },
                                                    ],
                                                },
                                            },
                                        },
                                    },
                                },
                            ],
                        }],
                    ],
                },
            },
        }),
        ...(process.env.ANALYZE
            ? [
                  new BundleAnalyzerPlugin({
                      analyzerMode: 'static',
                      openAnalyzer: true,
                  }),
              ]
            : []),
    ],
});
