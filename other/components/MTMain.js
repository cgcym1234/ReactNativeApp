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
} from 'react-native';

var JSXView = require('./SwiperTest');
const styles = StyleSheet.create({

//===================================================//
    Base_Container_Flex:{
        flex:1
    },

    Upper_Container:{
        flexDirection:'column',
        flex:1.1
    },

    Upper_Container_up:{
        flex:1,
        flexDirection:'row'
    },

    Upper_Container_down:{
        flex:0.08,
        backgroundColor: '#CCCCCC'
    },

    Upper_Left:{
        flex:1,
        backgroundColor: '#FFFFCC'
    },

    Upper_Right: {
        flex:2,
        flexDirection: 'column'
    },

    UpperRight_Inner_upper:{
        flex:1,
        backgroundColor: '#CCFFFF'
    },

    UpperRight_Inner_Down_container:{
        flex:1,
        flexDirection: 'row'
    },

    UpperRight_Inner_Down_left:{
        flex:1,
        backgroundColor: '#FFCCCC'
    },

    UpperRight_Inner_Down_right:{
        flex:1,
        backgroundColor: '#99CCCC'
    },
//===================================================//
    Middle_Container:{
        flex:1.1,
        flexDirection:'column'
    },

    Middle_UpperContent_Container:{
        flex:1
    },

    Middle_Common_Content:{
        flex:1,
        backgroundColor: '#0099CC'
    },

    Middle_Common_Container:{
        flex:1,
        flexDirection:'row'
    },

    Middle_left_Right_Content:{
        flex:1
    },

    Middle_Content_Down:{
        flex:0.08,
        backgroundColor: '#CCCCCC'
    },

//===================================================//
    Lower_Container:{
        flex:1,
        backgroundColor: '#FF9999',
        flexDirection:'row'
    },

    Lower_LeftRow:{
        flex:1,
        backgroundColor:'#FFFF00'
    },

    Lower_RightRowContainer:{
        flex:1,
        flexDirection:'column'
    },

    Lower_RightDetailContent:{
        flex:1
    }

});

var sliderImgs = [
    'http://images3.c-ctrip.com/SBU/apph5/201505/16/app_home_ad16_640_128.png',
    'http://images3.c-ctrip.com/rk/apph5/C1/201505/app_home_ad49_640_128.png',
    'http://images3.c-ctrip.com/rk/apph5/D1/201506/app_home_ad05_640_128.jpg'
];

var alertMessage = 'Credibly reintermediate next-generation potentialities after goal-oriented ' +
    'catalysts for change. Dynamically revolutionize.';

var type;
class content extends React.Component {

    constructor(props) {
        super(props);
    }

    //初始化
    componentDidMount() {
       const {doActionOne} = this.props.actions;
        // var test = this.props.doActionOne();
        doActionOne();
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

    handleSliderCallback(url) {
        var showState = this.props.MTMain.beShowState; 
        if (this.props.MTMain.beShowState) {
            Alert.alert(
                'Slider Alert1',
                'call by main :handleSliderCallback, showstate = true, currentURL = ' + url,
                [
                    { text: 'OK', onPress: this.changeShowState(showState)},
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
        const {doActionEx} = this.props.actions;
        doActionEx();
    }

    componentWillUpdate(nextProps, nextState) {
        console.log('componentWillUpdate');
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log('shouldComponentUpdate');
        return true;
    }

    componentWillUpdate(nextProps, nextState) {
        console.log('componentWillUpdate');
    }

    render() {
        //const {titleContent} = this.props;
        // const titleContent = this.props.MTMain.titleContent;
        return(
          <View style={[styles.Base_Container_Flex]}>
          
            <View style={[styles.Upper_Container]}>

                <View style = {[styles.Upper_Container_up]}>

                    <View style={[styles.Upper_Left]}>
                        <Text>1</Text>
                    </View>

                    <View style={[styles.Upper_Right]}>
                        <View style={[styles.UpperRight_Inner_upper]}>
                            <Text>2</Text>
                        </View>

                        <View style={[styles.UpperRight_Inner_Down_container]}>

                            <View style={[styles.UpperRight_Inner_Down_left]}>
                                <Text>{'000'}</Text>
                            </View>
                            <View style={[styles.UpperRight_Inner_Down_right]}>
                                <Text>4</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style = {[styles.Upper_Container_down]}>
                    <Text>间隙</Text>
                </View>
            </View>


            <View style = {[styles.Middle_Container]}>

                <View style = {[styles.Middle_UpperContent_Container]}>

                    <JSXView sliderImages = {this.genSlideData()} clickCallback = {this.handleSliderCallback.bind(this)}>
                    </JSXView>

                    <View style = {[styles.Middle_Common_Container]}>
                        <View style = {[styles.Middle_left_Right_Content,{backgroundColor:'#FFFF66'}]}>
                            <Text>2</Text>
                        </View>
                        <View style = {[styles.Middle_left_Right_Content,{backgroundColor:'#99CC66'}]}>
                            <Text>3</Text>
                        </View>
                    </View>

                    <View style = {[styles.Middle_Common_Container]}>
                        <View style = {[styles.Middle_left_Right_Content,{backgroundColor:'#CC3333'}]}>
                            <Text>4</Text>
                        </View>
                        <View style = {[styles.Middle_left_Right_Content,{backgroundColor:'#336633'}]}>
                            <Text>5</Text>
                        </View>
                    </View>

                </View>

                <View style = {[styles.Middle_Content_Down]}>
                    <Text>间隙</Text>
                </View>
            </View>

            <View style = {[styles.Lower_Container]}>
                <View style = {[styles.Lower_LeftRow]}>
                    <Text>1</Text>
                </View>
                <View style = {[styles.Lower_RightRowContainer]}>
                    <View style = {[styles.Lower_RightDetailContent,{backgroundColor:'#FF0033'}]}>
                        <Text>2</Text>
                    </View>

                    <View style = {[styles.Lower_RightDetailContent,{backgroundColor:'#99CC00'}]}>
                        <Text>3</Text>
                    </View>
                </View>
            </View>

          </View>
        );
    }

    componentDidUpdate(nextProps,nextState){
        console.log('componentDidUpdate');
    }
}

// class Frame extends React.Component{

//     constructor(props) {

//         super(props);
//         this.state = {

//         };
//     }

//     render() {
//         return (
//             <NavigatorIOS style={styles.container}
//                           initialRoute={{
//                     title: '美团',
//                     component: content
//                 }}/>
//         );
//     }
// }



module.exports = content;