import axios from 'axios';
import { getSessionId } from "./sessionId";

const getContentsInfo = async(contentId, requestValue) => {
    //세션아이디, 현재페이지, 가져오고싶은 페이지 양
    try{
        const sessionId = getSessionId();
        console.log("get contents by ",sessionId);
        if (!sessionId){
            return {
                state: "FAILURE",
                data: null
            }
        }
        
        //axios로 유저 정보 서버에 요청
        const response = await axios.post(
            process.env.REACT_APP_SERVER_URL+"/getContents",
            {
                sessionId,
                contentId,
                requestValue,
            },{
                withCredentials: true,
                headers:{
                    "Content-Type": `application/json`,
                }    
            }
        )

        console.group("contents");
        console.log(response);
        console.log(response.data.state);
        console.log(response.data.payload.totalPage);
        console.log(response.data.payload);
        console.groupEnd();
        return {
            state: response.data.state,
            totalPage: response.data.payload.totalPage,
            data: response.data.payload.data
        }

        // {
        //     state: "SUCCESS", or "FAILURE", "ERROR"
        //     payload: {
        //         userId: "string",
        //     }
        // }

        /*
        요청:
        sessionId: "String",
        contentId: "String",
        requiredPage: Number, => 음수 또는 양수

        응답:
        state: "SUCCESS",
        payload:{
            totalPage: totalPage,
            data: [{
                id: "contentId_"+(currentPage+(index+1)*additionalValue), //콘텐츠 아이디
                author: { //저자
                    id: "userId_12312", //저자 아이디
                    imgUrl: "../img/test_img/사람_1.jpg" //저자 프로필 사진
                },
                createAt: 1692706863808, //숫자로 
                imgUrl: ["../img/test_img/사람_5.jpg","../img/test_img/사람_6.jpg","../img/test_img/사람_7.jpg","../img/test_img/사람_8.jpg"], // 이미지 url
                content: "하루 죙일 버튜얼라이즈 인피니티로드를 만졌다. 메인 컨텐츠 크기를 동적으로 만들었다. 동적으로 안만들었으면 이렇게 고생할 일 없었을 텐데, 하 진짜 너무 짜증난다. 예시로 넣어놓은 저작권 없는 사진 이제 꼴도 보기 싫다. 이게 sns? 하 대학원은 어떻게가고 취직은 어떻게 하냐", //내용
                comments: [{
                    commentId:"commentId_123412",
                    userId:"userId_123123",
                    createAt:1698469752808,
                    comment:"와 진짜 개공감 ㅇㅈ"
                },{
                    commentId:"commentId_123412",
                    userId:"userId_123123",
                    createAt:1698469752808,
                    comment:"와 진짜 개공감 ㅇㅈ"
                }], //댓글 답글 많은것들 중 최근거 두개
                tags: ["사람","css","뒤져","망할","리액트","버튜얼라이즈","사라져"]
            },{
                ...
            }]
        }
        */

        //test 영역
        // const totalPage = 100;
        // const requiredPage = currentPage + loadValue <= 0 ? 0: currentPage + loadValue > totalPage ? totalPage:currentPage+loadValue;
        // const loadingValue = Math.abs(requiredPage-currentPage);
        // const additionalValue = requiredPage >= currentPage ? 1: -1;
        // const data = Array.from({length:loadingValue}).map((_,index)=>({
        //         id: "contentId_"+(currentPage+(index+1)*additionalValue), //콘텐츠 아이디
        //         author: { //저자
        //             id: "userId_12312", //저자 아이디
        //             imgUrl: "../img/test_img/사람_1.jpg" //저자 프로필 사진
        //         },
        //         createAt: 1692706863808, //숫자로 
        //         imgUrl: ["../img/test_img/사람_5.jpg","../img/test_img/사람_6.jpg","../img/test_img/사람_7.jpg","../img/test_img/사람_8.jpg"], // 이미지 url
        //         content: "하루 죙일 버튜얼라이즈 인피니티로드를 만졌다. 메인 컨텐츠 크기를 동적으로 만들었다. 동적으로 안만들었으면 이렇게 고생할 일 없었을 텐데, 하 진짜 너무 짜증난다. 예시로 넣어놓은 저작권 없는 사진 이제 꼴도 보기 싫다. 이게 sns? 하 대학원은 어떻게가고 취직은 어떻게 하냐", //내용
        //         comments: [{
        //             commentId:"commentId_123412",
        //             userId:"userId_123123",
        //             createAt:1698469752808,
        //             comment:"와 진짜 개공감 ㅇㅈ"
        //         },{
        //             commentId:"commentId_123412",
        //             userId:"userId_123123",
        //             createAt:1698469752808,
        //             comment:"와 진짜 개공감 ㅇㅈ"
        //         }], //댓글 답글 많은것들 중 최근거 두개
        //         tags: ["사람","css","뒤져","망할","리액트","버튜얼라이즈","사라져"]
        // }));
        // if (data === []){
        //     return {
        //         state: "FAILURE",
        //         totalPage: totalPage,
        //         data: null
        //     }
        // }

        // return {
        //     state: "SUCCESS",
        //     totalPage: totalPage,
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

export default getContentsInfo;