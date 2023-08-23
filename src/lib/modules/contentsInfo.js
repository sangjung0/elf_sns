import { call, delay, put, takeLeading } from "redux-saga/effects";
import {produce} from "immer";

import gCI from "../getContentsInfo";

const GET_CONTENTS_INFO = 'contentsInfo/GET_CONTENTS_INFO'; //컨텐츠 정보 가져오기 실행
const GET_CONTENTS_INFO_SUCCESS = 'contentsInfo/GET_CONTENTS_INFO_SUCCESS'; //컨텐츠 정보 가져오기 성공
const GET_CONTENTS_INFO_FAILURE = 'contentsInfo/GET_CONTENTS_INFO_FAILURE'; //컨텐츠 정보 가져오기 실패

//액션
//컨텐츠 정보를 가져오기 실행 액션
export const getContentsInfo = (sessionId, currentPage, pageValue) => ({
    type: GET_CONTENTS_INFO,
    sessionId,
    currentPage,
    pageValue
});

//리덕스 사가 함수
//컨텐츠 정보 가져와서 성공 실패에 따라 디스패치
const getContentsInfoSaga = function* (action) {
    try{
        const contents = yield call(gCI, action.sessionId,action.currentPage, action.pageValue);
        if(contents.state === "SUCCESS"){
            yield put({
                type: GET_CONTENTS_INFO_SUCCESS,
                payload: contents,
                error: false,
            });
        }else{
            yield put({
                type: GET_CONTENTS_INFO_FAILURE,
                payload: "not found sessionId",
                error: false,
            })
        }
    }catch(e){
        yield put({
            type: GET_CONTENTS_INFO_FAILURE,
            payload: e,
            error: true,
        })
    }
    delay(1000);
}

//리덕스 사가 호출 세팅
export const contentsInfoSaga = function* () {
    yield takeLeading(GET_CONTENTS_INFO, getContentsInfoSaga);
}

//초기상태
const initialState = {
    loading: true,
    payload: null,
    data: [],
    totalPage: 0,
    lastLoadPage: 0,
    error: false,
}

//리듀서
const contetsInfo = (state= initialState, action) => {
    switch(action.type){
        case GET_CONTENTS_INFO:
            return produce(state, draft => {
                draft.loading = true; //컨텐츠 정보 가져오기 실행할때 로딩 true 끝나면 false
            })
        case GET_CONTENTS_INFO_SUCCESS:
            return produce(state, draft => {
                draft.payload = action.payload; //원본 저장. 필요없다면 지워도 됨
                draft.data = [...draft.data, ...action.payload.data];
                draft.totalPage = action.payload.totalPage;
                draft.lastLoadPage = action.payload.lastLoadPage;
                draft.loading = false;
            })
        case GET_CONTENTS_INFO_FAILURE:
            //에러처리 해야함
            return produce(state, draft => {
                draft.payload = action.payload;
                draft.loading = false;
                draft.error = action.error;
            })
        default:
            return state;
    }
}

export default contetsInfo;

