// 从 Vue 的出生文件导入 Vue
import Vue from './instance/index'
import { initGlobalAPI } from './global-api/index'

import { isServerRendering } from 'core/util/env'
import { FunctionalRenderContext } from 'core/vdom/create-functional-component'

// 将 Vue 构造函数作为参数，传递给 initGlobalAPI 方法，该方法来自 ./global-api/index.js 文件
initGlobalAPI(Vue)
/*
  在Vue的全局方法上添加
  Vue.set Vue.delete Vue.nextTick
  Vue.use Vue.mixin Vue.extend Vue.cid Vue.component
  Vue.directive Vue.filter
  Vue.options = {
    components:{ keepAlive },
    directives:Object.create(null),
    filters:Object.create(null),
    _base:Vue
  }
  ....
*/


// 在 Vue.prototype 上添加 $isServer 属性，该属性代理了来自 core/util/env.js/
// 文件的 isServerRendering 方法
Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
})

// 在 Vue.prototype 上添加 $ssrContext 属性
Object.defineProperty(Vue.prototype, '$ssrContext', {
  get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
})

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
})

Vue.version = '__VERSION__'

export default Vue



