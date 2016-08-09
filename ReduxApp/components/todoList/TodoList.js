/**
 * Created by sihuan on 16/6/14.
 */

'use strict';

import React, {
    StyleSheet,
    Component,
    View,
    Text,
    ListView,
    PropTypes,
    TouchableHighlight
} from 'react-native';

import Todo from './Todo';

var styles = StyleSheet.create({
    row: {
        height:44,
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: '#F6F6F6',
    },
    separator: {
        height: 1,
        backgroundColor: '#CCCCCC',
    },
    listview: {
        backgroundColor: '#B0C4DE',
    },
});

export default class TodoList extends Component {
    render() {
        return (
            <View
                style={styles.listview}>
                {this.props.todos.map(this.renderRow.bind(this))}
            </View>
        )
    }

    renderRow(rowData, index) {
        return (
            <Todo
                {...rowData}
                key={index}
                style={styles.row}
                onClick={ () => { this.props.onTodoClick(index); console.log(index);} }
                />
        );
    }

}

TodoList.propTypes = {
    onTodoClick: PropTypes.func.isRequired,
    todos: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired
    }).isRequired).isRequired
};
























