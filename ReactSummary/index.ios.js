/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */


/**
 * 用于开启 Strict Mode，Strict mode的错误处理可以有所提高，
 * JavaScript的一些语言缺陷也可以避免。简而言之就是，JavaScript在这种模式下工作地更好！
 */
'use strict';

/**
 * 将 react-native 模块加载进来，并将它赋值给变量 React 的。
 * React Native 使用同 Node.js 相同的模块加载方式：require，
 * 这个概念可以等同于 Swift 中的“链接库”或者“导入库”。
 */
var React = require('react-native');

/*这里引入了本地模块FilterableProductTable*/
//var SearchPage = require('./SearchPage');
//var ListViewDemo = require('./SummaryListView');
//var SummaryLifeCycle = require('./SummaryLifeCycle');
//var SummaryAnimation = require('./SummaryAnimation');


var App = require('./app/containers/App')
//var user = require('./app/mocks/user')
//var userInfo = require('./app/mocks/userInfo')
//var UserService = require('./app/services/UserService')
//Object.assign(user, userInfo)

/**
 * 这是一种解构赋值，准许你获取对象的多个属性并且使用一条语句将它们赋给多个变量。
 * 结果是，后面的代码中可以省略掉 React 前缀；
 * 比如，你可以直接引用 StyleSheet ，而不再需要 React.StyleSheet。
 */
var {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    NavigatorIOS
    } = React;


/**
 * 定义了一些应用在控件上的样式。
 * 如果你曾接触过Web开发，那你很可能已经发现了：React Native 使用的是 CSS 来定义应用界面的样式。
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

/*本地数据，一个数组*/
var PRODUCTS = [
    {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
    {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
    {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
    {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
    {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
    {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];



var Hello = React.createClass ({

    render: function() {
        /**
         * 构造一个 navigation controller，并把初始路由设为 FilterableProductTable 组件。
         * 在Web 开发中，路由就是一种定义应用导航的一种技术，即定义页面——或者说是路由——与 URL 的对应关系。
         */
        return (
            <NavigatorIOS style={styles.container}
                initialRoute={{
                    title: '我是导航条',
                    component: App,
                    /*
                     * 这里展示了如何通过props传递数据，key是products, value是PRODUCTS数组
                     * props 是一种从父级向子级传递数据的方式，而且数据是沿着组件树从上到下单向流动的。
                     * */
                    passProps: {products: PRODUCTS}
                }}/>
        );

    }
})


/**
 * 类 (class) 是在ES6中被引入的，纵然JavaScript一直在进步，
 * 但Web开发者受困于兼容浏览器的状况中，不能怎么使用JS的新特性。
 * React Native运行在JavaScriptCore中是，也就是说，你可以使用JS的新特性啦，完全不用担心兼容什么的呢。
 *
 * 继承了 React.Component（React UI的基础模块）。
 * 组件包含着不可变的属性，可变的状态变量以及暴露给渲染用的方法。这会你做的应用比较简单，只用一个渲染方法就可以啦。
 *
 * React Native 组件并不是 UIKit 类，它们只能说是在某种程度上等同。框架只是将 React 组件树转化成为原生的UI。
 */
class HelloTest  extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            message: 'hello'
        };
    }

    render() {

        /**
         *构造一个 navigation controller，应用一个样式，并把初始路由设为 Hello World 组件。
         * 在 Web 开发中，路由就是一种定义应用导航的一种技术，即定义页面——或者说是路由——与 URL 的对应关系。
         */
        return (
            <NavigatorIOS style={styles.container}
                          initialRoute={{
                title: '我是导航条',
                component: SearchPage,
        }}/>
        );
    }
}

/**
 * AppRegistry 定义了App的入口，并提供了根组件。
 */
AppRegistry.registerComponent('Hello', () => Hello);

















