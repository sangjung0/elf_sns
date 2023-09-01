import classNames from 'classnames/bind';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { memo, useRef, useState } from 'react';

import SideItem from './SideItem';
import Loading from '../Loading';
import InfiniteScroll from './InfiniteScroll';
import {getFriendData, removeFriendData, addFriendData} from '../../lib/friendData';

import sideMenuStyle from '../../styles/main/sideMenu.module.scss';
const style = classNames.bind(sideMenuStyle);

const LOAD_PAGE_VALUE = 40;

const SideMenu = ({ onClickHamburger, reloadPageByChangeFriendInfo }) => {
    const [friendsInfo, setFriendsInfo] = useState([]);
    const [friendName, setFriendName] = useState("");
    const timeout = useRef(null);
    const totalPage = useRef(1);

    const reloadPage = (name) => {
        loadPage(LOAD_PAGE_VALUE, friendsInfo.filter((friend) => name.localeCompare(friend.name) > 0));
    }

    const loadPage = async (loadPageValue, array = friendsInfo, string=friendName) => {
        const response = await getFriendData(array[array.length - 1]?.name ?? null, loadPageValue, string);

        switch (response.state) {
            case "SUCCESS":
                setFriendsInfo([...array, ...response.data]);
                totalPage.current = response.totalPage;
                break;
            case "ERROR":
                console.error(response.e);
                break;
            case "FAILURE":
                break;
            default:
                totalPage.current = 0;
                setFriendsInfo([]);
        }
    }

    const onUnfollow = async(id, name) => {
        const response = await removeFriendData(id);

        switch (response.state) {
            case "SUCCESS":
                reloadPageByChangeFriendInfo();
                reloadPage(name);
                break;
            case "ERROR":
                console.error(response.e);
                break;
            case "FAILURE":
                break;
            default:
                totalPage.current = 0;
                setFriendsInfo([]);
        }
    }

    //위의 함수와 동일함. 최적화 필요.
    const onFollow = async(id, name) => {
        const response = await addFriendData(id);

        switch (response.state) {
            case "SUCCESS":
                reloadPageByChangeFriendInfo();
                reloadPage(name);
                break;
            case "ERROR":
                console.error(response.e);
                break;
            case "FAILURE":
                break;
            default:
                totalPage.current = 0;
                setFriendsInfo([]);
        }

    }

    const handleOnChange = ({target}) => {
        setFriendName(target.value);
        if (timeout.current !== null){
            clearTimeout(timeout.current);
        }
        return timeout.current = setTimeout(()=>{
            loadPage(LOAD_PAGE_VALUE, [], target.value);
        },500);

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
                        defaultLoadPage={LOAD_PAGE_VALUE}
                    >
                        <SideItem onUnfollow={onUnfollow} onFollow={onFollow}/>
                    </InfiniteScroll>
                </div>
                <div className={style('button-container')}>
                    <input className={style('friend-input')} onChange={handleOnChange} value={friendName}></input>
                </div>
            </div>
        </>
    )
}

export default memo(SideMenu);