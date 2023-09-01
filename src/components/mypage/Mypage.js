import classNames from 'classnames/bind';
import { Col, Container, Row } from 'react-bootstrap';
import { useState, useRef } from 'react';

import Header from '../main/Header';
import SideMenu from '../main/SideMenu';
import WindowInfiniteScroll from '../main/WindowInfiniteScroll';
import Content from './Content';
import ContentModal from '../main/ContentModal';
import getContentsInfo from '../../lib/getContentsInfo';
import ProfileImage from '../main/ProfileImage';

import mypageStyle from '../../styles/mypage/mypage.module.scss';
import 'react-toastify/dist/ReactToastify.css';
const style = classNames.bind(mypageStyle);

const LOAD_PAGE_VALUE = 120;
const COL_VALUE = 3;

const Main = ({ userInfo }) => {
    console.log(userInfo);
    const [showSideMenu, setShowSideMenu] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    const [contentsInfo, setContentsInfo] = useState([]);
    const totalPage = useRef(1);

    const onClickHamburger = () => {
        setShowSideMenu(state => !state);
    }


    const loadPage = async (defaultLoadPage, array=contentsInfo) => {
        const response = await  getContentsInfo(array[array.length-1]?.id ?? null, defaultLoadPage);
        switch (response.state) {
            case "SUCCESS":
                setContentsInfo([...array, ...response.data]);
                totalPage.current = response.totalPage;
                break;
            case "ERROR":
                console.error(response.e);
            case "FAILURE":
            default:
                totalPage.current = 0;
                setContentsInfo([]);
        }
    }

    const reloadPage = (contentId) => {
        const contentIndex = contentsInfo.findIndex(content => content.id === contentId);
        loadPage(LOAD_PAGE_VALUE, contentsInfo.filter((_, index) => index < contentIndex));
    }

    const reloadPageByChangeFriendInfo = () => {
        loadPage(LOAD_PAGE_VALUE, []);
    }
    const contentArray = Array.from({length: Math.ceil(contentsInfo.length/COL_VALUE)}, (v,i)=>
        contentsInfo.slice(i * COL_VALUE, i * COL_VALUE + COL_VALUE)
    );

    return (
        <>
            {/* <Header onClickHamburger={onClickHamburger} allam={allam} setAllam={onRemove} follower={userInfo.follower} following={userInfo.following} /> */}
            <Header onClickHamburger={onClickHamburger} follower={userInfo.follower} following={userInfo.following} />
            {showSideMenu && <SideMenu onClickHamburger={onClickHamburger} reloadPageByChangeFriendInfo={reloadPageByChangeFriendInfo}/>}
            {modalContent && <ContentModal modalContent={modalContent} setModalContent={setModalContent} reloadPage={reloadPage} userInfo={userInfo}/>}
            <Container className={style('wrap')}>
                <div className={style('user-info')}>
                    <Row>
                        <Col md={"6"}>
                            <div className={style('box')}> 
                                <div className={style('image-box')}>
                                    <ProfileImage src={userInfo.img}/>
                                </div>
                            </div>
                        </Col>
                        <Col md={"6"}>
                            <div className={style('info')}>
                                <h1>친구</h1>
                                <h2>
                                    <span>113명</span>   
                                </h2>
                                <br></br>
                                <h2>프로필 사진 업로드</h2>
                                <h2>비밀번호 변경</h2>x  
                            </div>
                        </Col>
                    </Row>
                </div>
                <WindowInfiniteScroll
                    contentsData={contentArray}
                    totalPage={Math.ceil(totalPage.current/3)}
                    loadPage={loadPage}
                    defaultHeight={700}
                    defaultLoadPage={LOAD_PAGE_VALUE}
                >
                    <Content setModalContent={setModalContent} reloadPage={reloadPage} userInfo={userInfo}/>
                </WindowInfiniteScroll>
            </Container>
        </>
    )
}

export default Main;