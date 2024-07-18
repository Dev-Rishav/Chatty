import { Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './Components/Header'
import LoginSignUpPage from './Components/LoginSignupPage'
import Main from './Components/Main'
import Chat from './Components/Chat'
import PhoneSignIn from './Components/PhoneSignIn'
import SignIn from './Components/SignIn'

function App() {

  return (
    // <SignIn/>
    // <div>
    //   {/* <Header/> */}
      <Routes>
        <Route path='/' element={<LoginSignUpPage />} />
        <Route path='/Main' element={<Main />} />
        <Route path='/chat' element={<Chat />} /> 
      </Routes>
    // </div>
  )
}

export default App
