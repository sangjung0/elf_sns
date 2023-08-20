import { useState } from 'react';
import {Button, Form, Col, Row, Carousel, InputGroup} from 'react-bootstrap';
import classNames from 'classnames/bind';

import Comment from './Comment';
import ProfileImage from './ProfileImage';
import contentStyle from '../../styles/main/content.module.scss';
const style = classNames.bind(contentStyle);

const Content = () => {
    const [index, setIndex] = useState(0);
  
    const handleSelect = (selectedIndex) => {
      setIndex(selectedIndex);
    };
    return (
        <div className={style("container")}>
            <Row className={style("user-info")}>
                <Col md={"1"}>
                    <div className={style("box")}>
                        <ProfileImage/>
                    </div>
                </Col>
                <Col md={"8"}>
                    <div className={style('id-box')}>
                        <span>@userId_123</span>
                    </div>
                </Col>
                <Col md={"3"}>
                    <div className={style('date-box')}>
                        <span>2023-06-12</span>
                    </div>
                </Col>
            </Row>
            <Row>
                <div className={style('imgs-box')}>
                    <Carousel interval={null} prevIcon={null} nextIcon={null} >
                        <Carousel.Item>
                            <div className={style('img-box')}>
                                <img className={style('img')} src="../img/test_img/사람_2.jpg" alt="userId_123" />
                            </div>
                        </Carousel.Item>
                        <Carousel.Item>
                            <div className={style('img-box')}>
                                <img className={style('img')} src="../img/test_img/사람_3.jpg" alt="userId_123" />
                            </div>
                        </Carousel.Item>
                        <Carousel.Item>
                            <div className={style('img-box')}>
                                <img className={style('img')} src="../img/test_img/사람_4.jpg" alt="userId_123" />
                            </div>
                        </Carousel.Item>
                    </Carousel>
                </div>
            </Row>
            <Row>
                <div className={style('contents-box')}>
                    <div className={style('contents')}>
                        <div className={style('text')}>
                            <div className={style('tags')}>
                                <span>#Abc</span>
                                <span>#Abc</span>
                                <span>#Abc</span>
                                <span>#Abc</span>
                                <span>#Abc</span>
                                <span>#Abc</span>
                            </div>
                            ㅁㄴ어라ㅣㄴ머올;ㅁ니아러;ㅣ나얼;ㅁ내ㅣㅏ얼;ㅣㅁㄴㅇ러미나얼;민아러;ㅣㅁ낭러;ㅣㅁ나얼;ㅣㅁㄴ아러;민아ㅓㄹ;ㅁ니아러;매니아러;민ㅇ라ㅓ;ㅁ닝아러;ㅁ니아럼;니아럼;니아럼;니아러;민아럼;니아러;ㅁ니아럼;니ㅏㅇ럼ㄴ;ㅣ아럼;니아럼ㄴ;ㅣ아럼ㄴ;ㅣ아럼;니아럼;니아럼ㄴ;ㅣㅇ라ㅓㅁㄴ;ㅣㅇ러ㅏㅁㄴ;ㅣ러아ㅣ;ㅁㄴ러;딤쟈나ㅓㄹ;ㅣㅁ나얼;민아럼;니아럼;ㅣ
                        </div>
                    </div>
                    <div className={style('contents')}>
                        <div className={style('text')}>
                            <div className={style('comments')}>
                                <Comment/>
                                <Comment/>
                            </div>
                        </div>
                    </div>
                </div>
            </Row>
            <Row>
                <div className={style('input-box')}>
                    <InputGroup className="mb-3">
                        <Form.Control
                        placeholder="댓글 달기"
                        />
                        <Button variant="outline-secondary" id="button-addon2">
                        입력
                        </Button>
                    </InputGroup>
                </div>
            </Row>
        </div>
    )
}

export default Content;