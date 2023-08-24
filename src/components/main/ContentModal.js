import { useState } from 'react';
import {Button, Carousel, Col, Container, Form, InputGroup, Modal, Row} from 'react-bootstrap';
import classNames from 'classnames/bind';

import ProfileImage from './ProfileImage';

import contentModalStyle from '../../styles/main/contentModal.module.scss';
import CommentModalContainer from '../../containers/CommentModalContainer';
const style = classNames.bind(contentModalStyle);
const ContentModal = ({setModalContent, modalContent}) => {
    const contentId = modalContent.id;
    const src= modalContent.author.imgUrl;
    const id = modalContent.author.id;
    const createAt = new Date(modalContent.createAt );
    const dateString = `${createAt.getFullYear()}-${(createAt.getMonth()+1).toString().padStart(2,"0")}-${createAt.getDate().toString().padStart(2,"0")}`;
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



    const [inputComment,setInputComment] = useState("");
    const handleInput = ({target}) => {
        setInputComment(target.value);
    }
    //댓글 입력 처리
    const handleButton = (e)=>{
        console.log(inputComment);
        setInputComment("");
    }
    const handleClick = () => {

    }

    //중복된 부분 수정 필요.
    return (
        <Modal
            show={modalContent? true: false}
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
                                    <ProfileImage src={src}/>
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
                                <div className={style('text')}>
                                    <div className={style('tags')}>
                                        {tag}
                                    </div>
                                    {content}
                                </div>
                            </div>
                        </Row>
                        <Row onClick={handleClick}>
                            <div className={style('comments-box')}>
                                <div className={style('contents')}>
                                    <CommentModalContainer id={contentId} />
                                </div>
                            </div>
                        </Row>
                        <Row>
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
            </Modal.Body>
        </Modal>
    )
}

export default ContentModal;