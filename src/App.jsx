import { Route, Routes } from 'react-router-dom'
import Main from './Components/Main'
import LoginSignUpPage from './Components/LoginSignupPage'
import Chat from './Components/Chat'

function App() {

  return (
      <Routes>
        <Route path='/' element={<LoginSignUpPage />} />
        <Route path='/Main' element={<Main />} />
        <Route path='/Chat' element={<Chat />} /> 
      </Routes>
  )
}

export default App
