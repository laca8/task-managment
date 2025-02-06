
import Tasks from './pages/task/Tasks'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignInForm from './pages/auth/Sign'
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SignInForm />}></Route>
        <Route path='/tasks' element={<Tasks />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
