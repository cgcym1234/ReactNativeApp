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
    ScrollView,
    TouchableHighlight,
    Component
    } = React;

var BigImageWidth = Dimensions.get('window').width;
var ImageWidth = (Dimensions.get('window').width-15)/2.0;
var BigHeightWidthRate = 140.0/640;
var SmallHeightWidthRate = 120.0/306;


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
        flexDirection: 'row',
    },
    bigImage: {
        width: BigImageWidth,
        height: BigImageWidth*BigHeightWidthRate,
    },
    smallImage: {
        width: ImageWidth,
        height: ImageWidth*SmallHeightWidthRate,
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

class YYTwoImageView extends Component {


    onItemClicked(urlString) {
        console.log('YYTwoImageView ' + urlString);
        if (this.props.onItemClicked) {
            this.props.onItemClicked(urlString);
        }
    }

    renderItem(){
        var array = this.props.dataArray;
        if (!array || array.length == 0 ) {
            return <View />;
        }
        console.log('renderItem ' + array.length);
        if (array.length == 1) {
            return (
                <View style={styles.container}>
                    <TouchableHighlight onPress={ () => { this.onItemClicked(array[0].url) } }
                                        underlayColor={'#eeeeee'}>
                        <Image style={styles.bigImage} source={{uri:array[0].src}}/>
                    </TouchableHighlight>
                </View>
            );
        } else if (array.length == 2) {
            return (
                <View style={{padding:5}}>
                    <View style={styles.container}>
                        <TouchableHighlight onPress={ () => { this.onItemClicked(array[0].url) } }
                                            underlayColor={'#eeeeee'}>
                            <Image style={styles.smallImage} source={{uri:array[0].src}}/>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={ () => { this.onItemClicked(array[1].url) } }
                                            underlayColor={'#eeeeee'}>
                            <Image style={styles.smallImage} source={{uri:array[1].src}}/>
                        </TouchableHighlight>
                    </View>
                </View>
            );
        }

        return <View />;
    }

    render() {
        return (
            <View>

                {this.renderItem()}

            </View>
        );
    }

};

YYTwoImageView.propTypes = propTypes;

module.exports = YYTwoImageView;















