
import classNames from 'classnames/bind';
import { Container } from 'react-bootstrap';

import Header from './Header';
// import SideMenu from './SideMenu';
import SideMenuContainer from '../../containers/SideMenuContainer';
import Content from './Content';

import mainStyle from '../../styles/main/main.module.scss';
import { useCallback, useState } from 'react';
const style = classNames.bind(mainStyle);

const Main = () => {
    const [showSideMenu, setShowSideMenu] = useState(false);

    const onClickHamburger = useCallback(() => {
        setShowSideMenu(state => !state);
    }, [])

    return (
        <>
            <Header onClickHamburger={onClickHamburger} />
            {showSideMenu && <SideMenuContainer onClickHamburger={onClickHamburger} />}
            <Container className={style('wrap')}>
                <Content />
                <Content />
                <Content />
            </Container>
        </>
    )
}

export default Main;