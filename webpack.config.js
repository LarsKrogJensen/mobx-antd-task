var webpack = require('webpack');
var path = require('path');

// variables
var isProduction = process.argv.indexOf('-p') >= 0;
var sourcePath = path.join(__dirname, './src');
var outPath = path.join(__dirname, './dist');

// plugins
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    context: sourcePath,
    entry: {
        main: [
            'react-hot-loader/patch',
            './index.ts'
        ],
        vendor: [
            'react-hot-loader/patch',
            'react',
            'react-dom',
            'react-router',
            'mobx',
            'mobx-react',
            'mobx-react-router',
            'antd'
        ]
    },

    output: {
        path: outPath,
        filename: 'bundle.js',
        publicPath: '/'
    },
    devtool: '#source-map',
    target: 'web',
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
        // Fix webpack's default behavior to not load packages with jsnext:main module
        // (jsnext:main directs not usually distributable es6 format, but es6 sources)
        mainFields: ['module', 'browser', 'main']
    },
    module: {
        rules: [
            // .ts, .tsx
            {
                test: /\.tsx?$/,
                enforce: 'pre',
                loader: 'tslint-loader',
                options: {/* Loader options go here */}
            },
            {
                test: /\.tsx?$/,
                use: isProduction
                    ? 'awesome-typescript-loader?module=es6'
                    : [
                        'react-hot-loader/webpack',
                        'awesome-typescript-loader'
                    ]
            },
            // graphql
            {
                test: /\.(graphql|gql)$/,
                exclude: /node_modules/,
                loader: 'graphql-tag/loader'
            },
            // // css
            // {
            //     test: /\.css$/,
            //     use: ExtractTextPlugin.extract({
            //         fallback: 'style-loader',
            //         use: [
            //             {
            //                 loader: 'css-loader',
            //                 query: {
            //                     // modules: true,
            //                     sourceMap: !isProduction,
            //                     importLoaders: 1,
            //                     localIdentName: '[local]__[hash:base64:5]'
            //                 }
            //             },
            //             {
            //                 loader: 'postcss-loader'
            //             }
            //         ]
            //     })
            // },
            // less
            {
                test: /\.less$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "less-loader" // compiles Less to CSS
                }]
            },
            // css
            {
                test: /\.css$/,
                use: ["style-loader",
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1
                        }
                    },
                    "postcss-loader"]
            },
            // static assets
            {test: /\.html$/, use: 'html-loader'},
            {test: /\.png$/, use: 'url-loader?limit=10000'},
            {test: /\.jpg$/, use: 'file-loader'},
            {test: /\.svg$/, use: 'url-loader'}
        ]
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            options: {
                context: sourcePath,
                postcss: [
                    require('postcss-import')({addDependencyTo: webpack}),
                    require('postcss-url')(),
                    require('postcss-cssnext')(),
                    require('postcss-reporter')(),
                    require('postcss-browser-reporter')({disabled: isProduction})
                ],
                tslint: {
                    emitErrors: true,
                    failOnHint: true
                }
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'vendor.bundle.js',
            minChunks: Infinity
        }),
        new webpack.optimize.AggressiveMergingPlugin(),
        new ExtractTextPlugin({
            filename: 'styles.css',
            disable: !isProduction
        }),
        new HtmlWebpackPlugin({
            template: 'assets/index.html'
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()

    ],
    devServer: {
        contentBase: sourcePath,
        hot: true,
        inline: true,
        port: 3000,
        historyApiFallback: true,
        stats: {
            warnings: false
        }
    },
    node: {
        // workaround for webpack-dev-server issue
        // https://github.com/webpack/webpack-dev-server/issues/60#issuecomment-103411179
        fs: 'empty',
        net: 'empty'
    }
};