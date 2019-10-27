module.exports = {
    publicPath:  process.env.NODE_ENV === "production" ? "/be/" : "./" ,
    // assetsDir: process.env.NODE_ENV === "production" ? "/be/" : "./" 
    devServer:{
      proxy: {
        '/': {
          // 目标 API 地址
          target: 'http://120.55.234.38/',
          host: '0.0.0.0',
          port: 8080,
          // 如果要代理 websockets
          ws: false,
          // 将主机标头的原点更改为目标URL
          changeOrigin: true
        }
      },
      // 关闭eslint
      // overlay: {
      //   warnings: false,
      //   errors: false
      // },
      // lintOnSave: false

    // }
    // configureWebpack: {
    //   plugins: [
    //     new VuetifyLoaderPlugin()
    //   ]
    // }
  }
}
