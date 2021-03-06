# javascript
## 基本
### 变量
1. 名命 _ $ [a-z-A-Z]开头/ 规则 ：小驼峰 / 避免保留字冲突
2. 变量类型： 可以设置成不同类型，number/string/boolean等等，动态类型：（弱类型，无需声明时规定类型）
3. 变量的数据类型与 typeof 操作符
   可以直接声明的类型例如：let num = 8
   - Number： number / bigInt / NaN / +-Infinity
   - Boolean: true/false
   - String: '',
   - Array
   - Object : object, null, undefined, RegExp...等等
   - typeof 操作符： 返回一个字符串，表示未经计算的操作数的类型。[详细看这里](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/typeof), 可以用封装的 checkInnerObj() 检查，在 ../check/checkInnerObj.js 内。
### 运算符
  1. 算数运算符 +， -， *，**（右往左结合） /， %， ++， --，
  2. 按位操作 按位与&， 按位或 |, 按位异或 ^, 按位非 ~(按位取反，符号位之外取反+1，简记~x = -(x+1))， 左移 a << b, 右移a >> b, a>>>b(有符号右移)， 
     - ~~x 向下取整
  3. 比较运算符 ==, ===, !=, !==, >, >=, <, <=
  4. 条件运算符（三元）condition ? a : b
  5. 解构赋值 ...(解构数组是必须在最后[a, b, c, ...rest])
  6. new：  new 运算符创建一个用户定义的对象类型的实例或具有构造函数的内置对象的实例。new 关键字会进行如下的操作：
     - 1.创建一个空的简单 JavaScript 对象（即{}）；
     - 2.链接该对象（即设置该对象的构造函数）到另一个对象 ；
     - 3.将步骤1新创建的对象作为 this 的上下文 ；
     - 4.如果该函数没有返回对象，则返回 this。
  7. delete: delete 操作符用于删除对象的某个属性.
## 变量声明、作用域、内存
### var, let, const
  1. var 声明语句声明一个变量，并可选地将其初始化为一个值。当赋值给未声明的变量, 则执行赋值后, 该变量会被隐式地创建为全局变量（它将成为全局对象的属性）。
  2. const 常量是块级作用域，很像使用 let 语句定义的变量。常量的值不能通过重新赋值来改变，并且不能重新声明。
  3. let 语句声明一个块级作用域的本地变量，并且可选的将其初始化为一个值。
### TDZ暂存死区 
  1. let 和 const 声明的变量在直到它们的定义被执行时才初始化在变量初始化前访问该变量会导致 ReferenceError。该变量处在一个自块顶部到初始化处理的“暂存死区”中。
  2. const 声明创建一个值的只读引用。但这并不意味着它所持有的值是不可变的，只是变量标识符不能重新分配。例如，在引用内容是对象的情况下，这意味着可以改变对象的内容（例如，[], object）。
### 作用域
  1. 全局作用域， 局部作用域（函数，块级）
  2. 函数内和语句块内{}可以读取全局变量（作用域链），let, const 可以创建局部变量，属于局部作用域
### 如何让外部读取局部变量
  一般情况下是做不到外部读取块级作用域的变量，但是**闭包**可以。
  1. 闭包定义
  2. 使用闭包的优点+使用场景
  3. 使用闭包的缺点
### 内存
  1. 分配： 值的初始化，通过函数调用， 自动完成内存分配
  2. 使用： 使用定义的值和对象时就是 对分配的内存进行读写
  3. 回收： 在内存不再需要使用时进行回收
    - 标记清除  当变量进入环境时标记为'进入环境'，同样变量离开环境时标记为'离开环境'，过滤标记为'进入环境'的变量，剩下就是需要回收的变量
    - 引用计数 赋值一次引用+1， 计数为0时回收（存在循环引用的问题）
    - v8 中的内存回收 分代回收（大部分新生对象倾向于早死，不死的对象存活的更久/或者说存活越久的对象，越不可能是垃圾？）新生代区回收频繁。[这里讲的详细一点](https://www.jianshu.com/p/b8ed21e8a4fb)
## 引用类型
### javaScript 数据类型分为基本数据类型7种和引用类型Object
  1. 区分堆内存 和 栈内存(基本类型变量存储的地方)
  2. 引用类型 在栈中保存的实际是 对象在堆内存中的一个指针
  3. 深拷贝（怎么实现：递归、JSON.parse/stringify）和浅拷贝 浅拷贝是因为拷贝的是引用，指向的都是同一个堆内存地址
  4. 对象的属性配置 configurable/enumerable/writable/value set() 和get()
## 面向对象
  1. 继承 [看这里](https://juejin.im/post/5e75e22951882549027687f9)
  2. 原型，原型链，还有构造函数的概念以及相互之间的关系
  3. 创建对象的方法： 字面量/工厂模式/构造函数/原型链。。（后面还有的不熟悉，回头看红皮书）
## 函数、函数声明和函数表达式
### 函数
1. 默认参数和剩余参数和 arguments 的含义
2. 定义函数的方法： 构造函数 & 函数声明 & 函数表达式 
3. 调用： 函数调用 | 方法调用 | 构造函数调用 | 上下文调用（call, apply）
   
### 函数声明 
1. 一个被函数声明创建的函数是一个 Function 对象，具有 Function 对象的所有属性、方法和行为。
2. JavaScript 中的**函数声明**被提升到了**函数定义**。你可以在函数声明之前使用该函数。
   
### 函数表达式
1. function 关键字可以用来在一个表达式中定义一个函数。也可以在 ES6 后使用箭头函数
2. 函数表达式没有函数提升
   
### 箭头函数 
1. 箭头函数语法 /  返回值规则
2. 箭头函数的this指向，与定义时的上下文环境有关，与调用无关
## BOM
### location
1. window.location 返回浏览器当前位置的信息
### navigator
1. 浏览器信息
### history
1. 历史记录，因为隐私问题，读写有限制，常用back(),forward()等操作前进后退
## DOM
## 事件
1. dom0 dom2 区别
2. HTML 事件处理程序属性(行内) - 不建议使用
3. on+['type']  type: click | change | mouseover | mouseout  | keydown | load
4. addEventListener(type, function, useCapture) | removeEventListener(type, function, useCapture) 
   - useCapture 可以是简单的 true/false,也可以是 { passive: true/false }  or {capture: true/false}
   - 注意 ： 移除和添加事件监听的 useCapture 要保持一致，否则会失效
5. e|ev|event 事件对象，自动传递给事件处理函数，以提供额外的功能和信息 常用： e.target.value, e.target.checked
6. 阻止默认行为和冒泡
   - 阻止默认行为 e.preventDefault()
   - 阻止冒泡和捕获 e.stopPropagation() | cancelBubble()(ie兼容)
7. 事件委托（因为有冒泡）： 场景： 在大量子元素中单击任何一个都可以运行一段代码，您可以将事件监听器设置在其父节点上，并让子节点上发生的事件冒泡到父节点上，而不是每个子节点单独设置事件监听器。
```js
  document.getElementById("parentNode").addEventListener("click", function(e) {
	// e.target is the clicked element!
	// If it was a list item
	if(e.target && e.target.nodeName == "childNode") {
	// do somethings
	}
});
```