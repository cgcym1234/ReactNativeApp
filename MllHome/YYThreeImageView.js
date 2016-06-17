/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

'use strict';

var React = require('react-native');
var Dimensions = require('Dimensions');

var {
    StyleSheet,
    PropTypes,
    Image,
    Text,
    View,
    AlertIOS,
    ScrollView,
    TouchableHighlight,
    Component
    } = React;

var ImageWidth = Dimensions.get('window').width/2.0;
var BigHeightWidthRate = 340.0/320;
var SmallHeightWidthRate = 170.0/320;


var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        flexWrap: "nowrap",
        justifyContent: "space-between",
        backgroundColor: '#FFFFFF'
    },
    smallImageContainer: {
        flex: 1,
        flexDirection: 'column',
    },
    bigImage: {
        width: ImageWidth,
        height: ImageWidth*BigHeightWidthRate,
        borderWidth: 0.5,
        borderColor: '#d8d8d8'
    },
    smallImage: {
        width: ImageWidth,
        height: ImageWidth*SmallHeightWidthRate,
        borderWidth: 0.5,
        borderColor: '#d8d8d8'
    },
});


var dataArray = [
    {
        seckill: '14723',
        max_price: '20.99',
        discount: '5.2',
        pic_url: 'http://image.meilele.com/images/201511/1447755255903.jpg',
        skip_url: 'http://m.meilele.com/miaosha/?from=msy1f4'
    },
    {
        seckill: '14723',
        max_price: '49.09',
        discount: '5.3',
        pic_url: 'http://image.meilele.com/images/201511/1447755287852.jpg',
        skip_url: 'http://m.meilele.com/miaosha/?from=msy1f4'
    },
    {
        seckill: '14723',
        max_price: '49.9',
        discount: '5.1',
        pic_url: 'http://image.meilele.com/images/201511/1447755331233.jpg',
        skip_url: 'http://m.meilele.com/miaosha/?from=msy1f4'
    }
];

/*
* 左边是一个大图或者2个小图
* */
var LayoutType = [
    "LayoutTypeBigImageLeft",
    "LayoutTypeBigImageRigth"
]

const ImageModel = {
    src: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    desc: PropTypes.string,
};

const propTypes = {
    dataArray:PropTypes.array.isRequired,
    layoutType:PropTypes.string.isRequired,
}

class YYThreeImageView extends Component {

    onItemClicked(urlString) {
        console.log('YYThreeImageView ' + urlString);
        if (this.props.onItemClicked) {
            this.props.onItemClicked(urlString);
        }
    }

    renderItem(){
        var array = this.props.dataArray;
        if (!array || array.length < 3) {
            return <View />;
        }

        if (this.props.layoutType == "LayoutTypeBigImageLeft") {
            return (
                <View style={styles.container}>
                    <TouchableHighlight onPress={ () => { this.onItemClicked(array[0].url)} }
                                        underlayColor={'#eeeeee'}>
                        <Image style={styles.bigImage} source={{uri:array[0].src}}/>
                    </TouchableHighlight>

                    <View style={styles.smallImageContainer}>
                        <TouchableHighlight onPress={ () => { this.onItemClicked(array[1].url) }}
                                            underlayColor={'#eeeeee'}>
                            <Image style={styles.smallImage} source={{uri:array[1].src}}/>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={ () => { this.onItemClicked(array[2].url) } }
                                            underlayColor={'#eeeeee'}>
                            <Image style={styles.smallImage} source={{uri:array[2].src}}/>
                        </TouchableHighlight>
                    </View>
                </View>
            );
        } else {
            return (
                <View style={styles.container}>
                    <View style={styles.smallImageContainer}>
                        <TouchableHighlight onPress={ () => { this.onItemClicked(array[0].url) } }
                                            underlayColor={'#eeeeee'}>
                            <Image style={styles.smallImage} source={{uri:array[0].src}}/>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={ () => { this.onItemClicked(array[2].url) }}
                                            underlayColor={'#eeeeee'}>
                            <Image style={styles.smallImage} source={{uri:array[2].src}}/>
                        </TouchableHighlight>
                    </View>
                    <TouchableHighlight onPress={ () => { this.onItemClicked(array[1].url) }}
                                        underlayColor={'#eeeeee'}>
                        <Image style={styles.bigImage} source={{uri:array[1].src}}/>
                    </TouchableHighlight>
                </View>
            );
        }
    }

    render() {
        return (
            <View>

                {this.renderItem()}

            </View>
        );
    }

};

YYThreeImageView.propTypes = propTypes;

module.exports = YYThreeImageView;















