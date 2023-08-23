import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import SideMenu from '../components/main/SideMenu';
import { getFriend, allam, unfollow, block } from '../lib/modules/friendInfo';

const SideMenuContainer = ({ onClickHamburger }) => {
    const info = useSelector(state => state.friendInfo.payload);
    // const lastLooadFriend = useSelector(state => state.friendInfo.lastLoadFriend)

    const dispatch = useDispatch();
    const getFriendInfo = useCallback(() => dispatch(getFriend(1)), [dispatch])

    const onAllam = useCallback(() => dispatch(allam()), [dispatch])
    const onUnfollow = useCallback(() => dispatch(unfollow()), [dispatch])
    const onBlock = useCallback(() => dispatch(block()), [dispatch])

    useEffect(() => {
        getFriendInfo()
        console.log('siedmenuContainer info', info)
    }, [])

    const loadFriend = (type = "BACK") => {
        // const [startPoint, loadFriendValue] = type === "BACK" ? [lastLoadPage, LOAD_PAGE_VALUE] : [0, -LOAD_PAGE_VALUE];
        // _getContentsInfo(startPoint, loadFriendValue);
        getFriendInfo();
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