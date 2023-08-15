import { Route, Routes, Navigate } from 'react-router-dom';

import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Main from './components/Main';
import Layout from './components/Layout';

const Loading = () => {
  return (
    <div>
      <h1>Loading...</h1>
    </div>
  )
}

const App = ({userInfo}) => {

  if (userInfo.loading){
    return Loading();
  }
  return (
      <Routes>
        <Route path="/" element={<Navigate to={userInfo.info.data ? `/post/${userInfo.info.data.id}` : "signIn"}/>} />
        <Route path="/signUp" element={<Layout><SignUp/></Layout>} />
        <Route path="/signIn" element={<Layout><SignIn/></Layout>} />
        <Route path="/post/:id" element={userInfo.info.data ? <Main/>:<Navigate to={`/signIn`}/>} />
      </Routes>
  );
}

export default App;
