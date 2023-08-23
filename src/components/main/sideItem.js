import classNames from 'classnames/bind';
import { BsBell } from 'react-icons/bs';
import { BiBlock } from 'react-icons/bi';
import { SlUserUnfollow } from 'react-icons/sl';
import { memo } from 'react';

import ProfileImage from './ProfileImage';
import sideItemStyle from '../../styles/main/sideItem.module.scss';
const style = classNames.bind(sideItemStyle);

const SideItem = ({ friendInfo, onAllam, onUnfollow, onBlock }) => {

    return (
        <div className={style('sideitem-container')}>
            <div className={style('allam')}>
                <span onClick={onAllam}><BsBell /></span>
            </div>
            <div className={style('user-card')}>
                <div className={style('box')}>
                    <ProfileImage />
                </div>
                <div className={style('user-info')}>
                    <div className={style('user-name')}>
                        <span>{friendInfo.name}</span>
                    </div>
                    <div className={style('user-settings')}>
                        <span onClick={onUnfollow}><SlUserUnfollow /></span>
                        <span onClick={onBlock}><BiBlock /></span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default memo(SideItem);