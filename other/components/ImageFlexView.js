/**
 * Created by chesterlee on 16/5/30.
 */


/**
 * 这里主要使用flexbox来进行页面布局
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
    TextInput,
    Dimensions,
    TouchableHighlight,
    Image,
    // NativeModules
} from 'react-native';

import * as ImageCache from '../util/Imagecache';

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
        backgroundColor: '#CCFFFF',
    },

    // 中间容器加入flex元素，撑满中间中间区域
    login_middle_content: {
        flex: 1,
        backgroundColor: '#99CCFF',
        flexDirection: 'column',
        borderTopWidth: 0.5,
        borderColor: '#6699CC'
    },

    //==========login_布局============//
    login_middle_cell: {

        backgroundColor: '#99CCCC',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#6699CC',

        //flex布局
        flex: 1,
        flexDirection: 'row',
    },

    login_middle_cell_gap: {
        width: 9,
        backgroundColor: '#CCCCFA'
    },

    // 手机号icon 
    login_middle_cell_icon: {
        width: 32,
        height: 32,
        backgroundColor: '#CCFF99',
    },

    // 手机号输入框
    login_middle_cell_InputText: {
        flex: 1,
        fontFamily: 'Cochin',
        backgroundColor: '#FFFFCC'
    },

    // 清除手机号按钮
    login_middle_cell_cleanbtn: {
        width: 15,
        height: 15,
        backgroundColor: '#993366',
    },

    // 获取验证码
    login_middle_cell_verifybtn: {
        height: 98 / 2,
        width: 112,
        backgroundColor: '#CCCCFF',
        alignItems: 'center',
        flexDirection: 'row',
    },

    // 点击获取验证码
    login_middle_cell_verify_Text: {
        flex: 1,
        color: '#FF6600',
        textAlign: 'center',
        backgroundColor: '#99CC66',//设置对应的背景色，易于观察
    },

    // 下行容器
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

const inputPhoneType = 'inputPhoneType'
const inputPasswordType = 'inputPasswordType'

class ImageFlex extends React.Component {

    constructor(props) {
        super(props);

        console.log('test');
        var {height, width} = Dimensions.get('window');
        console.log('test');
        this.state = {
            //
            phoneText: '',
            phoneInoutPlaceholder: '请输入电话号码',
            passwordText: '',
            passwordPlaceHolder: '请输入验证码',
            beShowImage: true
        };
    }

    //初始化
    componentDidMount() {
        //nothing to do
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

    //暂不使用
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

    componentWillUpdate(nextProps, nextState) {
        console.log('componentWillUpdate');
    }

    //是否更新view
    shouldComponentUpdate(nextProps, nextState) {
        console.log('shouldComponentUpdate');
        return true;
    }

    componentDidUpdate(nextProps, nextState) {
        console.log('componentDidUpdate');
    }

    //输入更新Text
    _updateInputText(text, inputIDType) {

        if (inputIDType == inputPhoneType) {
            this.setState(
                {
                    phoneText: text,
                }
            )
        }
        else {
            this.setState(
                {
                    passwordText: text,
                }
            )
        }
    }

    //清理显示
    _cleanIphoneInputText(inputIDType) {
        if (inputIDType == inputPhoneType) {
            this.setState(
                {
                    phoneText: '',
                }
            )
        }
        else {
            this.setState(
                {
                    passwordText: '',
                }
            )
        }
    }

    //显示清理按钮业务
    _renderCleanButton(inputIDType) {
        if (
            (inputIDType == inputPhoneType &&
                this.state.phoneText == '') ||
            (inputIDType == inputPasswordType &&
                this.state.passwordText == '')
        ) {
            return (<View/>)
        }
        else {
            return (
                <TouchableHighlight
                    onPress={this._cleanIphoneInputText.bind(this, inputIDType) }
                    >
                    <View style = {styles.login_middle_cell_cleanbtn}>
                    </View>
                </TouchableHighlight>
            )
        }
    }



    // 点击获取验证码
    _getValidNumber() {

this.setState({
            beShowImage: false
        })
        ImageCache.ImageCacheSize(function (imageCaches) {
            //当前的imageCache
            console.log(imageCaches);
        })

        ImageCache.CleanImageCache(function () {
            //completeCleanCache 
            console.log('clear cache complete')
        });

        

        // var test = NativeModules.ImageLoader;
        // var RCTImageLoader = NativeModules.RCTImageLoader;

        // test.whatsGoingOn('what!!!!',function (value,cacheusage) {
        //     console.log(value);
        // });

        Alert.alert(
            '获取验证码',
            '已发送请求',
            [
                { text: '好的', onPress: () => console.log('OK Pressed!') },
            ]
        );
    }

    _renderImageView() {

        if (this.state.beShowImage == true) {
            
            return (
                <View>
                    <Text>图片</Text>
                    <Image source={{ uri: 'https://facebook.github.io/react/img/logo_og.png' }}
                        style={{ width: 200, height: 200 }} />
                </View>
            )
        }
        else {
                return (
                <View>
                    <Text>无图片</Text>
                </View>
            )
        }
    }

    //渲染第一行
    renderInputCellOne() {
        return (
            <View style = {styles.login_middle_cell}>
                <View style = {styles.login_middle_cell_gap}></View>
                <View style = {styles.login_middle_cell_icon}></View>
                <View style = {styles.login_middle_cell_gap}></View>
                <TextInput
                    style = {styles.login_middle_cell_InputText}
                    onChangeText={(text) => this._updateInputText(text, inputPhoneType) }
                    placeholder = {this.state.phoneInoutPlaceholder}
                    value={this.state.phoneText}
                    />
                <View style = {styles.login_middle_cell_gap}/>
                {this._renderCleanButton(inputPhoneType) }
                <View style = {styles.login_middle_cell_gap}/>
            </View>
        );
    }

    //渲染第二行
    renderInputCellTwo() {
        return (
            <View style = {styles.login_middle_cell}>
                <View style = {styles.login_middle_cell_gap}></View>
                <View style = {styles.login_middle_cell_icon}></View>
                <View style = {styles.login_middle_cell_gap}></View>
                <TextInput
                    style = {styles.login_middle_cell_InputText}
                    onChangeText={(text) => this._updateInputText(text, inputPasswordType) }
                    placeholder = {this.state.passwordPlaceHolder}
                    value={this.state.passwordText}
                    />
                <View style = {styles.login_middle_cell_gap}/>
                {this._renderCleanButton(inputPasswordType) }
                <View style = {styles.login_middle_cell_gap}/>
                <TouchableHighlight
                    style = {styles.login_middle_cell_verifybtn}
                    onPress={this._getValidNumber.bind(this) }
                    >
                    <Text style = {styles.login_middle_cell_verify_Text}>
                        点击获取验证码
                    </Text>
                </TouchableHighlight>
            </View>
        );
    }

    render() {
        return (
            <View style = {
                [styles.base_container,]
            } >
                <View style = {styles.login_state_view}></View>
                <View style = {styles.login_upper_container}>

                    <View style = {styles.login_upper_crisp}>
                    </View>
                    <View style = {styles.login_upper_header}>
                    </View>
                </View>


                <View style = {styles.login_middle_container}>
                    <View style = {styles.login_middle_content}>
                        { this.renderInputCellOne() }
                        { this.renderInputCellTwo() }
                    </View>
                </View>

                <View style = {styles.login_down_container}>
                    {this._renderImageView() }
                </View>

            </View>
        );
    }
}

module.exports = ImageFlex;