import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect } from 'react';

import App from '../App';
import { getUserInfo } from "../lib/modules/userInfo";
import { getSessionId } from '../lib/sessionId';

//세션 확인 컨테이너
const AppContainer = () => {
    const sessionId = getSessionId();
    const userInfo = useSelector(state => state.userInfo);
    const dispatch = useDispatch();
    const _getUserInfo = useCallback((sessionId)=> dispatch(getUserInfo(sessionId)), [dispatch]);
    useEffect(()=>{
        _getUserInfo(sessionId);
    },[_getUserInfo,sessionId]);
    console.log(userInfo);
    return <App userInfo={userInfo}/>
}

export default AppContainer;