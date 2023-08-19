import axios from 'axios';

//회원가입
const register = async(email, password, phoneNumber, name) => {
    try{
        console.log("register request server by ",email);
        //axios로 회원가입 정보 전달
        const response = await axios.post(
            process.env.REACT_APP_SERVER_URL+"/signUp",
            {
                body:{
                    email,
                    password,
                    phoneNumber,
                    name
                }
            },{
                headers:{
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                }    
            }
        )
        console.log(response);
        return {status:"SUCCESS"};
    }catch(e){
        console.error(e);
        return {error:e, status:"ERROR"};
    }

}

export default register;

