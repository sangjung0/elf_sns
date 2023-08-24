import { createAction, handleActions } from 'redux-actions';
import { call, delay, put, takeLeading } from "redux-saga/effects";
import { produce } from "immer";

import getFriendInfo from '../getFriendInfo';

const GET_FRIEND_INFO = 'friendInfo/GET_FRIEND_INFO'
const GET_FRIEND_SUCCESS = 'friendInfo/GET_FRIEND_SUCCESS'
const GET_FRIEND_FAILURE = 'friendInfo/GET_FRIEND_FAILURE'

const SET_FRIEND_ALLAM = 'friendInfo/SET_FRIEND_ALLAM'
const SET_FRIEND_UNFOLLOW = 'friendInfo/SET_FRIEND_UNFOLLOW'
const SET_FRIEND_BLOCK = 'friendInfo/SET_FRIEND_BLOCK'

export const getFriend = createAction(GET_FRIEND_INFO, (userId, currentFriend, friendValue) => {
    return {
        userId: userId,
        currentFriend,
        friendValue
    }
})

export const allam = createAction(SET_FRIEND_ALLAM)
export const unfollow = createAction(SET_FRIEND_UNFOLLOW)
export const block = createAction(SET_FRIEND_BLOCK)

const getMyFriendsSaga = function* (action) {
    try {
        console.log('friendInfo action: ', action)
        const info = yield call(getFriendInfo, action.payload.userId)
        console.log('friendInfo info: ', info)
        if (info.state === "SUCCESS") {
            console.log('friendInfo Success')
            yield put({
                type: GET_FRIEND_SUCCESS,
                payload: info.data,
                error: false
            })
        }
        else {
            yield put({
                type: GET_FRIEND_FAILURE,
                payload: [],
                error: false
            })
        }
    } catch (e) {
        yield put({
            type: GET_FRIEND_FAILURE,
            payload: e,
            error: true
        })
    }
}

export const friendInfoSaga = function* () {
    yield takeLeading(GET_FRIEND_INFO, getMyFriendsSaga)
}

const initialState = {
    loading: true,
    payload: null,
    totalFriend: 1,
    lastLoadFriend: 0,
    error: false
}

const friendInfo = handleActions(
    {
        [GET_FRIEND_INFO]: (state, action) => produce(state, draft => {
            draft.loading = true;
            draft.error = false;
        }),
        [GET_FRIEND_SUCCESS]: (state, action) => produce(state, draft => {
            draft.loading = false;
            draft.payload = action.payload;
            draft.totalFriend = action.payload.totalFriend;
            draft.lastLoadFriend = action.payload.lastLoadFriend;
        }),
        [GET_FRIEND_FAILURE]: (state, action) => produce(state, draft => {
            draft.loading = false;
            draft.payload = action.payload;
            draft.error = action.error;
        }),
        [SET_FRIEND_ALLAM]: (state, action) => produce(state, draft => {

        }),
        [SET_FRIEND_UNFOLLOW]: (state, action) => produce(state, draft => {

        }),
        [SET_FRIEND_BLOCK]: (state, action) => produce(state, draft => {

        }),
    },
    initialState
)

export default friendInfo;