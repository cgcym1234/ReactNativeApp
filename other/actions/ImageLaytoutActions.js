/**
 * Created by chesterlee on 16/5/19.
 */

'use strict';

// ImageLayoutAction和ImageFlex公用
import * as types from '../constants/ImageLayoutActionTypes';

//导出第一个事件
export function doImageAction() {
	return (dispatch) => {
        // 做Action1，然后顺便抛一个事件出去
		return dispatch(createImageAction());
	}
}

function createImageAction() {
	return {
		type: types.ImageLayout_ACTION
	}
}
