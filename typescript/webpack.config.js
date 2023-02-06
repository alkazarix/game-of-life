const { resolve, join } = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: './src/main.ts',
    output: {
        filename: 'main.js',
        path: resolve( __dirname, 'dist' ),
        libraryTarget: 'commonjs2'
    },
    module: {
        rules: [{
            test: /\.tsx?/,
            exclude: /node_module/,
            use:  {
                loader : 'ts-loader',
                options: {
                    transpileOnly: true,
                }
            }
        }],
    },
    resolve: {
        extensions: [ '.ts' , '.js']
    },
    mode : 'development',
    plugins: [
      new CopyWebpackPlugin({
        patterns: ['index.html'] 
      })
    ],
    devServer: {
        static: {
            directory: join(__dirname, 'dist'),
            publicPath: '/'
        },
    }
}