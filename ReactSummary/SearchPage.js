
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
var SearchResults = require('./SearchResults');

/**
 * 这是一种解构赋值，准许你获取对象的多个属性并且使用一条语句将它们赋给多个变量。
 * 结果是，后面的代码中可以省略掉 React 前缀；
 * 比如，你可以直接引用 StyleSheet ，而不再需要 React.StyleSheet。
 */
var {
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableHighlight,
    ActivityIndicatorIOS,
    Image,
    Component
} = React;

/**
 * 定义了一些应用在控件上的样式。
 * 如果你曾接触过Web开发，那你很可能已经发现了：React Native 使用的是 CSS 来定义应用界面的样式。
 *
 * 文本区域和 ’Go’ 按钮在同一行，不需要显式地定义两个组件的宽度,文本区域是 flex:4，按钮则是 flex:1，这说明两者的宽度比是4:1。
 */
var styles = StyleSheet.create({
    description: {
        marginBottom: 20,
        fontSize: 18,
        textAlign: 'center',
        color: '#656565'
    },
    container: {
        padding: 30,
        marginTop: 65,
        alignItems: 'center'
    },
    flowRight: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'stretch'
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
        height: 36,
        padding: 4,
        marginRight: 5,
        flex: 4,
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#48BBEC',
        borderRadius: 8,
        color: '#48BBEC'
    },
    image: {
        width: 217,
        height: 138
    },

});

/**
 * 这个函数并不依赖 SearchPage，因此被定义成了一个独立的函数，而不是类方法。
 * 他首先通过 data 来定义查询字符串所需要的参数，接着将 data 转换成需要的字符串格式，name=value 对，使用 & 符号分割。
 * 语法 => 是一个箭头函数，又一个对 JavaScript 语言的扩展，提供了这个便捷的语法来创建一个匿名函数。
 */
function urlForQueryAndPage(key, value, pageNumber) {
    var data = {
        county: 'uk',
        pretty: '1',
        encoding: 'json',
        listing_type: 'buy',
        action: 'search_listings',
        page: pageNumber
    };
    data[key] = value;

    var  queryStirng = Object.keys(data)
            .map(key => key + '=' + encodeURIComponent(data[key]))
            .join('&');
    return 'http://api.nestoria.co.uk/api?' + queryStirng;
}

/**
 * 类 (class) 是在ES6中被引入的，纵然JavaScript一直在进步，
 * 但Web开发者受困于兼容浏览器的状况中，不能怎么使用JS的新特性。
 * React Native运行在JavaScriptCore中是，也就是说，你可以使用JS的新特性啦，完全不用担心兼容什么的呢。
 */
class SearchPage extends Component {

    /**
     * 添加组件状态
     *
     * 每个 React 组件都带有一个key-value存储的状态对象，你必须在组件渲染之前设置其初始状态。
     *
     * 现在你的组件拥有一个状态变量：searchString ，且初始值被设置为 london 。
     * 在render方法中，替换TextInput元素中的内容：
     */
    constructor(props) {
        super(props);
        this.state = {
            searchString: 'london',
            isLoading: false,
            message: ''
        };
    }

    //getInitialState() {
    //    return {
    //        searchString: 'london',
    //        isLoading: false,
    //        message: ''
    //    };
    //}

    /**
     * 从 events 中取出了 text 属性的值，并用于更新组件的状态。这里面也添加了一些有用的调试代码。
     *
     * 当用户更改文本时,会调用 onChange 上 的函数;
     */
    onSearchTextChanged(event) {
        console.log('onSearchTextChanged');
        this.setState({ searchString: event.nativeEvent.text });
        console.log(this.state.searchString);
    }

    /**
     * SearchResults 组件通过上面的代码传入列表里。
     * 在这里用的是 push方法确保搜索结果全部推进导航栈中，这样你就可以通过 ‘Back’ 按钮返回到根页面。
     */
    _handleResponse(response) {
        this.setState({ isLoading: false , message: '' });
        if (response.application_response_code.substr(0, 1) === '1') {
            this.props.navigator.push({
                title: 'Results',
                component: SearchResults,
                passProps: {listings: response.listings}
            });
            //this.setState({ message: 'Properties found: ' + response.listings.length});
        } else {
            this.setState({ message: 'Location not recognized; please try again.'});
        }
    }

    /**
     * JavaScript 的类并没有访问修饰符，因此没有 “私有” 的该。因此常常会发现开发者使用一个下划线作为方法的前缀，来说明这些方法是私有方法。
     *
     * 这里使用了 fetch 函数，它是 Web API 的一部分。和 XMLHttpRequest 相比，它提供了更加先进的 API。
     * 异步响应会返回一个 promise，成功的话会转化 JSON 并且为它提供了一个你将要添加的方法。
     */
    _exceuteQuery(query) {
        console.log(query);
        this.setState({ isLoading: true });

        fetch(query).then(response => response.json())
        .then(json => this._handleResponse(json.response))
        .catch(error => this.setState({
                isLoading: false,
                message: 'Something bad happened ' + error
        }));
    }

    onSearchPressed() {
        var query = urlForQueryAndPage('place_name', this.state.searchString, 1);
        this._exceuteQuery(query);
    }

    /**
     * 通过 navigator.geolocation 检索当前位置；这是一个 Web API 所定义的接口，
     * 所以对于每个在浏览器中使用 location 服务的用户来说这个接口都应该是一致的。
     * React Native 框架借助原生的 iOS location 服务提供了自身的 API 实现。
     */
    onLocationPressed() {
        navigator.geolocation.getCurrentPosition(
                location => {
                var search = location.coords.latitude + ',' + location.coords.longitude;
                this.setState({ searchString: search });
                var query = urlForQueryAndPage('centre_point', search, 1);
                this._executeQuery(query);
            },
                error => {
                this.setState({
                    message: 'There was a problem with obtaining your location: ' + error
                });
            });
    }

    /** UI的更新
     *
     * 与其他大多数 UI 框架所不同的是,你既不需要在状态改变的时候去手动更新 UI ,或使用某种类型的绑定框架，来创建某种应用程序状态和它的 UI 表现的关联;

     在 React 中,你不再需要担心 UI 的哪些部分可能受到状态变化的影响;你的整个应用程序的 UI，都可以简单地表示为一个函数的状态。

     此时，你可能已经发现了这一概念中一个根本性的缺陷。是的,非常准确——性能!

     你肯定不能在 UI 变化时，完全抛弃掉整个 UI 然后重新绘制吧, 这就是 React 高明的地方了。
     每当 UI 渲染出来后,render 方法会返回一颗视图渲染树,并与当前的 UIKit 视图进行比较。
     这个称之为 reconciliation 的过程的输出是一个简单的更新列表, React 会将这个列表应用到当前视图。这意味着，只有实际改变了的部分才会重新绘制。

     这个令人拍案叫绝的崭新概念让ReactJS变得独特——virtual-DOM(文档对象模型,一个web文档的视图树)和 reconciliation 这些概念——被应用于iOS应用程序。
     */

    render() {
        /**
         * 容器（container）默认地是纵向布局，也就是说在它的子元素将会竖直地排列
         * 这被称为主轴 (main axis)，它的方向可以是竖直的也可以是水平的。
         * 每一个子元素在竖直方向上的位置是由它的margin，height和padding共同决定的。
         *
         * require('image!house') 语句用于确定在你应用的asset目录下的图片资源，
         *
         * 注意:你估计会对 bind(this) 语句有疑问。
         * 在 JavaScript 中，this 这个关键字有点不同于大多数其他语言;在 Swift 表示 “自身”。
         * 在这种情况中，bind 可以确保在 onSearchTextChanged 方法中, this 可以作为组件实例的引用。
         */
        console.log('SearchPage.render');

        var spinner = this.state.isLoading ? (
            <ActivityIndicatorIOS
                hidden='true'
                size='large'/>) : (<View/>)

        return (
            <View style={styles.container}>
                <Text style={styles.description}>
                    搜索要买的房子
                </Text>

                <Text style={styles.description}>
                    Search by place-name, postcode or search near your location.
                </Text>

                <View style={styles.flowRight}>
                    <TextInput
                        style={styles.searchInput}
                        value={this.state.searchString}
                        onChange={this.onSearchTextChanged.bind(this)}
                        placeholder='Search via name or postcode'/>
                    <TouchableHighlight style={styles.button}
                                        underlayColor='#99d9f4'>
                        <Text
                            style={styles.buttonText}
                            onPress={this.onSearchPressed.bind(this)}>
                            Go
                        </Text>
                    </TouchableHighlight>
                </View>
                <TouchableHighlight style={styles.button}
                                    underlayColor='#99d9f4'
                                    onPress={this.onLocationPressed.bind(this)}>
                    <Text style={styles.buttonText}>
                        Location
                    </Text>
                </TouchableHighlight>

                <Image source={require('image!house')} style={styles.image}/>
                {spinner}
                <Text style={styles.description}> {this.state.message} </Text>
            </View>
        );
    }
};


/**
 * 最后，将下面的代码添加到文件末尾：
 * 这可以 export SearchPage 类，方便在其他文件中使用它。
 */
module.exports = SearchPage;


















