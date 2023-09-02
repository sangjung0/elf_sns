import classNames from 'classnames/bind';
import { Col, Container, Row } from 'react-bootstrap';
import { useState, useRef } from 'react';

import Header from '../main/Header';
import SideMenu from '../main/SideMenu';
import WindowInfiniteScroll from '../main/WindowInfiniteScroll';
import Content from './Content';
import ContentModal from '../main/ContentModal';
import {getMyContents} from '../../lib/contentData';
import ProfileImage from '../main/ProfileImage';
import {upload} from '../../lib/file';

import mypageStyle from '../../styles/mypage/mypage.module.scss';
import 'react-toastify/dist/ReactToastify.css';
const style = classNames.bind(mypageStyle);

const LOAD_PAGE_VALUE = 120;
const COL_VALUE = 3;

const Main = ({ userInfo, getUserInfo }) => {
    const [showSideMenu, setShowSideMenu] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    const [contentsInfo, setContentsInfo] = useState([]);
    const totalPage = useRef(1);
    const fileInputRef = useRef(null);

    const onClickHamburger = () => {
        setShowSideMenu(state => !state);
    }

    const handleButtonClick = () => {
        fileInputRef.current.click(); // 파일 선택 화면 열기
    };  

    const handleFileChange = async (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            const formData = new FormData();
            formData.append('file', selectedFile);
            const response = await upload(formData);
            if(response.state !== 'SUCCESS') {
                alert("업로드 실패");
                return;
            }
            getUserInfo();
        }
    };

    const loadPage = async (defaultLoadPage, array=contentsInfo) => {
        const response = await  getMyContents(array[array.length-1]?.id ?? null, defaultLoadPage);
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
                                    <ProfileImage src={userInfo.img}/>
                            </div>
                        </Col>
                        <Col md={"6"}>
                            <div className={style('info')}>
                                <h1>{userInfo.name}</h1>
                                <h2>친구</h2>
                                <h3>
                                    <span>{userInfo.friendNumber}명</span>   
                                </h3>
                                <br></br>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    style={{ display: 'none' }}
                                    onChange={handleFileChange}
                                />
                                <button onClick={handleButtonClick}>프로필 사진 업로드</button>
                                <h2>비밀번호 변경</h2>  
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