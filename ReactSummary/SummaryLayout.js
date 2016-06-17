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
    PixelRatio,
    Text,
    View,
    ScrollView,
    NavigatorIOS,
    Image,
    } = React;

var styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20
    },
    text: {
        fontSize: 18,
        color: 'green',
        alignSelf: 'center'
    },
    textBlack: {
        color: 'white',
        backgroundColor: 'black',
        fontSize: 16,
    },
    textRed: {
        color: 'white',
        backgroundColor: 'red',
        fontSize: 16,
    },
    textBlue: {
        color: 'white',
        backgroundColor: 'blue',
        fontSize: 16,
        flex:1,
    },
    baseText: {
        fontFamily: 'Cochin',
        color: 'white'
    },
    titleText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    flexRowContainer: {
        // 容器需要添加direction才能变成让子元素flex
        flexDirection: 'row',
        height: 50,
    },
    cell: {
        flex: 1,
        backgroundColor: '#aaaaaa',
        borderWidth: 0.5,
        textAlign: 'center',
    },
    welcome: {
        fontSize: 18,
        textAlign: 'center',
        margin: 10
    },
    circle: {
        backgroundColor: '#fe0000',
        borderRadius: 15,
        width: 30,
        height: 30
    },
});

var SummaryLayout = React.createClass ({

    render: function() {

        /*获取频幕尺寸和像素比例,iphone6为例*/
        console.log('width = '+ Dimensions.get('window').width);
        console.log('height = '+ Dimensions.get('window').height);
        console.log('PixelRatio.get() = '+ PixelRatio.get() );

        /*打印如下：
         width=375
         height=667
         PixelRatio.get() = 2
         * */

        return (
            <ScrollView style={styles.container}>

                <Text style={styles.text}>
                flexDirection demo
                </Text>

                <View style={{flexDirection: 'row', flex:0, flexWrap:'wrap',  backgroundColor: '#333333'}}>
                    <Text style={styles.textRed}>
                    1-容器flexDirection=row
                    </Text>

                    <View style={{width:10, }}/>

                    <Text style={styles.textRed}>
                    2-横着的
                    </Text>
                </View>

                <View style={{height:20}}/>

                <View style={{flexDirection: 'column',backgroundColor: '#333333'}}>
                    <Text style={styles.textRed}>
                    1-容器flexDirection=column(默认)
                    </Text>
                    <View style={{height:10}}/>
                    <Text style={styles.textRed}>
                    2-竖着的
                    </Text>
                </View>

                <View style={{height:20}}/>
                <Text style={styles.text}>
                justifyContent demo
                </Text>

                <View style={{flexDirection: 'row', justifyContent:'flex-start',backgroundColor: '#333333', height:40}}>
                    <Text style={styles.textRed}>
                    flex-start（默认）
                    </Text>
                    <View style={{width:20, height:20, marginLeft:10, backgroundColor: 'orange'}}/>
                    <View style={{width:30, height:20, marginLeft:10, backgroundColor: 'orange'}}/>
                    <View style={{width:20, height:20, marginLeft:10, backgroundColor: 'orange'}}/>
                </View>

                <View style={{height:20}}/>
                <View style={{flexDirection: 'row', justifyContent:'flex-end',backgroundColor: '#333333', height:40}}>
                    <Text style={styles.textRed}>
                    flex-end
                    </Text>
                    <View style={{width:20, height:20, marginLeft:10, backgroundColor: 'orange'}}/>
                    <View style={{width:30, height:20, marginLeft:10, backgroundColor: 'orange'}}/>
                    <View style={{width:20, height:20, marginLeft:10, backgroundColor: 'orange'}}/>
                </View>

                <View style={{height:20}}/>
                <View style={{flexDirection: 'row', justifyContent:'center',backgroundColor: '#333333', height:40}}>
                    <Text style={styles.textRed}>
                    center
                    </Text>
                    <View style={{width:20, height:20, marginLeft:10, backgroundColor: 'orange'}}/>
                    <View style={{width:30, height:20, marginLeft:10, backgroundColor: 'orange'}}/>
                    <View style={{width:20, height:20, marginLeft:10, backgroundColor: 'orange'}}/>
                </View>

                <View style={{height:20}}/>
                <View style={{flexDirection: 'row', justifyContent:'space-between',backgroundColor: '#333333', height:40}}>
                    <Text style={styles.textRed}>
                    space-between
                    </Text>
                    <View style={{width:20, height:20, marginLeft:10, backgroundColor: 'orange'}}/>
                    <View style={{width:30, height:20, marginLeft:10, backgroundColor: 'orange'}}/>
                    <View style={{width:20, height:20, marginLeft:10, backgroundColor: 'orange'}}/>
                </View>

                <View style={{height:20}}/>
                <View style={{flexDirection: 'row', justifyContent:'space-around',backgroundColor: '#333333', height:40}}>
                    <Text style={styles.textRed}>
                    space-around
                    </Text>
                    <View style={{width:20, height:20, marginLeft:10, backgroundColor: 'orange'}}/>
                    <View style={{width:30, height:20, marginLeft:10, backgroundColor: 'orange'}}/>
                    <View style={{width:20, height:20, marginLeft:10, backgroundColor: 'orange'}}/>
                </View>


                <View style={{height:20}}/>
                <Text style={styles.text}>
                alignItems demo
                </Text>

                <View style={{flexDirection: 'row', alignItems:'flex-start',backgroundColor: '#333333', height:60}}>
                    <Text style={styles.textRed}>
                    flex-start（默认）
                    </Text>
                    <View style={{width:20, height:30, marginLeft:10, backgroundColor: 'orange'}}/>
                    <View style={{width:20, height:20, marginLeft:10, backgroundColor: 'orange'}}/>
                    <View style={{width:20, height:40, marginLeft:10, backgroundColor: 'orange'}}/>
                </View>

                <View style={{height:20}}/>
                <View style={{flexDirection: 'row', alignItems:'flex-end',backgroundColor: '#333333', height:60}}>
                    <Text style={styles.textRed}>
                    flex-end
                    </Text>
                    <View style={{width:20, height:30, marginLeft:10, backgroundColor: 'orange'}}/>
                    <View style={{width:20, height:20, marginLeft:10, backgroundColor: 'orange'}}/>
                    <View style={{width:20, height:40, marginLeft:10, backgroundColor: 'orange'}}/>
                </View>

                <View style={{height:20}}/>
                <View style={{flexDirection: 'row', alignItems:'center',backgroundColor: '#333333', height:60}}>
                    <Text style={styles.textRed}>
                    center
                    </Text>
                    <View style={{width:20, height:30, marginLeft:10, backgroundColor: 'orange'}}/>
                    <View style={{width:20, height:20, marginLeft:10, backgroundColor: 'orange'}}/>
                    <View style={{width:20, height:40, marginLeft:10, backgroundColor: 'orange'}}/>
                </View>

                <View style={{height:20}}/>
                <View style={{flexDirection: 'row', alignItems:'stretch',backgroundColor: '#333333', height:60}}>
                    <Text style={styles.textRed}>
                    stretch
                    </Text>
                    <View style={{width:20, height:30, marginLeft:10, backgroundColor: 'orange'}}/>
                    <View style={{width:20, height:20, marginLeft:10, backgroundColor: 'orange'}}/>
                    <View style={{width:20, height:40, marginLeft:10, backgroundColor: 'orange'}}/>
                </View>




                <View style={{height:20}}/>
                <Text style={styles.text}>
                flex demo
                </Text>

                <View style={{flexDirection: 'row',backgroundColor: '#333333', height:60}}>
                    <Text style={{color: 'white', backgroundColor: 'red', fontSize: 16, flex:0, marginLeft:10}}>flex:0</Text>
                    <Text style={{color: 'white', backgroundColor: 'red', fontSize: 16, width:60, marginLeft:10}}>width:60</Text>
                    <Text style={{color: 'white', backgroundColor: 'red', fontSize: 16, flex:1, marginLeft:10}}>flex:1</Text>
                    <Text style={{color: 'white', backgroundColor: 'red', fontSize: 16, flex:1, width:600,marginLeft:10}}>flex:1{'\n'}width无效</Text>
                    <Text style={{color: 'white', backgroundColor: 'red', fontSize: 16, flex:2, height:40,marginLeft:10}}>flex:2{'\n'}height:40</Text>
                </View>






                <View style={{height:20}}/>
                <Text style={styles.text}>
                alignSelf demo, 黑色容器alignItems: 'center'
                </Text>

                <View style={{flexDirection: 'column',backgroundColor: '#333333', height:180,  alignItems: 'center'}}>
                    <Text style={{color: 'white', backgroundColor: 'red', fontSize: 16, alignSelf:'auto'}}>auto</Text>
                    <View style={{height:10}}/>
                    <Text style={{color: 'white', backgroundColor: 'red', fontSize: 16, alignSelf:'flex-start'}}>flex-start</Text>
                    <View style={{height:10}}/>
                    <Text style={{color: 'white', backgroundColor: 'red', fontSize: 16, alignSelf:'flex-end'}}>flex-end</Text>
                    <View style={{height:10}}/>
                    <Text style={{color: 'white', backgroundColor: 'red', fontSize: 16, alignSelf:'center'}}>center</Text>
                    <View style={{height:10}}/>
                    <Text style={{color: 'white', backgroundColor: 'red', fontSize: 16, alignSelf:'stretch'}}>stretch</Text>
                </View>







                <View style={{height:20}}/>
                <Text style={styles.text}>
                borderWidth demo
                </Text>

                <View style={{flexDirection: 'row',backgroundColor: '#333333', height:60}}>
                    <Text style={{color: 'white', backgroundColor: 'red', fontSize: 16, flex:1, margin:5, borderWidth:1,borderStyle:'solid', borderColor:'white'}}>borderWidth:1</Text>
                    <Text style={{color: 'white', backgroundColor: 'red', fontSize: 16, flex:1, margin:5, borderWidth:2, borderStyle:'dashed',borderColor:'white'}}>borderWidth:2</Text>
                    <Text style={{color: 'white', backgroundColor: 'red', fontSize: 16, flex:1, margin:5, borderWidth:3, borderColor:'white'}}>borderWidth:3</Text>
                    <Text style={{color: 'white', backgroundColor: 'red', fontSize: 16, flex:1, margin:5, borderWidth:4, borderColor:'white'}}>borderWidth:4</Text>
                </View>












                <View style={{height:20}}/>
                <Text style={styles.text}>
                margin和padding demo
                </Text>

                <View style={{flexDirection: 'row',backgroundColor: '#333333', height:100}}>
                    <View style={{backgroundColor: 'orange',flex:1, margin:10, padding:15}}>
                        <Text style={{color: 'white', backgroundColor: 'red', fontSize: 16, flex:1}}>
                        橙色View设置margin:10, padding:15 效果
                        </Text>
                    </View>

                </View>

















                <View style={{height:20}}/>
                <Text style={styles.text}>
                绝对定位和相对定位demo
                </Text>

                <View style={{flex: 1, height: 300, backgroundColor: '#333333'}}>
                    <View style={{height:20, width:100, backgroundColor: 'orange'}}/>
                    <View style={[styles.circle, {position: 'absolute', top: 10, left: 10}]}/>
                    <Text style={[styles.text,{marginTop:10}]}> 圆球单独使用绝对定位'absolute'时，它的位置是相对于父容器的，而且它后面view的位置是相对圆球前一个view的 </Text>
                    <View style={{height:20, width:100, backgroundColor: 'red'}}/>

                    <View style={[styles.circle, {position: 'relative', top: 10, left: 10}]}/>
                    <Text style={[styles.text,{marginLeft:0}]}> 圆球单独使用相对定位'relative'时，它的位置是相对于前一个view的,它后面view的位置是相对圆球的 </Text>
                    <View style={{height:20, width:100, backgroundColor: 'red'}}/>

                </View>










                <View style={{height:20}}/>
                <Text style={styles.text}>
                水平垂直居中demo
                </Text>

                <View style={{height: 100, backgroundColor: '#333333', alignItems: 'center'}}>
                    <View style={{backgroundColor: '#fefefe', width: 30, height: 30, borderRadius: 15}}/>
                    <Text style={styles.textBlack}>
                    水平居中
                    </Text>
                </View>

                <View style={{height:20}}/>

                <View style={{height: 100, backgroundColor: '#333333', justifyContent: 'center'}}>
                    <View style={{backgroundColor: '#fefefe', width: 30, height: 30, borderRadius: 15}}/>
                    <Text style={styles.textBlack}>
                    垂直居中
                    </Text>
                </View>

                <View style={{height:20}}/>

                <View style={{height: 100, backgroundColor: '#333333', alignItems: 'center', justifyContent: 'center'}}>
                    <View style={{backgroundColor: '#fefefe', width: 30, height: 30, borderRadius: 15}}/>
                    <Text style={styles.textBlack}>
                    水平垂直居中
                    </Text>
                </View>





            </ScrollView>
        );

    }
})



module.exports = SummaryLayout;

















