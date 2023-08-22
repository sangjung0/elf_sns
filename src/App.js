import { Route, Routes, Navigate } from 'react-router-dom';

import SignUpContainer from './containers/SignUpContainer';
import SignInContainer from './containers/SignInContainer';
import MainContainer from './containers/MainContainer';
import Layout from './components/Layout';
import Loading from './components/Loading';

const App = ({userInfo}) => {

  if (userInfo.loading){
    //해당 명령문을 지우면 로딩화면 생략 가능
    return (<Loading/>);
  }
  return (
      <Routes>
        <Route path="/" element={<Navigate to={userInfo.payload.data ? `/post/${userInfo.payload.data.id}` : "signIn"}/>} />
        <Route path="/signUp" element={<Layout><SignUpContainer/></Layout>} />
        <Route path="/signIn" element={<Layout><SignInContainer/></Layout>} />
        <Route path="/post/:id" element={userInfo.payload.data ? <MainContainer/>:<Navigate to={`/signIn`}/>} />
      </Routes>
  );
}

export default App;
