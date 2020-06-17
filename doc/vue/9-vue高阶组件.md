## 1-从reactHook谈起：
1. 高阶组件（HOC）时react生态系统的词汇，react中代码复用的方法是使用高阶组件，并且是官方推荐的用法，
2. vue中代码复用的主要方式是使用Mixins,并且在vue中很少提到高阶组件的概念。
3. 在vue中实现高阶组件并不像react那样简单。原因在在设计思想不一样。但是并不代表在vue中不能使用高阶组件，只是带来的收银相对于mixins并没有太多的收益。

## 2-vue中的高阶组件
> 1. 高阶组件应该是一个无副作用的纯函数，并且不能修改原组件。 
> 2. 高阶组件(HOC)不关心你传递的数据(props)是什么，并且被包装组件(WrappedComponent)不关心数据来源
> 3. 高阶组件(HOC)接收到的 props 应该透传给被包装组件(WrappedComponent)
```js
// 高阶组件
function WithConsole (WrappedComponent) {
  return class extends React.Component {
    componentDidMount () {
      console.log('with console: componentDidMount')
    }
    render () {
      // 透传props
      return <WrappedComponent {...this.props}/>
    }
  }
}
```
vue: 
```js
// base-component.vue
<template>
  <div>
    <span @click="handleClick">props: {{test}}</span>
  </div>
</template>

<script>
export default {
  name: 'BaseComponent',
  props: {
    test: Number
  },
  mixins: [consoleMixin],
  methods: {
    handleClick () {
      this.$emit('customize-click')
    }
  }
}
</script>
```

mixins
```js
export default function consoleMixin(wrapComponent) {
  return {
    render(h) {
      return h(wrapComponent,{
        on: $this.$listeners,
        bind: $attrs,
      })
    },
    mounted() {
      console.log('I have already mounted!');
    }
  }
}
```

### vue 的mixins合并
1. 数据: mixin的数据对象和组件的数据发生冲突时以组件数据优先。
```js
var mixin = {
  data: function () {
    return {
      message: 'hello',
      foo: 'abc'
    }
  }
}

new Vue({
  mixins: [mixin],
  data: function () {
    return {
      message: 'goodbye',
      bar: 'def'
    }
  },
  created: function () {
    console.log(this.$data)
    // => { message: "goodbye", foo: "abc", bar: "def" }
  }
})
```

2. 钩子函数 合并
3. methods, components,derectives，mixins内与组件内合并。
 