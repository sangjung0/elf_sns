import { useCallback, useEffect, useState } from 'react';

import Comment from './Comment';
import { getCommentData } from '../../lib/commentData';

const LOAD_PAGE_VALUE = 10;

const CommentModal = ({ id, shouldLoad }) => {
    const [commentsData, setCommentsData] = useState([]);

    const handleShowMore = () => {
        loadData(LOAD_PAGE_VALUE);
    }

    const loadData = useCallback(async (loadPageValue) => {
        const response = await getCommentData(id, loadPageValue);
        // 실제 작동할 때는 contentsInfo.length가 아니라 id값으로 할 것.
        // getContentsInfo(contentsInfo[contentsInfo.length-1].id, LOAD_PAGE_VALUE);
        switch (response.state){
            case "SUCCESS":
                setCommentsData([...commentsData, ...response.data]);
                break;
            case "ERROR":
                console.error(response.e);
            case "FAILURE":
            default:
                setCommentsData([]);
        }
    },[id, commentsData]);

    useEffect(()=>{
        handleShowMore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    useEffect(()=>{
        console.log("reload");
        setCommentsData([]);
        loadData(commentsData.length);
    },[shouldLoad, commentsData, loadData])

    const ShowComment = () => {
        return commentsData.map((value, index)=>
            <Comment
                key={index} //임시
                commentId={value.commentId}
                userId ={value.userId}
                createAt = {value.createAt}
                comment = {value.comment}

            />
        )
    }

    return (
        <>  
            <ShowComment />
            <button onClick={handleShowMore}>더보기4</button>
        </>
    )
}

export default CommentModal;