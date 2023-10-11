const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const sortCSSmq = require('sort-css-media-queries');

const PAGES_DIR = `src`;


module.exports = {
    mode: 'production',
    entry: {
        app: ['./src/app.js'],
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        /* for background images*/
        assetModuleFilename: (pathData) => {
            const filepath = path
                .dirname(pathData.filename)
                .split("/")
                .slice(1)
                .join("/");
            return `${filepath}/[name][ext][query]`;
        },
    },
    watch: true,
    resolve: {
        alias: {
            jquery: "jquery/src/jquery"
        }
    },
    module: {
        rules: [
            {
                test: /\.scss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    require('autoprefixer'),
                                    require('css-mqpacker')({
                                        sort: sortCSSmq.desktopFirst,
                                    }),
                                ],
                            },
                        },
                    },
                    // Compiles Sass to CSS
                    "sass-loader",
                ],
            },
        ]
    },
    plugins: [
        new BrowserSyncPlugin({
            host: 'localhost',
            port: 9000,
            files: ['./dist/*.html'],
            notify: false,
            server: {baseDir: ['dist']}
        }),
        new HtmlWebpackPlugin({
            template: `${PAGES_DIR}/index.html`,
            filename: './index.html',
            inject: true,
            async: ['app'],
        }),
        new MiniCssExtractPlugin({
            filename: "css/style.css",
        }),
        /* for <img> */
        new CopyWebpackPlugin({
            patterns: [
                {from: 'src/img', to: 'img'},
                {from: 'robots.txt', to: '.'},
                // {from: 'src/assets', to: 'assets'},
            ],
        }),
    ],
};