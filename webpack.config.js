
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path')


module.exports = {
  mode: 'development',
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, 'dist'), //OS별로 파일 시스템이 조금씩 다르기 때문에 
    // 다른 시스템, os에서도 빌드할때 문제 없도록 노드가 제공해주는 path를 이용할 수 있다.
    filename: 'bundle.js'
  },
  devServer: {
    compress: true,
    port: 9999
  },
  module: {
    rules: [
      {
        test: /\.js$/, //매칭되는 애들만 바벨로더한테 넣어줘
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"]
          }
        }
      }
    ]

  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'react를 만들어 보자',
      template: 'index.html' // 어떤 html을 쓸건지 지정.
    })
  ]
}