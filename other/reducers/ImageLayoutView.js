/**
 * Created by chesterlee on 16/5/19.
 */

'use strict';

import * as types from '../constants/ImageLayoutActionTypes';

const initialState = {
	loading: false,
}

//处理消息
export default function ImageLayoutViewActions(state = initialState, action) {
	switch (action.type) {
		case types.ImageLayout_ACTION:
			return Object.assign({}, state, {
				loading: true,
			});
		default:
			return state;
	}
}
