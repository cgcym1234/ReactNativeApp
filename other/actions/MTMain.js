/**
 * Created by chesterlee on 16/5/19.
 */

'use strict';

import * as types from '../constants/MainActionTypes';

//导出第一个事件
export function doActionOne() {
	return (dispatch) => {
        // 做Action1，然后顺便抛一个事件出去
		return dispatch(createActionOne());
	}
}

//导出第二个事件
export function doActionTwo() {
	return (dispatch) => {
        // 做Action2，然后顺便抛一个事件出去
		return dispatch(createActionTwo());
	}
}

export function doActionEx() {
	return (dispatch) => {
		return dispatch(exchangeActions());
	}
}

function createActionOne() {
	return {
		type: types.MAIN_ACTION_ONE
	}
}

function createActionTwo() {
	return {
		type: types.MAIN_ACTION_TWO
	}
}

function exchangeActions() {
	return {
		type: types.MAIN_ACTION_Ex
	}
}