/**
 * Created by sihuan on 16/6/15.
 */

"use strict";

import React, { StyleSheet, Text, TouchableOpacity, PropTypes } from 'react-native';

const styles = StyleSheet.create({
    button: {
        height: 20,
        padding: 20,
        backgroundColor: 'lightgray',
        alignItems: 'center',
        justifyContent: 'center',

        margin: 5
    }
});

const YYButton = (props) => {
    const { title, onClick } = props;

    return (
        <TouchableOpacity
            onPress={onClick}
            style={styles.button}>

            <Text>{title}</Text>
        </TouchableOpacity>
    )
};

YYButton.propTypes = {
    title: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
};

export default YYButton;



