/**
 * Created by sihuan on 16/6/14.
 */

'use strict';
/*
 - AddTodo 输入字段的输入框和按钮。
    - onAddClick(text: string) 当按钮被点击时调用的回调函数。
* */

import React, {
    StyleSheet,
    Component,
    View,
    Text,
    TextInput,
    PropTypes,
    TouchableHighlight
} from 'react-native';

const styles = StyleSheet.create({
    container: {
        padding: 30,
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
        alignSelf: 'center'
    },
    button: {
        height: 36,
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#48BBEC',
        borderColor: '#48BBEC',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        alignSelf: 'stretch',
        justifyContent: 'center'
    },
    searchInput: {
        width: 100,
        height: 36,
        padding: 4,
        marginRight: 5,
        flex: 4,
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#48BBEC',
        borderRadius: 8,
        color: '#48BBEC'
    }
});

/*
 http://bbs.reactnative.cn/topic/608/%E5%AF%B9%E7%BB%84%E4%BB%B6%E7%9A%84%E5%BC%95%E7%94%A8-refs

 要获取一个React组件的引用，你即可以使用this来获取当前React组件，
 也可以使用ref来获取你拥有的子组件的引用。

 React支持一个特殊的属性，你可以把它挂到任何的组件上。

 ref回调属性
 这个ref属性可以是一个回调函数，并且这个回调函数会在组件被挂载后立刻被执行。
 引用到的组件会被作为参数传递，这个回调函数可以立即使用组件，或者把它的引用保存起来供将来使用（又或者，两者兼有）。


 ref字符串属性

 React也支持在任意组件上使用一个字符串（而不是回调）来作为ref属性。尽管这种做法现在已经基本被弃用。

 给任何render函数渲染的东西增加ref属性，例如：
 <input ref="myInput" />
 在其它的地方（通常是事件处理代码里），通过this.refs访问真正的组件实例。
 var input = this.refs["myInput"];
 */
export default class AddTodo extends Component {
    render() {
        return (
            <View style={styles.container}>
                <TextInput ref={ (input) => { this.myTextInput = input; } }
                           onChangeText={ (text) => this.text = text }
                           style={styles.searchInput}/>
                <TouchableHighlight style={styles.button}
                                    underlayColor='#99d9f4'>
                    <Text
                        style={styles.buttonText}
                        onPress={ (e) => this.handleClick(e) }>
                        Add
                    </Text>
                </TouchableHighlight>
            </View>
        );
    }

    handleClick(e) {
        //通过ref获取到的TextInput实例
        const input = this.myTextInput;
        const text = input.value;//这样获取到的是undefine... 用this.text
        console.log(text);
        this.props.onAddClick(this.text);
        input.clear();
    }
}

const propTypes = {
    onAddClick: PropTypes.func.isRequired
};

AddTodo.propTypes = propTypes;








