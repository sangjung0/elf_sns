import {  useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';

import Loading from "../components/Loading";
import SignIn from "../components/SignIn";
import { setSessionId, getSessionId } from "../lib/sessionId";
import { getUserInfo } from "../lib/modules/userInfo";

const SignInContainer = () => {
    const dispatch = useDispatch();
    const _getUserInfo = useCallback((sessionId)=> dispatch(getUserInfo(sessionId)), [dispatch]);
    const navigate = useNavigate();

    const signInAccountInfo = async(accountInfo) =>{
        setRedirect(<Loading />);
        const result = await setSessionId(
            accountInfo.email, 
            accountInfo.password,
            );

        if(result.state !== "SUCCESS"){
            alert("회원정보가 다름");
            console.error("로그인 실패 code:", result.state);
            console.error("Error:", result.payload );
            setRedirect(<SignIn signInAccountInfo={signInAccountInfo}/>);
        }else{
            navigate('/');
            _getUserInfo(getSessionId());
        }
    }

    const [redirect, setRedirect] = useState(<SignIn signInAccountInfo={signInAccountInfo}/>);

    return(
        redirect 
    )
}

export default SignInContainer;