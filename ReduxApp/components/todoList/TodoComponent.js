

/*
 # 搭配 React

 这里需要再强调一下：Redux 和 React 之间没有关系。Redux 支持 React、Angular、Ember、jQuery 甚至纯 JavaScript。

 尽管如此，Redux 还是和 React 和 Deku 这类框架搭配起来用最好，
 因为这类框架允许你以 state 函数的形式来描述界面，Redux 通过 action 的形式来发起 state 变化。

 下面使用 React 来开发一个 todo 任务管理应用。

 ## 安装 React Redux

 Redux 默认并不包含 React 绑定库，需要单独安装。

 npm install --save react-redux
 * */


/*
 ## 容器组件（Smart/Container Components）和展示组件（Dumb/Presentational Components）

 Redux 的 React 绑定库包含了 容器组件和展示组件相分离 的开发思想。

 明智的做法是只在最顶层组件（如路由操作）里使用 Redux。其余内部组件仅仅是展示性的，所有数据都通过 props 传入。

                        容器组件	          展示组件
 Location	        最顶层，路由处理	     中间和子组件
 Aware of Redux	          是	                否
 读取数据	          从 Redux 获取 state	    从 props 获取数据
 修改数据	          向 Redux 派发 actions	从 props 调用回调函数

 在这个 todo 应用中，只应有一个容器组件，它存在于组件的最顶层。
 在复杂的应用中，也有可能会有多个容器组件。虽然你也可以嵌套使用容器组件，但应该尽可能的使用传递 props 的形式。
* */

/*
 ## 设计组件层次结构

 还记得当初如何 设计 state 根对象的结构 吗？现在就要定义与它匹配的界面的层次结构。
 其实这不是 Redux 相关的工作，React 开发思想在这方面解释的非常棒。(https://facebook.github.io/react/docs/thinking-in-react.html)

 我们的概要设计很简单。我们想要显示一个 todo 项的列表。
 1. 一个 todo 项被点击后，会增加一条删除线并标记 completed。
 2. 我们会显示用户新增一个 todo 字段。
 3. 在 footer 里显示一个可切换的显示全部/只显示 completed 的/只显示 incompleted 的 todos。


 以下的这些组件（和它们的 props ）就是从这个设计里来的：

 - AddTodo 输入字段的输入框和按钮。
    - onAddClick(text: string) 当按钮被点击时调用的回调函数。

 - TodoList 用于显示 todos 列表。
    - todos: Array 以 { text, completed } 形式显示的 todo 项数组。
    - onTodoClick(index: number) 当 todo 项被点击时调用的回调函数。

 - Todo 一个 todo 项。
    - text: string 显示的文本内容。
    - completed: boolean todo 项是否显示删除线。
    - onClick() 当 todo 项被点击时调用的回调函数。

 - Footer 一个允许用户改变可见 todo 过滤器的组件。
    - filter: string 当前的过滤器为： 'SHOW_ALL'、 'SHOW_COMPLETED' 或 'SHOW_ACTIVE'。
    - onFilterChange(nextFilter: string)： 当用户选择不同的过滤器时调用的回调函数。

 这些全部都是展示组件。它们不知道数据是从哪里来的，或者数据是怎么变化的。你传入什么，它们就渲染什么。

 如果你要把 Redux 迁移到别的上，你应该要保持这些组件的一致性。因为它们不依赖于 Redux。

 直接写就是了！我们已经不用绑定到 Redux。你可以在开发过程中给出一些实验数据，直到它们渲染对了。
* */


/*一个笨拙型的组件 App 把它们渲染出来，验证下是否工作。*/

import React, { Component, View } from 'react-native';
import Todo from './Todo';
import AddTodo from './AddTodo';
import TodoList from './TodoList';
import Footer from './Footer';

export default class TodoComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { state, actions } = this.props;
        return (
            <View>
                <AddTodo onAddClick={ (text) => console.log(text) }/>
                <TodoList
                    todos={[{
                         text: 'Use Redux',
                         completed: true
                         }, {
                         text: 'Learn to connect it to React',
                         completed: false
                        }]
                        }
                    onTodoClick={ todo =>
                     console.log('todo clicked', todo)
                     }/>
                <Footer filter='SHOW_ALL'
                        onFilterChange={filter =>
                            console.log('filter change', filter)
                        }/>
            </View>
        );
    }
}

/*
 Component创建好后,需要连接到 Redux

 我们需要做出两个变化，将 App 组件连接到 Redux 并且让它能够 dispatch actions 以及从 Redux store 读取到 state。

 * */
