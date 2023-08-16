import axios from 'axios';

const register = async(email, password, phoneNumber, name) => {
    try{
        console.log("register request server by ",email);
        const response = await axios.post(process.env.REACT_APP_SERVER_URL+"/signUp",{
            body:{
                email,
                password,
                phoneNumber,
                name
            }
        })
        console.log(response);
        return {status:"SUCCESS"};
    }catch(e){
        console.error(e);
        return {error:e, status:"ERROR"};
    }

}

export default register;

