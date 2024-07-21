import { Route, Routes } from 'react-router-dom'
import Main from './Components/Main'
import ChatLayout from './Components/ChatLayout'
import Landing from './Components/Landing'

function App() {

  return (
    // <SignIn/>
    // <div>
    //   {/* <Header/> */}
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/Main' element={<Main />} />
        <Route path='/ChatLayout' element={<ChatLayout />} /> 
      </Routes>
    // </div>
  )
}

export default App
