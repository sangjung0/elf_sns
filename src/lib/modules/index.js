import { all } from "redux-saga/effects";
import { combineReducers } from "redux";

import userInfo, { userInfoSaga } from "./userInfo";

const rootReducer = combineReducers({
    userInfo,
});

export const rootSaga = function* (){
    yield all([userInfoSaga()]);
}

export default rootReducer;
