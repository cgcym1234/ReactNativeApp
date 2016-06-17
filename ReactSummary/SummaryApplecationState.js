/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

'use strict';
var React = require('react-native');
var {
    AppStateIOS,
    Text,
    View
} = React;

/*
* iOS 应用程序状态

 AppStateIOS 可以告诉你应用程序是在前台还是在后台，而且状态更新时会通知你。
 在处理推送通知时，AppStateIOS 经常被用于判断目标和适当的行为。

 1.Active - 应用程序在前台运行
 2.Background - 应用程序在后台运行。用户正在使用另一个应用程序或者在主屏幕上。
 3.Inactive - 这是一种过渡状态，目前不会在React Native的应用程序上发生。
* */


var AppStateSubscription = React.createClass({
    getInitialState() {
    return {
        appState: AppStateIOS.currentState,
        previousAppStates: [],
    };
},
componentDidMount: function() {
    AppStateIOS.addEventListener('change', this._handleAppStateChange);
},
componentWillUnmount: function() {
    AppStateIOS.removeEventListener('change', this._handleAppStateChange);
},
_handleAppStateChange: function(appState) {
    var previousAppStates = this.state.previousAppStates.slice();
    previousAppStates.push(this.state.appState);
    this.setState({
        appState,
        previousAppStates,
    });
},
render() {
    if (this.props.showCurrentOnly) {
        return (
            <View>
                <Text>{this.state.appState}</Text>
            </View>
        );
    }
    return (
        <View>
            <Text>{JSON.stringify(this.state.previousAppStates)}</Text>
        </View>
    );
}
});
exports.title = 'AppStateIOS';
exports.description = 'iOS app background status';
exports.examples = [
    {
        title: 'AppStateIOS.currentState',
        description: 'Can be null on app initialization',
        render() { return <Text>{AppStateIOS.currentState}</Text>; }
},
{
    title: 'Subscribed AppStateIOS:',
        description: 'This changes according to the current state, so you can only ever see it rendered as "active"',
    render(): ReactElement { return <AppStateSubscription showCurrentOnly={true} />; }
},
{
    title: 'Previous states:',
        render(): ReactElement { return <AppStateSubscription showCurrentOnly={false} />; }
},
];


module.exports = SummaryApplecationState














