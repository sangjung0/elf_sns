import axios from 'axios';

const getUserInfo = async (sessionId) => {
    try{
        console.log("request server by ",sessionId);
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