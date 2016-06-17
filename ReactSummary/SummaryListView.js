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
    TouchableOpacity,
    } = React;

var styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: '#F6F6F6',
    },
    separator: {
        height: 1,
        backgroundColor: '#CCCCCC',
    },
    thumb: {
        width: 64,
        height: 64,
    },
    text: {
        flex: 1,
    },
    listview: {
        backgroundColor: '#B0C4DE',
    },
    header: {
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#3B5998',
        flexDirection: 'row',
    },
    section: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: 6,
        backgroundColor: '#5890ff',
    },
});

var hashCode = function(str) {
    var hash = 15;
    for (var ii = str.length - 1; ii >= 0; ii--) {
        hash = ((hash << 5) - hash) + str.charCodeAt(ii);
    }
    return hash;
};


/*ListView 最简单的例子：
 * 创建一个 ListView.DataSource，用一个简单的数组填充
 * 用那个数据源实例化一个ListView 组件和一个 renderRow 回调，它会从数组中取出一个数据并返回一个可渲染的组件。*/
var ListViewDemo1 = React.createClass({

    getInitialState: function() {
        var ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});
        return {
            dataSource: ds.cloneWithRows(['row 1', 'row 2']),
        };
    },

    render: function() {
        return (
            <ListView
                dataSource = {this.state.dataSource}
                renderRow = {(rowData) => <Text>{rowData}</Text>}
            />
        );
    },

});


/*100个行的列表*/
var ListViewDemo2 = React.createClass({

    _pressData: ({}:{[key: number]: boolean}),

    getInitialState: function() {
        var ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});
        return {
            dataSource: ds.cloneWithRows(this._genRows({})),
        };
    },


    render: function() {
        console.log('ProductTable render');
        return (
            <ListView
                dataSource = {this.state.dataSource}
                renderRow = {this._renderRow}
            />
        );
    },

    _renderRow: function(rowData: string, sectionID: number, rowID: number) {
        var rowHash = Math.abs(hashCode(rowData));
        var imgSource = {uri:THUMB_URLS[rowHash % THUMB_URLS.length]};

        return (
            <TouchableHighlight onPress = {() => this._pressRow(rowID)}>
                <View>
                    <View style={styles.row}>
                        <Image style={styles.thumb} source={imgSource} />
                        <Text style={styles.text}>
                            {rowData + ' - ' + LOREM_IPSUM.substr(0, rowHash % 60 + 10)}
                        </Text>
                    </View>
                    <View style={styles.separator} />
                </View>
            </TouchableHighlight>
        );

    },

    _genRows: function(pressData: {[key: number]: boolean}): Array<string> {
        var dataBlob = [];
        for (var i = 0; i < 100; i++) {
            var pressedText = pressData[i] ? ' (pressed)' : '';
            dataBlob.push('Row ' + i + pressedText);
        }
        return dataBlob;
    },

    _pressRow: function(rowID: number) {
        this._pressData[rowID] = !this._pressData[rowID];
        this.setState({dataSource: this.state.dataSource.cloneWithRows(
        this._genRows(this._pressData)
        )});
    },


});


/*
 * 带表头，分组头，表尾的ListView
 * */
var SectionHeader = React.createClass({
    render: function() {
        return (
            <View style={styles.section}>
                <Text style={styles.text}>
                {this.props.text}
                </Text>
            </View>
        );
    }
});

var Cell = React.createClass({
    getInitialState: function() {
        return {thumbIndex: this._getThumbIdx(), rowData:this.props.data.text};
    },
    _getThumbIdx: function() {
        return Math.floor(Math.random() * THUMB_URLS.length);
    },
    _pressRow: function(rowData: string, sectionID: string, rowID: string) {
        console.log('_pressRow! ');
        this.setState({
            rowData: rowData +'(pressed)',
        });
        //this.props.rowPressed(rowData, sectionID, rowID);
    },
    render: function() {
        return (
            <TouchableHighlight onPress = {() => this._pressRow(this.props.data.text, this.props.data.sectionID, this.props.data.rowID)}>
                <View>
                    <View style={styles.row}>
                        <Image style={styles.thumb} source={{uri: THUMB_URLS[this.state.thumbIndex]}} />
                        <Text style={styles.text}>
                            {this.state.rowData} + {LOREM_IPSUM.substr(0, this.state.thumbIndex+10)}
                        </Text>
                    </View>
                    <View style={styles.separator} />
                </View>
            </TouchableHighlight>
        );
    }
});


 var ListViewDemo = React.createClass({

    getInitialState: function() {

        /*自定义获取section数据函数*/
        var getSectionData = (dataBlob, sectionID) => {
            return dataBlob[sectionID];
        };

        /*自定义获取row数据函数*/
        var getRowData = (dataBlob, sectionID, rowID) => {
            return dataBlob[rowID];
        };

        /*设置ListView.DataSource的属性*/
        var dataSource = new ListView.DataSource({
            getRowData: getRowData,
            getSectionHeaderData: getSectionData,
            rowHasChanged: (row1, row2) => row1 !== row2,
            sectionHeaderHasChanged: (s1, s2) => s1 !== s2
        });

        /*包含所有数据的字典*/
        var dataBlob ={};

        var sectionIDs = [];
        var rowIDs = [];
        for (var i = 0; i < NUM_SECTIONS; i++) {
            var sectionName = 'Section '+i;
            sectionIDs.push(sectionName);
            dataBlob[sectionName] = sectionName;
            rowIDs[i] = [];

            for (var j = 0; j < NUM_ROWS_PER_SECTION; j++) {
                var rowName = 'S' + i + ', R' + j;
                rowIDs[i].push(rowName);
                dataBlob[rowName] = rowName;
            }
        }

        return {
            dataSource: dataSource.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs),
        }
    },

    renderHeader: function() {
        return (
            <TouchableOpacity >
                <View style={styles.header}>
                    <View>
                        <Text style={styles.text}>
                        Table Header (click me)
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        );

    },

    renderSectionHeader:function(sectionData: string, sectionID: string)  {
        return (
            <SectionHeader text = {sectionData}/>
        );
    },

    renderRow: function(rowData: string, sectionID: string, rowID: string) {
        return (
            <Cell data = {{text:rowData, sectionID: sectionID, rowID: rowID}}
                  rowPressed = {this.state.rowPressed}/>
        );
    },
    renderFooter: function() {
        return (
            <View style={styles.header}>
                <Text onPress={() => console.log('Footer!')} style={styles.text}>
                Table Footer
                </Text>
            </View>
        );
    },

    render: function() {
        return (
            <ListView
                style={styles.listview}
                dataSource={this.state.dataSource}
                onChangeVisibleRows={(visibleRows, changedRows) => console.log({visibleRows, changedRows})}
                renderHeader={this.renderHeader}
                renderFooter={this.renderFooter}
                renderSectionHeader={this.renderSectionHeader}
                renderRow={this.renderRow}
                initialListSize={10}
                scrollRenderAheadDistance={4000}
                onEndReached={() => console.log('onEndReached')}
                removeClippedSubviews = {true}
            />
        );
    }


});


var PAGE_SIZE = 4;
var NUM_SECTIONS = 10;
var NUM_ROWS_PER_SECTION = 4;
var THUMB_URLS = ['https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-ash3/t39.1997/p128x128/851549_767334479959628_274486868_n.png', 'https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-prn1/t39.1997/p128x128/851561_767334496626293_1958532586_n.png', 'https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-ash3/t39.1997/p128x128/851579_767334503292959_179092627_n.png', 'https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-prn1/t39.1997/p128x128/851589_767334513292958_1747022277_n.png', 'https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-prn1/t39.1997/p128x128/851563_767334559959620_1193692107_n.png', 'https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-prn1/t39.1997/p128x128/851593_767334566626286_1953955109_n.png', 'https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-prn1/t39.1997/p128x128/851591_767334523292957_797560749_n.png', 'https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-prn1/t39.1997/p128x128/851567_767334529959623_843148472_n.png', 'https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-prn1/t39.1997/p128x128/851548_767334489959627_794462220_n.png', 'https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-prn1/t39.1997/p128x128/851575_767334539959622_441598241_n.png', 'https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-ash3/t39.1997/p128x128/851573_767334549959621_534583464_n.png', 'https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-prn1/t39.1997/p128x128/851583_767334573292952_1519550680_n.png'];
var LOREM_IPSUM = 'Lorem ipsum dolor sit amet, ius ad pertinax oportere accommodare, an vix civibus corrumpit referrentur. Te nam case ludus inciderint, te mea facilisi adipiscing. Sea id integre luptatum. In tota sale consequuntur nec. Erat ocurreret mei ei. Eu paulo sapientem vulputate est, vel an accusam intellegam interesset. Nam eu stet pericula reprimique, ea vim illud modus, putant invidunt reprehendunt ne qui.';


module.exports = ListViewDemo













