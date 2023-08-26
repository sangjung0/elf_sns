import { all } from "redux-saga/effects";
import { combineReducers } from "redux";

import userInfo, { userInfoSaga } from "./userInfo";
//기능별로 파일을 나누어서 만듬

//리듀서 합치기
const rootReducer = combineReducers({
    userInfo
});

//리덕스 사가 합치기
export const rootSaga = function* () {
    yield all([userInfoSaga()]);
};

export default rootReducer;
