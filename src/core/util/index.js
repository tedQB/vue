/* @flow */

export * from 'shared/util' //这种引用方法可以跨文件夹路径获取到util
export * from './lang'  //处理htmltag上存在的unicode字符
export * from './env' //浏览器检测，环境检测

export * from './options' 
/* debug
  这个方法先调用用户配置的 errorHandler 方法输出, 
  如果没有配置, 在开发测试环境调用warn输出, 在非浏览器环境用throw抛出错误
*/
export * from './debug' 

export * from './props'
export * from './error'
export * from './next-tick'
export { defineReactive } from '../observer/index'
