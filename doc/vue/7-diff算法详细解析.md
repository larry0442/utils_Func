# Diff 算法
1. 节点变化的时候，vue是怎么更新节点？
  渲染真实DOM的开销很大，修改了一部分数据，贞洁渲染到真实 DOM 中会引起 DOM树 重排和重绘。
  diff算法帮助我们只更新我们修改了的一小部分而不需要更新整个dom。
2.  vnode => virtualDOM tree, 某个节点改变，将vnode和oldVnode做对比，然后根据算法替换
3.  diff的过程就是patch函数，比较新旧节点，一边给给真实DOM打补丁。
4.  virtualDOM和真实DOM的区别。
5. diff的过程：
![diff流程](https://user-gold-cdn.xitu.io/2018/5/19/163777930be304eb?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)
