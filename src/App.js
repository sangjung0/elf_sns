import { Route, Routes, Navigate } from 'react-router-dom';

import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Main from './components/Main';
import Layout from './components/Layout';
import Login from './components/Login';
import Loading from './components/Loading';
import Register from './components/Register';

const App = ({userInfo}) => {

  if (userInfo.loading){
    return Loading();
  }
  return (
      <Routes>
        <Route path="/" element={<Navigate to={userInfo.info.data ? `/post/${userInfo.info.data.id}` : "signIn"}/>} />
        <Route path="/signUp" element={<Layout><SignUp/></Layout>} />
        <Route path="/signIn" element={<Layout><SignIn/></Layout>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/post/:id" element={userInfo.info.data ? <Main/>:<Navigate to={`/signIn`}/>} />
      </Routes>
  );
}

export default App;
