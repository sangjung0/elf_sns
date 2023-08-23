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
        //         withCredentials: true,
        //         headers:{
        //             "Content-Type": `application/json`,
        //             'Access-Control-Allow-Origin': '*',
        //             'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        //         }    
        //     }
        // )
        // console.group("getUserInfo");
        // console.log(response.data.state);
        // console.log(response.data.payload);
        // console.log(response.data.payload.userId);
        // console.groupEnd();
        // return {
        //     state: response.data.state,
        //     data: {
        //         userId: response.data.payload.userId,
        //     }
        // }

        // // {
        // //     state: "SUCCESS", or "FAILURE", "ERROR"
        // //     payload: {
        // //         userId: "string",
        // //     }
        // // }
        
        return {
            state: "SUCCESS",
            data: { //일단 유저 데이터에 었는데 알람 리덕스하고 친구 리덕스 있으면 괜찮을지도
                id: "userId_1234",
                alarm: 12,
                follwer: 213,
                following: 123
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