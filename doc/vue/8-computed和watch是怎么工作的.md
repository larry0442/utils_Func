## 1-computed计算属性
1. 计算属性的初始化发生在 VUE实例初始化阶段的initState, 本质是一个computed watcher ,计算属依赖得值发生变化，并且计算属性的最终计算得值发生变化才会触发渲染watcher重新渲染。
2. 计算属性是基于它们的依赖进行缓存的。只在相关依赖发生改变时它们才会重新求值。值得注意的是“reversedMessage”不能在组件的props和data中定义，否则会报错。
3. 简单地依赖缓存处理同步的数据；

## 2-侦听属性
1. watch是一个侦听的动作，用来观察和响应 Vue 实例上的数据变动。
2. watch允许我们执行一个异步操作，限制执行该操作。

## 3-两者的异同：

1. 相同： computed和watch都起到监听/依赖一个数据，并进行处理的作用
2. 差异：它们其实都是vue对监听器的实现，只不过computed主要用于对同步数据的处理，watch则主要用于观测某个值的变化去完成一段开销较大的复杂业务逻辑。能用computed的时候优先用computed，避免了多个数据影响其中某个数据时多次调用watch的尴尬情况。

watch: 
1. inmediate属性：
  vue初始化时，watch是不会执行的，如果想在第一次绑定的时候就执行可以使用 inmediate: true;
2. deep 深度监听
   受现代 JavaScript 的限制 (以及废弃 Object.observe)，Vue 不能检测到对象属性的添加或删除。由于 Vue 会在初始化实例时对属性执行 getter/setter 转化过程，所以属性必须在 data 对象上存在才能让 Vue 转换它，才能让它是响应式的。
   默认情况下 在handler方法中 只监听obj这个属性它的引用的变化，我们只有给obj赋值的时候它才会监听到, 对更深一层得进行重新赋值，监听不到。
   想要监听应用类型的深层，可以使用 deep: true;
3. 同一个组件被复用或者选择某些属性后重置data: 
  Object.assign(this.\$data, this.\$options.data());
