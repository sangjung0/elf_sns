import { useEffect, useState } from 'react';

import Comment from './Comment';
import getCommentData from '../../lib/getCommentData';

const LOAD_PAGE_VALUE = 10;

const CommentModal = ({ id }) => {
    const [commentsData, setCommentsData] = useState([]);

    const handleShowMore = async() => {
        const response = await getCommentData(id, LOAD_PAGE_VALUE);
        // 실제 작동할 때는 contentsInfo.length가 아니라 id값으로 할 것.
        // getContentsInfo(contentsInfo[contentsInfo.length-1].id, LOAD_PAGE_VALUE);
        console.log(response);
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
    }

    useEffect(()=>{
        handleShowMore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const Show = () => {
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
            <Show />
            <button onClick={handleShowMore}>더보기4</button>
        </>
    )
}

export default CommentModal;