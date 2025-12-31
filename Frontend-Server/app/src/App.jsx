import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path='/' element={<OnboardPage />} />
        <Route path='/loginPage' element={<LoginPage />} />
        <Route path='/registerStudent/:id' element={<RegisterPage />} />
        <Route path='/course/:id' element={<CourseDesc />} />
        <Route path='/aboutUs' element={<AboutUs/>}/>
      </Routes>
    </>
  )
}

export default App
