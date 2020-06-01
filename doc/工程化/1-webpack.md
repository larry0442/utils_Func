>本质上，webpack 是一个现代 JavaScript 应用程序的静态模块打包器(module bundler)。当 webpack 处理应用程序时，它会递归地构建一个依赖关系图(dependency graph)，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个 bundle。
### webpack
1. 工作流：
  - 参数解析
  - 找到文件入口
  - 调用loader编译文件(重要)
  - 遍历AST,收集依赖
  - 生成chunk
  - 输出文件
2. loader 
   loader的作用是处理任意类型的文件，并且将它们转换成一个可以让webpack 可以处理的有效模块。  
   test: 匹配文件拓展名。  
   use: 先使用这个loader处理，再打包。
   ```js
   // webpack.config.js
   module.exports = {
     module: {
       rules: [
         {
           test: /\.js$/, use: 'babel-loader',
         },
         {
           test: /\.css/,
           use: [
             // 
              {
                loader: 'style-loader',
              }，
              {
                loader: 'css-loader',
              }，
              {
                loader: 'postcss-loader',
              }
           ]
         }
       ]
     }
   }
   ```