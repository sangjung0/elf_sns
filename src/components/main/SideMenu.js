import classNames from 'classnames/bind';

import SideBlock from './sideItem';

import sideMenuStyle from '../../styles/main/sideMenu.module.scss';
const style = classNames.bind(sideMenuStyle);

const SideMenu = () => {
    return (
        <>
        <div className={style('side-container')}>
            <div className={style('close-container')}>
                <span>닫기</span>
            </div>
            <div className={style('item-container')}>
                <SideBlock/>
                <SideBlock/>
                <SideBlock/>
                <SideBlock/>
                <SideBlock/>
                <SideBlock/>
                <SideBlock/>
                <SideBlock/>
                <SideBlock/>
                <SideBlock/>
                <SideBlock/>
                <SideBlock/>
                <SideBlock/>
                <SideBlock/>
                <SideBlock/>
            </div>
            <div className={style('button-container')}>
                <button className={style('friend-add-button')} >친구 추가</button>
            </div>
        </div>
        </>
    )
}

export default SideMenu;