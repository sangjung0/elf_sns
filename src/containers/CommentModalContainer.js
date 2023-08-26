import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect } from 'react';

import CommentModal from '../components/main/CommentModal';
import { getCommentData, removeCommentData } from '../lib/modules/commentData';
import { getSessionId } from '../lib/sessionId';

const CommentContainer = ({ id }) => {
    const sessionId = getSessionId();
    const commentData = useSelector(state => state.commentData);
    //이전 정보를 불러오는 오류가 있을 듯 함. 추후 수정
    const dispatch = useDispatch();
    const _getCommentsData = useCallback((sessionId, contentId, currentPage, pageValue) => dispatch(getCommentData(sessionId, contentId, currentPage, pageValue)), [dispatch]);
    const _removeCommentData = useCallback(() => dispatch(removeCommentData()), [dispatch]);

    const loadPage = (_, type = "BACK") => {
        const [startPoint, loadPageValue] = type === "BACK" ? [commentData.lastLoadPage, 10] : [0, -10];
        _getCommentsData(sessionId, id, startPoint, loadPageValue);
    }

    useEffect(()=>{
        _removeCommentData();
        loadPage(10);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    return (
        <CommentModal
            commentData={commentData.data}
            loadMoreRows={loadPage}
        />
    )
}

export default CommentContainer;