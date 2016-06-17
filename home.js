/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

'use strict';

var React = require('react-native');
var SummaryLayout = require('./ReactSummary/SummaryLayout');
var SummaryAnimation = require('./ReactSummary/SummaryAnimation');
var SummaryLifeCycle = require('./ReactSummary/SummaryLifeCycle');

var TitleIndicatorView = require('./MllHome/TitleIndicatorView');
var YYHorizontalPageView = require('./MllHome/YYHorizontalPageView');
var YYThreeImageView = require('./MllHome/YYThreeImageView');
var YYTwoImageView = require('./MllHome/YYTwoImageView');

var {
    AppRegistry,
    PropTypes,
    StyleSheet,
    Text,
    ScrollView,
    View,
    Component,
    Image,
    TouchableHighlight,
    } = React;

var ExportManager = require('react-native').NativeModules.ExportManager;

var styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    text: {
        color: 'black',
        backgroundColor: 'white',
        fontSize: 30,
    }
});


var FloorOrderKey = [
    "khapp_syzrk",
    "M_sy1f",//调整为requestSecKillData
    "M_sy2f",
    "M_sy3f",
    "M_sy4f",
    "M_sy5f",
    "M_sy6f",
    "M_sy7f",
    "M_sy8f",
    //                         @"khapp_syxgt",
];

const CommonModel = {
    src: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    desc: PropTypes.string,
    order: PropTypes.string,
};

var AdCommonApi = 'http://www.meilele.com/mll_api/api/ad_common_api';
var AdUrl = AdCommonApi + '?ad_code=khapp_syjdt&city_id=272';
var HomeUrl = AdCommonApi+'?ad_code=khapp_syzrk,M_sy2f,M_sy3f,M_sy4f,M_sy5f,M_sy6f,M_sy7f,M_sy8f';
var SecKillUrl = "http://www.meilele.com/core_api/AppYbj/apigetSecInfo/";
var ImageBaseUrl = 'http://image.meilele.com/';


class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            adArray: [],
            floorDict: [],
            secKillDict: []
        };
    }

    componentWillMount() {
        this.fetchAdData();
        this.fetchSecKillData();
        this.fetchFloorData();
    }

    componentDidMount() {
        // this.fetchFloorData();
    }

    fetchAdData() {
        //获取轮播广告数据
        fetch(AdUrl)
        .then(response => response.json())
        .then(responseData => {
            this.setState({
                adArray: responseData["khapp_syjdt"]
            });
        })
    }

    fetchSecKillData() {
        //获取秒杀数据
        fetch(SecKillUrl)
            .then((response) => response.json())
            .then((responseData) => {
                var data = [];
                if (responseData && responseData["error"] == 0) {
                    data = responseData["data"];
                }
                this.setState({
                    secKillDict: data
                });
            })
            .done();
    }

    fetchFloorData() {
        //获取活动楼层数据
        fetch(HomeUrl)
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({
                    floorDict: responseData,
                });
            })
            .done();

    }

    deepCopy(obj) {
        var str, newobj = obj.constructor === Array ? [] : {};
        if(typeof obj !== 'object'){
            return;
        } else if(window.JSON){
            str = JSON.stringify(obj), //系列化对象
                newobj = JSON.parse(str); //还原
        } else {
            for(var i in obj){
                newobj[i] = typeof obj[i] === 'object' ?
                    cloneObj(obj[i]) : obj[i];
            }
        }
        return newobj;
    }

    convertDataToIndicatorViewData(commonModelarray) {
        var dict = [];
        if (commonModelarray && commonModelarray.length > 0) {
            var commonModel = commonModelarray[0];
            dict["title"] = commonModel.desc;
            dict["subTitle"] = "更多";
            dict["link"] = commonModel.url;
        }
        return dict;
    }

    arrayFromCommonModelarray(commonModelarray, startIndex) {
        var array = [];
        if (commonModelarray) {
            var arrayCopy = this.deepCopy(commonModelarray);
            if (startIndex > 0 && startIndex < commonModelarray.length) {
                array = arrayCopy.slice(startIndex);
            } else {
                array = arrayCopy;
            }
            
            for (var i = 0; i < array.length; i++) {
                var commonModel = array[i];
                commonModel.src = ImageBaseUrl + commonModel.src;
            }
        }

        return array;
    }

    renderBanner(adArray) {
        //if (adArray) {
        //        return (
        //            <YYSwiper
        //                      dataArray={this.arrayFromCommonModelarray(adArray)}
        //                      onItemClicked={this.onItemClicked}/>
        //        );
        //    }
        return <View />;
    }

    renderSecKillView(secKillDict) {
        if (secKillDict) {
            var secKillItemArray = secKillDict["sec_info"];
            if (secKillItemArray && secKillItemArray.length > 0) {
                var secKillTitleModel = [];
                secKillTitleModel["title"] = secKillDict["title"];
                secKillTitleModel["subTitle"] = "更多";
                secKillTitleModel["link"] = secKillDict["title_url"];

                return (
                    <View>
                        <TitleIndicatorView dataDict={secKillTitleModel} onItemClicked={this.onItemClicked}/>
                        <YYHorizontalPageView dataArray={secKillItemArray} style={{height:120}} onItemClicked={this.onItemClicked}/>
                    </View>
                );
            }
        }
        return <View />;
    }

    renderThreeImageFloorView(floorDict, floorIndex, layoutType) {
        if (floorDict && layoutType && floorIndex > 0 && floorIndex < FloorOrderKey.length) {
            var floorData = floorDict[FloorOrderKey[floorIndex]];
            if (floorData) {
                return (
                    <View>
                        <TitleIndicatorView dataDict={this.convertDataToIndicatorViewData(floorData)}
                                            onItemClicked={this.onItemClicked}/>
                        <YYThreeImageView
                            dataArray={this.arrayFromCommonModelarray(floorData, 1)}
                            layoutType={layoutType}
                            onItemClicked={this.onItemClicked}/>
                    </View>
                );
            }
        }
        return <View />;
    }

    renderTwoImageFloorView(floorDict, floorIndex) {
        if (floorDict && floorIndex > 0 && floorIndex < FloorOrderKey.length) {
            var floorData = floorDict[FloorOrderKey[floorIndex]];
            if (floorData) {
                return (
                    <View>
                        <YYTwoImageView dataArray={this.arrayFromCommonModelarray(floorData)}
                                        onItemClicked={this.onItemClicked}/>
                    </View>
                );
            }
        }
        return <View />;
    }

    /*统一回调管理*/
    onItemClicked(urlString) {
        console.log('main ' + urlString);
        ExportManager.didClickedItemWithUrlString(urlString);
    }

    render() {
        return (
            <ScrollView>

                {this.renderSecKillView(this.state.secKillDict)}

                {this.renderThreeImageFloorView(this.state.floorDict, 2, "LayoutTypeBigImageLeft")}

                {this.renderTwoImageFloorView(this.state.floorDict, 3)}

                {this.renderThreeImageFloorView(this.state.floorDict, 4, "LayoutTypeBigImageRight")}

                {this.renderThreeImageFloorView(this.state.floorDict, 5, "LayoutTypeBigImageLeft")}

                {this.renderTwoImageFloorView(this.state.floorDict, 6)}

                {this.renderThreeImageFloorView(this.state.floorDict, 7, "LayoutTypeBigImageRight")}

                {this.renderThreeImageFloorView(this.state.floorDict, 8, "LayoutTypeBigImageLeft")}

            </ScrollView>

        );
    }
}

AppRegistry.registerComponent('app', () => Main);





