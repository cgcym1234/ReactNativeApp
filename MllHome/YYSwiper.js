/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

'use strict';

var React = require('react-native');
var Dimensions = require('Dimensions');
var Swiper = require('react-native-swiper');

var {
    StyleSheet,
    PropTypes,
    Image,
    Text,
    View,
    ScrollView,
    TouchableHighlight,
    Component
    } = React;

var ImageWidth = Dimensions.get('window').width;
var HeightWidthRate = 160.0/414;


var styles = StyleSheet.create({
    container: {
        flexDirection:'row',
        height:ImageWidth*HeightWidthRate
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'transparent',
        height:ImageWidth*HeightWidthRate
    },
    image: {
        flex: 1
    },
});


const ImageModel = {
    src: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    desc: PropTypes.string,
};



const propTypes = {
    dataArray:PropTypes.array.isRequired
}

class YYSwiper extends Component {

    onItemClicked(urlString) {
        console.log('YYSwiper ' + urlString);
        if (this.props.onItemClicked) {
            this.props.onItemClicked(urlString);
        }
    }

    renderItem(item, key) {
        //console.log('YYSwiper renderItem ' + item.src);
        return <TouchableHighlight key={key}
            onPress={ () => {this.onItemClicked(item.url)} }
            underlayColor={'#d8d8d8'}>
            <View style={styles.slide}>
                <Image source={{uri: item.src}}
                       style={styles.image}/>
            </View>
        </TouchableHighlight>;
    }

    renderItems(imageModelArray) {
        //console.log('YYSwiper ' + imageModelArray);
        if (!imageModelArray || imageModelArray.length == 0 ) {
            return <View />;
        }
        return imageModelArray.map(this.renderItem.bind(this));
    }

    render() {
        return (
            <View style={[this.props.style, styles.container]}>
                <Swiper   
                    showsPagination={true}
                    dot={<View style={{backgroundColor:'rgba(255,255,255,.3)', width: 13, height: 13,borderRadius: 7, marginLeft: 7, marginRight: 7,}} />}
                    activeDot={<View style={{backgroundColor: '#fff', width: 13, height: 13, borderRadius: 7, marginLeft: 7, marginRight: 7}} />}

                    loop={true}
                    autoplay={true}>
                    {this.renderItems(this.props.dataArray)}
                </Swiper>
            </View>

        );
    }

};
YYSwiper.propTypes = propTypes;

module.exports = YYSwiper;















