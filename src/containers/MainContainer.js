import { useSelector } from 'react-redux';

import Main from '../components/main/Main';

const MainContainer = () => {
    const userInfo = useSelector(state => state.userInfo.payload.data);

    return (
        <Main userInfo={userInfo}/>
    )
}

export default MainContainer;