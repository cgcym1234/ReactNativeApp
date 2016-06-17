/**
 * Created by kenny on 16/4/28.
 */
'use strict';
import React, {
  Component,
  View
} from 'react-native';


import {connect} from 'react-redux';
import {Actions, Scene, Reducer, Router} from 'react-native-router-flux';

import { bindActionCreators } from 'redux';
import ImageFlexView from '../components/ImageFlexView';
import * as ImageLayoutActions from '../actions/ImageLaytoutActions'


class ImageFlexContainer extends Component {

  componentDidMount() {
    // start
    console.log(ImageLayoutActions);
  }
  
  //第三种react-redux写法 
  render() {
    return (
      <ImageFlexView {...this.props}/>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ImageLayoutActions, dispatch)
  };
}

//映射函数
function mapStateToProps(state) {
  const {ImageFlex} = state;
  return {
    ImageFlex
  };
}

//配合第三种写法
export default connect(mapStateToProps, mapDispatchToProps)(ImageFlexContainer);

// export default connect((state)=>({
//     propsValue: state
// }))(mainContainer);

