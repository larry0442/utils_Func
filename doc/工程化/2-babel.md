###  babel
1. 什么是babel
> 简单来说，Babel就是能够转译ES2015+ 的代码，是的它能够在旧的浏览器或者环境中运行。
2.  babel的作用： 我们传递一段代码给babel， 然后他返回一段新的代码给我们，他不会运行我们的代码，也不会打包我们的代码。
3.  babel怎么工作？
- 抽象语法树AST 
- Babel的本质就是操作AST,完成代码的转译。
①： Parse 解析  将源码转换成更加抽象的表示方法（例如抽象语法树）
②： Transform 转换, 将抽象语法树做一些特殊的处理，让它更符合编译器的期望。
③： Generate 生成，将第二步经过转换的抽象语法树，生成新代码。

### babel7 
1. @babel/core 
2. @babel/cli
3. 插件
4. preset
5. polyfill
6. @babel/plugin-transform-runtime

### Babel解决：
1. 箭头函数
2. let / const
3. 结构
### polifill
1. Promise
2. Symbol
3. WeakMap
4. Set
5. Array.includes
6. generate



