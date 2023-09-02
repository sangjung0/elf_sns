import { memo, useState } from 'react';
import { Button, Form, Col, Row, Carousel, InputGroup } from 'react-bootstrap';
import classNames from 'classnames/bind';


import contentStyle from '../../styles/mypage/content.module.scss';
const style = classNames.bind(contentStyle);

const Content = ({ data, setModalContent, reloadPage, userInfo }) => {
    //const id = data?.author.id ?? null;
    const content = Array.from({length:3}).map((v,i)=>{
        const [id, src] = data ? 
            [
                data[i]?.id ?? null,
                data[i]?.imgUrl[0] ?? null
            ]:[
                i,
                null
            ]
        if (id==null){
            return <></>
        }
        return (
            <Col md={"4"} className={style('col')} key={id}>
                <div className={style('image-box')} onClick={() => handleClick(0)}>
                    <img className={style('img')} src={src} alt={src} />
                </div>
            </Col>

        )
    })


    const handleClick = (v) => {
        setModalContent(data[v]);
    }

    //모달과 중복된 부분 합쳐야 함.
    return (
        <Row>
            {content}
        </Row>
    )
}

export default memo(Content);