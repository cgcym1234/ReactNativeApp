/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

'use strict';

var React = require('react-native');

var {
    StyleSheet,
    Image,
    Text,
    View,
    TouchableHighlight,
    Component,
    PropTypes
    } = React;

var styles = StyleSheet.create({
    container: {
        height: 32,
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 10,
        backgroundColor: '#FFFFFF'
    },
    redView: {
        flex: 0,
        height: 32,
        width: 3,
        backgroundColor: '#da0000'
    },
    textTitle: {
        fontSize: 16,
        color: '#333333'
    },
    textSubTitle: {
        fontSize: 13,
        color: '#333333'
    },
    image: {
        width: 12,
        height: 12
    },
    arrowContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        alignSelf: 'flex-end',
        height: 32,
        flex: 1,
        backgroundColor: '#ffffff'
    }

});


const TitleModel = {
    title: PropTypes.string.isRequired,
    subTitle: PropTypes.string.isRequired,
    link: PropTypes.string,
};

const propTypes = {
    dataDict: PropTypes.array.isRequired
};

class TitleIndicatorView extends Component {


    onItemClicked(urlString) {
        console.log('TitleIndicatorView ' + urlString);
        if (this.props.onItemClicked) {
            this.props.onItemClicked(urlString);
        }
    }

    render() {
        var dict = this.props.dataDict;
        if (!dict || !dict.title) {
            return <View />;
        }
        return (
            (<View
                style={styles.container}>

                <View style={styles.redView}/>
                <Text style={styles.textTitle}>{dict.title}</Text>

                {dict.link && dict.link.length > 1 ?
                    <TouchableHighlight style={styles.arrowContainer} onPress={ () => { this.onItemClicked(dict.link) } }
                                        underlayColor={'#eeeeee'} hidden={dict.link.length > 1}>
                        <View style={styles.arrowContainer} hidden={true}>
                            <Text style={styles.textSubTitle}>{dict.subTitle}</Text>
                            <Image style={styles.image} source={{uri:'arrowRight.png'}}/>
                        </View>
                    </TouchableHighlight> : <View/>}

            </View>)
        );
    }

}

TitleIndicatorView.propTypes = propTypes;

module.exports = TitleIndicatorView;














