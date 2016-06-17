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
        console.log('onSearchTextChanged '+ event.nativeEvent.text);
        this.setState({searchString:event.nativeEvent.text});
    },

    /*
    * 点击Go按钮后的响应事件
    * 同时会调用this.props.onUserInput，即FilterableProductTable传进来的handleUserInput函数
    * */
    onSearchPressed: function() {
        console.log('onSearchPressed');
        this.props.onUserInput(this.state.searchString);
        //this.props.father.filterText = this.state.searchString;
        // this.props.father.state.filterText = this.state.searchString;
    },

    /*
    * TouchableHighlight，React Native创造的button组件，
    * */
    render: function() {
        console.log('SearchBar render');
        return (
                <View style={styles.flowRight}>
                    <TextInput
                        ref='filterTextInput'
                        value={this.state.searchString}
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
                            搜索
                        </Text>
                    </TouchableHighlight>
                </View>
        );
    },
});

/*列表组件*/
var ProductTable = React.createClass({

    /*
    * 在this.state中使用了dataSource，
    * */
    getInitialState: function() {
        var ds = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });
        return {
            dataSource: ds.cloneWithRows(this.props.products),
        };
    },

    /*
    * 第一次的时候
    * */
    componentWillReceiveProps: function(nextProps) {
        console.log('componentWillReceiveProps');
        var ds = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });
        this.setState({dataSource: ds.cloneWithRows(nextProps.products)});

    },

    render: function() {
        console.log('ProductTable render');
        return (
            <ListView
                dataSource = {this.state.dataSource}
                renderRow = {this.renderRow}/>
        );
    },

    // 这里帮助拆解数据
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
var FilterableProductTable = React.createClass({

    /*
    * 由于组件只能更新自己的 state， 这里传递一个回调函数handleUserInput 给 SearchBar ，
    * 此函数将会在 state 应该被改变的时候触发。
    * */
    handleUserInput: function(filterText) {
        console.log('handleUserInput '+filterText);
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
     * 根据filterText过滤props.products数组
     * 返回数组中product.name是以filterText开头的数据
     * */
    _fetchData: function(filterText) {
        console.log('fetchData ' + filterText);
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

    /*
    * 这里将onUserInput:handleUserInput传递给了SearchBar的props
    * 将_fetchData()过滤后的数据传递给了ProductTable
    * */
    render: function() {
        console.log('FilterableProductTable render');
        return (
            <View style={{marginTop:150,flex:1}}> 
                <SearchBar
                    style={{height:44}}
                    father = {this.state}
                    onUserInput={this.handleUserInput}/>
                <ProductTable
                    style={{marginTop:0}}
                    products = {this._fetchData(this.state.filterText)}/>
            </View>
        );
    },

});


module.exports = FilterableProductTable



