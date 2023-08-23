// test data
import randomName from './faker';

// 친구 정보 가져오기
const getFriendInfo = async (userId) => {
    try {
        console.log("request server by ", userId);

        if (!userId)
            return {
                state: "FAILURE",
                data: []
            }

        // test data
        const arr = []
        for (let i = 0; i < 10; i++) arr.push({ name: randomName() })
        console.log('arr: ', arr)

        return {
            state: "SUCCESS",
            data: arr
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