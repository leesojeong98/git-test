const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
    mode:'development',
    devServer: {
        port:8891,
        hot:true
    },

    // webpack config
    entry: {
        scss: './src/scss/style.scss',
        main: `./src/index.js`
    },
    output:{
        filename:'[name].[chunkhash].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    plugins:[
        new MiniCssExtractPlugin({filename:'[name].css'}),
        new HtmlWebpackPlugin({template:`./src/index.html`}),
    ],
    resolve: {
        modules: ['node_modules'],
        extensions: ['.js', '.json', '.jsx', '.css'],
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                loader:'babel-loader',
                options: {
                    presets: [
                        [
                            '@babel/preset-env', {
                                targets: {
                                    node:'current', // 노드일 경우만
                                    //browsers: ["last 3 versions", "ie >= 11"] // 각 브라우저로도 가능
                                }, 
                                modules: false, //<== 이거 에러나는데 왜 아는거지?? 
                                // useBuiltIns: 'usage' <== 이거 경고 나옴...
                            }
                        ],
                        // '@babel/preset-react', // 리액트를 사용한다면
                        // '@babel/preset-typescript' // 타입스크립트를 사용한다면
                    ],
                },
                include: [path.resolve(__dirname, './src/index.js')],
                exclude: ['/node_modules'],
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader, 
                {
                    loader:'css-loader',
                    options: {
                        sourceMap: true,
                    }
                },
                {
                    loader:'sass-loader',
                    options: {
                        sourceMap: true,
                    }
                }],
                exclude: ['/node_modules'],
            }
        ]
    },
    optimization: {
        runtimeChunk: 'single' // chunk 변경시 매번 새로고침하기 불편해서 적용
    }
}