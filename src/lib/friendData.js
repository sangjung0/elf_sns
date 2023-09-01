import axios from 'axios';
import { getSessionId } from "./sessionId";

// 친구 정보 가져오기
export const getFriendData = async (currentId, requestValue, friendName) => {
    try {
        const sessionId = getSessionId();
        console.log("get freinds by ", sessionId);

        if (!sessionId)
            return {
                state: "FAILURE",
                data: []
            }
        const response = await axios.post(
            // process.env.REACT_APP_SERVER_URL+"/friend/get",
            process.env.REACT_APP_SERVER_URL + "/test/makeFriends",
            {
                sessionId,
                currentId,
                requestValue,
                friendName
            }, {
            withCredentials: true,
            headers: {
                "Content-Type": `application/json`,
            }
        }
        )

        console.group("Friends-get");
        console.log(response);
        console.log(response.data.state);
        console.log(response.data.payload.totalPage);
        console.log(response.data.payload);
        console.groupEnd();
        return {
            state: response.data.state,
            totalPage: response.data.payload.totalPage,
            data: response.data.payload.data
        }

        // test dataconst totalPage = 100;
        // const totalPage = 200;
        // const requiredPage = currentPage + loadValue <= 0 ? 0 : currentPage + loadValue > totalPage ? totalPage : currentPage + loadValue;
        // const loadingValue = Math.abs(requiredPage - currentPage);
        // const additionalValue = requiredPage >= currentPage ? 1 : -1;
        // const data = Array.from({ length: loadingValue }).map((_, index) => ({
        //     id: "userId_" + (currentPage + (index + 1) * additionalValue),
        //     name: randomName()
        // }));

        // return {
        //     state: "SUCCESS",
        //     data: data,
        //     totalPage: totalPage,
        // }
    } catch (e) {
        return {
            state: "ERROR",
            data: [],
            error: e
        }
    }
}

export const removeFriendData = async (id) => {
    try {
        const sessionId = getSessionId();
        console.log("get freinds by ", sessionId);

        if (!sessionId)
            return {
                state: "FAILURE",
                data: []
            }
        const response = await axios.post(
            process.env.REACT_APP_SERVER_URL + "/friend/remove",
            {
                sessionId,
                id,
            }, {
            withCredentials: true,
            headers: {
                "Content-Type": `application/json`,
            }
        }
        )

        console.group("Friends-remove");
        console.log(response);
        console.log(response.data.state);
        console.groupEnd();
        return {
            state: response.data.state
        }

        // test dataconst totalPage = 100;
        // const totalPage = 200;
        // const requiredPage = currentPage + loadValue <= 0 ? 0 : currentPage + loadValue > totalPage ? totalPage : currentPage + loadValue;
        // const loadingValue = Math.abs(requiredPage - currentPage);
        // const additionalValue = requiredPage >= currentPage ? 1 : -1;
        // const data = Array.from({ length: loadingValue }).map((_, index) => ({
        //     id: "userId_" + (currentPage + (index + 1) * additionalValue),
        //     name: randomName()
        // }));

        // return {
        //     state: "SUCCESS",
        //     data: data,
        //     totalPage: totalPage,
        // }
    } catch (e) {
        return {
            state: "ERROR",
            data: [],
            error: e
        }
    }
}
