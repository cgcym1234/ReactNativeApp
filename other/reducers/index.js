/**
 * Created by chesterlee on 16/4/26.
 */
'use strict';

import {combineReducers} from 'redux';
import MTMain from './MTMain';
import ImageLayout from './ImageLayoutView';
import ImageFlex from './ImageFlexView'



let rootReducer = combineReducers({
    MTMain,
    ImageLayout,
    ImageFlex
});

export default rootReducer;