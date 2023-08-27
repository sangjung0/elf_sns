import { Route, Routes, Navigate } from 'react-router-dom';

import SignUpContainer from './containers/SignUpContainer';
import SignInContainer from './containers/SignInContainer';
import MainContainer from './containers/MainContainer';
import Layout from './components/Layout';
import Loading from './components/Loading';

const App = ({userInfo}) => {

  const data = userInfo.payload;

  if (userInfo.loading){
    //해당 명령문을 지우면 로딩화면 생략 가능
    return (<Loading/>);
  }
  
  const [navigate, navigateByPost] = data.data? [`/post/${encodeURI(data.data.id)}`, <MainContainer/>]: ["signIn", <Navigate to={`/signIn`}/>];
  
  return (
      <Routes>
        <Route path="/" element={<Navigate to={navigate}/>} />
        <Route path="/signUp" element={<Layout><SignUpContainer/></Layout>} />
        <Route path="/signIn" element={<Layout><SignInContainer/></Layout>} />
        <Route path="/post/*" element={navigateByPost} />
      </Routes>
  );
}

export default App;
