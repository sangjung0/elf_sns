import axios from 'axios';
import { getSessionId } from "./sessionId";

export const upload = async (formData) => {
    try {
        const sessionId = getSessionId();
        console.log("upload by ", sessionId);

        if (!sessionId)
            return {
                state: "FAILURE",
                data: []
            }
        const response = await axios.post(
            process.env.REACT_APP_SERVER_URL + "/file/upload", formData,
            // process.env.REACT_APP_SERVER_URL + "/ge",
            {
                withCredentials: true,
                headers: {
                    "Content-Type": `multipart/form-data`,
                }
            }
        )

        console.group("Upload");
        console.log(response);
        console.log(response.data.state);
        console.groupEnd();
        return {
            state: response.data.state,
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