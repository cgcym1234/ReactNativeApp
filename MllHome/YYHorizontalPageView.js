/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

'use strict';

var React = require('react-native');
var Dimensions = require('Dimensions');

var {
    StyleSheet,
    Image,
    Text,
    View,
    ScrollView,
    PropTypes,
    TouchableHighlight,
    Component
    } = React;

var ImageWidth = Dimensions.get('window').width/3.0;
var HeightWidthRate = 155/212.0;


var styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    pageContainer: {
        width: Dimensions.get('window').width,
        flexDirection: "row",
        flexWrap: "nowrap",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: '#FFFFFF'
    },
    itemContainer: {
        flex: 1,
        flexDirection: 'column',
        borderWidth: 0.5,
        borderColor: '#d8d8d8'
    },
    image: {
        width: ImageWidth,
        height: ImageWidth*HeightWidthRate
    },
    textContainer: {
        height: 28,
        paddingLeft: 8,
        alignItems: "center",
        flexDirection: "row"
    },
    text: {
        fontSize: 14,
    }

});

var itemsPerPage = 3;

const ItemModel = {
    max_price: PropTypes.string.isRequired,
    discount: PropTypes.string.isRequired,
    pic_url: PropTypes.string.isRequired,
    skip_url: PropTypes.string,
    seckill: PropTypes.string
};

const propTypes = {
    dataArray:PropTypes.array.isRequired
};

class YYHorizontalPageView extends Component {

    onItemClicked(urlString) {
        console.log('YYHorizontalPageView ' + urlString);
        if (this.props.onItemClicked) {
            this.props.onItemClicked(urlString);
        }
    }

    /*
    * 使用map或者forEach等做循环的时候,最好给循环产生的child添加一个key
    * 不然会出现Warning: Each child in an array or iterator should have a unique "key" prop. Check the render method of `CommentList`. See https://fb.me/react-warning-keys for more information. 警告信息！
    * */
    renderItem(item, key) {
        return (
            <TouchableHighlight key={key} onPress={ () => { this.onItemClicked(item.skip_url) } } underlayColor={'#d8d8d8'}>
                <View style={styles.itemContainer} >
                    <Image
                           source={{uri: item.pic_url}}
                           style={styles.image}/>

                    <View style={styles.textContainer}>
                        <Text
                            style={[styles.text,{color:'#DA0000'}]}>{'$' + item.max_price}</Text>
                        <Text
                            style={[styles.text, {color:'#FFFFFF',backgroundColor:'#DA0000',borderRadius:8,marginLeft:2,paddingLeft:4,paddingRight:4}]}>{item.discount + '折'}</Text>
                    </View>
                </View>
            </TouchableHighlight>
        )
    }

    renderItems(itemModelArray) {
        if (!itemModelArray || itemModelArray.length == 0){
            return <View />
        }
        return itemModelArray.map(this.renderItem.bind(this));
    }


    render() {
        var dataArr = this.props.dataArray;
        return (
            <ScrollView style={styles.container}
                        horizontal={true}
                        alwaysBounceHorizontal={true}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}>

                {this.renderItems(dataArr)}
            </ScrollView>
        );
    }

};

YYHorizontalPageView.propTypes = propTypes;

module.exports = YYHorizontalPageView;















