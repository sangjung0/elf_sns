
import classNames from 'classnames/bind';

import Header from './Header';
import SideMenu from './SideMenu';
import Content from './Content';

import mainStyle from '../../styles/main/main.module.scss';
const style = classNames.bind(mainStyle);

const Main = () => {
    return(
        <>
        <Header/>
        <SideMenu/>
        <div className={style('wrap')}>
            <div className={style('contents')}>
                <Content/>
            </div>
        </div>
        </>
    )
}

export default Main;