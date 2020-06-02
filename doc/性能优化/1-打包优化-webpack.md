## 缓存， 多核， 抽离，拆分
之所以构建时长会集中消耗在代码的编译或压缩过程中，正是因为它们需要去遍历树以替换字符或者说转换语法，因此都需要经历"转化 AST -> 遍历树 -> 转化回代码"这样一个过程，你说，它的时长能不长嘛。
### 缓存
我们每次的项目变更，肯定不会把所有文件都重写一遍，但是每次执行构建却会把所有的文件都重复编译一遍，这样的重复工作是否可以被缓存，解决构建流程造成效率瓶颈的代码压缩阶段
```js
// cache-loader 
module.exports = {
  module: {
    rules: [
      {
        test: /\.ext$/,
        use: ['cache-loader', ...loaders],
        include: path.resolve('src'),
      },
    ],
  },
};
```

```js
//vue.config.js 使用 hard-source-webpack-plugin
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
module.exports = {
  ...
  plugins:[
    new HardSourceWebpackPlugin(),
  ]
}
```
### 多核
happypack 就已经成为了众多 webpack 工程项目接入多核编译的不二选择，几乎所有的人，在提到 webpack 效率优化时，怎么样也会说出 happypack 这个词语。
```js
//配置起来逻辑其实很简单，就是用 happypack 提供的 Plugin 为你的 Loaders 做一层包装就好了，向外暴露一个id ，而在你的 module.rules 里，就不需要写loader了，直接引用这个 id 即可。
const HappyPack = require('happypack')
const os = require('os')
// 开辟一个线程池
// 拿到系统CPU的最大核数，happypack 将编译工作灌满所有线程
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })

module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'happypack/loader?id=js',
      },
    ],
  },
  plugins: [
    new HappyPack({
      id: 'js',
      threadPool: happyThreadPool,
      loaders: [
        {
          loader: 'babel-loader',
        },
      ],
    }),
  ],
}
```

### 抽离
>对于一些不常变更的静态依赖，比如我们项目中常见的 React 全家桶，亦或是用到的一些工具库，比如 lodash 等等，我们不希望这些依赖被集成进每一次构建逻辑中，因为它们真的太少时候会被变更了，所以每次的构建的输入输出都应该是相同的。因此，我们会设法将这些静态依赖从每一次的构建逻辑中抽离出去，以提升我们每次构建的构建效率。常见的方案有两种，一种是使用 webpack-dll-plugin 的方式，在首次构建时候就将这些静态依赖单独打包，后续只需要引用这个早就被打好的静态依赖包即可，有点类似“预编译”的概念；另一种，也是业内常见的 Externals的方式，我们将这些不需要打包的静态资源从构建逻辑中剔除出去，而使用 CDN 的方式，去引用它们。
```js
module.export = {
  externals: enableCdn ? {
      vue: 'Vue',
      'vue-router': 'VueRouter',
      vuex: 'Vuex',
      moment: 'moment',
    } : {},
}
```

### 4 拆分： 
什么是集群编译呢？这里的集群当然不是指我们的真实物理机，而是我们的 docker。其原理就是将单个 entry 剥离出来维护一个独立的构建流程，并在一个容器内执行，待构建完成后，将生成文件打进指定目录。为什么能这么做呢？因为我们知道，webpack 会将一个 entry 视为一个 chunk，并在最后生成文件时，将 chunk 单独生成一个文件，
因为如今团队在实践前端微服务，因此每一个子模块都被拆分成了一个单独的repo，因此我们的项目与生俱来就继承了集群编译的基因，但是如果把这些子项目以 entry 的形式打在一个 repo 中，也是一个很常见的情况，这时候，就需要进行拆分，集群编译便能发挥它的优势。
