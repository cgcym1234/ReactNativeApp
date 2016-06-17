/**
 * Created by chesterlee on 16/4/26.
 */

'use strict'

import React, {
    View,
    Image,
    StyleSheet,
    TouchableHighlight,
} from 'react-native';

var styles = StyleSheet.create({
    wrapper: {
        height:100,
    },
    slide: {
        height:64,
    },
});



var Swiper = require('react-native-swiper');

class Slider extends React.Component {

    constructor(props) {
        console.log('Slider+Constructor called!');
        super(props);
        this.state = {
        };
    }

    onItemClicked(url){
        console.log('onItemClicked:' + url);
        if (this.props.clickCallback){
            this.props.clickCallback(url)
        }
    }

    renderImages(item,key){
        return(
        <TouchableHighlight key={key} underlayColor={'#d8d8d8'} onPress={ () => { this.onItemClicked(item)}} >
                <Image
                    source={{uri: item}}
                    style={styles.slide}
                />
        </TouchableHighlight>
        )
    }

    render(){

        //数组渲染结果,直接加入JSX
        var renderJSX = this.props.sliderImages.map(this.renderImages.bind(this));

        return (
            <Swiper style={styles.wrapper} showsButtons={false} autoplay={true} height={150} showsPagination={false}>
                {renderJSX}
            </Swiper>
        );
    }
}

module.exports = Slider;