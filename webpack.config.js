// import
const path = require('path')
const HtmlPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')


// export
// node js 환경에서는 module.export = {}로 내보네야함
module.exports = {
  // 경로에서 확장자 파일명이 없어도 인식 되도록 해줌
  resolve: {
    extensions: ['.js', '.vue'],
    // 경로 별칭
    alias: {
      '~': path.resolve(__dirname, 'src'),
      'assets': path.resolve(__dirname, 'src/assets')
    }
  },

  // parcel index.html
  // 파일을 읽어들이기 시작하는 진입점 설정
  entry : './src/main.js',
  
  // 결과물(번들)을 반환하는 설정
  output : {
    // 절대경로를 명시해주어야 함!
    // path : path.resolve(__dirname, 'dist'),
    // filename: 'main.js',
    clean : true
  },

  module: {
    rules: [
      {
        test: /\.vue$/,
        // loader가 하나만 있으면 굳이 배열로 사용하지 않아도 됨
        use: 'vue-loader'
      },
      {
        test: /\.s?css$/,
        // use는 밑부분부터 실행됨
        use: [
          // 순서 중요!!!
          'vue-style-loader',
          // 'style-loader',
          'css-loader',
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              additionalData: `@import "~/scss/main.scss";`
            }
          }
        ]
      },
      {
        test: /\.js$/,
        use: [
          'babel-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|gif|webp)$/,
        use: 'file-loader'
      },
    ]
  },

  // 번들링 후 결과물의 처리 방식 등 다양한 플러그인들을 설정
  plugins: [
    // 생성자 함수
    new HtmlPlugin({
      template: './index.html'
    }),
    new CopyPlugin({
      // static 폴더를 복사해 dist 폴더 안에 붙여넣어주는 plugin
      patterns: [
        { from: 'static' }
      ]
    }),
    new VueLoaderPlugin(

    )
  ],

  devServer: {
    host: 'localhost'
  }
}