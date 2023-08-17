import axios from 'axios';

//유저 정보 가져오기
const getUserInfo = async (sessionId) => {
    try{
        console.log("request server by ",sessionId);
        //axios로 유저 정보 서버에 요청
        const response = await axios.post(process.env.REACT_APP_SERVER_URL+"/sessionCheck",{
            body:{
                sessionId
            }
        })
        console.log(response);
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