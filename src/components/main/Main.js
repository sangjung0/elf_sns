
import classNames from 'classnames/bind';
import { Container } from 'react-bootstrap';

import Header from './Header';
// import SideMenu from './SideMenu';
import SideMenuContainer from '../../containers/SideMenuContainer';
import Content from './Content';
import SideMenu from './SideMenu';
import InfiniteScroll from './InfiniteScroll';

import mainStyle from '../../styles/main/main.module.scss';
import { useCallback, useState } from 'react';
const style = classNames.bind(mainStyle);

const Main = ({ userInfo, contentsData, loadPage }) => {
    const [showSideMenu, setShowSideMenu] = useState(false);

    const onClickHamburger = useCallback(() => {
        setShowSideMenu(state => !state);
    }, [])


    return (
        <>
            <Header onClickHamburger={onClickHamburger} follower={userInfo.follower} following={userInfo.following} />
            {showSideMenu && <SideMenu onClickHamburger={onClickHamburger} />}
            <Container className={style('wrap')}>
                <InfiniteScroll contentsData={contentsData} loadPage={loadPage} />
            </Container>
        </>
    )
}

export default Main;