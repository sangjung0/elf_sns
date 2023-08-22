import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import SideMenu from '../components/main/SideMenu';
import { getFriend, allam, unfollow, block } from '../lib/modules/friendInfo';

const SideMenuContainer = ({ onClickHamburger }) => {
    const info = useSelector(state => state.friendInfo.payload);
    const dispatch = useDispatch();
    const getFriendInfo = useCallback(() => dispatch(getFriend(1)), [dispatch])
    const onAllam = useCallback(() => dispatch(allam()), [dispatch])
    const onUnfollow = useCallback(() => dispatch(unfollow()), [dispatch])
    const onBlock = useCallback(() => dispatch(block()), [dispatch])

    const [friend, setFriend] = useState(info)

    useEffect(() => {
        getFriendInfo();
        setFriend(info)
    }, [])

    return (
        <SideMenu
            onClickHamburger={onClickHamburger}
            friend={friend}
            getFriendInfo={getFriendInfo}
            onAllam={onAllam}
            onUnfollow={onUnfollow}
            onBlock={onBlock}
        />
    )
}

export default SideMenuContainer;