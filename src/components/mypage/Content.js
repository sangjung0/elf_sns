import { memo, useState } from 'react';
import { Button, Form, Col, Row, Carousel, InputGroup } from 'react-bootstrap';
import classNames from 'classnames/bind';


import contentStyle from '../../styles/mypage/content.module.scss';
const style = classNames.bind(contentStyle);

const Content = ({ data, setModalContent, reloadPage, userInfo }) => {
    //const id = data?.author.id ?? null;

    const first = data ? data[0].imgUrl[0] : null;
    const second = data ? data[1].imgUrl[0] : null;
    const third = data ? data[2].imgUrl[0] : null;


    const handleClick = (v) => {
        setModalContent(data[v]);
    }

    //모달과 중복된 부분 합쳐야 함.
    return (
        <Row>
            <Col md={"4"} className={style('col')}>
                <div className={style('image-box')} onClick={() => handleClick(0)}>
                    <img className={style('img')} src={first} alt={first} />
                </div>
            </Col>
            <Col md={"4"} className={style('col')}>
                <div className={style('image-box')} onClick={() => handleClick(1)}>
                    <img className={style('img')} src={second} alt={second} />
                </div>
            </Col>
            <Col md={"4"} className={style('col')}>
                <div className={style('image-box')} onClick={() => handleClick(2)}>
                    <img className={style('img')} src={third} alt={third} />
                </div>
            </Col>
        </Row>
    )
}

export default memo(Content);