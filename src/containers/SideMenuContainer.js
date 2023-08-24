import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import SideMenu from '../components/main/SideMenu';
import { getFriend, allam, unfollow, block } from '../lib/modules/friendInfo';

const SideMenuContainer = ({ onClickHamburger }) => {
    const info = useSelector(state => state.friendInfo);
    // const lastLooadFriend = useSelector(state => state.friendInfo.lastLoadFriend)

    const dispatch = useDispatch();
    const getFriendInfo = useCallback((currentFriend, friendValue) => dispatch(getFriend(1, currentFriend, friendValue)), [dispatch])

    const onAllam = useCallback(() => dispatch(allam()), [dispatch])
    const onUnfollow = useCallback(() => dispatch(unfollow()), [dispatch])
    const onBlock = useCallback(() => dispatch(block()), [dispatch])

    useEffect(() => {
        getFriendInfo()
        console.log('siedmenuContainer info', info.payload)
    }, [])

    const loadFriend = (value, type = "BACK") => {
        const [startPoint, loadFriendValue] = type === "BACK" ? [info.lastLoadPage, value] : [0, -value];
        // _getContentsInfo();
        getFriendInfo(startPoint, loadFriendValue);
    }

    return (
        <SideMenu
            onClickHamburger={onClickHamburger}
            info={info}
            loadFriend={loadFriend}
            onAllam={onAllam}
            onUnfollow={onUnfollow}
            onBlock={onBlock}
        />
    )
}

export default SideMenuContainer;