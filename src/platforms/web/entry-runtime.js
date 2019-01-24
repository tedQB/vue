/* @flow */

import Vue from './runtime/index'

export default Vue

/*Vue 项目中的 entry-runtime.js 文件是 Vue 用于构建 仅包含运行时 的源码文件，/
而 entry-runtime-with-compiler.js 是用于构建 同时包含编译器和运行时 的全功能文件。
因此两个文件的差集必然就是编译器实现。 

https://www.cnblogs.com/iovec/p/vue_02.html
*/
