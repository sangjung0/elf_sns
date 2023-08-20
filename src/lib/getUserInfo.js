// import axios from 'axios';

//유저 정보 가져오기
const getUserInfo = async (sessionId) => {
    try{
        console.log("request server by ",sessionId);
        if (!sessionId){
            return {
                state: "FAILURE",
                data: null
            }
        }
        //axios로 유저 정보 서버에 요청
        // const response = await axios.post(
        //     process.env.REACT_APP_SERVER_URL+"/sessionCheck",
        //     {
        //         sessionId
        //     },{
        //         headers:{
        //             "Content-Type": `application/json`,
        //             'Access-Control-Allow-Origin': '*',
        //             'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        //         }    
        //     }
        // )
        // console.log(response.data.state);
        // console.log(response.data.payload);
        // console.log(response.data.payload.userId);
        // return {
        //     state: response.data.state,
        //     data: {
        //         userId: response.data.payload.userId,
        //     }
        // }

        // {
        //     state: "SUCCESS", or "FAILURE", "ERROR"
        //     payload: {
        //         userId: "string",
        //     }
        // }
        
        return {
            state: "SUCCESS",
            data: {
                id: "userId_1234",
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