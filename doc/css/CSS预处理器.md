## CSS预处理器
> CSS 预处理器是一种语言用来为 CSS 增加一些编程的的特性，无需考虑浏览器的兼容性问题，例如你可以在 CSS 中使用变量、简单的程序逻辑、函数等等在编程语言中的一些基本技巧，可以让CSS 更见简洁，适应性更强，代码更直观等诸多好处。

主要分类： Sass, Less, Stylus

### 1. 基本语法规范：
1. Sass 和 Less 都是用 CSS 标准语法。
2. Sass 最早时缩排语法，严格缩进，并不太友好。后面Scss就是标准的CSS语法。
  ```scss
  // sass
  .class1
    color: red;

  // scss
  .class1{
    color: red;
  }
  ```
3. stylus 语法比较丰富一点
```css
  // 一般：
  h1{
    color: red
  }
  
  // 或者
  h1
    color: red;
  
  // 或者
  h1
    color red
```
### 2.变量
 1. sass: sass 中的变量以 $ 开头
```scss
$maincolor : #092873;
$siteWidth : 1024px;
$borderStyle : dotted;
body {
  color: $maincolor;
  border: 1px $borderStyle $mainColor;
  max-width: $siteWidth;
}
```
2. less中的变量以 @ 开头, 用法和sass
```less
@maincolor : #092873;
@siteWidth : 1024px;
@borderStyle : dotted;
body {
  color: @maincolor;
  border: 1px @borderStyle @mainColor;
  max-width: @siteWidth;
}
```
3. stylus 中变量可以 用 $ 开头，也可以直接不用，但是不能以 @ 开头
```stylus
maincolor = #092873
siteWidth = 1024px
borderStyle = dotted
body 
  color maincolor
  border 1px borderStyle mainColor
  max-width siteWidth
```
### 3.嵌套
三者都可以支持嵌套写法，
```scss
//scss style // 间接得多了，不需要一直写重复的类名标签名
nav { 
    ul { 
       margin: 0; 
       padding: 0; 
    } 
    li { 
       display: inline-block; 
    } 
    a { 
       display: block; 
       padding: 6px 12px; 
       text-decoration: none; 
    } 
}
//css style // 
nav ul { 
    margin: 0; 
    padding: 0; 
    list-style: none; 
} 
nav li { 
    display: inline-block; 
} 
nav a { 
    display: block; 
    padding: 6px 12px; 
    text-decoration: none; 
}
```

### 4. 继承
1. sass可通过@extend来实现代码组合声明，使代码更加优越简洁。
```scss
.message {
  border: 1px solid #ccc;
  padding: 10px;
  color: #333;
}
.success {
  @extend .message;
  border-color: green;
}
.error {
  @extend .message;
  border-color: red;
}
.warning {
  @extend .message;
  border-color: yellow;
}

```
2. 但是在这方面 Less 表现的稍微弱一些，更像是混入写法：
```less
.message {
  border: 1px solid #ccc;
  padding: 10px;
  color: #333;
}
.success {
  .message;
  border-color: green;
  // 还可以这样：
  &: extend(.message);
}
.error {
  .message;
  border-color: red;
}
.warning {
  .message;
  border-color: yellow;
}
```
### 5. Mixin混入、

1. sass的混入主要用到@mixin segName($variable)定义代码片段+@ include segName(传入变量) 完成
```scss
@mixin error($borderWidth: 2px) {
  border: $borderWidth solid #F00;
  color: #F00;
}
.generic-error {
  padding: 20px;c
  margin: 4px;
  @ include error(); //这里调用默认 border: 2px solid #F00;
}
.login-error {
  left: 12px;
  position: absolute;
  top: 20px;
  @ include error(5px); //这里调用 border:5px solid #F00;
}
```

2. less的混入
less也支持带参数的混合以及有默认参数值的混合，如下面的例子所示：
直接和定义类一样定义，使用时 混入类名(), 注意和继承的区别，把混入看作函数需要 加上（）执行这样理解就好了。 
```less
.error(@borderWidth: 2px) {
  border: @borderWidth solid #F00;
  color: #F00;
}
.generic-error {
  padding: 20px;
  margin: 4px;
  .error(); //这里调用默认 border: 2px solid #F00;
}
.login-error {
  left: 12px;
  position: absolute;
  top: 20px;
  .error(5px); //这里调用 border:5px solid #F00;
}
```
3. stylus 的混入语法：
   
```stylus
// error 前面没有 .
error(borderWidth = 2px) {
  border: borderWidth solid #F00;
  color: #F00;
}
.generic-error {
  padding: 20px;
  margin: 4px;
  error();  //这里调用默认 border: 2px solid #F00;
}
.login-error {
  left: 12px;
  position: absolute;
  top: 20px;
  error(5px);  //这里调用默认 border: 2px solid #F00;
}
```