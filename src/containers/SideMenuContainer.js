import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import SideMenu from '../components/main/SideMenu';
import { getFriend, allam, unfollow, block } from '../lib/modules/friendInfo';
import { getSessionId } from '../lib/sessionId';

const SideMenuContainer = ({ onClickHamburger }) => {
    const sessionId = getSessionId();
    const friendInfo = useSelector(state => state.friendInfo);
    // const lastLooadFriend = useSelector(state => state.friendInfo.lastLoadFriend)

    const dispatch = useDispatch();
    const getFriendInfo = useCallback((sessionId, startPoint, loadFriendValue) => dispatch(getFriend(sessionId, startPoint, loadFriendValue)), [dispatch])

    const onAllam = useCallback(() => dispatch(allam()), [dispatch])
    const onUnfollow = useCallback(() => dispatch(unfollow()), [dispatch])
    const onBlock = useCallback(() => dispatch(block()), [dispatch])

    const loadFriend = (value, type = "BACK") => {
        const [startPoint, loadFriendValue] = type === "BACK" ? [friendInfo.lastLoadPage, value] : [0, -value];
        getFriendInfo(sessionId, startPoint, loadFriendValue);
    }

    return (
        <SideMenu
            onClickHamburger={onClickHamburger}
            info={friendInfo}
            loadFriend={loadFriend}
            onAllam={onAllam}
            onUnfollow={onUnfollow}
            onBlock={onBlock}
        />
    )
}

export default SideMenuContainer;