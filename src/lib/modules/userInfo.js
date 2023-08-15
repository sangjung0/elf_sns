import { call, delay, put, takeLeading } from "redux-saga/effects";
import {produce} from "immer";

import gUI from "../getUserInfo";

const GET_USER_INFO = 'userInfo/GET_USER_INFO';
const GET_USER_INFO_SUCCESS = 'userInfo/GET_USER_INFO_SUCCESS';
const GET_USER_INFO_FAILURE = 'userInfo/GET_USER_INFO_FAILURE';

export const getUserInfo = (sessionId) => ({
    type: GET_USER_INFO,
    sessionId
});

const getUserInfoSaga = function* (action) {
    try{
        const userInfo = yield call(gUI, action.sessionId);
        yield put({
            type: GET_USER_INFO_SUCCESS,
            info: userInfo,
        });
    }catch(e){
        yield put({
            type: GET_USER_INFO_FAILURE,
            payload: e,
            error: true,
        })
    }
    delay(1000);
}

export const userInfoSaga = function* () {
    yield takeLeading(GET_USER_INFO, getUserInfoSaga);
}

const initialState = {
    loading: true,
    info: null
}

const userInfo = (state= initialState, action) => {
    switch(action.type){
        case GET_USER_INFO_FAILURE:
        case GET_USER_INFO:
            return produce(state, draft => {
                draft.loading = true;
            })
        case GET_USER_INFO_SUCCESS:
            return produce(state, draft => {
                draft.info = action.info;
                draft.loading = false;
            })
        default:
            return state;
    }
}

export default userInfo;

