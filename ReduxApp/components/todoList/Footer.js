/**
 * Created by sihuan on 16/6/15.
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
        flexDirection: 'row',
    },
    text: {
        color: 'blue',
    },
    listview: {
        backgroundColor: '#B0C4DE',
    },
});


export default class Footer extends Component {
    render() {
        return (
            <View style={styles.row}>
                <Text>Show:{" "}</Text>
                {this.renderFilter('SHOW_ALL', 'All')}
                {this.renderFilter('SHOW_COMPLETED', 'Completed')}
                {this.renderFilter('SHOW_ACTIVE', 'Active')}
            </View>
        );
    }

    renderFilter(filter, name) {
        if (filter === this.props.filter) {
            return (
                <Text>
                    {name+" "}
                </Text>
            );
        }
        return (
            <TouchableHighlight onPress={ e => this.props.onFilterChange(filter)}
                                underlayColor='#dddddd'>
                <Text style={styles.text}>
                    {name+" "}
                </Text>
            </TouchableHighlight>
        );
    }
}

Footer.propTypes = {
    onFilterChange: PropTypes.func.isRequired,
    filter: PropTypes.oneOf([
        'SHOW_ALL',
        'SHOW_COMPLETED',
        'SHOW_ACTIVE'
    ]).isRequired
};










