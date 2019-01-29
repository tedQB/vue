/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

import { def } from '../util/index'

const arrayProto = Array.prototype
export const arrayMethods = Object.create(arrayProto)



const methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
]

/**
 * Intercept mutating methods and emit events
 * 变异方法，把原数组改变了就要变异方法
 * 这些方法有：push、pop、shift、unshift、splice、sort 以及 reverse 等。
 * 这个时候我们就要考虑一件事，即当用户调用这些变异方法改变数组时需要触发依赖。
 * 如果不解决会出现增加数组元素无法监听的问题。
 * 换句话说我们需要知道开发者何时调用了这些变异方法，
 * 只有这样我们才有可能在这些方法被调用时做出反应
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  const original = arrayProto[method]
  //def 函数是对 Object.defineProperty 函数的简单包装，为了调用方便
  /*
    export function def (obj: Object, key: string, val: any, enumerable?: boolean) {
      Object.defineProperty(obj, key, {
        value: val,
        enumerable: !!enumerable,
        writable: true,
        configurable: true
      })
    }
  */
 /*
    在observer/index.js里，首先导入，把变异方法重写了一遍，绑定了依赖收集
    但并没有执行.而在index.js new constructor里可以找到this.__ob__
 */
  def(arrayMethods, method, function mutator (...args) {
    const result = original.apply(this, args)
    const ob = this.__ob__
    let inserted
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args
        break
      case 'splice':
        inserted = args.slice(2)
        break
    }
    if (inserted) ob.observeArray(inserted)
    // notify change
    ob.dep.notify()
    return result
  })
})
