import classNames from 'classnames/bind';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { memo, useEffect, useState } from 'react';

import SideItem from './SideItem';
import Loading from '../Loading';

import InfiniteScroll from 'react-infinite-scroll-component';

import sideMenuStyle from '../../styles/main/sideMenu.module.scss';
const style = classNames.bind(sideMenuStyle);

const SideMenu = ({ onClickHamburger, info, getFriendInfo, onAllam, onUnfollow, onBlock }) => {
    const [friend, setFriend] = useState(info)

    useEffect(() => {
        getFriendInfo();
        setFriend(info)
    }, [])

    if (friend === null) return <Loading />
    if (friend.map === undefined) return <Loading />
    return (
        <>
            <div className={style('side-container')}>
                <div className={style('close-container')}>
                    <span onClick={onClickHamburger}><AiOutlineCloseCircle /></span>
                </div>
                <div className={style('item-container')}>
                    {/* <InfiniteScroll
                        dataLength={friend.length}
                        next={getFriendInfo}
                        hasMore={true}
                        loader={<h4>Loading...</h4>}
                    > */}
                    {
                        friend.map((i, index) => (
                            <SideItem key={index} friendInfo={i} onAllam={onAllam} onUnfollow={onUnfollow} onBlock={onBlock} />
                        ))
                    }
                    {/* </InfiniteScroll> */}
                </div>
                <div className={style('button-container')}>
                    <button className={style('friend-add-button')} >친구 추가</button>
                </div>
            </div>
        </>
    )
}

export default memo(SideMenu);