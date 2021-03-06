"use strict";

import * as types from './constants';

/*
 Action 是把数据从应用（译者注：这里之所以不叫 view 是因为这些数据有可能是服务器响应，用户输入或其它非 view 的数据 ）
 传到 store 的有效载荷。

 它是 store 数据的唯一来源。一般来说你会通过 store.dispatch() 将 action 传到 store。


 Action 本质上是 JavaScript 普通对象。我们约定，action 内必须使用一个字符串类型的 type 字段来表示将要执行的动作。
 多数情况下，type 会被定义成字符串常量。当应用规模越来越大时，建议使用单独的模块或文件来存放 action。
 * */


/*
 * action 创建函数
 *
 Action 创建函数 就是生成 action 的方法。“action” 和 “action 创建函数” 这两个概念很容易混在一起，使用时最好注意区分。
 */

export function addTodo(text) {
    return {
        type: types.ADD_TODO, text
    };
}

export function completeTodo(index) {
    return {
        type: types.COMPLETE_TODO, index
    };
}

export function setVisibilityFilter(filter) {
    return {type: types.SET_VISIBILITY_FILTER, filter}
}

/*
 下一步

 现在让我们 开发一些 reducers 来说明在发起 action 后 state 应该如何更新。
* */
