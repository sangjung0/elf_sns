import { Route, Routes, Navigate } from 'react-router-dom';

import SignUpContainer from './containers/SignUpContainer';
import SignInContainer from './containers/SignInContainer';
import Main from './components/main/Main';
import Mypage from './components/mypage/Mypage';
import Layout from './components/Layout';
import Loading from './components/Loading';

const App = ({userInfo, getUserInfo}) => {

  const data = userInfo.payload;

  if (userInfo.loading){
    //해당 명령문을 지우면 로딩화면 생략 가능
    return (<Loading/>);
  }

  const userData = userInfo.payload?.data;
  
  const [navigate, navigateByPost, navigateByMypage] = data.data? [`/post/${encodeURI(data.data.id)}`, <Main userInfo={userData}/>, <Mypage userInfo={userData} getUserInfo={getUserInfo} />]: ["signIn", <Navigate to={`/signIn`}/>, <Navigate to={`/signIn`}/>];
  
  return (
      <Routes>
        <Route path="/" element={<Navigate to={navigate}/>} />
        <Route path="/signUp" element={<Layout><SignUpContainer/></Layout>} />
        <Route path="/signIn" element={<Layout><SignInContainer/></Layout>} />
        <Route path="/post/*" element={navigateByPost} />
        <Route path="/mypage/*" element={navigateByMypage} />
      </Routes>
  );
}

export default App;
