import classNames from 'classnames/bind';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { memo, useRef, useState } from 'react';

import SideItem from './SideItem';
import Loading from '../Loading';
import InfiniteScroll from './InfiniteScroll';
import {getFriendData, removeFriendData} from '../../lib/friendData';

import sideMenuStyle from '../../styles/main/sideMenu.module.scss';
const style = classNames.bind(sideMenuStyle);

const LOAD_PAGE_VALUE = 10;

const SideMenu = ({ onClickHamburger }) => {
    const [friendsInfo, setFriendsInfo] = useState([]);
    const [friendName, setFriendName] = useState("");
    const [_timeout, _setTimeout] = useState(null);
    const totalPage = useRef(1);

    const reloadPage = (id) => {
        loadPage(LOAD_PAGE_VALUE, friendsInfo.filter((friend) => friend.id < id));
    }

    const loadPage = async (loadPageValue, array = friendsInfo, string="") => {
        const response = await getFriendData(array[array.length - 1]?.id ?? null, loadPageValue, string);

        switch (response.state) {
            case "SUCCESS":
                console.log([...array, ...response.data]);
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

    const onUnfollow = async(id) => {
        const response = await removeFriendData(id);

        switch (response.state) {
            case "SUCCESS":
                reloadPage(id);
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
        if (_timeout !== null){
            clearTimeout(_timeout);
        }
        return _setTimeout(setTimeout(()=>{
            loadPage(LOAD_PAGE_VALUE, [], target.value);
        },500));

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
                        <SideItem onUnfollow={onUnfollow} />
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