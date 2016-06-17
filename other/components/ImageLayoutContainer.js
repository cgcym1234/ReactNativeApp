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
import ImageLayoutView from '../components/ImageLayoutView';
import * as ImageLayoutActions from '../actions/ImageLaytoutActions'


class ImageLayoutContainer extends Component {

  componentDidMount() {
    // start
    console.log(ImageLayoutActions);
  }
  
  //第三种react-redux写法 
  render() {
    return (
      <ImageLayoutView {...this.props}/>
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
  const {ImageLayout} = state;
  return {
    ImageLayout
  };
}

//配合第三种写法
export default connect(mapStateToProps, mapDispatchToProps)(ImageLayoutContainer);

// export default connect((state)=>({
//     propsValue: state
// }))(mainContainer);

