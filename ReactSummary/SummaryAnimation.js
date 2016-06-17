/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

'use strict';

var React = require('react-native');

var Dimensions = require('Dimensions');


var {
    AppRegistry,
    StyleSheet,
    View,
    Text,
    Image,
    Animated,
    TouchableOpacity,
    LayoutAnimation,
    Component,
    } = React;


var {
    width,
    height
    } = Dimensions.get('window');

var SquareNum = 60;
var SpringConfig = {tension: 2, friction: 3};

var styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop:100,
        alignItems: 'center',
    },

    square: {
        width: SquareNum,
        height: SquareNum,
        backgroundColor: 'blue'
    },

    button: {
        padding:10,
        backgroundColor: 'black'
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});


class YYView extends View {

    componentWillMount() {
        console.log('YYView componentWillMount');
    }

    componentDidMount() {
        console.log('YYView componentDidMount');
    }

};


/*LayoutAnimation*/
var SummaryAnimation = React.createClass({

    componentWillMount: function() {
        console.log('componentWillMount');
    },

    getInitialState: function() {
        return {w:100, h:100};
    },


    /*
     * configureNext的声明如下，使用时还可以传成功和出错的2个回调函数

     function configureNext(config: Config, onAnimationDidEnd?: Function, onError?: Function);

     另外还可以使用function create(duration: number, type, creationProp): Config;
     创建一个动画持续时间和类型等的Config，传递给configureNext

     duration: 单位 毫秒

     type:
     Types = {
     spring: true,
     linear: true,
     easeInEaseOut: true,
     easeIn: true,
     easeOut: true,
     keyboard: true,
     };

     creationProp:
     Properties = {
     opacity: true,
     scaleXY: true,
     };
     *
     * */
    _onPress:function() {

        /*动画配置创建*/
        var config = LayoutAnimation.create(3000, LayoutAnimation.Types.linear, LayoutAnimation.Properties.scaleXY);

        /*动画更新*/
        LayoutAnimation.configureNext(config);
        this.setState({w: this.state.w + 15, h: this.state.h + 15})
    },

    render: function() {
        console.log('render');
        return (
            <View
                style={styles.container}
                onStartShouldSetResponderCapture={(evt) => false}
                onMoveShouldSetResponderCapture={(evt) => false}>
                <View
                    onStartShouldSetResponder={(evt) => true}

                    onMoveShouldSetResponder={(evt) => false}
                    onResponderGrant={(evt) => console.log('YYView onResponderGrant ' + evt)}
                    onResponderMove={(evt) => console.log('YYView onResponderMove ' + evt)}
                    onResponderRelease={(evt) => console.log('YYView onResponderRelease ' + evt)}

                    onTouchStart={(evt) => console.log('YYView onTouchStart ' + evt)}
                    onTouchMove={(evt) => console.log('YYView onTouchMove ' + evt)}
                    onTouchEnd={(evt) => console.log('YYView onTouchEnd ' + evt)}
                    onTouchCancel={(evt) => console.log('YYView onTouchCancel ' + evt)}
                    style={{width: this.state.w, height: this.state.h, backgroundColor: 'red'}}
                />
                <TouchableOpacity onPress = {this._onPress.bind(this)}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>Press me!</Text>
                    </View>
                </TouchableOpacity>
                <Playground style={{flex:1}}/>
                <AnimatedSquare style={{flex:1,backgroundColor: 'black'}}/>
            </View>

        );
    },

});


/*Animated*/
class Playground extends Component {
    constructor(props: any) {
        super(props);
        /*设置初始值为0*/
        this.state = {
            bounceValue: new Animated.Value(0),
        };
    }

    springAnimation() {
        /*这是一种优化的方式，不会触发render(),动画运行在一个高优先级线程中。
        比调用setState然后重新渲染更快,*/
        this.state.bounceValue.setValue(1.5);     // Start large
        Animated.spring(                          // Base: spring, decay, timing
            this.state.bounceValue,               // Animate `bounceValue`
            {
                toValue: 0.8,                     // Animate to smaller size
                friction: 1,                      // Bouncier spring
            }
        ).start();
    }


    onPress() {
        this.springAnimation();
    }

    componentDidMount() {
        this.springAnimation();
    }

    render() {
        /*注意，点击onPress()后，没有调用render*/
        console.log('Playground render');
        return (
            <View >
                <Animated.Image
                    source={{uri: 'http://segmentfault.com/img/bVmL6Z'}}
                    style={{width:80, height:80, transform:[{scale: this.state.bounceValue},]}}>
                </Animated.Image>

                <TouchableOpacity onPress = {this.onPress.bind(this)}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>Animated!</Text>
                    </View>
                </TouchableOpacity>
            </View>

        );
    }

}

/*组合动画*/
class AnimatedSquare extends Component {
    constructor(props: any) {
        super(props);
        /*设置初始值为0*/
        this.state = {
            pan: new Animated.ValueXY(),
        };
    }

    componentDidMount() {
        this.triggerAnimation();
    }

    onPress() {
        this.triggerAnimation();
    }

    getStyle() {
        return [
            styles.square,
            {transform: this.state.pan.getTranslateTransform()}
        ];
    }

    render() {
        console.log('AnimatedSquare render');
        return (
            <View style={{width:width}}>
                <Animated.View style={this.getStyle()} />

                <TouchableOpacity onPress = {this.onPress.bind(this)}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>AnimatedSquare!</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

    triggerAnimation() {
        /*左右移动的连续动画*/
        Animated.sequence([
            Animated.spring(this.state.pan, {
                ...SpringConfig,
                toValue: {x:width - SquareNum, y:0}
            }),

            Animated.spring(this.state.pan, {
                ...SpringConfig,
                toValue: {x:0, y:0}
            }),
        ]).start();
    }

};


module.exports = SummaryAnimation;














