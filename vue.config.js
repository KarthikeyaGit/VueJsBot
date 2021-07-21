const path = require('path')
module.exports = {

  configureWebpack: {
    optimization: {
      splitChunks: false
    },
    output: {
      path: path.resolve(__dirname, "./dist"),
      filename: 'js/build.js',
      publicPath: '/',
    }, 
  },
 
  css: {
    extract: false,
  },

  transpileDependencies: [
    'vuetify'
  ]
}
