import Comment from './Comment';

const CommentModal = ({ commentData, loadMoreRows }) => {
    const handleShowMore = () => {
        loadMoreRows()
    }

    const Show = () => {
        return commentData.map((value, index)=>
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