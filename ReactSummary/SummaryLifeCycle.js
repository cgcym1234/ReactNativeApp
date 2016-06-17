/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

'use strict';

var React = require('react-native');

var {
    Image,
    ListView,
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableHighlight,
    ActivityIndicatorIOS,
    Component
} = React;

var styles = StyleSheet.create({
    textContainer: {
        flex: 1
    },
    separator: {
        height: 1,
        backgroundColor: '#dddddd'
    },
    price: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#48BBEC'
    },
    title: {
        fontSize: 20,
        color: '#656565'
    },
    rowContainer: {
        flexDirection: 'row',
        padding: 10
    },
    container: {
        flexDirection: 'column',
        marginTop: 10,
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
});

/*搜索框组件*/
var SearchBar = React.createClass({

    getInitialState: function() {
        return {
            searchString: '',
        };
    },

    /*
    * TextInput响应用户更改输入文本的事件
    * 从 events 中取出了 text 属性的值，并用于更新组件的状态。
    * */
    onSearchTextChanged: function(event) {
        //console.log('onSearchTextChanged '+ event.nativeEvent.text);
        this.setState({searchString:event.nativeEvent.text});
    },

    /*
    * 点击Go按钮后的响应事件
    * 同时会调用this.props.onUserInput，即FilterableProductTable传进来的handleUserInput函数
    * */
    onSearchPressed: function() {
        //console.log('onSearchPressed');
        this.props.onUserInput(this.state.searchString);
    },

    /*
    * TouchableHighlight，React Native创造的button组件，
    * */
    render: function() {
        //console.log('SearchBar render');
        return (
                <View style={styles.flowRight}>
                    <TextInput
                        ref='filterTextInput'
                        value={this.props.filterText}
                        style={styles.searchInput}
                        onChange={this.onSearchTextChanged}
                        placeholder='请输入要查询的名字'>
                    </TextInput>
                    <TouchableHighlight
                        style={styles.button}
                        underlayColor='#99d9f4'>
                        <Text
                            style={styles.buttonText}
                            onPress={this.onSearchPressed}>
                            Go
                        </Text>
                    </TouchableHighlight>
                </View>

        );
    },
});

/*列表组件*/
var ProductTable = React.createClass({

    /*
     * 在statics块儿里面定义的方法都是静态的，意味着你可以在任何组件实例创建之前调用它们，这些方法不能获取组件的 props 和 state。
     * 类似Oc中的类方法
     * */
    statics: {
        customMethod1: function(foo) {
            console.log('customMethod1');
            return foo === 'bar';
        },

        customMethod2: function() {
            console.log('customMethod2');
            return true;
        }
    },

    /*
     * 在组件类创建的时候调用一次，然后返回值被保存下来。同父组件指定的props一起合并到 this.props。
     该方法在任何实例创建之前调用，在里面不能使用this.props。另外，getDefaultProps() 返回的任何复杂对象将会在实例间共享，而不是每个实例拥有一份拷贝。
     * */
    getDefaultProps: function() {
        console.log('getDefaultProps');
    },

    /*
     this.state中默认是一个空串filterText。表示显示所有数据
     * */
    getInitialState: function() {
        console.log('getInitialState');
        ProductTable.customMethod1("hel");
        ProductTable.customMethod2();

        var ds = new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
        });
        return {
            dataSource: ds.cloneWithRows(this.props.products),
        };
    },

    /*
     * 服务器端和客户端都只调用一次，在初始化渲染执行之前立刻调用。
     * */
    componentWillMount: function() {
        console.log('componentWillMount');
    },

    /*
     * 在初始化渲染执行之后立刻调用一次，仅客户端有效（服务器端不会调用）。
     * 在生命周期中的这个时间点，组件拥有一个 DOM 展现，你可以通过 this.getDOMNode() 来获取相应 DOM 节点。
     * */
    componentDidMount: function() {
        console.log('componentDidMount');
    },

    /*
     * 在组件从 DOM 中移除的时候立刻被调用。
     可以在该方法中执行任何必要的清理。
     */
    componentWillUnmount: function() {
        console.log('componentWillUnmount');
    },

    /*
     * 在组件接收到新的 props 的时候调用。在初始化渲染的时候，该方法不会调用。
     用此函数可以作为 react 在 prop 传入之后， render() 渲染之前更新 state 的机会。
     老的 props 可以通过 this.props 获取到*/
    componentWillReceiveProps: function(nextProps) {
        console.log('componentWillReceiveProps' + nextProps);

        var ds = new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
        });
        this.setState({dataSource: ds.cloneWithRows(nextProps.products)});
    },

    /*
     *默认情况下，shouldComponentUpdate 总会返回 true
     如果这里reture false，那么componentWillUpdate，render，componentDidUpdate都不会执行。
     * */
    shouldComponentUpdate: function(nextProps, nextState) {
        console.log('shouldComponentUpdate' + nextProps + nextState);
        return true;
    },

    /*
     * 在接收到新的 props 或者 state 之前立刻调用。在初始化渲染的时候该方法不会被调用。
     使用该方法做一些更新之前的准备工作。
     注意：不能在刚方法中使用 this.setState()。
     如果需要更新 state 来响应某个 prop 的改变，应该使用 componentWillReceiveProps。
     */
    componentWillUpdate: function(nextProps, nextState) {
        console.log('componentWillUpdate' + nextProps + nextState);
    },

    /*
     在组件的更新已经同步到 DOM 中之后立刻被调用。该方法不会在初始化渲染的时候调用。
     使用该方法可以在组件更新之后操作 DOM 元素。
     */
    componentDidUpdate: function(prevProps, prevState) {
        console.log('componentDidUpdate' + prevProps + prevState);
    },



    render: function() {
        console.log('ProductTable render');
        return (
            <ListView
                dataSource = {this.state.dataSource}
                renderRow = {this.renderRow}
            />
        );
    },


    renderRow: function(product) {
        return (
            <View>
                <View style={styles.rowContainer}>
                    <View  style={styles.textContainer}>
                        <Text style={styles.price}>{product.name}</Text>
                        <Text style={styles.title}
                            numberOfLines={1}>{product.price}</Text>
                    </View>
                </View>
                <View style={styles.separator}/>
            </View>
        );
    },
});

/*根组件*/
var SummaryLifeCycle = React.createClass({

    /*
    * 由于组件只能更新自己的 state， 这里传递一个回调函数handleUserInput 给 SearchBar ，
    * 此函数将会在 state 应该被改变的时候触发。
    * */
    handleUserInput: function(filterText) {
        //console.log('handleUserInput '+filterText);
        this.setState({
            filterText: filterText,
        });
    },

    /*
      this.state中默认是一个空串filterText。表示显示所有数据
    * */
    getInitialState: function() {
        return {
            filterText: '',
        };
    },


    /*
    * 这里将onUserInput:handleUserInput传递给了SearchBar的props
    * 将_fetchData()过滤后的数据传递给了ProductTable
    *
     用 React.createClass() 来创建组件的时候，必须提供一个包含 render 方法的对象。
     当调用render的时候，会检测 this.props 和 this.state，返回一个单子级组件。
     该子级组件可以是虚拟的本地 DOM 组件(View, Text等)，也可以是自定义的复合组件，也可以返回 null 或者 false 来表明不需要渲染任何东西。

     render() 函数应该是纯粹的，也就是说该函数不修改组件 state，每次调用都返回相同的结果，不读写 DOM 信息，也不和浏览器交互（例如通过使用 setTimeout）。
     保持 render() 纯粹，可以使服务器端渲染更加切实可行，也使组件更容易被理解。
    * */
    render: function() {
        //console.log('SummaryLifeCycle render');
        return (
            <View style={{marginTop:64,flex:1}}>
                <SearchBar
                    style={{height:44}}
                    filterText={this.state.filterText}
                    onUserInput={this.handleUserInput}
                />
                <ProductTable
                    style={{marginTop:0}}
                    products = {this._fetchData(this.state.filterText)}
                />
            </View>

        );
    },

    /*
     * 根据filterText过滤props.products数组
     * 返回数组中product.name是以filterText开头的数据
     * */
    _fetchData: function(filterText) {
        //console.log('fetchData ' + filterText);
        var rows = [];
        if(filterText.length === 0) {
            rows = this.props.products;
        } else {
            this.props.products.forEach(function(product) {
                if (filterText.length > product.name.length) {
                    return
                }
                var subStr = product.name.substr(0, filterText.length);
                if (subStr == filterText) {
                    rows.push(product);
                }
            });
        }
        return rows;
    },

});


module.exports = SummaryLifeCycle













