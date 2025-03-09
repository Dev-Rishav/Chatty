import { BrowserRouter as Router,Route, Routes } from "react-router-dom";
import Main from "./Components/Main";
import ChatLayout from "./Components/ChatLayout";
// import Landing from './Components/Landing'
// import Login from './Components/Login'
import Auth from "./Components/Auth";
import { Provider } from "react-redux";
import AuthStatus from "./redux/AuthStatus";
import store from "./redux/store";
import PrivateRoute from "./redux/PrivateRoute";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <AuthStatus />
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/" element={<Auth />} />
          <Route element={<PrivateRoute />}>

            <Route path="/Main" element={<Main />} />
            <Route path="/ChatLayout" element={<ChatLayout />} />

          </Route>

        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
