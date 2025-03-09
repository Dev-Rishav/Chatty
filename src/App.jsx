import { Route, Routes } from 'react-router-dom'
import Main from './Components/Main'
import ChatLayout from './Components/ChatLayout'
import Landing from './Components/Landing'
import Login from './Components/Login'

function App() {

  return (
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/Main' element={<Main />} />
        <Route path='/ChatLayout' element={<ChatLayout />} /> 
        <Route path='/login' element={<Login />} /> 
      </Routes>
  )
}

export default App
