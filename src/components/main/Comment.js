import classNames from 'classnames/bind';
import { Col, Row } from 'react-bootstrap';
import { memo, useCallback } from 'react';

import ProfileImage from './ProfileImage';
import commentStyle from '../../styles/main/comment.module.scss';
const style = classNames.bind(commentStyle);

const Comment = ({ commentId, userId, comment, createAt, }) => {
    const date = new Date(createAt);
    const dateString = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
    const handleButton = useCallback(({ target }) => {
        switch (target.name) {
            case "remove":
                console.group("Comment");
                console.log("Removing:", commentId);
                console.groupEnd();
                return;
            case "modify":
                console.group("Comment");
                console.log("Modify:", commentId);
                console.groupEnd();
                return;
            case "reply":
                console.group("Comment");
                console.log("Reply:", commentId);
                console.groupEnd();
                return;
            default:
                return;
        }
    }, [commentId])

    return (
        <div className={style('comment-container')}>
            <Col md={1}>
                <div className={style("box")}>
                    <ProfileImage />
                </div>
            </Col>
            <Col md={11}>
                <Row>
                    <Col md={2}>
                        <div className={style('user-id')}>
                            <span>{userId}</span>
                        </div>
                    </Col>
                    <Col md={2}>
                        <div className={style('date')}>
                            <span>{dateString}</span>
                        </div>
                    </Col>
                    <Col md={8}>
                        <div className={style('setting')}>
                            <button type="button" onClick={handleButton} name="remove">삭제</button>
                            <button type='button' onClick={handleButton} name="modify">수정</button>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <div className={style('comment')}>
                        {comment}
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