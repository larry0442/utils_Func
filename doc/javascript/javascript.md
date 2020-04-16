## 基本
### 变量
1. 名命 _ $ [a-z-A-Z]开头/ 规则 ：小驼峰 / 避免保留字冲突
2. 变量类型： 可以设置成不同类型，number/string/boolean等等，动态类型：（弱类型，无需声明时规定类型）
3. 变量的数据类型与typeof操作符
   可以直接声明的类型例如：let num = 8
   - Number： number / bigInt / NaN
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
     - 1.创建一个空的简单JavaScript对象（即{}）；
     - 2.链接该对象（即设置该对象的构造函数）到另一个对象 ；
     - 3.将步骤1新创建的对象作为this的上下文 ；
     - 4.如果该函数没有返回对象，则返回this。
  7. delete: delete 操作符用于删除对象的某个属性.
## 变量声明、作用域、内存
### var, let, const
  1. var 声明语句声明一个变量，并可选地将其初始化为一个值。当赋值给未声明的变量, 则执行赋值后, 该变量会被隐式地创建为全局变量（它将成为全局对象的属性）。
  2. const 常量是块级作用域，很像使用 let 语句定义的变量。常量的值不能通过重新赋值来改变，并且不能重新声明。
  3. let 语句声明一个块级作用域的本地变量，并且可选的将其初始化为一个值。
### TDZ暂存死区 
  1. let和const声明的变量在直到它们的定义被执行时才初始化在变量初始化前访问该变量会导致 ReferenceError。该变量处在一个自块顶部到初始化处理的“暂存死区”中。
  2. const声明创建一个值的只读引用。但这并不意味着它所持有的值是不可变的，只是变量标识符不能重新分配。例如，在引用内容是对象的情况下，这意味着可以改变对象的内容（例如，[], object）。
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
    - v8中的内存回收 分代回收（大部分新生对象倾向于早死，不死的对象存活的更久/或者说存活越久的对象，越不可能是垃圾？）新生代区回收频繁。[这里讲的详细一点](https://www.jianshu.com/p/b8ed21e8a4fb)
## 引用类型
## 面向对象
## 函数表达式
## BOM
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