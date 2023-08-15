//import axios from 'axios';

const getUserInfo = async (sessionId) => {
    try{
        // axios로 서버에 요청
        // axios.post(...)
        console.log("request server by ",sessionId);
        if (!sessionId){
            return {
                state: "FAILURE",
                data: null
            }
        }
        return {
            state: "SUCCESS",
            data: {
                id: "userId_1234",
                email: "userEmail_1234@gmail.com"
            }
        }
    }catch(e){
        return {
            state: "ERROR",
            data: null,
            error: e
        }
    }
}

export default getUserInfo;