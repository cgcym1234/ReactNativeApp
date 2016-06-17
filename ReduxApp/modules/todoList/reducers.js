'use strict';

import { VisibilityFilters } from './constants'
import * as types from './constants';

/*
 * Reducer
 *
 Action 只是描述了有事情发生了这一事实，并没有指明应用如何更新 state。而这正是 reducer 要做的事情。

 设计 State 结构

 在 Redux 应用中，所有的 state 都被保存在一个单一对象中。建议在写代码前先想一下这个对象的结构。
 如何才能以最简的形式把应用的 state 用对象描述出来？

 以 todo 应用为例，需要保存两种不同的数据：

 1. 当前选中的任务过滤条件；
 2. 完整的任务列表。

 如下:
 * */

//const initialState = {
//    visibilityFilter: VisibilityFilters.SHOW_ALL,
//    todos: [
//        {text: 'Con', completed: true},
//        {text: 'Keep', completed: false},
//    ]
//};

/*
 * 通常，这个 state 树还需要存放其它一些数据，以及一些 UI 相关的 state。
 这样做没问题，但尽量把这些数据与 UI 相关的 state 分开。

 处理 Reducer 关系时的注意事项

 开发复杂的应用时，不可避免会有一些数据相互引用。建议你尽可能地把 state 范式化，不存在嵌套。
 把所有数据放到一个对象里，每个数据以 ID 为主键，不同实体或列表间通过 ID 相互引用数据。
 把应用的 state 想像成数据库。这种方法在 normalizr 文档里有详细阐述。
 例如，实际开发中，在 state 里同时存放 todosById: { id -> todo } 和 todos: array<id> 是比较好的方式，
 本文中为了保持示例简单没有这样处理。
 * */


/**
 Action 处理

 现在我们已经确定了 state 对象的结构，就可以开始开发 reducer。
 reducer 就是一个纯函数，接收旧的 state 和 action，返回新的 state。

 (previousState, action) => newState
 之所以称作 reducer 是因为它将被传递给 Array.prototype.reduce(reducer, ?initialValue) 方法。
 保持 reducer 纯净非常重要。

 永远不要在 reducer 里做这些操作：

 1. 修改传入参数；
 2. 执行有副作用的操作，如 API 请求和路由跳转；
 3. 调用非纯函数，如 Date.now() 或 Math.random()。
 */


/*拆分 Reducer*/

/*
 在这个案例中我们可以把 todos 更新的业务逻辑拆分到一个单独的函数里：

 注意 todos 依旧接收 state，但它变成了一个数组！
 现在 todoApp 只把需要更新的一部分 state 传给 todos 函数，todos 函数自己确定如何更新这部分数据。
 这就是所谓的 reducer 合成，它是开发 Redux 应用最基础的模式。
 * */
function todos(state = [], action) {
    switch (action.type) {
        case types.ADD_TODO:
            return [
                ...state,
                {
                    text: action.text,
                    completed: false
                }
            ];
        case types.COMPLETE_TODO:
            return state.map((todo, index) => {
                if (action.index === index) {
                    return {...todo, completed: !todo.completed};
                }
                return todo;
            });

        default:
            return state;
    }
}


/*能否抽出一个 reducer 来专门管理 visibilityFilter？当然可以：*/
function visibilityFilter(state = VisibilityFilters.SHOW_ALL, action) {
    console.log(action);
    switch (action.type) {
        case types.SET_VISIBILITY_FILTER:
            return action.filter;
        default:
            //在 default 情况下返回旧的 state。遇到未知的 action 时，一定要返回旧的 state。
            return state;
    }
}

/*现在我们可以开发一个函数来做为主 reducer，它调用多个子 reducer 分别处理 state 中的一部分数据，
然后再把这些数据合成一个大的单一对象。
主 reducer 并不需要设置初始化时完整的 state。
初始时，如果传入 undefined, 子 reducer 将负责返回它们的默认值。
*/
function todoAppCustomer(state = {}, action) {
    /*注意每个 reducer 只负责管理全局 state 中它负责的一部分。
    每个 reducer 的 state 参数都不同，分别对应它管理的那部分 state 数据。*/
    return {
        visibilityFilter: visibilityFilter(state.visibilityFilter, action),
        todos: todos(state.todos, action)
    }
}


/*最后，Redux 提供了 combineReducers() 工具类来做上面 todoAppCustomer 做的事情，
这样就能消灭一些样板代码了。有了它，可以这样重构 todoApp：*/
import { combineReducers } from 'redux';

const todoApp = combineReducers({
    visibilityFilter,
    todos
});

//这里export todoApp和todoAppCustomer都行
export default todoApp;

/*下一步

 接下来会学习 创建 Redux store。store 能维持应用的 state，并在当你发起 action 的时候调用 reducer。
 */

//注意上面的写法和下面完全等价：

//export default function todoApp(state = {}, action) {
//    return {
//        visibilityFilter: visibilityFilter(state.visibilityFilter, action),
//        todos: todos(state.todos, action)
//    }
//}

//你也可以给它们设置不同的 key，或者调用不同的函数。下面两种合成 reducer 方法完全等价：
//
//const reducer = combineReducers({
//    a: doSomethingWithA,
//    b: processB,
//    c: c
//})

/*下面是一些中间过程*/

function todoAppBad(state, action) {
    //Redux 首次执行时，state 为 undefined，此时我们可借机设置并返回应用的初始 state。
    if (typeof state === 'undefined') {
        return initialState;
    }
    return state
}

//使用 ES6 参数默认值语法 来精简代码。
/*ES7有一个提案，将Rest解构赋值/扩展运算符（...）引入对象。
 Babel转码器已经支持这项功能。

 扩展运算符（...）用于取出参数对象的所有可遍历属性，拷贝到当前对象之中。

 比如
 let z = { a: 3, b: 4 };
 let n = { ...z };
 n // { a: 3, b: 4 }

 如果用户自定义的属性，放在扩展运算符后面，则扩展运算符内部的同名属性会被覆盖掉。

 这用来修改现有对象部分的部分属性就很方便了。
 let newVersion = {
 ...previousVersion,
 name: 'New Name' // Override the name property
 };
 newVersion对象自定义了name属性，其他属性全部复制自previousVersion对象。
 */
function todoApp2(state = initialState, action) {
    switch (action.type) {
        case types.SET_VISIBILITY_FILTER:
            return {
                ...state,
                visibilityFilter: action.filter
            };
        case types.ADD_TODO:
            //处理多个 action, 还有两个 action 需要处理。让我们先处理 ADD_TODO。
            //使用 Object.assign() 新建了一个副本。和上面使用es7语法效果一样
            return Object.assign({}, state, {
                todos: [
                    ...state.todos,
                    {
                        text: action.text,
                        completed: false
                    }
                ]
            });
        case types.COMPLETE_TODO:
            return {
                ...state,
                todos: state.todos.map((todo, index) => {
                    if (action.index === index) {
                        return {...todo, completed: !todo.completed};
                    }
                    return todo;
                })
            };
        default:
            //在 default 情况下返回旧的 state。遇到未知的 action 时，一定要返回旧的 state。
            return state;

    }

    /*
     我们需要修改数组中指定的数据项而又不希望导致突变, 因此我们的做法是在创建一个新的数组后,
     将那些无需修改的项原封不动移入, 接着对需修改的项用新生成的对象替换。

     (译者注:Javascript中的对象存储时均是由值和指向值的引用两个部分构成。
     此处突变指直接修改引用所指向的值, 而引用本身保持不变。)
     如果经常需要这类的操作，可以选择使用帮助类 React-addons-update，updeep，
     或者使用原生支持深度更新的库 Immutable。

     最后，时刻谨记永远不要在克隆 state 前修改它。*/
    return state;
}

//半合成
function todoApp3(state = initialState, action) {
    switch (action.type) {
        case types.SET_VISIBILITY_FILTER:
            return {
                ...state,
                visibilityFilter: action.filter
            };
        case types.ADD_TODO:
        case types.COMPLETE_TODO:
            return {
                ...state,
                //todoApp3 只把需要更新的一部分 state 传给 todos 函数，todos 函数自己确定如何更新这部分数据。
                todos: todos(state.todos, action)
            };
        default:
            return state;
    }
}

