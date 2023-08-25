import { useState } from 'react';
import { Button, Carousel, Col, Container, Form, InputGroup, Modal, Row } from 'react-bootstrap';
import classNames from 'classnames/bind';

import ProfileImage from './ProfileImage';
import InfiniteScroll from './InfiniteScroll';  // 더 보기로 사용
import ModalContentAndComments from './ModalContentAndComments';

import contentModalStyle from '../../styles/main/contentModal.module.scss';
import Comment from './Comment';
const style = classNames.bind(contentModalStyle);
const ContentModal = ({ setModalContent, modalContent }) => {
    console.log(modalContent);
    const src = modalContent.author.imgUrl;
    const id = modalContent.author.id;
    const createAt = new Date(modalContent.createAt);
    const dateString = `${createAt.getFullYear()}-${(createAt.getMonth() + 1).toString().padStart(2, "0")}-${createAt.getDate().toString().padStart(2, "0")}`;
    const imgUrl = modalContent.imgUrl ?? [];
    const imgs = imgUrl.map((img) => (
        <Carousel.Item key={img}>
            <div className={style('img-box')}>
                <img className={style('img')} src={img} alt={img} />
            </div>
        </Carousel.Item>
    ))
    const tags = modalContent.tags ?? [];
    const tag = tags.map((tag) => (
        <span key={tag}>#{tag}</span>
    ))
    const content = modalContent.content ?? "";
    const comments = modalContent.comments ?? [];
    const comment = comments.map((comment, index) => (
        <Comment
            //key={comment.commentId}
            key={index} //임시로 index 값 했음.
            commentId={comment.commentId}
            userId={comment.userId}
            comment={comment.comment}
            createAt={comment.createAt}
        />
    ))


    const [inputComment, setInputComment] = useState("");
    const handleInput = ({ target }) => {
        setInputComment(target.value);
    }
    //댓글 입력 처리
    const handleButton = (e) => {
        console.log(inputComment);
        setInputComment("");
    }
    const handleClick = () => {

    }

    //중복된 부분 수정 필요.
    return (
        <Modal
            show={modalContent ? true : false}
            onHide={() => setModalContent(null)}
            dialogClassName={style("modal-container")}
        >
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <div className={style("container")}>
                        <Row className={style("user-info")}>
                            <Col md={"1"}>
                                <div className={style("box")}>
                                    <ProfileImage src={src} />
                                </div>
                            </Col>
                            <Col md={"8"}>
                                <div className={style('id-box')}>
                                    <span>{id}</span>
                                </div>
                            </Col>
                            <Col md={"3"}>
                                <div className={style('date-box')}>
                                    <span>{dateString}</span>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <div className={style('imgs-box')}>
                                <Carousel interval={null} prevIcon={null} nextIcon={null} >
                                    {imgs}
                                </Carousel>
                            </div>
                        </Row>
                        <Row onClick={handleClick}>
                            <div className={style('contents-box')}>
                                {/* <InfiniteScroll>
                                    <ModalContentAndComments />
                                </InfiniteScroll> */}
                            </div>
                        </Row>
                        <Row>
                            <div className={style('comment-box')}>
                                {comment}
                            </div>
                            <div className={style('input-box')}>
                                <InputGroup className="mb-3">
                                    <Form.Control
                                        placeholder="댓글 달기"
                                        onChange={handleInput}
                                        value={inputComment}
                                    />
                                    <Button variant="outline-secondary" onClick={handleButton} id="button-addon2">
                                        입력
                                    </Button>
                                </InputGroup>
                            </div>
                        </Row>
                    </div>
                </Container>
            </Modal.Body >
        </Modal >
    )
}

export default ContentModal;