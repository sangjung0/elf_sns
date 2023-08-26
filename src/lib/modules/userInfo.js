import { call, delay, put, takeLeading } from "redux-saga/effects";
import { produce } from "immer";

import gUI from "../getUserInfo";

const GET_USER_INFO = 'userInfo/GET_USER_INFO'; //유저 정보 가져오기 실행
const GET_USER_INFO_SUCCESS = 'userInfo/GET_USER_INFO_SUCCESS'; //유저 정보 가져오기 성공
const GET_USER_INFO_FAILURE = 'userInfo/GET_USER_INFO_FAILURE'; //유저 정보 가져오기 실패
// const SET_USER_INFO_TOTAL_CONTENTS_PAGE = 'userInfo/SET_USER_INFO_TOTAL_CONTENTS_PAGE'; //totalContents 업데이트

//액션
//유저 정보를 가져오기 실행 액션
export const getUserInfo = () => ({
    type: GET_USER_INFO,
});
// //총 페이지 업데이트 함수
// export const setUserInfoTotalContentsPage = (totalPage) => ({
//     type: SET_USER_INFO_TOTAL_CONTENTS_PAGE,
//     totalPage
// });

//리덕스 사가 함수
//유저 정보 가져와서 성공 실패에 따라 디스패치
const getUserInfoSaga = function* (action) {
    try {
        const userInfo = yield call(gUI);
        if (userInfo.state === "SUCCESS") {
            yield put({
                type: GET_USER_INFO_SUCCESS,
                payload: { ...userInfo },
                error: false,
            });
        } else {
            yield put({
                type: GET_USER_INFO_FAILURE,
                payload: "not found sessionId",
                error: false,
            })
        }
    } catch (e) {
        yield put({
            type: GET_USER_INFO_FAILURE,
            payload: e,
            error: true,
        })
    }
    delay(1000);
}

//리덕스 사가 호출 세팅
export const userInfoSaga = function* () {
    yield takeLeading(GET_USER_INFO, getUserInfoSaga);
}

//초기상태
const initialState = {
    loading: true,
    payload: null,
    error: false,
}

//리듀서
const userInfo = (state = initialState, action) => {
    switch (action.type) {
        case GET_USER_INFO:
            return produce(state, draft => {
                draft.loading = true; //유저 정보 가져오기 실행할때 로딩 true 끝나면 false
            })
        case GET_USER_INFO_SUCCESS:
            return produce(state, draft => {
                draft.payload = action.payload;
                draft.loading = false;
            })
        case GET_USER_INFO_FAILURE:
            //에러처리 해야함
            return produce(state, draft => {
                draft.payload = action.payload;
                draft.loading = false;
                draft.error = action.error;
            })
        // case SET_USER_INFO_TOTAL_CONTENTS_PAGE:
        //     return produce(state, draft => {
        //         draft.payload.data.pages.totalContent = action.totalContent;
        //     })
        default:
            return state;
    }
}

export default userInfo;

