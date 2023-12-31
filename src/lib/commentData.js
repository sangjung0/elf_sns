import axios from 'axios';
import { getSessionId } from "./sessionId";

export const getCommentData = async(postId, commentId, requestValue ) => {
    // 현재페이지, 가져오고싶은 페이지 양
    //세션아이디 모두 전달받는거 말고 여기서 받는걸로 하면 될듯
    try{
        const sessionId = getSessionId();
        if (!sessionId){
            return {
                state: "FAILURE",
                data: null
            }
        }
        
        //axios로 유저 정보 서버에 요청
        const response = await axios.post(
            process.env.REACT_APP_SERVER_URL+"/comment/get",
            {
                sessionId,
                postId,
                commentId,
                requestValue,
            },{
                withCredentials: true,
                headers:{
                    "Content-Type": `application/json`,
                }    
            }
        )
        console.group("Comment-Get");
        console.log(response);
        console.log(response.data.state);
        console.log(response.data.payload);
        console.groupEnd();
        return {
            state: response.data.state,
            data: response.data.payload
        }

        // //test 영역
        // const data = Array.from({length:loadValue}).map((_,index)=>({
        //     commentId:"commentId_13241",
        //     userId:"userId_123123",
        //     createAt:1698469752808,
        //     comment:"와 진짜 개공감 ㅇㅈ"
        // }));
        // if (data === []){
        //     return {
        //         state: "FAILURE",
        //         data: null
        //     }
        // }

        // console.group("Comment-Get");
        // console.log("sessionId:", sessionId);
        // console.log("contentId:", contentId)
        // console.log("loadValue:", loadValue)
        // console.groupEnd();

        // return {
        //     state: "SUCCESS",
        //     data: data
        // }
    }catch(e){
        return {
            state: "ERROR",
            data: null,
            error: e
        }
    }

}

export const setComment = async( postId, content ) => {
    try{
        const sessionId = getSessionId();
        console.log("set comment by ",sessionId);
        if (!sessionId){
            return {
                state: "FAILURE",
                data: null
            }
        }
        
        const response = await axios.post(
            process.env.REACT_APP_SERVER_URL+"/comment/set",
            {
                sessionId,
                postId,
                content,
            },{
                withCredentials: true,
                headers:{
                    "Content-Type": `application/json`,
                }    
            }
        )
        console.group("Comment-Set");
        console.log(response.data.state);
        console.groupEnd();
        return {
            state: response.data.state,
        }

        // {
        //     state: "SUCCESS", or "FAILURE", "ERROR"
        //     payload: {
        //         userId: "string",
        //     }
        // }

        // //test 영역
        // console.group("Comment-Set");
        // console.log("sessionId:", sessionId);
        // console.log("contentId:", contentId);
        // console.log("text:", text);
        // console.groupEnd();

        // return {
        //     state: "SUCCESS",
        // }
    }catch(e){
        return {
            state: "ERROR",
            data: null,
            error: e
        }
    }
}

export const removeComment = async(commentId) => {
    try{
        const sessionId = getSessionId();
        console.log("remove comment by ",sessionId);
        if (!sessionId){
            return {
                state: "FAILURE",
                data: null
            }
        }
        
        const response = await axios.post(
            process.env.REACT_APP_SERVER_URL+"/comment/remove",
            {
                sessionId,
                commentId,
            },{
                withCredentials: true,
                headers:{
                    "Content-Type": `application/json`,
                }    
            }
        )
        console.group("Comment-remove");
        console.log(response.data.state);
        console.groupEnd();
        return {
            state: response.data.state,
        }

        //test 영역
        // console.group("Comment-Set");
        // console.log("sessionId:", sessionId);
        // console.log("commentId:", commentId);
        // console.groupEnd();

        // return {
        //     state: "SUCCESS",
        // }
    }catch(e){
        return {
            state: "ERROR",
            data: null,
            error: e
        }
    }
}

export const modifyComment = async(commentId, content) => {
    try{
        const sessionId = getSessionId();
        console.log("modify comment by ",sessionId);
        if (!sessionId){
            return {
                state: "FAILURE",
                data: null
            }
        }
        
        

        const response = await axios.post(
            process.env.REACT_APP_SERVER_URL+"/comment/modify",
            {
                sessionId,
                commentId,
                content,
            },{
                withCredentials: true,
                headers:{
                    "Content-Type": `application/json`,
                }    
            }
        )
        console.group("Comment-Modify");
        console.log(response.data.state);
        console.groupEnd();
        return {
            state: response.data.state,
        }

        // //test 영역
        // console.group("Comment-Modify");
        // console.log("commentId:", commentId);
        // console.log("text:", text);
        // console.groupEnd();

        // return {
        //     state: "SUCCESS",
        // }
    }catch(e){
        return {
            state: "ERROR",
            data: null,
            error: e
        }
    }
}