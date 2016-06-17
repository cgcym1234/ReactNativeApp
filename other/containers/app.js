/**
 * Created by kenny on 16/4/26.
 */
'use strict';

import React, {
    AppRegistry,
    Component,
    StyleSheet,
    Text,
    View
} from 'react-native';

import {connect} from 'react-redux';
import {Actions, Scene, Reducer, Router, TabBar, Modal} from 'react-native-router-flux';
import {Ionicons} from 'react-native-vector-icons';

import MainContainer from './main-container';
import LoginContainer from './login-container';
import TabView from '../components/tabview';
import Drawer from '../components/drawer';
import CommonStyle from '../styles/common';
import {Focus} from '../actions/route-actions';

class App extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    Welcome to React Native!
                </Text>
                <Text style={styles.instructions}>
                    To get started, edit index.ios.js
                </Text>
                <Text style={styles.instructions}>
                    Press Cmd+R to reload,{'\n'}
                    Cmd+D or shake for dev menusadfa
                </Text>
            </View>
        );
    }
}

const styles = {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
};

export default connect((state)=>({
    scene: state.routes.scene
}))(App);
