import classNames from 'classnames/bind';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { memo, useEffect, useState } from 'react';

import SideItem from './SideItem';
import Loading from '../Loading';

import sideMenuStyle from '../../styles/main/sideMenu.module.scss';
const style = classNames.bind(sideMenuStyle);

const SideMenu = ({ onClickHamburger, friend, getFriendInfo, onAllam, onUnfollow, onBlock }) => {
    if (friend === null) return <Loading />
    return (
        <>
            <div className={style('side-container')}>
                <div className={style('close-container')}>
                    <span onClick={onClickHamburger}><AiOutlineCloseCircle /></span>
                </div>
                <div className={style('item-container')}>
                    {
                        friend.map((i, index) => (
                            <SideItem key={index} friendInfo={i} onAllam={onAllam} onUnfollow={onUnfollow} onBlock={onBlock} />
                        ))
                    }
                </div>
                <div className={style('button-container')}>
                    <button className={style('friend-add-button')} >친구 추가</button>
                </div>
            </div>
        </>
    )
}

export default memo(SideMenu);