import classNames from 'classnames/bind';
import { Container } from 'react-bootstrap';
// import { useDispatch, useSelector } from 'react-redux';

import Header from './Header';
// import SideMenu from './SideMenu';
import SideMenuContainer from '../../containers/SideMenuContainer';

// import { getFriend } from '../../lib/modules/friendInfo';
// import SideMenu from './SideMenu';
import WindowInfiniteScroll from './WindowInfiniteScroll';
import Content from './Content';
import ContentModal from './ContentModal';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import mainStyle from '../../styles/main/main.module.scss';
import { useState, useEffect } from 'react';
const style = classNames.bind(mainStyle);

const Main = ({ userInfo, contentsInfo, loadPage }) => {
    const [showSideMenu, setShowSideMenu] = useState(false);
    const [modalContent, setModalContent] = useState(null);

    const onClickHamburger = () => {
        setShowSideMenu(state => !state);
    }

    // const [allam, setAllam] = useState(userInfo.allam)
    const [allam, setAllam] = useState([])
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
    const onRemove = (e) => {
        e.preventDefault()
        setAllam(allam.filter(i => i !== e.target.classList[0] + " " + e.target.classList[1]))
    }


    return (
        <>
            <Header onClickHamburger={onClickHamburger} allam={allam} setAllam={onRemove} follower={userInfo.follower} following={userInfo.following} />
            {showSideMenu && <SideMenuContainer onClickHamburger={onClickHamburger} />}
            {modalContent && <ContentModal modalContent={modalContent} setModalContent={setModalContent} />}
            <Container className={style('wrap')}>
                <WindowInfiniteScroll
                    contentsData={contentsInfo.data}
                    totalPage={contentsInfo.totalPage}
                    loadPage={loadPage}
                    defaultHeight={885}
                    defaultLoadPage={10}
                >
                    <Content setModalContent={setModalContent} />
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