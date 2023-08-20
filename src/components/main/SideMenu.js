import classNames from 'classnames/bind';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { memo } from 'react';

import SideItem from './SideItem';

import sideMenuStyle from '../../styles/main/sideMenu.module.scss';
const style = classNames.bind(sideMenuStyle);

const SideMenu = ({onClickHamburger}) => {
    return (
        <>
        <div className={style('side-container')}>
            <div className={style('close-container')}>
                <span onClick={onClickHamburger}><AiOutlineCloseCircle/></span>
            </div>
            <div className={style('item-container')}>
                <SideItem/>
                <SideItem/>
                <SideItem/>
                <SideItem/>
                <SideItem/>
                <SideItem/>
                <SideItem/>
                <SideItem/>
                <SideItem/>
                <SideItem/>
                <SideItem/>
                <SideItem/>
                <SideItem/>
                <SideItem/>
                <SideItem/>
                <SideItem/>
                <SideItem/>
                <SideItem/>
            </div>
            <div className={style('button-container')}>
                <button className={style('friend-add-button')} >친구 추가</button>
            </div>
        </div>
        </>
    )
}

export default memo(SideMenu);