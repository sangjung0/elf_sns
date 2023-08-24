// test data
import randomName from './faker';

// 친구 정보 가져오기
const getFriendInfo = (sessionId, currentPage, loadValue) => {
    try {
        console.log("request server by ", sessionId);

        if (!sessionId)
            return {
                state: "FAILURE",
                data: []
            }

        // test dataconst totalPage = 100;
        const totalPage = 100;
        const requiredPage = currentPage + loadValue <= 0 ? 0: currentPage + loadValue > totalPage ? totalPage:currentPage+loadValue;
        const loadingValue = Math.abs(requiredPage-currentPage);
        const additionalValue = requiredPage >= currentPage ? 1: -1;
        const data = Array.from({length:loadingValue}).map((_,index)=>({ 
            id: "userId_"+(currentPage+(index+1)*additionalValue),
            name: randomName() 
        }));

        return {
            state: "SUCCESS",
            data: data,
            totalPage: totalPage,
            lastLoadPage: requiredPage,
        }
    } catch (e) {
        return {
            state: "ERROR",
            data: [],
            error: e
        }
    }
}

export default getFriendInfo;