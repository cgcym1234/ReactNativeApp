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
import MainView from '../components/MTMain';
import * as mainActions from '../actions/MTMain'
import { bindActionCreators } from 'redux';

class MainContainer extends Component {

  componentDidMount() {
    // start
    console.log(mainActions);
  }

  //第一种写法
  // render() {
  //   const {MTMain} = this.props;
  //   return (
  //     <MainView {...this.props}/>
  //   );
  // }

  //第二种写法--redux
  // render() {
  //   const {MTMain, dispatch} = this.props;
  //   let boundActionCreators = bindActionCreators(mainActions, dispatch);
  //   return (
  //     <MainView MTMain={MTMain}
  //       {...boundActionCreators} />
  //   );
  // }

  //第三种react-redux写法 
  render() {
    return (
      <MainView {...this.props}/>
    );
  }

}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(mainActions, dispatch)
  };
}

//映射函数
function mapStateToProps(state) {
  const {MTMain} = state;
  return {
    MTMain
  };
}

//第二种写法
//export default connect(mapStateToProps)(MainContainer);

//配合第三种写法
export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);

// export default connect((state)=>({
//     propsValue: state
// }))(mainContainer);

