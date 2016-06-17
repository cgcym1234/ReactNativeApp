/**
 * Created by chesterlee on 16/5/19.
 */

'use strict';

import * as types from '../constants/MainActionTypes';

const initialState = {
	loading: false,
	beShowState: false,
	titleContent:'first',
}


///处理消息，如果发出了Action_One、Two，则修改状态
export default function category(state = initialState, action) {
	switch (action.type) {
		case types.MAIN_ACTION_ONE:
			return Object.assign({}, state, {
				loading: true,
                beShowState :true,
				// titleContent:'first',
			});
		case types.MAIN_ACTION_TWO:
			return Object.assign({}, state, {
				loading: false,
				beShowState :false,
				// titleContent:'first',
			})
		case types.MAIN_ACTION_Ex:
			return Object.assign({}, state, {
				loading: false,
				beShowState: !state.beShowState,
				titleContent:'second'
			})
		default:
			return state;
	}
}
