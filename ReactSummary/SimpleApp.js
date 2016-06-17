
'use strict';

var React = require('react-native');
var { NativeAppEventEmitter } = require('react-native');
var CalendarManager = require('react-native').NativeModules.CalendarManager;

var {
    Text,
    View
    } = React;

var styles = React.StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center'
    }
});

var subscription = NativeAppEventEmitter.addListener('EventReminder', (reminder) => console.log('NativeAppEventEmitter Received ' + reminder.name));

var SimpleApp = React.createClass({

    componentDidMount: function() {
    },

    componentWillUnmount: function() {
        subscription.remove();
    },

    render: function() {
        CalendarManager.addEvent('Birthday Party', '4 Privet Drive, Surrey');
        CalendarManager.getNames((para1,para2,para3) => {
            console.log(para1 + ' ' + para2 + ' ' + para3 + ' ');
        });

        console.log(' firstDayOfTheWeek '+CalendarManager.firstDayOfTheWeek);

        return (
            <View style={styles.container}>
                <Text style={{alignSelf:'center'}}>{this.props.text}</Text>
            </View>
        )
    },
});

React.AppRegistry.registerComponent('SimpleApp', () => SimpleApp);


















