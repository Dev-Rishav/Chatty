import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './Components/Main';
import ChatLayout from './Components/ChatLayout';
// import Landing from './Components/Landing'
// import Login from './Components/Login'
import Auth from './Components/Auth';
import { Provider } from 'react-redux';
import AuthStatus from './redux/AuthStatus';
import store from './redux/store';
import PrivateRoute from './redux/PrivateRoute';
import { Toaster } from 'react-hot-toast';
import Test from './Components/Test';
import Test2 from './Components/Test2';
import HomePage from './pages/HomePage';
import Home from './Components/NewUI/Home';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <Toaster />
        <AuthStatus />
        <Routes>
          {/* <Route path="/Test" element={<Test />} /> */}
          {/* <Route path="/Test2" element={<Test2 />} /> */}
          {/* <Route path="/auth" element={<Auth />} /> */}
          <Route path="/" element={<Auth />} />
          {/* Private Route */}
          <Route element={<PrivateRoute />}>
            {/* <Route path="/Main" element={<Main />} /> */}
            <Route path="/home" element={<Home />} />
            <Route path="/ChatLayout" element={<ChatLayout />} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
