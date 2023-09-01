import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { Button, Carousel, Col, Container, Form, InputGroup, Modal, Row } from 'react-bootstrap';
import classNames from 'classnames/bind';

import ProfileImage from './ProfileImage';
import Comment from './Comment';

import contentModalStyle from '../../styles/main/contentModal.module.scss';
import { setComment } from '../../lib/commentData';
import { getCommentData } from '../../lib/commentData';
const style = classNames.bind(contentModalStyle);
const LOAD_PAGE_VALUE = 10;

const ContentModal = ({ setModalContent, modalContent, reloadPage, userInfo }) => {
    const userId = userInfo.id;
    const contentId = modalContent.id;
    const src = modalContent.author.img;
    //const id = modalContent.author.id;
    const name = modalContent.author.name;
    const createAt = new Date(modalContent.createdAt);
    const dateString = `${createAt.getFullYear()}-${(createAt.getMonth() + 1).toString().padStart(2, "0")}-${createAt.getDate().toString().padStart(2, "0")}`;
    const imgUrl = modalContent.imgUrl;
    const tags = modalContent.tags;
    const content = modalContent.content;

    const [inputComment, setInputComment] = useState("");
    const [commentsData, setCommentsData] = useState([]);


    const imgs = imgUrl.map((img) => (
        <Carousel.Item key={img}>
            <div className={style('img-box')}>
                <img className={style('img')} src={img} alt={img} />
            </div>
        </Carousel.Item>
    ));

    const ShowTags = () => {
        return tags.map((tag) => (
            <span key={tag}>#{tag}</span>
        ));
    }

    const ShowComment = () => {
        return commentsData.map((value, index) =>
            <Comment
                key={index} //임시
                commentId={value.commentId}
                userId={userId}
                commentUserId={value.author.id}
                name={value.author.name}
                src={value.author.img}
                createAt={value.createdAt}
                comment={value.comment}
                reloadPage={() => { reloadComments(commentsData.length); }}

            />
        )
    }

    const reloadComments = (loadValue) => {
        loadData(loadValue, []);
    }

    const loadData = async (loadPageValue, array=commentsData) => {
        const response = await getCommentData(contentId, array[array.length - 1]?.commentId ?? null, loadPageValue);
        switch (response.state) {
            case "SUCCESS":
                setCommentsData([...array, ...response.data]);
                break;
            case "ERROR":
                console.error(response.e);
            case "FAILURE":
            default:
                setCommentsData([]);
        }
    }
    

    const handleInput = ({ target }) => {
        setInputComment(target.value);
    }
    //댓글 입력 처리
    const handleButton = async () => {
        const response = await setComment(modalContent.id, inputComment);
        switch (response.state) {
            case "SUCCESS":
                reloadPage(modalContent.id);
                reloadComments(commentsData.length + 1);
                setInputComment("");
                break;
            default:
                alert("Error: 댓글 등록 실패");
        }
    }

    const handleClose = () => {
        setModalContent(null)
    }

    const handleShowMore = () => {
        loadData(LOAD_PAGE_VALUE);
    }

    useEffect(() => {
        loadData(LOAD_PAGE_VALUE);//스트릭트모드라서
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])



    //중복된 부분 수정 필요.
    return (
        <Modal
            show={modalContent ? true : false}
            onHide={handleClose}
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
                                    <span>{name}</span>
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
                        <Row>
                            <div className={style('contents-box')}>
                                <div className={style('text')}>
                                    <div className={style('tags')}>
                                        <ShowTags />
                                    </div>
                                    {content}
                                </div>
                            </div>
                        </Row>
                        <Row>
                            <div className={style('comments-box')}>
                                <div className={style('contents')}>
                                    <ShowComment />
                                    <button onClick={handleShowMore}>더보기</button>
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
                                    <Button variant="outline-secondary" type="submit" onClick={handleButton} id="button-addon2">
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

export default memo(ContentModal);