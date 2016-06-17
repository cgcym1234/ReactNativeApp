/**
 * Created by sihuan on 16/6/14.
 */

'use strict';

import React, {
    StyleSheet,
    Component,
    View,
    Text,
    TextInput,
    PropTypes,
    TouchableHighlight
} from 'react-native';

var styles = StyleSheet.create({
    row: {
        height: 44,
        justifyContent: 'center',
        padding: 10,
        backgroundColor: '#F6F6F6',
    },
    separator: {
        height: 1,
        backgroundColor: '#CCCCCC',
    },
    text: {
        flex: 1,
    },
});

export default class Todo extends Component {
    render() {
        return (
            <TouchableHighlight
                style={styles.row}
                onPress={(e) => this.props.onClick}
                underlayColor='#dddddd'>
                <View>
                    <Text style={{
                                  textDecorationLine: this.props.completed ? 'line-through' : 'none',
                                  textDecorationStyle: 'solid'
                                }}>
                        {this.props.text}
                    </Text>
                </View>
            </TouchableHighlight>
        );
    }
}

Todo.propTypes = {
    onClick: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired
};
















