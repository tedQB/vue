import { initMixin } from './init'
import { stateMixin } from './state'
import { renderMixin } from './render'
import { eventsMixin } from './events'
import { lifecycleMixin } from './lifecycle'
import { warn } from '../util/index'

function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  this._init(options)
}

initMixin(Vue) 
/*init.js initMixin
  给Vue类proto上添加 _init方法
  >若new了一个Vue实例，则在init里附加 /
  /添加生命周期参数 initLifecycle(vm)=>$parent $root $children $ref
  >initEvents(vm)=>添加实例方法/事件 updateComponentListeners(vm, listeners)
  >initRender(vm)=> 初始化渲染 $slots $scopedSlots $createElement
  >callHook(vm, 'beforeCreate') vm实例生命周期生命为before /
    /vm.$emit('hook:' + hook)
  >initInjections 实现子组件的依赖注入功能 /
  /详见https://cn.vuejs.org/v2/api/#provide-inject
  initState(vm) 初始化Vue实例的 props,/
  /绑定methods,初始化opts.data，初始化opts.computed /
  /初始化opts.watch
  >initProvide(vm)提供父组件依赖注入功能
  >callHook(vm, 'created') vm实例生命周期生命为create
  >vm.$mount(vm.$options.el)
*/
stateMixin(Vue)
/*
  Vue类的proto上添加 
  $data,$prop,$set,$delete,$delete,$watch方法
*/
eventsMixin(Vue)
/*
  Vue类的proto上添加
  $on,$once,$off,$emit 内有例子解释
*/

lifecycleMixin(Vue)
/*向Vue类proto上添加_update，
$forceUpdate Vue 实例重新渲染。注意它仅仅影响实例本身和插入插槽内容的/
/子组件，而不是所有子组件。
$destroy 触发 beforeDestroy 和 destroyed 的钩子。
触发钩子
callHook(vm, 'beforeDestroy')
....
callHook(vm, 'destroyed')
*/
renderMixin(Vue)
/*
>在Vue类原型上添加一些installRenderHelpers参数
>添加$nextTick方法
>_render
*/


export default Vue
