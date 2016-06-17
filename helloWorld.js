/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

'use strict';

import React, { 
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Component,
    Image,
    TouchableHighlight,
} from 'react-native';


/**
 * 定义了一些应用在控件上的样式。这里定义了
 * React Native 使用的是 CSS 来定义应用界面的样式。
 */
var styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    text: {
        color: 'black',
        backgroundColor: 'white',
        fontSize: 30,
    }
});

class TextField extends Component {

    constructor(props) {
        super(props);
        this.state = {
            text : ''
        };
    }

    onChangeText(text) {
        this.setState({text:text});
        this.props.onChangeText(text);
    }

    render() {
        return(
            <TextInput
                style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                onChangeText={ this.onChangeText.bind(this) }
                value={this.state.text}>

            </TextInput>
        );
    }
}

/**
 类 (class) 是在ES6中被引入的
 * 继承了 React.Component（React UI的基础模块）。
 * 组件包含着不可变的属性，可变的状态变量以及暴露给渲染用的方法。这会你做的应用比较简单，只用一个渲染方法就可以了。
 *
 * React Native 组件并不是 UIKit 类，它们只能说是在某种程度上等同。框架只是将 React 组件树转化成为原生的UI。
 */
class HelloWorld extends React.Component {
    /**
     * 构造函数
     *
     * 每个 React 组件都带有一个key-value存储的状态对象，可以在组件渲染之前设置其初始状态。
     *
     * 现在你的组件拥有一个状态变量：searchString ，且初始值被设置为 london 。
     * 在render方法中，替换TextInput元素中的内容：
     */
    constructor(props) {
        super(props);
        this.state = {
            text: 'Hello'
        };
    }

    /**
     *  点击事件回调，更新UI
     */
    onPressButton() {

        /** UI的更新
         *
         * 与其他大多数 UI 框架所不同的是,不需要在状态改变的时候去手动更新 UI
         在 React 中,你不再需要担心 UI 的哪些部分可能受到状态变化的影响;
         整个应用程序的 UI，都可以简单地表示为一个函数的状态。

         只有实际改变了的部分才会重新绘制。
         */
            //if (this.state.text == 'Hello') {
            //    this.setState({text: 'Hello World!'});
            //} else {
            //    this.setState({text: 'Hello'});
            //}

            //this.refs["myTextField"].setState({text:''});
            //this.refs["myTextField"].onChangeText('');


        this.setState({text:''});
        this.onChangeText('');
    }

    /*
     render方法必须的，渲染视图用的。return返回的是视图的模板代码，使用JSX语法。
     在 JavaScript 代码里写着 XML 格式的代码称为 JSX,
     更建议使用 JSX , 因为它能定义简洁且我们熟知的包含属性的树状结构语法。
     */
    render() {
        /*
         作为创建UI时最基础的组件，View是一个支持Flexbox布局、样式、一些触摸处理等功能的容器，
         并且它可以放到其它的视图里，也可以有任意多个任意类型的子视图。
         不论在什么平台上，View都会直接对应一个平台的原生视图，无论它是UIView、<div>还是android.view.View。
         */
        return (
            <View style={styles.container}>
                <TextField onChangeText = {(text) => {this.setState({text:text});} }
                           ref="myTextField"/>
                <Text style={styles.text}>
                    {this.state.text}
                </Text>

                <TouchableOpacity onPress={this.onPressButton.bind(this.refs["myTextField"])}>
                    <Text >
                        clear
                    </Text>
                </TouchableOpacity>
            </View>);
    }
}



AppRegistry.registerComponent('app', () => HelloWorld);