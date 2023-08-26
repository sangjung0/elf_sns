import classNames from 'classnames/bind';
import { Container } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { useState, useEffect, useRef } from 'react';

import Header from './Header';
import SideMenu from './SideMenu';
import WindowInfiniteScroll from './WindowInfiniteScroll';
import Content from './Content';
import ContentModal from './ContentModal';
import getContentsInfo from '../../lib/getContentsInfo';

import mainStyle from '../../styles/main/main.module.scss';
import 'react-toastify/dist/ReactToastify.css';
const style = classNames.bind(mainStyle);

const LOAD_PAGE_VALUE = 20;

const Main = ({ userInfo }) => {
    const [showSideMenu, setShowSideMenu] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    const [contentsInfo, setContentsInfo] = useState([]);
    const totalPage = useRef(1);
    const [allam, setAllam] = useState([])

    const onClickHamburger = () => {
        setShowSideMenu(state => !state);
    }

    const onRemove = (e) => {
        e.preventDefault()
        setAllam(allam.filter(i => i !== e.target.classList[0] + " " + e.target.classList[1]))
    }

    const loadPage = async() => {
        const response = await getContentsInfo(contentsInfo.length, LOAD_PAGE_VALUE);
        // 실제 작동할 때는 contentsInfo.length가 아니라 id값으로 할 것.
        // getContentsInfo(contentsInfo[contentsInfo.length-1].id, LOAD_PAGE_VALUE);
        switch (response.state){
            case "SUCCESS":
                setContentsInfo([...contentsInfo, ...response.data]);
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
        setContentsInfo(contentsInfo.filter((_,index) => index < contentIndex));
        loadPage();
    }

    useEffect(() => {
        // setTimeout(() => toast("Wow so easy !"), 3000)
        const recieveAllam = setInterval(() => {
            const message = `message ${allam.length + 1}`
            toast(message)
            if (allam.length < 10)
                setAllam(allam.concat(message))
            else
                setAllam(allam.splice(1, allam.length).concat(message))
        }, 5000)

        return () => clearInterval(recieveAllam)
    }, [allam]);
    return (
        <>
            <Header onClickHamburger={onClickHamburger} allam={allam} setAllam={onRemove} follower={userInfo.follower} following={userInfo.following} />
            {showSideMenu && <SideMenu onClickHamburger={onClickHamburger} />}
            {modalContent && <ContentModal modalContent={modalContent} setModalContent={setModalContent} reloadPage={reloadPage}/>}
            <Container className={style('wrap')}>
                <WindowInfiniteScroll
                    contentsData={contentsInfo}
                    totalPage={totalPage.current}
                    loadPage={loadPage}
                    defaultHeight={700}
                    defaultLoadPage={10}
                >
                    <Content setModalContent={setModalContent} reloadPage={reloadPage} />
                </WindowInfiniteScroll>
            </Container>
            <ToastContainer
                position="bottom-left"
                autoClose="5000"
                pauseOnHover="false"
                pauseOnFocusLoss="false"
            />
        </>
    )
}

export default Main;