import classNames from 'classnames/bind';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { memo, useRef, useState } from 'react';

import SideItem from './SideItem';
import Loading from '../Loading';
import InfiniteScroll from './InfiniteScroll';
import getFriendInfo from '../../lib/getFriendInfo';

import sideMenuStyle from '../../styles/main/sideMenu.module.scss';
const style = classNames.bind(sideMenuStyle);

const LOAD_PAGE_VALUE = 10;
const SideMenu = ({ onClickHamburger }) => {
    const [friendsInfo, setFriendsInfo] = useState([]);
    const totalPage = useRef(1);

    const loadPage = async() => {
        const response = await getFriendInfo(friendsInfo.length, LOAD_PAGE_VALUE);
        
        switch (response.state){
            case "SUCCESS":
                setFriendsInfo([...friendsInfo, ...response.data]);
                totalPage.current = response.totalPage;
                break;
            case "ERROR":
                console.error(response.e);
            case "FAILURE":
            default:
                totalPage.current = 0;
                setFriendsInfo([]);
        }
    }


    return (
        <>
            <div className={style('side-container')}>
                <div className={style('close-container')}>
                    <span onClick={onClickHamburger}><AiOutlineCloseCircle /></span>
                </div>
                <div className={style('item-container')}>
                    <InfiniteScroll
                        contentsData={friendsInfo}
                        totalPage={totalPage.current}
                        loadPage={loadPage}
                        defaultHeight={75}
                        defaultLoadPage={10}
                    >
                        <SideItem/>
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