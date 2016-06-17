/**
 * Created by sihuan on 16/6/15.
 */

"use strict";

/*
 Store
 在前面的章节中，我们学会了使用 action 来描述“发生了什么”，和使用 reducers 来根据 action 更新 state 的用法。

 Store 就是把它们联系到一起的对象。Store 有以下职责：

 1. 维持应用的 state；
 2. 提供 getState() 方法获取 state；
 3. 提供 dispatch(action) 方法更新 state；
 4. 通过 subscribe(listener) 注册监听器;
 5. 通过 subscribe(listener) 返回的函数注销监听器。

 强调一下 Redux 应用只有一个单一的 store。当需要拆分数据处理逻辑时，你应该使用 reducer 组合 而不是创建多个 store。

 根据已有的 reducer 来创建 store 是非常容易的。
 在前一个章节中，我们使用 combineReducers() 将多个 reducer 合并成为一个。
 现在我们将其导入，并传递 createStore()。
 * */

import React, { Component } from 'react-native';
import { app } from './modules'
import { Provider } from 'react-redux'
import { createStore } from 'redux';
//import * as actions from './actions'


/*
 createStore() 的第二个参数是可选的, 用于设置 state 初始状态。
 这对开发同构应用时非常有用，服务器端 redux 应用的 state 结构可以与客户端保持一致,
 那么客户端可以将从网络接收到的服务端 state 直接用于本地数据初始化。

 let store = createStore(todoApp, window.STATE_FROM_SERVER)
 */
let store = createStore(app.reducer);

/*
 首先，我们需要获取从之前安装好的 react-redux 提供的 Provider，
 并且在渲染之前将根组件包装进 <Provider>。

 这使得我们的 store 能为下面的组件所用。（在内部，这个是通过 React 的 "context" 特性实现。）
 * */

const Main = () => {
    return (
        <Provider store={store}>
            <app.App />
        </Provider>
    )
};

export default Main


///*
// 发起 Actions
//
// 现在我们已经创建好了 store ，让我们来验证一下！虽然还没有界面，我们已经可以测试数据处理逻辑了
// * */
//import { addTodo, completeTodo, setVisibilityFilter, VisibilityFilters } from '../actions/actions'
//
//// 打印初始状态
//console.log(store.getState());
//
//// 每次 state 更新时，打印日志
//// 注意 subscribe() 返回一个函数用来注销监听器
//let unsubscribe = store.subscribe(() => console.log(store.getState()));
//
//// 发起一系列 action
//store.dispatch(addTodo('Learn about actions'))
//store.dispatch(addTodo('Learn about reducers'))
//store.dispatch(addTodo('Learn about store'))
//store.dispatch(completeTodo(0));
//store.dispatch(completeTodo(1));
//store.dispatch(setVisibilityFilter(VisibilityFilters.SHOW_COMPLETED));
//
//// 停止监听 state 更新
//unsubscribe();

/*可以看到，在还没有开发界面的时候，我们就可以定义程序的行为。
 而且这时候已经可以写 reducer 和 action 创建函数的测试。不需要模拟任何东西，因为它们都是纯函数。
 只需调用一下，对返回值做断言，写测试就是这么简单。*/



/*
 数据流

 严格的单向数据流是 Redux 架构的设计核心。

 这意味着应用中所有的数据都遵循相同的生命周期，这样可以让应用变得更加可预测且容易理解。
 同时也鼓励做数据范式化，这样可以避免使用多个且独立的无法相互引用的重复数据。

 如果这些理由还不足以令你信服，读一下 动机 和 Flux 案例，这里面有更加详细的单向数据流优势分析。
 虽然 Redux 就不是严格意义上的 Flux，但它们有共同的设计思想。
 * */


/*
 Redux 应用中数据的生命周期遵循下面 4 个步骤：

 1. 调用 store.dispatch(action)。

 Action 就是一个描述“发生了什么”的普通对象。比如：

 { type: 'LIKE_ARTICLE', articleId: 42 };
 { type: 'FETCH_USER_SUCCESS', response: { id: 3, name: 'Mary' } };
 { type: 'ADD_TODO', text: 'Read the Redux docs.'};
 可以把 action 理解成新闻的摘要。如 “玛丽喜欢42号文章。” 或者 “任务列表里添加了'学习 Redux 文档'”。

 你可以在任何地方调用 store.dispatch(action)，包括组件中、XHR 回调中、甚至定时器中。

 2. Redux store 调用传入的 reducer 函数。

 Store 会把两个参数传入 reducer： 当前的 state 树和 action。
 例如，在这个 todo 应用中，根 reducer 可能接收这样的数据：

 // 当前应用的 state（todos 列表和选中的过滤器）
 let previousState = {
 visibleTodoFilter: 'SHOW_ALL',
 todos: [
 {
 text: 'Read the docs.',
 complete: false
 }
 ]
 }

 // 将要执行的 action（添加一个 todo）
 let action = {
 type: 'ADD_TODO',
 text: 'Understand the flow.'
 }

 // render 返回处理后的应用状态
 let nextState = todoApp(previousState, action);

 注意 reducer 是纯函数。它仅仅用于计算下一个 state。它应该是完全可预测的：多次传入相同的输入必须产生相同的输出。
 它不应做有副作用的操作，如 API 调用或路由跳转。这些应该在 dispatch action 前发生。

 3. 根 reducer 应该把多个子 reducer 输出合并成一个单一的 state 树。

 根 reducer 的结构完全由你决定。Redux 原生提供combineReducers()辅助函数，
 来把根 reducer 拆分成多个函数，用于分别处理 state 树的一个分支。

 下面演示 combineReducers() 如何使用。假如你有两个 reducer：一个是 todo 列表，另一个是当前选择的过滤器设置：

 function todos(state = [], action) {
 // 省略处理逻辑...
 return nextState;
 }

 function visibleTodoFilter(state = 'SHOW_ALL', action) {
 // 省略处理逻辑...
 return nextState;
 }

 let todoApp = combineReducers({
 todos,
 visibleTodoFilter
 })
 当你触发 action 后，combineReducers 返回的 todoApp 会负责调用两个 reducer：

 let nextTodos = todos(state.todos, action);
 let nextVisibleTodoFilter = visibleTodoFilter(state.visibleTodoFilter, action);

 然后会把两个结果集合并成一个 state 树：

 return {
 todos: nextTodos,
 visibleTodoFilter: nextVisibleTodoFilter
 };
 虽然 combineReducers() 是一个很方便的辅助工具，你也可以选择不用；你可以自行实现自己的根 reducer！

 4. Redux store 保存了根 reducer 返回的完整 state 树。

 这个新的树就是应用的下一个 state！所有订阅 store.subscribe(listener) 的监听器都将被调用；
 监听器里可以调用 store.getState() 获得当前 state。

 现在，可以应用新的 state 来更新 UI。
 如果你使用了 React Redux 这类的绑定库，这时就应该调用 component.setState(newState) 来更新。
 * */