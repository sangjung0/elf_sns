import { call, delay, put, takeLeading } from "redux-saga/effects";
import {produce} from "immer";

import gCD from "../getCommentData";

const GET_COMMENTS_DATA = 'commentData/GET_COMMENTS_DATA'; //컨텐츠 정보 가져오기 실행
const GET_COMMENTS_DATA_SUCCESS = 'commentData/GET_COMMENTS_DATA_SUCCESS'; //컨텐츠 정보 가져오기 성공
const GET_COMMENTS_DATA_FAILURE = 'commentData/GET_COMMENTS_DATA_FAILURE'; //컨텐츠 정보 가져오기 실패
const REMOVE_COMMENTS_DATA="commentData/REMOVE_COMMENTS_DATA"; //
//액션
//컨텐츠 정보를 가져오기 실행 액션
export const getCommentData = (sessionId, contentId, currentPage, pageValue) => ({
    type: GET_COMMENTS_DATA,
    sessionId,
    contentId,
    currentPage,
    pageValue
});
export const removeCommentData = () => ({
    type: REMOVE_COMMENTS_DATA,
});

//리덕스 사가 함수
//컨텐츠 정보 가져와서 성공 실패에 따라 디스패치
const getCommentDataSaga = function* (action) {
    try{
        const contents = yield call(gCD, action.sessionId, action.contentId, action.currentPage, action.pageValue);
        if(contents.state === "SUCCESS"){
            yield put({
                type: GET_COMMENTS_DATA_SUCCESS,
                contentId: action.contentId,
                payload: contents,
                error: false,
            });
        }else{
            yield put({
                type: GET_COMMENTS_DATA_FAILURE,
                payload: "not found sessionId",
                error: false,
            })
        }
    }catch(e){
        yield put({
            type: GET_COMMENTS_DATA_FAILURE,
            payload: e,
            error: true,
        })
    }
    delay(1000);
}

//리덕스 사가 호출 세팅
export const commentDataSaga = function* () {
    yield takeLeading(GET_COMMENTS_DATA, getCommentDataSaga);
}

//초기상태
const initialState = {
    loading: true,
    payload: null,
    data: [],
    contentId: null,
    totalPage: 1,
    lastLoadPage: 0,
    error: false,
}

//리듀서
const commentData = (state= initialState, action) => {
    switch(action.type){
        case GET_COMMENTS_DATA:
            return produce(state, draft => {
                draft.loading = true; //컨텐츠 정보 가져오기 실행할때 로딩 true 끝나면 false
            })
        case GET_COMMENTS_DATA_SUCCESS:
            return produce(state, draft => {
                draft.payload = action.payload; //원본 저장. 필요없다면 지워도 됨
                draft.contentId === action.contentId ? draft.data = [...draft.data, ...action.payload.data] : draft.data = action.payload.data;
                draft.contentId = action.contentId;
                draft.totalPage = action.payload.totalPage;
                draft.lastLoadPage = action.payload.lastLoadPage;
                draft.loading = false;
            })
        case GET_COMMENTS_DATA_FAILURE:
            //에러처리 해야함
            return produce(state, draft => {
                draft.payload = action.payload;
                draft.loading = false;
                draft.error = action.error;
            })
        case REMOVE_COMMENTS_DATA:
            return produce(state, draft => {
                draft.loading=false;
                draft.payload= null;
                draft.data= [];
                draft.contentId= null;
                draft.totalPage= 1;
                draft.lastLoadPage= 0;
                draft.error= false;
            })
        default:
            return state;
    }
}

export default commentData;

