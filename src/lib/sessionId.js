import axios from 'axios';
import Cookies from 'js-cookie';

//로그인 및 세션 등록
export const setSessionId = async(email, password) => {
    try{
        console.log("register request server by ",email);
        const response = await axios.post(process.env.REACT_APP_SERVER_URL+"/signIn",{
            body:{
                email,
                password
            }
        })
        console.log(response);
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
