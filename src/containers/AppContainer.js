import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect } from 'react';

import App from '../App';
import { getUserInfo } from "../lib/modules/userInfo";

//세션 확인 컨테이너
const AppContainer = () => {
    const userInfo = useSelector(state => state.userInfo);
    const dispatch = useDispatch();
    const _getUserInfo = useCallback(()=> dispatch(getUserInfo()), [dispatch]);
    useEffect(()=>{
        _getUserInfo();
    },[_getUserInfo]);
    return <App userInfo={userInfo}/>
}

export default AppContainer;