### 整体流程
关于 Vue 编译原理这块的整体逻辑主要分三个部分，也可以说是分三步，这三个部分是有前后关系的：
1. 将 模板字符串 转换成 elememt ASTs(解析器) 。
  截取字符串， 解析字符串。
  截取一段标签的开始 => push 入栈 => 解析到结束标签 => pop.  
   ```js
  {
    tag: "div"
    type: 1,
    staticRoot: false,
    static: false,
    plain: true,
    parent: undefined,
    attrsList: [],
    attrsMap: {},
    children: [...],
  }
   ```
2. 对 AST 进行静态节点标记， 主要用来做虚拟DOM的渲染优化（优化器）。
   第一步 用递归的方式将所有节点 标识是不是静态节点。type=1是元素节点（需要继续判断）， type=2是带变量的动态文本节点（非静态），type=3是不带变量的纯文本节点（静态）。
   第二步 标记所有静态根节点（子节点全部是静态节点的节点）
   ```js
   ```
3. 使用 element ASTs 生成 render 函数代码字符串。