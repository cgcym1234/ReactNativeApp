/**
 * Created by chesterlee on 16/4/26.
 */

'use strict'



import React, {
    Component,
    StyleSheet,
    Text,
    View,
    ListView,
    NavigatorIOS,
    Alert,
    ScrollView,
    Dimensions,
    TouchableHighlight
} from 'react-native';


// style:
var styles = StyleSheet.create({

    base_container: {
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
        backgroundColor: '#CCCCCC',
    },

    login_state_view: {
        height: 44 / 2,
    },

    //上行容器
    login_upper_container: {
        height: (84 + 44 + 200) / 2,
        backgroundColor: '#FFCC99',
    },

    login_upper_content: {
        flex: 1,
        backgroundColor: '#99CCFF',
    },

    login_upper_crisp: {
        backgroundColor: '#FF9966',
        left: 40 / 2,
        top: 28 / 2,
        height: 40 / 2,
        width: 40 / 2
    },
    login_upper_header: {
        backgroundColor: '#FF6666',
        height: 200 / 2,
        width: 200 / 2,
        top: (84 / 2),
        left: (Dimensions.get('window').width / 2 - (200 / 4)),
        position: 'absolute'
    },

    //中间容器
    login_middle_container: {
        height: 98,
        backgroundColor: '#CCFFFF'
    },

    //下行容器
    login_down_container: {
        height: (30 + 80 + 30 + 24 + 30 + 60) / 2,
        backgroundColor: '#CCFF99'
    }

});

const sliderImgs = [
    'http://images3.c-ctrip.com/SBU/apph5/201505/16/app_home_ad16_640_128.png',
    'http://images3.c-ctrip.com/rk/apph5/C1/201505/app_home_ad49_640_128.png',
    'http://images3.c-ctrip.com/rk/apph5/D1/201506/app_home_ad05_640_128.jpg'
];

class ImageLayout extends React.Component {

    constructor(props) {
        super(props);

        console.log('test');
        var {height, width} = Dimensions.get('window');
        // styles.login_upper_container.height = width;
        // styles.login_down_container.width
        //styles.base_container_flex.height = height;
        console.log('test');
    }

    //初始化
    componentDidMount() {

    }

    genSlideData() {
        //生成数据
        var sliderImgs = [
            'http://images3.c-ctrip.com/SBU/apph5/201505/16/app_home_ad16_640_128.png',
            'http://images3.c-ctrip.com/rk/apph5/C1/201505/app_home_ad49_640_128.png',
            'http://images3.c-ctrip.com/rk/apph5/D1/201506/app_home_ad05_640_128.jpg'
        ];
        return sliderImgs;
    }

    //暂时不使用
    handleSliderCallback(url) {

        if (this.props.MTMain.beShowState) {
            Alert.alert(
                'Slider Alert1',
                'call by main :handleSliderCallback, showstate = true, currentURL = ' + url,
                [
                    { text: 'OK', onPress: this.changeShowState(showState) },
                ]
            );
        }
        else {
            Alert.alert(
                'Slider Alert2',
                'call by main :handleSliderCallback, showstate = false, currentURL = ' + url,
                [
                    { text: 'Cancel', onPress: () => console.log('Cancel Pressed!') },
                    { text: 'OK', onPress: () => console.log('OK Pressed!') },
                ]
            );
        }
    }

    changeShowState() {
        // const {dispatch} = this.props;
        // dispatch(doActionEx());

    }

    componentWillUpdate(nextProps, nextState) {
        console.log('componentWillUpdate');
    }

    //是否更新view
    shouldComponentUpdate(nextProps, nextState) {
        console.log('shouldComponentUpdate');
        return true;
    }

    componentWillUpdate(nextProps, nextState) {
        console.log('componentWillUpdate');
    }

    onPressExit() {
        console.log('on exit');
    }

    render() {


        return (

            <View style = {
                [styles.base_container,]
            } >
                <View style = {styles.login_state_view}></View>
                <View style = {styles.login_upper_container}>
                    <View style = {styles.login_upper_content}>
                        <View style = {styles.login_upper_crisp} onPress= {this.onPressExit}>
                        </View>
                        <View style = {styles.login_upper_header}>
                        </View>
                    </View>
                </View>

                <View style = {styles.login_middle_container}>
                </View>

                <View style = {styles.login_down_container}>
                </View>
            </View>
        );
    }

    componentDidUpdate(nextProps, nextState) {
        console.log('componentDidUpdate');
    }
}

module.exports = ImageLayout;