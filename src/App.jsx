import { Route, Routes } from 'react-router-dom'
import Main from './Components/Main'
import LoginSignUpPage from './Components/LoginSignupPage'
import Chat from './Components/Chat'
import Login from "./Components/Login"
import Landing from './Components/Landing'

function App() {

  return (
    // <SignIn/>
    // <div>
    //   {/* <Header/> */}
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/Main' element={<Main />} />
        <Route path='/Chat' element={<Chat />} /> 
      </Routes>
    // </div>
  )
}

export default App
