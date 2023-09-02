import classNames from 'classnames/bind';
import { BsBell } from 'react-icons/bs';
import { SlUserUnfollow } from 'react-icons/sl';
import { SlUserFollow } from 'react-icons/sl';
import { memo } from 'react';

import ProfileImage from './ProfileImage';
import sideItemStyle from '../../styles/main/sideItem.module.scss';
const style = classNames.bind(sideItemStyle);

const SideItem = ({ data, onAllam, onUnfollow, onFollow}) => {
    const name = data?.name ?? null;
    const src = data?.img ?? null;
    // const userId = data?.userId ?? null;
    const id = data?.id ?? null;
    const isFriend = data?.isFriend ?? false;

    const handleUnFollow = () => {
        onUnfollow( id, name );
    }

    const handleFollow = () => {
        onFollow( id, name);
    }

    const ShowMark = () => {
        if(isFriend) {
            return (
                <span onClick={handleUnFollow}><SlUserUnfollow /></span>
            )
        }
        return (
            <span onClick={handleFollow}><SlUserFollow /></span>
        )
    }

    return (
        <div className={style('sideitem-container')}>
            <div className={style('allam')}>
                <span onClick={onAllam}><BsBell /></span>
            </div>
            <div className={style('user-card')}>
                <div className={style('box')}>
                    <ProfileImage src={src} />
                </div>
                <div className={style('user-info')}>
                    <div className={style('user-name')}>
                        <span>{name}</span>
                    </div>
                    <div className={style('user-settings')}>
                        <ShowMark/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default memo(SideItem);