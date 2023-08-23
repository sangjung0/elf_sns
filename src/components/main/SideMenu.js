import classNames from 'classnames/bind';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { memo, useEffect, useState, Suspense } from 'react';

import SideItem from './SideItem';
import Loading from '../Loading';
import InfiniteScroll from './InfiniteScroll';

import sideMenuStyle from '../../styles/main/sideMenu.module.scss';
const style = classNames.bind(sideMenuStyle);

const SideMenu = ({ onClickHamburger, info, loadFriend, onAllam, onUnfollow, onBlock }) => {
    const [friend, setFriend] = useState(info)
    console.log('sidemenu friend', friend)

    useEffect(() => {
        setFriend(info)
    }, [info])

    return (
        <>
            <div className={style('side-container')}>
                <div className={style('close-container')}>
                    <span onClick={onClickHamburger}><AiOutlineCloseCircle /></span>
                </div>
                <div className={style('item-container')}>
                    <InfiniteScroll
                        contentsData={info === null ? [] : info}
                        loadPage={loadFriend}
                        defaultHeight={700}
                        defaultLoadPage={10}
                    >
                        {/* {
                            (friend === null) ?
                                <Loading /> :
                                friend.map((i, index) => (
                                    <SideItem key={index} friendInfo={i} onAllam={onAllam} onUnfollow={onUnfollow} onBlock={onBlock} />
                                ))
                        } */}
                        <SideItem onAllam={onAllam} onUnfollow={onUnfollow} onBlock={onBlock} />
                    </InfiniteScroll>
                </div>
                <div className={style('button-container')}>
                    <button className={style('friend-add-button')} >친구 추가</button>
                </div>
            </div>
        </>
    )
}

export default memo(SideMenu);