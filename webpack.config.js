// eslint-disable-next-line no-undef
const HtmlWebPackPlugin = require("html-webpack-plugin");
// eslint-disable-next-line no-undef
module.exports = {
  output: {
    publicPath: "/"
  },
  devServer: {
    port: 9000
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            options: {
              importLoaders: 1
            }
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            options: {
              importLoaders: 1
            }
          },
          {
            loader: "less-loader"
          }
        ]
      },
      /* {
        test: /\.svg$/,
        loader: "svg-inline-loader"
      }, */
      {
        test: /\.(png|jpg|gif|ico)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[path][name].[ext]"
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./public/index.html",
      favicon: "./public/favicon.ico",
      filename: "./index.html"
    })
  ]
};
