import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';

import Main from '../components/main/Main';
import { getContentsInfo } from "../lib/modules/contentsInfo";
import { getSessionId } from '../lib/sessionId';

const MainContainer = () => {
    const sessionId = getSessionId();
    const userInfo = useSelector(state => state.userInfo.payload.data);
    const contentsInfo = useSelector(state => state.contentsInfo);
    const dispatch = useDispatch();
    const _getContentsInfo = useCallback((sessionId, currentPage, pageValue)=> dispatch(getContentsInfo(sessionId, currentPage, pageValue)), [dispatch]);

    const loadPage = (value,type="BACK") => {
        const [startPoint, loadPageValue] = type === "BACK" ? [contentsInfo.lastLoadPage, value] : [0, -value];
         _getContentsInfo(sessionId, startPoint, loadPageValue);
    }

    return (
        <Main userInfo={userInfo} contentsInfo={contentsInfo} loadPage={loadPage}/>
    )
}

export default MainContainer;