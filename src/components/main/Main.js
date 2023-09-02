import classNames from 'classnames/bind';
import { Container } from 'react-bootstrap';
import { useState, useRef } from 'react';

import Header from './Header';
import SideMenu from './SideMenu';
import WindowInfiniteScroll from './WindowInfiniteScroll';
import Content from './Content';
import WriteModal from './WriteModal';
import ContentModal from './ContentModal';
import {getContents} from '../../lib/contentData';

import mainStyle from '../../styles/main/main.module.scss';
import 'react-toastify/dist/ReactToastify.css';
const style = classNames.bind(mainStyle);

const LOAD_PAGE_VALUE = 40;

const Main = ({ userInfo }) => {
    const [showSideMenu, setShowSideMenu] = useState(false);
    const [modalFlag, setModalFlag] = useState(false)
    const [modalContent, setModalContent] = useState(null);
    const [contentsInfo, setContentsInfo] = useState([]);
    const totalPage = useRef(1);

    const onClickHamburger = () => {
        setShowSideMenu(state => !state);
    }

    const onClickWrite = () => {
        setModalFlag(state => !state);
    }

    const loadPage = async (defaultLoadPage, array = contentsInfo) => {
        const response = await getContents(array[array.length - 1]?.id ?? null, defaultLoadPage);
        // 실제 작동할 때는 contentsInfo.length가 아니라 id값으로 할 것.
        // getContentsInfo(contentsInfo[contentsInfo.length-1].id, LOAD_PAGE_VALUE);
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

    return (
        <>
            {/* <Header onClickHamburger={onClickHamburger} allam={allam} setAllam={onRemove} follower={userInfo.follower} following={userInfo.following} /> */}
            <Header onClickHamburger={onClickHamburger} onClickWrite={onClickWrite} follower={userInfo.follower} following={userInfo.following} />
            {showSideMenu && <SideMenu onClickHamburger={onClickHamburger} reloadPageByChangeFriendInfo={reloadPageByChangeFriendInfo} />}
            {modalFlag && <WriteModal modalFlag={modalFlag} setModalFlag={setModalFlag} userInfo={userInfo} />}
            {modalContent && <ContentModal modalContent={modalContent} setModalContent={setModalContent} reloadPage={reloadPage} userInfo={userInfo} />}
            <Container className={style('wrap')}>
                <WindowInfiniteScroll
                    contentsData={contentsInfo}
                    totalPage={totalPage.current}
                    loadPage={loadPage}
                    defaultHeight={700}
                    defaultLoadPage={LOAD_PAGE_VALUE}
                >
                    <Content setModalContent={setModalContent} reloadPage={reloadPage} userInfo={userInfo} />
                </WindowInfiniteScroll>
            </Container>
        </>
    )
}

export default Main;