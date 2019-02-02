const path = require('path');

module.exports = {
    entry: './src/app/index.js',
    output: {
        path: path.join(__dirname, 'src/public/js'),
        filename: 'bundle.js'
    },
    devServer: {
        port: 3000,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            }
        ]
    }
}