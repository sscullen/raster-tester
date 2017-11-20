

const path = require('path');

module.exports = {
    entry: './src/app.js',
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'bundle.js'
    },
    module: {
        rules: [{
            loader: 'babel-loader',
            test: /\.js$/,
            exclude: /node_modules/
        },
        {
            test: /\.s?css$/,
            use: [
                'style-loader',
                'css-loader',
                'sass-loader'
            ]
        }
    ]
    },
    devtool: 'cheap-module-eval-source-map', // useful for development
    devServer: {
        contentBase: path.resolve(__dirname, 'public')
    }
};

// loader
// scss, jsx, loader, es6 to es5,