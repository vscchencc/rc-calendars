const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  mode: 'production',
  entry: './src',
  output: {
    filename: 'calendar.js',
    path: path.resolve(__dirname, './dist'),
    library: {
      root: "calendar",
      amd: "calendar",
      commonjs: "calendar"
    },
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
              loader: 'style-loader'
          },{
              loader: 'css-loader'
          },{
              loader: 'postcss-loader',
              options: {
                  sourceMap: true,
                  config: {
                      path: 'postcss.config.js'
                  }
              }
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: [
            {
                loader: 'style-loader', 
            },
            {
                loader: 'css-loader', 
            },
            {
                loader: 'postcss-loader',
                options: {
                    sourceMap: true,
                    config: {
                        path: 'postcss.config.js'
                    }
                }
            },
            {
                loader: 'sass-loader', 
                options: { sourceMap: true }
            }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.m?js$/,
        include: path.resolve(__dirname, 'src'), // 只解析src下面的文件,不推荐用exclude
        use: {
          loader: 'babel-loader',
        }
      }
    ]
  },
  externals: [nodeExternals()]
};