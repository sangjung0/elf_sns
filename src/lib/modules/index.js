import { all } from "redux-saga/effects";
import { combineReducers } from "redux";

import friendInfo, { friendInfoSaga } from './friendInfo';

import userInfo, { userInfoSaga } from "./userInfo";
//기능별로 파일을 나누어서 만듬

//리듀서 합치기
const rootReducer = combineReducers({
    userInfo, friendInfo
});

//리덕스 사가 합치기
export const rootSaga = function* () {
    yield all([userInfoSaga(), friendInfoSaga()]);
}

export default rootReducer;
