import classNames from 'classnames/bind';
import { BsBell } from 'react-icons/bs';
import { BiBlock } from 'react-icons/bi';
import { SlUserUnfollow } from 'react-icons/sl';
import { memo } from 'react';

import ProfileImage from './ProfileImage';
import sideItemStyle from '../../styles/main/sideItem.module.scss';
const style = classNames.bind(sideItemStyle);

const SideBlock = () => {

    return (
        <div className={style('sideitem-container')}>
            <div className={style('allam')}>
                <span><BsBell/></span>
            </div>
            <div className={style('user-card')}>
                <div className={style('box')}>
                    <ProfileImage/>
                </div>
                <div className={style('user-info')}>
                    <div className={style('user-name')}>
                        <span>유저 이름</span>
                    </div>
                    <div className={style('user-settings')}>
                        <span><SlUserUnfollow/></span>
                        <span><BiBlock/></span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default memo(SideBlock);