import classNames from 'classnames/bind';
import { Col, Row } from 'react-bootstrap';
import { memo, useState } from 'react';

import ProfileImage from './ProfileImage';
import { modifyComment, removeComment } from '../../lib/commentData';
import commentStyle from '../../styles/main/comment.module.scss';
const style = classNames.bind(commentStyle);

const Comment = ({ commentId, commentUserId, comment, createAt, reloadPage, src, name, userId}) => {
    const [input, setInput] = useState(false);
    const [text, setText] = useState(comment);
    const date = new Date(createAt);
    const dateString = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
    const handleButton = async({ target }) => {
        switch (target.name) {
            case "remove":
                const result = window.confirm("진짜 댓글 삭제?");
                if (result) {
                    const response = await removeComment(commentId);
                    if (response.state ==="SUCCESS"){
                        reloadPage();
                    }else{
                        alert("삭제 실패");
                    }
                }
                return;
            case "modify":
                setInput(true);
                return;
            case "reply":
                console.group("Comment");
                console.log("Reply:", commentId);
                console.groupEnd();
                return;
            default:
                return;
        }
    }

    const handleInput = ({target}) => {
        setText(target.value);
    }

    const handleSubmit = async() => {
        const response = await modifyComment(commentId, text);
        if (response) {
            const response = await removeComment(commentId);
            if (response.state ==="SUCCESS"){
                reloadPage();
            }else{
                alert("수정 실패");
            }
        }
    }

    const showComment = () => {
        if (input){
            return (
                <>
                    <input type="text" value={text} onChange={handleInput}/>
                    <button onClick={handleSubmit}>수정</button>
                </>
            )
        }else{
            return comment
        }
    }

    const ShowUD = () => {
        if(commentUserId === userId){
            return (
                <div className={style('setting')}>
                    <button type="button" onClick={handleButton} name="remove">삭제</button>
                    <button type='button' onClick={handleButton} name="modify">수정</button>
                </div>
            )
        }
        return <></>;
    }

    return (
        <div className={style('comment-container')}>
            {/* <Col md={1.5}> */}
            <Col md={2}>
                <div className={style("box")}>
                    <ProfileImage src={src}/>
                </div>
            </Col>
            {/* <Col md={11}> */}
            <Col md={10}>
                <Row>
                    <Col md={3}>
                        <div className={style('user-id')}>
                            <span>{name}</span>
                        </div>
                    </Col>
                    <Col md={3}>
                        <div className={style('date')}>
                            <span>{dateString}</span>
                        </div>
                    </Col>
                    <Col md={6}>
                        <ShowUD/>
                    </Col>
                </Row>
                <Row>
                    <div className={style('comment')}>
                        {showComment()}
                    </div>
                </Row>
                <Row>
                    <div className={style('bottom-box')}>
                        <button type='button' onClick={handleButton} name="reply">답글달기</button>
                    </div>
                </Row>
            </Col>
        </div>
    )
}

export default memo(Comment);