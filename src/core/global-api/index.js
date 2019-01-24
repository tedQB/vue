/* @flow */

import config from '../config'
import { initUse } from './use'
import { initMixin } from './mixin'
import { initExtend } from './extend'
import { initAssetRegisters } from './assets'
import { set, del } from '../observer/index'
import { ASSET_TYPES } from 'shared/constants'
import builtInComponents from '../components/index'
import { observe } from 'core/observer/index'

import {
  warn,
  extend,
  nextTick,
  mergeOptions,
  defineReactive
} from '../util/index'

export function initGlobalAPI (Vue: GlobalAPI) {
  // config
  const configDef = {}
  configDef.get = () => config
  if (process.env.NODE_ENV !== 'production') {
    configDef.set = () => {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      )
    }
  }
  Object.defineProperty(Vue, 'config', configDef)

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  /*要避免依赖他们，但是你依然可以使用，
    只不过风险你要自己控制。并且，在官方文档上也并没有介绍这个全局API，
    所以能不用尽量不要用。*/
  Vue.util = {
    warn,
    extend,
    mergeOptions,
    defineReactive
  }

  Vue.set = set
  Vue.delete = del
  Vue.nextTick = nextTick

  // 2.6 explicit observable API
  Vue.observable = <T>(obj: T): T => {
    observe(obj)
    return obj
  }

  Vue.options = Object.create(null)
  ASSET_TYPES.forEach(type => {
    Vue.options[type + 's'] = Object.create(null)
    /*
      'components',
      'directives',
      'filters'
      三个参数可以注入在option.components里
    */
  })
  
    // this is used to identify the "base" constructor to extend all plain-object
    // components with in Weex's multi-instance scenarios.
    Vue.options._base = Vue
  
    extend(Vue.options.components, builtInComponents)
    //注入keepalive 
    /*now
      Vue.options = {
          components: {
          KeepAlive
        },
    directives: Object.create(null),
    filters: Object.create(null),
    _base: Vue
  }
*/
  
initUse(Vue)
  /*
    Vue.use 用来安装Vue插件。
  */

initMixin(Vue)
  /*
    Vue.mixin全局混入
    一旦使用全局混入对象，将会影响到 所有 
    之后创建的 Vue 实例。使用恰当时，可以为自定义对象注入处理逻辑。
     Vue.mixin({
        created: function () {
          var myOption = this.$options.myOption
          if (myOption) {
            console.log(myOption)
          }
        }
    })
    new Vue({
        myOption: 'hello!'
    })
    // => "hello!"
  */
  
  initExtend(Vue)
  /*
    Vue.extend 用来安装Vue插件。

    eg1:
    var CompA = { ... }

    // 在没有调用 `Vue.extend` 时候继承 CompA
    var CompB = {
      extends: CompA,
    ...
  }

  eg2:
    <div id="mount-point"></div>
    var Profile = Vue.extend({
      template: '<p>{{firstName}} {{lastName}} aka {{alias}}</p>',
      data: function () {
        return {
          firstName: 'Walter',
          lastName: 'White',
          alias: 'Heisenberg'
        }
      }
    })
    // 创建 Profile 实例，并挂载到一个元素上。
    new Profile().$mount('#mount-point')

  */

  initAssetRegisters(Vue)
  /*
    Vue上注册三个方法
    Vue.component
    Vue.directive
    Vue.filter 

  */
}
