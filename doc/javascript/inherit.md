## javascript 继承  

  - [1. 原型链继承](#1-%e5%8e%9f%e5%9e%8b%e9%93%be%e7%bb%a7%e6%89%bf)
  - [2. 构造函数继承](#2-%e6%9e%84%e9%80%a0%e5%87%bd%e6%95%b0%e7%bb%a7%e6%89%bf)
  - [3. 组合继承 （原型链继承+构造函数继承）](#3-%e7%bb%84%e5%90%88%e7%bb%a7%e6%89%bf-%e5%8e%9f%e5%9e%8b%e9%93%be%e7%bb%a7%e6%89%bf%e6%9e%84%e9%80%a0%e5%87%bd%e6%95%b0%e7%bb%a7%e6%89%bf)

### 1. 原型链继承
```js
function Parent() {};

function Child(){};

child.prototype = new Parent();
```
- 优点  
  1. 继承父类模板，继承父类的原型对象

- 缺点  
  1. 无法实现多继承因为原型对象已经指定了
  2. 来自原型对象的属性是被共享的，一个实例中修改，所有实例的都会变
  3. child('child1') 这样的传参不起作用 /只有 new Parent('parent1') 这样的才能起作用

### 2. 构造函数继承

在子类构造函数内部使用call或apply来调用父类构造函数
```js

function Parent (name) {
  this.name = name
}
function Child () {
  this.sex = 'boy';
  // 调用父类的构造函数
  // 直接执行了Parent里的代码。使用父类的构造函数来增强子类实例，等于是复制父类的实例属性给子类。
  Parent.call(this, 'child'); // 治理等同于执行父类代码，this.name = 'child'
  this.name = 'ccc'; // 这里会覆盖上一句。
}
var child1 = new Child();
console.log(child1);
```

- 优点  
    1. 解决子类实例共享父类引用对象的问题
    2. 创建实例时可以传参
    3. 实现多继承
- 缺点  
    1. 构造继承只能继承父类的实例属性和方法，不能继承父类原型的属性和方法(相当于执行父类函数代码，并没有复制原型对象)
    2. 实例并不是父类的实例，只是子类的实例
    3. 无法实现函数复用，每个子类都有父类实例函数的副本，影响性能

### 3. 组合继承 （原型链继承+构造函数继承）
解决原型链继承和构造函数继承的缺点：
- 使用原型链继承来保证子类能继承到父类原型中的属性和方法
- 使用构造继承来保证子类能继承到父类的实例属性和方法

步骤： 
  1. 通过call/apply在子类构造函数内部调用父类构造函数
  2. 将子类构造函数的原型对象指向父类构造函数创建的一个匿名实例
  3. 修正子类构造函数原型对象的constructor属性，将它指向子类构造函数
   
```js

function Parent() {};
// 原型的方法和属性
Parent。prototype.getSomething() = function() {
  // ...
}

function Child() {
  // 实例方法和属性
  function getName() {
    // ...
  }
};

// 原型链继承 继承原型的方法和属性
Child.prototype = new Parent()

// 构造函数继承
function Child () {
  Parent.call(this, ...arguments)
}
```

- 优点：  
  1. 可以继承父类实例属性和方法，也能够继承父类原型属性和方法
  2. 弥补了原型链继承中引用属性共享的问题
  3. 可传参，可复用
- 缺点  
  1. 父类构造函数调用两次new Parent() 和 Parent.call()
  2. 生成两个实例，子类实例中的属性和方法会覆盖子类原型(父类实例)上的属性和方法，

### 4. 原型式（方法），ES5 的Object.create()方法规范了这个原型式继承
步骤： 
1. 声明过渡对象
2. 过度对象的原型 继承父对象
3. 返回过渡对象的原型

```js
  function inhertObject(parentObj) {
    function F() {};       // 1.声明一个过渡对象
    F.prototype = parentObj;  // 2. 过渡对象原型继承父对象
    return new F();        // 3. 返回过渡对象
  }
```
ES5 的Object.create()方法：
```js
  var person = {
    name: 'Nick',
    friend: ['Alice'],
  }

  var anotherPerson = Object.create(person);
  anotherPerson.name = 'Ann';
  anotherPerson.friend.push('Zow');
  // 会影响到person的friend,因为是引用属性

  // 另外一个参数（初始参数，覆盖同名属性）
  var anotherPerson = Object.create(person, {
    name: {
      value: 'Ann', // 这里会直接覆盖name为： ‘Ann’
    }
  })
```
### 5. 寄生式
可以算是对于原型式继承的拓展，封装
1. 使用原型式创建新对象
2. 拓展新对象
3. 返回
```js
  function createObject(obj) {
    // 创建
    var o = new inhertObject(obj);
    // 拓展
    o.getName = function(name) {
      // ...
    }
    // 返回
    return o;
  }
```

### 6.寄生组合式继承
使用 **原型式** + **寄生式**
解决前面**组合继承**需要调用两次构造函数的弊端
1. 通过借用函数来继承属性
2. 通过原型链的混成形式来继承方法
  
```js
  // 寄生式：
  function inhertObject(parentObj) {
    function F() {};       // 1.声明一个过渡对象
    F.prototype = parentObj;  // 2. 过渡对象原型继承父对象
    return new F();        // 3. 返回过渡对象
  }

  function inhertPrototype(subClass, superClass) {
    // 创建超类型原型的一个副本
    var prototype = inhertObject(superClass);
    // 为创建的副本添加constructor属性，弥补重写原型失去的默认的constructor属性
    prototype.constructor = subClass;
    // 将新创建的对象副本赋值给子类型的原型
    subClass.prototype = prototype;
  }
```

### 7. ES6的class（语法糖）
```js
class Person {
  // 方法是类的默认方法，通过new命令生成对象实例时，自动调用该方法。一个类必须有constructor方法，如果没有显式定义，一个空的constructor方法会被默认添加。
  constructor(name) {
    this.name = name;
  }

}

// 类使用 extends 继承
// 子类必须在constructor方法中调用super方法，否则新建实例时会报错。
// 这是因为子类没有自己的this对象，而是继承父类的this对象，然后对其进行加工。如果不调用super方法，子类就得不到this对象。
class child extends Person {
  constructor(...args) {
    super(...args);
  }
}

```