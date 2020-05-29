### virtualDOM
1. 概念： virtualDOM是对DOM的抽象，本质上是JavaScript对象，这个对象就是更加轻量级别的对DOM的描述。
2. 为什么需要VirtualDOM? 
  - 在前端性能优化中很重要的一个点是：**尽可能地减少DOM操作**， 不仅仅是DOM操作相对较慢，更是因为频繁变动DOM会造成浏览器回流或者重绘，这往往就是很影响性能的因素。所以我们尽量在patch过程一次性地将差异更新到DOM,尽可能保证DOM不会出现性能很差的情况。
  - 其次就是： 现代前端框架不之前的jqury一样，基本要求是无需手动操作DOM， ①手动操作DOM无法保证程序性能，会有可能写出很糟糕的性能很差的代码。②省略手动的DOM操作可以大大提高开发效率。
  - VirtualDOM最开始的目的是可以实现更好的跨平台，node.js就没有dom, 但是SSR的时候就可以借助VirtualDOM，因为VirtualDom本身就是JavaScript对象。

### 2-VirtutalDOM相关
1. Virtual是对真实DOM的抽象，真正的DOM会设计得非常的复杂。有一堆的属性字段。
2. Vue中使用VNode这一个class(类)去定义virtualDOM
3. VNode的核心定义主要是 标签名、数据、子节点、键值等，其它属性都是用来扩展 VNode 的灵活性以及实现一些特殊 feature 的。由于 VNode 只是用来映射到真实 DOM 的渲染，不需要包含操作 DOM 的方法，因此它是非常轻量和简单的。
   
### 3 使用VNode构建 

VNode => 单个VirtualDOM => VirtualDOM 树  创建 => VDom树的更新 => Vdom的Diff
1. 创建单个VNode，Vue.js 利用 createElement 方法创建 VNode
   ```ts
   export interface VNode{
     type: string | undefined;
     data: VnodeData | undefined;
     Children: Array<VNode | string> | undefined;
     elm: Node | undefined;
     text: string | undefined;
     key: key | undefined;
   }

    function createElememt(...Vnode): VNode | <Array VNode> {
      ...
      return __createElement(...Vnode)
    }
   ```
2. 根据VNode创建 VDom: 接受一定的参数,再根据这些参数返回一个对象,这个对象就是DOM的抽象.
   ```js
   function VNode(type, data, children,....) {
     // 创建 VirtualDOM 并且返回
     const element = {
       __type: VNODE_TYPE,
       type,
       data,
       children,
       ...
     }
     return element;
   }
   ```
3. VDom 树的创建
 由于 Virtual DOM 实际上是一个树状结构，每一个 VNode 可能会有若干个子节点，这些子节点应该也是 VNode 的类型。
 每个 VNode 有 children，children 每个元素也是一个 VNode，这样就形成了一个 VNode Tree，它很好的描述了我们的 DOM Tree。
 ```js
 function createElememt(...Vnode): VNode | <Array VNode> {
      ...
      // children的规范化
  +++ normalizeChildren(children);
      return __createElement(...Vnode)
    }
 ```

 4. 更新Vue.__update() 调用时机主要是 在**首次渲染**和**数据更新**是调用
     首次更新时： __update的作用是将VNode渲染成 真实的DOM,
     __update__ 方法的核心是调用vm.__patch__方法

    更新时的__patch__会将新旧VNode一起传入进行比较，经由下面要讲到的Diff算法得出差异，最后只会（只需要）将这些差异对应的DOM进行修改。
5. VirtualDom的diff算法：
>Diff算法： 整个Virtual DOM 中最难理解也最核心的部分,diff的目的就是比较新旧Virtual DOM Tree找出差异并更新.
可见diff是直接影响Virtual DOM 性能的关键部分.
**Diff算法是通过同层级的树节点进行比较 而非是 对树进行逐层搜索遍历的方式，座椅时间复杂度只有O(n), 是一种相当高效的算法**
patch函数：(打补丁)
```js
  // 如果两个节点都是一样的，那么就深入检查他们的子节点（值得比较）。如果两个节点不一样那就说明Vnode完全被改变了，就可以直接替换oldVnode，
  function patch(oldVnode, vnode) {
    if(sameVnode(oldVnode, vnode)){
      // 节点相同，值得使用patchVnode去比较子节点
      patchVnode(oldVnode, vnode);
    } else {
      // sameVnode返回false，说明Vnode完全变了，直接替换掉oldVnode就好了。
      const oEl = oldVnode.el;// 获取oldVnode对应真是元素节点
      let parentEle = api.parentNode(oEl);// 父元素
      createElement(vnode); // 生成vnode的真实元素
      if(parentEle !== null) {
        // 插入新元素节点， 移除旧元素节点
        api.insertBefore();
        api.removeChild();
        oldVnode = null;
      }
    }
    return vnode;
  }
```

```js
// 两个节点比较
function pacthVnode(oldVnode, vNode) {
  // 第一种情况, 相同直接return
  if(oldVnode === vnode) return;
  
  // 新旧节点都是静态，并且key相同，将elm从旧节点拿过来
  if(isTrue(vnode.isStatic) && isTrue(oldVnode.isStatic)&&(vnode.key === oldVnode.key)){
    vnode.componentInstance = oldVnode.componentInstance;
    return;
  } else {
    // 比较更新 并且需要更新VnodeTree
    if(oldCh && ch && (oldCh !== ch)){
      // 两者都有子节点， 比较子节点
      updateChildren()
    } else if(ch){
      // oldVnode没有子节点，而vnode有子节点，则添加
      createElement(vnode);
    } else if(oldCh) {
      // oldVnode有子节点，而vnode没有有子节点，则删除
      removeVnodes(oldVnode); 
    }
  }




}
```
