/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
'use strict';

import React, {Component} from 'react-native';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import configureStore from './store/configure-store';
import Main from './containers/main-container';
import ImageLayout from './containers/ImageLayoutContainer';
import ImageFlex from './containers/ImageFlexContainer';


const store = configureStore({MTMain:{a:20}});

export default class Launcher extends Component {
    render() {
        return (
            <Provider store={store}>
                <ImageFlex/>
            </Provider>
        );
    }
}