import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect } from 'react';

import Main from '../components/main/Main';
import { getContentsInfo } from "../lib/modules/contentsInfo";
import { getSessionId } from '../lib/sessionId';

//세션 확인 컨테이너
const LOAD_PAGE_VALUE = 10; //한번에 로드할 페이지 수

const MainContainer = () => {
    const sessionId = getSessionId();
    const userInfo = useSelector(state => state.userInfo.payload.data);
    const lastLoadPage = useSelector(state => state.contentsInfo.lastLoadPage);
    const contentsData = useSelector(state => state.contentsInfo.data);
    const dispatch = useDispatch();
    const _getContentsInfo = useCallback((sessionId, currentPage, pageValue)=> dispatch(getContentsInfo(sessionId, currentPage, pageValue)), [dispatch]);
    useEffect(()=>{
        _getContentsInfo(sessionId, 0, LOAD_PAGE_VALUE);
    },[sessionId,_getContentsInfo]);

    const loadPage = (type="BACK") => {
        const [startPoint, loadPageValue] = type === "BACK" ? [lastLoadPage, LOAD_PAGE_VALUE] : [0, -LOAD_PAGE_VALUE];
         _getContentsInfo(sessionId, startPoint, loadPageValue);
    }

    return (
        <Main userInfo={userInfo} contentsData={contentsData} loadPage={loadPage}/>
    )
}

export default MainContainer;