import { Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import Loading from "./Loading";
import register from "../lib/register";

const Register = () => {
    const [redirect, setRedirect] = useState({state:false, url: "/"});
    const location = useLocation();
    const email = location.state.accountInfo.email;
    const password = location.state.accountInfo.password;
    const phoneNumber = location.state.accountInfo.phoneNumber;
    const name = location.state.accountInfo.name;
    //const remeberChecked = location.state.accountInfo.remeberChecked;
    useEffect(() => {
        (async()=>{
            const result = await register(email, password, phoneNumber, name);
            if(result.status !== "SUCCESS"){
                setRedirect({state:true, url:"/SignUp"});
                alert("회원가입 실패");
            }
            setRedirect({state:true, url:`/SignIn`});
        })();
    },[email, password,phoneNumber, name]);

    if (redirect.state) {
        alert("회원가입 성공");
        return <Navigate to={redirect.url} />;
    }

    return(
        <Loading/>  
    )
}

export default Register;