import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect } from 'react';
import {useCookies} from 'react-cookie';

import App from '../App';
import { getUserInfo } from "../lib/modules/userInfo";

const AppContainer = () => {
    const [cookies, setCookies] = useCookies();
    const userInfo = useSelector(state => state.userInfo);
    const dispatch = useDispatch();
    const _getUserInfo = useCallback((sessionId)=> dispatch(getUserInfo(sessionId)), [dispatch]);
    useEffect(()=>{
        const sessionId = cookies.session_id;
        _getUserInfo(sessionId);
    },[_getUserInfo,cookies.session_id]);
    console.log(userInfo);
    return <App userInfo={userInfo}/>
}

export default AppContainer;