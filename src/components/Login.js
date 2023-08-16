import { Navigate, useLocation } from "react-router-dom";

import Loading from "./Loading";
import { setSessionId } from "../lib/sessionId";
import { useEffect, useState } from "react";

const Login = () => {
    const [redirect, setRedirect] = useState({state:false, url: "/"});
    const location = useLocation();
    const email = location.state.accountInfo.email;
    const password = location.state.accountInfo.password;
    //const remeberChecked = location.state.accountInfo.remeberChecked;

    useEffect(() => {
        (async()=>{
            const result = await setSessionId(email, password);
            if(result.status !== "SUCCESS"){
                setRedirect({state:true, url:"/SingIn"});
                alert("로그인 실패");
            }
            setRedirect({state:true, url:`/post/${result.userId}`});
        })();
    },[email, password])

    if (redirect.state) {
        alert("로그인 성공");
        return <Navigate to={redirect.url} />;
    }

    return(
        <Loading/>  
    )
}

export default Login;