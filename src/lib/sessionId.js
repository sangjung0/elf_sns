// import axios from 'axios';
import Cookies from 'js-cookie';

//로그인 및 세션 등록
export const setSessionId = async(email, password) => {
    try{
        console.log("register request server by ",email);
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
        // console.log(response.data.state);
        // console.lpg(response.data.payload);
        // console.log(response.data.payload.sessionId);
        // console.log(response.data.payload.userId);
        // Cookies.set("session_id",response.data.sessionId);
        // return {sessionId: response.data.payload.sessionId, userId:response.data.payload.userId, status:response.data.state};
        // // {
        //     // state: "SUCCESS", or "FAILURE", "ERROR"
        //     // payload: {
        //     //     sessionId: "string",
        //     //     userId: "string"
        //     // }
        // // }

        const sessionId = "1234";
        const userId = "userId_1234";
        Cookies.set("session_id",sessionId);
        return {sessionId, userId, status:"SUCCESS"};
    }catch(e){
        console.error(e);
        return {error:e, status:"ERROR"};
    }

}

//세션 id 가져오기
export const getSessionId = () => {
    return Cookies.get("session_id");
}
