import classNames from 'classnames/bind';
import { Container } from 'react-bootstrap';
// import { useDispatch, useSelector } from 'react-redux';

import Header from './Header';
// import SideMenu from './SideMenu';
import SideMenuContainer from '../../containers/SideMenuContainer';

// import { getFriend } from '../../lib/modules/friendInfo';
// import SideMenu from './SideMenu';
import InfiniteScroll from './InfiniteScroll';
import Content from './Content';
import ContentModal from './ContentModal';

import mainStyle from '../../styles/main/main.module.scss';
import { useState } from 'react';
const style = classNames.bind(mainStyle);

const Main = ({ userInfo, contentsInfo, loadPage }) => {
    const [showSideMenu, setShowSideMenu] = useState(false);
    const [modalContent, setModalContent] = useState(null);

    const onClickHamburger = () => {
        setShowSideMenu(state => !state);
    }

    return (
        <>
            <Header onClickHamburger={onClickHamburger} follower={userInfo.follower} following={userInfo.following} />
            {showSideMenu && <SideMenuContainer onClickHamburger={onClickHamburger} />}
            {modalContent && <ContentModal modalContent={modalContent} setModalContent={setModalContent} />}
            <Container className={style('wrap')}>
                <InfiniteScroll 
                    contentsData={contentsInfo.data}
                    totalPage={contentsInfo.totalPage}
                    loadPage={loadPage}
                    defaultHeight={885}
                    defaultLoadPage={10}
                >
                    <Content setModalContent={setModalContent}/>
                </InfiniteScroll>
            </Container>
        </>
    )
}

export default Main;