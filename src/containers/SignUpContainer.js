import {  useState } from "react";
import { useNavigate } from "react-router-dom";

import Loading from "../components/Loading";
import register from "../lib/register";
import SignUp from "../components/SignUp";

const SignUpContainer = () => {
    const navigate = useNavigate();
    const registerAccountInfo = async(accountInfo) =>{
        setRedirect(<Loading />);
        const result = await register(
            accountInfo.email, 
            accountInfo.password,
            accountInfo.phoneNumber, 
            accountInfo.name);
        if(result.status !== "SUCCESS"){
            alert("회원가입 실패");
            setRedirect(<SignUp registerAccountInfo={registerAccountInfo}/>);
        }else{
            alert("회원가입 성공");
            navigate('/SignIn');
        }
    }

    const [redirect, setRedirect] = useState(<SignUp registerAccountInfo={registerAccountInfo}/>);


    return(
        redirect 
    )
}

export default SignUpContainer;