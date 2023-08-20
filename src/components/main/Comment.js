import classNames from 'classnames/bind';
import { Col, Row } from 'react-bootstrap';

import ProfileImage from './ProfileImage';
import commentStyle from '../../styles/main/comment.module.scss';
const style = classNames.bind(commentStyle);

const Comment = () => {
    return (
        <div className={style('comment-container')}>
            <Col md={1}>
                <div className={style("box")}>
                    <ProfileImage/>
                </div>
            </Col>
            <Col md={11}>
                <Row>
                    <Col md={1}>
                        <div className={style('user-id')}>
                            <span>userId_123</span>
                        </div>
                    </Col>
                    <Col md={2}>
                        <div className={style('date')}>
                            <span>2023-08-12</span>
                        </div>
                    </Col>
                    <Col md={9}>
                        <div className={style('setting')}>
                            <span>
                                삭제
                            </span>
                            <span>
                                수정
                            </span>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <div className={style('comment')}>
                        내용ㅁㄴ믱러;ㅣㅁ낭러;ㅣㅁㄴ아ㅓㄹ;ㅁㄴ아ㅣㄻ넝ㄹ
                    </div>
                </Row>
                <Row>
                    <div className={style('bottom-box')}>
                        <span>답글 달기</span>
                    </div>
                </Row>
            </Col>
        </div>
    )
}

export default Comment;