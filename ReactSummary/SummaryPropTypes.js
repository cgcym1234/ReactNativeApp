/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

'use strict';

var React = require('react-native');

var {
    Text,
    View,
    PropTypes,
    Component
    } = React;

var styles = StyleSheet.create({
    container: {
        flex: 1
    },
});

const propTypes = {
    /*
        可以声明prop为指定的js基本类型，
        默认情况下，这些prop都是可传可不传的
     */
    optionalArray:PropTypes.array,
    optionalBool:PropTypes.bool,

    /*
    * 指定为必须传递的，否则会报警告
    * */
    requiredNumber:PropTypes.number.required,
    requiredString:PropTypes.string.required,

    requiredObject:PropTypes.object.required,
    requiredFunc:PropTypes.object.func,
};

React.createClass({
    propTypes: {

    },
});

class SummaryPropTypes extends Component {
    render() {
        
    }
}

module.exports = SummaryPropTypes;













