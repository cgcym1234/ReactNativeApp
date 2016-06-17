/**
 * Created by sihuan on 16/6/15.
 */


//we are using namespaceing to prevent module's action type collision
//every module should have a unique name. the best practice is to set name
//base on module's name

//name of this modules
export const NAME = 'todoPage';

/*
 * action 类型
 */
export const ADD_TODO = `${NAME}/ADD_TODO`;
export const COMPLETE_TODO = `${NAME}/COMPLETE_TODO`;
export const SET_VISIBILITY_FILTER = `${NAME}/SET_VISIBILITY_FILTER`;


export const VisibilityFilters = {
    SHOW_ALL: 'SHOW_ALL',
    SHOW_COMPLETED: 'SHOW_COMPLETED',
    SHOW_ACTIVE: 'SHOW_ACTIVE'
};



