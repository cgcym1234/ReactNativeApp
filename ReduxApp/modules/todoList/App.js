
"use strict";

import React, { Component, PropTypes, View } from 'react-native';
import { connect } from 'react-redux';
import { addTodo, completeTodo, setVisibilityFilter } from './actions';
import { AddTodo, TodoList, Footer } from '../../components';
import { VisibilityFilters } from './constants'

/*
 连接到 Redux

 我们需要做出两个变化，将 App 组件连接到 Redux 并且让它能够 dispatch actions 以及
 从 Redux store 读取到 state。

* */
class App extends Component {
    render() {
        const { dispatch, visibleTodos, visibilityFilter } = this.props;
        console.log(this.props);
        return (
            <View>
                <AddTodo onAddClick={ (text) => dispatch(addTodo(text)) }/>
                <TodoList
                    todos={visibleTodos}
                    onTodoClick={ index =>
                        dispatch(completeTodo(index))
                    }/>
                <Footer
                    filter={visibilityFilter}
                    onFilterChange={filter =>
                        dispatch(setVisibilityFilter(filter))
                    }/>
            </View>
        );
    }
}

App.propTypes = {
    visibleTodos: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired
    })),
    visibilityFilter: PropTypes.oneOf([
        'SHOW_ALL',
        'SHOW_COMPLETED',
        'SHOW_ACTIVE'
    ]).isRequired
};

function selectTodos(todos, filter) {
    switch (filter) {
        case VisibilityFilters.SHOW_ALL:
            return todos;
        case VisibilityFilters.SHOW_COMPLETED:
            return todos.filter(todo => todo.completed);
        case VisibilityFilters.SHOW_ACTIVE:
            return todos.filter(todo => !todo.completed);
    }
}

// 基于全局 state ，哪些是我们想注入的 props ?
// 注意：使用 https://github.com/reactjs/reselect 效果更佳。
function select(state) {
    return {
        visibleTodos: selectTodos(state.todos, state.visibilityFilter),
        visibilityFilter: state.visibilityFilter
    }
}

// 包装 component ，注入 dispatch 和 state 到其默认的 connect(select)(App) 中；
export default connect(select)(App);
/*
 connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])

 连接 React 组件与 Redux store。

 连接操作不会改变原来的组件类，反而返回一个新的已与 Redux store 连接的组件类。
* */





/*
 接着，我们想要通过 react-redux 提供的 connect() 方法将包装好的组件连接到Redux。

 尽量只做一个顶层的组件，或者 route 处理。
 从技术上来说你可以将应用中的任何一个组件 connect() 到 Redux store 中，但尽量避免这么做，因为这个数据流很难追踪。

 任何一个从 connect() 包装好的组件都可以得到一个 dispatch 方法作为组件的 props，以及得到全局 state 中所需的任何内容。

 connect() 的唯一参数是 selector。此方法可以从 Redux store 接收到全局的 state，然后返回组件中需要的 props。
 最简单的情况下，可以返回一个初始的 state （例如，返回认证方法），但最好先将其进行转化。
* */















