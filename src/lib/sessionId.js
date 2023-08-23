// import axios from 'axios';
import Cookies from 'js-cookie';

//로그인 및 세션 등록
export const setSessionId = async (email, password) => {
    try {
        console.log("register request server by ", email);
        // const response = await axios.post(
        //     process.env.REACT_APP_SERVER_URL+"/signIn",
        //     {
        //         email,
        //         password
        //     },{
        //         headers:{
        //             "Content-Type": `application/json`,
        //             'Access-Control-Allow-Origin': '*',
        //             'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        //         }    
        //     }
        // )
        // console.group("login");
        // console.log(response);
        // console.log(response.data.state);
        // console.log(response.data.payload);
        // console.log(response.data.payload.sessionId);
        // console.log(response.data.payload.userId);
        // console.groupEnd();
        // Cookies.set("SESSION",response.data.payload.sessionId,{ expires: 1, path: '/' });
        // return {sessionId: response.data.payload.sessionId, userId:response.data.payload.userId, state:response.data.state};
        // // {
        //     // state: "SUCCESS", or "FAILURE", "ERROR"
        //     // payload: {
        //     //     sessionId: "string",
        //     //     userId: "string"
        //     // }
        // // }

        const sessionId = "1234";
        const userId = "userId_1234";
        Cookies.set("SESSION", sessionId);
        return { sessionId, userId, state: "SUCCESS" };
    } catch (e) {
        console.error(e);
        return { error: e, state: "ERROR" };
    }

}

//세션 id 가져오기
export const getSessionId = () => {
    return Cookies.get("SESSION");
}
