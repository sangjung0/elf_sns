import { memo, useState } from 'react';
import { Button, Form, Col, Row, Carousel, InputGroup } from 'react-bootstrap';
import classNames from 'classnames/bind';

import Comment from './Comment';
import ProfileImage from './ProfileImage';
import { setComment } from '../../lib/commentData';

import contentStyle from '../../styles/main/content.module.scss';
const style = classNames.bind(contentStyle);

const Content = ({ data, setModalContent, reloadPage, userInfo }) => {
    //const id = data?.author.id ?? null;
    const userId = userInfo.id;
    const name = data?.author.name ?? null;
    const src = data?.author.img ?? null;
    const createAt = new Date(data?.createdAt ?? 0);
    const dateString = `${createAt.getFullYear()}-${(createAt.getMonth() + 1).toString().padStart(2, "0")}-${createAt.getDate().toString().padStart(2, "0")}`;
    const imgUrl = data?.imgUrl ?? [];
    const imgs = imgUrl.map((img,index) => (
        <Carousel.Item key={img+index}>
            <div className={style('img-box')}>
                <img className={style('img')} src={img} alt={img} />
            </div>
        </Carousel.Item>
    ))
    const tags = data?.tags ?? [];
    const tag = tags.map((tag) => (
        <span key={tag}>#{tag}</span>
    ))
    const content = data?.content ?? "";
    const comments = data?.comments ?? [];
    const comment = comments.map((comment) => (
        <Comment
            key={comment.commentId} 
            commentId={comment.commentId}
            commentUserId={comment.author.id}
            userId={userId}
            name={comment.author.name}
            src={comment.author.img}
            comment={comment.content}
            createAt={comment.createdAt}
            reloadPage={()=>{reloadPage(data.id)}}
        />
    ))

    const [inputComment, setInputComment] = useState("");
    const handleInput = ({ target }) => {
        setInputComment(target.value);
    }

    //댓글 입력 처리
    const handleButton = async() => {
        const response = await setComment(data.id, inputComment);
        switch (response.state){
            case "SUCCESS":
                reloadPage(data.id);
                setInputComment("");
                break;
            default:
                alert("Error: 댓글 등록 실패");
        }

    }
    const handleClick = (e) => {
        e.stopPropagation();
        setModalContent(data);
    }

    //모달과 중복된 부분 합쳐야 함.
    return (
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
                <Col>
                    <div className={style('imgs-box')}>
                        <Carousel interval={null} prevIcon={null} nextIcon={null} >
                            {imgs}
                        </Carousel>
                    </div>
                </Col>
                <Col>
                    <div className={style('contents-box')}  onClick={handleClick}>
                        <div className={style('contents')}>
                            <div className={style('text')}>
                                <div className={style('tags')}>
                                    {tag}
                                </div>
                                {content}
                            </div>
                        </div>
                        <div className={style('contents')}>
                            <div className={style('text')}>
                                <div className={style('comments')}>
                                    {comment}
                                </div>
                            </div>
                        </div>
                    </div>
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
                </Col>
            </Row>
        </div>
    )
}

export default memo(Content);