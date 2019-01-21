/* @flow */


/** 用来解析html tag上的unicode字符
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
export const unicodeLetters = 'a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD'

/**
 * Check if a string starts with $ or _
 * charcodeAt是一个字符的 unicode编码, 但是像 0x24 (代表的是 $ )  0x5f (代表的是 _ ) 因为是字符, 先存着ascii编码中, 所以用ascii转换
    
   $ _ 作为保留字, 这里判断输入的字符是否是vue可能使用的关键字, 比如 $set _bind 等等
 */
export function isReserved (str: string): boolean {
  const c = (str + '').charCodeAt(0)
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 * 这里简单的定义一个对象, 定义它的值 是否能在for...in循环中遍历出来或在Object.keys中列举出来。
 */
export function def (obj: Object, key: string, val: any, enumerable?: boolean) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  })
}

/**
 * Parse simple path.
 * 解析简单的路径, 比如 o.corp.$1, 是合法的, 不在正则 bailRE中
   而 o.corp.names[0]是不合法的, 会被直接return, 因为对象才能被defineProperty, 数组是不能监听的.
　　使用
　　var path = parsePath('o.corp.$1');
　　var obj = { o:{ corp: { $1: 'haha' } } }
   path( obj )  ==> 'haha'
 * 
 */
const bailRE = new RegExp(`[^${unicodeLetters}.$_\\d]`)
export function parsePath (path: string): any {
  if (bailRE.test(path)) {
    return
  }
  const segments = path.split('.')
  return function (obj) {
    for (let i = 0; i < segments.length; i++) {
      if (!obj) return
      obj = obj[segments[i]]
    }
    return obj
  }
}
