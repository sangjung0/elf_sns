//import axios from 'axios';

const getCommentData = async(sessionId, contentId, currentPage, loadValue) => {
    //세션아이디, 현재페이지, 가져오고싶은 페이지 양
    //세션아이디 모두 전달받는거 말고 여기서 받는걸로 하면 될듯
    console.log(sessionId, contentId, currentPage, loadValue);
    try{
        console.log("get contents by ",sessionId);
        if (!sessionId){
            return {
                state: "FAILURE",
                data: null
            }
        }
        
        

        //axios로 유저 정보 서버에 요청
        // const response = await axios.post(
        //     process.env.REACT_APP_SERVER_URL+"/getContents",
        //     {
        //         sessionId,
        //         currentPage,
        //         loadingPage,
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

        //test 영역
        const totalPage = 1000000000000000000000;
        const requiredPage = currentPage + loadValue <= 0 ? 0: currentPage + loadValue > totalPage ? totalPage:currentPage+loadValue;
        const loadingValue = Math.abs(requiredPage-currentPage);
        const additionalValue = requiredPage >= currentPage ? 1: -1;
        console.log(loadingValue);
        const data = Array.from({length:loadingValue}).map((_,index)=>({
            commentId:"commentId_"+(currentPage+(index+1)*additionalValue),
            userId:"userId_123123",
            createAt:1698469752808,
            comment:"와 진짜 개공감 ㅇㅈ"
        }));
        console.log("코멘트",data);
        if (data === []){
            return {
                state: "FAILURE",
                totalPage: totalPage,
                lastLoadPage: requiredPage,
                data: null
            }
        }

        return {
            state: "SUCCESS",
            totalPage: totalPage,
            lastLoadPage: requiredPage, //현재로써는. 중앙부터 불러온다면 검증 필요
            data: data
        }
    }catch(e){
        return {
            state: "ERROR",
            data: null,
            error: e
        }
    }

}

export default getCommentData;