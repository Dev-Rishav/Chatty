import { Route,Routes } from 'react-router-dom'
import './App.css'
import Header from './Components/Header'
import LoginSignUpPage from './Components/LoginSignupPage'
import Main from './Components/Main'

function App() {

  return (
    <div>
      {/* <Header/> */}
      <Routes>
        <Route path='/' element={<LoginSignUpPage/>}/>
        <Route path='/Main' element={<Main/>}/>
      </Routes>
    </div>
  )
}

export default App
